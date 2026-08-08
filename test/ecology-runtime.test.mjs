import assert from 'node:assert/strict'
import test from 'node:test'
import { EDIT_ZONES } from '../src/content/first-map.ts'
import { derivePlantGrowth } from '../src/domain/plant-growth.ts'
import { EcologyRuntime } from '../src/runtime/ecology-runtime.ts'

const focus = (zoneId) => EDIT_ZONES.find((zone) => zone.id === zoneId).focus

test('성공한 편집만 revision과 국소 환경을 함께 바꾼다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('b-moist-soil')
  const before = runtime.snapshot()
  const invalid = runtime.apply({
    type: 'place', zoneId: 'b-moist-soil', kind: 'low-cover', at: { x: 0, z: 0 },
  })
  assert.equal(invalid.changed, false)
  assert.equal(runtime.snapshot().editState, before.editState)
  assert.equal(runtime.snapshot().environment, before.environment)

  const placed = runtime.apply({
    type: 'place', zoneId: 'b-moist-soil', kind: 'low-cover', at: focus('b-moist-soil'),
  })
  assert.equal(placed.changed, true)
  const after = runtime.snapshot()
  assert.equal(after.editState.revision, before.editState.revision + 1)
  assert.equal(after.environment.editRevision, after.editState.revision)
})

test('차단 중에는 편집이 보존되고 해제 뒤 같은 자리에서 이어진다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')
  runtime.setBlocked(true)
  const before = runtime.snapshot()
  const blocked = runtime.apply({
    type: 'place', zoneId: 'a-garden', kind: 'low-flower', at: focus('a-garden'),
  })
  assert.equal(blocked.rejection, 'editing-blocked')
  assert.equal(runtime.snapshot().editState, before.editState)
  runtime.setBlocked(false)
  assert.equal(runtime.apply({
    type: 'place', zoneId: 'a-garden', kind: 'low-flower', at: focus('a-garden'),
  }).changed, true)
})

test('다른 흙자리 명령은 현재 편집 자리를 넘지 못한다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('b-bright-soil')
  const result = runtime.apply({
    type: 'place', zoneId: 'b-moist-soil', kind: 'low-cover', at: focus('b-moist-soil'),
  })
  assert.equal(result.rejection, 'different-zone')
  assert.equal(runtime.snapshot().editState.revision, 0)
})

test('상위 조정자가 알려 준 주민 이용 자리는 편집과 되돌리기에서 보호한다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')
  const placed = runtime.apply({
    type: 'place', zoneId: 'a-garden', kind: 'low-flower', at: focus('a-garden'),
  })
  assert.ok(placed.entryId)
  const before = runtime.snapshot().editState
  const blocked = runtime.apply(
    { type: 'undo', zoneId: 'a-garden' },
    { occupiedEntryIds: [placed.entryId] },
  )
  assert.equal(blocked.changed, false)
  assert.equal(blocked.rejection, 'occupied')
  assert.equal(runtime.snapshot().editState, before)
  assert.equal(runtime.snapshot().canUndoActiveZone, true)
  assert.equal(
    runtime.snapshot({ occupiedEntryIds: [placed.entryId] }).canUndoActiveZone,
    false,
  )
})

test('재로드 복원은 현재 배치를 남기고 방금 전 이력은 비운다', () => {
  const first = new EcologyRuntime()
  first.enter('a-garden')
  first.apply({
    type: 'place', zoneId: 'a-garden', kind: 'low-flower', at: focus('a-garden'),
  })
  const reloaded = new EcologyRuntime(first.persistentState())
  reloaded.enter('a-garden')
  assert.equal(Object.keys(reloaded.snapshot().editState.current['a-garden']).length, 1)
  assert.equal(reloaded.snapshot().canUndoActiveZone, false)
})

test('새 씨앗은 마른 흙에서 기다리고 물을 받은 세계 시간에만 자란다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')
  const placed = runtime.apply({
    type: 'place', zoneId: 'a-garden', kind: 'low-flower', at: focus('a-garden'),
  })
  const editRevision = runtime.snapshot().editState.revision

  assert.equal(runtime.advancePlantGrowth(60, 60, true).changed, false)
  assert.equal(
    derivePlantGrowth(runtime.snapshot().plantGrowth.byEntryId[placed.entryId], 60).stage,
    'seed',
  )

  runtime.water()
  const ecologyRevision = runtime.snapshot().ecologyRevision
  const growth = runtime.advancePlantGrowth(12, 72, true)
  assert.deepEqual(growth, { changed: true, stageChanged: true })
  assert.equal(
    derivePlantGrowth(runtime.snapshot().plantGrowth.byEntryId[placed.entryId], 72).stage,
    'sprout',
  )
  assert.equal(runtime.snapshot().editState.revision, editRevision)
  assert.equal(runtime.snapshot().ecologyRevision, ecologyRevision + 1)
})

test('차단된 세계에서는 성장하지 않고 캐기 되돌리기는 성장도를 복원한다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')
  const placed = runtime.apply({
    type: 'place', zoneId: 'a-garden', kind: 'low-flower', at: focus('a-garden'),
  })
  runtime.water()
  runtime.advancePlantGrowth(40, 40, true)
  const grown = runtime.snapshot().plantGrowth.byEntryId[placed.entryId]

  runtime.setBlocked(true)
  assert.equal(runtime.advancePlantGrowth(50, 90, true).changed, false)
  assert.deepEqual(runtime.snapshot().plantGrowth.byEntryId[placed.entryId], grown)
  runtime.setBlocked(false)

  assert.equal(runtime.apply({
    type: 'retrieve', zoneId: 'a-garden', id: placed.entryId,
  }).changed, true)
  assert.equal(runtime.snapshot().plantGrowth.byEntryId[placed.entryId], undefined)
  assert.equal(runtime.apply({ type: 'undo', zoneId: 'a-garden' }).changed, true)
  assert.deepEqual(runtime.snapshot().plantGrowth.byEntryId[placed.entryId], grown)
})

test('씨앗은 솎지 못하고 싹은 솎을 수 있으며 되돌려도 성장도는 유지된다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')
  const placed = runtime.apply({
    type: 'place', zoneId: 'a-garden', kind: 'low-flower', at: focus('a-garden'),
  })
  assert.equal(runtime.apply({
    type: 'thin', zoneId: 'a-garden', id: placed.entryId,
  }).rejection, 'plant-too-young')

  runtime.water()
  runtime.advancePlantGrowth(12, 12, true)
  const grown = runtime.snapshot().plantGrowth.byEntryId[placed.entryId]
  assert.equal(runtime.apply({
    type: 'thin', zoneId: 'a-garden', id: placed.entryId,
  }).changed, true)
  assert.equal(
    runtime.snapshot().editState.current['a-garden'][placed.entryId].thinned,
    true,
  )
  assert.equal(runtime.apply({ type: 'undo', zoneId: 'a-garden' }).changed, true)
  assert.equal(
    runtime.snapshot().editState.current['a-garden'][placed.entryId].thinned,
    false,
  )
  assert.deepEqual(runtime.snapshot().plantGrowth.byEntryId[placed.entryId], grown)
})

test('성장 저장을 함께 복원하면 구버전 성체 migration 대신 정확한 단계를 잇는다', () => {
  const first = new EcologyRuntime()
  first.enter('a-garden')
  const placed = first.apply({
    type: 'place', zoneId: 'a-garden', kind: 'low-flower', at: focus('a-garden'),
  })
  first.water()
  first.advancePlantGrowth(40, 40, true)

  const reloaded = new EcologyRuntime(
    first.persistentState(),
    first.persistentPlantGrowthState(),
    40,
  )
  assert.deepEqual(
    reloaded.snapshot().plantGrowth.byEntryId[placed.entryId],
    first.snapshot().plantGrowth.byEntryId[placed.entryId],
  )
  assert.equal(
    derivePlantGrowth(reloaded.snapshot().plantGrowth.byEntryId[placed.entryId], 40).stage,
    'young',
  )
})

test('물을 준 지점과 이어진 물길 조각만 젖은 표시 대상으로 내보낸다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')
  const first = runtime.apply({
    type: 'place-drainage', zoneId: 'a-garden',
    from: { x: -10.2, z: 3.65 }, to: { x: -9.4, z: 3.65 },
  })
  const second = runtime.apply({
    type: 'place-drainage', zoneId: 'a-garden',
    from: { x: -9.4, z: 3.65 }, to: { x: -8.65, z: 5 },
  })
  const separate = runtime.apply({
    type: 'place-drainage', zoneId: 'a-garden',
    from: { x: -11.5, z: 4.4 }, to: { x: -10.8, z: 4.4 },
  })
  assert.equal(first.changed && second.changed && separate.changed, true)

  assert.equal(runtime.water({ x: -9.8, z: 3.65 }).changed, true)
  assert.deepEqual(runtime.snapshot().wetDrainageEntryIds, [first.entryId, second.entryId])

  assert.equal(runtime.water({ x: -11.15, z: 4.4 }).changed, true)
  assert.deepEqual(runtime.snapshot().wetDrainageEntryIds, [separate.entryId])
})

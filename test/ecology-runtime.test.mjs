import assert from 'node:assert/strict'
import test from 'node:test'
import { EDIT_ZONES } from '../src/content/first-map.ts'
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

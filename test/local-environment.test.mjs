import assert from 'node:assert/strict'
import test from 'node:test'
import { applyEdit, createEditSession } from '../src/domain/edit-model.ts'
import {
  B_C_PROTECTED_COVER_PATH,
  FIRST_MAP_AMBIENT_SURFACE,
  FIRST_MAP_PROTECTED_FOUNDATION,
  evaluateLocalEnvironment,
} from '../src/domain/local-environment.ts'
import { EDIT_ZONES, isInsideEditZone } from '../src/content/first-map.ts'

const focus = Object.fromEntries(EDIT_ZONES.map((zone) => [zone.id, zone.focus]))

function withoutRevision(snapshot) {
  const { editRevision: _revision, ...readings } = snapshot
  return readings
}

test('빈 편집에도 B–C 보호 기초와 서로 다른 표면 습기가 편집 밖에 존재한다', () => {
  const environment = evaluateLocalEnvironment(createEditSession().state)

  assert.equal(environment.bToC.protectedFoundation, FIRST_MAP_PROTECTED_FOUNDATION)
  assert.equal(environment.bToC.protectedFoundation.naturalBCLink, 'connected')
  assert.equal(environment.bToC.protectedFoundation.shallowSlowWaterEdge, true)
  assert.equal(environment.bToC.protectedFoundation.cRefuge, true)
  assert.equal(environment.bToC.managedCover, 'open-edge')
  assert.equal(environment.zones['b-bright-soil'].surfaceMoisture, 'dry')
  assert.equal(environment.zones['b-moist-soil'].surfaceMoisture, 'moist')
  assert.ok(
    B_C_PROTECTED_COVER_PATH.every((point) =>
      EDIT_ZONES.every((zone) => !isInsideEditZone(point, zone)),
    ),
  )
})

test('A의 편집은 B의 두 자리와 B–C 연결 판정을 바꾸지 않는다', () => {
  const initial = createEditSession()
  const before = evaluateLocalEnvironment(initial.state)
  const edited = applyEdit(initial, {
    type: 'place',
    zoneId: 'a-garden',
    kind: 'low-cover',
    at: focus['a-garden'],
  })
  assert.equal(edited.changed, true)
  const after = evaluateLocalEnvironment(edited.session.state)

  assert.notDeepEqual(after.zones['a-garden'], before.zones['a-garden'])
  assert.deepEqual(after.zones['b-bright-soil'], before.zones['b-bright-soil'])
  assert.deepEqual(after.zones['b-moist-soil'], before.zones['b-moist-soil'])
  assert.deepEqual(after.bToC, before.bToC)
})

test('덮임과 흙 다듬기는 외부 수분 공급 없이 표면을 즉시 적시지 않는다', () => {
  let session = createEditSession()
  session = applyEdit(session, {
    type: 'place',
    zoneId: 'b-moist-soil',
    kind: 'low-cover',
    at: focus['b-moist-soil'],
  }).session
  session = applyEdit(session, {
    type: 'adjust-ground',
    zoneId: 'b-moist-soil',
    at: focus['b-moist-soil'],
  }).session
  const withoutWater = {
    ...FIRST_MAP_AMBIENT_SURFACE,
    'b-moist-soil': { moistureSource: 'drying-exposed' },
  }

  assert.equal(
    evaluateLocalEnvironment(session.state, withoutWater).zones['b-moist-soil']
      .surfaceMoisture,
    'dry',
  )
  assert.equal(
    evaluateLocalEnvironment(session.state).zones['b-moist-soil'].surfaceMoisture,
    'moist',
  )
})

test('B 촉촉한 흙의 관리 덮임은 patches에서 보호 연결 옆 joined로 바뀐다', () => {
  const initial = createEditSession()
  const placed = applyEdit(initial, {
    type: 'place',
    zoneId: 'b-moist-soil',
    kind: 'low-cover',
    at: focus['b-moist-soil'],
  })
  assert.equal(placed.changed, true)
  assert.equal(evaluateLocalEnvironment(placed.session.state).bToC.managedCover, 'patches')

  const moved = applyEdit(placed.session, {
    type: 'move',
    zoneId: 'b-moist-soil',
    id: placed.entryId,
    to: { x: -4.6, z: -3.8 },
  })
  assert.equal(moved.changed, true)
  const joined = evaluateLocalEnvironment(moved.session.state)
  assert.equal(joined.bToC.managedCover, 'joined')
  assert.deepEqual(joined.bToC.connectedCover.map(({ id }) => id), [placed.entryId])
  assert.equal(joined.bToC.protectedFoundation, FIRST_MAP_PROTECTED_FOUNDATION)
})

test('되돌리기는 현재 배치의 국소 기능만 복원하고 revision은 앞으로 간다', () => {
  const initial = createEditSession()
  const before = evaluateLocalEnvironment(initial.state)
  const placed = applyEdit(initial, {
    type: 'place',
    zoneId: 'b-bright-soil',
    kind: 'low-cover',
    at: focus['b-bright-soil'],
  })
  const changed = evaluateLocalEnvironment(placed.session.state)
  assert.notDeepEqual(withoutRevision(changed), withoutRevision(before))

  const undone = applyEdit(placed.session, { type: 'undo', zoneId: 'b-bright-soil' })
  const restored = evaluateLocalEnvironment(undone.session.state)
  assert.deepEqual(withoutRevision(restored), withoutRevision(before))
  assert.equal(restored.editRevision, 2)
})

test('국소 판정은 결정적이며 점수·건강·좋고 나쁨 필드를 만들지 않는다', () => {
  const state = createEditSession().state
  const first = evaluateLocalEnvironment(state)
  const second = evaluateLocalEnvironment(state)
  assert.deepEqual(second, first)

  const serialized = JSON.stringify(first)
  for (const forbidden of ['score', 'health', 'percent', 'good', 'bad', 'failed']) {
    assert.equal(serialized.includes(forbidden), false)
  }
})

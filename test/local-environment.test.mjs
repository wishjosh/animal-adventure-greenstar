import assert from 'node:assert/strict'
import test from 'node:test'
import { applyEdit, createEditSession } from '../src/domain/edit-model.ts'
import {
  B_C_PROTECTED_COVER_PATH,
  FIRST_MAP_AMBIENT_SURFACE,
  FIRST_MAP_LOCAL_ENVIRONMENT_TUNING,
  FIRST_MAP_PROTECTED_FOUNDATION,
  evaluateLocalEnvironment,
} from '../src/domain/local-environment.ts'
import { EDIT_ZONES, isInsideEditZone } from '../src/content/first-map.ts'
import { FIRST_MAP_PLANT_GROWTH_TUNING } from '../src/domain/plant-growth.ts'

const focus = Object.fromEntries(EDIT_ZONES.map((zone) => [zone.id, zone.focus]))

function withoutRevision(snapshot) {
  const { editRevision: _revision, ...readings } = snapshot
  return readings
}

function growthAt(entryId, accumulatedGrowth) {
  return {
    byEntryId: {
      [entryId]: { plantedAtElapsed: 0, accumulatedGrowth },
    },
  }
}

function evaluateWithGrowth(editState, plantGrowth, tuning) {
  return evaluateLocalEnvironment(
    editState,
    undefined,
    tuning,
    undefined,
    plantGrowth,
  )
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

test('성장표를 주면 씨앗·싹·어린식물·성체의 실제 크기만큼 빛에 영향을 준다', () => {
  const placed = applyEdit(createEditSession(), {
    type: 'place',
    zoneId: 'a-garden',
    kind: 'low-flower',
    at: focus['a-garden'],
  })
  assert.equal(placed.changed, true)
  const id = placed.entryId
  assert.ok(id)
  const { sprout, young, adult } = FIRST_MAP_PLANT_GROWTH_TUNING.stageStarts
  const lightAt = (growth, threshold) => evaluateWithGrowth(
    placed.session.state,
    growthAt(id, growth),
    { ...FIRST_MAP_LOCAL_ENVIRONMENT_TUNING, dappledSampleShare: threshold },
  ).zones['a-garden'].light

  assert.equal(lightAt(0, 0.02), 'bright')
  assert.equal(lightAt(sprout, 0.02), 'dappled')
  assert.equal(lightAt(sprout, 0.04), 'bright')
  assert.equal(lightAt(young, 0.04), 'dappled')
  assert.equal(lightAt(young, 0.08), 'bright')
  assert.equal(lightAt(adult, 0.08), 'dappled')

  // 성장표를 생략한 기존 호출은 심은 꽃을 성체 영향으로 취급한다.
  assert.equal(
    evaluateLocalEnvironment(
      placed.session.state,
      undefined,
      { ...FIRST_MAP_LOCAL_ENVIRONMENT_TUNING, dappledSampleShare: 0.08 },
    ).zones['a-garden'].light,
    'dappled',
  )
})

test('솎은 성체 꽃은 빛과 통풍 길목에서 더 작은 영향만 남긴다', () => {
  const placed = applyEdit(createEditSession(), {
    type: 'place',
    zoneId: 'a-garden',
    kind: 'low-flower',
    at: { x: focus['a-garden'].x, z: focus['a-garden'].z + 0.16 },
  })
  assert.equal(placed.changed, true)
  const id = placed.entryId
  assert.ok(id)
  const thinned = applyEdit(placed.session, { type: 'thin', zoneId: 'a-garden', id })
  assert.equal(thinned.changed, true)
  const growth = growthAt(id, FIRST_MAP_PLANT_GROWTH_TUNING.stageStarts.adult)
  const tuning = {
    ...FIRST_MAP_LOCAL_ENVIRONMENT_TUNING,
    dappledSampleShare: 0.08,
    openLaneShare: 0.9,
  }
  const full = evaluateWithGrowth(placed.session.state, growth, tuning)
  const sparse = evaluateWithGrowth(thinned.session.state, growth, tuning)

  assert.equal(full.zones['a-garden'].light, 'dappled')
  assert.equal(sparse.zones['a-garden'].light, 'bright')
  assert.equal(full.zones['a-garden'].opening, 'pockets')
  assert.equal(sparse.zones['a-garden'].opening, 'open')
})

test('지지대는 빛과 덮임을 바꾸지 않고 시렁은 작은 B 흙에 얼룩빛을 만든다', () => {
  const empty = createEditSession()
  const beforeA = evaluateLocalEnvironment(empty.state).zones['a-garden']
  const support = applyEdit(empty, {
    type: 'place-structure',
    zoneId: 'a-garden',
    form: 'support',
    at: focus['a-garden'],
    rotation: 0,
  })
  assert.equal(support.changed, true)
  assert.deepEqual(evaluateLocalEnvironment(support.session.state).zones['a-garden'], beforeA)

  const rack = applyEdit(empty, {
    type: 'place-structure',
    zoneId: 'b-bright-soil',
    form: 'rack',
    at: focus['b-bright-soil'],
    rotation: 0,
  })
  assert.equal(rack.changed, true)
  const reading = evaluateLocalEnvironment(rack.session.state).zones['b-bright-soil']
  assert.equal(reading.light, 'dappled')
  assert.equal(reading.lowCover, 'open-ground')
})

test('그늘막은 실제 그늘·통풍 판정을 바꾸되 식물 덮임으로 세지 않는다', () => {
  const shade = applyEdit(createEditSession(), {
    type: 'place-structure',
    zoneId: 'a-garden',
    form: 'shade',
    at: focus['a-garden'],
    rotation: 0,
  })
  assert.equal(shade.changed, true)
  const reading = evaluateLocalEnvironment(shade.session.state).zones['a-garden']

  assert.equal(reading.light, 'dappled')
  assert.equal(reading.opening, 'pockets')
  assert.equal(reading.lowCover, 'open-ground')
})

test('울타리 방향은 열린 길목을 바꾸고 작은 물길은 별도 환경으로 읽힌다', () => {
  const across = applyEdit(createEditSession(), {
    type: 'place-structure',
    zoneId: 'a-garden',
    form: 'fence',
    at: focus['a-garden'],
    rotation: Math.PI / 2,
  })
  assert.equal(across.changed, true)
  assert.equal(
    evaluateLocalEnvironment(across.session.state).zones['a-garden'].opening,
    'pockets',
  )

  const center = focus['a-garden']
  const drainage = applyEdit(createEditSession(), {
    type: 'place-drainage',
    zoneId: 'a-garden',
    from: { x: center.x - 0.4, z: center.z },
    to: { x: center.x + 0.4, z: center.z },
  })
  assert.equal(drainage.changed, true)
  const environment = evaluateLocalEnvironment(drainage.session.state)
  assert.equal(environment.zones['a-garden'].drainage, 'holding')
  assert.equal(environment.zones['b-bright-soil'].drainage, 'none')
})

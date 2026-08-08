import assert from 'node:assert/strict'
import test from 'node:test'
import { applyEdit, createEditSession } from '../src/domain/edit-model.ts'
import { evaluateLocalEnvironment } from '../src/domain/local-environment.ts'
import {
  FIRST_MAP_SURFACE_MOISTURE_TUNING,
  advanceSurfaceMoisture,
  createSurfaceMoistureRuntime,
  dryingSecondsFor,
  readSurfaceMoisture,
  waterZone,
} from '../src/domain/surface-moisture.ts'
import { EDIT_ZONES } from '../src/content/first-map.ts'

const focus = Object.fromEntries(EDIT_ZONES.map((zone) => [zone.id, zone.focus]))

/** 세계 시간을 한 프레임씩 흘려보낸다. 프레임 상한과 같은 간격으로 나눈다. */
function elapse(runtime, seconds, input) {
  const step = 0.1
  let current = runtime
  for (let passed = 0; passed < seconds; passed += step) {
    current = advanceSurfaceMoisture(current, { ...input, deltaSeconds: step })
  }
  return current
}

function environmentOf(editState) {
  return evaluateLocalEnvironment(editState)
}

test('물을 주지 않은 정원은 마른 상태로 시작하고 물가 자리는 계속 젖어 있다', () => {
  const runtime = createSurfaceMoistureRuntime()
  const moisture = readSurfaceMoisture(runtime)

  assert.equal(moisture['a-garden'], 'dry')
  assert.equal(moisture['b-bright-soil'], 'dry')
  assert.equal(moisture['b-moist-soil'], 'moist')
})

test('물을 주면 젖고, 정해진 시간이 지나면 스스로 마른다', () => {
  const editState = createEditSession().state
  const input = { environment: environmentOf(editState), editState }
  const watered = waterZone(createSurfaceMoistureRuntime(), 'a-garden')

  assert.equal(readSurfaceMoisture(watered)['a-garden'], 'moist')

  const halfway = elapse(watered, 90, input)
  assert.equal(readSurfaceMoisture(halfway)['a-garden'], 'moist')

  const dried = elapse(watered, 181, input)
  assert.equal(readSurfaceMoisture(dried)['a-garden'], 'dry')
})

test('맨 흙의 마름은 동물 한 주기보다 충분히 길다', () => {
  const editState = createEditSession().state
  const seconds = dryingSecondsFor('a-garden', environmentOf(editState), editState)

  // 무당개구리 한 주기는 약 25~30초다. 그보다 짧으면 물주기가 결과를 만들 수 없다.
  assert.ok(seconds >= 30 * 3, '맨 흙 마름이 동물 주기의 세 배 이상이어야 한다')
  assert.equal(seconds, FIRST_MAP_SURFACE_MOISTURE_TUNING.baseDryingSeconds)
})

test('덮어 준 자리는 맨 흙보다 오래 젖어 있다', () => {
  const empty = createEditSession()
  const bare = dryingSecondsFor('a-garden', environmentOf(empty.state), empty.state)

  // 낮은 덮임의 발자국 반지름이 0.58이므로 0.79보다 넓게 벌려 놓는다.
  let covered = empty
  for (const offset of [-0.85, 0, 0.85]) {
    const placed = applyEdit(covered, {
      type: 'place',
      zoneId: 'a-garden',
      kind: 'low-cover',
      at: { x: focus['a-garden'].x + offset, z: focus['a-garden'].z },
    })
    assert.equal(placed.changed, true)
    covered = placed.session
  }
  const withCover = dryingSecondsFor(
    'a-garden',
    environmentOf(covered.state),
    covered.state,
  )

  assert.ok(withCover > bare, '덮은 자리가 맨 흙보다 오래 젖어 있어야 한다')
})

test('흙을 북돋운 자리는 물을 더 오래 머금는다', () => {
  const empty = createEditSession()
  const bare = dryingSecondsFor('a-garden', environmentOf(empty.state), empty.state)

  const amended = applyEdit(empty, {
    type: 'adjust-ground',
    zoneId: 'a-garden',
    at: focus['a-garden'],
  })
  assert.equal(amended.changed, true)
  const withAmendment = dryingSecondsFor(
    'a-garden',
    environmentOf(amended.session.state),
    amended.session.state,
  )

  assert.ok(
    withAmendment > bare,
    '북돋운 흙이 맨 흙보다 오래 젖어 있어야 한다',
  )
})

test('덮임과 그늘이 겹친 자리는 한 세션 안에 마르지 않는다', () => {
  let session = createEditSession()
  // 자리를 빽빽하게 덮어 그늘과 덮임을 함께 만든다.
  for (const z of [-0.6, 0, 0.6]) {
    for (const x of [-0.9, -0.3, 0.3, 0.9]) {
      const placed = applyEdit(session, {
        type: 'place',
        zoneId: 'a-garden',
        kind: 'low-cover',
        at: { x: focus['a-garden'].x + x, z: focus['a-garden'].z + z },
      })
      if (placed.changed) {
        session = placed.session
      }
    }
  }
  const environment = environmentOf(session.state)
  const seconds = dryingSecondsFor('a-garden', environment, session.state)

  assert.equal(environment.zones['a-garden'].lowCover, 'dense')
  assert.notEqual(environment.zones['a-garden'].light, 'bright')
  // 저학년 단독 플레이테스트 기준 세션은 약 15분이다.
  assert.ok(seconds > 15 * 60, '한 세션 안에는 사실상 마르지 않아야 한다')
})

test('물가에 닿은 자리는 시간이 지나도 마르지 않는다', () => {
  const editState = createEditSession().state
  const input = { environment: environmentOf(editState), editState }
  const later = elapse(createSurfaceMoistureRuntime(), 600, input)

  assert.equal(readSurfaceMoisture(later)['b-moist-soil'], 'moist')
})

test('한 자리에 준 물은 다른 자리의 습기를 바꾸지 않는다', () => {
  const watered = waterZone(createSurfaceMoistureRuntime(), 'a-garden')
  const moisture = readSurfaceMoisture(watered)

  assert.equal(moisture['a-garden'], 'moist')
  assert.equal(moisture['b-bright-soil'], 'dry')
})

test('세계가 멈춘 동안에는 마르지 않는다', () => {
  const editState = createEditSession().state
  const input = { environment: environmentOf(editState), editState }
  const watered = waterZone(createSurfaceMoistureRuntime(), 'a-garden')
  const paused = advanceSurfaceMoisture(watered, { ...input, deltaSeconds: 0 })

  assert.equal(paused['a-garden'].wetness, watered['a-garden'].wetness)
})

test('긴 프레임 간격도 한 걸음 상한을 넘겨 마르게 하지 않는다', () => {
  const editState = createEditSession().state
  const input = { environment: environmentOf(editState), editState }
  const watered = waterZone(createSurfaceMoistureRuntime(), 'a-garden')
  const jumped = advanceSurfaceMoisture(watered, { ...input, deltaSeconds: 600 })

  assert.equal(readSurfaceMoisture(jumped)['a-garden'], 'moist')
})

test('현재 습기를 국소 환경 판정에 넣으면 자리 기본값을 대신한다', () => {
  const editState = createEditSession().state
  const watered = waterZone(createSurfaceMoistureRuntime(), 'a-garden')
  const environment = evaluateLocalEnvironment(
    editState,
    undefined,
    undefined,
    readSurfaceMoisture(watered),
  )

  assert.equal(environment.zones['a-garden'].surfaceMoisture, 'moist')
  assert.equal(environment.zones['b-bright-soil'].surfaceMoisture, 'dry')
})

test('물을 준 자리와 닿은 막힌 홈은 물을 붙들고 출구와 이어진 홈은 더 빨리 뺀다', () => {
  const placeDrainage = (session, from, to) => {
    const result = applyEdit(session, {
      type: 'place-drainage', zoneId: 'a-garden', from, to,
    })
    assert.equal(result.changed, true, result.rejection)
    return result.session
  }
  const wateredAt = { x: -9.8, z: 3.65 }
  const holding = placeDrainage(
    createEditSession(),
    { x: -10.2, z: 3.65 },
    { x: -9.4, z: 3.65 },
  )
  let outflow = placeDrainage(
    createEditSession(),
    { x: -10.2, z: 3.65 },
    { x: -9.4, z: 3.65 },
  )
  outflow = placeDrainage(
    outflow,
    { x: -9.4, z: 3.65 },
    { x: -8.65, z: 5 },
  )

  const bareSeconds = FIRST_MAP_SURFACE_MOISTURE_TUNING.baseDryingSeconds
  assert.equal(
    dryingSecondsFor('a-garden', environmentOf(holding.state), holding.state),
    bareSeconds,
  )
  assert.equal(
    dryingSecondsFor(
      'a-garden', environmentOf(holding.state), holding.state,
      undefined, wateredAt,
    ),
    bareSeconds * FIRST_MAP_SURFACE_MOISTURE_TUNING.drainageRetention.holding,
  )
  assert.equal(
    dryingSecondsFor(
      'a-garden', environmentOf(outflow.state), outflow.state,
      undefined, wateredAt,
    ),
    bareSeconds * FIRST_MAP_SURFACE_MOISTURE_TUNING.drainageRetention.outflow,
  )

  const holdingWet = elapse(
    waterZone(createSurfaceMoistureRuntime(), 'a-garden', wateredAt),
    130,
    { environment: environmentOf(holding.state), editState: holding.state },
  )
  const outflowDry = elapse(
    waterZone(createSurfaceMoistureRuntime(), 'a-garden', wateredAt),
    130,
    { environment: environmentOf(outflow.state), editState: outflow.state },
  )
  assert.equal(readSurfaceMoisture(holdingWet)['a-garden'], 'moist')
  assert.equal(readSurfaceMoisture(outflowDry)['a-garden'], 'dry')
})

import assert from 'node:assert/strict'
import test from 'node:test'
import { applyEdit, createEditSession } from '../src/domain/edit-model.ts'
import {
  FIRST_MAP_TOAD_TUNING,
  advanceFireBelliedToad,
  assertFireBelliedToadContract,
  createFireBelliedToadState,
  deriveToadOpportunities,
  getOccupiedToadEditEntryIds,
} from '../src/domain/fire-bellied-toad.ts'
import { evaluateLocalEnvironment } from '../src/domain/local-environment.ts'

const OBSERVER = { x: -7, z: -0.5 }
const CLOSE_TO_WATER_EDGE = { x: 1.25, z: -1.45 }

function opportunitiesFor(session) {
  return deriveToadOpportunities(evaluateLocalEnvironment(session.state))
}

function advance(state, opportunities, overrides = {}) {
  return advanceFireBelliedToad(state, {
    deltaSeconds: 0.1,
    opportunities,
    playerAt: OBSERVER,
    ...overrides,
  })
}

function runUntil(
  state,
  opportunities,
  predicate,
  maximumSeconds = 80,
  overrides = {},
) {
  let current = state
  const cues = []
  for (let index = 0; index < Math.ceil(maximumSeconds / 0.1); index += 1) {
    if (predicate(current)) {
      return { state: current, cues }
    }
    const update = advance(current, opportunities, overrides)
    current = update.state
    cues.push(...update.cues)
  }
  assert.fail('제한 시간 안에 무당개구리 상태가 도달하지 않았습니다.')
}

test('빈 편집에도 보호 경로가 있고 처음에는 피난처에서 보이지 않게 기다린다', () => {
  const opportunities = opportunitiesFor(createEditSession())
  const state = createFireBelliedToadState()

  assert.doesNotThrow(() => assertFireBelliedToadContract(opportunities))
  assert.equal(opportunities.length, 1)
  assert.equal(opportunities[0].kind, 'protected')
  assert.deepEqual(opportunities[0].entryIds, [])
  assert.equal(state.phase, 'away')
  assert.equal(state.activeRoute, undefined)
  assert.equal(state.routeProgress, 0)
})

test('잎 흔들림과 물결 흔적이 먼저 나오고 나서야 가시 접근이 시작된다', () => {
  const opportunities = opportunitiesFor(createEditSession())
  let state = createFireBelliedToadState()
  let firstVisiblePhase
  const cues = []

  for (let index = 0; index < 180; index += 1) {
    const update = advance(state, opportunities)
    state = update.state
    cues.push(...update.cues)
    if (!firstVisiblePhase && (state.phase === 'approaching' || state.phase === 'using')) {
      firstVisiblePhase = state.phase
      break
    }
  }

  assert.equal(firstVisiblePhase, 'approaching')
  assert.deepEqual(cues.slice(0, 2), ['refuge-rustle', 'water-ripple'])
  assert.ok(state.phaseSeconds < 0.2)
})

test('보호 경로만으로 낮은 접근과 얕은 물가 이용까지 반복 가능하다', () => {
  const opportunities = opportunitiesFor(createEditSession())
  const initial = createFireBelliedToadState()
  const using = runUntil(initial, opportunities, (state) => state.phase === 'using')

  assert.equal(using.state.activeRoute?.kind, 'protected')
  assert.equal(using.state.routeProgress, 1)
  assert.equal(using.state.visitCount, 1)
  assert.ok(using.cues.includes('water-touch'))

  const left = runUntil(
    using.state,
    opportunities,
    (state) => state.phase === 'away' && !state.activeRoute,
  )
  const returningTrace = runUntil(
    left.state,
    opportunities,
    (state) => state.phase === 'trace',
  )
  assert.equal(returningTrace.state.activeRoute?.kind, 'protected')
})

test('가까운 접근에는 현재 좌표에서 같은 경로로 물러났다가 다시 온다', () => {
  const opportunities = opportunitiesFor(createEditSession())
  const using = runUntil(
    createFireBelliedToadState(),
    opportunities,
    (state) => state.phase === 'using',
  ).state
  const start = using.position

  const disturbed = advanceFireBelliedToad(using, {
    deltaSeconds: 0,
    opportunities,
    playerAt: CLOSE_TO_WATER_EDGE,
  }).state
  assert.equal(disturbed.phase, 'away')
  assert.deepEqual(disturbed.position, start)
  assert.equal(disturbed.routeProgress, 1)

  const moved = advance(disturbed, opportunities).state
  assert.ok(moved.routeProgress < 1)
  assert.ok(
    Math.hypot(moved.position.x - start.x, moved.position.z - start.z) <=
      FIRST_MAP_TOAD_TUNING.retreatSpeed * 0.101,
  )

  const hidden = runUntil(
    moved,
    opportunities,
    (state) => state.phase === 'away' && !state.activeRoute,
  ).state
  const revisit = runUntil(
    hidden,
    opportunities,
    (state) => state.phase === 'approaching',
  ).state
  assert.equal(revisit.visitCount, 1)
  assert.equal(revisit.routeProgress, 0)
})

test('C와 이어진 플레이어 덮임은 첫 출현 조건이 아니라 대안 경로만 더한다', () => {
  let session = createEditSession()
  const placed = applyEdit(session, {
    type: 'place',
    zoneId: 'b-moist-soil',
    kind: 'low-cover',
    at: { x: -4.6, z: -3.8 },
  })
  assert.ok(placed.entryId)
  session = placed.session
  const opportunities = opportunitiesFor(session)

  assert.deepEqual(
    opportunities.map(({ kind }) => kind),
    ['protected', 'managed'],
  )
  assert.deepEqual(opportunities[1].entryIds, [placed.entryId])

  const readyForAnotherVisit = {
    ...createFireBelliedToadState(),
    phaseSeconds: FIRST_MAP_TOAD_TUNING.revisitDelay,
    visitCount: 1,
    lastRouteId: opportunities[0].id,
  }
  const trace = advance(readyForAnotherVisit, opportunities).state
  assert.equal(trace.phase, 'trace')
  assert.equal(trace.activeRoute?.kind, 'managed')
})

test('대안 경로 가까이에 플레이어가 있어도 조용한 보호 경로로 재방문한다', () => {
  let session = createEditSession()
  const placed = applyEdit(session, {
    type: 'place',
    zoneId: 'b-moist-soil',
    kind: 'low-cover',
    at: { x: -4.6, z: -3.8 },
  })
  session = placed.session
  const opportunities = opportunitiesFor(session)
  const ready = {
    ...createFireBelliedToadState(),
    phaseSeconds: FIRST_MAP_TOAD_TUNING.revisitDelay,
    visitCount: 1,
    lastRouteId: opportunities[0].id,
  }
  const update = advance(ready, opportunities, {
    playerAt: { x: 1.2, z: -6.2 },
  })

  assert.equal(update.state.phase, 'trace')
  assert.equal(update.state.activeRoute?.kind, 'protected')
})

test('플레이어가 접근 경로 중간에 있으면 흔적을 시작하지 않고 기다린다', () => {
  const opportunities = opportunitiesFor(createEditSession())
  const ready = {
    ...createFireBelliedToadState(),
    phaseSeconds: FIRST_MAP_TOAD_TUNING.firstTraceDelay,
  }
  const update = advance(ready, opportunities, {
    playerAt: { x: -3.55, z: -4.15 },
  })

  assert.equal(update.state.phase, 'away')
  assert.equal(update.state.activeRoute, undefined)
  assert.deepEqual(update.cues, [])
})

test('여러 관리 덮임 군집에서는 자연 연결에 닿은 한 덮임만 경로로 쓴다', () => {
  let session = createEditSession()
  for (const at of [
    { x: -4.5, z: -3.9 },
    { x: -5.3, z: -3.9 },
  ]) {
    const placed = applyEdit(session, {
      type: 'place',
      zoneId: 'b-moist-soil',
      kind: 'low-cover',
      at,
    })
    assert.equal(placed.changed, true)
    session = placed.session
  }
  const environment = evaluateLocalEnvironment(session.state)
  const opportunities = deriveToadOpportunities(environment)
  const managed = opportunities.find(({ kind }) => kind === 'managed')

  assert.equal(environment.bToC.connectedCover.length, 2)
  assert.ok(managed)
  assert.equal(managed.entryIds.length, 1)
  assert.doesNotThrow(() => assertFireBelliedToadContract(opportunities))
})

test('관리 경로를 쓰는 동안 관련 덮임은 이동·undo에서 보호되고 피난 뒤 해제된다', () => {
  let session = createEditSession()
  const placed = applyEdit(session, {
    type: 'place',
    zoneId: 'b-moist-soil',
    kind: 'low-cover',
    at: { x: -4.6, z: -3.8 },
  })
  assert.ok(placed.entryId)
  session = placed.session
  const opportunities = opportunitiesFor(session)
  const ready = {
    ...createFireBelliedToadState(),
    phaseSeconds: FIRST_MAP_TOAD_TUNING.revisitDelay,
    visitCount: 1,
    lastRouteId: opportunities[0].id,
  }
  const approaching = runUntil(
    ready,
    opportunities,
    (state) => state.phase === 'approaching' && state.routeProgress > 0.2,
  ).state
  assert.deepEqual(getOccupiedToadEditEntryIds(approaching), [placed.entryId])

  const guard = { occupiedEntryIds: getOccupiedToadEditEntryIds(approaching) }
  const blocked = applyEdit(session, { type: 'undo', zoneId: 'b-moist-soil' }, guard)
  assert.equal(blocked.changed, false)
  assert.equal(blocked.rejection, 'occupied')
  assert.equal(
    applyEdit(
      session,
      {
        type: 'move',
        zoneId: 'b-moist-soil',
        id: placed.entryId,
        to: { x: -4.8, z: -3.5 },
      },
      guard,
    ).rejection,
    'occupied',
  )
  assert.equal(
    applyEdit(
      session,
      { type: 'retrieve', zoneId: 'b-moist-soil', id: placed.entryId },
      guard,
    ).rejection,
    'occupied',
  )

  const retreating = advanceFireBelliedToad(approaching, {
    deltaSeconds: 0,
    opportunities,
    playerAt: approaching.position,
  }).state
  assert.equal(retreating.phase, 'away')
  assert.deepEqual(getOccupiedToadEditEntryIds(retreating), [placed.entryId])

  const hidden = runUntil(
    retreating,
    opportunities,
    (state) => state.phase === 'away' && !state.activeRoute,
  ).state
  assert.deepEqual(getOccupiedToadEditEntryIds(hidden), [])
  assert.equal(
    applyEdit(
      session,
      { type: 'undo', zoneId: 'b-moist-soil' },
      { occupiedEntryIds: getOccupiedToadEditEntryIds(hidden) },
    ).changed,
    true,
  )
})

test('관리 경로 조건이 사라져도 과거 좌표로 순간이동하지 않고 기존 길로 피난한다', () => {
  let session = createEditSession()
  const placed = applyEdit(session, {
    type: 'place',
    zoneId: 'b-moist-soil',
    kind: 'low-cover',
    at: { x: -4.6, z: -3.8 },
  })
  session = placed.session
  const opportunities = opportunitiesFor(session)
  const protectedOnly = opportunitiesFor(createEditSession())
  const ready = {
    ...createFireBelliedToadState(),
    phaseSeconds: FIRST_MAP_TOAD_TUNING.revisitDelay,
    visitCount: 1,
    lastRouteId: opportunities[0].id,
  }
  let state = runUntil(
    ready,
    opportunities,
    (candidate) =>
      candidate.phase === 'approaching' && candidate.routeProgress > 0.25,
  ).state
  const before = state.position
  state = advance(state, protectedOnly).state

  assert.equal(state.phase, 'away')
  assert.deepEqual(state.position, before)
  assert.equal(state.activeRoute?.kind, 'managed')
  const next = advance(state, protectedOnly).state
  assert.ok(next.routeProgress < state.routeProgress)
})

test('상태에는 네 장면 외 완료·수집·소유·죽음·점수 계약이 없다', () => {
  const opportunities = opportunitiesFor(createEditSession())
  const phases = new Set(['away', 'trace', 'approaching', 'using'])
  let state = createFireBelliedToadState()

  for (let index = 0; index < 500; index += 1) {
    assert.equal(phases.has(state.phase), true)
    state = advance(state, opportunities).state
  }

  const serialized = JSON.stringify(state)
  for (const forbidden of [
    'collected',
    'owned',
    'dead',
    'lost',
    'score',
    'complete',
    'recovered',
  ]) {
    assert.equal(serialized.includes(forbidden), false)
  }
})

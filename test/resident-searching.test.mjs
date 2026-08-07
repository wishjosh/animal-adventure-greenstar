import assert from 'node:assert/strict'
import test from 'node:test'
import { applyEdit, createEditSession } from '../src/domain/edit-model.ts'
import { evaluateLocalEnvironment } from '../src/domain/local-environment.ts'
import {
  advanceSmallResidents,
  createSmallResidentsState,
  deriveSmallResidentOpportunities,
  getOccupiedEditEntryIds,
} from '../src/domain/small-residents.ts'
import { EDIT_ZONES } from '../src/content/first-map.ts'

const FAR_PLAYER = { x: 18, z: 22 }
const focus = Object.fromEntries(EDIT_ZONES.map((zone) => [zone.id, zone.focus]))

const FAST = {
  'day-butterfly': {
    alertDistance: 0.25,
    returnDistance: 0.5,
    useDuration: 0.1,
    refugeDuration: 0.1,
    travelSpeed: 1000,
    searchDuration: 0.1,
  },
  'land-snail': {
    alertDistance: 0.25,
    returnDistance: 0.5,
    useDuration: 0.1,
    refugeDuration: 0.1,
    travelSpeed: 1000,
    searchDuration: 0.1,
  },
}

function opportunitiesOf(session) {
  const environment = evaluateLocalEnvironment(session.state)
  return deriveSmallResidentOpportunities(session.state.current, environment)
}

/** 여러 프레임을 흘리며 나온 사건 종류를 모은다. */
function run(opportunities, frames, overrides = {}) {
  let state = createSmallResidentsState(opportunities)
  const seen = []
  for (let frame = 0; frame < frames; frame += 1) {
    const update = advanceSmallResidents(
      state,
      { deltaSeconds: 0.1, opportunities, playerAt: FAR_PLAYER, ...overrides },
      FAST,
    )
    state = update.state
    seen.push(...update.events)
  }
  return { state, seen }
}

test('꽃이 하나도 없는 흙은 나비가 들러서 살필 자리로 나온다', () => {
  const opportunities = opportunitiesOf(createEditSession())

  assert.deepEqual(opportunities.butterflySearch, [
    focus['a-garden'],
    focus['b-bright-soil'],
  ])
})

test('나비가 빈 흙에 와서 잠시 살피다 아무것도 못 하고 돌아간다', () => {
  const opportunities = opportunitiesOf(createEditSession())
  const { seen } = run(opportunities, 40)

  const kinds = seen.filter(({ kind }) => kind === 'day-butterfly').map(({ type }) => type)
  assert.ok(kinds.includes('started-search'), '살피러 오는 장면이 있어야 한다')
  assert.ok(kinds.includes('reached-search'), '빈 흙에 닿는 장면이 있어야 한다')
  assert.ok(
    seen.some(
      (event) => event.type === 'left-target' && event.reason === 'search-complete',
    ),
    '살피기만 하고 그냥 떠나야 한다',
  )
})

test('꽃을 심으면 그 흙에는 더 이상 살피러 오지 않는다', () => {
  let session = createEditSession()
  for (const zoneId of ['a-garden', 'b-bright-soil']) {
    const placed = applyEdit(session, {
      type: 'place',
      zoneId,
      kind: 'low-flower',
      at: focus[zoneId],
    })
    assert.equal(placed.changed, true)
    session = placed.session
  }

  const opportunities = opportunitiesOf(session)
  assert.deepEqual(opportunities.butterflySearch, [])

  const { seen } = run(opportunities, 40)
  assert.equal(
    seen.some((event) => event.type === 'started-search' && event.kind === 'day-butterfly'),
    false,
    '자리를 채우면 재촉하는 장면이 사라져야 한다',
  )
})

test('살피기와 실제 이용을 번갈아 한다', () => {
  const opportunities = opportunitiesOf(createEditSession())
  const { seen } = run(opportunities, 60)

  const cycle = seen
    .filter(
      (event) =>
        event.kind === 'day-butterfly' &&
        (event.type === 'started-search' || event.type === 'started-return'),
    )
    .map(({ type }) => type)

  assert.ok(cycle.length >= 3, '여러 주기가 돌아야 한다')
  for (let index = 1; index < cycle.length; index += 1) {
    assert.notEqual(
      cycle[index],
      cycle[index - 1],
      '살피기만 연달아 반복하면 잔소리가 된다',
    )
  }
})

test('살피는 중에 플레이어가 가까이 오면 조용히 물러난다', () => {
  const opportunities = opportunitiesOf(createEditSession())
  let state = createSmallResidentsState(opportunities)
  let searching

  for (let frame = 0; frame < 40 && !searching; frame += 1) {
    const update = advanceSmallResidents(
      state,
      { deltaSeconds: 0.1, opportunities, playerAt: FAR_PLAYER },
      FAST,
    )
    state = update.state
    if (state.butterfly.phase === 'searching') {
      searching = state.butterfly
    }
  }
  assert.ok(searching, '살피는 상태에 들어가야 한다')

  const disturbed = advanceSmallResidents(
    state,
    { deltaSeconds: 0.1, opportunities, playerAt: state.butterfly.position },
    FAST,
  )

  assert.equal(disturbed.state.butterfly.phase, 'refuge')
  assert.deepEqual(
    disturbed.events.filter(({ kind }) => kind === 'day-butterfly'),
    [{ type: 'left-target', kind: 'day-butterfly', reason: 'player-near' }],
  )
})

test('살피는 동안에는 어떤 편집물도 점유하지 않는다', () => {
  const opportunities = opportunitiesOf(createEditSession())
  let state = createSmallResidentsState(opportunities)

  for (let frame = 0; frame < 40; frame += 1) {
    const update = advanceSmallResidents(
      state,
      { deltaSeconds: 0.1, opportunities, playerAt: FAR_PLAYER },
      FAST,
    )
    state = update.state
    if (state.butterfly.phase === 'searching') {
      assert.equal(
        getOccupiedEditEntryIds(state).length,
        0,
        '살피기는 편집을 막지 않아야 한다',
      )
    }
  }
})

test('덮임이 이어지지 않은 촉촉한 흙은 달팽이가 살필 자리로 나온다', () => {
  const opportunities = opportunitiesOf(createEditSession())

  assert.deepEqual(opportunities.snailSearch, [focus['b-moist-soil']])
})

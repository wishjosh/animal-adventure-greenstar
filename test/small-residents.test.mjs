import assert from 'node:assert/strict'
import test from 'node:test'
import { applyEdit, createEditSession } from '../src/domain/edit-model.ts'
import { evaluateLocalEnvironment } from '../src/domain/local-environment.ts'
import {
  advanceSmallResidents,
  assertSmallResidentsContract,
  BUTTERFLY_PROTECTED_FLOWER,
  createSmallResidentsState,
  deriveSmallResidentOpportunities,
  getOccupiedEditEntryIds,
  orderResidentTargets,
  selectNextEligibleTarget,
  SNAIL_PROTECTED_COVER,
} from '../src/domain/small-residents.ts'
import { EDIT_ZONES } from '../src/content/first-map.ts'

const FAR_PLAYER = { x: 18, z: 22 }
const focus = Object.fromEntries(EDIT_ZONES.map((zone) => [zone.id, zone.focus]))

const FAST_TUNING = {
  'day-butterfly': {
    alertDistance: 0.25,
    returnDistance: 0.5,
    useDuration: 0.1,
    refugeDuration: 0.1,
    travelSpeed: 1000,
  },
  'land-snail': {
    alertDistance: 0.25,
    returnDistance: 0.5,
    useDuration: 0.1,
    refugeDuration: 0.1,
    travelSpeed: 1000,
  },
}

const BUTTERFLY_EVENT_TUNING = {
  ...FAST_TUNING,
  'land-snail': {
    ...FAST_TUNING['land-snail'],
    useDuration: 999,
    refugeDuration: 999,
  },
}

function context(session = createEditSession()) {
  const environment = evaluateLocalEnvironment(session.state)
  return {
    environment,
    opportunities: deriveSmallResidentOpportunities(session.state.current, environment),
  }
}

function editTarget(resident, entryNumber, zoneId, at) {
  const entryId = 'edit-' + String(entryNumber)
  return {
    id: resident + '-' + entryId,
    kind: resident === 'butterfly' ? 'edit-flower' : 'managed-cover',
    zoneId,
    at,
    protected: false,
    entryId,
  }
}

function fourTargetOpportunities() {
  return {
    butterfly: [
      editTarget('butterfly', 10, 'a-garden', { x: -10.4, z: 3.8 }),
      editTarget('butterfly', 1, 'b-bright-soil', { x: -4.6, z: 2.7 }),
      BUTTERFLY_PROTECTED_FLOWER,
      editTarget('butterfly', 2, 'a-garden', { x: -9.2, z: 3.7 }),
    ],
    snail: [
      editTarget('snail', 11, 'b-moist-soil', { x: -4.4, z: -3.8 }),
      SNAIL_PROTECTED_COVER,
      editTarget('snail', 2, 'b-moist-soil', { x: -4.9, z: -3.7 }),
      editTarget('snail', 10, 'b-moist-soil', { x: -4.6, z: -3.6 }),
    ],
  }
}

function step(state, opportunities, overrides = {}, tuning = FAST_TUNING) {
  return advanceSmallResidents(
    state,
    {
      deltaSeconds: 0.1,
      opportunities,
      playerAt: FAR_PLAYER,
      ...overrides,
    },
    tuning,
  )
}

test('빈 편집에서도 두 주민은 보호 이용 자리와 피난처에서 새 세션을 시작한다', () => {
  const { opportunities } = context()
  const state = createSmallResidentsState(opportunities)

  assert.equal(opportunities.butterfly.length, 1)
  assert.equal(opportunities.snail.length, 1)
  assert.equal(state.butterfly.target?.protected, true)
  assert.equal(state.snail.target?.protected, true)
  assert.notDeepEqual(state.butterfly.position, state.butterfly.refuge)
  assert.notDeepEqual(state.snail.position, state.snail.refuge)
  assert.doesNotThrow(() => assertSmallResidentsContract(opportunities))

  const serialized = JSON.stringify(state)
  for (const forbidden of ['collected', 'owned', 'dead', 'lost', 'score', 'percent']) {
    assert.equal(serialized.includes(forbidden), false)
  }
})

test('후보는 입력 순서와 무관하게 보호 자리, zone, 숫자 edit ID 순으로 정렬된다', () => {
  const opportunities = fourTargetOpportunities()

  assert.deepEqual(
    orderResidentTargets(opportunities.butterfly).map(({ id }) => id),
    [
      BUTTERFLY_PROTECTED_FLOWER.id,
      'butterfly-edit-2',
      'butterfly-edit-10',
      'butterfly-edit-1',
    ],
  )
  assert.deepEqual(
    orderResidentTargets([...opportunities.butterfly].reverse()).map(({ id }) => id),
    orderResidentTargets(opportunities.butterfly).map(({ id }) => id),
  )
})

test('나비와 달팽이는 네 후보를 모두 한 번씩 이용한 뒤에만 처음 자리로 돌아온다', () => {
  const opportunities = fourTargetOpportunities()
  let state = createSmallResidentsState(opportunities)
  const visits = { 'day-butterfly': [], 'land-snail': [] }

  for (let index = 0; index < 120 && (visits['day-butterfly'].length < 4 || visits['land-snail'].length < 4); index += 1) {
    const update = step(state, opportunities)
    state = update.state
    for (const event of update.events) {
      if (event.type === 'reached-target') {
        visits[event.kind].push(event.targetId)
      }
    }
  }

  assert.deepEqual(visits['day-butterfly'].slice(0, 4), [
    'butterfly-edit-2',
    'butterfly-edit-10',
    'butterfly-edit-1',
    BUTTERFLY_PROTECTED_FLOWER.id,
  ])
  assert.deepEqual(visits['land-snail'].slice(0, 4), [
    'snail-edit-2',
    'snail-edit-10',
    'snail-edit-11',
    SNAIL_PROTECTED_COVER.id,
  ])
})

test('원형 탐색은 조용하지 않은 앞 후보를 건너뛰고 뒤의 조용한 후보를 고른다', () => {
  const opportunities = fourTargetOpportunities()
  const ordered = orderResidentTargets(opportunities.butterfly)
  assert.equal(
    selectNextEligibleTarget(
      opportunities.butterfly,
      BUTTERFLY_PROTECTED_FLOWER.id,
      ({ zoneId }) => zoneId !== 'a-garden',
    )?.id,
    'butterfly-edit-1',
  )

  const initial = createSmallResidentsState(opportunities)
  const state = {
    ...initial,
    butterfly: {
      ...initial.butterfly,
      phase: 'refuge',
      position: initial.butterfly.refuge,
      motionFrom: initial.butterfly.refuge,
      motionProgress: 1,
      phaseSeconds: FAST_TUNING['day-butterfly'].refugeDuration,
      target: undefined,
      lastTargetId: ordered[0].id,
    },
  }
  const update = step(
    state,
    opportunities,
    { deltaSeconds: 0, activeEditZoneId: 'a-garden' },
    BUTTERFLY_EVENT_TUNING,
  )
  assert.deepEqual(
    update.events.find(
      (event) => event.type === 'started-return' && event.kind === 'day-butterfly',
    ),
    {
      type: 'started-return',
      kind: 'day-butterfly',
      targetId: 'butterfly-edit-1',
    },
  )
})

test('연속 위치·시간 변화와 단계 사건은 서로 다른 계약으로 전달된다', () => {
  const { opportunities } = context()
  let state = createSmallResidentsState(opportunities)

  let update = step(
    state,
    opportunities,
    { deltaSeconds: 0.05 },
    BUTTERFLY_EVENT_TUNING,
  )
  assert.equal(update.state.butterfly.phaseSeconds, 0.05)
  assert.deepEqual(update.events, [])
  assert.equal('revision' in update.state, false)
  assert.equal('changedKinds' in update, false)
  state = update.state

  update = step(
    state,
    opportunities,
    { deltaSeconds: 0, playerAt: state.butterfly.position },
    BUTTERFLY_EVENT_TUNING,
  )
  assert.deepEqual(update.events, [
    {
      type: 'left-target',
      kind: 'day-butterfly',
      reason: 'player-near',
      targetId: BUTTERFLY_PROTECTED_FLOWER.id,
    },
  ])
  state = update.state

  update = step(state, opportunities, {}, BUTTERFLY_EVENT_TUNING)
  assert.deepEqual(update.events, [{ type: 'reached-refuge', kind: 'day-butterfly' }])
  state = update.state

  update = step(state, opportunities, {}, BUTTERFLY_EVENT_TUNING)
  assert.deepEqual(update.events, [
    {
      type: 'started-return',
      kind: 'day-butterfly',
      targetId: BUTTERFLY_PROTECTED_FLOWER.id,
    },
  ])
  state = update.state

  update = step(state, opportunities, {}, BUTTERFLY_EVENT_TUNING)
  assert.deepEqual(update.events, [
    {
      type: 'reached-target',
      kind: 'day-butterfly',
      targetId: BUTTERFLY_PROTECTED_FLOWER.id,
    },
  ])
})

test('이용하던 후보가 사라지면 매달리지 않고 target-missing 피난 사건을 낸다', () => {
  const opportunities = fourTargetOpportunities()
  const editTargetToRemove = orderResidentTargets(opportunities.butterfly)[1]
  const initial = createSmallResidentsState(opportunities)
  const state = {
    ...initial,
    butterfly: {
      ...initial.butterfly,
      phase: 'using',
      position: editTargetToRemove.at,
      target: editTargetToRemove,
      motionFrom: editTargetToRemove.at,
      motionProgress: 1,
      phaseSeconds: 0,
    },
  }
  const withoutTarget = {
    ...opportunities,
    butterfly: opportunities.butterfly.filter(({ id }) => id !== editTargetToRemove.id),
  }
  const update = step(
    state,
    withoutTarget,
    { deltaSeconds: 0 },
    BUTTERFLY_EVENT_TUNING,
  )

  assert.equal(update.state.butterfly.phase, 'refuge')
  assert.deepEqual(update.events, [
    {
      type: 'left-target',
      kind: 'day-butterfly',
      reason: 'target-missing',
      targetId: editTargetToRemove.id,
    },
  ])
})

test('나비 런타임을 바꾸어도 같은 입력에서 달팽이 상태와 사건은 달라지지 않는다', () => {
  const { opportunities } = context()
  const original = createSmallResidentsState(opportunities)
  const altered = {
    ...original,
    butterfly: {
      ...original.butterfly,
      phase: 'refuge',
      position: original.butterfly.refuge,
      motionFrom: original.butterfly.refuge,
      motionProgress: 1,
      target: undefined,
      phaseSeconds: 1.2,
    },
  }
  const first = step(original, opportunities)
  const second = step(altered, opportunities)

  assert.deepEqual(first.state.snail, second.state.snail)
  assert.deepEqual(
    first.events.filter(({ kind }) => kind === 'land-snail'),
    second.events.filter(({ kind }) => kind === 'land-snail'),
  )
})

test('이용 중인 편집물은 피난처에 도착할 때까지 이동·되돌리기에서 보호된다', () => {
  let session = createEditSession()
  const placed = applyEdit(session, {
    type: 'place',
    zoneId: 'a-garden',
    kind: 'low-flower',
    at: focus['a-garden'],
  })
  assert.ok(placed.entryId)
  session = placed.session
  const { opportunities } = context(session)
  let state = createSmallResidentsState(opportunities)

  for (let index = 0; index < 30 && state.butterfly.target?.entryId !== placed.entryId; index += 1) {
    state = step(state, opportunities).state
  }
  assert.equal(state.butterfly.target?.entryId, placed.entryId)
  assert.deepEqual(getOccupiedEditEntryIds(state), [placed.entryId])

  const blocked = applyEdit(
    session,
    { type: 'undo', zoneId: 'a-garden' },
    { occupiedEntryIds: getOccupiedEditEntryIds(state) },
  )
  assert.equal(blocked.changed, false)
  assert.equal(blocked.rejection, 'occupied')

  state = step(
    state,
    opportunities,
    { deltaSeconds: 0, activeEditZoneId: 'a-garden' },
  ).state
  assert.equal(state.butterfly.phase, 'refuge')
  assert.deepEqual(getOccupiedEditEntryIds(state), [placed.entryId])

  state = step(state, opportunities).state
  assert.deepEqual(getOccupiedEditEntryIds(state), [])
  assert.equal(
    applyEdit(
      session,
      { type: 'undo', zoneId: 'a-garden' },
      { occupiedEntryIds: getOccupiedEditEntryIds(state) },
    ).changed,
    true,
  )
})

test('성공한 꽃 편집과 이어진 촉촉한 덮임만 각 주민의 이용 후보를 늘린다', () => {
  let session = createEditSession()
  const flower = applyEdit(session, {
    type: 'place',
    zoneId: 'a-garden',
    kind: 'low-flower',
    at: focus['a-garden'],
  })
  assert.ok(flower.entryId)
  session = flower.session
  const cover = applyEdit(session, {
    type: 'place',
    zoneId: 'b-moist-soil',
    kind: 'low-cover',
    at: { x: -4.6, z: -3.8 },
  })
  assert.ok(cover.entryId)
  session = cover.session

  const { opportunities } = context(session)
  assert.equal(opportunities.butterfly.some(({ entryId }) => entryId === flower.entryId), true)
  assert.equal(opportunities.snail.some(({ entryId }) => entryId === cover.entryId), true)
  assert.equal(opportunities.butterfly[0].protected, true)
  assert.equal(opportunities.snail[0].protected, true)
})

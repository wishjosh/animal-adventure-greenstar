import assert from 'node:assert/strict'
import test from 'node:test'
import { applyEdit, createEditSession } from '../src/domain/edit-model.ts'
import { evaluateLocalEnvironment } from '../src/domain/local-environment.ts'
import { ResidentsRuntime } from '../src/runtime/residents-runtime.ts'

const quietPlayer = Object.freeze({ x: 6.5, z: -1.5 })

function input(editState, environment, overrides = {}) {
  return {
    deltaSeconds: 0.1,
    editState,
    environment,
    playerAt: quietPlayer,
    started: true,
    blocked: false,
    ...overrides,
  }
}

function joinedCoverWorld() {
  const placed = applyEdit(createEditSession(), {
    type: 'place',
    zoneId: 'b-moist-soil',
    kind: 'low-cover',
    at: { x: -5.15, z: -3.55 },
  })
  assert.equal(placed.changed, true)
  const moved = applyEdit(placed.session, {
    type: 'move',
    zoneId: 'b-moist-soil',
    id: placed.entryId,
    to: { x: -4.6, z: -3.8 },
  })
  assert.equal(moved.changed, true)
  const environment = evaluateLocalEnvironment(moved.session.state)
  assert.equal(environment.bToC.managedCover, 'joined')
  return { editState: moved.session.state, environment, entryId: placed.entryId }
}

test('빈 편집에서도 두 작은 주민과 무당개구리 보호 경로가 존재한다', () => {
  const editState = createEditSession().state
  const environment = evaluateLocalEnvironment(editState)
  const residents = new ResidentsRuntime(editState, environment)
  const snapshot = residents.snapshot()
  assert.equal(snapshot.smallResidents.butterfly.target?.protected, true)
  assert.equal(snapshot.smallResidents.snail.target?.protected, true)
  assert.equal(snapshot.toad.phase, 'away')
  assert.deepEqual(snapshot.toadOpportunities.map(({ kind }) => kind), ['protected'])
  assert.deepEqual(residents.occupiedEditEntryIds(), [])
})

test('시작 전과 화면 차단 중에는 행동·사건 시간이 흐르지 않는다', () => {
  const editState = createEditSession().state
  const environment = evaluateLocalEnvironment(editState)
  const residents = new ResidentsRuntime(editState, environment)
  const before = residents.snapshot()
  const notStarted = residents.advance(input(editState, environment, {
    deltaSeconds: 20,
    started: false,
  }))
  assert.deepEqual(notStarted.snapshot, before)
  assert.deepEqual(notStarted.toadCues, [])
  const blocked = residents.advance(input(editState, environment, {
    deltaSeconds: 20,
    blocked: true,
  }))
  assert.deepEqual(blocked.snapshot, before)
  assert.equal(blocked.snapshot.lastEventId, 0)
})

test('저장된 편집 revision이 바뀌면 관리 기회를 다시 만들되 상태를 재시작하지 않는다', () => {
  const initial = createEditSession().state
  const initialEnvironment = evaluateLocalEnvironment(initial)
  const residents = new ResidentsRuntime(initial, initialEnvironment)
  const beforeSmall = residents.snapshot().smallResidents
  const joined = joinedCoverWorld()
  const frame = residents.advance(input(joined.editState, joined.environment, {
    deltaSeconds: 0,
  }))
  assert.equal(frame.snapshot.toadOpportunities.length, 2)
  assert.ok(frame.snapshot.smallOpportunities.snail.some(({ entryId }) => entryId === joined.entryId))
  assert.equal(frame.snapshot.smallResidents.butterfly.kind, beforeSmall.butterfly.kind)
})

test('단서가 먼저 나타난 뒤 무당개구리가 접근하고 사건 번호가 앞으로 간다', () => {
  const editState = createEditSession().state
  const environment = evaluateLocalEnvironment(editState)
  const residents = new ResidentsRuntime(editState, environment)
  const cues = []
  for (let step = 0; step < 140; step += 1) {
    cues.push(...residents.advance(input(editState, environment)).toadCues)
    if (residents.snapshot().toad.phase === 'approaching') break
  }
  assert.equal(cues[0], 'refuge-rustle')
  assert.ok(cues.includes('water-ripple'))
  assert.equal(residents.snapshot().toad.phase, 'approaching')
  assert.ok(residents.snapshot().lastEventId >= 2)
})

test('관리 경로를 실제로 오갈 때 대표 덮임 하나가 편집 보호에 합쳐진다', () => {
  const joined = joinedCoverWorld()
  const residents = new ResidentsRuntime(joined.editState, joined.environment)
  let foundManagedTravel = false
  for (let step = 0; step < 800; step += 1) {
    residents.advance(input(joined.editState, joined.environment))
    const toad = residents.snapshot().toad
    if (toad.activeRoute?.kind === 'managed' && toad.phase === 'approaching') {
      foundManagedTravel = true
      break
    }
  }
  assert.equal(foundManagedTravel, true)
  assert.deepEqual(residents.occupiedEditEntryIds(), [joined.entryId])
  assert.deepEqual(residents.editGuard(), { occupiedEntryIds: [joined.entryId] })
})

test('새로 걷기는 동물 단계와 일회 사건 번호를 피난처 초기값으로 되돌린다', () => {
  const editState = createEditSession().state
  const environment = evaluateLocalEnvironment(editState)
  const residents = new ResidentsRuntime(editState, environment)
  for (let step = 0; step < 120; step += 1) {
    residents.advance(input(editState, environment))
  }
  assert.notEqual(residents.snapshot().toad.phase, 'away')
  residents.reset(editState, environment)
  assert.equal(residents.snapshot().toad.phase, 'away')
  assert.equal(residents.snapshot().toad.activeRoute, undefined)
  assert.equal(residents.snapshot().lastEventId, 0)
  assert.deepEqual(residents.occupiedEditEntryIds(), [])
})

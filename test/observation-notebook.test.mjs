import assert from 'node:assert/strict'
import test from 'node:test'
import {
  ObservationNotebookRuntime,
  readObservationNotebookState,
} from '../src/domain/observation-notebook.ts'

const protectedFlower = {
  id: 'protected-flower',
  kind: 'protected-flower',
  zoneId: 'a-garden',
  at: { x: 0, z: 0 },
  protected: true,
}
const protectedCover = {
  id: 'protected-cover',
  kind: 'protected-cover',
  zoneId: 'b-moist-soil',
  at: { x: 20, z: 20 },
  protected: true,
}

function resident(kind, target) {
  return {
    kind,
    phase: 'using',
    position: { ...target.at },
    refuge: { x: 0, z: 0 },
    target,
    motionFrom: { ...target.at },
    motionProgress: 1,
    phaseSeconds: 0,
  }
}

function input(overrides = {}) {
  return {
    elapsed: 12,
    playerAt: { x: 0, z: 0 },
    started: true,
    blocked: false,
    smallResidents: {
      butterfly: resident('day-butterfly', protectedFlower),
      snail: resident('land-snail', protectedCover),
    },
    smallEvents: [],
    toad: {
      phase: 'away',
      position: { x: 30, z: 30 },
      refuge: { x: 30, z: 30 },
      routeProgress: 0,
      phaseSeconds: 0,
      tracePulseCount: 0,
      visitCount: 0,
    },
    toadCues: [],
    ...overrides,
  }
}

test('가까이에서 실제 이용 중인 관계만 수첩에 처음 한 번 남긴다', () => {
  const notebook = new ObservationNotebookRuntime()
  const first = notebook.capture(input())
  const second = notebook.capture(input({ elapsed: 13 }))

  assert.deepEqual(first.added.map(({ id }) => id), ['butterfly-protected-flower'])
  assert.deepEqual(second.added, [])
  assert.deepEqual(notebook.snapshot().entries, [
    { id: 'butterfly-protected-flower', firstSeenAt: 12 },
  ])
})

test('빈 흙을 살피다 돌아가는 모습도 해결 지시 없이 관계 질문으로 남긴다', () => {
  const notebook = new ObservationNotebookRuntime()
  const frame = notebook.capture(input({
    smallResidents: {
      butterfly: {
        ...resident('day-butterfly', protectedFlower),
        phase: 'searching',
        position: { x: 1, z: 0 },
      },
      snail: resident('land-snail', protectedCover),
    },
    smallEvents: [
      { type: 'reached-search', kind: 'day-butterfly', at: { x: 1, z: 0 } },
    ],
  }))

  assert.deepEqual(frame.added.map(({ id }) => id), ['butterfly-search'])
})

test('플레이어가 만든 꽃과 덮임 길은 본래 관계와 구분해 기록한다', () => {
  const madeFlower = { ...protectedFlower, id: 'made-flower', kind: 'edit-flower' }
  const madeCover = { ...protectedCover, id: 'made-cover', kind: 'managed-cover', at: { x: 1, z: 1 } }
  const notebook = new ObservationNotebookRuntime()
  const frame = notebook.capture(input({
    smallResidents: {
      butterfly: resident('day-butterfly', madeFlower),
      snail: resident('land-snail', madeCover),
    },
  }))

  assert.deepEqual(frame.added.map(({ id }) => id), [
    'butterfly-made-flower',
    'snail-made-cover',
  ])
})

test('물결과 물가 도착은 보이는 거리 안에서만 무당개구리 관계로 남긴다', () => {
  const route = {
    id: 'managed-route',
    kind: 'managed',
    points: [{ x: 0, z: 0 }, { x: 1, z: 0 }],
    targetAt: { x: 1, z: 0 },
    rippleAt: { x: 0.5, z: 0 },
    entryIds: ['edit-1'],
    length: 1,
    hopCount: 2,
  }
  const notebook = new ObservationNotebookRuntime()
  const frame = notebook.capture(input({
    toad: {
      ...input().toad,
      phase: 'using',
      position: { x: 1, z: 0 },
      activeRoute: route,
      routeProgress: 1,
    },
    toadCues: ['water-ripple', 'water-touch'],
  }))

  assert.deepEqual(frame.added.map(({ id }) => id), [
    'butterfly-protected-flower',
    'toad-trace',
    'toad-made-edge',
  ])
})

test('차단 중에는 기록하지 않고 저장 상태는 알려진 ID와 중복을 거부한다', () => {
  const notebook = new ObservationNotebookRuntime()
  assert.deepEqual(notebook.capture(input({ blocked: true })).added, [])
  assert.deepEqual(
    readObservationNotebookState({
      entries: [{ id: 'snail-search', firstSeenAt: 3 }],
    }),
    { entries: [{ id: 'snail-search', firstSeenAt: 3 }] },
  )
  assert.equal(
    readObservationNotebookState({
      entries: [
        { id: 'snail-search', firstSeenAt: 3 },
        { id: 'snail-search', firstSeenAt: 4 },
      ],
    }),
    undefined,
  )
})

test('직접 살펴본 물길 단서는 순서와 무관하게 한 번씩 기록한다', () => {
  const notebook = new ObservationNotebookRuntime()

  assert.deepEqual(notebook.record('waterway-downstream', 9), [
    { id: 'waterway-downstream', firstSeenAt: 9 },
  ])
  assert.deepEqual(notebook.record('waterway-junction', 12), [
    { id: 'waterway-junction', firstSeenAt: 12 },
  ])
  assert.deepEqual(notebook.record('waterway-downstream', 15), [])
  assert.equal(notebook.has('waterway-upstream'), false)
  assert.equal(notebook.has('waterway-junction'), true)
})

test('발원지 관찰과 나중에 B에 닿은 변화는 서로 다른 관계로 남는다', () => {
  const notebook = new ObservationNotebookRuntime()

  assert.deepEqual(notebook.record('headwater-source', 20), [
    { id: 'headwater-source', firstSeenAt: 20 },
  ])
  assert.equal(notebook.has('headwater-arrival'), false)
  assert.deepEqual(notebook.record('headwater-arrival', 48), [
    { id: 'headwater-arrival', firstSeenAt: 48 },
  ])
  assert.deepEqual(notebook.record('headwater-arrival', 60), [])
})

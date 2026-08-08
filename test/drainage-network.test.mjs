import assert from 'node:assert/strict'
import test from 'node:test'
import { applyEdit, createEditSession } from '../src/domain/edit-model.ts'
import {
  assertDrainageNetworkContract,
  deriveDrainageNetwork,
  drainageEntryIdsNearPoint,
  drainageNetworkState,
  drainageStateNearPoint,
} from '../src/domain/drainage-network.ts'

function placeDrainage(session, from, to) {
  const result = applyEdit(session, {
    type: 'place-drainage', zoneId: 'a-garden', from, to,
  })
  assert.equal(result.changed, true, result.rejection)
  return result.session
}

test('빈 정원과 출구에 닿지 않은 홈은 none과 holding으로 구분된다', () => {
  assertDrainageNetworkContract()
  const empty = createEditSession().state
  assert.equal(drainageNetworkState(empty), 'none')
  assert.deepEqual(deriveDrainageNetwork(empty), {
    zoneId: 'a-garden',
    state: 'none',
    segments: [],
    endpoints: [],
    connections: [],
    outletConnections: [],
    components: [],
  })

  const holding = placeDrainage(
    createEditSession(),
    { x: -10.2, z: 3.65 },
    { x: -9.4, z: 3.65 },
  )
  const network = deriveDrainageNetwork(holding.state)
  assert.equal(network.state, 'holding')
  assert.equal(network.endpoints.length, 2)
  assert.equal(network.connections.length, 0)
  assert.deepEqual(network.components.map(({ entryIds, state }) => ({ entryIds, state })), [
    { entryIds: ['edit-1'], state: 'holding' },
  ])
})

test('끝점끼리 이어 출구에 닿은 조각 묶음만 outflow가 된다', () => {
  let session = placeDrainage(
    createEditSession(),
    { x: -10.2, z: 3.65 },
    { x: -9.4, z: 3.65 },
  )
  session = placeDrainage(
    session,
    { x: -9.4, z: 3.65 },
    { x: -8.65, z: 5 },
  )
  session = placeDrainage(
    session,
    { x: -11.5, z: 4.4 },
    { x: -10.8, z: 4.4 },
  )
  const network = deriveDrainageNetwork(session.state)
  assert.equal(network.state, 'outflow')
  assert.equal(network.connections.length, 1)
  assert.deepEqual(network.components.map(({ entryIds, state }) => ({ entryIds, state })), [
    { entryIds: ['edit-1', 'edit-2'], state: 'outflow' },
    { entryIds: ['edit-3'], state: 'holding' },
  ])
  assert.deepEqual(
    network.outletConnections.map(({ entryId, end, outletId, distance }) => ({
      entryId, end, outletId, distance,
    })),
    [{
      entryId: 'edit-2',
      end: 'to',
      outletId: 'a-garden-drainage-outlet',
      distance: 0,
    }],
  )

  assert.equal(
    drainageStateNearPoint(session.state, 'a-garden', { x: -9.8, z: 3.65 }),
    'outflow',
  )
  assert.deepEqual(
    drainageEntryIdsNearPoint(session.state, 'a-garden', { x: -9.8, z: 3.65 }),
    ['edit-1', 'edit-2'],
  )
  assert.equal(
    drainageStateNearPoint(session.state, 'a-garden', { x: -11.15, z: 4.4 }),
    'holding',
  )
  assert.deepEqual(
    drainageEntryIdsNearPoint(session.state, 'a-garden', { x: -11.15, z: 4.4 }),
    ['edit-3'],
  )
  assert.equal(
    drainageStateNearPoint(session.state, 'a-garden', { x: -12, z: 5 }),
    'none',
  )
  assert.deepEqual(
    drainageEntryIdsNearPoint(session.state, 'a-garden', { x: -12, z: 5 }),
    [],
  )
})

test('저장 객체의 삽입 순서가 달라도 연결망 파생 순서는 같다', () => {
  let session = placeDrainage(
    createEditSession(),
    { x: -10.2, z: 3.65 },
    { x: -9.4, z: 3.65 },
  )
  session = placeDrainage(
    session,
    { x: -9.4, z: 3.65 },
    { x: -8.65, z: 5 },
  )
  const reversed = {
    ...session.state,
    current: {
      ...session.state.current,
      'a-garden': Object.fromEntries(
        Object.entries(session.state.current['a-garden']).reverse(),
      ),
    },
  }
  assert.deepEqual(
    deriveDrainageNetwork(reversed),
    deriveDrainageNetwork(session.state),
  )
})

import assert from 'node:assert/strict'
import test from 'node:test'
import {
  applyEdit,
  createEditSession,
  toPersistentEditState,
} from '../src/domain/edit-model.ts'
import {
  UPSTREAM_DELIVERY_DELAY_SECONDS,
  advanceUpstreamWaterway,
  createUpstreamWaterwayState,
  deriveHeadwaterProfile,
  hasUpstreamDeliveryArrived,
  headwaterProfileAtB,
  headwaterSourceSignature,
  pendingUpstreamDelivery,
  readPersistentUpstreamWaterwayState,
  upstreamDeliveryProgress,
} from '../src/domain/upstream-waterway.ts'

function slowShadedHeadwater() {
  let session = createEditSession()
  for (const command of [
    {
      type: 'place', zoneId: 'd-headwater-edge', kind: 'low-cover',
      at: { x: -5.35, z: -22.15 },
    },
    {
      type: 'shape-ground', zoneId: 'd-headwater-edge', direction: 'lower',
      at: { x: -5.35, z: -22.15 },
    },
    {
      type: 'place-structure', zoneId: 'd-headwater-edge', form: 'shade',
      at: { x: -5.7, z: -23.2 }, rotation: 0.2,
    },
  ]) {
    const result = applyEdit(session, command)
    assert.equal(result.changed, true, result.rejection)
    session = result.session
  }
  return session
}

function quickDappledHeadwater() {
  let session = createEditSession()
  for (const command of [
    {
      type: 'place-drainage', zoneId: 'd-headwater-edge',
      from: { x: -5.55, z: -22.15 }, to: { x: -4.75, z: -21.38 },
    },
    {
      type: 'place-structure', zoneId: 'd-headwater-edge', form: 'rack',
      at: { x: -5.55, z: -23.25 }, rotation: -0.35,
    },
  ]) {
    const result = applyEdit(session, command)
    assert.equal(result.changed, true, result.rejection)
    session = result.session
  }
  return session
}

test('빈 발원지는 이미 흐르지만 플레이어 변화가 생기기 전에는 B 전달을 만들지 않는다', () => {
  const edits = toPersistentEditState(createEditSession())
  const state = createUpstreamWaterwayState(edits, 120)

  assert.deepEqual(state, { sourceSignature: headwaterSourceSignature(edits) })
  assert.equal(state.delivered, undefined)
  assert.deepEqual(headwaterProfileAtB(state), deriveHeadwaterProfile(edits))
  assert.equal(upstreamDeliveryProgress(state, 999), 0)
  assert.equal(hasUpstreamDeliveryArrived(state, 999), false)
  assert.equal(Object.hasOwn(state, 'completed'), false)
})

test('느리게 머무는 조합과 빠르게 이어지는 조합을 서로 다른 연속 기능으로 모두 인정한다', () => {
  const slow = toPersistentEditState(slowShadedHeadwater())
  const quick = toPersistentEditState(quickDappledHeadwater())
  const slowProfile = deriveHeadwaterProfile(slow)
  const quickProfile = deriveHeadwaterProfile(quick)

  assert.ok(slowProfile.retention > quickProfile.retention)
  assert.ok(quickProfile.continuity > slowProfile.continuity)
  assert.ok(slowProfile.shade > 0 && quickProfile.shade > 0)

  const baseline = createUpstreamWaterwayState()
  const slowState = advanceUpstreamWaterway(baseline, {
    editState: slow,
    worldElapsed: 10,
  })
  const quickState = advanceUpstreamWaterway(baseline, {
    editState: quick,
    worldElapsed: 10,
  })
  assert.deepEqual(pendingUpstreamDelivery(slowState).profile, slowProfile)
  assert.deepEqual(pendingUpstreamDelivery(quickState).profile, quickProfile)
  assert.equal(slowState.pending.arrivesAt, 10 + UPSTREAM_DELIVERY_DELAY_SECONDS)
  assert.equal(quickState.pending.arrivesAt, 10 + UPSTREAM_DELIVERY_DELAY_SECONDS)
  assert.equal(Object.hasOwn(slowState, 'solved'), false)
  assert.equal(Object.hasOwn(quickState, 'solved'), false)
})

test('발원지의 네 구조물은 각각 흐름 기능을 바꾸고 가지 둑은 방향에도 반응한다', () => {
  const baseline = deriveHeadwaterProfile(toPersistentEditState(createEditSession()))
  const profileFor = (form, rotation = 0) => {
    const placed = applyEdit(createEditSession(), {
      type: 'place-structure',
      zoneId: 'd-headwater-edge',
      form,
      at: { x: -5.7, z: -23.2 },
      rotation,
    })
    assert.equal(placed.changed, true, placed.rejection)
    return deriveHeadwaterProfile(toPersistentEditState(placed.session))
  }

  for (const form of ['support', 'rack', 'fence', 'shade']) {
    assert.notDeepEqual(profileFor(form), baseline, form)
  }
  assert.notDeepEqual(profileFor('fence', 0), profileFor('fence', Math.PI / 2))
})

test('상류 변화는 절대 세계 시간만큼 이동한 뒤 B에 닿고 멈춘 화면 시간은 건너뛰지 않는다', () => {
  const edits = toPersistentEditState(slowShadedHeadwater())
  const changed = advanceUpstreamWaterway(createUpstreamWaterwayState(), {
    editState: edits,
    worldElapsed: 20,
  })

  assert.equal(upstreamDeliveryProgress(changed, 20), 0)
  assert.equal(
    upstreamDeliveryProgress(changed, 20 + UPSTREAM_DELIVERY_DELAY_SECONDS / 2),
    0.5,
  )
  assert.equal(hasUpstreamDeliveryArrived(
    changed,
    20 + UPSTREAM_DELIVERY_DELAY_SECONDS - 0.001,
  ), false)
  assert.equal(hasUpstreamDeliveryArrived(
    changed,
    20 + UPSTREAM_DELIVERY_DELAY_SECONDS,
  ), true)
  const delivered = advanceUpstreamWaterway(changed, {
    editState: edits,
    worldElapsed: 20 + UPSTREAM_DELIVERY_DELAY_SECONDS,
  })
  assert.equal(delivered.pending, undefined)
  assert.deepEqual(delivered.delivered, changed.pending)
  assert.deepEqual(headwaterProfileAtB(delivered), changed.pending.profile)
  assert.equal(
    advanceUpstreamWaterway(delivered, { editState: edits, worldElapsed: 500 }),
    delivered,
  )
})

test('발원지 원복과 되돌리기도 현재 모습을 새 근원으로 보내며 A 편집은 보내지 않는다', () => {
  const slowSession = slowShadedHeadwater()
  const slow = toPersistentEditState(slowSession)
  const first = advanceUpstreamWaterway(createUpstreamWaterwayState(), {
    editState: slow,
    worldElapsed: 5,
  })

  let restored = slowSession
  while (restored.history['d-headwater-edge'].length > 0) {
    const undone = applyEdit(restored, { type: 'undo', zoneId: 'd-headwater-edge' })
    assert.equal(undone.changed, true)
    restored = undone.session
  }
  const emptyAgain = toPersistentEditState(restored)
  const reverted = advanceUpstreamWaterway(first, {
    editState: emptyAgain,
    worldElapsed: 40,
  })
  assert.notEqual(reverted.sourceSignature, first.sourceSignature)
  assert.deepEqual(reverted.pending.profile, deriveHeadwaterProfile(emptyAgain))
  assert.equal(reverted.sourceChangedAt, 40)

  const gardenEdit = applyEdit(restored, {
    type: 'place', zoneId: 'a-garden', kind: 'low-flower',
    at: { x: -9.8, z: 3.65 },
  })
  assert.equal(gardenEdit.changed, true)
  assert.equal(
    advanceUpstreamWaterway(reverted, {
      editState: toPersistentEditState(gardenEdit.session),
      worldElapsed: 50,
    }),
    reverted,
  )
})

test('상류 V6 상태는 편집 모습과 세계 시간을 함께 엄격하게 판독한다', () => {
  const edits = toPersistentEditState(quickDappledHeadwater())
  const state = advanceUpstreamWaterway(createUpstreamWaterwayState(), {
    editState: edits,
    worldElapsed: 12,
  })

  assert.deepEqual(readPersistentUpstreamWaterwayState(state, edits, 12), state)
  assert.equal(
    readPersistentUpstreamWaterwayState({ ...state, completed: true }, edits, 12),
    undefined,
  )
  const invalidProfile = structuredClone(state)
  invalidProfile.pending.profile.retention = 1.01
  assert.equal(readPersistentUpstreamWaterwayState(invalidProfile, edits, 12), undefined)
  assert.equal(readPersistentUpstreamWaterwayState(state, edits, 11.99), undefined)
  assert.equal(
    readPersistentUpstreamWaterwayState(
      state,
      toPersistentEditState(createEditSession()),
      12,
    ),
    undefined,
  )
})

test('새 상류 변화가 이동 중이어도 B는 이전에 도착한 모습을 유지하고 재접속 뒤 교체한다', () => {
  const slow = toPersistentEditState(slowShadedHeadwater())
  const quick = toPersistentEditState(quickDappledHeadwater())
  const firstPending = advanceUpstreamWaterway(createUpstreamWaterwayState(), {
    editState: slow,
    worldElapsed: 10,
  })
  const firstArrived = advanceUpstreamWaterway(firstPending, {
    editState: slow,
    worldElapsed: 10 + UPSTREAM_DELIVERY_DELAY_SECONDS,
  })
  const secondPending = advanceUpstreamWaterway(firstArrived, {
    editState: quick,
    worldElapsed: 40,
  })

  assert.deepEqual(headwaterProfileAtB(secondPending), deriveHeadwaterProfile(slow))
  assert.deepEqual(secondPending.pending.profile, deriveHeadwaterProfile(quick))
  const restored = readPersistentUpstreamWaterwayState(secondPending, quick, 52)
  assert.ok(restored)
  assert.deepEqual(headwaterProfileAtB(restored), deriveHeadwaterProfile(slow))

  const secondArrived = advanceUpstreamWaterway(restored, {
    editState: quick,
    worldElapsed: 40 + UPSTREAM_DELIVERY_DELAY_SECONDS,
  })
  assert.equal(secondArrived.pending, undefined)
  assert.deepEqual(headwaterProfileAtB(secondArrived), deriveHeadwaterProfile(quick))
})

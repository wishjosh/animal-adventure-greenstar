import assert from 'node:assert/strict'
import test from 'node:test'
import { EDIT_ZONES } from '../src/content/first-map.ts'
import {
  MAX_UNDO_PER_ZONE,
  applyEdit,
  canUndo,
  createEditSession,
  getEntry,
  readPersistentEditState,
  toPersistentEditState,
} from '../src/domain/edit-model.ts'

const focus = (id) => EDIT_ZONES.find((zone) => zone.id === id).focus

test('편집 범위 밖의 행동은 현재 상태·번호·revision·이력을 바꾸지 않는다', () => {
  const session = createEditSession()
  const result = applyEdit(session, {
    type: 'place',
    zoneId: 'a-garden',
    kind: 'low-flower',
    at: { x: 0, z: -8 },
  })
  assert.equal(result.changed, false)
  assert.equal(result.rejection, 'outside-edit-zone')
  assert.equal(result.session, session)
  assert.deepEqual(result.session, session)

  const unknown = applyEdit(session, { type: 'undo', zoneId: 'missing' })
  assert.equal(unknown.changed, false)
  assert.equal(unknown.rejection, 'unknown-edit-zone')
  assert.equal(unknown.session, session)
})

test('꽃은 놓고 옮기고 담고 구역별로 방금 전 상태를 되돌릴 수 있다', () => {
  let session = createEditSession()
  const placed = applyEdit(session, {
    type: 'place',
    zoneId: 'a-garden',
    kind: 'low-flower',
    at: focus('a-garden'),
  })
  assert.equal(placed.changed, true)
  session = placed.session
  const id = placed.entryId
  assert.ok(id)

  const moved = applyEdit(session, {
    type: 'move',
    zoneId: 'a-garden',
    id,
    to: { x: -10.7, z: 3.4 },
  })
  assert.equal(moved.changed, true)
  session = moved.session
  assert.deepEqual(getEntry(session, id).at, { x: -10.7, z: 3.4 })

  const retrieved = applyEdit(session, { type: 'retrieve', zoneId: 'a-garden', id })
  assert.equal(retrieved.changed, true)
  session = retrieved.session
  assert.equal(getEntry(session, id), undefined)

  const undone = applyEdit(session, { type: 'undo', zoneId: 'a-garden' })
  assert.equal(undone.changed, true)
  assert.deepEqual(getEntry(undone.session, id).at, { x: -10.7, z: 3.4 })
  assert.equal(canUndo(undone.session, 'b-bright-soil'), false)
})

test('식물과 지면 덧층은 공존하고 원래 흙 복원은 식물을 남긴다', () => {
  let session = createEditSession()
  const flower = applyEdit(session, {
    type: 'place', zoneId: 'a-garden', kind: 'low-flower', at: focus('a-garden'),
  })
  session = flower.session
  const ground = applyEdit(session, {
    type: 'adjust-ground', zoneId: 'a-garden', at: focus('a-garden'),
  })
  session = ground.session
  const restored = applyEdit(session, {
    type: 'restore-ground', zoneId: 'a-garden', id: ground.entryId,
  })
  assert.equal(restored.changed, true)
  assert.ok(getEntry(restored.session, flower.entryId))
  assert.equal(getEntry(restored.session, ground.entryId), undefined)
})

test('점유 중인 덧층을 바꾸는 되돌리기는 이력을 소비하지 않는다', () => {
  const placed = applyEdit(createEditSession(), {
    type: 'place', zoneId: 'b-bright-soil', kind: 'low-cover', at: focus('b-bright-soil'),
  })
  const blocked = applyEdit(
    placed.session,
    { type: 'undo', zoneId: 'b-bright-soil' },
    { occupiedEntryIds: [placed.entryId] },
  )
  assert.equal(blocked.changed, false)
  assert.equal(blocked.rejection, 'occupied')
  assert.equal(blocked.session, placed.session)
  assert.equal(canUndo(blocked.session, 'b-bright-soil'), true)
})

test('되돌리기 이력은 흙자리마다 기술 상한 안에 머문다', () => {
  let session = createEditSession()
  for (let index = 0; index < MAX_UNDO_PER_ZONE + 8; index += 1) {
    const placed = applyEdit(session, {
      type: 'place', zoneId: 'a-garden', kind: 'low-flower', at: focus('a-garden'),
    })
    session = placed.session
    session = applyEdit(session, {
      type: 'retrieve', zoneId: 'a-garden', id: placed.entryId,
    }).session
  }
  assert.equal(session.history['a-garden'].length, MAX_UNDO_PER_ZONE)
  assert.equal(session.history['b-bright-soil'].length, 0)
})

test('저장 왕복은 현재 편집과 다음 ID만 복원하고 방금 전 이력은 비운다', () => {
  const placed = applyEdit(createEditSession(), {
    type: 'place', zoneId: 'b-moist-soil', kind: 'low-cover', at: focus('b-moist-soil'),
  })
  const persistent = toPersistentEditState(placed.session)
  const decoded = readPersistentEditState(JSON.parse(JSON.stringify(persistent)))
  assert.ok(decoded)
  const reloaded = createEditSession(decoded)
  assert.deepEqual(reloaded.state, persistent)
  assert.equal(canUndo(reloaded, 'b-moist-soil'), false)

  const next = applyEdit(reloaded, {
    type: 'adjust-ground', zoneId: 'b-moist-soil', at: { x: -5.15, z: -3.55 },
  })
  assert.equal(next.entryId, 'edit-2')
  assert.equal(canUndo(next.session, 'b-moist-soil'), true)
})

test('손상된 편집 저장은 부분 복구하지 않는다', () => {
  const valid = toPersistentEditState(createEditSession())
  assert.equal(readPersistentEditState({ ...valid, nextId: 0 }), undefined)
  assert.equal(
    readPersistentEditState({
      ...valid,
      current: { ...valid.current, 'b-moist-soil': undefined },
    }),
    undefined,
  )
  assert.equal(
    readPersistentEditState({
      current: {
        ...valid.current,
        'a-garden': {
          'edit-1': {
            id: 'edit-1', zoneId: 'a-garden', kind: 'low-flower',
            at: { x: Number.NaN, z: 3 }, rotation: 0,
          },
        },
      },
      nextId: 2,
      revision: 1,
    }),
    undefined,
  )
})

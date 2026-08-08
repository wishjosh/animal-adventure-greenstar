import assert from 'node:assert/strict'
import test from 'node:test'
import { EDIT_ZONES, terrainHeight } from '../src/content/first-map.ts'
import {
  DRAINAGE_SEGMENT_DEPTH,
  DRAINAGE_SEGMENT_HALF_WIDTH,
  DRAINAGE_SEGMENT_MAX_LENGTH,
  DRAINAGE_SEGMENT_MIN_LENGTH,
  MAX_UNDO_PER_ZONE,
  MAX_TERRAIN_DELTA,
  MAX_TERRAIN_PATCHES_PER_ZONE,
  STRUCTURE_FOOTPRINTS,
  TERRAIN_PATCH_HEIGHT_STEP,
  TERRAIN_PATCH_RADIUS,
  applyEdit,
  canUndo,
  createEditSession,
  drainageDepthAt,
  drainageSegmentEndpoints,
  editEntryFootprintRadius,
  editedTerrainHeight,
  findTerrainPatchAt,
  getEntry,
  migratePersistentEditStateV5,
  readLegacyPersistentEditState,
  readPersistentEditState,
  readPersistentEditStateV4,
  readPersistentEditStateV5,
  terrainDeltaAt,
  toPersistentEditState,
} from '../src/domain/edit-model.ts'

const focus = (id) => EDIT_ZONES.find((zone) => zone.id === id).focus

const asV5 = (state) => ({
  current: {
    'a-garden': structuredClone(state.current['a-garden']),
    'b-bright-soil': structuredClone(state.current['b-bright-soil']),
    'b-moist-soil': structuredClone(state.current['b-moist-soil']),
  },
  nextId: state.nextId,
  revision: state.revision,
})

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

test('높이기와 낮추기는 원래 지형 위에 완만한 실제 높이 변화를 만든다', () => {
  const at = focus('a-garden')
  const raised = applyEdit(createEditSession(), {
    type: 'shape-ground', zoneId: 'a-garden', direction: 'raise', at,
  })
  assert.equal(raised.changed, true)
  assert.equal(getEntry(raised.session, raised.entryId).direction, 'raise')
  assert.ok(Math.abs(terrainDeltaAt(raised.session.state, at) - TERRAIN_PATCH_HEIGHT_STEP) < 1e-9)
  assert.ok(
    Math.abs(
      editedTerrainHeight(raised.session.state, at.x, at.z) -
        terrainHeight(at.x, at.z) - TERRAIN_PATCH_HEIGHT_STEP,
    ) < 1e-9,
  )

  const halfway = { x: at.x + TERRAIN_PATCH_RADIUS / 2, z: at.z }
  assert.ok(
    Math.abs(terrainDeltaAt(raised.session.state, halfway) - TERRAIN_PATCH_HEIGHT_STEP / 2) < 1e-9,
  )
  assert.equal(
    terrainDeltaAt(raised.session.state, { x: at.x + TERRAIN_PATCH_RADIUS, z: at.z }),
    0,
  )
  assert.equal(
    terrainDeltaAt(raised.session.state, { x: at.x + TERRAIN_PATCH_RADIUS + 0.01, z: at.z }),
    0,
  )
  assert.equal(findTerrainPatchAt(raised.session.state, 'a-garden', at).id, raised.entryId)

  const lowered = applyEdit(createEditSession(), {
    type: 'shape-ground', zoneId: 'a-garden', direction: 'lower', at,
  })
  assert.ok(Math.abs(terrainDeltaAt(lowered.session.state, at) + TERRAIN_PATCH_HEIGHT_STEP) < 1e-9)

  const patch = getEntry(raised.session, raised.entryId)
  const stacked = {
    ...raised.session.state.current,
    'a-garden': {
      [patch.id]: patch,
      'edit-98': { ...patch, id: 'edit-98' },
      'edit-99': { ...patch, id: 'edit-99' },
    },
  }
  assert.equal(terrainDeltaAt(stacked, at), MAX_TERRAIN_DELTA)
})

test('조형 패치는 식물·흙손질과 공존하지만 서로 너무 가까이 겹치지 않는다', () => {
  const at = focus('a-garden')
  let session = applyEdit(createEditSession(), {
    type: 'place', zoneId: 'a-garden', kind: 'low-flower', at,
  }).session
  session = applyEdit(session, {
    type: 'adjust-ground', zoneId: 'a-garden', at,
  }).session
  const shaped = applyEdit(session, {
    type: 'shape-ground', zoneId: 'a-garden', direction: 'raise', at,
  })
  assert.equal(shaped.changed, true)
  assert.equal(Object.keys(shaped.session.state.current['a-garden']).length, 3)

  const crowded = applyEdit(shaped.session, {
    type: 'shape-ground', zoneId: 'a-garden', direction: 'lower',
    at: { x: at.x + 0.3, z: at.z },
  })
  assert.equal(crowded.changed, false)
  assert.equal(crowded.rejection, 'overlap')
  const beside = applyEdit(shaped.session, {
    type: 'shape-ground', zoneId: 'a-garden', direction: 'lower',
    at: { x: at.x + 0.47, z: at.z },
  })
  assert.equal(beside.changed, true)
})

test('조형은 허용 흙 전체 반경·본래 물길과 길 중심선·구역별 개수를 지킨다', () => {
  const at = focus('a-garden')
  const protectedRoute = applyEdit(createEditSession(), {
    type: 'shape-ground', zoneId: 'a-garden', direction: 'raise', at: { x: -11, z: 0 },
  })
  assert.equal(protectedRoute.rejection, 'protected-ground')

  const clipped = applyEdit(createEditSession(), {
    type: 'shape-ground', zoneId: 'a-garden', direction: 'raise',
    at: EDIT_ZONES.find((zone) => zone.id === 'a-garden').outline[6],
  })
  assert.equal(clipped.rejection, 'outside-edit-zone')

  let session = createEditSession()
  const candidates = []
  for (let z = 2.75; z <= 4.75; z += 0.47) {
    for (let x = -11.55; x <= -8.05; x += 0.47) {
      candidates.push({ x, z })
    }
  }
  for (const candidate of candidates) {
    if (
      Object.values(session.state.current['a-garden']).filter(
        (entry) => entry.kind === 'terrain-patch',
      ).length >= MAX_TERRAIN_PATCHES_PER_ZONE
    ) break
    const result = applyEdit(session, {
      type: 'shape-ground', zoneId: 'a-garden', direction: 'raise', at: candidate,
    })
    if (result.changed) session = result.session
  }
  assert.equal(
    Object.values(session.state.current['a-garden']).filter(
      (entry) => entry.kind === 'terrain-patch',
    ).length,
    MAX_TERRAIN_PATCHES_PER_ZONE,
  )
  const limited = applyEdit(session, {
    type: 'shape-ground', zoneId: 'a-garden', direction: 'raise', at,
  })
  assert.equal(limited.rejection, 'terrain-patch-limit')
})

test('조형의 가장자리까지 길 전체 폭을 침범하지 않으면서 세 흙자리에 조형 여유가 남는다', () => {
  // B 밝은 흙의 중심은 길 중심선에서는 멀지만 넓은 A–B 길 가장자리와는 가깝다.
  // 패치의 완만한 바깥쪽까지 길에 닿으므로 보호해야 한다.
  const roadEdge = applyEdit(createEditSession(), {
    type: 'shape-ground',
    zoneId: 'b-bright-soil',
    direction: 'raise',
    at: focus('b-bright-soil'),
  })
  assert.equal(roadEdge.changed, false)
  assert.equal(roadEdge.rejection, 'protected-ground')

  const available = [
    { zoneId: 'a-garden', at: focus('a-garden') },
    { zoneId: 'b-bright-soil', at: { x: -4.6, z: 3.2 } },
    { zoneId: 'b-moist-soil', at: focus('b-moist-soil') },
  ]
  for (const { zoneId, at } of available) {
    const shaped = applyEdit(createEditSession(), {
      type: 'shape-ground', zoneId, direction: 'lower', at,
    })
    assert.equal(shaped.changed, true, zoneId + '에는 길을 피한 조형 자리가 남아야 한다.')
  }
})

test('조형·복원·되돌리기는 이용 중인 지표 영향권을 건드리지 않는다', () => {
  const at = focus('a-garden')
  const guard = { protectedGroundPoints: [{ at, radius: 0.36 }] }
  const blockedShape = applyEdit(
    createEditSession(),
    { type: 'shape-ground', zoneId: 'a-garden', direction: 'raise', at },
    guard,
  )
  assert.equal(blockedShape.rejection, 'occupied')

  const shaped = applyEdit(createEditSession(), {
    type: 'shape-ground', zoneId: 'a-garden', direction: 'raise', at,
  })
  const blockedRestore = applyEdit(
    shaped.session,
    { type: 'restore-terrain', zoneId: 'a-garden', id: shaped.entryId },
    guard,
  )
  assert.equal(blockedRestore.rejection, 'occupied')
  const blockedUndo = applyEdit(
    shaped.session,
    { type: 'undo', zoneId: 'a-garden' },
    guard,
  )
  assert.equal(blockedUndo.rejection, 'occupied')
  assert.equal(canUndo(shaped.session, 'a-garden', guard), false)

  const restored = applyEdit(shaped.session, {
    type: 'restore-terrain', zoneId: 'a-garden', id: shaped.entryId,
  })
  assert.equal(restored.changed, true)
  assert.equal(terrainDeltaAt(restored.session.state, at), 0)
  const undone = applyEdit(restored.session, { type: 'undo', zoneId: 'a-garden' })
  assert.equal(undone.changed, true)
  assert.equal(terrainDeltaAt(undone.session.state, at), TERRAIN_PATCH_HEIGHT_STEP)
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

test('자란 꽃 군락은 일부만 솎고 되돌리면 원래 줄기 수로 돌아간다', () => {
  const placed = applyEdit(createEditSession(), {
    type: 'place', zoneId: 'a-garden', kind: 'low-flower', at: focus('a-garden'),
  })
  assert.equal(placed.changed, true)
  assert.equal(placed.session.state.current['a-garden'][placed.entryId].thinned, false)

  const thinned = applyEdit(placed.session, {
    type: 'thin', zoneId: 'a-garden', id: placed.entryId,
  })
  assert.equal(thinned.changed, true)
  assert.equal(thinned.session.state.current['a-garden'][placed.entryId].thinned, true)

  const repeated = applyEdit(thinned.session, {
    type: 'thin', zoneId: 'a-garden', id: placed.entryId,
  })
  assert.equal(repeated.changed, false)
  assert.equal(repeated.rejection, 'already-thinned')

  const undone = applyEdit(thinned.session, { type: 'undo', zoneId: 'a-garden' })
  assert.equal(undone.changed, true)
  assert.equal(undone.session.state.current['a-garden'][placed.entryId].thinned, false)
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

test('현재 판독기는 조형 방향을 엄격히 읽고 legacy 판독기는 새 조형을 거부한다', () => {
  const shaped = applyEdit(createEditSession(), {
    type: 'shape-ground', zoneId: 'a-garden', direction: 'lower', at: focus('a-garden'),
  })
  const persistent = toPersistentEditState(shaped.session)
  assert.deepEqual(readPersistentEditState(persistent), persistent)
  assert.equal(readLegacyPersistentEditState(persistent), undefined)

  const brokenDirection = structuredClone(persistent)
  brokenDirection.current['a-garden'][shaped.entryId].direction = 'sideways'
  assert.equal(readPersistentEditState(brokenDirection), undefined)

  const legacyGround = applyEdit(createEditSession(), {
    type: 'adjust-ground', zoneId: 'a-garden', at: focus('a-garden'),
  }).session.state
  const withOldExtra = structuredClone(legacyGround)
  withOldExtra.current['a-garden']['edit-1'].oldV3Extra = { keptByFutureCode: true }
  const decodedLegacy = readLegacyPersistentEditState(withOldExtra)
  assert.ok(decodedLegacy)
  assert.equal(decodedLegacy.current['a-garden']['edit-1'].kind, 'surface-adjustment')
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

test('두 점으로 판 작은 배수 홈은 실제 지형을 0.12 낮추고 조형 패치와 공존한다', () => {
  const from = { x: -10.2, z: 3.65 }
  const to = { x: -9.4, z: 3.65 }
  const at = { x: -9.8, z: 3.65 }
  const placed = applyEdit(createEditSession(), {
    type: 'place-drainage', zoneId: 'a-garden', from, to,
  })
  assert.equal(placed.changed, true)
  const entry = getEntry(placed.session, placed.entryId)
  assert.equal(entry.kind, 'drainage-segment')
  const endpoints = drainageSegmentEndpoints(entry)
  assert.ok(Math.hypot(endpoints.from.x - from.x, endpoints.from.z - from.z) < 1e-9)
  assert.ok(Math.hypot(endpoints.to.x - to.x, endpoints.to.z - to.z) < 1e-9)
  assert.ok(
    Math.abs(
      editEntryFootprintRadius(entry) -
        Math.hypot(entry.length / 2, DRAINAGE_SEGMENT_HALF_WIDTH),
    ) < 1e-9,
  )
  assert.equal(drainageDepthAt(placed.session.state, at), DRAINAGE_SEGMENT_DEPTH)
  assert.ok(
    Math.abs(
      editedTerrainHeight(placed.session.state, at.x, at.z) -
        terrainHeight(at.x, at.z) + DRAINAGE_SEGMENT_DEPTH,
    ) < 1e-9,
  )
  assert.equal(
    drainageDepthAt(placed.session.state, {
      x: at.x,
      z: at.z + DRAINAGE_SEGMENT_HALF_WIDTH,
    }),
    0,
  )

  const shaped = applyEdit(createEditSession(), {
    type: 'shape-ground', zoneId: 'a-garden', direction: 'raise', at,
  })
  assert.equal(shaped.changed, true)
  const coexisting = applyEdit(shaped.session, {
    type: 'place-drainage', zoneId: 'a-garden', from, to,
  })
  assert.equal(coexisting.changed, true)
  assert.ok(
    Math.abs(
      editedTerrainHeight(coexisting.session.state, at.x, at.z) -
        terrainHeight(at.x, at.z) - TERRAIN_PATCH_HEIGHT_STEP + DRAINAGE_SEGMENT_DEPTH,
    ) < 1e-9,
  )
})

test('작은 배수 홈은 A 정원·길이·충돌·구역별 여덟 조각 상한을 지킨다', () => {
  const wrongZone = applyEdit(createEditSession(), {
    type: 'place-drainage', zoneId: 'b-bright-soil',
    from: { x: -5.1, z: 2.8 }, to: { x: -4.3, z: 2.8 },
  })
  assert.equal(wrongZone.rejection, 'drainage-zone-only')
  for (const length of [DRAINAGE_SEGMENT_MIN_LENGTH - 0.01, DRAINAGE_SEGMENT_MAX_LENGTH + 0.01]) {
    const invalid = applyEdit(createEditSession(), {
      type: 'place-drainage', zoneId: 'a-garden',
      from: { x: -9.8 - length / 2, z: 3.65 },
      to: { x: -9.8 + length / 2, z: 3.65 },
    })
    assert.equal(invalid.rejection, 'drainage-length')
  }

  const planted = applyEdit(createEditSession(), {
    type: 'place', zoneId: 'a-garden', kind: 'low-flower', at: focus('a-garden'),
  })
  const plantCollision = applyEdit(planted.session, {
    type: 'place-drainage', zoneId: 'a-garden',
    from: { x: -10.2, z: 3.65 }, to: { x: -9.4, z: 3.65 },
  })
  assert.equal(plantCollision.rejection, 'overlap')

  let session = createEditSession()
  const centers = [
    ...[-11.25, -10.15, -9.05].map((x) => ({ x, z: 2.8 })),
    ...[-11.25, -10.15, -9.05].map((x) => ({ x, z: 3.65 })),
    ...[-11.25, -10.15].map((x) => ({ x, z: 4.5 })),
  ]
  for (const center of centers) {
    const result = applyEdit(session, {
      type: 'place-drainage', zoneId: 'a-garden',
      from: { x: center.x - DRAINAGE_SEGMENT_MIN_LENGTH / 2, z: center.z },
      to: { x: center.x + DRAINAGE_SEGMENT_MIN_LENGTH / 2, z: center.z },
    })
    assert.equal(result.changed, true)
    session = result.session
  }
  const limited = applyEdit(session, {
    type: 'place-drainage', zoneId: 'a-garden',
    from: { x: -9.375, z: 4.5 }, to: { x: -8.725, z: 4.5 },
  })
  assert.equal(limited.rejection, 'drainage-limit')
})

test('배수 홈은 끝점으로 연결하되 겹쳐 긋지 않고 이동·복원·점유 보호를 따른다', () => {
  const first = applyEdit(createEditSession(), {
    type: 'place-drainage', zoneId: 'a-garden',
    from: { x: -10.2, z: 3.65 }, to: { x: -9.4, z: 3.65 },
  })
  const connected = applyEdit(first.session, {
    type: 'place-drainage', zoneId: 'a-garden',
    from: { x: -9.4, z: 3.65 }, to: { x: -8.65, z: 5 },
  })
  assert.equal(connected.changed, true)
  const duplicate = applyEdit(first.session, {
    type: 'place-drainage', zoneId: 'a-garden',
    from: { x: -10.2, z: 3.65 }, to: { x: -9.4, z: 3.65 },
  })
  assert.equal(duplicate.rejection, 'overlap')

  const guard = { protectedGroundPoints: [{ at: focus('a-garden'), radius: 0.2 }] }
  const blockedMove = applyEdit(first.session, {
    type: 'move', zoneId: 'a-garden', id: first.entryId, to: { x: -10.1, z: 4.2 },
  }, guard)
  assert.equal(blockedMove.rejection, 'occupied')
  const blockedRestore = applyEdit(first.session, {
    type: 'restore-drainage', zoneId: 'a-garden', id: first.entryId,
  }, guard)
  assert.equal(blockedRestore.rejection, 'occupied')
  assert.equal(
    applyEdit(first.session, { type: 'undo', zoneId: 'a-garden' }, guard).rejection,
    'occupied',
  )

  const moved = applyEdit(first.session, {
    type: 'move', zoneId: 'a-garden', id: first.entryId, to: { x: -10.1, z: 4.2 },
  })
  assert.equal(moved.changed, true)
  const restored = applyEdit(moved.session, {
    type: 'restore-drainage', zoneId: 'a-garden', id: first.entryId,
  })
  assert.equal(restored.changed, true)
})

test('작은 구조물은 식물과 공존하고 형태별 경사·길·점유·절대 회전을 지킨다', () => {
  for (const form of Object.keys(STRUCTURE_FOOTPRINTS)) {
    const placed = applyEdit(createEditSession(), {
      type: 'place-structure', zoneId: 'b-moist-soil', form, at: focus('b-moist-soil'),
    })
    assert.equal(placed.changed, true, form)
  }
  let session = applyEdit(createEditSession(), {
    type: 'place', zoneId: 'b-moist-soil', kind: 'low-flower', at: focus('b-moist-soil'),
  }).session
  const structure = applyEdit(session, {
    type: 'place-structure', zoneId: 'b-moist-soil', form: 'support',
    at: focus('b-moist-soil'), rotation: 0.2,
  })
  assert.equal(structure.changed, true)
  session = structure.session
  const moved = applyEdit(session, {
    type: 'move', zoneId: 'b-moist-soil', id: structure.entryId,
    to: { x: -5.15, z: -3.55 },
  })
  assert.equal(moved.changed, true)
  const rotated = applyEdit(moved.session, {
    type: 'rotate', zoneId: 'b-moist-soil', id: structure.entryId, rotation: 1.2,
  })
  assert.equal(rotated.changed, true)
  assert.equal(getEntry(rotated.session, structure.entryId).rotation, 1.2)

  const occupied = applyEdit(rotated.session, {
    type: 'retrieve', zoneId: 'b-moist-soil', id: structure.entryId,
  }, { protectedGroundPoints: [{ at: { x: -5.15, z: -3.55 }, radius: 0.1 }] })
  assert.equal(occupied.rejection, 'occupied')
  const retrieved = applyEdit(rotated.session, {
    type: 'retrieve', zoneId: 'b-moist-soil', id: structure.entryId,
  })
  assert.equal(retrieved.changed, true)
  assert.equal(applyEdit(retrieved.session, {
    type: 'undo', zoneId: 'b-moist-soil',
  }).changed, true)

  const raised = applyEdit(createEditSession(), {
    type: 'shape-ground', zoneId: 'a-garden', direction: 'raise', at: focus('a-garden'),
  })
  const steep = applyEdit(raised.session, {
    type: 'place-structure', zoneId: 'a-garden', form: 'shade', at: focus('a-garden'),
  })
  assert.equal(steep.rejection, 'ground-too-steep')
  const road = applyEdit(createEditSession(), {
    type: 'place-structure', zoneId: 'b-bright-soil', form: 'fence',
    at: focus('b-bright-soil'),
  })
  assert.equal(road.rejection, 'protected-ground')
})

test('V4 판독기는 조형까지만 받고 V5 판독기는 새 항목의 키를 정확히 검사한다', () => {
  const shaped = applyEdit(createEditSession(), {
    type: 'shape-ground', zoneId: 'a-garden', direction: 'lower', at: focus('a-garden'),
  })
  const v4 = asV5(toPersistentEditState(shaped.session))
  assert.deepEqual(readPersistentEditStateV4(v4), v4)

  const drained = applyEdit(createEditSession(), {
    type: 'place-drainage', zoneId: 'a-garden',
    from: { x: -10.2, z: 3.65 }, to: { x: -9.4, z: 3.65 },
  })
  const v5 = asV5(toPersistentEditState(drained.session))
  assert.deepEqual(readPersistentEditStateV5(v5), v5)
  assert.deepEqual(
    migratePersistentEditStateV5(v5).current['d-headwater-edge'],
    {},
  )
  assert.equal(readPersistentEditStateV4(v5), undefined)

  const extraEntryKey = structuredClone(v5)
  extraEntryKey.current['a-garden'][drained.entryId].unexpected = true
  assert.equal(readPersistentEditStateV5(extraEntryKey), undefined)
  const extraPointKey = structuredClone(v5)
  extraPointKey.current['a-garden'][drained.entryId].at.y = 0
  assert.equal(readPersistentEditStateV5(extraPointKey), undefined)

  const flower = asV5(toPersistentEditState(applyEdit(createEditSession(), {
    type: 'place', zoneId: 'a-garden', kind: 'low-flower', at: focus('a-garden'),
  }).session))
  flower.current['a-garden']['edit-1'].thinned = undefined
  assert.equal(readPersistentEditStateV5(flower), undefined)
})

test('D 발원지 가장자리는 덮임·조형·물길·구조물만 받고 원래 물축과 지선을 보호한다', () => {
  const at = focus('d-headwater-edge')
  const cover = applyEdit(createEditSession(), {
    type: 'place', zoneId: 'd-headwater-edge', kind: 'low-cover', at,
  })
  assert.equal(cover.changed, true)
  assert.equal(applyEdit(createEditSession(), {
    type: 'place', zoneId: 'd-headwater-edge', kind: 'low-flower', at,
  }).rejection, 'kind-not-allowed')
  assert.equal(applyEdit(createEditSession(), {
    type: 'adjust-ground', zoneId: 'd-headwater-edge', at,
  }).rejection, 'kind-not-allowed')

  assert.equal(applyEdit(createEditSession(), {
    type: 'shape-ground', zoneId: 'd-headwater-edge', direction: 'lower', at,
  }).changed, true)
  assert.equal(applyEdit(createEditSession(), {
    type: 'place-drainage', zoneId: 'd-headwater-edge',
    from: { x: -5.55, z: -22.15 }, to: { x: -4.75, z: -22.15 },
  }).changed, true)
  assert.equal(applyEdit(createEditSession(), {
    type: 'place-structure', zoneId: 'd-headwater-edge', form: 'rack', at,
  }).changed, true)

  const protectedSpur = applyEdit(createEditSession(), {
    type: 'shape-ground', zoneId: 'd-headwater-edge', direction: 'lower',
    at: { x: -3.15, z: -20.15 },
  })
  assert.equal(protectedSpur.rejection, 'protected-ground')
})

test('V5 세 구역과 현재 V6 네 구역은 서로 가장하지 못하고 빈 발원지만 이주한다', () => {
  const current = toPersistentEditState(createEditSession())
  const historical = asV5(current)

  assert.equal(readPersistentEditState(historical), undefined)
  assert.equal(readPersistentEditStateV5(current), undefined)
  const migrated = migratePersistentEditStateV5(readPersistentEditStateV5(historical))
  assert.deepEqual(migrated, current)

  const disguised = structuredClone(historical)
  disguised.current['d-headwater-edge'] = {}
  assert.equal(readPersistentEditStateV5(disguised), undefined)
})

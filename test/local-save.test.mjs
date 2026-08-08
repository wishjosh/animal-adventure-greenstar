import assert from 'node:assert/strict'
import test from 'node:test'
import {
  LocalSaveStore,
  LOCAL_SAVE_KEYS,
  LOCAL_SAVE_MAP_ID,
  LOCAL_SAVE_SCHEMA_VERSION,
  decodeLocalSave,
  readLocalSaveV3,
  readLocalSaveV4,
  readLocalSaveV5,
} from '../src/persistence/local-save.ts'
import {
  applyEdit,
  createEditSession,
  createEmptyEditState,
} from '../src/domain/edit-model.ts'
import {
  createPlantGrowthState,
  isAdultPlantGrowth,
  syncPlantGrowthState,
} from '../src/domain/plant-growth.ts'
import {
  advanceUpstreamWaterway,
  createUpstreamWaterwayState,
} from '../src/domain/upstream-waterway.ts'
import {
  EDIT_ZONES,
  START_POSITION,
  WATER_COURSE,
  isWalkable,
  isWalkableBeforeHeadwater,
} from '../src/content/first-map.ts'

class MemoryStorage {
  constructor(initial = {}) {
    this.values = new Map(Object.entries(initial))
    this.failOnSetKey = undefined
  }

  getItem(key) {
    return this.values.get(key) ?? null
  }

  setItem(key, value) {
    if (this.failOnSetKey === key) {
      throw new Error('의도한 저장 실패: ' + key)
    }
    this.values.set(key, value)
  }

  removeItem(key) {
    this.values.delete(key)
  }
}

function editedState() {
  const garden = EDIT_ZONES.find(({ id }) => id === 'a-garden')
  assert.ok(garden)
  const result = applyEdit(createEditSession(), {
    type: 'place',
    zoneId: 'a-garden',
    kind: 'low-flower',
    at: garden.focus,
  })
  assert.equal(result.changed, true)
  return result.session.state
}

function terrainPatchState() {
  const empty = createEmptyEditState()
  const garden = EDIT_ZONES.find(({ id }) => id === 'a-garden')
  assert.ok(garden)
  return {
    current: {
      ...empty.current,
      'a-garden': {
        'edit-1': {
          id: 'edit-1',
          zoneId: 'a-garden',
          kind: 'terrain-patch',
          direction: 'raise',
          at: { ...garden.focus },
          rotation: 0.2,
        },
      },
      'b-bright-soil': {
        'edit-2': {
          id: 'edit-2',
          zoneId: 'b-bright-soil',
          kind: 'terrain-patch',
          direction: 'lower',
          // 자리 중심은 A–B 길의 전체 폭과 조형 반경이 겹치므로 위쪽 여유 지점을 쓴다.
          at: { x: -4.6, z: 3.2 },
          rotation: -0.4,
        },
      },
    },
    nextId: 3,
    revision: 2,
  }
}

function mixedBuildingState() {
  const empty = createEmptyEditState()
  const garden = EDIT_ZONES.find(({ id }) => id === 'a-garden')
  const moist = EDIT_ZONES.find(({ id }) => id === 'b-moist-soil')
  assert.ok(garden)
  assert.ok(moist)
  return {
    current: {
      ...empty.current,
      'a-garden': {
        'edit-1': {
          id: 'edit-1',
          zoneId: 'a-garden',
          kind: 'drainage-segment',
          length: 0.8,
          at: { ...garden.focus },
          rotation: 0,
        },
      },
      'b-bright-soil': {
        'edit-2': {
          id: 'edit-2',
          zoneId: 'b-bright-soil',
          kind: 'terrain-patch',
          direction: 'lower',
          at: { x: -4.6, z: 3.2 },
          rotation: -0.4,
        },
      },
      'b-moist-soil': {
        'edit-3': {
          id: 'edit-3',
          zoneId: 'b-moist-soil',
          kind: 'structure',
          form: 'support',
          at: { ...moist.focus },
          rotation: 0.35,
        },
      },
    },
    nextId: 4,
    revision: 3,
  }
}

function headwaterDeliveryState(sourceChangedAt = 4) {
  const headwater = EDIT_ZONES.find(({ id }) => id === 'd-headwater-edge')
  assert.ok(headwater)
  const empty = createEmptyEditState()
  const placed = applyEdit(createEditSession(empty), {
    type: 'place',
    zoneId: 'd-headwater-edge',
    kind: 'low-cover',
    at: headwater.focus,
  })
  assert.equal(placed.changed, true)
  return {
    edits: placed.session.state,
    upstream: advanceUpstreamWaterway(
      createUpstreamWaterwayState(empty, 0),
      { editState: placed.session.state, worldElapsed: sourceChangedAt },
    ),
  }
}

function headwaterDeliveredAndPendingState() {
  const first = headwaterDeliveryState(4)
  const delivered = advanceUpstreamWaterway(first.upstream, {
    editState: first.edits,
    worldElapsed: 28,
  })
  const reshaped = applyEdit(createEditSession(first.edits), {
    type: 'shape-ground',
    zoneId: 'd-headwater-edge',
    direction: 'lower',
    at: { x: -5.35, z: -22.15 },
  })
  assert.equal(reshaped.changed, true)
  return {
    edits: reshaped.session.state,
    upstream: advanceUpstreamWaterway(delivered, {
      editState: reshaped.session.state,
      worldElapsed: 30,
    }),
  }
}

function makeSave(overrides = {}) {
  const elapsed = Object.hasOwn(overrides, 'elapsed') ? overrides.elapsed : 12.5
  const edits = Object.hasOwn(overrides, 'edits') ? overrides.edits : editedState()
  return {
    schemaVersion: LOCAL_SAVE_SCHEMA_VERSION,
    mapId: LOCAL_SAVE_MAP_ID,
    elapsed,
    player: { at: { ...START_POSITION }, heading: 0.4 },
    camera: { yaw: -1.2, distance: 10.5 },
    edits,
    notebook: { entries: [] },
    plantGrowth: syncPlantGrowthState(createPlantGrowthState(), edits, elapsed),
    upstream: createUpstreamWaterwayState(edits, elapsed),
    ...overrides,
  }
}

function legacyEdits(edits) {
  const legacy = structuredClone(edits)
  delete legacy.current['d-headwater-edge']
  return legacy
}

function asLegacySave(save, schemaVersion) {
  const { upstream: _upstream, ...withoutUpstream } = save
  return {
    ...withoutUpstream,
    schemaVersion,
    edits: legacyEdits(save.edits),
  }
}

function encoded(save) {
  const storage = new MemoryStorage()
  assert.deepEqual(new LocalSaveStore(storage).write(save), { status: 'saved' })
  const raw = storage.getItem(LOCAL_SAVE_KEYS.primary)
  assert.ok(raw)
  return raw
}

test('V6 저장은 세계·편집·상류·관찰·성장 누적만 왕복하고 파생 단계를 기록하지 않는다', () => {
  const storage = new MemoryStorage()
  const save = makeSave({
    notebook: {
      entries: [{ id: 'butterfly-search', firstSeenAt: 4.5 }],
    },
  })
  const store = new LocalSaveStore(storage)

  assert.deepEqual(store.write(save), { status: 'saved' })
  const raw = storage.getItem(LOCAL_SAVE_KEYS.primary)
  assert.ok(raw)
  const parsed = JSON.parse(raw)
  assert.deepEqual(Object.keys(parsed).sort(), [
    'camera',
    'edits',
    'elapsed',
    'mapId',
    'notebook',
    'plantGrowth',
    'player',
    'schemaVersion',
    'upstream',
  ])
  const growthRecords = Object.values(parsed.plantGrowth.byEntryId)
  assert.equal(growthRecords.length, 1)
  assert.equal(Object.hasOwn(growthRecords[0], 'stage'), false)
  assert.equal(Object.hasOwn(growthRecords[0], 'stageProgress'), false)
  for (const forbidden of [
    'started',
    'blocked',
    'place',
    'input',
    'undo',
    'localEnvironment',
  ]) {
    assert.equal(Object.hasOwn(parsed, forbidden), false)
  }

  const loaded = new LocalSaveStore(storage).load()
  assert.equal(loaded.status, 'loaded')
  assert.equal(loaded.source, 'primary')
  assert.equal(loaded.recovered, false)
  assert.deepEqual(loaded.save, save)
  assert.equal(decodeLocalSave(raw).status, 'valid')
})

test('금지된 루트 필드가 섞인 값은 저장하지 않는다', () => {
  for (const forbidden of [
    'started',
    'blocked',
    'place',
    'input',
    'undo',
    'localEnvironment',
  ]) {
    const storage = new MemoryStorage()
    const candidate = { ...makeSave(), [forbidden]: true }
    assert.deepEqual(new LocalSaveStore(storage).write(candidate), { status: 'invalid' })
    assert.equal(storage.getItem(LOCAL_SAVE_KEYS.primary), null)
  }
})

test('V1 저장은 빈 관찰 기록과 성체 꽃을 가진 V6로 안전하게 올라온다', () => {
  const current = makeSave()
  const legacy = asLegacySave(current, 1)
  const {
    notebook: _notebook,
    plantGrowth: _plantGrowth,
    ...withoutV2Fields
  } = legacy
  const previous = withoutV2Fields
  const decoded = decodeLocalSave(JSON.stringify(previous))

  assert.equal(decoded.status, 'valid')
  assert.equal(decoded.save.schemaVersion, LOCAL_SAVE_SCHEMA_VERSION)
  assert.deepEqual(decoded.save.notebook, { entries: [] })
  assert.deepEqual(decoded.save.edits, current.edits)
  const record = Object.values(decoded.save.plantGrowth.byEntryId)[0]
  assert.ok(record)
  assert.equal(isAdultPlantGrowth(record), true)
  assert.equal(record.plantedAtElapsed, current.elapsed)
  assert.deepEqual(decoded.save.upstream, current.upstream)
})

test('V2 저장은 관찰 기록을 보존하고 기존 꽃을 성체로 올려 V6가 된다', () => {
  const current = makeSave({
    notebook: { entries: [{ id: 'butterfly-search', firstSeenAt: 4.5 }] },
  })
  const legacy = asLegacySave(current, 2)
  const { plantGrowth: _plantGrowth, ...previous } = legacy
  const decoded = decodeLocalSave(JSON.stringify(previous))

  assert.equal(decoded.status, 'valid')
  assert.equal(decoded.save.schemaVersion, LOCAL_SAVE_SCHEMA_VERSION)
  assert.deepEqual(decoded.save.notebook, current.notebook)
  assert.deepEqual(decoded.save.edits, current.edits)
  const record = Object.values(decoded.save.plantGrowth.byEntryId)[0]
  assert.ok(record)
  assert.equal(isAdultPlantGrowth(record), true)
  assert.deepEqual(decoded.save.upstream, current.upstream)
})

test('V3 저장은 편집 ID·revision·관찰·성장을 그대로 보존해 V6가 된다', () => {
  const current = makeSave({
    notebook: { entries: [{ id: 'butterfly-search', firstSeenAt: 4.5 }] },
  })
  const previous = asLegacySave(current, 3)
  const exactV3 = readLocalSaveV3(previous)
  assert.ok(exactV3)
  assert.equal(exactV3.schemaVersion, 3)

  const decoded = decodeLocalSave(JSON.stringify(previous))
  assert.equal(decoded.status, 'valid')
  assert.equal(decoded.save.schemaVersion, LOCAL_SAVE_SCHEMA_VERSION)
  assert.deepEqual(decoded.save.edits, current.edits)
  assert.deepEqual(decoded.save.notebook, current.notebook)
  assert.deepEqual(decoded.save.plantGrowth, current.plantGrowth)
  assert.deepEqual(decoded.save.upstream, current.upstream)
  assert.equal(
    Object.values(decoded.save.edits.current)
      .flatMap((overlay) => Object.values(overlay))
      .some((entry) => entry.kind === 'terrain-patch'),
    false,
  )
})

test('V4 저장은 조형·편집 ID·revision·관찰·성장을 그대로 보존해 V6가 된다', () => {
  const current = makeSave({ edits: terrainPatchState() })
  const previous = asLegacySave(current, 4)
  const exactV4 = readLocalSaveV4(previous)
  assert.ok(exactV4)
  assert.equal(exactV4.schemaVersion, 4)

  const decoded = decodeLocalSave(JSON.stringify(previous))
  assert.equal(decoded.status, 'valid')
  assert.equal(decoded.save.schemaVersion, LOCAL_SAVE_SCHEMA_VERSION)
  assert.deepEqual(decoded.save.edits, current.edits)
  assert.deepEqual(decoded.save.notebook, current.notebook)
  assert.deepEqual(decoded.save.plantGrowth, current.plantGrowth)
  assert.deepEqual(decoded.save.upstream, current.upstream)
})

test('V5 저장은 세 zone의 조형·물길·구조물과 누적 상태를 보존해 V6가 된다', () => {
  const current = makeSave({
    edits: mixedBuildingState(),
    notebook: { entries: [{ id: 'waterway-upstream', firstSeenAt: 7.5 }] },
  })
  const previous = asLegacySave(current, 5)
  const exactV5 = readLocalSaveV5(previous)
  assert.ok(exactV5)
  assert.equal(exactV5.schemaVersion, 5)

  const decoded = decodeLocalSave(JSON.stringify(previous))
  assert.equal(decoded.status, 'valid')
  assert.equal(decoded.save.schemaVersion, LOCAL_SAVE_SCHEMA_VERSION)
  assert.deepEqual(decoded.save.edits, current.edits)
  assert.deepEqual(decoded.save.edits.current['d-headwater-edge'], {})
  assert.deepEqual(decoded.save.notebook, current.notebook)
  assert.deepEqual(decoded.save.plantGrowth, current.plantGrowth)
  assert.deepEqual(decoded.save.upstream, current.upstream)
})

test('V5 플레이어가 새 발원지 물축에 놓였으면 안전한 마른 지점으로 옮긴다', () => {
  const legacyAt = { x: 0.05, z: -23.1 }
  assert.equal(isWalkableBeforeHeadwater(legacyAt), true)
  assert.equal(isWalkable(legacyAt), false)
  const previous = asLegacySave(makeSave({
    player: { at: legacyAt, heading: 0.85 },
  }), 5)

  const decoded = decodeLocalSave(JSON.stringify(previous))
  assert.equal(decoded.status, 'valid')
  assert.deepEqual(decoded.save.player, {
    at: { x: -1.7, z: -22.35 },
    heading: 0.85,
  })
  assert.equal(isWalkable(decoded.save.player.at), true)
})

test('V5 당시에도 물속이었던 플레이어 위치는 migration 대상으로 위장하지 않는다', () => {
  const legacyWaterAt = { x: 2.2, z: -13.5 }
  assert.equal(isWalkableBeforeHeadwater(legacyWaterAt), false)
  const previous = asLegacySave(makeSave({
    player: { at: legacyWaterAt, heading: 0 },
  }), 5)

  assert.equal(readLocalSaveV5(previous), undefined)
  assert.equal(decodeLocalSave(JSON.stringify(previous)).status, 'invalid')
})

test('V5 판독기는 세 zone에 고정되어 V6 발원지 zone과 root 상태를 받지 않는다', () => {
  const current = makeSave()
  const { upstream: _upstream, ...withoutUpstream } = current
  const fourZoneV5 = { ...withoutUpstream, schemaVersion: 5 }
  const extraRootV5 = {
    ...asLegacySave(current, 5),
    upstream: current.upstream,
  }

  for (const disguised of [fourZoneV5, extraRootV5]) {
    assert.equal(readLocalSaveV5(disguised), undefined)
    assert.equal(decodeLocalSave(JSON.stringify(disguised)).status, 'invalid')
  }
})

test('V6는 조형·작은 물길·구조물을 종류별 필드까지 저장하고 왕복한다', () => {
  const save = makeSave({ edits: mixedBuildingState() })
  const raw = encoded(save)
  const decoded = decodeLocalSave(raw)

  assert.equal(decoded.status, 'valid')
  assert.deepEqual(decoded.save, save)
  assert.equal(
    decoded.save.edits.current['a-garden']['edit-1'].length,
    0.8,
  )
  assert.equal(
    decoded.save.edits.current['b-bright-soil']['edit-2'].direction,
    'lower',
  )
  assert.equal(
    decoded.save.edits.current['b-moist-soil']['edit-3'].form,
    'support',
  )
})

test('V6는 발원지 편집과 상류 전달 상태를 한 저장값으로 왕복한다', () => {
  const headwater = headwaterDeliveryState()
  const save = makeSave({ ...headwater })
  const decoded = decodeLocalSave(encoded(save))

  assert.equal(decoded.status, 'valid')
  assert.deepEqual(decoded.save, save)
  assert.notEqual(decoded.save.upstream.sourceSignature, '[]')
})

test('V6는 B에 이미 닿은 모습과 새로 이동 중인 상류 모습을 함께 보존한다', () => {
  const headwater = headwaterDeliveredAndPendingState()
  const save = makeSave({ elapsed: 31, ...headwater })
  const decoded = decodeLocalSave(encoded(save))

  assert.equal(decoded.status, 'valid')
  assert.deepEqual(decoded.save, save)
  assert.ok(decoded.save.upstream.delivered)
  assert.ok(decoded.save.upstream.pending)
  assert.notDeepEqual(
    decoded.save.upstream.delivered.profile,
    decoded.save.upstream.pending.profile,
  )
})

test('V6 상류 상태는 편집 signature·세계 시간·중첩 필드를 엄격히 검증한다', () => {
  const headwater = headwaterDeliveredAndPendingState()
  const valid = makeSave({ elapsed: 31, ...headwater })
  const extraKey = structuredClone(valid)
  extraKey.upstream.completed = true
  const wrongSignature = structuredClone(valid)
  wrongSignature.upstream.sourceSignature = '[]'
  const deliveredFromFuture = structuredClone(valid)
  deliveredFromFuture.upstream.delivered.arrivesAt = 32
  const invalidProfile = structuredClone(valid)
  invalidProfile.upstream.pending.profile.retention = 1.01
  const mismatchedTime = structuredClone(valid)
  mismatchedTime.upstream.pending.sourceChangedAt = 29

  for (const invalid of [
    extraKey,
    wrongSignature,
    deliveredFromFuture,
    invalidProfile,
    mismatchedTime,
  ]) {
    assert.equal(decodeLocalSave(JSON.stringify(invalid)).status, 'invalid')
  }

  const storage = new MemoryStorage()
  assert.deepEqual(new LocalSaveStore(storage).write(wrongSignature), { status: 'invalid' })
  assert.equal(storage.getItem(LOCAL_SAVE_KEYS.primary), null)
})

test('V6 terrain-patch의 알 수 없는 방향은 저장값 전체를 거부한다', () => {
  const valid = makeSave({ edits: terrainPatchState() })
  const invalid = structuredClone(valid)
  invalid.edits.current['a-garden']['edit-1'].direction = 'sideways'

  assert.equal(decodeLocalSave(JSON.stringify(invalid)).status, 'invalid')
  const storage = new MemoryStorage()
  assert.deepEqual(new LocalSaveStore(storage).write(invalid), { status: 'invalid' })
  assert.equal(storage.getItem(LOCAL_SAVE_KEYS.primary), null)
})

test('V6 구조물 형태와 물길 경계 길이는 허용하고 범위 밖 값은 거부한다', () => {
  const valid = makeSave({ edits: mixedBuildingState() })
  for (const form of ['support', 'rack', 'fence', 'shade']) {
    const candidate = structuredClone(valid)
    candidate.edits.current['b-moist-soil']['edit-3'].form = form
    assert.equal(decodeLocalSave(JSON.stringify(candidate)).status, 'valid')
  }
  for (const length of [0.65, 1.6]) {
    const candidate = structuredClone(valid)
    candidate.edits.current['a-garden']['edit-1'].length = length
    assert.equal(decodeLocalSave(JSON.stringify(candidate)).status, 'valid')
  }

  const invalidForm = structuredClone(valid)
  invalidForm.edits.current['b-moist-soil']['edit-3'].form = 'bridge'
  const tooShort = structuredClone(valid)
  tooShort.edits.current['a-garden']['edit-1'].length = 0.64
  const tooLong = structuredClone(valid)
  tooLong.edits.current['a-garden']['edit-1'].length = 1.61

  for (const invalid of [invalidForm, tooShort, tooLong]) {
    assert.equal(decodeLocalSave(JSON.stringify(invalid)).status, 'invalid')
  }
})

test('V4 저장에 V5 물길·구조물을 끼워 넣으면 migration하지 않고 거부한다', () => {
  const mixed = mixedBuildingState()
  const drainageOnly = structuredClone(mixed)
  delete drainageOnly.current['b-moist-soil']['edit-3']
  const structureOnly = structuredClone(mixed)
  delete structureOnly.current['a-garden']['edit-1']

  for (const edits of [drainageOnly, structureOnly]) {
    const disguised = asLegacySave(makeSave({ edits }), 4)

    assert.equal(readLocalSaveV4(disguised), undefined)
    assert.equal(decodeLocalSave(JSON.stringify(disguised)).status, 'invalid')
  }
})

test('손상된 primary 대신 유효한 backup을 읽고 primary와 격리본을 복구한다', () => {
  const backupSave = makeSave({ elapsed: 33 })
  const backupRaw = encoded(backupSave)
  const brokenPrimary = '{not-json'
  const storage = new MemoryStorage({
    [LOCAL_SAVE_KEYS.primary]: brokenPrimary,
    [LOCAL_SAVE_KEYS.backup]: backupRaw,
  })

  const loaded = new LocalSaveStore(storage).load()
  assert.equal(loaded.status, 'loaded')
  assert.equal(loaded.source, 'backup')
  assert.equal(loaded.recovered, true)
  assert.deepEqual(loaded.save, backupSave)
  assert.equal(storage.getItem(LOCAL_SAVE_KEYS.primary), backupRaw)
  assert.equal(storage.getItem(LOCAL_SAVE_KEYS.corrupt), brokenPrimary)
})

test('primary와 backup이 모두 손상되면 하나를 격리하고 저장 없음으로 돌아간다', () => {
  const brokenPrimary = '{broken'
  const brokenBackup = JSON.stringify({ schemaVersion: 1, mapId: 'wrong-map' })
  const storage = new MemoryStorage({
    [LOCAL_SAVE_KEYS.primary]: brokenPrimary,
    [LOCAL_SAVE_KEYS.backup]: brokenBackup,
  })

  const loaded = new LocalSaveStore(storage).load()
  assert.deepEqual(loaded, { status: 'none', writeLocked: false })
  assert.equal(storage.getItem(LOCAL_SAVE_KEYS.corrupt), brokenPrimary)
  assert.equal(storage.getItem(LOCAL_SAVE_KEYS.primary), null)
  assert.equal(storage.getItem(LOCAL_SAVE_KEYS.backup), null)
})

test('V7 schemaVersion은 손상으로 보지 않고 모든 덮어쓰기를 잠근다', () => {
  const futureVersion = LOCAL_SAVE_SCHEMA_VERSION + 1
  const futureRaw = JSON.stringify({ schemaVersion: futureVersion, futureState: true })
  const storage = new MemoryStorage({ [LOCAL_SAVE_KEYS.primary]: futureRaw })
  const store = new LocalSaveStore(storage)

  assert.deepEqual(store.load(), {
    status: 'unsupported-future',
    schemaVersion: futureVersion,
    source: 'primary',
    writeLocked: true,
  })
  assert.equal(store.writeLocked, true)
  assert.deepEqual(store.write(makeSave()), { status: 'locked' })
  assert.equal(storage.getItem(LOCAL_SAVE_KEYS.primary), futureRaw)
  assert.equal(storage.getItem(LOCAL_SAVE_KEYS.corrupt), null)
})

test('새 primary 기록에 실패하면 이전 primary가 그대로 남는다', () => {
  const storage = new MemoryStorage()
  const store = new LocalSaveStore(storage)
  const first = makeSave({ elapsed: 5 })
  const second = makeSave({ elapsed: 99 })
  assert.deepEqual(store.write(first), { status: 'saved' })
  const firstRaw = storage.getItem(LOCAL_SAVE_KEYS.primary)
  assert.ok(firstRaw)

  storage.failOnSetKey = LOCAL_SAVE_KEYS.primary
  assert.deepEqual(store.write(second), { status: 'storage-error' })
  assert.equal(storage.getItem(LOCAL_SAVE_KEYS.primary), firstRaw)
  assert.equal(storage.getItem(LOCAL_SAVE_KEYS.backup), firstRaw)
})

test('decoder는 수치·카메라·보행 위치·편집·성장 상태를 모두 검증한다', () => {
  const waterPoint = WATER_COURSE[0]
  assert.ok(waterPoint)
  const valid = makeSave()
  const flowerId = Object.keys(valid.plantGrowth.byEntryId)[0]
  assert.ok(flowerId)
  const invalidValues = [
    makeSave({ elapsed: -1 }),
    makeSave({ elapsed: Number.POSITIVE_INFINITY }),
    makeSave({ camera: { yaw: 0, distance: 7.19 } }),
    makeSave({ camera: { yaw: 0, distance: 14.01 } }),
    makeSave({ camera: { yaw: Number.NaN, distance: 10 } }),
    makeSave({ player: { at: { ...waterPoint }, heading: 0 } }),
    makeSave({ edits: { ...createEmptyEditState(), nextId: 0 } }),
    { ...valid, plantGrowth: { byEntryId: {} } },
    {
      ...valid,
      plantGrowth: {
        byEntryId: {
          [flowerId]: {
            ...valid.plantGrowth.byEntryId[flowerId],
            stage: 'seed',
          },
        },
      },
    },
    {
      ...valid,
      plantGrowth: {
        byEntryId: {
          [flowerId]: { plantedAtElapsed: 0, accumulatedGrowth: Number.NaN },
        },
      },
    },
    {
      ...valid,
      plantGrowth: {
        byEntryId: {
          [flowerId]: {
            plantedAtElapsed: valid.elapsed + 1,
            accumulatedGrowth: 0,
          },
        },
      },
    },
  ]

  for (const value of invalidValues) {
    assert.equal(decodeLocalSave(JSON.stringify(value)).status, 'invalid')
  }
})

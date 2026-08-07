import assert from 'node:assert/strict'
import test from 'node:test'
import {
  LocalSaveStore,
  LOCAL_SAVE_KEYS,
  LOCAL_SAVE_MAP_ID,
  LOCAL_SAVE_SCHEMA_VERSION,
  decodeLocalSave,
} from '../src/persistence/local-save.ts'
import {
  applyEdit,
  createEditSession,
  createEmptyEditState,
} from '../src/domain/edit-model.ts'
import { EDIT_ZONES, START_POSITION, WATER_COURSE } from '../src/content/first-map.ts'

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

function makeSave(overrides = {}) {
  return {
    schemaVersion: LOCAL_SAVE_SCHEMA_VERSION,
    mapId: LOCAL_SAVE_MAP_ID,
    elapsed: 12.5,
    player: { at: { ...START_POSITION }, heading: 0.4 },
    camera: { yaw: -1.2, distance: 10.5 },
    edits: editedState(),
    ...overrides,
  }
}

function encoded(save) {
  const storage = new MemoryStorage()
  assert.deepEqual(new LocalSaveStore(storage).write(save), { status: 'saved' })
  const raw = storage.getItem(LOCAL_SAVE_KEYS.primary)
  assert.ok(raw)
  return raw
}

test('V1 저장은 영속 루트만 왕복하고 세션·파생 필드를 기록하지 않는다', () => {
  const storage = new MemoryStorage()
  const save = makeSave()
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
    'player',
    'schemaVersion',
  ])
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

test('더 새로운 schemaVersion은 손상으로 보지 않고 모든 덮어쓰기를 잠근다', () => {
  const futureRaw = JSON.stringify({ schemaVersion: 2, futureState: true })
  const storage = new MemoryStorage({ [LOCAL_SAVE_KEYS.primary]: futureRaw })
  const store = new LocalSaveStore(storage)

  assert.deepEqual(store.load(), {
    status: 'unsupported-future',
    schemaVersion: 2,
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

test('decoder는 수치·카메라·보행 위치와 편집 상태를 모두 검증한다', () => {
  const waterPoint = WATER_COURSE[0]
  assert.ok(waterPoint)
  const invalidValues = [
    makeSave({ elapsed: -1 }),
    makeSave({ elapsed: Number.POSITIVE_INFINITY }),
    makeSave({ camera: { yaw: 0, distance: 7.19 } }),
    makeSave({ camera: { yaw: 0, distance: 14.01 } }),
    makeSave({ camera: { yaw: Number.NaN, distance: 10 } }),
    makeSave({ player: { at: { ...waterPoint }, heading: 0 } }),
    makeSave({ edits: { ...createEmptyEditState(), nextId: 0 } }),
  ]

  for (const value of invalidValues) {
    assert.equal(decodeLocalSave(JSON.stringify(value)).status, 'invalid')
  }
})

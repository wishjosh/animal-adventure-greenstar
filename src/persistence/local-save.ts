import {
  migratePersistentEditStateV5,
  readLegacyPersistentEditState,
  readPersistentEditState,
  readPersistentEditStateV4,
  readPersistentEditStateV5,
  type LegacyPersistentEditState,
  type PersistentEditState,
} from '../domain/edit-model.ts'
import {
  START_POSITION,
  isWalkable,
  isWalkableBeforeHeadwater,
  type Point2,
} from '../content/first-map.ts'
import {
  createObservationNotebookState,
  readObservationNotebookState,
  type ObservationNotebookState,
} from '../domain/observation-notebook.ts'
import {
  migrateLegacyLowFlowersAsAdults,
  readPersistentPlantGrowthState,
  type PersistentPlantGrowthState,
} from '../domain/plant-growth.ts'
import {
  createUpstreamWaterwayState,
  readPersistentUpstreamWaterwayState,
  type PersistentUpstreamWaterwayState,
} from '../domain/upstream-waterway.ts'

const LOCAL_SAVE_SCHEMA_V1 = 1 as const
const LOCAL_SAVE_SCHEMA_V2 = 2 as const
const LOCAL_SAVE_SCHEMA_V3 = 3 as const
const LOCAL_SAVE_SCHEMA_V4 = 4 as const
const LOCAL_SAVE_SCHEMA_V5 = 5 as const
export const LOCAL_SAVE_SCHEMA_VERSION = 6 as const
export const LOCAL_SAVE_MAP_ID = 'mountain-village-first-map' as const

export const LOCAL_SAVE_KEYS = Object.freeze({
  primary: 'animal-adventure.save',
  backup: 'animal-adventure.save.backup',
  corrupt: 'animal-adventure.save.corrupt',
})

export const MIN_SAVED_CAMERA_DISTANCE = 7.2
export const MAX_SAVED_CAMERA_DISTANCE = 14

export type LocalSaveV1 = Readonly<{
  schemaVersion: typeof LOCAL_SAVE_SCHEMA_V1
  mapId: typeof LOCAL_SAVE_MAP_ID
  elapsed: number
  player: Readonly<{
    at: Point2
    heading: number
  }>
  camera: Readonly<{
    yaw: number
    distance: number
  }>
  edits: LegacyPersistentEditState
}>

export type LocalSaveV2 = Readonly<{
  schemaVersion: typeof LOCAL_SAVE_SCHEMA_V2
  mapId: typeof LOCAL_SAVE_MAP_ID
  elapsed: number
  player: Readonly<{
    at: Point2
    heading: number
  }>
  camera: Readonly<{
    yaw: number
    distance: number
  }>
  edits: LegacyPersistentEditState
  notebook: ObservationNotebookState
}>

export type LocalSaveV3 = Readonly<{
  schemaVersion: typeof LOCAL_SAVE_SCHEMA_V3
  mapId: typeof LOCAL_SAVE_MAP_ID
  elapsed: number
  player: Readonly<{
    at: Point2
    heading: number
  }>
  camera: Readonly<{
    yaw: number
    distance: number
  }>
  edits: LegacyPersistentEditState
  notebook: ObservationNotebookState
  plantGrowth: PersistentPlantGrowthState
}>

export type LocalSaveV4 = Readonly<{
  schemaVersion: typeof LOCAL_SAVE_SCHEMA_V4
  mapId: typeof LOCAL_SAVE_MAP_ID
  elapsed: number
  player: Readonly<{
    at: Point2
    heading: number
  }>
  camera: Readonly<{
    yaw: number
    distance: number
  }>
  edits: LegacyPersistentEditState
  notebook: ObservationNotebookState
  plantGrowth: PersistentPlantGrowthState
}>

export type LocalSaveV5 = Readonly<{
  schemaVersion: typeof LOCAL_SAVE_SCHEMA_V5
  mapId: typeof LOCAL_SAVE_MAP_ID
  elapsed: number
  player: Readonly<{
    at: Point2
    heading: number
  }>
  camera: Readonly<{
    yaw: number
    distance: number
  }>
  edits: LegacyPersistentEditState
  notebook: ObservationNotebookState
  plantGrowth: PersistentPlantGrowthState
}>

export type LocalSaveV6 = Readonly<{
  schemaVersion: typeof LOCAL_SAVE_SCHEMA_VERSION
  mapId: typeof LOCAL_SAVE_MAP_ID
  elapsed: number
  player: Readonly<{
    at: Point2
    heading: number
  }>
  camera: Readonly<{
    yaw: number
    distance: number
  }>
  edits: PersistentEditState
  notebook: ObservationNotebookState
  plantGrowth: PersistentPlantGrowthState
  upstream: PersistentUpstreamWaterwayState
}>

export type CurrentLocalSave = LocalSaveV6

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export type LocalSaveDecodeResult =
  | Readonly<{ status: 'valid'; save: CurrentLocalSave }>
  | Readonly<{ status: 'invalid' }>
  | Readonly<{ status: 'unsupported-future'; schemaVersion: number }>

export type LocalSaveLoadResult =
  | Readonly<{
      status: 'loaded'
      save: CurrentLocalSave
      source: 'primary' | 'backup'
      recovered: boolean
      writeLocked: false
    }>
  | Readonly<{ status: 'none'; writeLocked: false }>
  | Readonly<{
      status: 'unsupported-future'
      schemaVersion: number
      source: 'primary' | 'backup'
      writeLocked: true
    }>
  | Readonly<{ status: 'storage-error'; writeLocked: true }>

export type LocalSaveWriteResult =
  | Readonly<{ status: 'saved' }>
  | Readonly<{ status: 'invalid' }>
  | Readonly<{ status: 'locked' }>
  | Readonly<{ status: 'storage-error' }>

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasOnlyKeys(value: Record<string, unknown>, expected: readonly string[]): boolean {
  const actual = Object.keys(value).sort()
  const sortedExpected = [...expected].sort()
  return (
    actual.length === sortedExpected.length &&
    actual.every((key, index) => key === sortedExpected[index])
  )
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function readPoint(value: unknown): Point2 | undefined {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, ['x', 'z']) ||
    !isFiniteNumber(value.x) ||
    !isFiniteNumber(value.z)
  ) {
    return undefined
  }
  return { x: value.x, z: value.z }
}

type ReadSaveBase<TEditState> = Readonly<{
  mapId: typeof LOCAL_SAVE_MAP_ID
  elapsed: number
  player: LocalSaveV1['player']
  camera: LocalSaveV1['camera']
  edits: TEditState
}>

function readSaveBase<TEditState>(
  value: unknown,
  schemaVersion: number,
  expectedKeys: readonly string[],
  readEdits: (value: unknown) => TEditState | undefined,
  isSavedPlayerWalkable: (point: Point2) => boolean,
): ReadSaveBase<TEditState> | undefined {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, expectedKeys) ||
    value.schemaVersion !== schemaVersion ||
    value.mapId !== LOCAL_SAVE_MAP_ID ||
    !isFiniteNumber(value.elapsed) ||
    value.elapsed < 0 ||
    !isRecord(value.player) ||
    !hasOnlyKeys(value.player, ['at', 'heading']) ||
    !isFiniteNumber(value.player.heading) ||
    !isRecord(value.camera) ||
    !hasOnlyKeys(value.camera, ['yaw', 'distance']) ||
    !isFiniteNumber(value.camera.yaw) ||
    !isFiniteNumber(value.camera.distance) ||
    value.camera.distance < MIN_SAVED_CAMERA_DISTANCE ||
    value.camera.distance > MAX_SAVED_CAMERA_DISTANCE
  ) {
    return undefined
  }

  const playerAt = readPoint(value.player.at)
  const edits = readEdits(value.edits)
  if (!playerAt || !isSavedPlayerWalkable(playerAt) || !edits) {
    return undefined
  }

  return {
    mapId: LOCAL_SAVE_MAP_ID,
    elapsed: value.elapsed,
    player: { at: playerAt, heading: value.player.heading },
    camera: { yaw: value.camera.yaw, distance: value.camera.distance },
    edits,
  }
}

function readLegacyPlantGrowthState(
  value: unknown,
  edits: LegacyPersistentEditState,
): PersistentPlantGrowthState | undefined {
  return readPersistentPlantGrowthState(value, migratePersistentEditStateV5(edits))
}

export function readLocalSaveV1(value: unknown): LocalSaveV1 | undefined {
  const base = readSaveBase(value, LOCAL_SAVE_SCHEMA_V1, [
    'schemaVersion',
    'mapId',
    'elapsed',
    'player',
    'camera',
    'edits',
  ], readLegacyPersistentEditState, isWalkableBeforeHeadwater)
  return base ? { schemaVersion: LOCAL_SAVE_SCHEMA_V1, ...base } : undefined
}

export function readLocalSaveV2(value: unknown): LocalSaveV2 | undefined {
  const base = readSaveBase(value, LOCAL_SAVE_SCHEMA_V2, [
    'schemaVersion',
    'mapId',
    'elapsed',
    'player',
    'camera',
    'edits',
    'notebook',
  ], readLegacyPersistentEditState, isWalkableBeforeHeadwater)
  const notebook = isRecord(value)
    ? readObservationNotebookState(value.notebook)
    : undefined
  return base && notebook
    ? { schemaVersion: LOCAL_SAVE_SCHEMA_V2, ...base, notebook }
    : undefined
}

export function readLocalSaveV3(value: unknown): LocalSaveV3 | undefined {
  const base = readSaveBase(value, LOCAL_SAVE_SCHEMA_V3, [
    'schemaVersion',
    'mapId',
    'elapsed',
    'player',
    'camera',
    'edits',
    'notebook',
    'plantGrowth',
  ], readLegacyPersistentEditState, isWalkableBeforeHeadwater)
  if (!base || !isRecord(value)) {
    return undefined
  }
  const notebook = readObservationNotebookState(value.notebook)
  const plantGrowth = readLegacyPlantGrowthState(value.plantGrowth, base.edits)
  if (
    !notebook ||
    !plantGrowth ||
    Object.values(plantGrowth.byEntryId).some(
      ({ plantedAtElapsed }) => plantedAtElapsed > base.elapsed,
    )
  ) {
    return undefined
  }
  return {
    schemaVersion: LOCAL_SAVE_SCHEMA_V3,
    ...base,
    notebook,
    plantGrowth,
  }
}

export function readLocalSaveV4(value: unknown): LocalSaveV4 | undefined {
  const base = readSaveBase(value, LOCAL_SAVE_SCHEMA_V4, [
    'schemaVersion',
    'mapId',
    'elapsed',
    'player',
    'camera',
    'edits',
    'notebook',
    'plantGrowth',
  ], readPersistentEditStateV4, isWalkableBeforeHeadwater)
  if (!base || !isRecord(value)) {
    return undefined
  }
  const notebook = readObservationNotebookState(value.notebook)
  const plantGrowth = readLegacyPlantGrowthState(value.plantGrowth, base.edits)
  if (
    !notebook ||
    !plantGrowth ||
    Object.values(plantGrowth.byEntryId).some(
      ({ plantedAtElapsed }) => plantedAtElapsed > base.elapsed,
    )
  ) {
    return undefined
  }
  return {
    schemaVersion: LOCAL_SAVE_SCHEMA_V4,
    ...base,
    notebook,
    plantGrowth,
  }
}

export function readLocalSaveV5(value: unknown): LocalSaveV5 | undefined {
  const base = readSaveBase(value, LOCAL_SAVE_SCHEMA_V5, [
    'schemaVersion',
    'mapId',
    'elapsed',
    'player',
    'camera',
    'edits',
    'notebook',
    'plantGrowth',
  ], readPersistentEditStateV5, isWalkableBeforeHeadwater)
  if (!base || !isRecord(value)) {
    return undefined
  }
  const notebook = readObservationNotebookState(value.notebook)
  const plantGrowth = readLegacyPlantGrowthState(value.plantGrowth, base.edits)
  if (
    !notebook ||
    !plantGrowth ||
    Object.values(plantGrowth.byEntryId).some(
      ({ plantedAtElapsed }) => plantedAtElapsed > base.elapsed,
    )
  ) {
    return undefined
  }
  return {
    schemaVersion: LOCAL_SAVE_SCHEMA_V5,
    ...base,
    notebook,
    plantGrowth,
  }
}

export function readLocalSaveV6(value: unknown): LocalSaveV6 | undefined {
  const base = readSaveBase(value, LOCAL_SAVE_SCHEMA_VERSION, [
    'schemaVersion',
    'mapId',
    'elapsed',
    'player',
    'camera',
    'edits',
    'notebook',
    'plantGrowth',
    'upstream',
  ], readPersistentEditState, isWalkable)
  if (!base || !isRecord(value)) {
    return undefined
  }
  const notebook = readObservationNotebookState(value.notebook)
  const plantGrowth = readPersistentPlantGrowthState(value.plantGrowth, base.edits)
  const upstream = readPersistentUpstreamWaterwayState(
    value.upstream,
    base.edits,
    base.elapsed,
  )
  if (
    !notebook ||
    !plantGrowth ||
    !upstream ||
    Object.values(plantGrowth.byEntryId).some(
      ({ plantedAtElapsed }) => plantedAtElapsed > base.elapsed,
    )
  ) {
    return undefined
  }
  return {
    schemaVersion: LOCAL_SAVE_SCHEMA_VERSION,
    ...base,
    notebook,
    plantGrowth,
    upstream,
  }
}

const LEGACY_HEADWATER_PLAYER_RELOCATION: Point2 = { x: -1.7, z: -22.35 }

function migrateLegacyWorld(
  save: LocalSaveV1 | LocalSaveV2 | LocalSaveV3 | LocalSaveV4 | LocalSaveV5,
): Readonly<{
  player: LocalSaveV6['player']
  edits: PersistentEditState
  upstream: PersistentUpstreamWaterwayState
}> {
  const edits = migratePersistentEditStateV5(save.edits)
  const relocatedAt = isWalkable(save.player.at)
    ? save.player.at
    : isWalkable(LEGACY_HEADWATER_PLAYER_RELOCATION)
      ? LEGACY_HEADWATER_PLAYER_RELOCATION
      : START_POSITION
  return {
    player: {
      at: { x: relocatedAt.x, z: relocatedAt.z },
      heading: save.player.heading,
    },
    edits,
    upstream: createUpstreamWaterwayState(edits, save.elapsed),
  }
}

function migrateLocalSaveV1(save: LocalSaveV1): LocalSaveV6 {
  const world = migrateLegacyWorld(save)
  return {
    ...save,
    schemaVersion: LOCAL_SAVE_SCHEMA_VERSION,
    ...world,
    notebook: createObservationNotebookState(),
    plantGrowth: migrateLegacyLowFlowersAsAdults(world.edits, save.elapsed),
  }
}

function migrateLocalSaveV2(save: LocalSaveV2): LocalSaveV6 {
  const world = migrateLegacyWorld(save)
  return {
    ...save,
    schemaVersion: LOCAL_SAVE_SCHEMA_VERSION,
    ...world,
    plantGrowth: migrateLegacyLowFlowersAsAdults(world.edits, save.elapsed),
  }
}

function migrateLocalSaveV3(save: LocalSaveV3): LocalSaveV6 {
  return {
    ...save,
    schemaVersion: LOCAL_SAVE_SCHEMA_VERSION,
    ...migrateLegacyWorld(save),
  }
}

function migrateLocalSaveV4(save: LocalSaveV4): LocalSaveV6 {
  return {
    ...save,
    schemaVersion: LOCAL_SAVE_SCHEMA_VERSION,
    ...migrateLegacyWorld(save),
  }
}

function migrateLocalSaveV5(save: LocalSaveV5): LocalSaveV6 {
  return {
    ...save,
    schemaVersion: LOCAL_SAVE_SCHEMA_VERSION,
    ...migrateLegacyWorld(save),
  }
}

export function decodeLocalSave(raw: string): LocalSaveDecodeResult {
  let value: unknown
  try {
    value = JSON.parse(raw) as unknown
  } catch {
    return { status: 'invalid' }
  }

  if (
    isRecord(value) &&
    Number.isSafeInteger(value.schemaVersion) &&
    (value.schemaVersion as number) > LOCAL_SAVE_SCHEMA_VERSION
  ) {
    return {
      status: 'unsupported-future',
      schemaVersion: value.schemaVersion as number,
    }
  }

  const current = readLocalSaveV6(value)
  if (current) {
    return { status: 'valid', save: current }
  }
  const previousV5 = readLocalSaveV5(value)
  if (previousV5) {
    return { status: 'valid', save: migrateLocalSaveV5(previousV5) }
  }
  const previousV4 = readLocalSaveV4(value)
  if (previousV4) {
    return { status: 'valid', save: migrateLocalSaveV4(previousV4) }
  }
  const previousV3 = readLocalSaveV3(value)
  if (previousV3) {
    return { status: 'valid', save: migrateLocalSaveV3(previousV3) }
  }
  const previousV2 = readLocalSaveV2(value)
  if (previousV2) {
    return { status: 'valid', save: migrateLocalSaveV2(previousV2) }
  }
  const previousV1 = readLocalSaveV1(value)
  return previousV1
    ? { status: 'valid', save: migrateLocalSaveV1(previousV1) }
    : { status: 'invalid' }
}

function canonicalRaw(save: CurrentLocalSave): string | undefined {
  const validated = readLocalSaveV6(save)
  return validated ? JSON.stringify(validated) : undefined
}

export class LocalSaveStore {
  private readonly storage: StorageLike
  private locked = false

  constructor(storage: StorageLike) {
    this.storage = storage
  }

  get writeLocked(): boolean {
    return this.locked
  }

  load(): LocalSaveLoadResult {
    let primaryRaw: string | null
    let backupRaw: string | null
    try {
      primaryRaw = this.storage.getItem(LOCAL_SAVE_KEYS.primary)
    } catch {
      this.locked = true
      return { status: 'storage-error', writeLocked: true }
    }

    if (primaryRaw !== null) {
      const primary = decodeLocalSave(primaryRaw)
      if (primary.status === 'valid') {
        this.locked = false
        return {
          status: 'loaded',
          save: primary.save,
          source: 'primary',
          recovered: false,
          writeLocked: false,
        }
      }
      if (primary.status === 'unsupported-future') {
        this.locked = true
        return {
          status: 'unsupported-future',
          schemaVersion: primary.schemaVersion,
          source: 'primary',
          writeLocked: true,
        }
      }
    }

    try {
      backupRaw = this.storage.getItem(LOCAL_SAVE_KEYS.backup)
    } catch {
      this.locked = true
      return { status: 'storage-error', writeLocked: true }
    }

    if (backupRaw !== null) {
      const backup = decodeLocalSave(backupRaw)
      if (backup.status === 'valid') {
        try {
          if (primaryRaw !== null) {
            this.storage.setItem(LOCAL_SAVE_KEYS.corrupt, primaryRaw)
          }
          this.storage.setItem(LOCAL_SAVE_KEYS.primary, backupRaw)
        } catch {
          // 유효한 백업은 메모리에서 계속 쓸 수 있으며 다음 저장 때 복구를 다시 시도한다.
        }
        this.locked = false
        return {
          status: 'loaded',
          save: backup.save,
          source: 'backup',
          recovered: true,
          writeLocked: false,
        }
      }
      if (backup.status === 'unsupported-future') {
        this.locked = true
        return {
          status: 'unsupported-future',
          schemaVersion: backup.schemaVersion,
          source: 'backup',
          writeLocked: true,
        }
      }
    }

    const corruptRaw = primaryRaw ?? backupRaw
    let quarantined = corruptRaw === null
    if (corruptRaw !== null) {
      try {
        this.storage.setItem(LOCAL_SAVE_KEYS.corrupt, corruptRaw)
        quarantined = true
      } catch {
        quarantined = false
      }
    }
    if (quarantined) {
      try {
        this.storage.removeItem(LOCAL_SAVE_KEYS.primary)
        this.storage.removeItem(LOCAL_SAVE_KEYS.backup)
      } catch {
        // 격리본이 있으므로 남은 잘못된 키는 다음 로드에서도 안전하게 무시할 수 있다.
      }
    }
    this.locked = false
    return { status: 'none', writeLocked: false }
  }

  write(save: CurrentLocalSave): LocalSaveWriteResult {
    if (this.locked) {
      return { status: 'locked' }
    }
    const raw = canonicalRaw(save)
    if (!raw) {
      return { status: 'invalid' }
    }

    let previousRaw: string | null
    try {
      previousRaw = this.storage.getItem(LOCAL_SAVE_KEYS.primary)
    } catch {
      return { status: 'storage-error' }
    }

    if (previousRaw !== null) {
      const previous = decodeLocalSave(previousRaw)
      if (previous.status === 'unsupported-future') {
        this.locked = true
        return { status: 'locked' }
      }
      try {
        if (previous.status === 'valid') {
          this.storage.setItem(LOCAL_SAVE_KEYS.backup, previousRaw)
        } else {
          this.storage.setItem(LOCAL_SAVE_KEYS.corrupt, previousRaw)
        }
      } catch {
        return { status: 'storage-error' }
      }
    }

    try {
      this.storage.setItem(LOCAL_SAVE_KEYS.primary, raw)
      return { status: 'saved' }
    } catch {
      return { status: 'storage-error' }
    }
  }
}

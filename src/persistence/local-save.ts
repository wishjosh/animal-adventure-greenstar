import {
  readPersistentEditState,
  type PersistentEditState,
} from '../domain/edit-model.ts'
import { isWalkable, type Point2 } from '../content/first-map.ts'

export const LOCAL_SAVE_SCHEMA_VERSION = 1 as const
export const LOCAL_SAVE_MAP_ID = 'mountain-village-first-map' as const

export const LOCAL_SAVE_KEYS = Object.freeze({
  primary: 'animal-adventure.save',
  backup: 'animal-adventure.save.backup',
  corrupt: 'animal-adventure.save.corrupt',
})

export const MIN_SAVED_CAMERA_DISTANCE = 7.2
export const MAX_SAVED_CAMERA_DISTANCE = 14

export type LocalSaveV1 = Readonly<{
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
}>

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export type LocalSaveDecodeResult =
  | Readonly<{ status: 'valid'; save: LocalSaveV1 }>
  | Readonly<{ status: 'invalid' }>
  | Readonly<{ status: 'unsupported-future'; schemaVersion: number }>

export type LocalSaveLoadResult =
  | Readonly<{
      status: 'loaded'
      save: LocalSaveV1
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

export function readLocalSaveV1(value: unknown): LocalSaveV1 | undefined {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, [
      'schemaVersion',
      'mapId',
      'elapsed',
      'player',
      'camera',
      'edits',
    ]) ||
    value.schemaVersion !== LOCAL_SAVE_SCHEMA_VERSION ||
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
  const edits = readPersistentEditState(value.edits)
  if (!playerAt || !isWalkable(playerAt) || !edits) {
    return undefined
  }

  return {
    schemaVersion: LOCAL_SAVE_SCHEMA_VERSION,
    mapId: LOCAL_SAVE_MAP_ID,
    elapsed: value.elapsed,
    player: { at: playerAt, heading: value.player.heading },
    camera: { yaw: value.camera.yaw, distance: value.camera.distance },
    edits,
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

  const save = readLocalSaveV1(value)
  return save ? { status: 'valid', save } : { status: 'invalid' }
}

function canonicalRaw(save: LocalSaveV1): string | undefined {
  const validated = readLocalSaveV1(save)
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

  write(save: LocalSaveV1): LocalSaveWriteResult {
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

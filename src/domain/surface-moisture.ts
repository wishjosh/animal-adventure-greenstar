import { type EditSnapshot, type PersistentEditState } from './edit-model.ts'
import {
  type LightState,
  type LocalCoverPattern,
  type LocalEnvironmentSnapshot,
  type MoistureSource,
  type SurfaceMoistureState,
  type AmbientSurfaceConditions,
  FIRST_MAP_AMBIENT_SURFACE,
} from './local-environment.ts'
import { type CareZoneId, type Point2 } from '../content/first-map.ts'
import { drainageStateNearPoint, type DrainageNetworkState } from './drainage-network.ts'

// 표면 습기는 자리마다 고정된 값이 아니라 물을 준 뒤 시간이 지나면 마르는 값이다.
// 마르는 시간의 하한은 두 가지에서 나온다.
//   1. 동물 한 주기(무당개구리 약 25~30초)보다 길어야 물주기가 결과를 만든다.
//   2. 물을 길어 오는 왕복 시간보다 충분히 길어야 잔심부름이 되지 않는다.
// 아래 값은 그 하한에서 유도한 첫 제품 슬라이스의 제작값이며 플레이테스트로 조정한다.

export type ZoneMoistureRuntime = Readonly<{
  /** 0이면 마른 흙, 1이면 방금 물을 준 흙이다. */
  wetness: number
  /** 배수 홈 가까이에 부었는지 판정할 마지막 물주기 자리다. */
  wateredAt?: Point2
}>

export type SurfaceMoistureRuntime = Readonly<Record<CareZoneId, ZoneMoistureRuntime>>

export type SurfaceMoistureTuning = Readonly<{
  /** 맨 흙이 다 마르는 데 걸리는 초. */
  baseDryingSeconds: number
  /** 덮임이 마름을 늦추는 배수. */
  coverRetention: Readonly<Record<LocalCoverPattern, number>>
  /** 그늘이 마름을 늦추는 배수. */
  lightRetention: Readonly<Record<LightState, number>>
  /** 물을 준 지점과 이어진 작은 물길이 마름에 주는 배수. */
  drainageRetention: Readonly<Record<DrainageNetworkState, number>>
  /** 북돋운 흙 하나가 더하는 보유력과 그 상한. */
  amendmentRetentionStep: number
  maximumAmendmentRetention: number
}>

// 맨 흙 3분 / 덮인 흙 약 8분 / 그늘과 덮임이 겹친 곳은 한 세션(15분) 안에 사실상 마르지 않는다.
export const FIRST_MAP_SURFACE_MOISTURE_TUNING: SurfaceMoistureTuning = Object.freeze({
  baseDryingSeconds: 180,
  coverRetention: Object.freeze({
    'open-ground': 1,
    patches: 1.4,
    linked: 2,
    dense: 2.67,
  }),
  lightRetention: Object.freeze({
    bright: 1,
    dappled: 1.5,
    shaded: 2.2,
  }),
  drainageRetention: Object.freeze({
    none: 1,
    holding: 1.25,
    outflow: 0.7,
  }),
  amendmentRetentionStep: 0.25,
  maximumAmendmentRetention: 1.75,
})

const MAX_STEP_SECONDS = 0.1

/** 물가에 닿은 자리는 플레이어가 물을 주지 않아도 계속 젖어 있다. */
function isAmbientMoist(source: MoistureSource): boolean {
  return source !== 'drying-exposed'
}

export function createSurfaceMoistureRuntime(
  ambient: AmbientSurfaceConditions = FIRST_MAP_AMBIENT_SURFACE,
): SurfaceMoistureRuntime {
  const start = (zoneId: CareZoneId): ZoneMoistureRuntime => ({
    wetness: isAmbientMoist(ambient[zoneId].moistureSource) ? 1 : 0,
  })
  return {
    'a-garden': start('a-garden'),
    'b-bright-soil': start('b-bright-soil'),
    'b-moist-soil': start('b-moist-soil'),
  }
}

function amendmentCount(snapshot: EditSnapshot, zoneId: CareZoneId): number {
  return Object.values(snapshot[zoneId]).filter(
    (entry) => entry.kind === 'surface-adjustment',
  ).length
}

/**
 * 이 자리가 다 마르는 데 걸리는 초다.
 * 덮어 준 곳, 그늘진 곳과 흙을 북돋운 곳이 더 오래 젖어 있다.
 */
export function dryingSecondsFor(
  zoneId: CareZoneId,
  environment: LocalEnvironmentSnapshot,
  editState: PersistentEditState,
  tuning: SurfaceMoistureTuning = FIRST_MAP_SURFACE_MOISTURE_TUNING,
  wateredAt?: Point2,
): number {
  const reading = environment.zones[zoneId]
  const amendments = amendmentCount(editState.current, zoneId)
  const amendmentRetention = Math.min(
    tuning.maximumAmendmentRetention,
    1 + amendments * tuning.amendmentRetentionStep,
  )
  const drainage = wateredAt
    ? drainageStateNearPoint(editState, zoneId, wateredAt)
    : 'none'
  return (
    tuning.baseDryingSeconds *
    tuning.coverRetention[reading.lowCover] *
    tuning.lightRetention[reading.light] *
    amendmentRetention *
    tuning.drainageRetention[drainage]
  )
}

export type AdvanceMoistureInput = Readonly<{
  deltaSeconds: number
  environment: LocalEnvironmentSnapshot
  editState: PersistentEditState
  ambient?: AmbientSurfaceConditions
  tuning?: SurfaceMoistureTuning
}>

function safeDelta(deltaSeconds: number): number {
  return Number.isFinite(deltaSeconds)
    ? Math.max(0, Math.min(deltaSeconds, MAX_STEP_SECONDS))
    : 0
}

export function advanceSurfaceMoisture(
  runtime: SurfaceMoistureRuntime,
  input: AdvanceMoistureInput,
): SurfaceMoistureRuntime {
  const ambient = input.ambient ?? FIRST_MAP_AMBIENT_SURFACE
  const tuning = input.tuning ?? FIRST_MAP_SURFACE_MOISTURE_TUNING
  const delta = safeDelta(input.deltaSeconds)
  const next = (zoneId: CareZoneId): ZoneMoistureRuntime => {
    if (isAmbientMoist(ambient[zoneId].moistureSource)) {
      return { wetness: 1 }
    }
    const current = runtime[zoneId].wetness
    if (current <= 0) {
      return { wetness: 0 }
    }
    const seconds = dryingSecondsFor(
      zoneId,
      input.environment,
      input.editState,
      tuning,
      runtime[zoneId].wateredAt,
    )
    if (seconds <= 0) {
      return { wetness: 0 }
    }
    const wetness = Math.max(0, current - delta / seconds)
    return wetness > 0
      ? {
          wetness,
          ...(runtime[zoneId].wateredAt
            ? { wateredAt: { ...runtime[zoneId].wateredAt } }
            : {}),
        }
      : { wetness: 0 }
  }
  return {
    'a-garden': next('a-garden'),
    'b-bright-soil': next('b-bright-soil'),
    'b-moist-soil': next('b-moist-soil'),
  }
}

/** 물뿌리개로 한 자리에 물을 준다. 되돌리기의 대상이 아니며 저절로 마른다. */
export function waterZone(
  runtime: SurfaceMoistureRuntime,
  zoneId: CareZoneId,
  at?: Point2,
): SurfaceMoistureRuntime {
  return {
    ...runtime,
    [zoneId]: {
      wetness: 1,
      ...(at ? { wateredAt: { x: at.x, z: at.z } } : {}),
    },
  }
}

export function readSurfaceMoisture(
  runtime: SurfaceMoistureRuntime,
): Readonly<Record<CareZoneId, SurfaceMoistureState>> {
  const read = (zoneId: CareZoneId): SurfaceMoistureState =>
    runtime[zoneId].wetness > 0 ? 'moist' : 'dry'
  return {
    'a-garden': read('a-garden'),
    'b-bright-soil': read('b-bright-soil'),
    'b-moist-soil': read('b-moist-soil'),
  }
}

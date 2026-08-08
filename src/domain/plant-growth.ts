import { CARE_ZONE_IDS, type CareZoneId } from '../content/first-map.ts'
import { type EditEntry, type PersistentEditState } from './edit-model.ts'
import {
  type LightState,
  type LocalCoverPattern,
  type LocalEnvironmentSnapshot,
  type SurfaceMoistureState,
} from './local-environment.ts'

export type PlantGrowthStage = 'seed' | 'sprout' | 'young' | 'adult'
export type PlantCrowdingState = 'spacious' | 'close' | 'overcrowded'

export type PlantCrowdingReading = Readonly<{
  state: PlantCrowdingState
  /** 가까운 꽃과 덮임이 만드는 상대 압력이다. 저장하지 않고 현재 배치에서 파생한다. */
  pressure: number
  coverPressure: number
}>

/**
 * 현재 EditEntry에는 생성 시각이 없으므로 별도의 ID 기반 표에 두는 최소 확장안이다.
 * stage와 stageProgress는 이 두 값에서 다시 계산할 수 있어 저장하지 않는다.
 */
export type PlantGrowthRecord = Readonly<{
  plantedAtElapsed: number
  accumulatedGrowth: number
}>

/** LocalSave의 다음 스키마가 `plantGrowth` 필드로 저장할 수 있는 값이다. */
export type PersistentPlantGrowthState = Readonly<{
  byEntryId: Readonly<Record<string, PlantGrowthRecord>>
}>

export type PlantGrowthConditions = Readonly<{
  surfaceMoisture: SurfaceMoistureState
  light: LightState
  lowCover: LocalCoverPattern
  crowding?: PlantCrowdingState
  rotRisk?: boolean
}>

export type PlantGrowthTuning = Readonly<{
  /** 알맞은 환경에서 1초마다 쌓이는 성장량이다. */
  growthPerSecond: number
  stageStarts: Readonly<Record<Exclude<PlantGrowthStage, 'seed'>, number>>
  moistureMultiplier: Readonly<Record<SurfaceMoistureState, number>>
  lightMultiplier: Readonly<Record<LightState, number>>
  coverMultiplier: Readonly<Record<LocalCoverPattern, number>>
  crowdingMultiplier: Readonly<Record<PlantCrowdingState, number>>
  rotRiskMultiplier: number
}>

// 알맞게 물을 받은 밝고 트인 자리에서 약 1분 30초면 성체가 된다.
// 마른 흙에서는 기다리기만 해서는 자라지 않으며, 그늘과 빽빽한 덮임은
// 성장을 멈추지는 않되 관찰할 수 있을 만큼 늦춘다.
export const FIRST_MAP_PLANT_GROWTH_TUNING: PlantGrowthTuning = Object.freeze({
  growthPerSecond: 1,
  stageStarts: Object.freeze({
    sprout: 12,
    young: 36,
    adult: 90,
  }),
  moistureMultiplier: Object.freeze({
    dry: 0,
    moist: 1,
  }),
  lightMultiplier: Object.freeze({
    bright: 1,
    dappled: 0.76,
    shaded: 0.38,
  }),
  coverMultiplier: Object.freeze({
    'open-ground': 1,
    patches: 0.9,
    linked: 0.7,
    dense: 0.45,
  }),
  crowdingMultiplier: Object.freeze({
    spacious: 1,
    close: 0.72,
    overcrowded: 0.24,
  }),
  // 축축한 흙이 겹겹이 덮여 통풍까지 막힌 동안에는 성장이 거의 멈춘다.
  // 배치를 옮기거나 솎으면 회복되는 가역적인 위험으로 두어 식물이 사라지지는 않는다.
  rotRiskMultiplier: 0.08,
})

export type AdvancePlantGrowthInput = Readonly<{
  deltaSeconds: number
  worldElapsed: number
  /** GameSnapshot의 started && !blocked를 넘긴다. */
  worldRunning: boolean
  environment: LocalEnvironmentSnapshot
  tuning?: PlantGrowthTuning
}>

export type PlantGrowthView = Readonly<{
  stage: PlantGrowthStage
  /** 현재 단계 안에서의 진행률이다. 성체는 항상 1이다. */
  stageProgress: number
  /** 식재 뒤 흐른 세계 시간이다. 멈춘 세계에서는 세계 시간도 흐르지 않는다. */
  ageSeconds: number
  accumulatedGrowth: number
  adult: boolean
}>

/** 씨앗부터 성체까지 현재 포기가 빛과 열린 틈에 미치는 상대 크기다. */
export function plantGrowthInfluence(
  record: PlantGrowthRecord | undefined,
  thinned = false,
  tuning: PlantGrowthTuning = FIRST_MAP_PLANT_GROWTH_TUNING,
): number {
  if (!record) {
    return 0
  }
  const view = derivePlantGrowth(record, record.plantedAtElapsed, tuning)
  const base = view.stage === 'seed'
    ? 0
    : view.stage === 'sprout'
      ? 0.2 + view.stageProgress * 0.15
      : view.stage === 'young'
        ? 0.55 + view.stageProgress * 0.35
        : 1
  return base * (thinned ? 0.62 : 1)
}

export type PlantGrowthDensity = Readonly<{
  plantCount: number
  adultCount: number
  /** 성체 한 포기를 1로 환산한 식생량의 합이다. */
  matureEquivalent: number
  /** 면적을 넘겼을 때만 계산되는 제곱미터당 성체 환산 포기 수다. */
  matureEquivalentPerSquareMetre?: number
}>

function finiteNonNegative(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0
}

// 서로 다른 프레임 간격에서 생기는 IEEE 754 누적 오차가 저장값을 갈라놓지 않게 한다.
const GROWTH_PRECISION = 1_000_000_000

function stableGrowth(value: number): number {
  return Math.round(finiteNonNegative(value) * GROWTH_PRECISION) / GROWTH_PRECISION
}

function safeMultiplier(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0
}

function stageStartsAreValid(tuning: PlantGrowthTuning): boolean {
  const { sprout, young, adult } = tuning.stageStarts
  return (
    Number.isFinite(sprout) &&
    Number.isFinite(young) &&
    Number.isFinite(adult) &&
    sprout > 0 &&
    young > sprout &&
    adult > young
  )
}

type CareFlowerEntry = Extract<EditEntry, { kind: 'low-flower' }> &
  Readonly<{ zoneId: CareZoneId }>

function lowFlowerEntries(editState: PersistentEditState): readonly CareFlowerEntry[] {
  return CARE_ZONE_IDS.flatMap((zoneId) =>
    Object.values(editState.current[zoneId]).flatMap((entry) =>
      entry.kind === 'low-flower' ? [{ ...entry, zoneId }] : [],
    ),
  )
}

/** 한 포기 주변의 실제 중심 간격에서 과밀 상태를 결정론적으로 읽는다. */
export function plantCrowdingAt(
  editState: PersistentEditState,
  entryId: string,
): PlantCrowdingReading {
  let target: CareFlowerEntry | undefined
  for (const entry of lowFlowerEntries(editState)) {
    if (entry.id === entryId) {
      target = entry
      break
    }
  }
  if (!target) {
    return { state: 'spacious', pressure: 0, coverPressure: 0 }
  }
  const neighbours = Object.values(editState.current[target.zoneId])
  let pressure = 0
  let coverPressure = 0
  for (const entry of neighbours) {
    if (entry.id === target.id) {
      continue
    }
    const distance = Math.hypot(entry.at.x - target.at.x, entry.at.z - target.at.z)
    if (entry.kind === 'low-flower' && distance < 0.78) {
      pressure += (1 - distance / 0.78) * (entry.thinned ? 0.56 : 1)
    } else if (entry.kind === 'low-cover' && distance < 0.66) {
      const influence = (1 - distance / 0.66) * 0.74
      pressure += influence
      coverPressure += influence
    }
  }
  pressure *= target.thinned ? 0.78 : 1
  const stablePressure = Math.round(Math.max(0, pressure) * 1_000_000) / 1_000_000
  return {
    state: stablePressure >= 1.05
      ? 'overcrowded'
      : stablePressure >= 0.35
        ? 'close'
        : 'spacious',
    pressure: stablePressure,
    coverPressure: Math.round(Math.max(0, coverPressure) * 1_000_000) / 1_000_000,
  }
}

export function plantHasRotRisk(
  crowding: PlantCrowdingState | PlantCrowdingReading,
  conditions: Pick<PlantGrowthConditions, 'surfaceMoisture' | 'lowCover'>,
): boolean {
  const state = typeof crowding === 'string' ? crowding : crowding.state
  const locallySmothered = typeof crowding === 'string'
    ? false
    : crowding.coverPressure >= 0.55
  return state === 'overcrowded' &&
    conditions.surfaceMoisture === 'moist' &&
    (conditions.lowCover === 'dense' || locallySmothered)
}

function sameRecord(left: PlantGrowthRecord | undefined, right: PlantGrowthRecord): boolean {
  return (
    left?.plantedAtElapsed === right.plantedAtElapsed &&
    left.accumulatedGrowth === right.accumulatedGrowth
  )
}

export function createPlantGrowthState(): PersistentPlantGrowthState {
  return { byEntryId: {} }
}

/**
 * 현재 꽃 목록과 성장 표를 맞춘다. 새 꽃은 씨앗으로 넣고 회수·되돌리기로 사라진
 * 꽃의 기록은 버린다. 입력과 결과가 같으면 원래 객체를 돌려준다.
 */
export function syncPlantGrowthState(
  state: PersistentPlantGrowthState,
  editState: PersistentEditState,
  worldElapsed: number,
): PersistentPlantGrowthState {
  const plantedAtElapsed = finiteNonNegative(worldElapsed)
  const next: Record<string, PlantGrowthRecord> = {}
  for (const entry of lowFlowerEntries(editState)) {
    next[entry.id] = state.byEntryId[entry.id] ?? {
      plantedAtElapsed,
      accumulatedGrowth: 0,
    }
  }
  const currentIds = Object.keys(state.byEntryId)
  const nextIds = Object.keys(next)
  const unchanged =
    currentIds.length === nextIds.length &&
    nextIds.every((id) => sameRecord(state.byEntryId[id], next[id]!))
  return unchanged ? state : { byEntryId: next }
}

/** 같은 환경에서 1초 동안 쌓이는 성장량이다. */
export function plantGrowthRate(
  conditions: PlantGrowthConditions,
  tuning: PlantGrowthTuning = FIRST_MAP_PLANT_GROWTH_TUNING,
): number {
  if (!stageStartsAreValid(tuning)) {
    return 0
  }
  return (
    safeMultiplier(tuning.growthPerSecond) *
    safeMultiplier(tuning.moistureMultiplier[conditions.surfaceMoisture]) *
    safeMultiplier(tuning.lightMultiplier[conditions.light]) *
    safeMultiplier(tuning.coverMultiplier[conditions.lowCover]) *
    safeMultiplier(tuning.crowdingMultiplier[conditions.crowding ?? 'spacious']) *
    (conditions.rotRisk ? safeMultiplier(tuning.rotRiskMultiplier) : 1)
  )
}

/**
 * 현재 편집과 먼저 동기화한 뒤 한 세계 프레임의 성장량을 누적한다.
 * 세계가 멈추었거나 물이 부족하면 성장량은 변하지 않는다.
 */
export function advancePlantGrowthState(
  state: PersistentPlantGrowthState,
  editState: PersistentEditState,
  input: AdvancePlantGrowthInput,
): PersistentPlantGrowthState {
  const synced = syncPlantGrowthState(state, editState, input.worldElapsed)
  if (!input.worldRunning) {
    return synced
  }
  const delta = finiteNonNegative(input.deltaSeconds)
  if (delta === 0) {
    return synced
  }
  const tuning = input.tuning ?? FIRST_MAP_PLANT_GROWTH_TUNING
  const next = { ...synced.byEntryId }
  let changed = false
  for (const entry of lowFlowerEntries(editState)) {
    const record = synced.byEntryId[entry.id]
    if (!record) {
      continue
    }
    const zone = input.environment.zones[entry.zoneId]
    const crowding = plantCrowdingAt(editState, entry.id)
    const increment = delta * plantGrowthRate({
      ...zone,
      crowding: crowding.state,
      rotRisk: plantHasRotRisk(crowding, zone),
    }, tuning)
    if (increment <= 0) {
      continue
    }
    const accumulatedGrowth = stableGrowth(Math.min(
      tuning.stageStarts.adult,
      finiteNonNegative(record.accumulatedGrowth) + increment,
    ))
    if (accumulatedGrowth === record.accumulatedGrowth) {
      continue
    }
    next[entry.id] = {
      ...record,
      accumulatedGrowth,
    }
    changed = true
  }
  return changed ? { byEntryId: next } : synced
}

export function plantGrowthStage(
  accumulatedGrowth: number,
  tuning: PlantGrowthTuning = FIRST_MAP_PLANT_GROWTH_TUNING,
): PlantGrowthStage {
  if (!stageStartsAreValid(tuning)) {
    return 'seed'
  }
  const growth = finiteNonNegative(accumulatedGrowth)
  if (growth >= tuning.stageStarts.adult) {
    return 'adult'
  }
  if (growth >= tuning.stageStarts.young) {
    return 'young'
  }
  if (growth >= tuning.stageStarts.sprout) {
    return 'sprout'
  }
  return 'seed'
}

function stageProgress(
  accumulatedGrowth: number,
  stage: PlantGrowthStage,
  tuning: PlantGrowthTuning,
): number {
  if (!stageStartsAreValid(tuning)) {
    return 0
  }
  if (stage === 'adult') {
    return 1
  }
  const growth = finiteNonNegative(accumulatedGrowth)
  const start = stage === 'seed' ? 0 : tuning.stageStarts[stage]
  const end =
    stage === 'seed'
      ? tuning.stageStarts.sprout
      : stage === 'sprout'
        ? tuning.stageStarts.young
        : tuning.stageStarts.adult
  return Math.max(0, Math.min(1, (growth - start) / (end - start)))
}

/** 저장된 두 성장 필드와 현재 세계 시간에서 화면·게임플레이용 파생값을 만든다. */
export function derivePlantGrowth(
  record: PlantGrowthRecord,
  worldElapsed: number,
  tuning: PlantGrowthTuning = FIRST_MAP_PLANT_GROWTH_TUNING,
): PlantGrowthView {
  const accumulatedGrowth = finiteNonNegative(record.accumulatedGrowth)
  const stage = plantGrowthStage(accumulatedGrowth, tuning)
  return {
    stage,
    stageProgress: stageProgress(accumulatedGrowth, stage, tuning),
    ageSeconds: Math.max(
      0,
      finiteNonNegative(worldElapsed) - finiteNonNegative(record.plantedAtElapsed),
    ),
    accumulatedGrowth,
    adult: stage === 'adult',
  }
}

export function isAdultPlantGrowth(
  record: PlantGrowthRecord,
  tuning: PlantGrowthTuning = FIRST_MAP_PLANT_GROWTH_TUNING,
): boolean {
  return plantGrowthStage(record.accumulatedGrowth, tuning) === 'adult'
}

function matureEquivalent(record: PlantGrowthRecord, tuning: PlantGrowthTuning): number {
  if (!stageStartsAreValid(tuning)) {
    return 0
  }
  return Math.max(
    0,
    Math.min(1, finiteNonNegative(record.accumulatedGrowth) / tuning.stageStarts.adult),
  )
}

/** 솎기와 밀도 판정이 사용할 현재 꽃들의 성체 환산 식생량을 계산한다. */
export function plantGrowthDensity(
  state: PersistentPlantGrowthState,
  editState: PersistentEditState,
  areaSquareMetres?: number,
  tuning: PlantGrowthTuning = FIRST_MAP_PLANT_GROWTH_TUNING,
): PlantGrowthDensity {
  const records = lowFlowerEntries(editState).flatMap((entry) => {
    const record = state.byEntryId[entry.id]
    return record ? [record] : []
  })
  const adultCount = records.filter((record) => isAdultPlantGrowth(record, tuning)).length
  const totalEquivalent = records.reduce(
    (total, record) => total + matureEquivalent(record, tuning),
    0,
  )
  const validArea =
    areaSquareMetres !== undefined &&
    Number.isFinite(areaSquareMetres) &&
    areaSquareMetres > 0
      ? areaSquareMetres
      : undefined
  return {
    plantCount: records.length,
    adultCount,
    matureEquivalent: totalEquivalent,
    ...(validArea === undefined
      ? {}
      : { matureEquivalentPerSquareMetre: totalEquivalent / validArea }),
  }
}

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

/**
 * 저장값이 손상되지 않았고 현재의 모든 low-flower ID와 정확히 대응하는지 검증한다.
 * 파생 단계나 사라진 항목의 기록이 섞인 값은 허용하지 않는다.
 */
export function readPersistentPlantGrowthState(
  value: unknown,
  editState: PersistentEditState,
): PersistentPlantGrowthState | undefined {
  if (!isRecord(value) || !hasOnlyKeys(value, ['byEntryId']) || !isRecord(value.byEntryId)) {
    return undefined
  }
  const flowerIds = new Set(lowFlowerEntries(editState).map((entry) => entry.id))
  const rawEntries = Object.entries(value.byEntryId)
  if (rawEntries.length !== flowerIds.size) {
    return undefined
  }
  const byEntryId: Record<string, PlantGrowthRecord> = {}
  for (const [id, rawRecord] of rawEntries) {
    if (
      !flowerIds.has(id) ||
      !isRecord(rawRecord) ||
      !hasOnlyKeys(rawRecord, ['plantedAtElapsed', 'accumulatedGrowth']) ||
      typeof rawRecord.plantedAtElapsed !== 'number' ||
      !Number.isFinite(rawRecord.plantedAtElapsed) ||
      rawRecord.plantedAtElapsed < 0 ||
      typeof rawRecord.accumulatedGrowth !== 'number' ||
      !Number.isFinite(rawRecord.accumulatedGrowth) ||
      rawRecord.accumulatedGrowth < 0 ||
      rawRecord.accumulatedGrowth > FIRST_MAP_PLANT_GROWTH_TUNING.stageStarts.adult
    ) {
      return undefined
    }
    byEntryId[id] = {
      plantedAtElapsed: rawRecord.plantedAtElapsed,
      accumulatedGrowth: rawRecord.accumulatedGrowth,
    }
  }
  return { byEntryId }
}

/**
 * 성장 저장값이 없던 구버전 세계의 기존 꽃을 그대로 보존하기 위한 migration이다.
 * 식재 시각은 알 수 없으므로 migration 시각으로 두고, 모습만 성체로 이어 간다.
 */
export function migrateLegacyLowFlowersAsAdults(
  editState: PersistentEditState,
  worldElapsed: number,
  tuning: PlantGrowthTuning = FIRST_MAP_PLANT_GROWTH_TUNING,
): PersistentPlantGrowthState {
  const plantedAtElapsed = finiteNonNegative(worldElapsed)
  const adultGrowth = stageStartsAreValid(tuning) ? tuning.stageStarts.adult : 0
  return {
    byEntryId: Object.fromEntries(
      lowFlowerEntries(editState).map((entry) => [
        entry.id,
        { plantedAtElapsed, accumulatedGrowth: adultGrowth },
      ]),
    ),
  }
}

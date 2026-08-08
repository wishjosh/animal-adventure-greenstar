import {
  STRUCTURE_FOOTPRINTS,
  createEmptyEditState,
  type EditEntry,
  type PersistentEditState,
  type StructureEntry,
} from './edit-model.ts'
import { deriveDrainageNetwork } from './drainage-network.ts'
import { DRAINAGE_OUTLETS, EDIT_ZONES, type Point2 } from '../content/first-map.ts'

export type HeadwaterProfile = Readonly<{
  /** 본래 숲 그늘과 플레이어가 만든 덮임·구조물이 합쳐진 정도다. */
  shade: number
  /** 낮춘 땅·덮임·막힌 홈이 물을 천천히 머물게 하는 정도다. */
  retention: number
  /** 얕은 홈이 낮은 쪽 출구까지 이어져 아래 물길로 흐르는 정도다. */
  continuity: number
}>

export type UpstreamDelivery = Readonly<{
  sourceChangedAt: number
  arrivesAt: number
  profile: HeadwaterProfile
}>

/**
 * 완료 여부나 정답은 저장하지 않는다. 현재 발원지 모습과 그 모습이 B에 닿는
 * 시각만 남기고, 이동 중·도착은 세계 시간에서 다시 계산한다.
 */
export type PersistentUpstreamWaterwayState = Readonly<{
  sourceSignature: string
  sourceChangedAt?: number
  /** B에 이미 닿아 현재 보이는 상류 모습이다. */
  delivered?: UpstreamDelivery
  /** 현재 B로 이동 중인 가장 최근 상류 모습이다. */
  pending?: UpstreamDelivery
}>

export type AdvanceUpstreamWaterwayInput = Readonly<{
  editState: PersistentEditState
  worldElapsed: number
}>

/** 첫 수평 슬라이스의 플레이테스트용 이동 시간이다. */
export const UPSTREAM_DELIVERY_DELAY_SECONDS = 24

export const NATURAL_HEADWATER_PROFILE: HeadwaterProfile = Object.freeze({
  shade: 0.34,
  retention: 0.4,
  continuity: 0.5,
})

const HEADWATER_ZONE_ID = 'd-headwater-edge' as const
const HEADWATER_ZONE = EDIT_ZONES.find(({ id }) => id === HEADWATER_ZONE_ID)
const HEADWATER_OUTLET = DRAINAGE_OUTLETS.find(({ zoneId }) => zoneId === HEADWATER_ZONE_ID)

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value))
}

function finiteElapsed(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0
}

function rounded(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000
}

function entrySignature(entry: EditEntry): readonly unknown[] {
  const common: unknown[] = [
    entry.kind,
    rounded(entry.at.x),
    rounded(entry.at.z),
    rounded(entry.rotation),
  ]
  if (entry.kind === 'low-flower') return [...common, entry.thinned]
  if (entry.kind === 'terrain-patch') return [...common, entry.direction]
  if (entry.kind === 'drainage-segment') return [...common, rounded(entry.length)]
  if (entry.kind === 'structure') return [...common, entry.form]
  return common
}

/** 편집 ID와 revision이 달라도 실제 발원지 모습이 같으면 같은 근원으로 읽는다. */
export function headwaterSourceSignature(editState: PersistentEditState): string {
  const signatures = Object.values(editState.current[HEADWATER_ZONE_ID])
    .map(entrySignature)
    .sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)))
  return JSON.stringify(signatures)
}

function pointInStructureShade(entry: StructureEntry, point: Point2): number {
  if (entry.form === 'support') return 0
  const footprint = STRUCTURE_FOOTPRINTS[entry.form]
  const deltaX = point.x - entry.at.x
  const deltaZ = point.z - entry.at.z
  const cosine = Math.cos(entry.rotation)
  const sine = Math.sin(entry.rotation)
  const localX = cosine * deltaX + sine * deltaZ
  const localZ = -sine * deltaX + cosine * deltaZ
  const extent = entry.form === 'shade'
    ? { x: footprint.halfLength + 0.34, z: footprint.halfWidth + 0.34, amount: 0.78 }
    : entry.form === 'rack'
      ? { x: footprint.halfLength + 0.28, z: footprint.halfWidth + 0.22, amount: 0.36 }
      : { x: footprint.halfLength + 0.16, z: footprint.halfWidth + 0.12, amount: 0.1 }
  return Math.abs(localX) <= extent.x && Math.abs(localZ) <= extent.z
    ? extent.amount
    : 0
}

function headwaterSamples(): readonly Point2[] {
  const focus = HEADWATER_ZONE?.focus ?? { x: -5.35, z: -22.15 }
  return [-0.85, 0, 0.85].flatMap((z) =>
    [-0.85, 0, 0.85].map((x) => ({ x: focus.x + x, z: focus.z + z })),
  )
}

function structureFlowContribution(entry: StructureEntry): Readonly<{
  retention: number
  continuity: number
}> {
  if (entry.form === 'support') {
    // 작은 돌무더기는 물살을 흩어 짧게 머물게 한다.
    return { retention: 0.025, continuity: -0.025 }
  }
  if (entry.form === 'rack') {
    // 듬성한 가지는 잎을 붙들지만 물을 완전히 막지는 않는다.
    return { retention: 0.05, continuity: 0.01 }
  }
  if (entry.form === 'shade') {
    // 그늘의 주된 결과는 shade에서 읽으며, 젖은 가장자리도 조금 오래 남는다.
    return { retention: 0.025, continuity: 0 }
  }

  const focus = HEADWATER_ZONE?.focus ?? { x: -5.35, z: -22.15 }
  const outlet = HEADWATER_OUTLET?.at ?? { x: -4.42, z: -21.12 }
  const flowAngle = Math.atan2(outlet.z - focus.z, outlet.x - focus.x)
  const acrossFlow = Math.abs(Math.sin(entry.rotation - flowAngle))
  // 가지 둑은 흐름을 가로지를수록 더 붙들고, 나란할수록 아래로 안내한다.
  return {
    retention: 0.035 + acrossFlow * 0.07,
    continuity: 0.025 - acrossFlow * 0.075,
  }
}

/**
 * 서로 다른 조합을 세 연속 기능으로 읽는다. 어떤 임계값도 성공·실패나 이동
 * 허가가 아니며, 같은 값에 이르는 여러 배치를 모두 그대로 인정한다.
 */
export function deriveHeadwaterProfile(editState: PersistentEditState): HeadwaterProfile {
  const entries = Object.values(editState.current[HEADWATER_ZONE_ID])
  const structures = entries.filter(
    (entry): entry is StructureEntry => entry.kind === 'structure',
  )
  const covers = entries.filter((entry) => entry.kind === 'low-cover')
  const samples = headwaterSamples()
  const madeShade = samples.reduce((sum, sample) => {
    const structureShade = structures.reduce(
      (amount, entry) => Math.min(1, amount + pointInStructureShade(entry, sample)),
      0,
    )
    const coverShade = covers.some(
      (entry) => Math.hypot(entry.at.x - sample.x, entry.at.z - sample.z) <= 0.72,
    ) ? 0.2 : 0
    return sum + Math.min(1, structureShade + coverShade)
  }, 0) / samples.length

  const lowered = entries.filter(
    (entry) => entry.kind === 'terrain-patch' && entry.direction === 'lower',
  ).length
  const raised = entries.filter(
    (entry) => entry.kind === 'terrain-patch' && entry.direction === 'raise',
  ).length
  const network = deriveDrainageNetwork(editState, HEADWATER_ZONE_ID)
  const segmentTotal = Math.max(1, network.segments.length)
  const holdingSegments = network.components
    .filter(({ state }) => state === 'holding')
    .reduce((sum, component) => sum + component.entryIds.length, 0)
  const outflowSegments = network.components
    .filter(({ state }) => state === 'outflow')
    .reduce((sum, component) => sum + component.entryIds.length, 0)
  const holdingShare = holdingSegments / segmentTotal
  const outflowShare = outflowSegments / segmentTotal
  const structureFlow = structures.reduce(
    (total, entry) => {
      const contribution = structureFlowContribution(entry)
      return {
        retention: total.retention + contribution.retention,
        continuity: total.continuity + contribution.continuity,
      }
    },
    { retention: 0, continuity: 0 },
  )

  return {
    shade: rounded(clamp01(NATURAL_HEADWATER_PROFILE.shade + madeShade * 0.66)),
    retention: rounded(clamp01(
      NATURAL_HEADWATER_PROFILE.retention +
      Math.min(3, lowered) * 0.13 +
      holdingShare * 0.32 +
      Math.min(3, covers.length) * 0.055 -
      outflowShare * 0.1 -
      Math.min(3, raised) * 0.14 +
      Math.max(-0.18, Math.min(0.28, structureFlow.retention)),
    )),
    continuity: rounded(clamp01(
      NATURAL_HEADWATER_PROFILE.continuity +
      outflowShare * 0.5 +
      Math.min(2, lowered) * 0.035 -
      holdingShare * 0.16 -
      Math.min(3, raised) * 0.12 +
      Math.max(-0.18, Math.min(0.2, structureFlow.continuity)),
    )),
  }
}

export function createUpstreamWaterwayState(
  editState: PersistentEditState = createEmptyEditState(),
  worldElapsed = 0,
): PersistentUpstreamWaterwayState {
  // 초기 세계에는 이미 자연스러운 물과 잎이 흐른다. 첫 편집 전에는 별도 전달을
  // 만들지 않으며, elapsed는 호출 계약상 유한값으로만 정리해 둔다.
  finiteElapsed(worldElapsed)
  return { sourceSignature: headwaterSourceSignature(editState) }
}

export function advanceUpstreamWaterway(
  state: PersistentUpstreamWaterwayState,
  input: AdvanceUpstreamWaterwayInput,
): PersistentUpstreamWaterwayState {
  const worldElapsed = finiteElapsed(input.worldElapsed)
  const arrived = state.pending && worldElapsed >= state.pending.arrivesAt
    ? {
        sourceSignature: state.sourceSignature,
        sourceChangedAt: state.sourceChangedAt,
        delivered: state.pending,
      } satisfies PersistentUpstreamWaterwayState
    : state
  const sourceSignature = headwaterSourceSignature(input.editState)
  if (sourceSignature === arrived.sourceSignature) {
    return arrived
  }
  const sourceChangedAt = Math.max(
    worldElapsed,
    arrived.sourceChangedAt ?? 0,
  )
  return {
    sourceSignature,
    sourceChangedAt,
    ...(arrived.delivered ? { delivered: arrived.delivered } : {}),
    pending: {
      sourceChangedAt,
      arrivesAt: sourceChangedAt + UPSTREAM_DELIVERY_DELAY_SECONDS,
      profile: deriveHeadwaterProfile(input.editState),
    },
  }
}

export function upstreamDeliveryProgress(
  state: PersistentUpstreamWaterwayState,
  worldElapsed: number,
): number {
  const delivery = state.pending
  if (!delivery) return state.delivered ? 1 : 0
  return clamp01(
    (finiteElapsed(worldElapsed) - delivery.sourceChangedAt) /
      Math.max(0.000001, delivery.arrivesAt - delivery.sourceChangedAt),
  )
}

export function hasUpstreamDeliveryArrived(
  state: PersistentUpstreamWaterwayState,
  worldElapsed: number,
): boolean {
  return state.delivered !== undefined ||
    (state.pending !== undefined && finiteElapsed(worldElapsed) >= state.pending.arrivesAt)
}

/** B에 현재 도착해 있는 모습이며 첫 변화 전에는 본래 발원지 모습을 돌려준다. */
export function headwaterProfileAtB(
  state: PersistentUpstreamWaterwayState,
): HeadwaterProfile {
  return state.delivered?.profile ?? NATURAL_HEADWATER_PROFILE
}

export function pendingUpstreamDelivery(
  state: PersistentUpstreamWaterwayState,
): UpstreamDelivery | undefined {
  return state.pending
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasExactKeys(value: Record<string, unknown>, expected: readonly string[]): boolean {
  const actual = Object.keys(value).sort()
  const keys = [...expected].sort()
  return actual.length === keys.length && actual.every((key, index) => key === keys[index])
}

function isUnitNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1
}

function readProfile(value: unknown): HeadwaterProfile | undefined {
  if (
    !isRecord(value) ||
    !hasExactKeys(value, ['shade', 'retention', 'continuity']) ||
    !isUnitNumber(value.shade) ||
    !isUnitNumber(value.retention) ||
    !isUnitNumber(value.continuity)
  ) {
    return undefined
  }
  return {
    shade: value.shade,
    retention: value.retention,
    continuity: value.continuity,
  }
}

function readDelivery(value: unknown): UpstreamDelivery | undefined {
  if (
    !isRecord(value) ||
    !hasExactKeys(value, ['sourceChangedAt', 'arrivesAt', 'profile']) ||
    typeof value.sourceChangedAt !== 'number' ||
    !Number.isFinite(value.sourceChangedAt) ||
    value.sourceChangedAt < 0 ||
    typeof value.arrivesAt !== 'number' ||
    !Number.isFinite(value.arrivesAt) ||
    value.arrivesAt < value.sourceChangedAt
  ) {
    return undefined
  }
  const profile = readProfile(value.profile)
  return profile
    ? { sourceChangedAt: value.sourceChangedAt, arrivesAt: value.arrivesAt, profile }
    : undefined
}

/** V6 저장용 엄격 판독기다. 선택 입력을 주면 편집 모습·세계 시간과도 대조한다. */
export function readPersistentUpstreamWaterwayState(
  value: unknown,
  editState?: PersistentEditState,
  worldElapsed?: number,
): PersistentUpstreamWaterwayState | undefined {
  if (!isRecord(value) || typeof value.sourceSignature !== 'string') {
    return undefined
  }
  const hasDelivered = Object.hasOwn(value, 'delivered')
  const hasPending = Object.hasOwn(value, 'pending')
  const baseline = !Object.hasOwn(value, 'sourceChangedAt') &&
    !hasDelivered &&
    !hasPending
  if (baseline) {
    if (!hasExactKeys(value, ['sourceSignature'])) return undefined
    if (editState && value.sourceSignature !== headwaterSourceSignature(editState)) {
      return undefined
    }
    return { sourceSignature: value.sourceSignature }
  }
  const expectedKeys = ['sourceSignature', 'sourceChangedAt']
  if (hasDelivered) expectedKeys.push('delivered')
  if (hasPending) expectedKeys.push('pending')
  if (
    (!hasDelivered && !hasPending) ||
    !hasExactKeys(value, expectedKeys) ||
    typeof value.sourceChangedAt !== 'number' ||
    !Number.isFinite(value.sourceChangedAt) ||
    value.sourceChangedAt < 0
  ) {
    return undefined
  }
  const delivered = hasDelivered ? readDelivery(value.delivered) : undefined
  const pending = hasPending ? readDelivery(value.pending) : undefined
  if ((hasDelivered && !delivered) || (hasPending && !pending)) return undefined
  const latest = pending ?? delivered
  if (!latest || latest.sourceChangedAt !== value.sourceChangedAt) return undefined
  if (delivered && pending && delivered.arrivesAt > pending.sourceChangedAt) {
    return undefined
  }
  if (editState && value.sourceSignature !== headwaterSourceSignature(editState)) {
    return undefined
  }
  if (
    worldElapsed !== undefined &&
    (
      !Number.isFinite(worldElapsed) ||
      worldElapsed < value.sourceChangedAt ||
      (delivered !== undefined && delivered.arrivesAt > worldElapsed)
    )
  ) {
    return undefined
  }
  return {
    sourceSignature: value.sourceSignature,
    sourceChangedAt: value.sourceChangedAt,
    ...(delivered ? { delivered } : {}),
    ...(pending ? { pending } : {}),
  }
}

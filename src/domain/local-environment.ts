import { type EditEntry, type EditSnapshot, type PersistentEditState } from './edit-model.ts'
import {
  EDIT_ZONES,
  isInsideEditZone,
  type EditZone,
  type EditZoneId,
  type Point2,
} from '../content/first-map.ts'

export type LightState = 'bright' | 'dappled' | 'shaded'
export type OpeningState = 'open' | 'pockets' | 'sheltered'
export type SurfaceMoistureState = 'dry' | 'moist'
export type LocalCoverPattern = 'open-ground' | 'patches' | 'linked' | 'dense'
export type ManagedCoverState = 'open-edge' | 'patches' | 'joined' | 'dense'

export type AirLane = Readonly<{
  from: Point2
  to: Point2
}>

export type ZoneEnvironmentReading = Readonly<{
  zoneId: EditZoneId
  light: LightState
  opening: OpeningState
  surfaceMoisture: SurfaceMoistureState
  lowCover: LocalCoverPattern
  airLane?: AirLane
}>

export type ProtectedFoundation = Readonly<{
  shallowSlowWaterEdge: true
  cRefuge: true
  naturalBCLink: 'connected'
}>

export type ConnectedCover = Readonly<{
  id: string
  at: Point2
}>

export type LocalEnvironmentSnapshot = Readonly<{
  editRevision: number
  zones: Readonly<Record<EditZoneId, ZoneEnvironmentReading>>
  bToC: Readonly<{
    protectedFoundation: ProtectedFoundation
    managedCover: ManagedCoverState
    connectedCover: readonly ConnectedCover[]
  }>
}>

export type MoistureSource = 'drying-exposed' | 'recent-rain' | 'water-edge'

export type AmbientSurfaceConditions = Readonly<
  Record<EditZoneId, Readonly<{ moistureSource: MoistureSource }>>
>

/** `surface-moisture`가 시간에 따라 계산한 현재 표면 습기다. */
export type SurfaceMoistureByZone = Readonly<Record<EditZoneId, SurfaceMoistureState>>

type RelativeLane = Readonly<{
  from: Point2
  to: Point2
}>

type SiteLayout = Readonly<{
  baselineLight: LightState
  sampleOffsets: readonly Point2[]
  lanes: readonly RelativeLane[]
}>

export type LocalEnvironmentTuning = Readonly<{
  lightInfluence: Readonly<Record<'low-flower' | 'low-cover', number>>
  laneClearance: Readonly<Record<'low-flower' | 'low-cover', number>>
  dappledSampleShare: number
  shadedSampleShare: number
  openLaneShare: number
  coverSampleRadius: number
  denseCoverSampleShare: number
  localCoverStep: number
  managedCoverStep: number
}>

// 아래 좌표와 임계값은 첫 제품 슬라이스의 플레이테스트용 제작값이다.
export const FIRST_MAP_LOCAL_ENVIRONMENT_TUNING: LocalEnvironmentTuning = {
  lightInfluence: { 'low-flower': 0.3, 'low-cover': 0.7 },
  laneClearance: { 'low-flower': 0.2, 'low-cover': 0.42 },
  dappledSampleShare: 0.18,
  shadedSampleShare: 0.56,
  openLaneShare: 0.5,
  coverSampleRadius: 0.68,
  denseCoverSampleShare: 0.7,
  localCoverStep: 1.35,
  managedCoverStep: 1.3,
}

export const FIRST_MAP_AMBIENT_SURFACE: AmbientSurfaceConditions = {
  'a-garden': { moistureSource: 'drying-exposed' },
  'b-bright-soil': { moistureSource: 'drying-exposed' },
  'b-moist-soil': { moistureSource: 'water-edge' },
}

export const FIRST_MAP_PROTECTED_FOUNDATION: ProtectedFoundation = Object.freeze({
  shallowSlowWaterEdge: true,
  cRefuge: true,
  naturalBCLink: 'connected',
})

// 관리된 B 흙자리 바깥에서 C의 피난처로 이어지는 보호 덮임이다.
// 플레이어 편집, 되돌리기와 환경 점수의 대상이 아니다.
export const B_C_PROTECTED_COVER_PATH: readonly Point2[] = [
  { x: -3.55, z: -4.15 },
  { x: -3.05, z: -4.95 },
  { x: -2.62, z: -5.82 },
  { x: -2.08, z: -6.7 },
]

const grid3By3 = (spreadX: number, spreadZ: number): readonly Point2[] =>
  [-1, 0, 1].flatMap((z) =>
    [-1, 0, 1].map((x) => ({ x: x * spreadX, z: z * spreadZ })),
  )

const SITE_LAYOUTS: Readonly<Record<EditZoneId, SiteLayout>> = {
  'a-garden': {
    baselineLight: 'bright',
    sampleOffsets: grid3By3(1.05, 0.7),
    lanes: [
      { from: { x: -1.45, z: -0.72 }, to: { x: 1.45, z: -0.72 } },
      { from: { x: -1.45, z: 0 }, to: { x: 1.45, z: 0 } },
      { from: { x: -1.45, z: 0.72 }, to: { x: 1.45, z: 0.72 } },
      { from: { x: -0.9, z: -0.95 }, to: { x: -0.9, z: 0.95 } },
      { from: { x: 0.9, z: -0.95 }, to: { x: 0.9, z: 0.95 } },
    ],
  },
  'b-bright-soil': {
    baselineLight: 'bright',
    sampleOffsets: grid3By3(0.62, 0.48),
    lanes: [
      { from: { x: -0.78, z: -0.48 }, to: { x: 0.78, z: -0.48 } },
      { from: { x: -0.78, z: 0.48 }, to: { x: 0.78, z: 0.48 } },
      { from: { x: -0.62, z: -0.62 }, to: { x: 0.62, z: 0.62 } },
      { from: { x: -0.62, z: 0.62 }, to: { x: 0.62, z: -0.62 } },
    ],
  },
  'b-moist-soil': {
    baselineLight: 'dappled',
    sampleOffsets: grid3By3(0.62, 0.48),
    lanes: [
      { from: { x: -0.78, z: -0.48 }, to: { x: 0.78, z: -0.48 } },
      { from: { x: -0.78, z: 0.48 }, to: { x: 0.78, z: 0.48 } },
      { from: { x: -0.62, z: -0.62 }, to: { x: 0.62, z: 0.62 } },
      { from: { x: -0.62, z: 0.62 }, to: { x: 0.62, z: -0.62 } },
    ],
  },
}

function add(origin: Point2, offset: Point2): Point2 {
  return { x: origin.x + offset.x, z: origin.z + offset.z }
}

function distanceSquared(left: Point2, right: Point2): number {
  return (left.x - right.x) ** 2 + (left.z - right.z) ** 2
}

function distanceToSegment(point: Point2, from: Point2, to: Point2): number {
  const deltaX = to.x - from.x
  const deltaZ = to.z - from.z
  const lengthSquared = deltaX * deltaX + deltaZ * deltaZ
  if (lengthSquared === 0) {
    return Math.sqrt(distanceSquared(point, from))
  }
  const amount = Math.max(
    0,
    Math.min(
      1,
      ((point.x - from.x) * deltaX + (point.z - from.z) * deltaZ) / lengthSquared,
    ),
  )
  return Math.hypot(
    point.x - (from.x + amount * deltaX),
    point.z - (from.z + amount * deltaZ),
  )
}

function vegetation(entries: readonly EditEntry[]): readonly EditEntry[] {
  return entries.filter(
    (entry) => entry.kind === 'low-flower' || entry.kind === 'low-cover',
  )
}

function worldSamples(zone: EditZone, layout: SiteLayout): readonly Point2[] {
  return layout.sampleOffsets
    .map((offset) => add(zone.focus, offset))
    .filter((point) => isInsideEditZone(point, zone, 0.05))
}

function worldLanes(zone: EditZone, layout: SiteLayout): readonly AirLane[] {
  return layout.lanes
    .map((lane) => ({ from: add(zone.focus, lane.from), to: add(zone.focus, lane.to) }))
    .filter(
      (lane) =>
        isInsideEditZone(lane.from, zone, 0.02) &&
        isInsideEditZone(lane.to, zone, 0.02),
    )
}

function classifyLight(
  samples: readonly Point2[],
  entries: readonly EditEntry[],
  baseline: LightState,
  tuning: LocalEnvironmentTuning,
): LightState {
  const influenced = samples.filter((sample) =>
    entries.some((entry) => {
      if (entry.kind === 'surface-adjustment') {
        return false
      }
      const radius = tuning.lightInfluence[entry.kind]
      return distanceSquared(sample, entry.at) <= radius ** 2
    }),
  ).length
  const share = samples.length === 0 ? 0 : influenced / samples.length
  if (share >= tuning.shadedSampleShare) {
    return 'shaded'
  }
  if (share >= tuning.dappledSampleShare) {
    return baseline === 'bright' ? 'dappled' : 'shaded'
  }
  return baseline
}

function classifyOpening(
  lanes: readonly AirLane[],
  entries: readonly EditEntry[],
  tuning: LocalEnvironmentTuning,
): Readonly<{ state: OpeningState; airLane?: AirLane }> {
  const clear = lanes.filter((lane) =>
    entries.every((entry) => {
      if (entry.kind === 'surface-adjustment') {
        return true
      }
      return distanceToSegment(entry.at, lane.from, lane.to) > tuning.laneClearance[entry.kind]
    }),
  )
  if (clear.length === 0) {
    return { state: 'sheltered' }
  }
  return {
    state: clear.length / Math.max(1, lanes.length) >= tuning.openLaneShare ? 'open' : 'pockets',
    airLane: clear[0],
  }
}

function largestCoverComponent(covers: readonly EditEntry[], maximumStep: number): number {
  let largest = 0
  const visited = new Set<string>()
  for (const start of covers) {
    if (visited.has(start.id)) {
      continue
    }
    const pending = [start]
    visited.add(start.id)
    let size = 0
    while (pending.length > 0) {
      const current = pending.pop()
      if (!current) {
        continue
      }
      size += 1
      for (const candidate of covers) {
        if (
          !visited.has(candidate.id) &&
          distanceSquared(current.at, candidate.at) <= maximumStep ** 2
        ) {
          visited.add(candidate.id)
          pending.push(candidate)
        }
      }
    }
    largest = Math.max(largest, size)
  }
  return largest
}

function coverSampleShare(
  samples: readonly Point2[],
  covers: readonly EditEntry[],
  radius: number,
): number {
  if (samples.length === 0) {
    return 0
  }
  return (
    samples.filter((sample) =>
      covers.some((cover) => distanceSquared(sample, cover.at) <= radius ** 2),
    ).length / samples.length
  )
}

function classifyLocalCover(
  samples: readonly Point2[],
  covers: readonly EditEntry[],
  tuning: LocalEnvironmentTuning,
): LocalCoverPattern {
  if (covers.length === 0) {
    return 'open-ground'
  }
  if (
    coverSampleShare(samples, covers, tuning.coverSampleRadius) >=
    tuning.denseCoverSampleShare
  ) {
    return 'dense'
  }
  return largestCoverComponent(covers, tuning.localCoverStep) >= 2 ? 'linked' : 'patches'
}

function evaluateZone(
  snapshot: EditSnapshot,
  zoneId: EditZoneId,
  ambient: AmbientSurfaceConditions,
  tuning: LocalEnvironmentTuning,
  moisture?: SurfaceMoistureByZone,
): ZoneEnvironmentReading {
  const zone = EDIT_ZONES.find(({ id }) => id === zoneId)
  if (!zone) {
    throw new Error(zoneId + ' 국소 환경 자리를 찾지 못했습니다.')
  }
  const layout = SITE_LAYOUTS[zoneId]
  const entries = vegetation(Object.values(snapshot[zoneId]))
  const covers = entries.filter((entry) => entry.kind === 'low-cover')
  const samples = worldSamples(zone, layout)
  const opening = classifyOpening(worldLanes(zone, layout), entries, tuning)
  return {
    zoneId,
    light: classifyLight(samples, entries, layout.baselineLight, tuning),
    opening: opening.state,
    // 물을 준 뒤 마르는 상태는 `surface-moisture`가 시간에 따라 관리한다.
    // 그 값을 주지 않으면 자리의 기본 조건만으로 읽는다.
    surfaceMoisture:
      moisture?.[zoneId] ??
      (ambient[zoneId].moistureSource === 'drying-exposed' ? 'dry' : 'moist'),
    lowCover: classifyLocalCover(samples, covers, tuning),
    ...(opening.airLane ? { airLane: opening.airLane } : {}),
  }
}

function connectedManagedCover(
  covers: readonly EditEntry[],
  tuning: LocalEnvironmentTuning,
): readonly EditEntry[] {
  const naturalStart = B_C_PROTECTED_COVER_PATH[0]
  if (!naturalStart) {
    return []
  }
  const connected = new Map<string, EditEntry>()
  const pending = covers.filter(
    (cover) => distanceSquared(cover.at, naturalStart) <= tuning.managedCoverStep ** 2,
  )
  pending.forEach((cover) => connected.set(cover.id, cover))
  while (pending.length > 0) {
    const current = pending.shift()
    if (!current) {
      continue
    }
    for (const candidate of covers) {
      if (
        !connected.has(candidate.id) &&
        distanceSquared(current.at, candidate.at) <= tuning.managedCoverStep ** 2
      ) {
        connected.set(candidate.id, candidate)
        pending.push(candidate)
      }
    }
  }
  return [...connected.values()].sort((left, right) => {
    const difference =
      distanceSquared(left.at, naturalStart) - distanceSquared(right.at, naturalStart)
    return difference === 0 ? left.id.localeCompare(right.id) : difference
  })
}

function evaluateManagedCover(
  snapshot: EditSnapshot,
  moistReading: ZoneEnvironmentReading,
  tuning: LocalEnvironmentTuning,
): LocalEnvironmentSnapshot['bToC'] {
  const covers = Object.values(snapshot['b-moist-soil']).filter(
    (entry) => entry.kind === 'low-cover',
  )
  const connected = connectedManagedCover(covers, tuning)
  const managedCover: ManagedCoverState =
    covers.length === 0
      ? 'open-edge'
      : moistReading.lowCover === 'dense'
        ? 'dense'
        : connected.length > 0
          ? 'joined'
          : 'patches'
  return {
    protectedFoundation: FIRST_MAP_PROTECTED_FOUNDATION,
    managedCover,
    connectedCover: connected.map((entry) => ({
      id: entry.id,
      at: { x: entry.at.x, z: entry.at.z },
    })),
  }
}

export function evaluateLocalEnvironment(
  editState: PersistentEditState,
  ambient: AmbientSurfaceConditions = FIRST_MAP_AMBIENT_SURFACE,
  tuning: LocalEnvironmentTuning = FIRST_MAP_LOCAL_ENVIRONMENT_TUNING,
  moisture?: SurfaceMoistureByZone,
): LocalEnvironmentSnapshot {
  const snapshot = editState.current
  const zones: Record<EditZoneId, ZoneEnvironmentReading> = {
    'a-garden': evaluateZone(snapshot, 'a-garden', ambient, tuning, moisture),
    'b-bright-soil': evaluateZone(snapshot, 'b-bright-soil', ambient, tuning, moisture),
    'b-moist-soil': evaluateZone(snapshot, 'b-moist-soil', ambient, tuning, moisture),
  }
  return {
    editRevision: editState.revision,
    zones,
    bToC: evaluateManagedCover(snapshot, zones['b-moist-soil'], tuning),
  }
}

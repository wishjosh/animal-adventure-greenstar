import {
  B_C_PROTECTED_COVER_PATH,
  CARE_ZONE_IDS,
  EDIT_ZONES,
  ROUTES,
  UPSTREAM_SPUR,
  WATER_CHANNEL,
  WATER_COURSE,
  distanceToPolygon,
  distanceToPolyline,
  distanceToSegment,
  isInsideEditZone,
  terrainHeight,
  type CareZoneId,
  type EditZoneId,
  type Point2,
} from '../content/first-map.ts'

export type TerrainPatchDirection = 'raise' | 'lower'
export type StructureForm = 'support' | 'rack' | 'fence' | 'shade'

export type EditEntryKind =
  | 'low-flower'
  | 'low-cover'
  | 'surface-adjustment'
  | 'terrain-patch'
  | 'drainage-segment'
  | 'structure'

type EditEntryBase = Readonly<{
  id: string
  zoneId: EditZoneId
  at: Point2
  rotation: number
}>

export type TerrainPatchEntry = Readonly<
  EditEntryBase & { kind: 'terrain-patch'; direction: TerrainPatchDirection }
>

export type DrainageSegmentEntry = Readonly<
  EditEntryBase & { kind: 'drainage-segment'; length: number }
>

export type StructureEntry = Readonly<
  EditEntryBase & { kind: 'structure'; form: StructureForm }
>

export type EditEntry =
  | Readonly<EditEntryBase & { kind: 'low-flower'; thinned: boolean }>
  | Readonly<EditEntryBase & { kind: 'low-cover' | 'surface-adjustment' }>
  | TerrainPatchEntry
  | DrainageSegmentEntry
  | StructureEntry

export type ZoneOverlay = Readonly<Record<string, EditEntry>>
export type EditSnapshot = Readonly<Record<EditZoneId, ZoneOverlay>>

// 저장되는 상태에는 현재 모습만 들어간다. 되돌리기 이력은 아래 EditSession에만 머문다.
export type PersistentEditState = Readonly<{
  current: EditSnapshot
  nextId: number
  revision: number
}>

/** V1–V5에는 A와 B의 세 관리 흙만 있었다. 현재 네 구역 상태와 섞어 읽지 않는다. */
export type LegacyEditSnapshot = Readonly<Record<CareZoneId, ZoneOverlay>>
export type LegacyPersistentEditState = Readonly<{
  current: LegacyEditSnapshot
  nextId: number
  revision: number
}>

type EditHistory = Readonly<Record<EditZoneId, readonly ZoneOverlay[]>>

export type EditSession = Readonly<{
  state: PersistentEditState
  history: EditHistory
}>

export type EditCommand =
  | Readonly<{
      type: 'place'
      zoneId: EditZoneId
      kind: 'low-flower' | 'low-cover'
      at: Point2
      rotation?: number
    }>
  | Readonly<{
      type: 'adjust-ground'
      zoneId: EditZoneId
      at: Point2
      rotation?: number
    }>
  | Readonly<{
      type: 'shape-ground'
      zoneId: EditZoneId
      direction: TerrainPatchDirection
      at: Point2
      rotation?: number
    }>
  | Readonly<{
      type: 'place-drainage'
      zoneId: EditZoneId
      from: Point2
      to: Point2
    }>
  | Readonly<{
      type: 'place-structure'
      zoneId: EditZoneId
      form: StructureForm
      at: Point2
      rotation?: number
    }>
  | Readonly<{
      type: 'move'
      zoneId: EditZoneId
      id: string
      to: Point2
      rotation?: number
    }>
  | Readonly<{ type: 'rotate'; zoneId: EditZoneId; id: string; rotation: number }>
  | Readonly<{ type: 'thin'; zoneId: EditZoneId; id: string }>
  | Readonly<{ type: 'retrieve'; zoneId: EditZoneId; id: string }>
  | Readonly<{ type: 'restore-ground'; zoneId: EditZoneId; id: string }>
  | Readonly<{ type: 'restore-terrain'; zoneId: EditZoneId; id: string }>
  | Readonly<{ type: 'restore-drainage'; zoneId: EditZoneId; id: string }>
  | Readonly<{ type: 'undo'; zoneId: EditZoneId }>

export type ProtectedGroundRegion = Readonly<{
  at: Point2
  radius: number
}>

export type EditGuard = Readonly<{
  occupiedEntryIds?: readonly string[]
  /** 이 지점을 이용 중인 주민이나 구조물이 있으면 그 아래 지형을 바꾸지 않는다. */
  protectedGroundPoints?: readonly (Point2 | ProtectedGroundRegion)[]
}>

export type EditRejection =
  | 'unknown-edit-zone'
  | 'outside-edit-zone'
  | 'occupied'
  | 'unknown-entry'
  | 'kind-not-allowed'
  | 'already-thinned'
  | 'protected-ground'
  | 'terrain-patch-limit'
  | 'drainage-zone-only'
  | 'drainage-length'
  | 'drainage-limit'
  | 'structure-limit'
  | 'ground-too-steep'
  | 'overlap'
  | 'nothing-to-undo'

export type EditResult = Readonly<{
  session: EditSession
  changed: boolean
  entryId?: string
  rejection?: EditRejection
}>

export const EDIT_ZONE_IDS: readonly EditZoneId[] = [
  ...CARE_ZONE_IDS,
  'd-headwater-edge',
]

export const MAX_UNDO_PER_ZONE = 24

/** 한 번의 조형이 영향을 주는 반경과 중심 높이 변화다. */
export const TERRAIN_PATCH_RADIUS = 0.68
export const TERRAIN_PATCH_HEIGHT_STEP = 0.24
/** 여러 패치를 겹쳐도 걷기 어려운 급경사나 깊은 구덩이가 되지 않게 한다. */
export const MAX_TERRAIN_DELTA = 0.48
export const MAX_TERRAIN_PATCHES_PER_ZONE = 12
export const MIN_TERRAIN_PATCH_CENTER_DISTANCE = 0.46
export const DRAINAGE_SEGMENT_MIN_LENGTH = 0.65
export const DRAINAGE_SEGMENT_MAX_LENGTH = 1.6
export const DRAINAGE_SEGMENT_HALF_WIDTH = 0.16
export const DRAINAGE_SEGMENT_DEPTH = 0.12
export const DRAINAGE_CONNECTION_REACH = 0.18
export const MAX_DRAINAGE_SEGMENTS_PER_ZONE = 8
export const MAX_STRUCTURES_PER_ZONE = 8
/** 북돋운 흙 한 덩이가 새로 관리 가능한 땅으로 이어지는 반경이다. */
export const MANAGED_SOIL_PATCH_RADIUS = 0.72
/** 새 흙은 기존 흙이나 먼저 북돋운 흙과 실제로 맞닿아야 한다. */
export const MANAGED_SOIL_LINK_REACH = 1.02

export type StructureFootprint = Readonly<{
  halfLength: number
  halfWidth: number
  maximumSlope: number
}>

export const STRUCTURE_FOOTPRINTS: Readonly<Record<StructureForm, StructureFootprint>> = {
  support: { halfLength: 0.22, halfWidth: 0.22, maximumSlope: 0.65 },
  rack: { halfLength: 0.38, halfWidth: 0.26, maximumSlope: 0.45 },
  fence: { halfLength: 0.52, halfWidth: 0.14, maximumSlope: 0.55 },
  shade: { halfLength: 0.48, halfWidth: 0.38, maximumSlope: 0.35 },
}

const FOOTPRINT_RADIUS: Readonly<Record<EditEntryKind, number>> = {
  'low-flower': 0.42,
  'low-cover': 0.58,
  'surface-adjustment': 0.68,
  'terrain-patch': TERRAIN_PATCH_RADIUS,
  'drainage-segment': DRAINAGE_SEGMENT_HALF_WIDTH,
  structure: Math.hypot(
    STRUCTURE_FOOTPRINTS.shade.halfLength,
    STRUCTURE_FOOTPRINTS.shade.halfWidth,
  ),
}

export function editEntryFootprintRadius(entry: EditEntry): number {
  if (entry.kind === 'structure') {
    const footprint = STRUCTURE_FOOTPRINTS[entry.form]
    return Math.hypot(footprint.halfLength, footprint.halfWidth)
  }
  if (entry.kind === 'drainage-segment') {
    return Math.hypot(entry.length / 2, DRAINAGE_SEGMENT_HALF_WIDTH)
  }
  return FOOTPRINT_RADIUS[entry.kind]
}

function surfaceAdjustments(
  source: TerrainStateSource,
  zoneId: EditZoneId,
  ignoreId?: string,
): readonly EditEntry[] {
  return Object.values(editSnapshotOf(source)[zoneId]).filter(
    (entry) => entry.kind === 'surface-adjustment' && entry.id !== ignoreId,
  )
}

/**
 * 원래 관리 흙과 이어 붙인 북돋운 흙을 하나의 식재 영역으로 읽는다.
 * 바깥 패치에서는 식물 중심뿐 아니라 보이는 잎도 흙 위에 머물도록 작은 여백을 둔다.
 */
export function isInsideManagedSoil(
  source: TerrainStateSource,
  zoneId: EditZoneId,
  point: Point2,
  footprintRadius = 0,
  ignoreAdjustmentId?: string,
): boolean {
  const zone = EDIT_ZONES.find(({ id }) => id === zoneId)
  if (!zone) {
    return false
  }
  if (isInsideEditZone(point, zone, footprintRadius)) {
    return true
  }
  const edgeAllowance = Math.min(0.2, Math.max(0, footprintRadius) * 0.38)
  const usableRadius = MANAGED_SOIL_PATCH_RADIUS - edgeAllowance
  return surfaceAdjustments(source, zoneId, ignoreAdjustmentId).some(
    (entry) => Math.hypot(entry.at.x - point.x, entry.at.z - point.z) <= usableRadius,
  )
}

/** 이어 붙인 흙 곁에서도 같은 관리 구역으로 다시 들어갈 수 있다. */
export function getNearbyManagedEditZone(
  source: TerrainStateSource,
  point: Point2,
  reach = 1.25,
): (typeof EDIT_ZONES)[number] | undefined {
  const safeReach = Number.isFinite(reach) ? Math.max(0, reach) : 0
  return EDIT_ZONES.map((zone) => {
    const baseDistance = distanceToPolygon(point, zone.outline)
    const extensionDistance = surfaceAdjustments(source, zone.id).reduce(
      (nearest, entry) => Math.min(
        nearest,
        Math.max(
          0,
          Math.hypot(entry.at.x - point.x, entry.at.z - point.z) -
            MANAGED_SOIL_PATCH_RADIUS,
        ),
      ),
      Number.POSITIVE_INFINITY,
    )
    return { zone, distance: Math.min(baseDistance, extensionDistance) }
  })
    .filter(({ distance }) => distance <= safeReach)
    .sort((left, right) =>
      left.distance === right.distance
        ? left.zone.id.localeCompare(right.zone.id)
        : left.distance - right.distance,
    )[0]?.zone
}

function canLinkManagedSoilPatch(
  source: TerrainStateSource,
  zoneId: EditZoneId,
  point: Point2,
  ignoreId?: string,
): boolean {
  const zone = EDIT_ZONES.find(({ id }) => id === zoneId)
  if (!zone) {
    return false
  }
  if (
    isInsideEditZone(point, zone) ||
    distanceToPolygon(point, zone.outline) <= MANAGED_SOIL_PATCH_RADIUS * 0.72
  ) {
    return true
  }
  return surfaceAdjustments(source, zoneId, ignoreId).some(
    (entry) => Math.hypot(entry.at.x - point.x, entry.at.z - point.z) <=
      MANAGED_SOIL_LINK_REACH,
  )
}

export type DrainageSegmentEndpoints = Readonly<{
  from: Point2
  to: Point2
}>

export function drainageSegmentEndpoints(
  entry: DrainageSegmentEntry,
): DrainageSegmentEndpoints {
  const halfLength = entry.length / 2
  const offsetX = Math.cos(entry.rotation) * halfLength
  const offsetZ = Math.sin(entry.rotation) * halfLength
  return {
    from: { x: entry.at.x - offsetX, z: entry.at.z - offsetZ },
    to: { x: entry.at.x + offsetX, z: entry.at.z + offsetZ },
  }
}

function drainageEntryFromPoints(
  id: string,
  zoneId: EditZoneId,
  from: Point2,
  to: Point2,
): DrainageSegmentEntry {
  const rawLength = Math.hypot(to.x - from.x, to.z - from.z)
  const length = Math.abs(rawLength - DRAINAGE_SEGMENT_MIN_LENGTH) < 1e-9
    ? DRAINAGE_SEGMENT_MIN_LENGTH
    : Math.abs(rawLength - DRAINAGE_SEGMENT_MAX_LENGTH) < 1e-9
      ? DRAINAGE_SEGMENT_MAX_LENGTH
      : rawLength
  return {
    id,
    zoneId,
    kind: 'drainage-segment',
    at: { x: (from.x + to.x) / 2, z: (from.z + to.z) / 2 },
    rotation: Math.atan2(to.z - from.z, to.x - from.x),
    length,
  }
}

function structureRadius(form: StructureForm): number {
  const footprint = STRUCTURE_FOOTPRINTS[form]
  return Math.hypot(footprint.halfLength, footprint.halfWidth)
}

function finitePoint(point: Point2): boolean {
  return Number.isFinite(point.x) && Number.isFinite(point.z)
}

function sampleSegment(
  from: Point2,
  to: Point2,
  maximumStep = 0.1,
): readonly Point2[] {
  const length = Math.hypot(to.x - from.x, to.z - from.z)
  const steps = Math.max(1, Math.ceil(length / maximumStep))
  return Array.from({ length: steps + 1 }, (_, index) => {
    const amount = index / steps
    return {
      x: from.x + (to.x - from.x) * amount,
      z: from.z + (to.z - from.z) * amount,
    }
  })
}

function minimumSegmentDistance(
  leftFrom: Point2,
  leftTo: Point2,
  rightFrom: Point2,
  rightTo: Point2,
): number {
  return Math.min(
    ...sampleSegment(leftFrom, leftTo, 0.08).map((point) =>
      distanceToSegment(point, rightFrom, rightTo),
    ),
    ...sampleSegment(rightFrom, rightTo, 0.08).map((point) =>
      distanceToSegment(point, leftFrom, leftTo),
    ),
  )
}

export type TerrainStateSource = EditSnapshot | PersistentEditState

function editSnapshotOf(source: TerrainStateSource): EditSnapshot {
  return 'current' in source ? source.current : source
}

function terrainPatchWeight(distance: number): number {
  if (!Number.isFinite(distance) || distance >= TERRAIN_PATCH_RADIUS - 0.000000000001) {
    return 0
  }
  const amount = Math.max(0, Math.min(1, 1 - distance / TERRAIN_PATCH_RADIUS))
  return amount * amount * (3 - 2 * amount)
}

function terrainPatchDelta(entry: EditEntry, point: Point2): number {
  if (entry.kind !== 'terrain-patch') {
    return 0
  }
  const distance = Math.hypot(entry.at.x - point.x, entry.at.z - point.z)
  const sign = entry.direction === 'raise' ? 1 : -1
  return sign * TERRAIN_PATCH_HEIGHT_STEP * terrainPatchWeight(distance)
}

/** 원래 지형에 더할 플레이어 조형 높이다. 반경 밖에서는 정확히 0이다. */
export function terrainDeltaAt(source: TerrainStateSource, point: Point2): number {
  const snapshot = editSnapshotOf(source)
  const total = EDIT_ZONE_IDS.reduce(
    (sum, zoneId) =>
      sum + Object.values(snapshot[zoneId]).reduce(
        (zoneSum, entry) => zoneSum + terrainPatchDelta(entry, point),
        0,
      ),
    0,
  )
  return Math.max(-MAX_TERRAIN_DELTA, Math.min(MAX_TERRAIN_DELTA, total))
}

/** 연결점에서 홈 깊이가 중복되지 않도록 가장 깊은 한 조각만 반영한다. */
export function drainageDepthAt(source: TerrainStateSource, point: Point2): number {
  const snapshot = editSnapshotOf(source)
  let greatestDepth = 0
  for (const zoneId of EDIT_ZONE_IDS) {
    for (const entry of Object.values(snapshot[zoneId])) {
      if (entry.kind !== 'drainage-segment') {
        continue
      }
      const endpoints = drainageSegmentEndpoints(entry)
      const distance = distanceToSegment(point, endpoints.from, endpoints.to)
      const amount = Math.max(0, Math.min(1, 1 - distance / DRAINAGE_SEGMENT_HALF_WIDTH))
      const weight = amount * amount * (3 - 2 * amount)
      greatestDepth = Math.max(greatestDepth, DRAINAGE_SEGMENT_DEPTH * weight)
    }
  }
  return greatestDepth
}

/** 첫 지도의 원래 높이와 저장된 조형 패치를 합친 실제 지표 높이다. */
export function editedTerrainHeight(
  source: TerrainStateSource,
  x: number,
  z: number,
): number {
  const point = { x, z }
  return terrainHeight(x, z) + terrainDeltaAt(source, point) - drainageDepthAt(source, point)
}

/** 눌러 잡을 수 있는 조형 패치 가운데 중심이 가장 가까운 것을 고른다. */
export function findTerrainPatchAt(
  source: TerrainStateSource,
  zoneId: EditZoneId,
  point: Point2,
): TerrainPatchEntry | undefined {
  return Object.values(editSnapshotOf(source)[zoneId])
    .filter((entry): entry is TerrainPatchEntry => entry.kind === 'terrain-patch')
    .map((entry) => ({
      entry,
      distance: Math.hypot(entry.at.x - point.x, entry.at.z - point.z),
    }))
    .filter(({ distance }) => distance < TERRAIN_PATCH_RADIUS)
    .sort((left, right) =>
      left.distance === right.distance
        ? left.entry.id.localeCompare(right.entry.id)
        : left.distance - right.distance,
    )[0]?.entry
}

function isProtectedTerrainCenter(point: Point2): boolean {
  return (
    distanceToPolyline(point, WATER_COURSE) <= TERRAIN_PATCH_RADIUS ||
    distanceToPolyline(point, UPSTREAM_SPUR) <= TERRAIN_PATCH_RADIUS + 0.68 ||
    ROUTES.some(
      (route) =>
        distanceToPolyline(point, route.points) <=
        route.width / 2 + TERRAIN_PATCH_RADIUS,
    )
  )
}

function circleTouchesProtectedWorld(point: Point2, radius: number): boolean {
  return (
    distanceToPolyline(point, WATER_COURSE) <= WATER_CHANNEL.bankHalfWidth + radius ||
    distanceToPolyline(point, UPSTREAM_SPUR) <= 0.68 + radius ||
    ROUTES.some(
      (route) =>
        distanceToPolyline(point, route.points) <= route.width / 2 + radius,
    ) ||
    distanceToPolyline(point, B_C_PROTECTED_COVER_PATH) <= radius + 0.24
  )
}

function protectedRegion(
  protectedGround: Point2 | ProtectedGroundRegion,
): ProtectedGroundRegion {
  if ('at' in protectedGround) {
    return {
      at: protectedGround.at,
      radius: Number.isFinite(protectedGround.radius)
        ? Math.max(0, protectedGround.radius)
        : 0,
    }
  }
  return { at: protectedGround, radius: 0 }
}

function entryTouchesProtectedGround(entry: EditEntry, guard: EditGuard): boolean {
  return guard.protectedGroundPoints?.some((protectedGround) => {
    const region = protectedRegion(protectedGround)
    if (entry.kind === 'drainage-segment') {
      const endpoints = drainageSegmentEndpoints(entry)
      return distanceToSegment(region.at, endpoints.from, endpoints.to) <
        DRAINAGE_SEGMENT_HALF_WIDTH + region.radius
    }
    return Math.hypot(entry.at.x - region.at.x, entry.at.z - region.at.z) <
      editEntryFootprintRadius(entry) + region.radius
  }) ?? false
}

function entryCount(
  session: EditSession,
  zoneId: EditZoneId,
  kind: EditEntryKind,
  ignoreId?: string,
): number {
  return Object.values(session.state.current[zoneId]).filter(
    (entry) => entry.kind === kind && entry.id !== ignoreId,
  ).length
}

function capsuleTouchesProtectedWorld(
  from: Point2,
  to: Point2,
  radius: number,
): boolean {
  return sampleSegment(from, to).some(
    (point) =>
      distanceToPolyline(point, WATER_COURSE) <= WATER_CHANNEL.bankHalfWidth + radius ||
      distanceToPolyline(point, UPSTREAM_SPUR) <= 0.68 + radius ||
      ROUTES.some(
        (route) =>
          distanceToPolyline(point, route.points) <= route.width / 2 + radius,
      ) ||
      distanceToPolyline(point, B_C_PROTECTED_COVER_PATH) <= radius + 0.24,
  )
}

function structureTouchesProtectedWorld(entry: StructureEntry): boolean {
  const radius = structureRadius(entry.form)
  return (
    distanceToPolyline(entry.at, WATER_COURSE) <= WATER_CHANNEL.bankHalfWidth + radius ||
    distanceToPolyline(entry.at, UPSTREAM_SPUR) <= 0.68 + radius ||
    ROUTES.some(
      (route) =>
        distanceToPolyline(entry.at, route.points) <= route.width / 2 + radius,
    ) ||
    distanceToPolyline(entry.at, B_C_PROTECTED_COVER_PATH) <= radius + 0.24
  )
}

function structureSlope(
  session: EditSession,
  entry: StructureEntry,
): number {
  const footprint = STRUCTURE_FOOTPRINTS[entry.form]
  const cosine = Math.cos(entry.rotation)
  const sine = Math.sin(entry.rotation)
  const centerHeight = editedTerrainHeight(session.state, entry.at.x, entry.at.z)
  let greatestSlope = 0
  for (const [localX, localZ] of [
    [-footprint.halfLength, -footprint.halfWidth],
    [-footprint.halfLength, footprint.halfWidth],
    [footprint.halfLength, -footprint.halfWidth],
    [footprint.halfLength, footprint.halfWidth],
    [-footprint.halfLength, 0],
    [footprint.halfLength, 0],
    [0, -footprint.halfWidth],
    [0, footprint.halfWidth],
  ] as const) {
    const point = {
      x: entry.at.x + localX * cosine - localZ * sine,
      z: entry.at.z + localX * sine + localZ * cosine,
    }
    const run = Math.hypot(localX, localZ)
    greatestSlope = Math.max(
      greatestSlope,
      Math.abs(editedTerrainHeight(session.state, point.x, point.z) - centerHeight) / run,
    )
  }
  return greatestSlope
}

function drainageConnectionPairs(
  left: DrainageSegmentEntry,
  right: DrainageSegmentEntry,
): readonly Readonly<{ left: Point2; right: Point2; leftOther: Point2; rightOther: Point2 }>[] {
  const leftEnds = drainageSegmentEndpoints(left)
  const rightEnds = drainageSegmentEndpoints(right)
  return [
    { left: leftEnds.from, right: rightEnds.from, leftOther: leftEnds.to, rightOther: rightEnds.to },
    { left: leftEnds.from, right: rightEnds.to, leftOther: leftEnds.to, rightOther: rightEnds.from },
    { left: leftEnds.to, right: rightEnds.from, leftOther: leftEnds.from, rightOther: rightEnds.to },
    { left: leftEnds.to, right: rightEnds.to, leftOther: leftEnds.from, rightOther: rightEnds.from },
  ].filter(({ left: leftEnd, right: rightEnd }) =>
    Math.hypot(leftEnd.x - rightEnd.x, leftEnd.z - rightEnd.z) <=
      DRAINAGE_CONNECTION_REACH,
  )
}

function drainageSegmentsOverlap(
  left: DrainageSegmentEntry,
  right: DrainageSegmentEntry,
): boolean {
  const leftEnds = drainageSegmentEndpoints(left)
  const rightEnds = drainageSegmentEndpoints(right)
  const clearance = minimumSegmentDistance(
    leftEnds.from,
    leftEnds.to,
    rightEnds.from,
    rightEnds.to,
  )
  if (clearance >= DRAINAGE_SEGMENT_HALF_WIDTH * 2 + 0.02) {
    return false
  }
  const pairs = drainageConnectionPairs(left, right)
  if (pairs.length !== 1) {
    return true
  }
  const connection = pairs[0]!
  const leftVector = {
    x: connection.leftOther.x - connection.left.x,
    z: connection.leftOther.z - connection.left.z,
  }
  const rightVector = {
    x: connection.rightOther.x - connection.right.x,
    z: connection.rightOther.z - connection.right.z,
  }
  const outwardDot =
    (leftVector.x * rightVector.x + leftVector.z * rightVector.z) /
    (Math.hypot(leftVector.x, leftVector.z) * Math.hypot(rightVector.x, rightVector.z))
  return outwardDot > Math.cos(Math.PI / 5)
}

export function canPlaceDrainageEntry(
  session: EditSession,
  entry: DrainageSegmentEntry,
  guard: EditGuard = {},
  ignoreId?: string,
): EditRejection | undefined {
  if (entry.zoneId !== 'a-garden' && entry.zoneId !== 'd-headwater-edge') {
    return 'drainage-zone-only'
  }
  if (
    !finitePoint(entry.at) ||
    !Number.isFinite(entry.rotation) ||
    !Number.isFinite(entry.length) ||
    entry.length < DRAINAGE_SEGMENT_MIN_LENGTH ||
    entry.length > DRAINAGE_SEGMENT_MAX_LENGTH
  ) {
    return 'drainage-length'
  }
  if (
    entryCount(session, entry.zoneId, 'drainage-segment', ignoreId) >=
    MAX_DRAINAGE_SEGMENTS_PER_ZONE
  ) {
    return 'drainage-limit'
  }
  const zone = EDIT_ZONES.find(({ id }) => id === entry.zoneId)
  const endpoints = drainageSegmentEndpoints(entry)
  if (
    !zone ||
    sampleSegment(endpoints.from, endpoints.to).some(
      (point) => !isInsideEditZone(point, zone, DRAINAGE_SEGMENT_HALF_WIDTH),
    )
  ) {
    return 'outside-edit-zone'
  }
  if (
    capsuleTouchesProtectedWorld(
      endpoints.from,
      endpoints.to,
      DRAINAGE_SEGMENT_HALF_WIDTH,
    )
  ) {
    return 'protected-ground'
  }
  if (entryTouchesProtectedGround(entry, guard)) {
    return 'occupied'
  }
  for (const other of Object.values(session.state.current[entry.zoneId])) {
    if (other.id === ignoreId || other.kind === 'terrain-patch' || other.kind === 'surface-adjustment') {
      continue
    }
    if (other.kind === 'drainage-segment') {
      if (drainageSegmentsOverlap(entry, other)) {
        return 'overlap'
      }
      continue
    }
    const otherRadius = editEntryFootprintRadius(other)
    if (
      distanceToSegment(other.at, endpoints.from, endpoints.to) <
      DRAINAGE_SEGMENT_HALF_WIDTH + otherRadius
    ) {
      return 'overlap'
    }
  }
  return undefined
}

export function canPlaceStructureEntry(
  session: EditSession,
  entry: StructureEntry,
  guard: EditGuard = {},
  ignoreId?: string,
): EditRejection | undefined {
  if (!STRUCTURE_FOOTPRINTS[entry.form] || !finitePoint(entry.at) || !Number.isFinite(entry.rotation)) {
    return 'kind-not-allowed'
  }
  if (entryCount(session, entry.zoneId, 'structure', ignoreId) >= MAX_STRUCTURES_PER_ZONE) {
    return 'structure-limit'
  }
  const radius = structureRadius(entry.form)
  const zone = EDIT_ZONES.find(({ id }) => id === entry.zoneId)
  if (!zone || !isInsideEditZone(entry.at, zone, radius)) {
    return 'outside-edit-zone'
  }
  if (structureTouchesProtectedWorld(entry)) {
    return 'protected-ground'
  }
  if (entryTouchesProtectedGround(entry, guard)) {
    return 'occupied'
  }
  if (structureSlope(session, entry) > STRUCTURE_FOOTPRINTS[entry.form].maximumSlope) {
    return 'ground-too-steep'
  }
  for (const other of Object.values(session.state.current[entry.zoneId])) {
    if (other.id === ignoreId || other.kind !== 'drainage-segment' && other.kind !== 'structure') {
      continue
    }
    if (other.kind === 'drainage-segment') {
      const otherEndpoints = drainageSegmentEndpoints(other)
      if (
        distanceToSegment(entry.at, otherEndpoints.from, otherEndpoints.to) <
        radius + DRAINAGE_SEGMENT_HALF_WIDTH
      ) {
        return 'overlap'
      }
      continue
    }
    if (
      Math.hypot(entry.at.x - other.at.x, entry.at.z - other.at.z) <
      radius + structureRadius(other.form)
    ) {
      return 'overlap'
    }
  }
  return undefined
}

function emptyZoneRecord<T>(factory: () => T): Record<EditZoneId, T> {
  return {
    'a-garden': factory(),
    'b-bright-soil': factory(),
    'b-moist-soil': factory(),
    'd-headwater-edge': factory(),
  }
}

export function createEmptyEditState(): PersistentEditState {
  return {
    current: emptyZoneRecord<ZoneOverlay>(() => ({})),
    nextId: 1,
    revision: 0,
  }
}

function cloneOverlay(overlay: ZoneOverlay): ZoneOverlay {
  return Object.fromEntries(
    Object.entries(overlay).map(([id, entry]) => [
      id,
      { ...entry, at: { x: entry.at.x, z: entry.at.z } },
    ]),
  )
}

export function clonePersistentEditState(state: PersistentEditState): PersistentEditState {
  return {
    current: {
      'a-garden': cloneOverlay(state.current['a-garden']),
      'b-bright-soil': cloneOverlay(state.current['b-bright-soil']),
      'b-moist-soil': cloneOverlay(state.current['b-moist-soil']),
      'd-headwater-edge': cloneOverlay(state.current['d-headwater-edge']),
    },
    nextId: state.nextId,
    revision: state.revision,
  }
}

function cloneLegacyPersistentEditState(
  state: LegacyPersistentEditState,
): LegacyPersistentEditState {
  return {
    current: {
      'a-garden': cloneOverlay(state.current['a-garden']),
      'b-bright-soil': cloneOverlay(state.current['b-bright-soil']),
      'b-moist-soil': cloneOverlay(state.current['b-moist-soil']),
    },
    nextId: state.nextId,
    revision: state.revision,
  }
}

/** V1–V5의 세 관리 흙을 보존하고 새 발원지 가장자리만 빈 상태로 붙인다. */
export function migratePersistentEditStateV5(
  state: LegacyPersistentEditState,
): PersistentEditState {
  const legacy = cloneLegacyPersistentEditState(state)
  return {
    current: {
      ...legacy.current,
      'd-headwater-edge': {},
    },
    nextId: legacy.nextId,
    revision: legacy.revision,
  }
}

export function createEditSession(
  restored: PersistentEditState | LegacyPersistentEditState = createEmptyEditState(),
): EditSession {
  const current = 'd-headwater-edge' in restored.current
    ? restored as PersistentEditState
    : migratePersistentEditStateV5(restored as LegacyPersistentEditState)
  return {
    state: clonePersistentEditState(current),
    history: emptyZoneRecord<readonly ZoneOverlay[]>(() => []),
  }
}

export function toPersistentEditState(session: EditSession): PersistentEditState {
  return clonePersistentEditState(session.state)
}

export function getZoneEntries(
  session: EditSession,
  zoneId: EditZoneId,
): readonly EditEntry[] {
  return Object.values(session.state.current[zoneId])
}

export function getEntry(session: EditSession, id: string): EditEntry | undefined {
  for (const zoneId of EDIT_ZONE_IDS) {
    const entry = session.state.current[zoneId][id]
    if (entry) {
      return entry
    }
  }
  return undefined
}

function undoChangesOccupiedEntry(
  session: EditSession,
  zoneId: EditZoneId,
  previous: ZoneOverlay,
  guard: EditGuard,
): boolean {
  return guard.occupiedEntryIds?.some((id) => {
    const currentEntry = session.state.current[zoneId][id]
    if (!currentEntry) {
      return false
    }
    const previousEntry = previous[id]
    return !previousEntry || !entriesAreEqual(currentEntry, previousEntry)
  }) ?? false
}

function undoChangesProtectedGround(
  session: EditSession,
  zoneId: EditZoneId,
  previous: ZoneOverlay,
  guard: EditGuard,
): boolean {
  if (!guard.protectedGroundPoints?.length) {
    return false
  }
  const current = session.state.current[zoneId]
  const changedIds = new Set([...Object.keys(current), ...Object.keys(previous)])
  for (const id of changedIds) {
    const currentEntry = current[id]
    const previousEntry = previous[id]
    const terrainChanged = [
      currentEntry?.kind,
      previousEntry?.kind,
    ].some((kind) =>
      kind === 'terrain-patch' || kind === 'drainage-segment' || kind === 'structure',
    )
    if (
      terrainChanged &&
      (!currentEntry || !previousEntry || !entriesAreEqual(currentEntry, previousEntry)) &&
      (
        (currentEntry && entryTouchesProtectedGround(currentEntry, guard)) ||
        (previousEntry && entryTouchesProtectedGround(previousEntry, guard))
      )
    ) {
      return true
    }
  }
  return false
}

export function canUndo(
  session: EditSession,
  zoneId: EditZoneId,
  guard: EditGuard = {},
): boolean {
  const previous = session.history[zoneId].at(-1)
  return previous !== undefined &&
    !undoChangesOccupiedEntry(session, zoneId, previous, guard) &&
    !undoChangesProtectedGround(session, zoneId, previous, guard)
}

export function canPlaceEntry(
  session: EditSession,
  zoneId: EditZoneId,
  kind: EditEntryKind,
  at: Point2,
  ignoreId?: string,
): EditRejection | undefined {
  if (kind === 'drainage-segment' || kind === 'structure') {
    return 'kind-not-allowed'
  }
  if (
    zoneId === 'd-headwater-edge' &&
    kind !== 'low-cover' &&
    kind !== 'terrain-patch'
  ) {
    return 'kind-not-allowed'
  }
  const zone = EDIT_ZONES.find(({ id }) => id === zoneId)
  if (kind === 'terrain-patch' && isProtectedTerrainCenter(at)) {
    return 'protected-ground'
  }
  if (!zone) {
    return 'outside-edit-zone'
  }
  const insideOriginalSoil = isInsideEditZone(at, zone, FOOTPRINT_RADIUS[kind])
  if (kind === 'surface-adjustment') {
    if (!canLinkManagedSoilPatch(session.state, zoneId, at, ignoreId)) {
      return 'outside-edit-zone'
    }
    if (!insideOriginalSoil && circleTouchesProtectedWorld(at, MANAGED_SOIL_PATCH_RADIUS)) {
      return 'protected-ground'
    }
  } else if (
    (kind === 'low-flower' || kind === 'low-cover') &&
    !isInsideManagedSoil(session.state, zoneId, at, FOOTPRINT_RADIUS[kind])
  ) {
    return 'outside-edit-zone'
  } else if (
    kind !== 'low-flower' &&
    kind !== 'low-cover' &&
    !insideOriginalSoil
  ) {
    return 'outside-edit-zone'
  }

  if (
    kind === 'terrain-patch' &&
    Object.values(session.state.current[zoneId]).filter(
      (entry) => entry.kind === 'terrain-patch' && entry.id !== ignoreId,
    ).length >= MAX_TERRAIN_PATCHES_PER_ZONE
  ) {
    return 'terrain-patch-limit'
  }

  const overlaps = Object.values(session.state.current[zoneId]).some((entry) => {
    if (entry.id === ignoreId) {
      return false
    }
    const oneIsTerrainPatch = entry.kind === 'terrain-patch' || kind === 'terrain-patch'
    if (oneIsTerrainPatch && entry.kind !== kind) {
      return false
    }
    const oneIsSurfaceAdjustment =
      entry.kind === 'surface-adjustment' || kind === 'surface-adjustment'
    if (oneIsSurfaceAdjustment && entry.kind !== kind) {
      return false
    }
    if (entry.kind === 'structure') {
      return false
    }
    if (entry.kind === 'drainage-segment') {
      const endpoints = drainageSegmentEndpoints(entry)
      return distanceToSegment(at, endpoints.from, endpoints.to) <
        FOOTPRINT_RADIUS[kind] + DRAINAGE_SEGMENT_HALF_WIDTH
    }
    const bothAreVegetation =
      (kind === 'low-flower' || kind === 'low-cover') &&
      (entry.kind === 'low-flower' || entry.kind === 'low-cover')
    const minimumDistance =
      kind === 'terrain-patch'
        ? MIN_TERRAIN_PATCH_CENTER_DISTANCE
        : kind === 'surface-adjustment'
        ? 0.5
        : bothAreVegetation
          ? kind === 'low-cover' && entry.kind === 'low-cover'
            ? 0.3
            : kind === 'low-flower' && entry.kind === 'low-flower'
              ? 0.22
              : 0.25
        : (FOOTPRINT_RADIUS[entry.kind] + FOOTPRINT_RADIUS[kind]) * 0.68
    return (entry.at.x - at.x) ** 2 + (entry.at.z - at.z) ** 2 < minimumDistance ** 2
  })
  return overlaps ? 'overlap' : undefined
}

/** 이미 세운 구조물과 물길 아래의 실제 지형은 먼저 치우지 않으면 바꾸지 않는다. */
function terrainPatchTouchesBuiltEntry(
  session: EditSession,
  zoneId: EditZoneId,
  at: Point2,
  ignoreId?: string,
): boolean {
  return Object.values(session.state.current[zoneId]).some((entry) => {
    if (entry.id === ignoreId) {
      return false
    }
    if (entry.kind === 'structure') {
      return Math.hypot(entry.at.x - at.x, entry.at.z - at.z) <
        structureRadius(entry.form) + TERRAIN_PATCH_RADIUS
    }
    if (entry.kind === 'drainage-segment') {
      const endpoints = drainageSegmentEndpoints(entry)
      return distanceToSegment(at, endpoints.from, endpoints.to) <
        DRAINAGE_SEGMENT_HALF_WIDTH + TERRAIN_PATCH_RADIUS
    }
    return false
  })
}

function unchanged(session: EditSession, rejection: EditRejection): EditResult {
  return { session, changed: false, rejection }
}

function commitZone(
  session: EditSession,
  zoneId: EditZoneId,
  overlay: ZoneOverlay,
  nextId = session.state.nextId,
): EditSession {
  const priorHistory = session.history[zoneId]
  return {
    state: {
      current: { ...session.state.current, [zoneId]: overlay },
      nextId,
      revision: session.state.revision + 1,
    },
    history: {
      ...session.history,
      [zoneId]: [...priorHistory, session.state.current[zoneId]].slice(-MAX_UNDO_PER_ZONE),
    },
  }
}

function entriesAreEqual(left: EditEntry, right: EditEntry): boolean {
  return (
    left.id === right.id &&
    left.zoneId === right.zoneId &&
    left.kind === right.kind &&
    left.at.x === right.at.x &&
    left.at.z === right.at.z &&
    left.rotation === right.rotation &&
    (left.kind !== 'low-flower' ||
      (right.kind === 'low-flower' && left.thinned === right.thinned)) &&
    (left.kind !== 'terrain-patch' ||
      (right.kind === 'terrain-patch' && left.direction === right.direction)) &&
    (left.kind !== 'drainage-segment' ||
      (right.kind === 'drainage-segment' && left.length === right.length)) &&
    (left.kind !== 'structure' ||
      (right.kind === 'structure' && left.form === right.form))
  )
}

function removingManagedSoilStrandsVegetation(
  session: EditSession,
  zoneId: EditZoneId,
  adjustmentId: string,
): boolean {
  const remainingZone = { ...session.state.current[zoneId] }
  delete remainingZone[adjustmentId]
  const remainingSnapshot: EditSnapshot = {
    ...session.state.current,
    [zoneId]: remainingZone,
  }
  return Object.values(remainingZone).some(
    (candidate) =>
      (candidate.kind === 'low-flower' || candidate.kind === 'low-cover') &&
      !isInsideManagedSoil(
        remainingSnapshot,
        zoneId,
        candidate.at,
        FOOTPRINT_RADIUS[candidate.kind],
      ),
  )
}

export function applyEdit(
  session: EditSession,
  command: EditCommand,
  guard: EditGuard = {},
): EditResult {
  if (!EDIT_ZONE_IDS.includes(command.zoneId)) {
    return unchanged(session, 'unknown-edit-zone')
  }
  if (
    command.type === 'place' &&
    command.kind !== 'low-flower' &&
    command.kind !== 'low-cover'
  ) {
    return unchanged(session, 'kind-not-allowed')
  }
  if (
    command.type === 'shape-ground' &&
    command.direction !== 'raise' &&
    command.direction !== 'lower'
  ) {
    return unchanged(session, 'kind-not-allowed')
  }
  if (
    command.type === 'place-structure' &&
    !Object.hasOwn(STRUCTURE_FOOTPRINTS, command.form)
  ) {
    return unchanged(session, 'kind-not-allowed')
  }
  if (command.type === 'undo') {
    const history = session.history[command.zoneId]
    const previous = history.at(-1)
    if (!previous) {
      return unchanged(session, 'nothing-to-undo')
    }
    if (
      undoChangesOccupiedEntry(session, command.zoneId, previous, guard) ||
      undoChangesProtectedGround(session, command.zoneId, previous, guard)
    ) {
      return unchanged(session, 'occupied')
    }
    return {
      changed: true,
      session: {
        state: {
          current: { ...session.state.current, [command.zoneId]: previous },
          nextId: session.state.nextId,
          revision: session.state.revision + 1,
        },
        history: { ...session.history, [command.zoneId]: history.slice(0, -1) },
      },
    }
  }

  if (
    command.type === 'place' ||
    command.type === 'adjust-ground' ||
    command.type === 'shape-ground'
  ) {
    const kind: EditEntryKind =
      command.type === 'adjust-ground'
        ? 'surface-adjustment'
        : command.type === 'shape-ground'
          ? 'terrain-patch'
          : command.kind
    const rejection = canPlaceEntry(session, command.zoneId, kind, command.at)
    if (rejection) {
      return unchanged(session, rejection)
    }
    const id = 'edit-' + String(session.state.nextId)
    const base = {
      id,
      zoneId: command.zoneId,
      at: { x: command.at.x, z: command.at.z },
      rotation: command.rotation ?? 0,
    }
    let entry: EditEntry
    if (command.type === 'shape-ground') {
      entry = { ...base, kind: 'terrain-patch', direction: command.direction }
    } else if (command.type === 'place' && command.kind === 'low-flower') {
      entry = { ...base, kind: 'low-flower', thinned: false }
    } else if (command.type === 'place') {
      entry = { ...base, kind: 'low-cover' }
    } else {
      entry = { ...base, kind: 'surface-adjustment' }
    }
    if (
      entry.kind === 'terrain-patch' &&
      terrainPatchTouchesBuiltEntry(session, command.zoneId, entry.at)
    ) {
      return unchanged(session, 'occupied')
    }
    if (entryTouchesProtectedGround(entry, guard)) {
      return unchanged(session, 'occupied')
    }
    return {
      session: commitZone(
        session,
        command.zoneId,
        { ...session.state.current[command.zoneId], [id]: entry },
        session.state.nextId + 1,
      ),
      changed: true,
      entryId: id,
    }
  }

  if (command.type === 'place-drainage') {
    if (!finitePoint(command.from) || !finitePoint(command.to)) {
      return unchanged(session, 'drainage-length')
    }
    const id = 'edit-' + String(session.state.nextId)
    const entry = drainageEntryFromPoints(
      id,
      command.zoneId,
      command.from,
      command.to,
    )
    const rejection = canPlaceDrainageEntry(session, entry, guard)
    if (rejection) {
      return unchanged(session, rejection)
    }
    return {
      session: commitZone(
        session,
        command.zoneId,
        { ...session.state.current[command.zoneId], [id]: entry },
        session.state.nextId + 1,
      ),
      changed: true,
      entryId: id,
    }
  }

  if (command.type === 'place-structure') {
    const id = 'edit-' + String(session.state.nextId)
    const entry: StructureEntry = {
      id,
      zoneId: command.zoneId,
      kind: 'structure',
      form: command.form,
      at: { x: command.at.x, z: command.at.z },
      rotation: command.rotation ?? 0,
    }
    const rejection = canPlaceStructureEntry(session, entry, guard)
    if (rejection) {
      return unchanged(session, rejection)
    }
    return {
      session: commitZone(
        session,
        command.zoneId,
        { ...session.state.current[command.zoneId], [id]: entry },
        session.state.nextId + 1,
      ),
      changed: true,
      entryId: id,
    }
  }

  const entry = session.state.current[command.zoneId][command.id]
  if (!entry) {
    return unchanged(session, 'unknown-entry')
  }
  if (guard.occupiedEntryIds?.includes(entry.id)) {
    return unchanged(session, 'occupied')
  }

  if (command.type === 'thin') {
    if (entry.kind !== 'low-flower') {
      return unchanged(session, 'kind-not-allowed')
    }
    if (entry.thinned) {
      return unchanged(session, 'already-thinned')
    }
    return {
      session: commitZone(session, command.zoneId, {
        ...session.state.current[command.zoneId],
        [entry.id]: { ...entry, thinned: true },
      }),
      changed: true,
      entryId: entry.id,
    }
  }

  if (command.type === 'move') {
    if (entry.kind === 'surface-adjustment' || entry.kind === 'terrain-patch') {
      return unchanged(session, 'kind-not-allowed')
    }
    const moved: EditEntry = {
      ...entry,
      at: { x: command.to.x, z: command.to.z },
      rotation: command.rotation ?? entry.rotation,
    }
    if (
      entryTouchesProtectedGround(entry, guard) ||
      entryTouchesProtectedGround(moved, guard)
    ) {
      return unchanged(session, 'occupied')
    }
    const rejection = moved.kind === 'drainage-segment'
      ? canPlaceDrainageEntry(session, moved, guard, entry.id)
      : moved.kind === 'structure'
        ? canPlaceStructureEntry(session, moved, guard, entry.id)
        : canPlaceEntry(session, command.zoneId, moved.kind, moved.at, entry.id)
    if (rejection) {
      return unchanged(session, rejection)
    }
    return {
      session: commitZone(session, command.zoneId, {
        ...session.state.current[command.zoneId],
        [entry.id]: moved,
      }),
      changed: true,
      entryId: entry.id,
    }
  }

  if (command.type === 'rotate') {
    if (
      (entry.kind !== 'drainage-segment' && entry.kind !== 'structure') ||
      !Number.isFinite(command.rotation)
    ) {
      return unchanged(session, 'kind-not-allowed')
    }
    if (entryTouchesProtectedGround(entry, guard)) {
      return unchanged(session, 'occupied')
    }
    const rotated = { ...entry, rotation: command.rotation }
    const rejection = rotated.kind === 'drainage-segment'
      ? canPlaceDrainageEntry(session, rotated, guard, entry.id)
      : canPlaceStructureEntry(session, rotated, guard, entry.id)
    if (rejection) {
      return unchanged(session, rejection)
    }
    return {
      session: commitZone(session, command.zoneId, {
        ...session.state.current[command.zoneId],
        [entry.id]: rotated,
      }),
      changed: true,
      entryId: entry.id,
    }
  }

  if (
    command.type === 'retrieve' &&
    (
      entry.kind === 'surface-adjustment' ||
      entry.kind === 'terrain-patch' ||
      entry.kind === 'drainage-segment'
    )
  ) {
    return unchanged(session, 'kind-not-allowed')
  }
  if (command.type === 'restore-ground' && entry.kind !== 'surface-adjustment') {
    return unchanged(session, 'kind-not-allowed')
  }
  if (
    command.type === 'restore-ground' &&
    entry.kind === 'surface-adjustment' &&
    removingManagedSoilStrandsVegetation(session, command.zoneId, entry.id)
  ) {
    return unchanged(session, 'occupied')
  }
  if (command.type === 'restore-terrain') {
    if (entry.kind !== 'terrain-patch') {
      return unchanged(session, 'kind-not-allowed')
    }
    if (entryTouchesProtectedGround(entry, guard)) {
      return unchanged(session, 'occupied')
    }
    if (terrainPatchTouchesBuiltEntry(session, command.zoneId, entry.at, entry.id)) {
      return unchanged(session, 'occupied')
    }
  }
  if (command.type === 'restore-drainage') {
    if (entry.kind !== 'drainage-segment') {
      return unchanged(session, 'kind-not-allowed')
    }
    if (entryTouchesProtectedGround(entry, guard)) {
      return unchanged(session, 'occupied')
    }
  }
  if (command.type === 'retrieve' && entry.kind === 'structure') {
    if (entryTouchesProtectedGround(entry, guard)) {
      return unchanged(session, 'occupied')
    }
  }
  const nextOverlay = { ...session.state.current[command.zoneId] }
  delete nextOverlay[entry.id]
  return {
    session: commitZone(session, command.zoneId, nextOverlay),
    changed: true,
    entryId: entry.id,
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

type PersistentEditVersion = 'legacy' | 'v4' | 'v5' | 'v6'

function hasExactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
  const actual = Object.keys(value).sort()
  const expected = [...keys].sort()
  return actual.length === expected.length && actual.every((key, index) => key === expected[index])
}

function readEntry(
  value: unknown,
  id: string,
  zoneId: EditZoneId,
  version: PersistentEditVersion,
): EditEntry | undefined {
  if (!isRecord(value) || value.id !== id || value.zoneId !== zoneId) {
    return undefined
  }
  if (
    value.kind !== 'low-flower' &&
    value.kind !== 'low-cover' &&
    value.kind !== 'surface-adjustment' &&
    value.kind !== 'terrain-patch' &&
    value.kind !== 'drainage-segment' &&
    value.kind !== 'structure'
  ) {
    return undefined
  }
  if (
    (version === 'legacy' && value.kind === 'terrain-patch') ||
    (version !== 'v5' && version !== 'v6' &&
      (value.kind === 'drainage-segment' || value.kind === 'structure'))
  ) {
    return undefined
  }
  if (!isRecord(value.at) || !isFiniteNumber(value.at.x) || !isFiniteNumber(value.at.z)) {
    return undefined
  }
  if (!isFiniteNumber(value.rotation)) {
    return undefined
  }
  if (version === 'v5' || version === 'v6') {
    const extraKey = value.kind === 'low-flower'
      ? 'thinned'
      : value.kind === 'terrain-patch'
        ? 'direction'
        : value.kind === 'drainage-segment'
          ? 'length'
          : value.kind === 'structure'
            ? 'form'
            : undefined
    const expectedKeys = ['id', 'zoneId', 'kind', 'at', 'rotation']
    if (extraKey) {
      expectedKeys.push(extraKey)
    }
    if (!hasExactKeys(value, expectedKeys) || !hasExactKeys(value.at, ['x', 'z'])) {
      return undefined
    }
  }
  const base = {
    id,
    zoneId,
    at: { x: value.at.x, z: value.at.z },
    rotation: value.rotation,
  }
  if (value.kind === 'low-flower') {
    if (
      ((version === 'v5' || version === 'v6') && typeof value.thinned !== 'boolean') ||
      (version !== 'v5' && version !== 'v6' &&
        value.thinned !== undefined &&
        typeof value.thinned !== 'boolean')
    ) {
      return undefined
    }
    return {
      ...base,
      kind: value.kind,
      thinned: typeof value.thinned === 'boolean' ? value.thinned : false,
    }
  }
  if (value.kind === 'terrain-patch') {
    if (
      (value.direction !== 'raise' && value.direction !== 'lower')
    ) {
      return undefined
    }
    return { ...base, kind: value.kind, direction: value.direction }
  }
  if (value.kind === 'drainage-segment') {
    if (
      !isFiniteNumber(value.length) ||
      value.length < DRAINAGE_SEGMENT_MIN_LENGTH ||
      value.length > DRAINAGE_SEGMENT_MAX_LENGTH
    ) {
      return undefined
    }
    return { ...base, kind: value.kind, length: value.length }
  }
  if (value.kind === 'structure') {
    if (
      value.form !== 'support' &&
      value.form !== 'rack' &&
      value.form !== 'fence' &&
      value.form !== 'shade'
    ) {
      return undefined
    }
    return { ...base, kind: value.kind, form: value.form }
  }
  return { ...base, kind: value.kind }
}

// 손상되었거나 다른 버전의 저장값은 부분 복구하지 않고 새 세계로 안전하게 돌아간다.
function readPersistentEditStateVersion(
  value: unknown,
  version: PersistentEditVersion,
  zoneIds: readonly EditZoneId[],
): PersistentEditState | LegacyPersistentEditState | undefined {
  if (!isRecord(value) || !isRecord(value.current)) {
    return undefined
  }
  const strictLayout = version === 'v5' || version === 'v6'
  if (
    strictLayout &&
    (
      !hasExactKeys(value, ['current', 'nextId', 'revision']) ||
      !hasExactKeys(value.current, zoneIds)
    )
  ) {
    return undefined
  }
  if (
    !Number.isSafeInteger(value.nextId) ||
    (value.nextId as number) < 1 ||
    !Number.isSafeInteger(value.revision) ||
    (value.revision as number) < 0
  ) {
    return undefined
  }

  const overlays: Record<string, Record<string, EditEntry>> = Object.fromEntries(
    zoneIds.map((zoneId) => [zoneId, {}]),
  )
  const ids = new Set<string>()
  let greatestId = 0
  for (const zoneId of zoneIds) {
    const rawOverlay = value.current[zoneId]
    if (!isRecord(rawOverlay)) {
      return undefined
    }
    for (const [id, rawEntry] of Object.entries(rawOverlay)) {
      const idMatch = /^edit-(\d+)$/.exec(id)
      const entry = readEntry(rawEntry, id, zoneId, version)
      if (!idMatch || !entry || ids.has(id)) {
        return undefined
      }
      const numericId = Number(idMatch[1])
      if (!Number.isSafeInteger(numericId) || numericId < 1) {
        return undefined
      }
      ids.add(id)
      greatestId = Math.max(greatestId, numericId)
      overlays[zoneId]![id] = entry
    }
  }
  const nextId = value.nextId as number
  const revision = value.revision as number
  if (nextId <= greatestId) {
    return undefined
  }
  const historical = zoneIds.length === CARE_ZONE_IDS.length
  const rawState = historical
    ? {
        current: overlays as Record<CareZoneId, ZoneOverlay>,
        nextId,
        revision,
      } satisfies LegacyPersistentEditState
    : {
        current: overlays as Record<EditZoneId, ZoneOverlay>,
        nextId,
        revision,
      } satisfies PersistentEditState
  const currentState = historical
    ? migratePersistentEditStateV5(rawState as LegacyPersistentEditState)
    : rawState as PersistentEditState
  const session = createEditSession(currentState)
  for (const zoneId of zoneIds) {
    for (const entry of Object.values(overlays[zoneId]!)) {
      const rejection = entry.kind === 'drainage-segment'
        ? canPlaceDrainageEntry(session, entry, {}, entry.id)
        : entry.kind === 'structure'
          ? canPlaceStructureEntry(session, entry, {}, entry.id)
          : canPlaceEntry(session, zoneId, entry.kind, entry.at, entry.id)
      if (rejection) {
        return undefined
      }
    }
  }
  return historical
    ? cloneLegacyPersistentEditState(rawState as LegacyPersistentEditState)
    : clonePersistentEditState(rawState as PersistentEditState)
}

/** 현재 V6 편집은 발원지 가장자리를 포함한 네 구역을 정확히 읽는다. */
export function readPersistentEditState(value: unknown): PersistentEditState | undefined {
  return readPersistentEditStateVersion(value, 'v6', EDIT_ZONE_IDS) as
    | PersistentEditState
    | undefined
}

/** V5에는 배수 홈과 구조물까지 있었지만 발원지 가장자리는 아직 없었다. */
export function readPersistentEditStateV5(
  value: unknown,
): LegacyPersistentEditState | undefined {
  return readPersistentEditStateVersion(value, 'v5', CARE_ZONE_IDS) as
    | LegacyPersistentEditState
    | undefined
}

/** V4에는 지형 패치까지 있었고 배수 홈과 구조물은 아직 없었다. */
export function readPersistentEditStateV4(
  value: unknown,
): LegacyPersistentEditState | undefined {
  return readPersistentEditStateVersion(value, 'v4', CARE_ZONE_IDS) as
    | LegacyPersistentEditState
    | undefined
}

/**
 * V1~V3 저장은 당시 존재하지 않던 지형 조형을 받아들이지 않는다.
 * 예전 항목의 알 수 없는 추가 필드는 계속 무시해 기존 저장 호환을 지킨다.
 */
export function readLegacyPersistentEditState(
  value: unknown,
): LegacyPersistentEditState | undefined {
  return readPersistentEditStateVersion(value, 'legacy', CARE_ZONE_IDS) as
    | LegacyPersistentEditState
    | undefined
}

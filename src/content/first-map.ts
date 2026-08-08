export type PlaceId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export type CareZoneId = 'a-garden' | 'b-bright-soil' | 'b-moist-soil'
export type EditZoneId = CareZoneId | 'd-headwater-edge'

export const CARE_ZONE_IDS: readonly CareZoneId[] = [
  'a-garden',
  'b-bright-soil',
  'b-moist-soil',
]

export function isCareZoneId(zoneId: EditZoneId): zoneId is CareZoneId {
  return (CARE_ZONE_IDS as readonly EditZoneId[]).includes(zoneId)
}

export type DrainageOutlet = Readonly<{
  id: 'a-garden-drainage-outlet' | 'd-headwater-edge-drainage-outlet'
  zoneId: 'a-garden' | 'd-headwater-edge'
  at: Point2
  reach: number
}>

export type Point2 = Readonly<{
  x: number
  z: number
}>

export type Place = Readonly<{
  id: PlaceId
  name: string
  cue: string
  center: Point2
  radius: number
  color: number
}>

export type Route = Readonly<{
  id: string
  from: PlaceId
  to: PlaceId
  kind: 'shared' | 'water-bank' | 'upper-return' | 'lower-return'
  width: number
  points: readonly Point2[]
}>

export type WaterSourceId = 'a-well' | 'b-stream-bank'

export type WaterSource = Readonly<{
  id: WaterSourceId
  placeId: 'A' | 'B'
  name: string
  shortName: string
  at: Point2
  /** 이 거리 안에서 물뿌리개를 채울 수 있다. */
  reach: number
}>

export type EditZone = Readonly<{
  id: EditZoneId
  placeId: 'A' | 'B' | 'D'
  name: string
  shortName: string
  tone: 'garden' | 'bright' | 'moist' | 'headwater'
  focus: Point2
  outline: readonly Point2[]
  soilColor: number
}>

export const WORLD_CENTER: Point2 = { x: -5, z: 1 }
export const WORLD_RADII: Point2 = { x: 21, z: 27 }
export const START_POSITION: Point2 = { x: -9.4, z: 0.8 }

export const PLACES: readonly Place[] = [
  {
    id: 'A',
    name: '산촌 집·작은 정원',
    cue: '붉은 집 지붕이 돌아갈 자리를 알려 줍니다.',
    center: { x: -11, z: 0 },
    radius: 5.7,
    color: 0xc8b26d,
  },
  {
    id: 'B',
    name: '계곡 물가',
    cue: '잔잔한 물빛이 길의 중심을 잡아 줍니다.',
    center: { x: -2.2, z: 0 },
    radius: 5,
    color: 0x83b8ac,
  },
  {
    id: 'C',
    name: '숲 가장자리',
    cue: '뒤의 잔잔한 물빛과 앞의 물소리가 겹칩니다.',
    center: { x: -1.2, z: -8 },
    radius: 4.5,
    color: 0x668b62,
  },
  {
    id: 'D',
    name: '바위 계류',
    cue: '흰 물살과 또렷한 물소리가 상류를 드러냅니다.',
    center: { x: -3, z: -16 },
    radius: 7.8,
    color: 0x87949a,
  },
  {
    id: 'E',
    name: '아래로 이어지는 좁은 물길',
    cue: '흐르는 물과 밝아지는 하늘이 아래쪽을 잇습니다.',
    center: { x: -1.2, z: 8 },
    radius: 4.5,
    color: 0x94aa73,
  },
  {
    id: 'F',
    name: '산지 지류',
    cue: '넓게 열린 골짜기가 물이 계속되는 쪽을 보여 줍니다.',
    center: { x: -4, z: 17 },
    radius: 5.8,
    color: 0xb8b879,
  },
]

export const ROUTES: readonly Route[] = [
  {
    id: 'A-B',
    from: 'A',
    to: 'B',
    kind: 'shared',
    width: 3.6,
    points: [
      { x: -11, z: 0 },
      { x: -7.2, z: 0.8 },
      { x: -2.2, z: 0 },
    ],
  },
  {
    id: 'B-C',
    from: 'B',
    to: 'C',
    kind: 'water-bank',
    width: 2.7,
    points: [
      { x: -2.2, z: 0 },
      { x: -2.4, z: -4.2 },
      { x: -1.2, z: -8 },
    ],
  },
  {
    id: 'C-D',
    from: 'C',
    to: 'D',
    kind: 'water-bank',
    width: 2.6,
    points: [
      { x: -1.2, z: -8 },
      { x: -2, z: -12 },
      { x: -3, z: -16 },
    ],
  },
  {
    id: 'D-A',
    from: 'D',
    to: 'A',
    kind: 'upper-return',
    width: 2.5,
    points: [
      { x: -3, z: -16 },
      { x: -9.5, z: -13.5 },
      { x: -14.2, z: -8.2 },
      { x: -10.2, z: -4.4 },
      { x: -11, z: 0 },
    ],
  },
  {
    id: 'B-E',
    from: 'B',
    to: 'E',
    kind: 'water-bank',
    width: 2.7,
    points: [
      { x: -2.2, z: 0 },
      { x: -2.3, z: 4.1 },
      { x: -1.2, z: 8 },
    ],
  },
  {
    id: 'E-F',
    from: 'E',
    to: 'F',
    kind: 'water-bank',
    width: 2.8,
    points: [
      { x: -1.2, z: 8 },
      { x: -2.1, z: 12.4 },
      { x: -4, z: 17 },
    ],
  },
  {
    id: 'F-A',
    from: 'F',
    to: 'A',
    kind: 'lower-return',
    width: 2.8,
    points: [
      { x: -4, z: 17 },
      { x: -11.5, z: 15.4 },
      { x: -16.1, z: 10.2 },
      { x: -17, z: 5.2 },
      { x: -14.7, z: 2.2 },
      { x: -11, z: 0 },
    ],
  },
]

/**
 * D의 바위 계류에서 위쪽 발원지 가장자리로 이어지는 열린 지선이다.
 * 기존 두 순환길의 일곱 연결에는 넣지 않아 A–F 계약과 귀환선을 그대로 둔다.
 */
export const UPSTREAM_SPUR: readonly Point2[] = [
  { x: -3, z: -16 },
  { x: -3.35, z: -18.15 },
  { x: -3.15, z: -20.15 },
  { x: -2.45, z: -21.75 },
  { x: -1.7, z: -22.35 },
]

/** D 너머에서 스며든 물이 기존 바위 계류로 모이는 상류 물축이다. */
export const HEADWATER_COURSE: readonly Point2[] = [
  { x: 0.05, z: -23.1 },
  { x: 0.1, z: -22.25 },
  { x: 0.35, z: -21.4 },
  { x: 0.55, z: -20.1 },
  { x: 0.82, z: -19.15 },
  { x: 1.1, z: -18.5 },
]

/** V1–V5 저장이 만들어질 때 이미 있던 물축이다. 이전 보행 위치 판독에만 쓴다. */
export const LEGACY_WATER_COURSE: readonly Point2[] = [
  { x: 1.1, z: -18.5 },
  { x: 2.2, z: -13.5 },
  { x: 2.8, z: -8 },
  { x: 2.6, z: 0 },
  { x: 3.2, z: 7.5 },
  { x: 2.4, z: 13 },
  { x: 1.5, z: 19.5 },
  // 첫 지도 안에서 물이 잘린 판처럼 끝나지 않고 열린 하류 너머로 이어진다.
  // 기존 내부 꼭짓점 순서는 저장·검증 계약을 위해 그대로 둔다.
  { x: 0.8, z: 24.6 },
  { x: 0.25, z: 30.5 },
]

export const WATER_COURSE: readonly Point2[] = [
  ...HEADWATER_COURSE.slice(0, -1),
  ...LEGACY_WATER_COURSE,
]

/**
 * 첫 물길은 큰 하천이 아니라 걸어서 가까이 볼 수 있는 산지 도랑·개울이다.
 * 폭은 작게 유지하되 물과 바닥은 주변 지면보다 분명히 낮춘다.
 */
export const WATER_CHANNEL = Object.freeze({
  waterHalfWidth: 1.15,
  bedHalfWidth: 0.72,
  bankHalfWidth: 2.45,
  bedDepth: 0.72,
  waterDepth: 0.22,
})

// 첫 제품 슬라이스의 제작값이다. 플레이테스트 전에는 최종 면적이나 생태 임계값으로 보지 않는다.
// 세 흙자리는 본래 물길과 순환길의 중심선을 피한 관리 흔적 위에 놓인다.
export const EDIT_ZONES: readonly EditZone[] = [
  {
    id: 'a-garden',
    placeId: 'A',
    name: 'A 정원 가꾸기 흙',
    shortName: '정원 흙',
    tone: 'garden',
    focus: { x: -9.8, z: 3.65 },
    outline: [
      { x: -12.25, z: 2.35 },
      { x: -10.85, z: 2.05 },
      { x: -9.15, z: 2.2 },
      { x: -7.75, z: 2.85 },
      { x: -7.55, z: 4.15 },
      { x: -8.55, z: 5.15 },
      { x: -10.35, z: 5.35 },
      { x: -11.85, z: 4.7 },
      { x: -12.55, z: 3.45 },
    ],
    soilColor: 0x79684e,
  },
  {
    id: 'b-bright-soil',
    placeId: 'B',
    name: 'B 밝고 마른 돌보기 흙',
    shortName: '밝은 흙',
    tone: 'bright',
    focus: { x: -4.65, z: 2.75 },
    outline: [
      { x: -5.85, z: 2.05 },
      { x: -4.85, z: 1.7 },
      { x: -3.8, z: 2.1 },
      { x: -3.45, z: 3.05 },
      { x: -4.15, z: 3.9 },
      { x: -5.35, z: 3.95 },
      { x: -6.05, z: 3.25 },
    ],
    soilColor: 0x82765a,
  },
  {
    id: 'b-moist-soil',
    placeId: 'B',
    name: 'B 그늘지고 촉촉한 돌보기 흙',
    shortName: '촉촉한 흙',
    tone: 'moist',
    focus: { x: -4.95, z: -3.55 },
    outline: [
      { x: -5.95, z: -4.15 },
      { x: -5.2, z: -4.75 },
      { x: -4.15, z: -4.55 },
      { x: -3.75, z: -3.65 },
      { x: -4.15, z: -2.65 },
      { x: -5.25, z: -2.45 },
      { x: -6.15, z: -3.15 },
    ],
    soilColor: 0x596049,
  },
  {
    id: 'd-headwater-edge',
    placeId: 'D',
    name: 'D 위쪽 숲 발원지 관리 가장자리',
    shortName: '발원지 가장자리',
    tone: 'headwater',
    focus: { x: -5.35, z: -22.15 },
    outline: [
      { x: -6.75, z: -22.95 },
      { x: -6.2, z: -23.75 },
      { x: -5.05, z: -24.05 },
      { x: -4.15, z: -23.45 },
      { x: -4.05, z: -22.35 },
      { x: -4.4, z: -21.05 },
      { x: -5.45, z: -20.55 },
      { x: -6.45, z: -21.25 },
    ],
    soilColor: 0x4f5946,
  },
]

/** 관리 흙의 얕은 홈이 닿을 수 있는 기존 배수 방향이다. 본래 개울과는 별개다. */
export const DRAINAGE_OUTLETS: readonly DrainageOutlet[] = [
  {
    id: 'a-garden-drainage-outlet',
    zoneId: 'a-garden',
    at: { x: -8.65, z: 5 },
    reach: 0.22,
  },
  {
    id: 'd-headwater-edge-drainage-outlet',
    zoneId: 'd-headwater-edge',
    // 관리 가장자리의 낮은 쪽에서 본래 발원지 물축으로 이어지는 보호된 스밈 자국이다.
    at: { x: -4.75, z: -21.38 },
    reach: 0.24,
  },
]

/** B의 관리 흙 바깥에서 C 피난처로 이어지는, 구조물보다 먼저 보호할 덮임 길이다. */
export const B_C_PROTECTED_COVER_PATH: readonly Point2[] = [
  { x: -3.55, z: -4.15 },
  { x: -3.05, z: -4.95 },
  { x: -2.62, z: -5.82 },
  { x: -2.08, z: -6.7 },
]

// 물은 펌프나 관이 아니라 우물과 개울에서 물뿌리개로 퍼서 나른다.
// 두 자리 모두 마른 땅에서 닿으며 본래 물길과 무당개구리의 얕은 물가를 침범하지 않는다.
export const WATER_SOURCES: readonly WaterSource[] = [
  {
    id: 'a-well',
    placeId: 'A',
    name: 'A 정원 옆 우물',
    shortName: '우물',
    // 집과 정원 사이에 둔다. 시작 위치 바로 위에 두면 3인칭 카메라에 보이지 않는다.
    at: { x: -11.9, z: 1.6 },
    reach: 1.4,
  },
  {
    id: 'b-stream-bank',
    placeId: 'B',
    name: 'B 개울의 물 뜨는 자리',
    shortName: '개울',
    at: { x: 1.4, z: 2.6 },
    reach: 1.55,
  },
]

const PLACE_BY_ID = new Map(PLACES.map((place) => [place.id, place]))

export function getNearbyWaterSource(point: Point2): WaterSource | undefined {
  return WATER_SOURCES.map((source) => ({
    source,
    distance: Math.sqrt(distanceSquared(point, source.at)),
  }))
    .filter(({ source, distance }) => distance <= source.reach)
    .sort((left, right) => left.distance - right.distance)[0]?.source
}

export function baseTerrainHeight(x: number, z: number): number {
  const downhill = 3.2 - z * 0.13
  const distanceFromHomeSquared = (x + 11) ** 2 + z ** 2
  const homeShelf = 1.72 * Math.exp(-distanceFromHomeSquared / 72)
  // 한 장의 경사면처럼 보이지 않도록 넓은 산비탈의 굴곡을 더한다.
  // 집 주변은 생활 거점답게 비교적 평평하게 남기고, 숲·계류 쪽으로 갈수록
  // 굴곡이 조금 더 드러난다. 이 값은 통행 판정이 아니라 화면 높이 제작값이다.
  const homeCalm = Math.exp(-distanceFromHomeSquared / 54)
  const broadFold =
    Math.sin((x + 5) * 0.19 + z * 0.035) * 0.15 +
    Math.cos(z * 0.145 - x * 0.045) * 0.09
  const smallFold = Math.sin(x * 0.47 + z * 0.31) * 0.022
  const relief = (broadFold + smallFold) * (1 - homeCalm * 0.72)
  return downhill + homeShelf + relief
}

function smoothstep(value: number): number {
  const clamped = Math.max(0, Math.min(1, value))
  return clamped * clamped * (3 - 2 * clamped)
}

export function waterChannelDepthAt(point: Point2): number {
  const distance = distanceToPolyline(point, WATER_COURSE)
  if (distance <= WATER_CHANNEL.bedHalfWidth) {
    return WATER_CHANNEL.bedDepth
  }
  if (distance >= WATER_CHANNEL.bankHalfWidth) {
    return 0
  }
  const bankProgress =
    (WATER_CHANNEL.bankHalfWidth - distance) /
    (WATER_CHANNEL.bankHalfWidth - WATER_CHANNEL.bedHalfWidth)
  return WATER_CHANNEL.bedDepth * smoothstep(bankProgress)
}

export function terrainHeight(x: number, z: number): number {
  return baseTerrainHeight(x, z) - waterChannelDepthAt({ x, z })
}

/** 물 표면은 파인 바닥보다 조금 높지만 주변 지면보다 낮다. */
export function waterSurfaceHeight(x: number, z: number): number {
  return baseTerrainHeight(x, z) - WATER_CHANNEL.bedDepth + WATER_CHANNEL.waterDepth
}

export function distanceSquared(a: Point2, b: Point2): number {
  return (a.x - b.x) ** 2 + (a.z - b.z) ** 2
}

export function distanceToSegment(point: Point2, start: Point2, end: Point2): number {
  const deltaX = end.x - start.x
  const deltaZ = end.z - start.z
  const lengthSquared = deltaX * deltaX + deltaZ * deltaZ
  if (lengthSquared === 0) {
    return Math.sqrt(distanceSquared(point, start))
  }
  const projection = Math.max(
    0,
    Math.min(
      1,
      ((point.x - start.x) * deltaX + (point.z - start.z) * deltaZ) /
        lengthSquared,
    ),
  )
  const nearest = {
    x: start.x + deltaX * projection,
    z: start.z + deltaZ * projection,
  }
  return Math.sqrt(distanceSquared(point, nearest))
}

export function distanceToPolyline(point: Point2, points: readonly Point2[]): number {
  let nearest = Number.POSITIVE_INFINITY
  for (let index = 0; index < points.length - 1; index += 1) {
    nearest = Math.min(nearest, distanceToSegment(point, points[index]!, points[index + 1]!))
  }
  return nearest
}

function pointInPolygon(point: Point2, polygon: readonly Point2[]): boolean {
  let inside = false
  for (
    let current = 0, previous = polygon.length - 1;
    current < polygon.length;
    previous = current, current += 1
  ) {
    const a = polygon[current]!
    const b = polygon[previous]!
    const crosses =
      a.z > point.z !== b.z > point.z &&
      point.x < ((b.x - a.x) * (point.z - a.z)) / (b.z - a.z) + a.x
    if (crosses) {
      inside = !inside
    }
  }
  return inside
}

export function distanceToPolygon(point: Point2, polygon: readonly Point2[]): number {
  if (pointInPolygon(point, polygon)) {
    return 0
  }
  let nearest = Number.POSITIVE_INFINITY
  for (let index = 0; index < polygon.length; index += 1) {
    nearest = Math.min(
      nearest,
      distanceToSegment(point, polygon[index]!, polygon[(index + 1) % polygon.length]!),
    )
  }
  return nearest
}

export function isInsideEditZone(
  point: Point2,
  zone: EditZone,
  footprintRadius = 0,
): boolean {
  if (!pointInPolygon(point, zone.outline)) {
    return false
  }
  if (footprintRadius <= 0) {
    return true
  }
  return zone.outline.every(
    (edgeStart, index) =>
      distanceToSegment(point, edgeStart, zone.outline[(index + 1) % zone.outline.length]!) >=
      footprintRadius,
  )
}

export function getEditZoneAt(point: Point2, footprintRadius = 0): EditZone | undefined {
  return EDIT_ZONES.find((zone) => isInsideEditZone(point, zone, footprintRadius))
}

export function getNearbyEditZone(point: Point2, reach = 1.25): EditZone | undefined {
  return EDIT_ZONES.map((zone) => ({ zone, distance: distanceToPolygon(point, zone.outline) }))
    .filter(({ distance }) => distance <= reach)
    .sort((left, right) => left.distance - right.distance)[0]?.zone
}

export function isInsideWorld(point: Point2): boolean {
  const deltaX = (point.x - WORLD_CENTER.x) / WORLD_RADII.x
  const deltaZ = (point.z - WORLD_CENTER.z) / WORLD_RADII.z
  return deltaX * deltaX + deltaZ * deltaZ <= 0.97
}

export function isInWater(point: Point2): boolean {
  return distanceToPolyline(point, WATER_COURSE) < WATER_CHANNEL.waterHalfWidth
}

export function isWalkable(point: Point2): boolean {
  return isInsideWorld(point) && !isInWater(point)
}

/** 새 발원지 물축 이전 저장의 플레이어 위치를 판독할 때만 쓰는 보행 계약이다. */
export function isWalkableBeforeHeadwater(point: Point2): boolean {
  return isInsideWorld(point) &&
    distanceToPolyline(point, LEGACY_WATER_COURSE) >= WATER_CHANNEL.waterHalfWidth
}

export function getPlaceAt(point: Point2): Place | undefined {
  return PLACES.filter(
    (place) => distanceSquared(point, place.center) <= place.radius * place.radius,
  ).sort(
    (left, right) => distanceSquared(point, left.center) - distanceSquared(point, right.center),
  )[0]
}

function samePoint(left: Point2, right: Point2): boolean {
  return distanceSquared(left, right) < 0.0001
}

export function assertFirstMapContract(): void {
  const expectedPlaces = 'A,B,C,D,E,F'
  const actualPlaces = PLACES.map(({ id }) => id).join(',')
  if (actualPlaces !== expectedPlaces || ROUTES.length !== 7) {
    throw new Error('첫 지도의 A–F와 일곱 연결 계약이 달라졌습니다.')
  }
  const expectedEditZones = 'a-garden,b-bright-soil,b-moist-soil,d-headwater-edge'
  if (EDIT_ZONES.map(({ id }) => id).join(',') !== expectedEditZones) {
    throw new Error('A 정원·B 두 흙자리·D 발원지 가장자리 계약이 달라졌습니다.')
  }
  for (const zone of EDIT_ZONES) {
    if (zone.outline.length < 3 || !isInsideEditZone(zone.focus, zone)) {
      throw new Error(zone.id + ' 편집 흙자리의 외곽이 올바르지 않습니다.')
    }
    if (zone.outline.some((point) => isInWater(point))) {
      throw new Error(zone.id + ' 편집 흙자리가 본래 물길을 침범합니다.')
    }
  }
  if (
    DRAINAGE_OUTLETS.map(({ id }) => id).join(',') !==
      'a-garden-drainage-outlet,d-headwater-edge-drainage-outlet'
  ) {
    throw new Error('A 정원과 D 발원지 가장자리의 작은 배수 출구 계약이 달라졌습니다.')
  }
  for (const outlet of DRAINAGE_OUTLETS) {
    const zone = EDIT_ZONES.find(({ id }) => id === outlet.zoneId)
    if (
      !zone ||
      !isInsideEditZone(outlet.at, zone) ||
      !Number.isFinite(outlet.reach) ||
      outlet.reach <= 0
    ) {
      throw new Error(outlet.id + ' 배수 출구가 정원 흙 가장자리에 닿지 않습니다.')
    }
  }
  if (
    B_C_PROTECTED_COVER_PATH.length < 2 ||
    B_C_PROTECTED_COVER_PATH.some((point) =>
      !Number.isFinite(point.x) || !Number.isFinite(point.z),
    )
  ) {
    throw new Error('B에서 C로 이어지는 덮임 길 계약이 올바르지 않습니다.')
  }
  const expectedWaterSources = 'a-well,b-stream-bank'
  if (WATER_SOURCES.map(({ id }) => id).join(',') !== expectedWaterSources) {
    throw new Error('A 우물과 B 개울의 물 뜨는 자리 계약이 달라졌습니다.')
  }
  for (const source of WATER_SOURCES) {
    if (!isWalkable(source.at)) {
      throw new Error(source.id + ' 물 뜨는 자리에 마른 땅으로 닿을 수 없습니다.')
    }
    if (getEditZoneAt(source.at)) {
      throw new Error(source.id + ' 물 뜨는 자리가 가꿀 흙을 잡아먹습니다.')
    }
    // 시작 위치에 겹치면 3인칭 카메라가 플레이어 뒤에 있어 아무것도 보이지 않는다.
    if (distanceSquared(source.at, START_POSITION) < 2.2 ** 2) {
      throw new Error(source.id + ' 물 뜨는 자리가 시작 위치에 너무 가까워 보이지 않습니다.')
    }
  }
  for (const route of ROUTES) {
    const from = PLACE_BY_ID.get(route.from)
    const to = PLACE_BY_ID.get(route.to)
    if (!from || !to || !samePoint(route.points[0]!, from.center) || !samePoint(route.points.at(-1)!, to.center)) {
      throw new Error(route.id + ' 연결선이 장소 중심에 닿지 않습니다.')
    }
  }
  if (
    UPSTREAM_SPUR.length < 2 ||
    !samePoint(UPSTREAM_SPUR[0]!, PLACE_BY_ID.get('D')!.center) ||
    UPSTREAM_SPUR.some((point) => !isWalkable(point))
  ) {
    throw new Error('D 너머 발원지 지선에 마른 땅으로 닿을 수 없습니다.')
  }
  if (
    HEADWATER_COURSE.length < 2 ||
    !samePoint(HEADWATER_COURSE.at(-1)!, WATER_COURSE[HEADWATER_COURSE.length - 1]!)
  ) {
    throw new Error('발원지 물축이 기존 바위 계류와 이어지지 않습니다.')
  }
  const heights = ['D', 'A', 'B', 'E', 'F'].map((id) => {
    const place = PLACE_BY_ID.get(id as PlaceId)!
    return terrainHeight(place.center.x, place.center.z)
  })
  if (!heights.every((height, index) => index === 0 || heights[index - 1]! > height)) {
    throw new Error('D > A > B > E > F 높이 계약이 달라졌습니다.')
  }
  if (!isWalkable(START_POSITION)) {
    throw new Error('첫 시작점에서 걸을 수 없습니다.')
  }
}

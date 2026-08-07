import {
  B_C_PROTECTED_COVER_PATH,
  type LocalEnvironmentSnapshot,
} from './local-environment.ts'
import {
  WATER_COURSE,
  distanceToPolyline,
  isInWater,
  type EditZoneId,
  type Point2,
} from '../content/first-map.ts'

export type ToadPhase = 'away' | 'trace' | 'approaching' | 'using'
export type ToadRouteKind = 'protected' | 'managed'
export type ToadCue =
  | 'refuge-rustle'
  | 'water-ripple'
  | 'water-touch'
  | 'departure'

export type ToadRoute = Readonly<{
  id: string
  kind: ToadRouteKind
  points: readonly Point2[]
  targetAt: Point2
  rippleAt: Point2
  entryIds: readonly string[]
  length: number
  hopCount: number
}>

export type FireBelliedToadState = Readonly<{
  phase: ToadPhase
  position: Point2
  refuge: Point2
  activeRoute?: ToadRoute
  lastRouteId?: string
  routeProgress: number
  phaseSeconds: number
  tracePulseCount: number
  visitCount: number
}>

export type FireBelliedToadInput = Readonly<{
  deltaSeconds: number
  opportunities: readonly ToadRoute[]
  playerAt: Point2
  activeEditZoneId?: EditZoneId
}>

export type FireBelliedToadUpdate = Readonly<{
  state: FireBelliedToadState
  cues: readonly ToadCue[]
}>

export type FirstMapToadTuning = Readonly<{
  firstTraceDelay: number
  revisitDelay: number
  traceRippleDelay: number
  traceDuration: number
  shallowEdgeUseDuration: number
  approachSpeed: number
  retreatSpeed: number
  alertDistance: number
  quietTargetDistance: number
  quietRefugeDistance: number
  quietRouteDistance: number
  observableDistance: number
}>

function requirePoint(point: Point2 | undefined, message: string): Point2 {
  if (!point) {
    throw new Error('무당개구리 지도 계약 실패: ' + message)
  }
  return point
}

export const TOAD_REFUGE: Point2 = Object.freeze({
  ...requirePoint(
    B_C_PROTECTED_COVER_PATH.at(-1),
    'B–C 보호 덮임에는 C 피난처가 있어야 합니다.',
  ),
})

export const PROTECTED_SHALLOW_EDGE: Point2 = Object.freeze({ x: 1.25, z: -1.45 })
export const MANAGED_SHALLOW_EDGE: Point2 = Object.freeze({ x: 1.22, z: -2.85 })

// 정확한 거리·초·속도는 저학년 플레이테스트로 조정할 첫 지도 제작값이다.
export const FIRST_MAP_TOAD_TUNING: FirstMapToadTuning = Object.freeze({
  firstTraceDelay: 10.5,
  revisitDelay: 12.5,
  traceRippleDelay: 1.35,
  traceDuration: 2.8,
  shallowEdgeUseDuration: 9.5,
  approachSpeed: 1.3,
  retreatSpeed: 1.75,
  alertDistance: 2.05,
  quietTargetDistance: 3.4,
  quietRefugeDistance: 2.7,
  quietRouteDistance: 2.7,
  observableDistance: 13,
})

function copyPoint(point: Point2): Point2 {
  return { x: point.x, z: point.z }
}

function distance(left: Point2, right: Point2): number {
  return Math.hypot(left.x - right.x, left.z - right.z)
}

function polylineLength(points: readonly Point2[]): number {
  let total = 0
  for (let index = 0; index < points.length - 1; index += 1) {
    const from = points[index]
    const to = points[index + 1]
    if (from && to) {
      total += distance(from, to)
    }
  }
  return total
}

function makeRoute(
  id: string,
  kind: ToadRouteKind,
  points: readonly Point2[],
  targetAt: Point2,
  rippleAt: Point2,
  entryIds: readonly string[],
  hopCount: number,
): ToadRoute {
  const copiedPoints = points.map(copyPoint)
  return Object.freeze({
    id,
    kind,
    points: copiedPoints,
    targetAt: copyPoint(targetAt),
    rippleAt: copyPoint(rippleAt),
    entryIds: [...entryIds],
    length: polylineLength(copiedPoints),
    hopCount,
  })
}

function protectedRoute(): ToadRoute {
  const coverTowardB = [...B_C_PROTECTED_COVER_PATH].reverse()
  const points: readonly Point2[] = [
    ...coverTowardB,
    { x: -2.55, z: -3.55 },
    { x: -1.1, z: -2.75 },
    { x: 0.15, z: -2.05 },
    PROTECTED_SHALLOW_EDGE,
  ]
  return makeRoute(
    'toad-protected-bc-edge',
    'protected',
    points,
    PROTECTED_SHALLOW_EDGE,
    { x: 1.62, z: -1.45 },
    [],
    5,
  )
}

export function deriveToadOpportunities(
  environment: LocalEnvironmentSnapshot,
): readonly ToadRoute[] {
  const routes: ToadRoute[] = [protectedRoute()]
  if (
    environment.bToC.protectedFoundation.shallowSlowWaterEdge &&
    environment.bToC.protectedFoundation.cRefuge &&
    environment.bToC.protectedFoundation.naturalBCLink === 'connected' &&
    environment.zones['b-moist-soil'].surfaceMoisture === 'moist' &&
    environment.bToC.managedCover === 'joined' &&
    environment.bToC.connectedCover.length > 0
  ) {
    const naturalStart = B_C_PROTECTED_COVER_PATH[0]
    const firstConnected = environment.bToC.connectedCover[0]
    if (!naturalStart || !firstConnected) {
      return routes
    }
    const coverTowardB = [...B_C_PROTECTED_COVER_PATH].reverse()
    const managedAnchor = environment.bToC.connectedCover.reduce(
      (nearest, candidate) =>
        distance(candidate.at, naturalStart) < distance(nearest.at, naturalStart)
          ? candidate
          : nearest,
      firstConnected,
    )
    const anchorSignature =
      managedAnchor.id +
      '@' +
      managedAnchor.at.x.toFixed(3) +
      ',' +
      managedAnchor.at.z.toFixed(3)
    routes.push(
      makeRoute(
        'toad-managed-bc-edge:' + anchorSignature,
        'managed',
        [
          ...coverTowardB,
          managedAnchor.at,
          { x: -2.1, z: -3.35 },
          { x: -0.35, z: -3.05 },
          MANAGED_SHALLOW_EDGE,
        ],
        MANAGED_SHALLOW_EDGE,
        { x: 1.62, z: -2.85 },
        [managedAnchor.id],
        6,
      ),
    )
  }
  return routes
}

export function createFireBelliedToadState(): FireBelliedToadState {
  return {
    phase: 'away',
    position: copyPoint(TOAD_REFUGE),
    refuge: copyPoint(TOAD_REFUGE),
    routeProgress: 0,
    phaseSeconds: 0,
    tracePulseCount: 0,
    visitCount: 0,
  }
}

// 화면 쪽에서 도약 리듬으로 진행을 다시 나눌 때도 같은 경로 위를 걷도록 내보낸다.
export function toadRoutePointAt(route: ToadRoute, progress: number): Point2 {
  const clamped = Math.max(0, Math.min(1, progress))
  const wanted = route.length * clamped
  let passed = 0
  for (let index = 0; index < route.points.length - 1; index += 1) {
    const from = route.points[index]
    const to = route.points[index + 1]
    if (!from || !to) {
      continue
    }
    const segment = distance(from, to)
    if (wanted <= passed + segment || index === route.points.length - 2) {
      const amount = segment <= 0.0001 ? 0 : (wanted - passed) / segment
      return {
        x: from.x + (to.x - from.x) * Math.max(0, Math.min(1, amount)),
        z: from.z + (to.z - from.z) * Math.max(0, Math.min(1, amount)),
      }
    }
    passed += segment
  }
  return copyPoint(route.targetAt)
}

function chooseRoute(
  opportunities: readonly ToadRoute[],
  lastRouteId: string | undefined,
): ToadRoute | undefined {
  return opportunities.find(({ id }) => id !== lastRouteId) ?? opportunities[0]
}

function routeStillExists(
  route: ToadRoute | undefined,
  opportunities: readonly ToadRoute[],
): boolean {
  return Boolean(route && opportunities.some(({ id }) => id === route.id))
}

function routeIsQuiet(
  route: ToadRoute,
  input: FireBelliedToadInput,
  tuning: FirstMapToadTuning,
): boolean {
  const playerToTarget = distance(input.playerAt, route.targetAt)
  const playerToRefuge = distance(input.playerAt, TOAD_REFUGE)
  return (
    input.activeEditZoneId !== 'b-moist-soil' &&
    playerToTarget >= tuning.quietTargetDistance &&
    playerToRefuge >= tuning.quietRefugeDistance &&
    distanceToPolyline(input.playerAt, route.points) >= tuning.quietRouteDistance &&
    Math.min(playerToTarget, playerToRefuge) <= tuning.observableDistance
  )
}

function isDisturbed(
  state: FireBelliedToadState,
  input: FireBelliedToadInput,
  tuning: FirstMapToadTuning,
): boolean {
  return (
    input.activeEditZoneId === 'b-moist-soil' ||
    distance(state.position, input.playerAt) <= tuning.alertDistance
  )
}

function startRetreat(state: FireBelliedToadState): FireBelliedToadState {
  return {
    ...state,
    phase: 'away',
    lastRouteId: state.activeRoute?.id ?? state.lastRouteId,
    phaseSeconds: 0,
    tracePulseCount: 0,
  }
}

export function advanceFireBelliedToad(
  state: FireBelliedToadState,
  input: FireBelliedToadInput,
  tuning: FirstMapToadTuning = FIRST_MAP_TOAD_TUNING,
): FireBelliedToadUpdate {
  const delta = Math.max(0, Math.min(input.deltaSeconds, 0.1))

  if (state.phase === 'away' && state.activeRoute) {
    const progress = Math.max(
      0,
      state.routeProgress - (delta * tuning.retreatSpeed) / state.activeRoute.length,
    )
    if (progress <= 0) {
      return {
        state: {
          ...state,
          position: copyPoint(state.refuge),
          activeRoute: undefined,
          routeProgress: 0,
          phaseSeconds: 0,
          tracePulseCount: 0,
        },
        cues: ['refuge-rustle'],
      }
    }
    return {
      state: {
        ...state,
        position: toadRoutePointAt(state.activeRoute, progress),
        routeProgress: progress,
      },
      cues: [],
    }
  }

  if (state.phase === 'away') {
    const quietSeconds = state.phaseSeconds + delta
    const quietRoutes = input.opportunities.filter((route) =>
      routeIsQuiet(route, input, tuning),
    )
    const route = chooseRoute(quietRoutes, state.lastRouteId)
    const wait = state.visitCount === 0 ? tuning.firstTraceDelay : tuning.revisitDelay
    if (route && quietSeconds >= wait) {
      return {
        state: {
          ...state,
          phase: 'trace',
          position: copyPoint(state.refuge),
          activeRoute: route,
          routeProgress: 0,
          phaseSeconds: 0,
          tracePulseCount: 1,
        },
        cues: ['refuge-rustle'],
      }
    }
    return {
      state: { ...state, phaseSeconds: quietSeconds },
      cues: [],
    }
  }

  if (state.phase === 'trace') {
    const route = state.activeRoute
    if (
      !route ||
      !routeStillExists(route, input.opportunities) ||
      !routeIsQuiet(route, input, tuning)
    ) {
      return {
        state: {
          ...state,
          phase: 'away',
          position: copyPoint(state.refuge),
          activeRoute: undefined,
          routeProgress: 0,
          phaseSeconds: 0,
          tracePulseCount: 0,
        },
        cues: [],
      }
    }
    const phaseSeconds = state.phaseSeconds + delta
    const cues: ToadCue[] = []
    let tracePulseCount = state.tracePulseCount
    if (tracePulseCount < 2 && phaseSeconds >= tuning.traceRippleDelay) {
      cues.push('water-ripple')
      tracePulseCount = 2
    }
    if (phaseSeconds >= tuning.traceDuration) {
      return {
        state: {
          ...state,
          phase: 'approaching',
          position: toadRoutePointAt(route, 0),
          routeProgress: 0,
          phaseSeconds: 0,
          tracePulseCount,
        },
        cues,
      }
    }
    return {
      state: { ...state, phaseSeconds, tracePulseCount },
      cues,
    }
  }

  if (state.phase === 'approaching') {
    const route = state.activeRoute
    if (
      !route ||
      !routeStillExists(route, input.opportunities) ||
      isDisturbed(state, input, tuning)
    ) {
      return { state: startRetreat(state), cues: ['departure'] }
    }
    const progress = Math.min(
      1,
      state.routeProgress + (delta * tuning.approachSpeed) / route.length,
    )
    if (progress >= 1) {
      return {
        state: {
          ...state,
          phase: 'using',
          position: copyPoint(route.targetAt),
          routeProgress: 1,
          phaseSeconds: 0,
          visitCount: state.visitCount + 1,
        },
        cues: ['water-touch'],
      }
    }
    return {
      state: {
        ...state,
        position: toadRoutePointAt(route, progress),
        routeProgress: progress,
        phaseSeconds: state.phaseSeconds + delta,
      },
      cues: [],
    }
  }

  const shouldLeave =
    !state.activeRoute ||
    !routeStillExists(state.activeRoute, input.opportunities) ||
    isDisturbed(state, input, tuning) ||
    state.phaseSeconds + delta >= tuning.shallowEdgeUseDuration
  if (shouldLeave) {
    return { state: startRetreat(state), cues: ['departure'] }
  }
  return {
    state: { ...state, phaseSeconds: state.phaseSeconds + delta },
    cues: [],
  }
}

export function getOccupiedToadEditEntryIds(
  state: FireBelliedToadState,
): readonly string[] {
  if (
    !state.activeRoute ||
    state.activeRoute.kind !== 'managed' ||
    state.phase === 'trace' ||
    (state.phase === 'away' && state.routeProgress <= 0)
  ) {
    return []
  }
  return state.activeRoute.entryIds
}

function requireContract(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error('무당개구리 계약 실패: ' + message)
  }
}

export function assertFireBelliedToadContract(
  opportunities: readonly ToadRoute[],
): void {
  const protectedOpportunity = opportunities.find(({ kind }) => kind === 'protected')
  requireContract(Boolean(protectedOpportunity), '빈 편집에서도 보호 경로가 있어야 합니다.')
  if (!protectedOpportunity) {
    return
  }
  requireContract(
    protectedOpportunity.entryIds.length === 0,
    '보호 경로가 플레이어 편집물에 의존하면 안 됩니다.',
  )
  requireContract(
    !isInWater(protectedOpportunity.targetAt) &&
      distanceToPolyline(protectedOpportunity.targetAt, WATER_COURSE) <= 1.6,
    '이용 자리는 물속이 아니라 얕은 물 가장자리여야 합니다.',
  )
  requireContract(
    isInWater(protectedOpportunity.rippleAt),
    '물가 이용 흔적은 본래 물길 안에 보여야 합니다.',
  )
  for (const route of opportunities) {
    const first = route.points[0]
    const last = route.points.at(-1)
    requireContract(
      Boolean(first) &&
        Boolean(last) &&
        route.points.length >= 2 &&
        distance(first ?? TOAD_REFUGE, TOAD_REFUGE) <= 0.001 &&
        distance(last ?? route.targetAt, route.targetAt) <= 0.001 &&
        route.length > 0,
      '모든 경로는 C 피난처에서 시작해 하나의 물 가장자리에서 끝나야 합니다.',
    )
    requireContract(
      !isInWater(route.targetAt) &&
        distanceToPolyline(route.targetAt, WATER_COURSE) <= 1.7 &&
        isInWater(route.rippleAt),
      '모든 경로의 몸은 물 가장자리에, 물결은 물길 안에 놓여야 합니다.',
    )
    requireContract(
      route.kind === 'protected'
        ? route.entryIds.length === 0
        : route.entryIds.length === 1,
      '보호 경로는 편집물 없이, 관리 경로는 실제 쓰는 대표 덮임 하나로 구성해야 합니다.',
    )
  }
  const state = createFireBelliedToadState()
  requireContract(
    state.phase === 'away' && !state.activeRoute && state.routeProgress === 0,
    '처음에는 피난처에서 보이지 않게 기다려야 합니다.',
  )
  const serialized = JSON.stringify(state)
  requireContract(
    !['dead', 'lost', 'collected', 'owned', 'score', 'complete', 'recovered'].some(
      (word) => serialized.includes(word),
    ),
    '죽음·소실·수집·소유·점수·완료 상태를 만들면 안 됩니다.',
  )
}

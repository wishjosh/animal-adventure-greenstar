import { type EditSnapshot } from './edit-model.ts'
import {
  B_C_PROTECTED_COVER_PATH,
  type LocalEnvironmentSnapshot,
} from './local-environment.ts'
import { type EditZoneId, type Point2 } from '../content/first-map.ts'

export type SmallResidentKind = 'day-butterfly' | 'land-snail'
export type ResidentPhase = 'using' | 'refuge' | 'returning'
export type ResidentTargetKind =
  | 'protected-flower'
  | 'edit-flower'
  | 'protected-cover'
  | 'managed-cover'

export type ResidentTarget = Readonly<{
  id: string
  kind: ResidentTargetKind
  zoneId: EditZoneId
  at: Point2
  protected: boolean
  entryId?: string
}>

export type SmallResidentOpportunities = Readonly<{
  butterfly: readonly ResidentTarget[]
  snail: readonly ResidentTarget[]
}>

export type ResidentRuntime = Readonly<{
  kind: SmallResidentKind
  phase: ResidentPhase
  position: Point2
  refuge: Point2
  target?: ResidentTarget
  lastTargetId?: string
  motionFrom: Point2
  motionProgress: number
  phaseSeconds: number
}>

export type SmallResidentsState = Readonly<{
  butterfly: ResidentRuntime
  snail: ResidentRuntime
}>

export type SmallResidentsInput = Readonly<{
  deltaSeconds: number
  opportunities: SmallResidentOpportunities
  playerAt: Point2
  activeEditZoneId?: EditZoneId
}>

export type ResidentLeaveReason =
  | 'target-missing'
  | 'player-near'
  | 'active-edit-zone'
  | 'use-complete'

export type ResidentEvent =
  | Readonly<{
      type: 'left-target'
      kind: SmallResidentKind
      reason: ResidentLeaveReason
      targetId?: string
    }>
  | Readonly<{ type: 'reached-refuge'; kind: SmallResidentKind }>
  | Readonly<{
      type: 'started-return'
      kind: SmallResidentKind
      targetId: string
    }>
  | Readonly<{
      type: 'reached-target'
      kind: SmallResidentKind
      targetId: string
    }>

export type SmallResidentsUpdate = Readonly<{
  state: SmallResidentsState
  events: readonly ResidentEvent[]
}>

export type ResidentTuning = Readonly<{
  alertDistance: number
  returnDistance: number
  useDuration: number
  refugeDuration: number
  travelSpeed: number
}>

export type SmallResidentsTuning = Readonly<Record<SmallResidentKind, ResidentTuning>>

export const BUTTERFLY_PROTECTED_FLOWER: ResidentTarget = Object.freeze({
  id: 'butterfly-protected-a-flower',
  kind: 'protected-flower',
  zoneId: 'a-garden',
  at: { x: -7.55, z: 5.45 },
  protected: true,
})

export const SNAIL_PROTECTED_COVER: ResidentTarget = Object.freeze({
  id: 'snail-protected-bc-cover',
  kind: 'protected-cover',
  zoneId: 'b-moist-soil',
  at: B_C_PROTECTED_COVER_PATH[1] ?? { x: -3.05, z: -4.95 },
  protected: true,
})

export const SMALL_RESIDENT_REFUGES: Readonly<Record<SmallResidentKind, Point2>> = {
  'day-butterfly': { x: -6.78, z: 6.58 },
  'land-snail': B_C_PROTECTED_COVER_PATH.at(-1) ?? { x: -2.08, z: -6.7 },
}

// 거리·초·속도는 첫 제품 슬라이스의 플레이테스트용 제작값이다.
export const FIRST_MAP_SMALL_RESIDENT_TUNING: SmallResidentsTuning = {
  'day-butterfly': {
    alertDistance: 2.2,
    returnDistance: 3.35,
    useDuration: 5.5,
    refugeDuration: 2.8,
    travelSpeed: 3.2,
  },
  'land-snail': {
    alertDistance: 1.45,
    returnDistance: 2.25,
    useDuration: 8,
    refugeDuration: 5.8,
    travelSpeed: 0.48,
  },
}

const MAX_STEP_SECONDS = 0.1

const EDIT_ZONE_ORDER: Readonly<Record<EditZoneId, number>> = {
  'a-garden': 0,
  'b-bright-soil': 1,
  'b-moist-soil': 2,
}

function copyPoint(point: Point2): Point2 {
  return { x: point.x, z: point.z }
}

function distance(left: Point2, right: Point2): number {
  return Math.hypot(left.x - right.x, left.z - right.z)
}

function interpolate(from: Point2, to: Point2, amount: number): Point2 {
  return {
    x: from.x + (to.x - from.x) * amount,
    z: from.z + (to.z - from.z) * amount,
  }
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function numericEditId(target: ResidentTarget): number {
  const match = /^edit-(\d+)$/.exec(target.entryId ?? '')
  if (!match) {
    return Number.MAX_SAFE_INTEGER
  }
  const value = Number(match[1])
  return Number.isSafeInteger(value) ? value : Number.MAX_SAFE_INTEGER
}

function compareResidentTargets(left: ResidentTarget, right: ResidentTarget): number {
  if (left.protected !== right.protected) {
    return left.protected ? -1 : 1
  }
  const zoneDifference = EDIT_ZONE_ORDER[left.zoneId] - EDIT_ZONE_ORDER[right.zoneId]
  if (zoneDifference !== 0) {
    return zoneDifference
  }
  const editIdDifference = numericEditId(left) - numericEditId(right)
  if (editIdDifference !== 0) {
    return editIdDifference
  }
  return compareText(left.id, right.id)
}

export function orderResidentTargets(
  opportunities: readonly ResidentTarget[],
): readonly ResidentTarget[] {
  return [...opportunities].sort(compareResidentTargets)
}

export function selectNextEligibleTarget(
  opportunities: readonly ResidentTarget[],
  lastTargetId: string | undefined,
  isEligible: (target: ResidentTarget) => boolean = () => true,
): ResidentTarget | undefined {
  const ordered = orderResidentTargets(opportunities)
  if (ordered.length === 0) {
    return undefined
  }
  const lastIndex = lastTargetId
    ? ordered.findIndex(({ id }) => id === lastTargetId)
    : -1
  const startIndex = lastIndex >= 0 ? (lastIndex + 1) % ordered.length : 0
  for (let offset = 0; offset < ordered.length; offset += 1) {
    const target = ordered[(startIndex + offset) % ordered.length]
    if (target && isEligible(target)) {
      return target
    }
  }
  return undefined
}

function targetStillExists(
  target: ResidentTarget | undefined,
  opportunities: readonly ResidentTarget[],
): ResidentTarget | undefined {
  if (!target) {
    return undefined
  }
  return opportunities.find(({ id }) => id === target.id)
}

function disturbanceReason(
  runtime: ResidentRuntime,
  playerAt: Point2,
  activeEditZoneId: EditZoneId | undefined,
  tuning: ResidentTuning,
): ResidentLeaveReason | undefined {
  if (distance(runtime.position, playerAt) <= tuning.alertDistance) {
    return 'player-near'
  }
  if (activeEditZoneId && runtime.target?.zoneId === activeEditZoneId) {
    return 'active-edit-zone'
  }
  return undefined
}

function targetIsQuiet(
  target: ResidentTarget,
  playerAt: Point2,
  activeEditZoneId: EditZoneId | undefined,
  tuning: ResidentTuning,
): boolean {
  return (
    distance(target.at, playerAt) >= tuning.returnDistance &&
    target.zoneId !== activeEditZoneId
  )
}

type ResidentAdvance = Readonly<{
  runtime: ResidentRuntime
  events: readonly ResidentEvent[]
}>

function startRefuge(
  runtime: ResidentRuntime,
  reason: ResidentLeaveReason,
): ResidentAdvance {
  const targetId = runtime.target?.id
  return {
    runtime: {
      ...runtime,
      phase: 'refuge',
      lastTargetId: targetId ?? runtime.lastTargetId,
      motionFrom: copyPoint(runtime.position),
      motionProgress: 0,
      phaseSeconds: 0,
    },
    events: [
      {
        type: 'left-target',
        kind: runtime.kind,
        reason,
        ...(targetId ? { targetId } : {}),
      },
    ],
  }
}

function safeDelta(deltaSeconds: number): number {
  return Number.isFinite(deltaSeconds)
    ? Math.max(0, Math.min(deltaSeconds, MAX_STEP_SECONDS))
    : 0
}

function advanceResident(
  runtime: ResidentRuntime,
  opportunities: readonly ResidentTarget[],
  input: SmallResidentsInput,
  tuning: ResidentTuning,
): ResidentAdvance {
  const delta = safeDelta(input.deltaSeconds)

  if (runtime.phase === 'using') {
    const currentTarget = targetStillExists(runtime.target, opportunities)
    if (!currentTarget) {
      return startRefuge(runtime, 'target-missing')
    }
    const disturbed = disturbanceReason(
      { ...runtime, target: currentTarget },
      input.playerAt,
      input.activeEditZoneId,
      tuning,
    )
    if (disturbed) {
      return startRefuge({ ...runtime, target: currentTarget }, disturbed)
    }
    if (runtime.phaseSeconds + delta >= tuning.useDuration) {
      return startRefuge({ ...runtime, target: currentTarget }, 'use-complete')
    }
    return {
      runtime: {
        ...runtime,
        target: currentTarget,
        position: copyPoint(currentTarget.at),
        phaseSeconds: runtime.phaseSeconds + delta,
      },
      events: [],
    }
  }

  if (runtime.phase === 'refuge') {
    if (runtime.motionProgress < 1) {
      const journey = Math.max(0.001, distance(runtime.motionFrom, runtime.refuge))
      const progress = Math.min(
        1,
        runtime.motionProgress + (delta * tuning.travelSpeed) / journey,
      )
      const arrived = progress >= 1
      return {
        runtime: {
          ...runtime,
          position: interpolate(runtime.motionFrom, runtime.refuge, progress),
          motionProgress: progress,
          phaseSeconds: arrived ? 0 : runtime.phaseSeconds,
          ...(arrived ? { target: undefined } : {}),
        },
        events: arrived ? [{ type: 'reached-refuge', kind: runtime.kind }] : [],
      }
    }

    const quietSeconds = runtime.phaseSeconds + delta
    const target =
      quietSeconds >= tuning.refugeDuration
        ? selectNextEligibleTarget(
            opportunities,
            runtime.lastTargetId,
            (candidate) =>
              targetIsQuiet(
                candidate,
                input.playerAt,
                input.activeEditZoneId,
                tuning,
              ),
          )
        : undefined
    if (target) {
      return {
        runtime: {
          ...runtime,
          phase: 'returning',
          target,
          motionFrom: copyPoint(runtime.position),
          motionProgress: 0,
          phaseSeconds: 0,
        },
        events: [
          { type: 'started-return', kind: runtime.kind, targetId: target.id },
        ],
      }
    }
    return {
      runtime: { ...runtime, phaseSeconds: quietSeconds },
      events: [],
    }
  }

  const currentTarget = targetStillExists(runtime.target, opportunities)
  if (!currentTarget) {
    return startRefuge(runtime, 'target-missing')
  }
  const disturbed = disturbanceReason(
    { ...runtime, target: currentTarget },
    input.playerAt,
    input.activeEditZoneId,
    tuning,
  )
  if (disturbed) {
    return startRefuge({ ...runtime, target: currentTarget }, disturbed)
  }

  const journey = Math.max(0.001, distance(runtime.motionFrom, currentTarget.at))
  const progress = Math.min(
    1,
    runtime.motionProgress + (delta * tuning.travelSpeed) / journey,
  )
  if (progress >= 1) {
    return {
      runtime: {
        ...runtime,
        phase: 'using',
        target: currentTarget,
        position: copyPoint(currentTarget.at),
        motionFrom: copyPoint(currentTarget.at),
        motionProgress: 1,
        phaseSeconds: 0,
      },
      events: [
        { type: 'reached-target', kind: runtime.kind, targetId: currentTarget.id },
      ],
    }
  }
  return {
    runtime: {
      ...runtime,
      target: currentTarget,
      position: interpolate(runtime.motionFrom, currentTarget.at, progress),
      motionProgress: progress,
      phaseSeconds: runtime.phaseSeconds + delta,
    },
    events: [],
  }
}

export function deriveSmallResidentOpportunities(
  edit: EditSnapshot,
  environment: LocalEnvironmentSnapshot,
): SmallResidentOpportunities {
  const butterfly: ResidentTarget[] = [BUTTERFLY_PROTECTED_FLOWER]
  for (const zoneId of ['a-garden', 'b-bright-soil'] as const) {
    const reading = environment.zones[zoneId]
    if (reading.light === 'shaded' || reading.opening === 'sheltered') {
      continue
    }
    for (const entry of Object.values(edit[zoneId])) {
      if (entry.kind !== 'low-flower') {
        continue
      }
      butterfly.push({
        id: 'butterfly-' + entry.id,
        kind: 'edit-flower',
        zoneId,
        at: copyPoint(entry.at),
        protected: false,
        entryId: entry.id,
      })
    }
  }

  const snail: ResidentTarget[] = [SNAIL_PROTECTED_COVER]
  if (
    environment.zones['b-moist-soil'].surfaceMoisture === 'moist' &&
    environment.bToC.managedCover === 'joined'
  ) {
    for (const cover of environment.bToC.connectedCover) {
      snail.push({
        id: 'snail-' + cover.id,
        kind: 'managed-cover',
        zoneId: 'b-moist-soil',
        at: copyPoint(cover.at),
        protected: false,
        entryId: cover.id,
      })
    }
  }

  return {
    butterfly: orderResidentTargets(butterfly),
    snail: orderResidentTargets(snail),
  }
}

function createRuntime(
  kind: SmallResidentKind,
  opportunities: readonly ResidentTarget[],
): ResidentRuntime {
  const refuge = SMALL_RESIDENT_REFUGES[kind]
  const ordered = orderResidentTargets(opportunities)
  const target = ordered.find((candidate) => candidate.protected) ?? ordered[0]
  if (!target) {
    return {
      kind,
      phase: 'refuge',
      position: copyPoint(refuge),
      refuge: copyPoint(refuge),
      motionFrom: copyPoint(refuge),
      motionProgress: 1,
      phaseSeconds: 0,
    }
  }
  return {
    kind,
    phase: 'using',
    position: copyPoint(target.at),
    refuge: copyPoint(refuge),
    target,
    motionFrom: copyPoint(target.at),
    motionProgress: 1,
    phaseSeconds: 0,
  }
}

export function createSmallResidentsState(
  opportunities: SmallResidentOpportunities,
): SmallResidentsState {
  return {
    butterfly: createRuntime('day-butterfly', opportunities.butterfly),
    snail: createRuntime('land-snail', opportunities.snail),
  }
}

export function advanceSmallResidents(
  state: SmallResidentsState,
  input: SmallResidentsInput,
  tuning: SmallResidentsTuning = FIRST_MAP_SMALL_RESIDENT_TUNING,
): SmallResidentsUpdate {
  const butterfly = advanceResident(
    state.butterfly,
    input.opportunities.butterfly,
    input,
    tuning['day-butterfly'],
  )
  const snail = advanceResident(
    state.snail,
    input.opportunities.snail,
    input,
    tuning['land-snail'],
  )
  return {
    state: {
      butterfly: butterfly.runtime,
      snail: snail.runtime,
    },
    events: [...butterfly.events, ...snail.events],
  }
}

export function getOccupiedEditEntryIds(state: SmallResidentsState): readonly string[] {
  return [state.butterfly, state.snail]
    .filter(
      (runtime) =>
        Boolean(runtime.target?.entryId) &&
        (runtime.phase !== 'refuge' || runtime.motionProgress < 1),
    )
    .flatMap((runtime) => (runtime.target?.entryId ? [runtime.target.entryId] : []))
    .sort(compareText)
}

function requireContract(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error('작은 주민 계약 실패: ' + message)
  }
}

function assertOpportunityList(
  kind: SmallResidentKind,
  opportunities: readonly ResidentTarget[],
): void {
  const ids = new Set<string>()
  for (const target of opportunities) {
    requireContract(!ids.has(target.id), kind + ' 후보 ID가 겹치면 안 됩니다.')
    requireContract(
      Number.isFinite(target.at.x) && Number.isFinite(target.at.z),
      kind + ' 후보 좌표는 유한해야 합니다.',
    )
    ids.add(target.id)
  }
}

export function assertSmallResidentsContract(
  opportunities: SmallResidentOpportunities,
): void {
  assertOpportunityList('day-butterfly', opportunities.butterfly)
  assertOpportunityList('land-snail', opportunities.snail)
  const state = createSmallResidentsState(opportunities)
  requireContract(
    opportunities.butterfly.some((target) => target.protected) &&
      opportunities.snail.some((target) => target.protected),
    '빈 편집에서도 두 주민의 보호 이용 자리가 있어야 합니다.',
  )
  requireContract(
    state.butterfly.target?.protected === true && state.snail.target?.protected === true,
    '새 세션은 두 주민의 보호 자리에서 시작해야 합니다.',
  )
  requireContract(
    state.butterfly.kind === 'day-butterfly' && state.snail.kind === 'land-snail',
    '나비와 달팽이의 종류는 서로 바뀌면 안 됩니다.',
  )
  const serialized = JSON.stringify(state)
  requireContract(
    !['dead', 'lost', 'collected', 'owned', 'score'].some((word) =>
      serialized.includes(word),
    ),
    '죽음·소실·수집·소유·점수 상태를 만들면 안 됩니다.',
  )
}

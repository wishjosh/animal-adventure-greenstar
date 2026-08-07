import type { EditGuard, PersistentEditState } from '../domain/edit-model.ts'
import {
  advanceFireBelliedToad,
  assertFireBelliedToadContract,
  createFireBelliedToadState,
  deriveToadOpportunities,
  getOccupiedToadEditEntryIds,
  type FireBelliedToadState,
  type ToadCue,
  type ToadRoute,
} from '../domain/fire-bellied-toad.ts'
import type { LocalEnvironmentSnapshot } from '../domain/local-environment.ts'
import {
  advanceSmallResidents,
  assertSmallResidentsContract,
  createSmallResidentsState,
  deriveSmallResidentOpportunities,
  getOccupiedEditEntryIds,
  type ResidentEvent,
  type SmallResidentOpportunities,
  type SmallResidentsState,
} from '../domain/small-residents.ts'
import type { EditZoneId, Point2 } from '../content/first-map.ts'

export type ResidentsSnapshot = Readonly<{
  smallResidents: SmallResidentsState
  toad: FireBelliedToadState
  smallOpportunities: SmallResidentOpportunities
  toadOpportunities: readonly ToadRoute[]
  editRevision: number
  lastEventId: number
}>

export type ResidentsFrameInput = Readonly<{
  deltaSeconds: number
  editState: PersistentEditState
  environment: LocalEnvironmentSnapshot
  playerAt: Point2
  activeEditZoneId?: EditZoneId
  started: boolean
  blocked: boolean
}>

export type ResidentsFrame = Readonly<{
  snapshot: ResidentsSnapshot
  smallEvents: readonly ResidentEvent[]
  toadCues: readonly ToadCue[]
}>

function uniqueSorted(ids: readonly string[]): readonly string[] {
  return [...new Set(ids)].sort((left, right) => left.localeCompare(right))
}

/**
 * 저장 대상이 아닌 현재 페이지의 생태 행동을 맡는다.
 * 재접속과 새로 걷기에서는 저장된 편집 모습으로 기회를 다시 만들고 피난처 상태부터 시작한다.
 */
export class ResidentsRuntime {
  private smallOpportunities: SmallResidentOpportunities
  private toadOpportunities: readonly ToadRoute[]
  private smallResidents: SmallResidentsState
  private toad: FireBelliedToadState
  private editRevision: number
  private lastEventId = 0

  constructor(editState: PersistentEditState, environment: LocalEnvironmentSnapshot) {
    this.editRevision = editState.revision
    this.smallOpportunities = deriveSmallResidentOpportunities(
      editState.current,
      environment,
    )
    this.toadOpportunities = deriveToadOpportunities(environment)
    assertSmallResidentsContract(this.smallOpportunities)
    assertFireBelliedToadContract(this.toadOpportunities)
    this.smallResidents = createSmallResidentsState(this.smallOpportunities)
    this.toad = createFireBelliedToadState()
  }

  reset(editState: PersistentEditState, environment: LocalEnvironmentSnapshot): void {
    this.editRevision = editState.revision
    this.smallOpportunities = deriveSmallResidentOpportunities(
      editState.current,
      environment,
    )
    this.toadOpportunities = deriveToadOpportunities(environment)
    assertSmallResidentsContract(this.smallOpportunities)
    assertFireBelliedToadContract(this.toadOpportunities)
    this.smallResidents = createSmallResidentsState(this.smallOpportunities)
    this.toad = createFireBelliedToadState()
    this.lastEventId = 0
  }

  advance(input: ResidentsFrameInput): ResidentsFrame {
    if (!input.started || input.blocked) {
      return { snapshot: this.snapshot(), smallEvents: [], toadCues: [] }
    }

    if (input.editState.revision !== this.editRevision) {
      this.editRevision = input.editState.revision
      this.smallOpportunities = deriveSmallResidentOpportunities(
        input.editState.current,
        input.environment,
      )
      this.toadOpportunities = deriveToadOpportunities(input.environment)
    }

    const common = {
      deltaSeconds: input.deltaSeconds,
      playerAt: input.playerAt,
      ...(input.activeEditZoneId
        ? { activeEditZoneId: input.activeEditZoneId }
        : {}),
    }
    const smallUpdate = advanceSmallResidents(this.smallResidents, {
      ...common,
      opportunities: this.smallOpportunities,
    })
    const toadUpdate = advanceFireBelliedToad(this.toad, {
      ...common,
      opportunities: this.toadOpportunities,
    })
    this.smallResidents = smallUpdate.state
    this.toad = toadUpdate.state
    this.lastEventId += smallUpdate.events.length + toadUpdate.cues.length

    return {
      snapshot: this.snapshot(),
      smallEvents: smallUpdate.events,
      toadCues: toadUpdate.cues,
    }
  }

  snapshot(): ResidentsSnapshot {
    return {
      smallResidents: this.smallResidents,
      toad: this.toad,
      smallOpportunities: this.smallOpportunities,
      toadOpportunities: this.toadOpportunities,
      editRevision: this.editRevision,
      lastEventId: this.lastEventId,
    }
  }

  occupiedEditEntryIds(): readonly string[] {
    return uniqueSorted([
      ...getOccupiedEditEntryIds(this.smallResidents),
      ...getOccupiedToadEditEntryIds(this.toad),
    ])
  }

  editGuard(): EditGuard {
    return { occupiedEntryIds: this.occupiedEditEntryIds() }
  }
}

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
import type { PersistentPlantGrowthState } from '../domain/plant-growth.ts'
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
  ecologyRevision: number
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
  /** 편집 외의 성장 단계·습기 같은 생태 조건이 달라졌음을 알리는 값이다. */
  ecologyRevision?: number
  /** 생략하면 기존처럼 심은 모든 꽃을 즉시 이용 후보로 본다. */
  plantGrowth?: PersistentPlantGrowthState
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
  private ecologyRevision: number
  private plantGrowthEnabled: boolean
  private lastEventId = 0

  constructor(
    editState: PersistentEditState,
    environment: LocalEnvironmentSnapshot,
    plantGrowth?: PersistentPlantGrowthState,
    ecologyRevision = editState.revision,
  ) {
    this.editRevision = editState.revision
    this.ecologyRevision = ecologyRevision
    this.plantGrowthEnabled = plantGrowth !== undefined
    this.smallOpportunities = deriveSmallResidentOpportunities(
      editState.current,
      environment,
      plantGrowth,
    )
    this.toadOpportunities = deriveToadOpportunities(environment)
    assertSmallResidentsContract(this.smallOpportunities)
    assertFireBelliedToadContract(this.toadOpportunities)
    this.smallResidents = createSmallResidentsState(this.smallOpportunities)
    this.toad = createFireBelliedToadState()
  }

  reset(
    editState: PersistentEditState,
    environment: LocalEnvironmentSnapshot,
    plantGrowth?: PersistentPlantGrowthState,
    ecologyRevision = editState.revision,
  ): void {
    this.editRevision = editState.revision
    this.ecologyRevision = ecologyRevision
    this.plantGrowthEnabled = plantGrowth !== undefined
    this.smallOpportunities = deriveSmallResidentOpportunities(
      editState.current,
      environment,
      plantGrowth,
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

    const nextEcologyRevision = input.ecologyRevision ?? input.editState.revision
    const nextPlantGrowthEnabled = input.plantGrowth !== undefined
    if (
      input.editState.revision !== this.editRevision ||
      nextEcologyRevision !== this.ecologyRevision ||
      nextPlantGrowthEnabled !== this.plantGrowthEnabled
    ) {
      this.editRevision = input.editState.revision
      this.ecologyRevision = nextEcologyRevision
      this.plantGrowthEnabled = nextPlantGrowthEnabled
      this.smallOpportunities = deriveSmallResidentOpportunities(
        input.editState.current,
        input.environment,
        input.plantGrowth,
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
      ecologyRevision: this.ecologyRevision,
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

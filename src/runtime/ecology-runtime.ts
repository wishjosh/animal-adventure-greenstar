import {
  CARE_ZONE_IDS,
  type CareZoneId,
  type EditZoneId,
  type Point2,
} from '../content/first-map.ts'
import {
  applyEdit,
  canUndo,
  createEditSession,
  MAX_UNDO_PER_ZONE,
  toPersistentEditState,
  type EditCommand,
  type EditGuard,
  type EditRejection,
  type EditSession,
  type PersistentEditState,
} from '../domain/edit-model.ts'
import {
  evaluateLocalEnvironment,
  type LocalEnvironmentSnapshot,
  type SurfaceMoistureByZone,
} from '../domain/local-environment.ts'
import {
  advancePlantGrowthState,
  createPlantGrowthState,
  derivePlantGrowth,
  migrateLegacyLowFlowersAsAdults,
  syncPlantGrowthState,
  type PersistentPlantGrowthState,
  type PlantGrowthRecord,
} from '../domain/plant-growth.ts'
import {
  advanceSurfaceMoisture,
  createSurfaceMoistureRuntime,
  readSurfaceMoisture,
  type SurfaceMoistureRuntime,
} from '../domain/surface-moisture.ts'
import { drainageEntryIdsNearPoint } from '../domain/drainage-network.ts'
import {
  createWateringCan,
  fillWateringCan,
  pourOnZone,
  wateringCanLevel,
  type PourRejection,
  type WateringCanState,
} from '../domain/watering-can.ts'
import { type WaterSourceId } from '../content/first-map.ts'

const MAX_ARCHIVED_GROWTH = CARE_ZONE_IDS.length * MAX_UNDO_PER_ZONE

function isCareZoneId(zoneId: EditZoneId): zoneId is CareZoneId {
  return (CARE_ZONE_IDS as readonly EditZoneId[]).includes(zoneId)
}

export type EcologyEditResult = Readonly<{
  changed: boolean
  entryId?: string
  rejection?:
    | EditRejection
    | 'editing-inactive'
    | 'editing-blocked'
    | 'different-zone'
    | 'plant-too-young'
}>

export type EcologyWaterResult = Readonly<{
  changed: boolean
  rejection?: PourRejection | 'editing-inactive' | 'editing-blocked' | 'care-zone-only'
}>

export type EcologySnapshot = Readonly<{
  activeZoneId?: EditZoneId
  editState: PersistentEditState
  environment: LocalEnvironmentSnapshot
  canUndoActiveZone: boolean
  blocked: boolean
  /** 물뿌리개에 남은 물높이다. 0이면 비었고 1이면 가득 찼다. */
  wateringCanLevel: number
  surfaceMoisture: SurfaceMoistureByZone
  /** 마지막으로 물을 준 지점과 실제로 이어진 작은 물길 조각이다. */
  wetDrainageEntryIds: readonly string[]
  plantGrowth: PersistentPlantGrowthState
  /** 편집 외에도 물기·성장 단계가 생태 판정을 바꾼 횟수다. */
  ecologyRevision: number
}>

export type PlantGrowthFrame = Readonly<{
  changed: boolean
  stageChanged: boolean
}>

export class EcologyRuntime {
  private session: EditSession
  private environment: LocalEnvironmentSnapshot
  private activeZoneId: EditZoneId | undefined
  private blocked = false
  private moisture: SurfaceMoistureRuntime
  private moistureReading: SurfaceMoistureByZone
  private can: WateringCanState
  private growth: PersistentPlantGrowthState
  private readonly archivedGrowth = new Map<string, PlantGrowthRecord>()
  private worldElapsed: number
  private ecologyRevision = 0

  constructor(
    restored?: PersistentEditState,
    restoredGrowth?: PersistentPlantGrowthState,
    worldElapsed = 0,
  ) {
    this.session = createEditSession(restored)
    this.worldElapsed = Math.max(0, Number.isFinite(worldElapsed) ? worldElapsed : 0)
    this.growth = restoredGrowth
      ? syncPlantGrowthState(restoredGrowth, this.session.state, this.worldElapsed)
      : restored
        ? migrateLegacyLowFlowersAsAdults(this.session.state, this.worldElapsed)
        : syncPlantGrowthState(createPlantGrowthState(), this.session.state, this.worldElapsed)
    // 저장에는 습기를 남기지 않는다. 재접속하면 자리의 기본 조건에서 다시 시작한다.
    this.moisture = createSurfaceMoistureRuntime()
    this.moistureReading = readSurfaceMoisture(this.moisture)
    this.can = createWateringCan()
    this.environment = this.evaluateEnvironment()
  }

  private evaluateEnvironment(): LocalEnvironmentSnapshot {
    return evaluateLocalEnvironment(
      this.session.state,
      undefined,
      undefined,
      this.moistureReading,
      this.growth,
    )
  }

  private reevaluate(): void {
    this.environment = this.evaluateEnvironment()
  }

  private stageSignature(state: PersistentPlantGrowthState): string {
    return Object.entries(state.byEntryId)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([id, record]) => id + ':' + derivePlantGrowth(record, this.worldElapsed).stage)
      .join(',')
  }

  setBlocked(blocked: boolean): void {
    this.blocked = blocked
  }

  /**
   * 세계 시간만큼 표면을 말린다.
   * 젖음과 마름이 실제로 뒤바뀐 순간에만 국소 환경을 다시 판정하고,
   * 매 프레임 재판정하지 않는다.
   */
  advanceMoisture(deltaSeconds: number): boolean {
    if (this.blocked) {
      return false
    }
    this.moisture = advanceSurfaceMoisture(this.moisture, {
      deltaSeconds,
      environment: this.environment,
      editState: this.session.state,
    })
    const reading = readSurfaceMoisture(this.moisture)
    const flipped = (Object.keys(reading) as CareZoneId[]).some(
      (zoneId) => reading[zoneId] !== this.moistureReading[zoneId],
    )
    this.moistureReading = reading
    if (flipped) {
      this.reevaluate()
      this.ecologyRevision += 1
    }
    return flipped
  }

  /** 우물이나 개울에 닿았을 때 물뿌리개를 채운다. */
  fill(source: WaterSourceId | undefined): boolean {
    if (this.blocked) {
      return false
    }
    const result = fillWateringCan(this.can, source)
    this.can = result.can
    return result.changed
  }

  /** 지금 손보는 흙자리에 물을 준다. 되돌리기 이력에는 남기지 않는다. */
  water(at?: Point2): EcologyWaterResult {
    if (this.blocked) {
      return { changed: false, rejection: 'editing-blocked' }
    }
    if (!this.activeZoneId) {
      return { changed: false, rejection: 'editing-inactive' }
    }
    if (!isCareZoneId(this.activeZoneId)) {
      return { changed: false, rejection: 'care-zone-only' }
    }
    const result = pourOnZone(this.can, this.moisture, this.activeZoneId, at)
    if (!result.poured) {
      return {
        changed: false,
        ...(result.rejection ? { rejection: result.rejection } : {}),
      }
    }
    this.can = result.can
    this.moisture = result.moisture
    this.moistureReading = readSurfaceMoisture(this.moisture)
    this.reevaluate()
    this.ecologyRevision += 1
    return { changed: true }
  }

  enter(zoneId: EditZoneId): void {
    if (!this.blocked) {
      this.activeZoneId = zoneId
    }
  }

  exit(): void {
    this.activeZoneId = undefined
  }

  reset(
    restored?: PersistentEditState,
    restoredGrowth?: PersistentPlantGrowthState,
    worldElapsed = 0,
  ): void {
    this.session = createEditSession(restored)
    this.worldElapsed = Math.max(0, Number.isFinite(worldElapsed) ? worldElapsed : 0)
    this.growth = restoredGrowth
      ? syncPlantGrowthState(restoredGrowth, this.session.state, this.worldElapsed)
      : restored
        ? migrateLegacyLowFlowersAsAdults(this.session.state, this.worldElapsed)
        : syncPlantGrowthState(createPlantGrowthState(), this.session.state, this.worldElapsed)
    this.archivedGrowth.clear()
    this.moisture = createSurfaceMoistureRuntime()
    this.moistureReading = readSurfaceMoisture(this.moisture)
    this.can = createWateringCan()
    this.reevaluate()
    this.activeZoneId = undefined
    this.blocked = false
    this.ecologyRevision = 0
  }

  apply(command: EditCommand, guard: EditGuard = {}): EcologyEditResult {
    if (this.blocked) {
      return { changed: false, rejection: 'editing-blocked' }
    }
    if (!this.activeZoneId) {
      return { changed: false, rejection: 'editing-inactive' }
    }
    if (command.zoneId !== this.activeZoneId) {
      return { changed: false, rejection: 'different-zone' }
    }
    if (command.type === 'thin') {
      const entry = this.session.state.current[command.zoneId][command.id]
      const record = this.growth.byEntryId[command.id]
      if (
        entry?.kind === 'low-flower' &&
        (!record || derivePlantGrowth(record, this.worldElapsed).stage === 'seed')
      ) {
        return { changed: false, rejection: 'plant-too-young' }
      }
    }
    const previousGrowth = this.growth
    const result = applyEdit(this.session, command, guard)
    if (result.changed) {
      this.session = result.session
      const currentIds = new Set(
        Object.values(this.session.state.current)
          .flatMap((overlay) => Object.values(overlay))
          .filter((entry) => entry.kind === 'low-flower')
          .map((entry) => entry.id),
      )
      for (const [id, record] of Object.entries(previousGrowth.byEntryId)) {
        if (!currentIds.has(id)) {
          this.archivedGrowth.set(id, record)
        }
      }
      while (this.archivedGrowth.size > MAX_ARCHIVED_GROWTH) {
        const oldestId = this.archivedGrowth.keys().next().value as string | undefined
        if (!oldestId) {
          break
        }
        this.archivedGrowth.delete(oldestId)
      }
      let nextGrowth = syncPlantGrowthState(
        previousGrowth,
        this.session.state,
        this.worldElapsed,
      )
      const restoredRecords = { ...nextGrowth.byEntryId }
      let restoredArchived = false
      for (const id of currentIds) {
        if (!previousGrowth.byEntryId[id]) {
          const archived = this.archivedGrowth.get(id)
          if (archived) {
            restoredRecords[id] = archived
            this.archivedGrowth.delete(id)
            restoredArchived = true
          }
        }
      }
      if (restoredArchived) {
        nextGrowth = { byEntryId: restoredRecords }
      }
      this.growth = nextGrowth
      this.reevaluate()
      this.ecologyRevision += 1
    }
    return {
      changed: result.changed,
      ...(result.entryId ? { entryId: result.entryId } : {}),
      ...(result.rejection ? { rejection: result.rejection } : {}),
    }
  }

  persistentState(): PersistentEditState {
    return toPersistentEditState(this.session)
  }

  persistentPlantGrowthState(): PersistentPlantGrowthState {
    return {
      byEntryId: Object.fromEntries(
        Object.entries(this.growth.byEntryId).map(([id, record]) => [id, { ...record }]),
      ),
    }
  }

  /** 세계가 실제로 흐른 시간만큼 식물을 키운다. 단계 경계에서만 생태를 재판정한다. */
  advancePlantGrowth(
    deltaSeconds: number,
    worldElapsed: number,
    worldRunning: boolean,
  ): PlantGrowthFrame {
    this.worldElapsed = Math.max(
      this.worldElapsed,
      Number.isFinite(worldElapsed) ? worldElapsed : this.worldElapsed,
    )
    const before = this.growth
    const beforeStages = this.stageSignature(before)
    const next = advancePlantGrowthState(before, this.session.state, {
      deltaSeconds,
      worldElapsed: this.worldElapsed,
      worldRunning: worldRunning && !this.blocked,
      environment: this.environment,
    })
    const changed = next !== before
    if (!changed) {
      return { changed: false, stageChanged: false }
    }
    this.growth = next
    const stageChanged = beforeStages !== this.stageSignature(next)
    if (stageChanged) {
      this.reevaluate()
      this.ecologyRevision += 1
    }
    return { changed: true, stageChanged }
  }

  snapshot(guard: EditGuard = {}): EcologySnapshot {
    const wetCareDrainageEntryIds = CARE_ZONE_IDS.flatMap((zoneId) => {
      const moisture = this.moisture[zoneId]
      return moisture.wetness > 0 && moisture.wateredAt
        ? drainageEntryIdsNearPoint(
            this.session.state,
            zoneId,
            moisture.wateredAt,
          )
        : []
    })
    // 발원지 가장자리의 홈은 물뿌리개가 아니라 위쪽의 샘물과 낙엽물이 지난다.
    // 따라서 현재 상류 편집에 남아 있는 홈 자체를 젖은 홈으로 그린다.
    const wetHeadwaterDrainageEntryIds = Object.values(
      this.session.state.current['d-headwater-edge'],
    )
      .filter((entry) => entry.kind === 'drainage-segment')
      .map((entry) => entry.id)
      .sort((left, right) => left.localeCompare(right))
    return {
      ...(this.activeZoneId ? { activeZoneId: this.activeZoneId } : {}),
      editState: this.session.state,
      environment: this.environment,
      canUndoActiveZone: this.activeZoneId
        ? canUndo(this.session, this.activeZoneId, guard)
        : false,
      blocked: this.blocked,
      wateringCanLevel: wateringCanLevel(this.can),
      surfaceMoisture: this.moistureReading,
      wetDrainageEntryIds: [
        ...wetCareDrainageEntryIds,
        ...wetHeadwaterDrainageEntryIds,
      ],
      plantGrowth: this.growth,
      ecologyRevision: this.ecologyRevision,
    }
  }
}

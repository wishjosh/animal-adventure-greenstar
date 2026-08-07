import { type EditZoneId } from '../content/first-map.ts'
import {
  applyEdit,
  canUndo,
  createEditSession,
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
  advanceSurfaceMoisture,
  createSurfaceMoistureRuntime,
  readSurfaceMoisture,
  type SurfaceMoistureRuntime,
} from '../domain/surface-moisture.ts'
import {
  createWateringCan,
  fillWateringCan,
  pourOnZone,
  wateringCanLevel,
  type PourRejection,
  type WateringCanState,
} from '../domain/watering-can.ts'
import { type WaterSourceId } from '../content/first-map.ts'

export type EcologyEditResult = Readonly<{
  changed: boolean
  entryId?: string
  rejection?: EditRejection | 'editing-inactive' | 'editing-blocked' | 'different-zone'
}>

export type EcologyWaterResult = Readonly<{
  changed: boolean
  rejection?: PourRejection | 'editing-inactive' | 'editing-blocked'
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
}>

export class EcologyRuntime {
  private session: EditSession
  private environment: LocalEnvironmentSnapshot
  private activeZoneId: EditZoneId | undefined
  private blocked = false
  private moisture: SurfaceMoistureRuntime
  private moistureReading: SurfaceMoistureByZone
  private can: WateringCanState

  constructor(restored?: PersistentEditState) {
    this.session = createEditSession(restored)
    // 저장에는 습기를 남기지 않는다. 재접속하면 자리의 기본 조건에서 다시 시작한다.
    this.moisture = createSurfaceMoistureRuntime()
    this.moistureReading = readSurfaceMoisture(this.moisture)
    this.can = createWateringCan()
    this.environment = evaluateLocalEnvironment(
      this.session.state,
      undefined,
      undefined,
      this.moistureReading,
    )
  }

  private reevaluate(): void {
    this.environment = evaluateLocalEnvironment(
      this.session.state,
      undefined,
      undefined,
      this.moistureReading,
    )
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
    const flipped = (Object.keys(reading) as EditZoneId[]).some(
      (zoneId) => reading[zoneId] !== this.moistureReading[zoneId],
    )
    this.moistureReading = reading
    if (flipped) {
      this.reevaluate()
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
  water(): EcologyWaterResult {
    if (this.blocked) {
      return { changed: false, rejection: 'editing-blocked' }
    }
    if (!this.activeZoneId) {
      return { changed: false, rejection: 'editing-inactive' }
    }
    const result = pourOnZone(this.can, this.moisture, this.activeZoneId)
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

  reset(restored?: PersistentEditState): void {
    this.session = createEditSession(restored)
    this.moisture = createSurfaceMoistureRuntime()
    this.moistureReading = readSurfaceMoisture(this.moisture)
    this.can = createWateringCan()
    this.reevaluate()
    this.activeZoneId = undefined
    this.blocked = false
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
    const result = applyEdit(this.session, command, guard)
    if (result.changed) {
      this.session = result.session
      this.reevaluate()
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

  snapshot(guard: EditGuard = {}): EcologySnapshot {
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
    }
  }
}

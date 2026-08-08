import {
  START_POSITION,
  getPlaceAt,
  isWalkable,
  type Place,
  type Point2,
} from '../content/first-map.ts'
import type { InputFrame } from '../input/input-state.ts'

const MOVE_SPEED = 6.3
const MIN_CAMERA_DISTANCE = 7.2
const MAX_CAMERA_DISTANCE = 14

export const CAMERA_DISTANCE_RANGE = Object.freeze({ minimum: 7.2, maximum: 14 })

export type PersistentGameState = Readonly<{
  playerAt: Point2
  playerHeading: number
  cameraYaw: number
  cameraDistance: number
  elapsed: number
}>

export type GameSnapshot = Readonly<{
  playerAt: Point2
  playerHeading: number
  cameraYaw: number
  cameraDistance: number
  place: Place | undefined
  elapsed: number
  started: boolean
  blocked: boolean
}>

export type MovementObstacle =
  | Readonly<{ kind: 'circle'; at: Point2; radius: number }>
  | Readonly<{
      kind: 'oriented-box'
      at: Point2
      rotation: number
      halfLength: number
      halfWidth: number
    }>

const PLAYER_RADIUS = 0.18

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.max(minimum, Math.min(maximum, value))
}

export class GameRuntime {
  private playerX = START_POSITION.x
  private playerZ = START_POSITION.z
  private playerHeading = 0
  private cameraYaw = -Math.PI / 2
  private cameraDistance = 10.5
  private elapsed = 0
  private started = false
  private blocked = false
  private obstacles: readonly MovementObstacle[] = []

  constructor(restored?: PersistentGameState) {
    if (restored) {
      this.restore(restored)
    }
  }

  start(): void {
    this.started = true
  }

  setBlocked(blocked: boolean): void {
    this.blocked = blocked
  }

  setMovementObstacles(obstacles: readonly MovementObstacle[]): void {
    this.obstacles = obstacles.map((obstacle) => ({
      ...obstacle,
      at: { x: obstacle.at.x, z: obstacle.at.z },
    }))
  }

  reset(restored?: PersistentGameState): void {
    this.playerX = START_POSITION.x
    this.playerZ = START_POSITION.z
    this.playerHeading = 0
    this.cameraYaw = -Math.PI / 2
    this.cameraDistance = 10.5
    this.elapsed = 0
    this.started = false
    this.blocked = false
    if (restored) {
      this.restore(restored)
    }
  }

  advance(deltaSeconds: number, input: InputFrame): void {
    if (!this.started || this.blocked) {
      return
    }
    const delta = clamp(deltaSeconds, 0, 0.05)
    this.elapsed += delta
    this.cameraYaw -= input.lookDeltaX * 0.006
    this.cameraDistance = clamp(
      this.cameraDistance + input.zoomDelta * 0.008,
      MIN_CAMERA_DISTANCE,
      MAX_CAMERA_DISTANCE,
    )

    const worldForwardX = -Math.sin(this.cameraYaw)
    const worldForwardZ = -Math.cos(this.cameraYaw)
    const worldRightX = Math.cos(this.cameraYaw)
    const worldRightZ = -Math.sin(this.cameraYaw)
    let movementX = worldForwardX * input.moveForward + worldRightX * input.moveRight
    let movementZ = worldForwardZ * input.moveForward + worldRightZ * input.moveRight
    const movementLength = Math.hypot(movementX, movementZ)
    if (movementLength > 1) {
      movementX /= movementLength
      movementZ /= movementLength
    }
    if (Math.hypot(movementX, movementZ) > 0.001) {
      this.playerHeading = Math.atan2(movementX, movementZ)
    }
    this.moveWithSliding(movementX * MOVE_SPEED * delta, movementZ * MOVE_SPEED * delta)
  }

  snapshot(): GameSnapshot {
    const playerAt = { x: this.playerX, z: this.playerZ }
    return {
      playerAt,
      playerHeading: this.playerHeading,
      cameraYaw: this.cameraYaw,
      cameraDistance: this.cameraDistance,
      place: getPlaceAt(playerAt),
      elapsed: this.elapsed,
      started: this.started,
      blocked: this.blocked,
    }
  }

  persistentState(): PersistentGameState {
    return {
      playerAt: { x: this.playerX, z: this.playerZ },
      playerHeading: this.playerHeading,
      cameraYaw: this.cameraYaw,
      cameraDistance: this.cameraDistance,
      elapsed: this.elapsed,
    }
  }

  private restore(restored: PersistentGameState): void {
    this.playerX = restored.playerAt.x
    this.playerZ = restored.playerAt.z
    this.playerHeading = restored.playerHeading
    this.cameraYaw = restored.cameraYaw
    this.cameraDistance = clamp(
      restored.cameraDistance,
      MIN_CAMERA_DISTANCE,
      MAX_CAMERA_DISTANCE,
    )
    this.elapsed = Math.max(0, restored.elapsed)
  }

  private moveWithSliding(deltaX: number, deltaZ: number): void {
    if (deltaX === 0 && deltaZ === 0) {
      return
    }
    const candidate = { x: this.playerX + deltaX, z: this.playerZ + deltaZ }
    if (this.canStandAt(candidate)) {
      this.playerX = candidate.x
      this.playerZ = candidate.z
      return
    }
    const xOnly = { x: this.playerX + deltaX, z: this.playerZ }
    if (this.canStandAt(xOnly)) {
      this.playerX = xOnly.x
    }
    const zOnly = { x: this.playerX, z: this.playerZ + deltaZ }
    if (this.canStandAt(zOnly)) {
      this.playerZ = zOnly.z
    }
  }

  private canStandAt(point: Point2): boolean {
    if (!isWalkable(point)) {
      return false
    }
    const current = { x: this.playerX, z: this.playerZ }
    return this.obstacles.every((obstacle) => {
      const nextPenetration = this.obstaclePenetration(point, obstacle)
      if (nextPenetration <= 0) {
        return true
      }
      // 충돌이 생기기 전 저장에서 구조물 안에 있던 플레이어는 더 깊이 들어가지는
      // 못하지만 바깥쪽으로 움직여 스스로 빠져나올 수 있다.
      const currentPenetration = this.obstaclePenetration(current, obstacle)
      return currentPenetration > 0 && nextPenetration <= currentPenetration + 1e-9
    })
  }

  private obstaclePenetration(point: Point2, obstacle: MovementObstacle): number {
    if (obstacle.kind === 'circle') {
      return Math.max(
        0,
        PLAYER_RADIUS + obstacle.radius -
          Math.hypot(point.x - obstacle.at.x, point.z - obstacle.at.z),
      )
    }
    const deltaX = point.x - obstacle.at.x
    const deltaZ = point.z - obstacle.at.z
    const cosine = Math.cos(obstacle.rotation)
    const sine = Math.sin(obstacle.rotation)
    const localX = cosine * deltaX + sine * deltaZ
    const localZ = -sine * deltaX + cosine * deltaZ
    const xPenetration = obstacle.halfLength + PLAYER_RADIUS - Math.abs(localX)
    const zPenetration = obstacle.halfWidth + PLAYER_RADIUS - Math.abs(localZ)
    return xPenetration > 0 && zPenetration > 0
      ? Math.min(xPenetration, zPenetration)
      : 0
  }
}

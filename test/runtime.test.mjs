import assert from 'node:assert/strict'
import test from 'node:test'
import { GameRuntime } from '../src/runtime/game-runtime.ts'

const idle = {
  moveForward: 0,
  moveRight: 0,
  lookDeltaX: 0,
  zoomDelta: 0,
  actions: [],
}

test('세로 차단 동안 위치·카메라·세계 시간이 보존되고 가로 복귀 뒤 이어진다', () => {
  const runtime = new GameRuntime()
  runtime.start()
  runtime.advance(0.05, { ...idle, moveForward: 1 })
  const before = runtime.snapshot()

  runtime.setBlocked(true)
  runtime.advance(0.05, { ...idle, moveForward: 1, lookDeltaX: 100 })
  const blocked = runtime.snapshot()
  assert.deepEqual(blocked.playerAt, before.playerAt)
  assert.equal(blocked.cameraYaw, before.cameraYaw)
  assert.equal(blocked.elapsed, before.elapsed)

  runtime.setBlocked(false)
  runtime.advance(0.05, { ...idle, moveForward: 1 })
  assert.notDeepEqual(runtime.snapshot().playerAt, before.playerAt)
})

test('대각선 이동과 직선 이동의 한 프레임 거리가 같다', () => {
  const straight = new GameRuntime()
  const diagonal = new GameRuntime()
  straight.start()
  diagonal.start()
  const straightStart = straight.snapshot().playerAt
  const diagonalStart = diagonal.snapshot().playerAt
  straight.advance(0.05, { ...idle, moveForward: 1 })
  diagonal.advance(0.05, { ...idle, moveForward: Math.SQRT1_2, moveRight: Math.SQRT1_2 })
  const straightEnd = straight.snapshot().playerAt
  const diagonalEnd = diagonal.snapshot().playerAt
  const straightDistance = Math.hypot(
    straightEnd.x - straightStart.x,
    straightEnd.z - straightStart.z,
  )
  const diagonalDistance = Math.hypot(
    diagonalEnd.x - diagonalStart.x,
    diagonalEnd.z - diagonalStart.z,
  )
  assert.ok(Math.abs(straightDistance - diagonalDistance) < 0.0001)
})

test('저장 상태를 복원해도 시작 전에는 시간이 흐르지 않고 이어 걷기 뒤 재개한다', () => {
  const restored = {
    playerAt: { x: -10, z: 1.5 },
    playerHeading: 0.4,
    cameraYaw: -0.8,
    cameraDistance: 9.2,
    elapsed: 12.5,
  }
  const runtime = new GameRuntime(restored)
  assert.deepEqual(runtime.persistentState(), restored)
  runtime.advance(0.05, { ...idle, moveForward: 1 })
  assert.deepEqual(runtime.persistentState(), restored)
  runtime.start()
  runtime.advance(0.05, idle)
  assert.equal(runtime.persistentState().elapsed, 12.55)
})

test('새로 걷기는 위치·시점·세계 시간을 첫 상태로 되돌린다', () => {
  const runtime = new GameRuntime({
    playerAt: { x: -10, z: 1.5 },
    playerHeading: 0.4,
    cameraYaw: -0.8,
    cameraDistance: 9.2,
    elapsed: 12.5,
  })
  runtime.start()
  runtime.reset()
  const reset = runtime.snapshot()
  assert.deepEqual(reset.playerAt, { x: -9.4, z: 0.8 })
  assert.equal(reset.elapsed, 0)
  assert.equal(reset.started, false)
})

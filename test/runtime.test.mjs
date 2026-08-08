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

test('시렁과 울타리 같은 구조물은 걷기를 막고 방향을 돌리면 열린 쪽으로 지난다', () => {
  const blocked = new GameRuntime()
  blocked.setMovementObstacles([{
    kind: 'oriented-box',
    at: { x: -8.75, z: 0.8 },
    rotation: 0,
    halfLength: 0.45,
    halfWidth: 0.05,
  }])
  blocked.start()
  const before = blocked.snapshot().playerAt
  blocked.advance(0.05, { ...idle, moveForward: 1 })
  assert.deepEqual(blocked.snapshot().playerAt, before)

  const turned = new GameRuntime()
  turned.setMovementObstacles([{
    kind: 'oriented-box',
    at: { x: -8.75, z: 0.8 },
    rotation: Math.PI / 2,
    halfLength: 0.45,
    halfWidth: 0.05,
  }])
  turned.start()
  turned.advance(0.05, { ...idle, moveForward: 1 })
  assert.ok(turned.snapshot().playerAt.x > before.x)
})

test('지지대 기둥은 가까이 통과하지 못하지만 치우면 다시 걸을 수 있다', () => {
  const runtime = new GameRuntime()
  runtime.setMovementObstacles([{
    kind: 'circle', at: { x: -9.0, z: 0.8 }, radius: 0.14,
  }])
  runtime.start()
  const before = runtime.snapshot().playerAt
  runtime.advance(0.05, { ...idle, moveForward: 1 })
  assert.deepEqual(runtime.snapshot().playerAt, before)

  runtime.setMovementObstacles([])
  runtime.advance(0.05, { ...idle, moveForward: 1 })
  assert.ok(runtime.snapshot().playerAt.x > before.x)
})

test('예전 저장의 플레이어가 구조물 안에서 시작해도 바깥쪽으로 빠져나온다', () => {
  const runtime = new GameRuntime({
    playerAt: { x: -9.4, z: 0.8 },
    playerHeading: 0,
    cameraYaw: -Math.PI / 2,
    cameraDistance: 10.5,
    elapsed: 12,
  })
  runtime.setMovementObstacles([{
    kind: 'oriented-box',
    at: { x: -9.4, z: 0.8 },
    rotation: 0,
    halfLength: 0.38,
    halfWidth: 0.26,
  }])
  runtime.start()
  const before = runtime.snapshot().playerAt
  for (let frame = 0; frame < 3; frame += 1) {
    runtime.advance(0.05, { ...idle, moveForward: 1 })
  }
  assert.ok(runtime.snapshot().playerAt.x > before.x)
})

test('긴 울타리 안에서 복원되어도 짧은 걸음을 이어 바깥으로 빠져나온다', () => {
  const runtime = new GameRuntime({
    playerAt: { x: -9.4, z: 0.8 },
    playerHeading: 0,
    cameraYaw: -Math.PI / 2,
    cameraDistance: 10.5,
    elapsed: 12,
  })
  runtime.setMovementObstacles([{
    kind: 'oriented-box',
    at: { x: -9.4, z: 0.8 },
    rotation: 0,
    halfLength: 0.52,
    halfWidth: 0.12,
  }])
  runtime.start()
  const before = runtime.snapshot().playerAt
  for (let frame = 0; frame < 10; frame += 1) {
    runtime.advance(0.05, { ...idle, moveForward: 1 })
  }
  assert.ok(runtime.snapshot().playerAt.x > before.x + 0.7)
})

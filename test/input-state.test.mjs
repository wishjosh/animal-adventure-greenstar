import assert from 'node:assert/strict'
import test from 'node:test'
import {
  InputState,
  isLandscapeViewport,
  normalizeStick,
} from '../src/input/input-state.ts'

test('키보드와 터치는 같은 이동 축으로 합쳐지고 대각선 속도가 커지지 않는다', () => {
  const input = new InputState()
  input.keyDown('w', 0)
  input.keyDown('d', 0)
  const keyboard = input.consumeFrame(10)
  assert.ok(Math.abs(Math.hypot(keyboard.moveForward, keyboard.moveRight) - 1) < 0.0001)

  input.reset()
  input.setTouchMovement({ forward: 1, right: 1 })
  const touch = input.consumeFrame(10)
  assert.deepEqual(
    [touch.moveForward, touch.moveRight],
    [keyboard.moveForward, keyboard.moveRight],
  )
})

test('짧은 키 입력은 0.105초 동안 한 걸음으로 읽힌다', () => {
  const input = new InputState()
  input.keyDown('ArrowUp', 100)
  input.keyUp('ArrowUp')
  assert.equal(input.consumeFrame(150).moveForward, 1)
  assert.equal(input.consumeFrame(206).moveForward, 0)
})

test('시점·확대·일회 행동은 한 프레임 뒤 소비되고 reset은 임시 입력을 모두 비운다', () => {
  const input = new InputState()
  input.setTouchMovement({ forward: 0.5, right: -0.25 })
  input.addLookDelta(12)
  input.addZoomDelta(-4)
  input.trigger('interact')
  const first = input.consumeFrame(0)
  assert.equal(first.lookDeltaX, 12)
  assert.equal(first.zoomDelta, -4)
  assert.deepEqual(first.actions, ['interact'])

  const second = input.consumeFrame(0)
  assert.equal(second.lookDeltaX, 0)
  assert.equal(second.zoomDelta, 0)
  assert.deepEqual(second.actions, [])
  assert.equal(second.moveForward, 0.5)

  input.reset()
  assert.deepEqual(input.consumeFrame(0), {
    moveForward: 0,
    moveRight: 0,
    lookDeltaX: 0,
    zoomDelta: 0,
    actions: [],
  })
})

test('Space·Escape·Z는 길게 눌러도 키를 뗄 때까지 한 번만 행동한다', () => {
  const input = new InputState()
  assert.equal(input.keyDown(' ', 0), true)
  input.keyDown(' ', 10)
  input.keyDown('Escape', 10)
  input.keyDown('z', 10)
  assert.deepEqual(input.consumeFrame(20).actions, ['interact', 'cancel', 'undo'])
  input.keyDown('z', 30)
  assert.deepEqual(input.consumeFrame(30).actions, [])
  input.keyUp('z')
  input.keyDown('z', 40)
  assert.deepEqual(input.consumeFrame(40).actions, ['undo'])
  input.reset()
  input.keyDown('Escape', 50)
  assert.deepEqual(input.consumeFrame(50).actions, ['cancel'])
})

test('이동 패드는 반지름 밖에서도 한 방향 크기를 넘지 않는다', () => {
  const axes = normalizeStick(80, -80, 40)
  assert.ok(Math.abs(Math.hypot(axes.forward, axes.right) - 1) < 0.0001)
})

test('실제 플레이 화면은 너비가 높이보다 큰 경우에만 가로로 판정한다', () => {
  assert.equal(isLandscapeViewport(844, 390), true)
  assert.equal(isLandscapeViewport(390, 844), false)
  assert.equal(isLandscapeViewport(500, 500), false)
})

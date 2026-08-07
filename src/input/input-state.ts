export type GameAction = 'interact' | 'cancel' | 'undo'

export type InputFrame = Readonly<{
  moveForward: number
  moveRight: number
  lookDeltaX: number
  zoomDelta: number
  actions: readonly GameAction[]
}>

export type StickAxes = Readonly<{
  forward: number
  right: number
}>

const MOVEMENT_KEYS = new Set([
  'w',
  'a',
  's',
  'd',
  'arrowup',
  'arrowdown',
  'arrowleft',
  'arrowright',
])

const ACTION_KEYS = new Map<string, GameAction>([
  [' ', 'interact'],
  ['space', 'interact'],
  ['escape', 'cancel'],
  ['z', 'undo'],
])

function normalizedAxes(forward: number, right: number): StickAxes {
  const length = Math.hypot(forward, right)
  if (length <= 1 || length === 0) {
    return { forward, right }
  }
  return { forward: forward / length, right: right / length }
}

export function normalizeStick(
  deltaX: number,
  deltaY: number,
  radius: number,
): StickAxes {
  const safeRadius = Math.max(1, radius)
  return normalizedAxes(-deltaY / safeRadius, deltaX / safeRadius)
}

export function isLandscapeViewport(width: number, height: number): boolean {
  return Number.isFinite(width) && Number.isFinite(height) && width > height
}

export class InputState {
  private readonly heldKeys = new Set<string>()
  private readonly tapUntil = new Map<string, number>()
  private touchForward = 0
  private touchRight = 0
  private lookDeltaX = 0
  private zoomDelta = 0
  private readonly actions: GameAction[] = []

  keyDown(rawKey: string, now: number): boolean {
    const key = rawKey.toLowerCase()
    const action = ACTION_KEYS.get(key)
    if (action) {
      if (!this.heldKeys.has(key)) {
        this.actions.push(action)
      }
      this.heldKeys.add(key)
      return true
    }
    if (!MOVEMENT_KEYS.has(key)) {
      return false
    }
    this.heldKeys.add(key)
    this.tapUntil.set(key, now + 105)
    return true
  }

  keyUp(rawKey: string): void {
    this.heldKeys.delete(rawKey.toLowerCase())
  }

  setTouchMovement(axes: StickAxes): void {
    const normalized = normalizedAxes(axes.forward, axes.right)
    this.touchForward = normalized.forward
    this.touchRight = normalized.right
  }

  addLookDelta(deltaX: number): void {
    this.lookDeltaX += deltaX
  }

  addZoomDelta(delta: number): void {
    this.zoomDelta += delta
  }

  trigger(action: GameAction): void {
    this.actions.push(action)
  }

  consumeFrame(now: number): InputFrame {
    const pressed = (primary: string, alternate: string): boolean =>
      this.heldKeys.has(primary) ||
      this.heldKeys.has(alternate) ||
      (this.tapUntil.get(primary) ?? 0) > now ||
      (this.tapUntil.get(alternate) ?? 0) > now

    for (const [key, until] of this.tapUntil) {
      if (until <= now && !this.heldKeys.has(key)) {
        this.tapUntil.delete(key)
      }
    }

    const keyboardForward = (pressed('w', 'arrowup') ? 1 : 0) - (pressed('s', 'arrowdown') ? 1 : 0)
    const keyboardRight = (pressed('d', 'arrowright') ? 1 : 0) - (pressed('a', 'arrowleft') ? 1 : 0)
    const movement = normalizedAxes(
      keyboardForward + this.touchForward,
      keyboardRight + this.touchRight,
    )
    const frame = {
      moveForward: movement.forward,
      moveRight: movement.right,
      lookDeltaX: this.lookDeltaX,
      zoomDelta: this.zoomDelta,
      actions: [...this.actions],
    }
    this.lookDeltaX = 0
    this.zoomDelta = 0
    this.actions.length = 0
    return frame
  }

  reset(): void {
    this.heldKeys.clear()
    this.tapUntil.clear()
    this.touchForward = 0
    this.touchRight = 0
    this.lookDeltaX = 0
    this.zoomDelta = 0
    this.actions.length = 0
  }
}

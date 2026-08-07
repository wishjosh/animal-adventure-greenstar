import assert from 'node:assert/strict'
import test from 'node:test'
import { EcologyRuntime } from '../src/runtime/ecology-runtime.ts'

/** 세계 시간을 프레임 상한만큼씩 흘려보낸다. */
function elapse(runtime, seconds) {
  const step = 0.05
  let flips = 0
  for (let passed = 0; passed < seconds; passed += step) {
    if (runtime.advanceMoisture(step)) {
      flips += 1
    }
  }
  return flips
}

test('물뿌리개는 가득 찬 채로 시작하고 정원은 마른 채로 시작한다', () => {
  const runtime = new EcologyRuntime()
  const snapshot = runtime.snapshot()

  assert.equal(snapshot.wateringCanLevel, 1)
  assert.equal(snapshot.surfaceMoisture['a-garden'], 'dry')
  assert.equal(snapshot.surfaceMoisture['b-moist-soil'], 'moist')
})

test('손보는 중에 물을 주면 그 자리가 젖고 물뿌리개가 줄어든다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')

  const result = runtime.water()
  assert.equal(result.changed, true)

  const snapshot = runtime.snapshot()
  assert.equal(snapshot.surfaceMoisture['a-garden'], 'moist')
  assert.equal(snapshot.wateringCanLevel, 0.75)
})

test('손보기에 들어가지 않으면 물을 줄 수 없다', () => {
  const runtime = new EcologyRuntime()
  const result = runtime.water()

  assert.equal(result.changed, false)
  assert.equal(result.rejection, 'editing-inactive')
  assert.equal(runtime.snapshot().wateringCanLevel, 1)
})

test('물뿌리개를 다 쓰면 물 뜨는 자리에서 채워야 다시 줄 수 있다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')
  for (let poured = 0; poured < 4; poured += 1) {
    assert.equal(runtime.water().changed, true)
  }

  assert.equal(runtime.snapshot().wateringCanLevel, 0)
  assert.equal(runtime.water().rejection, 'empty-can')

  assert.equal(runtime.fill(undefined), false)
  assert.equal(runtime.fill('a-well'), true)
  assert.equal(runtime.snapshot().wateringCanLevel, 1)
  assert.equal(runtime.water().changed, true)
})

test('물을 준 자리는 시간이 지나면 마르고 그때 한 번만 다시 판정한다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')
  runtime.water()
  const wateredRevision = runtime.snapshot().environment.editRevision

  const flips = elapse(runtime, 200)

  assert.equal(runtime.snapshot().surfaceMoisture['a-garden'], 'dry')
  assert.equal(flips, 1, '젖음과 마름이 뒤바뀐 순간에만 재판정해야 한다')
  assert.equal(runtime.snapshot().environment.editRevision, wateredRevision)
})

test('마르기 전에는 재판정이 일어나지 않는다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')
  runtime.water()

  assert.equal(elapse(runtime, 60), 0)
  assert.equal(runtime.snapshot().surfaceMoisture['a-garden'], 'moist')
})

test('차단된 동안에는 마르지 않고 물도 줄 수 없다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')
  runtime.water()
  runtime.setBlocked(true)

  assert.equal(elapse(runtime, 400), 0)
  assert.equal(runtime.snapshot().surfaceMoisture['a-garden'], 'moist')
  assert.equal(runtime.water().rejection, 'editing-blocked')
  assert.equal(runtime.fill('a-well'), false)
})

test('물주기는 되돌리기 이력에 남지 않는다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')
  const before = runtime.snapshot()

  runtime.water()
  const after = runtime.snapshot()

  assert.equal(after.canUndoActiveZone, before.canUndoActiveZone)
  assert.equal(after.editState.revision, before.editState.revision)
})

test('새로 걷기를 하면 물뿌리개와 습기가 처음 상태로 돌아온다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')
  runtime.water()
  runtime.water()
  runtime.reset()

  const snapshot = runtime.snapshot()
  assert.equal(snapshot.wateringCanLevel, 1)
  assert.equal(snapshot.surfaceMoisture['a-garden'], 'dry')
})

test('한 자리에 준 물은 다른 흙자리를 적시지 않는다', () => {
  const runtime = new EcologyRuntime()
  runtime.enter('a-garden')
  runtime.water()

  assert.equal(runtime.snapshot().surfaceMoisture['b-bright-soil'], 'dry')
})

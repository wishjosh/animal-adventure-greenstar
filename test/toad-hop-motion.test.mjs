import assert from 'node:assert/strict'
import test from 'node:test'
import { deriveToadHopMotion } from '../src/render/toad-hop-motion.ts'

test('도약 초반에는 앞으로 미끄러지지 않고 제자리에서 웅크린다', () => {
  const start = deriveToadHopMotion(0, 4)
  const crouching = deriveToadHopMotion(0.34 / 2 / 4, 4)

  assert.equal(start.routeProgress, 0)
  assert.equal(start.lift, 0)
  assert.equal(crouching.routeProgress, 0)
  assert.equal(crouching.lift, 0)
  assert.ok(crouching.crouch > 0)
})

test('웅크린 뒤에만 앞으로 나아가며 도약 중간에서 가장 높이 뜬다', () => {
  const halfwayAirborne = deriveToadHopMotion((0.34 + 0.66 / 2) / 4, 4)

  assert.ok(Math.abs(halfwayAirborne.routeProgress - 0.125) < 1e-12)
  assert.ok(Math.abs(halfwayAirborne.lift - 0.34) < 1e-12)
  assert.equal(halfwayAirborne.crouch, 0)
})

test('홉 경계와 전체 도착점에서 진행과 높이가 끊기지 않는다', () => {
  const beforeBoundary = deriveToadHopMotion((1 - 1e-9) / 4, 4)
  const boundary = deriveToadHopMotion(1 / 4, 4)
  const finish = deriveToadHopMotion(1, 4)

  assert.ok(Math.abs(beforeBoundary.routeProgress - boundary.routeProgress) < 1e-9)
  assert.ok(beforeBoundary.lift < 1e-8)
  assert.equal(boundary.routeProgress, 0.25)
  assert.equal(boundary.lift, 0)
  assert.equal(finish.routeProgress, 1)
  assert.equal(finish.lift, 0)
})

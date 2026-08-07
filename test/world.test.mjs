import assert from 'node:assert/strict'
import test from 'node:test'
import {
  EDIT_ZONES,
  PLACES,
  ROUTES,
  assertFirstMapContract,
  isInWater,
  isInsideEditZone,
  terrainHeight,
} from '../src/content/first-map.ts'

test('첫 제품 지도는 A–F와 두 순환길의 일곱 연결을 유지한다', () => {
  assert.doesNotThrow(assertFirstMapContract)
  assert.equal(PLACES.length, 6)
  assert.equal(ROUTES.length, 7)
})

test('장소 중심 높이는 D > A > B > E > F로 읽힌다', () => {
  const byId = new Map(PLACES.map((place) => [place.id, place]))
  const heights = ['D', 'A', 'B', 'E', 'F'].map((id) => {
    const place = byId.get(id)
    return terrainHeight(place.center.x, place.center.z)
  })
  assert.ok(heights.every((height, index) => index === 0 || heights[index - 1] > height))
})

test('A 한 곳과 B 두 곳의 관리된 흙은 서로와 본래 물길을 침범하지 않는다', () => {
  assert.deepEqual(EDIT_ZONES.map(({ id }) => id), [
    'a-garden', 'b-bright-soil', 'b-moist-soil',
  ])
  for (const zone of EDIT_ZONES) {
    assert.equal(isInsideEditZone(zone.focus, zone), true)
    assert.equal(zone.outline.some(isInWater), false)
  }
  for (let left = 0; left < EDIT_ZONES.length; left += 1) {
    for (let right = left + 1; right < EDIT_ZONES.length; right += 1) {
      assert.equal(
        EDIT_ZONES[left].outline.some((point) => isInsideEditZone(point, EDIT_ZONES[right])),
        false,
      )
      assert.equal(
        EDIT_ZONES[right].outline.some((point) => isInsideEditZone(point, EDIT_ZONES[left])),
        false,
      )
    }
  }
})

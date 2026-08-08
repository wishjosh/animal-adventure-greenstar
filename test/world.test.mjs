import assert from 'node:assert/strict'
import test from 'node:test'
import {
  EDIT_ZONES,
  HEADWATER_COURSE,
  LEGACY_WATER_COURSE,
  PLACES,
  ROUTES,
  UPSTREAM_SPUR,
  WATER_CHANNEL,
  WATER_COURSE,
  assertFirstMapContract,
  baseTerrainHeight,
  getPlaceAt,
  isInWater,
  isInsideEditZone,
  isWalkable,
  isWalkableBeforeHeadwater,
  terrainHeight,
  waterChannelDepthAt,
  waterSurfaceHeight,
} from '../src/content/first-map.ts'

test('첫 제품 지도는 A–F와 두 순환길의 일곱 연결을 유지한다', () => {
  assert.doesNotThrow(assertFirstMapContract)
  assert.equal(PLACES.length, 6)
  assert.equal(ROUTES.length, 7)
})

test('D 너머 열린 지선과 발원지 물축은 기존 A–F 연결을 바꾸지 않고 이어진다', () => {
  assert.deepEqual(UPSTREAM_SPUR, [
    { x: -3, z: -16 },
    { x: -3.35, z: -18.15 },
    { x: -3.15, z: -20.15 },
    { x: -2.45, z: -21.75 },
    { x: -1.7, z: -22.35 },
  ])
  assert.deepEqual(HEADWATER_COURSE, [
    { x: 0.05, z: -23.1 },
    { x: 0.1, z: -22.25 },
    { x: 0.35, z: -21.4 },
    { x: 0.55, z: -20.1 },
    { x: 0.82, z: -19.15 },
    { x: 1.1, z: -18.5 },
  ])
  assert.deepEqual(WATER_COURSE.slice(0, HEADWATER_COURSE.length), HEADWATER_COURSE)
  assert.deepEqual(
    WATER_COURSE.slice(HEADWATER_COURSE.length - 1),
    LEGACY_WATER_COURSE,
  )
  assert.equal(UPSTREAM_SPUR.every(isWalkable), true)
  assert.equal(getPlaceAt(UPSTREAM_SPUR.at(-1))?.id, 'D')
})

test('이전 저장에서 새 발원지 물축 위에 있던 좌표는 V5 보행으로만 읽힌다', () => {
  const newlyWet = HEADWATER_COURSE[1]
  assert.equal(isWalkableBeforeHeadwater(newlyWet), true)
  assert.equal(isWalkable(newlyWet), false)
})

test('장소 중심 높이는 D > A > B > E > F로 읽힌다', () => {
  const byId = new Map(PLACES.map((place) => [place.id, place]))
  const heights = ['D', 'A', 'B', 'E', 'F'].map((id) => {
    const place = byId.get(id)
    return terrainHeight(place.center.x, place.center.z)
  })
  assert.ok(heights.every((height, index) => index === 0 || heights[index - 1] > height))
})

test('좁은 개울도 바닥과 물 표면이 양쪽 지면보다 낮다', () => {
  const start = WATER_COURSE[2]
  const end = WATER_COURSE[3]
  const center = {
    x: (start.x + end.x) / 2,
    z: (start.z + end.z) / 2,
  }
  const deltaX = end.x - start.x
  const deltaZ = end.z - start.z
  const length = Math.hypot(deltaX, deltaZ)
  const bank = {
    x: center.x - (deltaZ / length) * (WATER_CHANNEL.bankHalfWidth + 0.05),
    z: center.z + (deltaX / length) * (WATER_CHANNEL.bankHalfWidth + 0.05),
  }

  assert.equal(waterChannelDepthAt(center), WATER_CHANNEL.bedDepth)
  assert.ok(Math.abs(baseTerrainHeight(center.x, center.z) - terrainHeight(center.x, center.z) - WATER_CHANNEL.bedDepth) < 0.0001)
  assert.ok(Math.abs(waterSurfaceHeight(center.x, center.z) - terrainHeight(center.x, center.z) - WATER_CHANNEL.waterDepth) < 0.0001)
  assert.equal(waterChannelDepthAt(bank), 0)
  assert.ok(terrainHeight(bank.x, bank.z) > waterSurfaceHeight(center.x, center.z) + 0.3)
})

test('A·B 관리 흙과 D 발원지 가장자리는 서로와 본래 물길을 침범하지 않는다', () => {
  assert.deepEqual(EDIT_ZONES.map(({ id }) => id), [
    'a-garden', 'b-bright-soil', 'b-moist-soil', 'd-headwater-edge',
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

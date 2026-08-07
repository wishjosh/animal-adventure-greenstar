import assert from 'node:assert/strict'
import test from 'node:test'
import {
  EDIT_ZONES,
  START_POSITION,
  WATER_SOURCES,
  assertFirstMapContract,
  distanceToPolygon,
  getEditZoneAt,
  getNearbyWaterSource,
  isWalkable,
} from '../src/content/first-map.ts'
import {
  FIRST_MAP_TOAD_TUNING,
  MANAGED_SHALLOW_EDGE,
  PROTECTED_SHALLOW_EDGE,
} from '../src/domain/fire-bellied-toad.ts'
import {
  createSurfaceMoistureRuntime,
  readSurfaceMoisture,
} from '../src/domain/surface-moisture.ts'
import {
  WATERING_CAN_CAPACITY,
  createWateringCan,
  fillWateringCan,
  isWateringCanEmpty,
  pourOnZone,
  wateringCanLevel,
} from '../src/domain/watering-can.ts'

function distance(left, right) {
  return Math.hypot(left.x - right.x, left.z - right.z)
}

test('물 뜨는 자리는 A 우물과 B 개울 두 곳이다', () => {
  assert.deepEqual(
    WATER_SOURCES.map(({ id }) => id),
    ['a-well', 'b-stream-bank'],
  )
  assert.deepEqual(
    WATER_SOURCES.map(({ placeId }) => placeId),
    ['A', 'B'],
  )
})

test('두 물 뜨는 자리는 마른 땅에 있고 흙자리를 잡아먹지 않는다', () => {
  for (const source of WATER_SOURCES) {
    assert.equal(isWalkable(source.at), true, source.id + '은 걸어서 닿아야 한다')
    assert.equal(
      getEditZoneAt(source.at),
      undefined,
      source.id + '이 편집 흙자리 안에 있으면 가꿀 땅이 줄어든다',
    )
  }
})

test('개울에서 물을 떠도 무당개구리의 얕은 물가를 방해하지 않는다', () => {
  const bank = WATER_SOURCES.find(({ id }) => id === 'b-stream-bank')
  assert.ok(bank)

  for (const edge of [PROTECTED_SHALLOW_EDGE, MANAGED_SHALLOW_EDGE]) {
    assert.ok(
      distance(bank.at, edge) > FIRST_MAP_TOAD_TUNING.quietTargetDistance,
      '물 뜨는 자리가 무당개구리의 조용함 기준보다 멀어야 한다',
    )
  }
})

test('물 뜨는 자리는 시작 위치에 겹치지 않아 처음부터 눈에 들어온다', () => {
  // 3인칭 카메라는 플레이어 뒤에 있다. 시작 위치에 겹친 물건은 화면에 나타나지 않는다.
  for (const source of WATER_SOURCES) {
    const away = Math.hypot(
      source.at.x - START_POSITION.x,
      source.at.z - START_POSITION.z,
    )
    assert.ok(away >= 2.2, source.id + '이 시작 위치에 너무 가깝다')
  }
  assert.doesNotThrow(() => assertFirstMapContract())
})

test('우물은 정원 바로 옆이라 짧게 다녀올 수 있다', () => {
  const well = WATER_SOURCES.find(({ id }) => id === 'a-well')
  const garden = EDIT_ZONES.find(({ id }) => id === 'a-garden')
  assert.ok(well && garden)

  const walk = distanceToPolygon(well.at, garden.outline)
  assert.ok(walk > 0, '우물이 정원 흙 안에 있으면 안 된다')
  assert.ok(walk < 2, '우물이 정원에서 멀면 물주기가 심부름이 된다')
})

test('물 뜨는 자리에 닿아야 물뿌리개를 채울 수 있다', () => {
  const well = WATER_SOURCES.find(({ id }) => id === 'a-well')
  assert.ok(well)

  assert.equal(getNearbyWaterSource(well.at)?.id, 'a-well')
  assert.equal(getNearbyWaterSource({ x: well.at.x + 6, z: well.at.z }), undefined)
})

test('빈 물뿌리개는 물 뜨는 자리에서만 채워진다', () => {
  const empty = { portions: 0 }

  assert.equal(fillWateringCan(empty, undefined).changed, false)
  const filled = fillWateringCan(empty, 'a-well')
  assert.equal(filled.changed, true)
  assert.equal(filled.can.portions, WATERING_CAN_CAPACITY)
})

test('이미 가득 찬 물뿌리개는 다시 채워도 달라지지 않는다', () => {
  const full = createWateringCan()
  const again = fillWateringCan(full, 'a-well')

  assert.equal(again.changed, false)
  assert.equal(again.can, full)
})

test('한 번 채운 물뿌리개로 네 자리를 적신다', () => {
  let can = createWateringCan()
  let moisture = createSurfaceMoistureRuntime()

  for (let poured = 0; poured < WATERING_CAN_CAPACITY; poured += 1) {
    const result = pourOnZone(can, moisture, 'a-garden')
    assert.equal(result.poured, true)
    can = result.can
    moisture = result.moisture
  }

  assert.equal(isWateringCanEmpty(can), true)
  assert.equal(readSurfaceMoisture(moisture)['a-garden'], 'moist')
})

test('빈 물뿌리개로는 물을 줄 수 없고 습기도 바뀌지 않는다', () => {
  const empty = { portions: 0 }
  const moisture = createSurfaceMoistureRuntime()
  const result = pourOnZone(empty, moisture, 'a-garden')

  assert.equal(result.poured, false)
  assert.equal(result.rejection, 'empty-can')
  assert.equal(result.moisture, moisture)
  assert.equal(readSurfaceMoisture(result.moisture)['a-garden'], 'dry')
})

test('흙자리 밖에서는 물이 줄지 않는다', () => {
  const can = createWateringCan()
  const result = pourOnZone(can, createSurfaceMoistureRuntime(), undefined)

  assert.equal(result.poured, false)
  assert.equal(result.rejection, 'no-zone')
  assert.equal(result.can, can)
})

test('남은 양은 숫자가 아니라 물높이로 읽힌다', () => {
  assert.equal(wateringCanLevel(createWateringCan()), 1)
  assert.equal(wateringCanLevel({ portions: 0 }), 0)
  assert.equal(wateringCanLevel({ portions: 2 }), 0.5)
  assert.equal(wateringCanLevel({ portions: 99 }), 1)
})

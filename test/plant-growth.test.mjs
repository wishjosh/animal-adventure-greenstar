import assert from 'node:assert/strict'
import test from 'node:test'
import { EDIT_ZONES } from '../src/content/first-map.ts'
import { applyEdit, createEditSession } from '../src/domain/edit-model.ts'
import { evaluateLocalEnvironment } from '../src/domain/local-environment.ts'
import {
  FIRST_MAP_PLANT_GROWTH_TUNING,
  advancePlantGrowthState,
  createPlantGrowthState,
  derivePlantGrowth,
  isAdultPlantGrowth,
  migrateLegacyLowFlowersAsAdults,
  plantGrowthDensity,
  plantGrowthRate,
  plantGrowthStage,
  readPersistentPlantGrowthState,
  syncPlantGrowthState,
} from '../src/domain/plant-growth.ts'

const focus = (id) => EDIT_ZONES.find((zone) => zone.id === id).focus

const moistBrightOpen = {
  surfaceMoisture: 'moist',
  light: 'bright',
  lowCover: 'open-ground',
}

function placeFlower(session = createEditSession(), zoneId = 'a-garden', at = focus(zoneId)) {
  const placed = applyEdit(session, {
    type: 'place', zoneId, kind: 'low-flower', at,
  })
  assert.equal(placed.changed, true)
  return placed
}

function moistEnvironment(editState) {
  const moisture = {
    'a-garden': 'moist',
    'b-bright-soil': 'moist',
    'b-moist-soil': 'moist',
  }
  return evaluateLocalEnvironment(editState, undefined, undefined, moisture)
}

function advance(state, editState, deltaSeconds, overrides = {}) {
  return advancePlantGrowthState(state, editState, {
    deltaSeconds,
    worldElapsed: 10 + deltaSeconds,
    worldRunning: true,
    environment: moistEnvironment(editState),
    ...overrides,
  })
}

test('성장 저장은 편집 항목과 분리되어 식재 시각과 누적량만 가진다', () => {
  const placed = placeFlower()
  const state = syncPlantGrowthState(createPlantGrowthState(), placed.session.state, 12.5)
  const record = state.byEntryId[placed.entryId]

  assert.deepEqual(record, { plantedAtElapsed: 12.5, accumulatedGrowth: 0 })
  assert.equal(Object.hasOwn(record, 'stage'), false)
  assert.equal(Object.hasOwn(placed.session.state.current['a-garden'][placed.entryId], 'stage'), false)
})

test('동기화는 새 꽃을 씨앗으로 넣고 사라진 꽃과 비식물 기록을 정리한다', () => {
  const placed = placeFlower()
  const synced = syncPlantGrowthState(
    { byEntryId: { stale: { plantedAtElapsed: 1, accumulatedGrowth: 10 } } },
    placed.session.state,
    20,
  )
  assert.deepEqual(Object.keys(synced.byEntryId), [placed.entryId])
  assert.deepEqual(synced.byEntryId[placed.entryId], {
    plantedAtElapsed: 20,
    accumulatedGrowth: 0,
  })

  const unchanged = syncPlantGrowthState(synced, placed.session.state, 30)
  assert.equal(unchanged, synced)

  const removed = applyEdit(placed.session, {
    type: 'retrieve', zoneId: 'a-garden', id: placed.entryId,
  })
  assert.deepEqual(
    syncPlantGrowthState(synced, removed.session.state, 31),
    createPlantGrowthState(),
  )
})

test('씨앗은 경계 성장량에서 싹, 어린 식물, 성체로 순서대로 자란다', () => {
  const { sprout, young, adult } = FIRST_MAP_PLANT_GROWTH_TUNING.stageStarts
  assert.equal(plantGrowthStage(sprout - 0.001), 'seed')
  assert.equal(plantGrowthStage(sprout), 'sprout')
  assert.equal(plantGrowthStage(young - 0.001), 'sprout')
  assert.equal(plantGrowthStage(young), 'young')
  assert.equal(plantGrowthStage(adult - 0.001), 'young')
  assert.equal(plantGrowthStage(adult), 'adult')
})

test('밝고 트인 젖은 흙에서는 세계 시간에 따라 결정론적으로 성장한다', () => {
  const placed = placeFlower()
  let state = syncPlantGrowthState(createPlantGrowthState(), placed.session.state, 10)
  state = advance(state, placed.session.state, 12)
  assert.equal(derivePlantGrowth(state.byEntryId[placed.entryId], 22).stage, 'sprout')

  state = advance(state, placed.session.state, 24)
  assert.equal(derivePlantGrowth(state.byEntryId[placed.entryId], 46).stage, 'young')

  state = advance(state, placed.session.state, 54)
  const view = derivePlantGrowth(state.byEntryId[placed.entryId], 100)
  assert.equal(view.stage, 'adult')
  assert.equal(view.adult, true)
  assert.equal(view.ageSeconds, 90)
})

test('같은 총 시간과 환경은 프레임을 나누는 방식과 관계없이 같은 결과를 만든다', () => {
  const placed = placeFlower()
  const initial = syncPlantGrowthState(createPlantGrowthState(), placed.session.state, 10)
  const once = advance(initial, placed.session.state, 37.5)
  let stepped = initial
  for (let index = 0; index < 375; index += 1) {
    stepped = advance(stepped, placed.session.state, 0.1)
  }

  const onceRecord = once.byEntryId[placed.entryId]
  const steppedRecord = stepped.byEntryId[placed.entryId]
  assert.ok(Math.abs(onceRecord.accumulatedGrowth - steppedRecord.accumulatedGrowth) < 1e-9)
  assert.deepEqual(derivePlantGrowth(onceRecord, 47.5), derivePlantGrowth(steppedRecord, 47.5))
})

test('성체에 도달한 성장량은 저장 상한에서 멈추고 매 프레임 다시 저장하지 않는다', () => {
  const placed = placeFlower()
  const initial = syncPlantGrowthState(createPlantGrowthState(), placed.session.state, 0)
  const adult = advance(initial, placed.session.state, 500)

  assert.equal(
    adult.byEntryId[placed.entryId].accumulatedGrowth,
    FIRST_MAP_PLANT_GROWTH_TUNING.stageStarts.adult,
  )
  assert.equal(advance(adult, placed.session.state, 10), adult)
})

test('물, 빛, 주변 덮임이 성장 속도에 함께 영향을 준다', () => {
  const ideal = plantGrowthRate(moistBrightOpen)
  const dappled = plantGrowthRate({ ...moistBrightOpen, light: 'dappled' })
  const shadedDense = plantGrowthRate({
    ...moistBrightOpen, light: 'shaded', lowCover: 'dense',
  })
  const dry = plantGrowthRate({ ...moistBrightOpen, surfaceMoisture: 'dry' })

  assert.equal(ideal, 1)
  assert.ok(dappled < ideal)
  assert.ok(shadedDense < dappled)
  assert.equal(dry, 0)
})

test('시작 전이거나 차단된 세계에서는 성장하지 않는다', () => {
  const placed = placeFlower()
  const initial = syncPlantGrowthState(createPlantGrowthState(), placed.session.state, 10)
  const paused = advance(initial, placed.session.state, 60, { worldRunning: false })
  const negative = advance(initial, placed.session.state, -10)
  const invalid = advance(initial, placed.session.state, Number.POSITIVE_INFINITY)

  assert.equal(paused, initial)
  assert.equal(negative, initial)
  assert.equal(invalid, initial)
  assert.equal(derivePlantGrowth(paused.byEntryId[placed.entryId], 10).ageSeconds, 0)
})

test('저장 검증은 현재 꽃과 정확히 대응하며 파생 단계와 손상값을 거부한다', () => {
  const placed = placeFlower()
  const state = advance(createPlantGrowthState(), placed.session.state, 40)
  const saved = JSON.parse(JSON.stringify(state))

  assert.deepEqual(readPersistentPlantGrowthState(saved, placed.session.state), state)
  assert.equal(
    readPersistentPlantGrowthState({ byEntryId: {} }, placed.session.state),
    undefined,
  )
  assert.equal(
    readPersistentPlantGrowthState({
      byEntryId: {
        [placed.entryId]: { ...saved.byEntryId[placed.entryId], stage: 'young' },
      },
    }, placed.session.state),
    undefined,
  )
  assert.equal(
    readPersistentPlantGrowthState({
      byEntryId: {
        [placed.entryId]: { plantedAtElapsed: 10, accumulatedGrowth: Number.NaN },
      },
    }, placed.session.state),
    undefined,
  )
})

test('구버전 저장의 기존 꽃은 migration 뒤 성체로 이어진다', () => {
  let session = placeFlower().session
  session = placeFlower(session, 'b-bright-soil').session
  const migrated = migrateLegacyLowFlowersAsAdults(session.state, 80)

  assert.equal(Object.keys(migrated.byEntryId).length, 2)
  for (const record of Object.values(migrated.byEntryId)) {
    assert.equal(record.plantedAtElapsed, 80)
    assert.equal(isAdultPlantGrowth(record), true)
  }
  assert.deepEqual(readPersistentPlantGrowthState(migrated, session.state), migrated)
})

test('성체 판정과 밀도는 성체 환산 식생량으로 솎기 판단에 제공된다', () => {
  let session = createEditSession()
  const first = placeFlower(session, 'a-garden', focus('a-garden'))
  session = first.session
  const second = placeFlower(session, 'a-garden', { x: -10.7, z: 3.4 })
  session = second.session
  const third = placeFlower(session, 'b-bright-soil')
  session = third.session

  const state = {
    byEntryId: {
      [first.entryId]: { plantedAtElapsed: 0, accumulatedGrowth: 0 },
      [second.entryId]: { plantedAtElapsed: 0, accumulatedGrowth: 45 },
      [third.entryId]: { plantedAtElapsed: 0, accumulatedGrowth: 100 },
    },
  }
  const density = plantGrowthDensity(state, session.state, 2)

  assert.equal(isAdultPlantGrowth(state.byEntryId[first.entryId]), false)
  assert.equal(isAdultPlantGrowth(state.byEntryId[third.entryId]), true)
  assert.equal(density.plantCount, 3)
  assert.equal(density.adultCount, 1)
  assert.equal(density.matureEquivalent, 1.5)
  assert.equal(density.matureEquivalentPerSquareMetre, 0.75)
})

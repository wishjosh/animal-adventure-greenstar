import { type EditZoneId, type WaterSourceId } from '../content/first-map.ts'
import {
  type SurfaceMoistureRuntime,
  waterZone,
} from './surface-moisture.ts'

// 물의 총량에는 제한을 두지 않는다. 물뿌리개 한 번에 담기는 양만 유한하므로
// 많이 필요하면 우물이나 개울에 자주 다녀오게 된다.
// 남은 양은 숫자나 게이지가 아니라 물뿌리개 안의 물높이로만 보인다.

/** 한 번 채운 물뿌리개로 적실 수 있는 흙자리 수다. 첫 슬라이스의 제작값이다. */
export const WATERING_CAN_CAPACITY = 4

export type WateringCanState = Readonly<{
  portions: number
}>

export type WateringCanTuning = Readonly<{
  capacity: number
}>

export const FIRST_MAP_WATERING_CAN_TUNING: WateringCanTuning = Object.freeze({
  capacity: WATERING_CAN_CAPACITY,
})

export function createWateringCan(
  tuning: WateringCanTuning = FIRST_MAP_WATERING_CAN_TUNING,
): WateringCanState {
  return { portions: tuning.capacity }
}

/** 물뿌리개 안에 남은 물의 높이다. 0이면 비었고 1이면 가득 찼다. */
export function wateringCanLevel(
  can: WateringCanState,
  tuning: WateringCanTuning = FIRST_MAP_WATERING_CAN_TUNING,
): number {
  if (tuning.capacity <= 0) {
    return 0
  }
  return Math.max(0, Math.min(1, can.portions / tuning.capacity))
}

export function isWateringCanEmpty(can: WateringCanState): boolean {
  return can.portions <= 0
}

export type FillResult = Readonly<{
  can: WateringCanState
  changed: boolean
}>

/** 우물이나 개울에 닿았을 때 물뿌리개를 가득 채운다. */
export function fillWateringCan(
  can: WateringCanState,
  source: WaterSourceId | undefined,
  tuning: WateringCanTuning = FIRST_MAP_WATERING_CAN_TUNING,
): FillResult {
  if (!source) {
    return { can, changed: false }
  }
  if (can.portions >= tuning.capacity) {
    return { can, changed: false }
  }
  return { can: { portions: tuning.capacity }, changed: true }
}

export type PourRejection = 'empty-can' | 'no-zone'

export type PourResult = Readonly<{
  can: WateringCanState
  moisture: SurfaceMoistureRuntime
  poured: boolean
  rejection?: PourRejection
}>

/**
 * 한 흙자리에 물을 준다.
 * 물을 준 자리는 젖고 물뿌리개는 한 번 분량만큼 줄어든다.
 * 되돌리기의 대상이 아니며 시간이 지나면 저절로 마른다.
 */
export function pourOnZone(
  can: WateringCanState,
  moisture: SurfaceMoistureRuntime,
  zoneId: EditZoneId | undefined,
): PourResult {
  if (!zoneId) {
    return { can, moisture, poured: false, rejection: 'no-zone' }
  }
  if (isWateringCanEmpty(can)) {
    return { can, moisture, poured: false, rejection: 'empty-can' }
  }
  return {
    can: { portions: can.portions - 1 },
    moisture: waterZone(moisture, zoneId),
    poured: true,
  }
}

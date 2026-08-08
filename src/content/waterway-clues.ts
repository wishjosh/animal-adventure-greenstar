import {
  distanceSquared,
  getEditZoneAt,
  isWalkable,
  type PlaceId,
  type Point2,
} from './first-map.ts'
import type { ObservationId } from '../domain/observation-notebook.ts'

export type WaterwayClueId =
  | 'b-drifting-leaf'
  | 'd-white-water'
  | 'd-headwater-source'
  | 'f-open-valley'

export type WaterwayClue = Readonly<{
  id: WaterwayClueId
  placeId: PlaceId
  at: Point2
  reach: number
  observationId: ObservationId
  action: string
  revisitingAction: string
  result: string
}>

/**
 * 가꾸기와 별개로 걸어서 만나는 첫 관계 사건이다.
 * 세 단서는 순서를 잠그지 않는다. B에서 방향을 고를 수도 있고 D나 F를 먼저 만날 수도 있다.
 */
export const WATERWAY_CLUES: readonly WaterwayClue[] = [
  {
    id: 'b-drifting-leaf',
    placeId: 'B',
    at: { x: 1.25, z: 0.2 },
    reach: 1.75,
    observationId: 'waterway-junction',
    action: '🍃 떠온 잎 살펴보기',
    revisitingAction: '🍃 떠온 잎 다시 보기',
    result: '물소리는 숲 쪽에서 오고, 잎은 열린 골짜기 쪽으로 흘러갑니다. 어느 쪽이든 따라갈 수 있어요.',
  },
  {
    id: 'd-white-water',
    placeId: 'D',
    at: { x: 0.2, z: -15 },
    reach: 1.8,
    observationId: 'waterway-upstream',
    action: '〰 흰 물살 살펴보기',
    revisitingAction: '〰 흰 물살 다시 보기',
    result: '잎이 흰 물살을 빠져나가 아래 계곡 물가 쪽으로 떠납니다. 이 물은 아까 본 물가로 이어집니다.',
  },
  {
    id: 'd-headwater-source',
    placeId: 'D',
    at: { x: -2.25, z: -22.25 },
    reach: 1.7,
    observationId: 'headwater-source',
    action: '🍂 발원지 가장자리 살펴보기',
    revisitingAction: '🍂 발원지 가장자리 다시 보기',
    result: '얕은 물은 돌 사이로 빨라지고, 낙엽 아래에서는 머물며 스밉니다. 왼쪽 관리 가장자리의 돌·가지·홈을 바꾸면 아래로 가는 모습도 달라집니다.',
  },
  {
    id: 'f-open-valley',
    placeId: 'F',
    at: { x: 0, z: 17.2 },
    reach: 1.9,
    observationId: 'waterway-downstream',
    action: '🍃 멀어지는 잎 살펴보기',
    revisitingAction: '🍃 멀어지는 잎 다시 보기',
    result: '잎이 열린 골짜기 쪽으로 계속 멀어집니다. 작은 물길은 이 아래에서 더 큰 물과 만날 것 같습니다.',
  },
]

export function getNearbyWaterwayClue(point: Point2): WaterwayClue | undefined {
  return WATERWAY_CLUES.map((clue) => ({
    clue,
    distance: Math.sqrt(distanceSquared(point, clue.at)),
  }))
    .filter(({ clue, distance }) => distance <= clue.reach)
    .sort((left, right) => left.distance - right.distance)[0]?.clue
}

export function assertWaterwayClueContract(): void {
  const expectedIds = 'b-drifting-leaf,d-white-water,d-headwater-source,f-open-valley'
  if (WATERWAY_CLUES.map(({ id }) => id).join(',') !== expectedIds) {
    throw new Error('첫 물길 사건의 네 단서 계약이 달라졌습니다.')
  }
  for (const clue of WATERWAY_CLUES) {
    if (!isWalkable(clue.at)) {
      throw new Error(clue.id + ' 단서에 마른 땅으로 닿을 수 없습니다.')
    }
    if (getEditZoneAt(clue.at)) {
      throw new Error(clue.id + ' 단서가 가꾸기 흙자리를 침범합니다.')
    }
    if (!Number.isFinite(clue.reach) || clue.reach <= 0) {
      throw new Error(clue.id + ' 단서의 살펴보기 거리가 올바르지 않습니다.')
    }
  }
}

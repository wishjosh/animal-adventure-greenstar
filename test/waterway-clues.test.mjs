import assert from 'node:assert/strict'
import test from 'node:test'
import {
  WATERWAY_CLUES,
  assertWaterwayClueContract,
  getNearbyWaterwayClue,
} from '../src/content/waterway-clues.ts'
import { getPlaceAt, isWalkable } from '../src/content/first-map.ts'

test('물길의 네 단서는 B 갈림과 D 계류·발원지, 아래쪽 F에 열린 채 놓인다', () => {
  assert.doesNotThrow(assertWaterwayClueContract)
  assert.deepEqual(
    WATERWAY_CLUES.map(({ id, placeId }) => [id, placeId]),
    [
      ['b-drifting-leaf', 'B'],
      ['d-white-water', 'D'],
      ['d-headwater-source', 'D'],
      ['f-open-valley', 'F'],
    ],
  )
  for (const clue of WATERWAY_CLUES) {
    assert.equal(isWalkable(clue.at), true)
    assert.equal(getPlaceAt(clue.at)?.id, clue.placeId)
  }
})

test('가까운 단서만 살펴보기로 잡고 범위를 벗어나면 아무것도 강요하지 않는다', () => {
  const junction = WATERWAY_CLUES[0]
  assert.equal(getNearbyWaterwayClue(junction.at)?.id, junction.id)
  assert.equal(
    getNearbyWaterwayClue({ x: junction.at.x + junction.reach + 0.01, z: junction.at.z }),
    undefined,
  )
  assert.equal(getNearbyWaterwayClue({ x: -11, z: 0 }), undefined)
})

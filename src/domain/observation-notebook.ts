import type { Point2 } from '../content/first-map.ts'
import {
  FIRST_MAP_TOAD_TUNING,
  type FireBelliedToadState,
  type ToadCue,
} from './fire-bellied-toad.ts'
import type {
  ResidentEvent,
  ResidentRuntime,
  SmallResidentsState,
} from './small-residents.ts'

export type ObservationId =
  | 'butterfly-protected-flower'
  | 'butterfly-made-flower'
  | 'butterfly-search'
  | 'snail-protected-cover'
  | 'snail-made-cover'
  | 'snail-search'
  | 'toad-trace'
  | 'toad-protected-edge'
  | 'toad-made-edge'
  | 'waterway-junction'
  | 'waterway-upstream'
  | 'waterway-downstream'
  | 'headwater-source'
  | 'headwater-arrival'

export type ObservationCard = Readonly<{
  condition: string
  resident: string
  behavior: string
  question: string
}>

export const OBSERVATION_CARDS: Readonly<Record<ObservationId, ObservationCard>> =
  Object.freeze({
    'butterfly-protected-flower': {
      condition: '볕 드는 낮은 꽃',
      resident: '나비류',
      behavior: '잠시 내려앉았다',
      question: '꽃이 없는 흙에서는 왜 자리를 찾다 돌아갈까?',
    },
    'butterfly-made-flower': {
      condition: '내가 심은 낮은 꽃',
      resident: '나비류',
      behavior: '새 자리를 찾아왔다',
      question: '꽃을 옮기면 다음에는 어느 자리를 고를까?',
    },
    'butterfly-search': {
      condition: '볕 드는 빈 흙',
      resident: '나비류',
      behavior: '내려오려다 다시 날아갔다',
      question: '낮은 꽃을 가까이 심으면 머물까?',
    },
    'snail-protected-cover': {
      condition: '그늘지고 촉촉한 본래 덮임',
      resident: '달팽이류',
      behavior: '짧은 젖은 길을 오갔다',
      question: '덮임이 끊긴 곳에서도 건너갈까?',
    },
    'snail-made-cover': {
      condition: '내가 이은 촉촉한 덮임',
      resident: '달팽이류',
      behavior: '새 길을 따라왔다',
      question: '흙이 마르거나 덮임을 옮기면 어디로 돌아갈까?',
    },
    'snail-search': {
      condition: '마르거나 덮임이 끊긴 흙',
      resident: '달팽이류',
      behavior: '조금 건너오다 돌아갔다',
      question: '물을 주고 낮은 덮임을 이어 주면 달라질까?',
    },
    'toad-trace': {
      condition: '피난처와 얕은 물가 사이',
      resident: '무당개구리',
      behavior: '잎과 물결 흔적을 남겼다',
      question: '어느 길로 물가에 다가올까?',
    },
    'toad-protected-edge': {
      condition: '본래 덮임에서 얕은 물가까지',
      resident: '무당개구리',
      behavior: '도약해 와 잠시 머물렀다',
      question: '가까이 가면 같은 길로 돌아갈까?',
    },
    'toad-made-edge': {
      condition: '내가 이은 낮은 덮임에서 물가까지',
      resident: '무당개구리',
      behavior: '새 길을 따라 물가에 왔다',
      question: '다른 덮임을 이으면 다음에는 어느 길을 고를까?',
    },
    'waterway-junction': {
      condition: '계곡 물가의 떠온 잎',
      resident: '흐르는 물',
      behavior: '위에서 와 아래로 이어졌다',
      question: '물소리를 따라 위로 갈까, 떠가는 잎을 따라 아래로 갈까?',
    },
    'waterway-upstream': {
      condition: '바위 계류의 흰 물살',
      resident: '낙엽',
      behavior: '아래 계곡 물가로 떠났다',
      question: '이 잎은 계곡 물가를 지나 어디까지 갈까?',
    },
    'waterway-downstream': {
      condition: '열린 골짜기의 작은 물길',
      resident: '물과 낙엽',
      behavior: '더 큰 물길 쪽으로 멀어졌다',
      question: '다른 작은 물길도 이 아래에서 만날까?',
    },
    'headwater-source': {
      condition: '위쪽 숲의 발원지 가장자리',
      resident: '빗물과 낙엽',
      behavior: '빠르게 흐르거나 머물며 스며들었다',
      question: '돌·가지·홈을 다르게 놓으면 아래 물가에는 무엇이 도착할까?',
    },
    'headwater-arrival': {
      condition: '내가 손본 발원지와 아래 계곡 물가',
      resident: '물과 낙엽',
      behavior: '시간을 두고 같은 물길로 이어졌다',
      question: '그늘·머무름·이어짐 가운데 무엇을 바꾸면 다음 잎은 달라질까?',
    },
  })

export type ObservationEntry = Readonly<{
  id: ObservationId
  firstSeenAt: number
}>

export type ObservationNotebookState = Readonly<{
  entries: readonly ObservationEntry[]
}>

export type ObservationFrameInput = Readonly<{
  elapsed: number
  playerAt: Point2
  started: boolean
  blocked: boolean
  smallResidents: SmallResidentsState
  smallEvents: readonly ResidentEvent[]
  toad: FireBelliedToadState
  toadCues: readonly ToadCue[]
}>

export type ObservationFrame = Readonly<{
  state: ObservationNotebookState
  added: readonly ObservationEntry[]
}>

const OBSERVATION_IDS = new Set<ObservationId>(
  Object.keys(OBSERVATION_CARDS) as ObservationId[],
)
const BUTTERFLY_OBSERVATION_DISTANCE = 6.5
const SNAIL_OBSERVATION_DISTANCE = 4.5

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasOnlyKeys(value: Record<string, unknown>, expected: readonly string[]): boolean {
  const actual = Object.keys(value).sort()
  const sortedExpected = [...expected].sort()
  return (
    actual.length === sortedExpected.length &&
    actual.every((key, index) => key === sortedExpected[index])
  )
}

function distance(left: Point2, right: Point2): number {
  return Math.hypot(left.x - right.x, left.z - right.z)
}

function visibleResident(runtime: ResidentRuntime, playerAt: Point2, range: number): boolean {
  return distance(runtime.position, playerAt) <= range
}

export function readObservationNotebookState(
  value: unknown,
): ObservationNotebookState | undefined {
  if (!isRecord(value) || !hasOnlyKeys(value, ['entries']) || !Array.isArray(value.entries)) {
    return undefined
  }
  if (value.entries.length > OBSERVATION_IDS.size) {
    return undefined
  }
  const seen = new Set<ObservationId>()
  const entries: ObservationEntry[] = []
  for (const candidate of value.entries) {
    if (
      !isRecord(candidate) ||
      !hasOnlyKeys(candidate, ['id', 'firstSeenAt']) ||
      typeof candidate.id !== 'string' ||
      !OBSERVATION_IDS.has(candidate.id as ObservationId) ||
      typeof candidate.firstSeenAt !== 'number' ||
      !Number.isFinite(candidate.firstSeenAt) ||
      candidate.firstSeenAt < 0 ||
      seen.has(candidate.id as ObservationId)
    ) {
      return undefined
    }
    const id = candidate.id as ObservationId
    seen.add(id)
    entries.push({ id, firstSeenAt: candidate.firstSeenAt })
  }
  return { entries }
}

export function createObservationNotebookState(
  restored?: ObservationNotebookState,
): ObservationNotebookState {
  return restored
    ? { entries: restored.entries.map((entry) => ({ ...entry })) }
    : { entries: [] }
}

export class ObservationNotebookRuntime {
  private state: ObservationNotebookState

  constructor(restored?: ObservationNotebookState) {
    this.state = createObservationNotebookState(restored)
  }

  reset(restored?: ObservationNotebookState): void {
    this.state = createObservationNotebookState(restored)
  }

  snapshot(): ObservationNotebookState {
    return this.state
  }

  has(id: ObservationId): boolean {
    return this.state.entries.some((entry) => entry.id === id)
  }

  record(id: ObservationId, elapsed: number): readonly ObservationEntry[] {
    if (this.has(id)) {
      return []
    }
    const entry = {
      id,
      firstSeenAt: Number.isFinite(elapsed) ? Math.max(0, elapsed) : 0,
    }
    this.state = { entries: [...this.state.entries, entry] }
    return [entry]
  }

  capture(input: ObservationFrameInput): ObservationFrame {
    if (!input.started || input.blocked) {
      return { state: this.state, added: [] }
    }

    const entries = [...this.state.entries]
    const known = new Set(entries.map(({ id }) => id))
    const added: ObservationEntry[] = []
    const firstSeenAt = Number.isFinite(input.elapsed) ? Math.max(0, input.elapsed) : 0
    const observe = (id: ObservationId): void => {
      if (known.has(id)) {
        return
      }
      const entry = { id, firstSeenAt }
      known.add(id)
      entries.push(entry)
      added.push(entry)
    }

    const butterfly = input.smallResidents.butterfly
    if (
      butterfly.phase === 'using' &&
      butterfly.target &&
      visibleResident(butterfly, input.playerAt, BUTTERFLY_OBSERVATION_DISTANCE)
    ) {
      if (butterfly.target.kind === 'edit-flower') {
        observe('butterfly-made-flower')
      } else if (butterfly.target.kind === 'protected-flower') {
        observe('butterfly-protected-flower')
      }
    }

    const snail = input.smallResidents.snail
    if (
      snail.phase === 'using' &&
      snail.target &&
      visibleResident(snail, input.playerAt, SNAIL_OBSERVATION_DISTANCE)
    ) {
      if (snail.target.kind === 'managed-cover') {
        observe('snail-made-cover')
      } else if (snail.target.kind === 'protected-cover') {
        observe('snail-protected-cover')
      }
    }

    for (const event of input.smallEvents) {
      if (
        event.type === 'reached-search' &&
        distance(event.at, input.playerAt) <=
          (event.kind === 'day-butterfly'
            ? BUTTERFLY_OBSERVATION_DISTANCE
            : SNAIL_OBSERVATION_DISTANCE)
      ) {
        observe(event.kind === 'day-butterfly' ? 'butterfly-search' : 'snail-search')
      }
    }

    const route = input.toad.activeRoute
    if (route) {
      for (const cue of input.toadCues) {
        if (
          cue === 'water-ripple' &&
          distance(route.rippleAt, input.playerAt) <=
            FIRST_MAP_TOAD_TUNING.observableDistance
        ) {
          observe('toad-trace')
        }
        if (
          cue === 'water-touch' &&
          distance(input.toad.position, input.playerAt) <=
            FIRST_MAP_TOAD_TUNING.observableDistance
        ) {
          observe(route.kind === 'managed' ? 'toad-made-edge' : 'toad-protected-edge')
        }
      }
    }

    if (added.length > 0) {
      this.state = { entries }
    }
    return { state: this.state, added }
  }
}

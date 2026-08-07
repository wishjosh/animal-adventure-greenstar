import {
  EDIT_ZONES,
  isInsideEditZone,
  type EditZoneId,
  type Point2,
} from '../content/first-map.ts'

export type EditEntryKind = 'low-flower' | 'low-cover' | 'surface-adjustment'

export type EditEntry = Readonly<{
  id: string
  zoneId: EditZoneId
  kind: EditEntryKind
  at: Point2
  rotation: number
}>

export type ZoneOverlay = Readonly<Record<string, EditEntry>>
export type EditSnapshot = Readonly<Record<EditZoneId, ZoneOverlay>>

// 저장되는 상태에는 현재 모습만 들어간다. 되돌리기 이력은 아래 EditSession에만 머문다.
export type PersistentEditState = Readonly<{
  current: EditSnapshot
  nextId: number
  revision: number
}>

type EditHistory = Readonly<Record<EditZoneId, readonly ZoneOverlay[]>>

export type EditSession = Readonly<{
  state: PersistentEditState
  history: EditHistory
}>

export type EditCommand =
  | Readonly<{
      type: 'place'
      zoneId: EditZoneId
      kind: 'low-flower' | 'low-cover'
      at: Point2
      rotation?: number
    }>
  | Readonly<{
      type: 'adjust-ground'
      zoneId: EditZoneId
      at: Point2
      rotation?: number
    }>
  | Readonly<{
      type: 'move'
      zoneId: EditZoneId
      id: string
      to: Point2
      rotation?: number
    }>
  | Readonly<{ type: 'retrieve'; zoneId: EditZoneId; id: string }>
  | Readonly<{ type: 'restore-ground'; zoneId: EditZoneId; id: string }>
  | Readonly<{ type: 'undo'; zoneId: EditZoneId }>

export type EditGuard = Readonly<{
  occupiedEntryIds?: readonly string[]
}>

export type EditRejection =
  | 'unknown-edit-zone'
  | 'outside-edit-zone'
  | 'occupied'
  | 'unknown-entry'
  | 'kind-not-allowed'
  | 'overlap'
  | 'nothing-to-undo'

export type EditResult = Readonly<{
  session: EditSession
  changed: boolean
  entryId?: string
  rejection?: EditRejection
}>

export const EDIT_ZONE_IDS: readonly EditZoneId[] = [
  'a-garden',
  'b-bright-soil',
  'b-moist-soil',
]

export const MAX_UNDO_PER_ZONE = 24

const FOOTPRINT_RADIUS: Readonly<Record<EditEntryKind, number>> = {
  'low-flower': 0.42,
  'low-cover': 0.58,
  'surface-adjustment': 0.68,
}

function emptyZoneRecord<T>(factory: () => T): Record<EditZoneId, T> {
  return {
    'a-garden': factory(),
    'b-bright-soil': factory(),
    'b-moist-soil': factory(),
  }
}

export function createEmptyEditState(): PersistentEditState {
  return {
    current: emptyZoneRecord<ZoneOverlay>(() => ({})),
    nextId: 1,
    revision: 0,
  }
}

function cloneOverlay(overlay: ZoneOverlay): ZoneOverlay {
  return Object.fromEntries(
    Object.entries(overlay).map(([id, entry]) => [
      id,
      { ...entry, at: { x: entry.at.x, z: entry.at.z } },
    ]),
  )
}

export function clonePersistentEditState(state: PersistentEditState): PersistentEditState {
  return {
    current: {
      'a-garden': cloneOverlay(state.current['a-garden']),
      'b-bright-soil': cloneOverlay(state.current['b-bright-soil']),
      'b-moist-soil': cloneOverlay(state.current['b-moist-soil']),
    },
    nextId: state.nextId,
    revision: state.revision,
  }
}

export function createEditSession(
  restored: PersistentEditState = createEmptyEditState(),
): EditSession {
  return {
    state: clonePersistentEditState(restored),
    history: emptyZoneRecord<readonly ZoneOverlay[]>(() => []),
  }
}

export function toPersistentEditState(session: EditSession): PersistentEditState {
  return clonePersistentEditState(session.state)
}

export function getZoneEntries(
  session: EditSession,
  zoneId: EditZoneId,
): readonly EditEntry[] {
  return Object.values(session.state.current[zoneId])
}

export function getEntry(session: EditSession, id: string): EditEntry | undefined {
  for (const zoneId of EDIT_ZONE_IDS) {
    const entry = session.state.current[zoneId][id]
    if (entry) {
      return entry
    }
  }
  return undefined
}

function undoChangesOccupiedEntry(
  session: EditSession,
  zoneId: EditZoneId,
  previous: ZoneOverlay,
  guard: EditGuard,
): boolean {
  return guard.occupiedEntryIds?.some((id) => {
    const currentEntry = session.state.current[zoneId][id]
    if (!currentEntry) {
      return false
    }
    const previousEntry = previous[id]
    return !previousEntry || !entriesAreEqual(currentEntry, previousEntry)
  }) ?? false
}

export function canUndo(
  session: EditSession,
  zoneId: EditZoneId,
  guard: EditGuard = {},
): boolean {
  const previous = session.history[zoneId].at(-1)
  return previous !== undefined && !undoChangesOccupiedEntry(session, zoneId, previous, guard)
}

export function canPlaceEntry(
  session: EditSession,
  zoneId: EditZoneId,
  kind: EditEntryKind,
  at: Point2,
  ignoreId?: string,
): EditRejection | undefined {
  const zone = EDIT_ZONES.find(({ id }) => id === zoneId)
  if (!zone || !isInsideEditZone(at, zone, FOOTPRINT_RADIUS[kind])) {
    return 'outside-edit-zone'
  }

  const overlaps = Object.values(session.state.current[zoneId]).some((entry) => {
    if (entry.id === ignoreId) {
      return false
    }
    const oneIsGround =
      entry.kind === 'surface-adjustment' || kind === 'surface-adjustment'
    if (oneIsGround && entry.kind !== kind) {
      return false
    }
    const minimumDistance =
      kind === 'surface-adjustment'
        ? 0.5
        : (FOOTPRINT_RADIUS[entry.kind] + FOOTPRINT_RADIUS[kind]) * 0.68
    return (entry.at.x - at.x) ** 2 + (entry.at.z - at.z) ** 2 < minimumDistance ** 2
  })
  return overlaps ? 'overlap' : undefined
}

function unchanged(session: EditSession, rejection: EditRejection): EditResult {
  return { session, changed: false, rejection }
}

function commitZone(
  session: EditSession,
  zoneId: EditZoneId,
  overlay: ZoneOverlay,
  nextId = session.state.nextId,
): EditSession {
  const priorHistory = session.history[zoneId]
  return {
    state: {
      current: { ...session.state.current, [zoneId]: overlay },
      nextId,
      revision: session.state.revision + 1,
    },
    history: {
      ...session.history,
      [zoneId]: [...priorHistory, session.state.current[zoneId]].slice(-MAX_UNDO_PER_ZONE),
    },
  }
}

function entriesAreEqual(left: EditEntry, right: EditEntry): boolean {
  return (
    left.id === right.id &&
    left.zoneId === right.zoneId &&
    left.kind === right.kind &&
    left.at.x === right.at.x &&
    left.at.z === right.at.z &&
    left.rotation === right.rotation
  )
}

export function applyEdit(
  session: EditSession,
  command: EditCommand,
  guard: EditGuard = {},
): EditResult {
  if (!EDIT_ZONE_IDS.includes(command.zoneId)) {
    return unchanged(session, 'unknown-edit-zone')
  }
  if (
    command.type === 'place' &&
    command.kind !== 'low-flower' &&
    command.kind !== 'low-cover'
  ) {
    return unchanged(session, 'kind-not-allowed')
  }
  if (command.type === 'undo') {
    const history = session.history[command.zoneId]
    const previous = history.at(-1)
    if (!previous) {
      return unchanged(session, 'nothing-to-undo')
    }
    if (undoChangesOccupiedEntry(session, command.zoneId, previous, guard)) {
      return unchanged(session, 'occupied')
    }
    return {
      changed: true,
      session: {
        state: {
          current: { ...session.state.current, [command.zoneId]: previous },
          nextId: session.state.nextId,
          revision: session.state.revision + 1,
        },
        history: { ...session.history, [command.zoneId]: history.slice(0, -1) },
      },
    }
  }

  if (command.type === 'place' || command.type === 'adjust-ground') {
    const kind: EditEntryKind =
      command.type === 'adjust-ground' ? 'surface-adjustment' : command.kind
    const rejection = canPlaceEntry(session, command.zoneId, kind, command.at)
    if (rejection) {
      return unchanged(session, rejection)
    }
    const id = 'edit-' + String(session.state.nextId)
    const entry: EditEntry = {
      id,
      zoneId: command.zoneId,
      kind,
      at: { x: command.at.x, z: command.at.z },
      rotation: command.rotation ?? 0,
    }
    return {
      session: commitZone(
        session,
        command.zoneId,
        { ...session.state.current[command.zoneId], [id]: entry },
        session.state.nextId + 1,
      ),
      changed: true,
      entryId: id,
    }
  }

  const entry = session.state.current[command.zoneId][command.id]
  if (!entry) {
    return unchanged(session, 'unknown-entry')
  }
  if (guard.occupiedEntryIds?.includes(entry.id)) {
    return unchanged(session, 'occupied')
  }

  if (command.type === 'move') {
    if (entry.kind === 'surface-adjustment') {
      return unchanged(session, 'kind-not-allowed')
    }
    const rejection = canPlaceEntry(
      session,
      command.zoneId,
      entry.kind,
      command.to,
      entry.id,
    )
    if (rejection) {
      return unchanged(session, rejection)
    }
    const moved: EditEntry = {
      ...entry,
      at: { x: command.to.x, z: command.to.z },
      rotation: command.rotation ?? entry.rotation,
    }
    return {
      session: commitZone(session, command.zoneId, {
        ...session.state.current[command.zoneId],
        [entry.id]: moved,
      }),
      changed: true,
      entryId: entry.id,
    }
  }

  if (command.type === 'retrieve' && entry.kind === 'surface-adjustment') {
    return unchanged(session, 'kind-not-allowed')
  }
  if (command.type === 'restore-ground' && entry.kind !== 'surface-adjustment') {
    return unchanged(session, 'kind-not-allowed')
  }
  const nextOverlay = { ...session.state.current[command.zoneId] }
  delete nextOverlay[entry.id]
  return {
    session: commitZone(session, command.zoneId, nextOverlay),
    changed: true,
    entryId: entry.id,
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function readEntry(value: unknown, id: string, zoneId: EditZoneId): EditEntry | undefined {
  if (!isRecord(value) || value.id !== id || value.zoneId !== zoneId) {
    return undefined
  }
  if (
    value.kind !== 'low-flower' &&
    value.kind !== 'low-cover' &&
    value.kind !== 'surface-adjustment'
  ) {
    return undefined
  }
  if (!isRecord(value.at) || !isFiniteNumber(value.at.x) || !isFiniteNumber(value.at.z)) {
    return undefined
  }
  if (!isFiniteNumber(value.rotation)) {
    return undefined
  }
  return {
    id,
    zoneId,
    kind: value.kind,
    at: { x: value.at.x, z: value.at.z },
    rotation: value.rotation,
  }
}

// 손상되었거나 다른 버전의 저장값은 부분 복구하지 않고 새 세계로 안전하게 돌아간다.
export function readPersistentEditState(value: unknown): PersistentEditState | undefined {
  if (!isRecord(value) || !isRecord(value.current)) {
    return undefined
  }
  if (
    !Number.isSafeInteger(value.nextId) ||
    (value.nextId as number) < 1 ||
    !Number.isSafeInteger(value.revision) ||
    (value.revision as number) < 0
  ) {
    return undefined
  }

  const overlays = emptyZoneRecord<Record<string, EditEntry>>(() => ({}))
  const ids = new Set<string>()
  let greatestId = 0
  for (const zoneId of EDIT_ZONE_IDS) {
    const rawOverlay = value.current[zoneId]
    if (!isRecord(rawOverlay)) {
      return undefined
    }
    for (const [id, rawEntry] of Object.entries(rawOverlay)) {
      const idMatch = /^edit-(\d+)$/.exec(id)
      const entry = readEntry(rawEntry, id, zoneId)
      if (!idMatch || !entry || ids.has(id)) {
        return undefined
      }
      const numericId = Number(idMatch[1])
      if (!Number.isSafeInteger(numericId) || numericId < 1) {
        return undefined
      }
      const zone = EDIT_ZONES.find(({ id: candidate }) => candidate === zoneId)
      if (!zone || !isInsideEditZone(entry.at, zone, FOOTPRINT_RADIUS[entry.kind])) {
        return undefined
      }
      ids.add(id)
      greatestId = Math.max(greatestId, numericId)
      overlays[zoneId][id] = entry
    }
  }
  const nextId = value.nextId as number
  const revision = value.revision as number
  if (nextId <= greatestId) {
    return undefined
  }
  const state: PersistentEditState = { current: overlays, nextId, revision }
  const session = createEditSession(state)
  for (const zoneId of EDIT_ZONE_IDS) {
    for (const entry of Object.values(overlays[zoneId])) {
      if (canPlaceEntry(session, zoneId, entry.kind, entry.at, entry.id)) {
        return undefined
      }
    }
  }
  return clonePersistentEditState(state)
}

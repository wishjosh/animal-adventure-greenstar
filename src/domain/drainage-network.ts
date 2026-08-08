import {
  DRAINAGE_OUTLETS,
  distanceToSegment,
  type EditZoneId,
  type Point2,
} from '../content/first-map.ts'
import {
  DRAINAGE_CONNECTION_REACH,
  EDIT_ZONE_IDS,
  drainageSegmentEndpoints,
  type DrainageSegmentEntry,
  type EditSnapshot,
  type PersistentEditState,
} from './edit-model.ts'

export type DrainageNetworkState = 'none' | 'holding' | 'outflow'
export type DrainageEndpointName = 'from' | 'to'

export type DrainageEndpoint = Readonly<{
  entryId: string
  end: DrainageEndpointName
  at: Point2
}>

export type DrainageConnection = Readonly<{
  left: DrainageEndpoint
  right: DrainageEndpoint
  at: Point2
}>

export type DrainageOutletConnection = Readonly<{
  entryId: string
  end: DrainageEndpointName
  outletId: string
  at: Point2
  distance: number
}>

export type DrainageComponent = Readonly<{
  id: string
  entryIds: readonly string[]
  state: Exclude<DrainageNetworkState, 'none'>
  outletConnections: readonly DrainageOutletConnection[]
}>

export type DrainageNetwork = Readonly<{
  zoneId: EditZoneId
  state: DrainageNetworkState
  segments: readonly DrainageSegmentEntry[]
  endpoints: readonly DrainageEndpoint[]
  connections: readonly DrainageConnection[]
  outletConnections: readonly DrainageOutletConnection[]
  components: readonly DrainageComponent[]
}>

type DrainageStateSource = EditSnapshot | PersistentEditState

function snapshotOf(source: DrainageStateSource): EditSnapshot {
  return 'current' in source ? source.current : source
}

function endpointDistance(left: DrainageEndpoint, right: DrainageEndpoint): number {
  return Math.hypot(left.at.x - right.at.x, left.at.z - right.at.z)
}

function endpointsFor(entry: DrainageSegmentEntry): readonly DrainageEndpoint[] {
  const endpoints = drainageSegmentEndpoints(entry)
  return [
    { entryId: entry.id, end: 'from', at: endpoints.from },
    { entryId: entry.id, end: 'to', at: endpoints.to },
  ]
}

/** 저장된 조각만으로 연결·출구 상태를 매번 같은 순서로 재구성한다. */
export function deriveDrainageNetwork(
  source: DrainageStateSource,
  zoneId: EditZoneId = 'a-garden',
): DrainageNetwork {
  const segments = Object.values(snapshotOf(source)[zoneId])
    .filter((entry): entry is DrainageSegmentEntry => entry.kind === 'drainage-segment')
    .sort((left, right) => left.id.localeCompare(right.id))
  const endpoints = segments.flatMap(endpointsFor)
  const connections: DrainageConnection[] = []
  const adjacency = new Map(segments.map((segment) => [segment.id, new Set<string>()]))

  for (let leftIndex = 0; leftIndex < endpoints.length; leftIndex += 1) {
    const left = endpoints[leftIndex]!
    for (let rightIndex = leftIndex + 1; rightIndex < endpoints.length; rightIndex += 1) {
      const right = endpoints[rightIndex]!
      if (
        left.entryId === right.entryId ||
        endpointDistance(left, right) > DRAINAGE_CONNECTION_REACH
      ) {
        continue
      }
      connections.push({
        left,
        right,
        at: {
          x: (left.at.x + right.at.x) / 2,
          z: (left.at.z + right.at.z) / 2,
        },
      })
      adjacency.get(left.entryId)!.add(right.entryId)
      adjacency.get(right.entryId)!.add(left.entryId)
    }
  }

  const outlets = DRAINAGE_OUTLETS.filter((outlet) => outlet.zoneId === zoneId)
  const outletConnections = endpoints
    .flatMap((endpoint) =>
      outlets.flatMap((outlet): readonly DrainageOutletConnection[] => {
        const distance = Math.hypot(
          endpoint.at.x - outlet.at.x,
          endpoint.at.z - outlet.at.z,
        )
        return distance <= outlet.reach
          ? [{
              entryId: endpoint.entryId,
              end: endpoint.end,
              outletId: outlet.id,
              at: endpoint.at,
              distance,
            }]
          : []
      }),
    )
    .sort((left, right) =>
      left.entryId.localeCompare(right.entryId) ||
      left.end.localeCompare(right.end) ||
      left.outletId.localeCompare(right.outletId),
    )

  const components: DrainageComponent[] = []
  const visited = new Set<string>()
  for (const segment of segments) {
    if (visited.has(segment.id)) {
      continue
    }
    const pending = [segment.id]
    const entryIds: string[] = []
    while (pending.length > 0) {
      const entryId = pending.shift()!
      if (visited.has(entryId)) {
        continue
      }
      visited.add(entryId)
      entryIds.push(entryId)
      pending.push(
        ...[...(adjacency.get(entryId) ?? [])]
          .filter((neighbor) => !visited.has(neighbor))
          .sort((left, right) => left.localeCompare(right)),
      )
    }
    entryIds.sort((left, right) => left.localeCompare(right))
    const componentOutletConnections = outletConnections.filter(({ entryId }) =>
      entryIds.includes(entryId),
    )
    components.push({
      id: entryIds[0]!,
      entryIds,
      state: componentOutletConnections.length > 0 ? 'outflow' : 'holding',
      outletConnections: componentOutletConnections,
    })
  }

  const state: DrainageNetworkState = segments.length === 0
    ? 'none'
    : components.some((component) => component.state === 'outflow')
      ? 'outflow'
      : 'holding'
  return {
    zoneId,
    state,
    segments,
    endpoints,
    connections,
    outletConnections,
    components,
  }
}

export function drainageNetworkState(
  source: DrainageStateSource,
  zoneId: EditZoneId = 'a-garden',
): DrainageNetworkState {
  return deriveDrainageNetwork(source, zoneId).state
}

function componentNearPoint(
  network: DrainageNetwork,
  point: Point2,
  reach: number,
): DrainageComponent | undefined {
  const nearest = network.segments
    .map((segment) => {
      const endpoints = drainageSegmentEndpoints(segment)
      return {
        segment,
        distance: distanceToSegment(point, endpoints.from, endpoints.to),
      }
    })
    .filter(({ distance }) => distance <= reach)
    .sort((left, right) =>
      left.distance - right.distance || left.segment.id.localeCompare(right.segment.id),
    )[0]
  return nearest
    ? network.components.find((component) => component.entryIds.includes(nearest.segment.id))
    : undefined
}

/** 한 지점에 닿는 최근접 배수 조각과 연결된 조각 ID만 돌려준다. */
export function drainageEntryIdsNearPoint(
  source: DrainageStateSource,
  zoneId: EditZoneId,
  point: Point2,
  reach = 0.3,
): readonly string[] {
  if (!Number.isFinite(reach) || reach < 0) {
    return []
  }
  return [...(componentNearPoint(deriveDrainageNetwork(source, zoneId), point, reach)?.entryIds ?? [])]
}

/** 한 지점에 실제로 닿는 배수 조각의 연결 상태만 돌려준다. */
export function drainageStateNearPoint(
  source: DrainageStateSource,
  zoneId: EditZoneId,
  point: Point2,
  reach = 0.3,
): DrainageNetworkState {
  if (!Number.isFinite(reach) || reach < 0) {
    return 'none'
  }
  const network = deriveDrainageNetwork(source, zoneId)
  return componentNearPoint(network, point, reach)?.state ?? 'none'
}

export function assertDrainageNetworkContract(): void {
  if (
    DRAINAGE_OUTLETS.map(({ zoneId }) => zoneId).join(',') !==
      'a-garden,d-headwater-edge'
  ) {
    throw new Error('A 정원과 D 발원지 가장자리의 배수 출구 계약이 달라졌습니다.')
  }
  if (DRAINAGE_OUTLETS.some((outlet) => !EDIT_ZONE_IDS.includes(outlet.zoneId))) {
    throw new Error('배수 출구 가운데 존재하지 않는 편집 구역을 가리키는 것이 있습니다.')
  }
}

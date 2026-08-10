import * as THREE from 'three'
import {
  EDIT_ZONES,
  HEADWATER_COURSE,
  ROUTES,
  UPSTREAM_SPUR,
  WATER_CHANNEL,
  WATER_COURSE,
  WATER_SOURCES,
  WORLD_CENTER,
  WORLD_RADII,
  distanceSquared,
  distanceToPolyline,
  getEditZoneAt,
  isInsideWorld,
  terrainHeight,
  waterSurfaceHeight,
  type CareZoneId,
  type EditZone,
  type EditZoneId,
  type Point2,
  type Route,
} from '../content/first-map.ts'
import {
  DRAINAGE_SEGMENT_HALF_WIDTH,
  MANAGED_SOIL_PATCH_RADIUS,
  STRUCTURE_FOOTPRINTS,
  createEmptyEditState,
  editedTerrainHeight,
  type DrainageSegmentEntry,
  type EditEntry,
  type EditSnapshot,
  type StructureEntry,
  type TerrainPatchEntry,
} from '../domain/edit-model.ts'
import type { FireBelliedToadState, ToadCue } from '../domain/fire-bellied-toad.ts'
import {
  derivePlantGrowth,
  type PersistentPlantGrowthState,
  type PlantGrowthStage,
} from '../domain/plant-growth.ts'
import type { SmallResidentsState } from '../domain/small-residents.ts'
import {
  NATURAL_HEADWATER_PROFILE,
  headwaterProfileAtB,
  hasUpstreamDeliveryArrived,
  pendingUpstreamDelivery,
  upstreamDeliveryProgress,
  type HeadwaterProfile,
  type PersistentUpstreamWaterwayState,
} from '../domain/upstream-waterway.ts'
import type { GameSnapshot } from '../runtime/game-runtime.ts'
import { WATERWAY_CLUES } from '../content/waterway-clues.ts'
import { EcologyThreeView } from './ecology-three-view.ts'

const ROUTE_COLORS = {
  shared: 0xa3926d,
  'water-bank': 0x879673,
  'upper-return': 0x6f765f,
  'lower-return': 0xa59a74,
} as const

type AnimatedWater = Readonly<{
  material: THREE.MeshStandardMaterial
  phase: number
}>

type AnimatedWaterwayLeaf = Readonly<{
  mesh: THREE.Mesh
  baseX: number
  baseY: number
  baseZ: number
  phase: number
}>

type AnimatedHeadwaterFoam = Readonly<{
  mesh: THREE.Mesh
  from: Point2
  to: Point2
  phase: number
  lateral: number
}>

type GroundAnchoredEntry = Readonly<{
  at: Point2
  rotation: number
  kind?: EditEntry['kind']
}>

type StructurePiece = Readonly<{
  from: THREE.Vector3
  to: THREE.Vector3
  thickness: number
  depth?: number
}>

type RenderRoute = Pick<Route, 'id' | 'kind' | 'width' | 'points'>

const SOIL_LIFT = 0.075
const EDIT_ENTRY_LIFT = 0.095

const TERRAIN_COLORS = Object.freeze({
  meadow: new THREE.Color(0x7f9c63),
  home: new THREE.Color(0x91a86c),
  forest: new THREE.Color(0x55775a),
  highForest: new THREE.Color(0x627d54),
  lowland: new THREE.Color(0x96a66a),
  damp: new THREE.Color(0x627a5c),
  edge: new THREE.Color(0x4d6b50),
})

const RENDER_ROUTES: readonly RenderRoute[] = [
  ...ROUTES,
  {
    id: 'D-headwater-spur',
    kind: 'water-bank',
    width: 1.9,
    points: UPSTREAM_SPUR,
  },
]

const TREE_POSITIONS: readonly Readonly<{
  at: Point2
  scale: number
  kind: 'conifer' | 'deciduous'
  tone: number
}>[] = [
  { at: { x: -18.4, z: -3.1 }, scale: 1.08, kind: 'deciduous', tone: 0 },
  { at: { x: -16.1, z: -7.2 }, scale: 1.02, kind: 'conifer', tone: 1 },
  { at: { x: -13.6, z: -10.8 }, scale: 1.08, kind: 'conifer', tone: 0 },
  { at: { x: -13.1, z: -13.3 }, scale: 0.9, kind: 'deciduous', tone: 1 },
  { at: { x: -9.5, z: -8.4 }, scale: 0.94, kind: 'conifer', tone: 2 },
  { at: { x: -7.2, z: -6.8 }, scale: 0.88, kind: 'deciduous', tone: 2 },
  { at: { x: -14.9, z: 7.4 }, scale: 0.88, kind: 'deciduous', tone: 0 },
  { at: { x: -12.8, z: 8.4 }, scale: 1.06, kind: 'conifer', tone: 1 },
  { at: { x: -15.4, z: 12.6 }, scale: 1.02, kind: 'deciduous', tone: 1 },
  { at: { x: -14.1, z: 15.7 }, scale: 0.9, kind: 'conifer', tone: 2 },
  { at: { x: -18.3, z: 2.5 }, scale: 1.12, kind: 'conifer', tone: 0 },
  { at: { x: 7.0, z: -5.4 }, scale: 1.12, kind: 'conifer', tone: 2 },
  { at: { x: 7.7, z: -10.3 }, scale: 0.94, kind: 'deciduous', tone: 0 },
  { at: { x: 7.2, z: 7.1 }, scale: 1.04, kind: 'deciduous', tone: 2 },
  { at: { x: 8.8, z: 13.2 }, scale: 1.15, kind: 'conifer', tone: 1 },
  { at: { x: 4.8, z: 20.2 }, scale: 0.9, kind: 'deciduous', tone: 1 },
  { at: { x: -18.1, z: -14.8 }, scale: 1.18, kind: 'conifer', tone: 1 },
  { at: { x: -13.9, z: -18.3 }, scale: 1.08, kind: 'conifer', tone: 2 },
  { at: { x: 3.8, z: -20.8 }, scale: 1.1, kind: 'conifer', tone: 0 },
  // 발원지 활동 공간 뒤의 실제 세계 경계가 빈 판처럼 보이지 않게 닫는다.
  { at: { x: -6.7, z: -24.1 }, scale: 0.88, kind: 'conifer', tone: 1 },
  { at: { x: -3.7, z: -24.55 }, scale: 0.82, kind: 'deciduous', tone: 0 },
  { at: { x: 1.55, z: -23.5 }, scale: 0.84, kind: 'conifer', tone: 2 },
  { at: { x: -16.8, z: 18.8 }, scale: 1.12, kind: 'deciduous', tone: 2 },
]

function unitNoise(x: number, z: number, seed = 0): number {
  const value = Math.sin(x * 12.9898 + z * 78.233 + seed * 37.719) * 43758.5453
  return value - Math.floor(value)
}

function textSeed(text: string): number {
  let seed = 0
  for (let index = 0; index < text.length; index += 1) {
    seed = (seed * 31 + text.charCodeAt(index)) >>> 0
  }
  return seed
}

function subdividePolyline(
  points: readonly Point2[],
  maximumSegmentLength: number,
): readonly Point2[] {
  const sampled: Point2[] = []
  for (let index = 0; index < points.length - 1; index += 1) {
    const start = points[index]!
    const end = points[index + 1]!
    const distance = Math.hypot(end.x - start.x, end.z - start.z)
    const steps = Math.max(1, Math.ceil(distance / maximumSegmentLength))
    for (let step = 0; step < steps; step += 1) {
      const amount = step / steps
      sampled.push({
        x: start.x + (end.x - start.x) * amount,
        z: start.z + (end.z - start.z) * amount,
      })
    }
  }
  const last = points.at(-1)
  if (last) {
    sampled.push({ x: last.x, z: last.z })
  }
  return sampled
}

const RENDER_WATER_COURSE = subdividePolyline(WATER_COURSE, 1.05)

const BASE_HEADWATER_PROFILE = NATURAL_HEADWATER_PROFILE
const HEADWATER_DEEP_WATER_COLOR = new THREE.Color(0x356f74)
const HEADWATER_SHADED_SEEP_COLOR = new THREE.Color(0x405c4e)
const UPSTREAM_SHADED_LEAF_COLOR = new THREE.Color(0x738052)

const UPSTREAM_DELIVERY_COURSE = WATER_COURSE.slice(
  0,
  Math.max(2, WATER_COURSE.findIndex(({ z }) => z >= 0) + 1),
)
const UPSTREAM_DELIVERY_SEGMENTS = UPSTREAM_DELIVERY_COURSE.slice(0, -1).map(
  (from, index) => {
    const to = UPSTREAM_DELIVERY_COURSE[index + 1]!
    return {
      from,
      to,
      length: Math.hypot(to.x - from.x, to.z - from.z),
    }
  },
)
const UPSTREAM_DELIVERY_LENGTH = UPSTREAM_DELIVERY_SEGMENTS.reduce(
  (sum, segment) => sum + segment.length,
  0,
)

export class ThreeScene {
  private readonly scene = new THREE.Scene()
  private readonly camera = new THREE.PerspectiveCamera(52, 1, 0.1, 180)
  private readonly renderer: THREE.WebGLRenderer
  private readonly ecologyView: EcologyThreeView
  private readonly canvas: HTMLCanvasElement
  private readonly player = new THREE.Group()
  private readonly playerTorso = new THREE.Group()
  private readonly playerLeftArm = new THREE.Group()
  private readonly playerRightArm = new THREE.Group()
  private readonly playerLeftElbow = new THREE.Group()
  private readonly playerRightElbow = new THREE.Group()
  private readonly playerLeftLeg = new THREE.Group()
  private readonly playerRightLeg = new THREE.Group()
  private readonly playerLeftKnee = new THREE.Group()
  private readonly playerRightKnee = new THREE.Group()
  private readonly playerHead = new THREE.Group()
  private previousPlayerAt: Point2 | undefined
  private playerWalkPhase = 0
  private playerWalkBlend = 0
  private readonly editEntryRoot = new THREE.Group()
  private readonly cameraTarget = new THREE.Vector3()
  private readonly desiredCamera = new THREE.Vector3()
  private readonly animatedWater: AnimatedWater[] = []
  private readonly animatedWaterwayLeaves: AnimatedWaterwayLeaf[] = []
  private readonly animatedHeadwaterFoam: AnimatedHeadwaterFoam[] = []
  private readonly headwaterVisualRoot = new THREE.Group()
  private headwaterSlowWater: THREE.Mesh | undefined
  private headwaterSeepPatch: THREE.Mesh | undefined
  private headwaterDryPatch: THREE.Mesh | undefined
  private headwaterProfile: HeadwaterProfile = BASE_HEADWATER_PROFILE
  private upstreamWaterwayState: PersistentUpstreamWaterwayState | undefined
  private upstreamDeliveryLeaf: THREE.Mesh | undefined
  private readonly bDeliveredRoot = new THREE.Group()
  private bDeliveredCalmWater: THREE.Mesh | undefined
  private bDeliveredRipple: THREE.Mesh | undefined
  private bDeliveredLeaf: THREE.Mesh | undefined
  private readonly soilMeshes = new Map<EditZoneId, THREE.Mesh>()
  private readonly zoneOutlines = new Map<EditZoneId, THREE.LineLoop>()
  private readonly routeMeshes = new Map<string, THREE.Mesh>()
  private readonly editEntryGroups = new Map<string, THREE.Group>()
  private readonly drainageWaterMeshes = new Map<string, THREE.Mesh>()
  private wetDrainageEntryIds = new Set<string>()
  private readonly activeEditUseIds = new Set<string>()
  private readonly editEntryReactions = new Map<string, number>()
  private readonly raycaster = new THREE.Raycaster()
  private readonly pointer = new THREE.Vector2()
  private terrainMesh: THREE.Mesh | undefined
  private editSnapshot: EditSnapshot = createEmptyEditState().current
  private terrainEditSignature = ''
  private readonly drainageStartMarker = new THREE.Group()
  private drainageStartAt: Point2 | undefined
  private surfaceMoisture: Readonly<Record<CareZoneId, 'dry' | 'moist'>> = {
    'a-garden': 'dry',
    'b-bright-soil': 'dry',
    'b-moist-soil': 'moist',
  }
  private activeEditZoneId: EditZoneId | undefined
  private buildMode = false
  private compactLandscape = false
  private viewportWidth = 1
  private viewportHeight = 1

  constructor(
    canvas: HTMLCanvasElement,
    initialSmallResidents: SmallResidentsState,
    initialToad: FireBelliedToadState,
  ) {
    this.canvas = canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65))
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFShadowMap
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.03
    this.scene.background = new THREE.Color(0xc8ddd8)
    this.scene.fog = new THREE.Fog(0xc8ddd8, 39, 94)
    this.buildLights()
    this.buildSky()
    this.buildDistantLandscape()
    this.buildTerrain()
    this.buildRoutes()
    this.buildWater()
    this.buildEditZones()
    this.buildWaterSources()
    this.buildWaterwayClues()
    this.buildLandmarks()
    this.buildPlayer()
    this.scene.add(this.editEntryRoot)
    this.buildDrainageStartMarker()
    this.scene.add(this.drainageStartMarker)
    this.ecologyView = new EcologyThreeView(
      this.scene,
      initialSmallResidents,
      initialToad,
      (x, z) => this.groundHeightAt(x, z),
    )
  }

  resize(width: number, height: number): void {
    const safeWidth = Math.max(1, width)
    const safeHeight = Math.max(1, height)
    this.viewportWidth = safeWidth
    this.viewportHeight = safeHeight
    this.compactLandscape = safeHeight < 520
    this.updateProjection()
    this.renderer.setSize(safeWidth, safeHeight, false)
  }

  /**
   * 물을 준 흙은 색이 어두워지고 덜 거칠어진다.
   * 물리 변화는 즉시 보이고 생물의 반응은 나중에 온다.
   */
  syncSurfaceMoisture(
    moisture: Readonly<Record<CareZoneId, 'dry' | 'moist'>>,
    wetDrainageEntryIds: readonly string[] = [],
  ): void {
    this.surfaceMoisture = moisture
    this.wetDrainageEntryIds = new Set(wetDrainageEntryIds)
    for (const zone of EDIT_ZONES) {
      const soil = this.soilMeshes.get(zone.id)
      if (!soil) {
        continue
      }
      const material = soil.material as THREE.MeshStandardMaterial
      const wet = zone.id === 'd-headwater-edge' || moisture[zone.id] === 'moist'
      material.color.set(zone.soilColor)
      if (wet) {
        material.color.multiplyScalar(0.72)
      }
      material.roughness = wet
        ? 0.62
        : zone.tone === 'moist' || zone.tone === 'headwater'
          ? 0.72
          : 0.94
      material.needsUpdate = true
    }
    for (const [entryId, water] of this.drainageWaterMeshes) {
      const zoneId = water.userData.editZoneId as EditZoneId | undefined
      water.visible = zoneId !== undefined &&
        this.isZoneVisuallyMoist(zoneId) &&
        this.wetDrainageEntryIds.has(entryId)
    }
  }

  /** 발원지의 현재 모습과 아래 B까지 이동 중인 변화를 같은 세계 시간으로 그린다. */
  syncUpstreamWaterway(
    state: PersistentUpstreamWaterwayState,
    worldElapsed: number,
  ): void {
    this.upstreamWaterwayState = state
    const profile = pendingUpstreamDelivery(state)?.profile ?? headwaterProfileAtB(state)
    if (
      profile.shade !== this.headwaterProfile.shade ||
      profile.retention !== this.headwaterProfile.retention ||
      profile.continuity !== this.headwaterProfile.continuity
    ) {
      this.headwaterProfile = profile
      this.updateHeadwaterProfileVisuals()
    }
    this.updateUpstreamDeliveryVisuals(worldElapsed)
  }

  private isZoneVisuallyMoist(zoneId: EditZoneId): boolean {
    // 발원지의 자연 수분은 A·B의 물주기/마름 상태와 별개다.
    return zoneId === 'd-headwater-edge' || this.surfaceMoisture[zoneId] === 'moist'
  }

  syncEdits(snapshot: EditSnapshot): void {
    this.editSnapshot = snapshot
    const terrainSignature = this.terrainSignature(snapshot)
    if (terrainSignature !== this.terrainEditSignature) {
      this.terrainEditSignature = terrainSignature
      this.refreshEditedTerrain()
    }
    const currentIds = new Set<string>()
    for (const zone of EDIT_ZONES) {
      for (const entry of Object.values(snapshot[zone.id])) {
        currentIds.add(entry.id)
        let group = this.editEntryGroups.get(entry.id)
        const variant = entry.kind === 'terrain-patch'
          ? entry.kind + ':' + entry.direction + ':' + terrainSignature
          : entry.kind === 'surface-adjustment'
            ? [entry.kind, entry.at.x, entry.at.z, terrainSignature].join(':')
          : entry.kind === 'drainage-segment'
            ? [entry.kind, entry.length, entry.at.x, entry.at.z, entry.rotation, terrainSignature]
              .join(':')
            : entry.kind === 'structure'
              ? [entry.kind, entry.form, entry.at.x, entry.at.z, entry.rotation, terrainSignature]
                .join(':')
              : entry.kind
        if (group?.userData.editEntryVariant !== variant) {
          this.removeEditEntry(entry.id, group)
          group = undefined
        }
        if (!group) {
          group = this.createEditEntryGroup(entry)
          this.editEntryGroups.set(entry.id, group)
          this.editEntryRoot.add(group)
        }
        group.position.set(
          entry.at.x,
          this.groundHeightAt(entry.at.x, entry.at.z) + EDIT_ENTRY_LIFT,
          entry.at.z,
        )
        group.rotation.set(
          0,
          entry.kind === 'drainage-segment' || entry.kind === 'structure'
            ? -entry.rotation
            : entry.rotation,
          0,
        )
        group.userData.editEntryId = entry.id
        group.userData.editEntryKind = entry.kind
        group.userData.editEntryVariant = variant
        group.userData.editZoneId = entry.zoneId
        const thinned = entry.kind === 'low-flower' && entry.thinned
        group.userData.editEntryThinned = thinned
        group.traverse((object) => {
          if (object.name === 'plant-density-extra') {
            object.visible = !thinned
          }
        })
      }
    }

    for (const [id, group] of this.editEntryGroups) {
      if (!currentIds.has(id)) {
        this.removeEditEntry(id, group)
      }
    }
    this.updateBuildEntryVisibility()
    this.updateDrainageStartMarkerPosition()
  }

  private groundHeightAt(x: number, z: number): number {
    return editedTerrainHeight(this.editSnapshot, x, z)
  }

  private terrainSignature(snapshot: EditSnapshot): string {
    return EDIT_ZONES.flatMap((zone) =>
      Object.values(snapshot[zone.id])
        .filter((entry) =>
          entry.kind === 'terrain-patch' || entry.kind === 'drainage-segment',
        )
        .sort((left, right) => left.id.localeCompare(right.id))
        .map((entry) => entry.kind === 'terrain-patch'
          ? [entry.id, entry.direction, entry.at.x, entry.at.z].join(':')
          : [entry.id, entry.length, entry.at.x, entry.at.z, entry.rotation].join(':')),
    ).join('|')
  }

  /** 실제 지형 조형이 달라진 순간에만 정점과 선택 표면을 다시 맞춘다. */
  private refreshEditedTerrain(): void {
    if (this.terrainMesh) {
      const geometry = this.terrainMesh.geometry
      const positions = geometry.getAttribute('position')
      const colors = geometry.getAttribute('color')
      for (let index = 0; index < positions.count; index += 1) {
        const x = positions.getX(index)
        const z = positions.getZ(index)
        const height = this.groundHeightAt(x, z)
        positions.setY(index, height)
        const color = this.terrainColorAt(x, z, height)
        colors.setXYZ(index, color.r, color.g, color.b)
      }
      positions.needsUpdate = true
      colors.needsUpdate = true
      geometry.computeVertexNormals()
      geometry.computeBoundingBox()
      geometry.computeBoundingSphere()
    }

    for (const route of RENDER_ROUTES) {
      const mesh = this.routeMeshes.get(route.id)
      if (!mesh) continue
      const previous = mesh.geometry
      mesh.geometry = this.createRouteGeometry(route, new THREE.Color(ROUTE_COLORS[route.kind]))
      previous.dispose()
    }

    for (const zone of EDIT_ZONES) {
      const soil = this.soilMeshes.get(zone.id)
      if (soil) {
        const previous = soil.geometry
        soil.geometry = this.createSoilGeometry(zone)
        previous.dispose()
      }
      const outline = this.zoneOutlines.get(zone.id)
      if (outline) {
        const previous = outline.geometry
        outline.geometry = this.createEditOutlineGeometry(zone)
        previous.dispose()
      }
    }
    this.ecologyView?.resetGroundTraces()
    this.updateDrainageStartMarkerPosition()
  }

  private updateBuildEntryVisibility(): void {
    for (const group of this.editEntryGroups.values()) {
      const kind = group.userData.editEntryKind as EditEntry['kind'] | undefined
      const active = this.buildMode && group.userData.editZoneId === this.activeEditZoneId
      if (kind === 'terrain-patch') {
        group.visible = active
        continue
      }
      // 물길과 구조물 자체는 가꾸기 화면에서도 지형의 일부로 남는다. 다만
      // 넓은 선택면과 청록 표식은 만들기 층에서만 raycast와 화면에 나타난다.
      group.visible = true
      group.traverse((object) => {
        if (object.userData.buildOnly === true) {
          object.visible = active
        }
      })
    }
    this.updateDrainageStartMarkerVisibility()
  }

  /**
   * 저장된 성장량을 화면 단계로 바꾼다. 성장 진행률은 주민 접촉 반응이 쓰는
   * 편집물 루트가 아니라 현재 단계의 자식 그룹에만 적용한다.
   */
  syncPlantGrowth(state: PersistentPlantGrowthState, worldElapsed: number): void {
    const stages: readonly PlantGrowthStage[] = ['seed', 'sprout', 'young', 'adult']
    for (const [entryId, group] of this.editEntryGroups) {
      if (group.userData.editEntryKind !== 'low-flower') {
        continue
      }
      const record = state.byEntryId[entryId]
      const view = record ? derivePlantGrowth(record, worldElapsed) : undefined
      const activeStage = view?.stage ?? 'seed'
      const progress = view?.stageProgress ?? 0
      let activeGroup: THREE.Object3D | undefined

      for (const stage of stages) {
        const stageGroup = group.getObjectByName('plant-stage-' + stage)
        if (!stageGroup) {
          continue
        }
        stageGroup.visible = stage === activeStage
        stageGroup.scale.set(1, 1, 1)
        if (stage === activeStage) {
          activeGroup = stageGroup
        }
      }

      if (activeGroup) {
        const horizontalScale = activeStage === 'seed'
          ? 0.92 + progress * 0.08
          : 0.82 + progress * 0.18
        const verticalScale = activeStage === 'seed'
          ? 0.94 + progress * 0.06
          : 0.65 + progress * 0.35
        activeGroup.scale.set(horizontalScale, verticalScale, horizontalScale)
      }
      group.userData.plantGrowthStage = activeStage
      group.userData.plantGrowthProgress = progress
    }
  }

  syncEcology(
    smallResidents: SmallResidentsState,
    toad: FireBelliedToadState,
    cues: readonly ToadCue[],
  ): void {
    const nextUseIds = new Set<string>()
    for (const resident of [smallResidents.butterfly, smallResidents.snail]) {
      const entryId = resident.phase === 'using' ? resident.target?.entryId : undefined
      if (!entryId) {
        continue
      }
      nextUseIds.add(entryId)
      if (!this.activeEditUseIds.has(entryId)) {
        this.editEntryReactions.set(entryId, 0)
      }
    }
    if (toad.phase === 'using') {
      for (const entryId of toad.activeRoute?.entryIds ?? []) {
        nextUseIds.add(entryId)
        if (!this.activeEditUseIds.has(entryId)) {
          this.editEntryReactions.set(entryId, 0)
        }
      }
    }
    this.activeEditUseIds.clear()
    nextUseIds.forEach((id) => this.activeEditUseIds.add(id))
    this.ecologyView.sync(smallResidents, toad, cues)
  }

  resetEcology(
    smallResidents: SmallResidentsState,
    toad: FireBelliedToadState,
  ): void {
    this.activeEditUseIds.clear()
    this.editEntryReactions.clear()
    this.ecologyView.reset(smallResidents, toad)
  }

  setEditZone(zoneId: EditZoneId | undefined): void {
    this.activeEditZoneId = zoneId
    for (const [id, outline] of this.zoneOutlines) {
      outline.visible = id === zoneId
    }
    this.player.visible = zoneId === undefined
    this.updateBuildEntryVisibility()
    this.updateProjection()

    const zone = EDIT_ZONES.find(({ id }) => id === zoneId)
    if (zone) {
      this.updateEditCamera(zone, 0, true)
    }
  }

  setBuildMode(active: boolean): void {
    this.buildMode = active
    this.updateBuildEntryVisibility()
  }

  /** 물길의 첫 탭을 두 번째 탭까지 짧은 말뚝과 고리로 기억한다. */
  setDrainageStart(at?: Point2): void {
    this.drainageStartAt = at ? { x: at.x, z: at.z } : undefined
    this.updateDrainageStartMarkerPosition()
    this.updateDrainageStartMarkerVisibility()
  }

  private buildDrainageStartMarker(): void {
    const material = new THREE.MeshStandardMaterial({
      color: 0x4db7ae,
      emissive: 0x275f5d,
      emissiveIntensity: 0.12,
      roughness: 0.64,
    })
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.018, 6, 24), material)
    ring.name = 'drainage-start-ring'
    ring.rotation.x = Math.PI / 2
    ring.position.y = 0.018
    const stake = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.032, 0.32, 6), material)
    stake.name = 'drainage-start-stake'
    stake.position.y = 0.16
    stake.castShadow = true
    this.drainageStartMarker.name = 'drainage-start-marker'
    this.drainageStartMarker.visible = false
    this.drainageStartMarker.add(ring, stake)
  }

  private updateDrainageStartMarkerPosition(): void {
    const at = this.drainageStartAt
    if (!at) {
      return
    }
    this.drainageStartMarker.position.set(
      at.x,
      this.groundHeightAt(at.x, at.z) + SOIL_LIFT + 0.02,
      at.z,
    )
  }

  private updateDrainageStartMarkerVisibility(): void {
    const startZoneId = this.drainageStartAt
      ? getEditZoneAt(this.drainageStartAt)?.id
      : undefined
    this.drainageStartMarker.visible = Boolean(
      this.drainageStartAt &&
      this.buildMode &&
      startZoneId === this.activeEditZoneId,
    )
  }

  pickGround(clientX: number, clientY: number): Point2 | undefined {
    if (!this.activeEditZoneId || !this.setPointerRay(clientX, clientY)) {
      return undefined
    }
    const targets = [
      this.soilMeshes.get(this.activeEditZoneId),
      this.terrainMesh,
    ].filter((object): object is THREE.Mesh => object !== undefined)
    if (targets.length === 0) {
      return undefined
    }
    const hit = this.raycaster.intersectObjects(targets, false)[0]
    return hit ? { x: hit.point.x, z: hit.point.z } : undefined
  }

  pickEditEntry(clientX: number, clientY: number): string | undefined {
    if (!this.activeEditZoneId || !this.setPointerRay(clientX, clientY)) {
      return undefined
    }
    const intersections = this.raycaster.intersectObject(this.editEntryRoot, true)
    for (const intersection of intersections) {
      let object: THREE.Object3D | null = intersection.object
      while (object && object !== this.editEntryRoot) {
        const id = object.userData.editEntryId
        const zoneId = object.userData.editZoneId
        const kind = object.userData.editEntryKind
        const buildOnlyKind =
          kind === 'terrain-patch' || kind === 'drainage-segment' || kind === 'structure'
        const headwaterBuildOnly = zoneId === 'd-headwater-edge' && kind === 'low-cover'
        const isSelectableInCurrentLayer =
          (!buildOnlyKind && !headwaterBuildOnly) || this.buildMode
        if (
          typeof id === 'string' &&
          zoneId === this.activeEditZoneId &&
          isSelectableInCurrentLayer
        ) {
          return id
        }
        object = object.parent
      }
    }
    return undefined
  }

  render(snapshot: GameSnapshot, deltaSeconds: number): void {
    const playerGround = this.groundHeightAt(snapshot.playerAt.x, snapshot.playerAt.z)
    const travelled = this.previousPlayerAt
      ? Math.hypot(
          snapshot.playerAt.x - this.previousPlayerAt.x,
          snapshot.playerAt.z - this.previousPlayerAt.z,
        )
      : 0
    const walking = snapshot.started && !snapshot.blocked && travelled > 0.0005 && travelled < 0.8
    const frameDelta = Math.max(0, deltaSeconds)
    const settle = 1 - Math.exp(-frameDelta * 10)
    this.playerWalkBlend = THREE.MathUtils.lerp(
      this.playerWalkBlend,
      walking ? 1 : 0,
      1 - Math.exp(-frameDelta * 7),
    )
    if (walking) {
      this.playerWalkPhase += frameDelta * 8.2
    }
    const gaitWave = Math.sin(this.playerWalkPhase)
    const gait = gaitWave * this.playerWalkBlend
    const crossing = Math.cos(this.playerWalkPhase)
    const armSwing = gait * 0.4
    const legSwing = gait * 0.38
    const leftElbowBend = -(
      0.2 + Math.max(0, -gaitWave) * 0.32
    ) * this.playerWalkBlend
    const rightElbowBend = -(
      0.2 + Math.max(0, gaitWave) * 0.32
    ) * this.playerWalkBlend
    const leftKneeBend = Math.max(0, crossing) * this.playerWalkBlend * 0.95
    const rightKneeBend = Math.max(0, -crossing) * this.playerWalkBlend * 0.95
    this.playerLeftArm.rotation.x = THREE.MathUtils.lerp(
      this.playerLeftArm.rotation.x,
      armSwing,
      settle,
    )
    this.playerRightArm.rotation.x = THREE.MathUtils.lerp(
      this.playerRightArm.rotation.x,
      -armSwing,
      settle,
    )
    this.playerLeftElbow.rotation.x = THREE.MathUtils.lerp(
      this.playerLeftElbow.rotation.x,
      leftElbowBend,
      settle,
    )
    this.playerRightElbow.rotation.x = THREE.MathUtils.lerp(
      this.playerRightElbow.rotation.x,
      rightElbowBend,
      settle,
    )
    this.playerLeftLeg.rotation.x = THREE.MathUtils.lerp(
      this.playerLeftLeg.rotation.x,
      -legSwing,
      settle,
    )
    this.playerRightLeg.rotation.x = THREE.MathUtils.lerp(
      this.playerRightLeg.rotation.x,
      legSwing,
      settle,
    )
    this.playerLeftKnee.rotation.x = THREE.MathUtils.lerp(
      this.playerLeftKnee.rotation.x,
      leftKneeBend,
      settle,
    )
    this.playerRightKnee.rotation.x = THREE.MathUtils.lerp(
      this.playerRightKnee.rotation.x,
      rightKneeBend,
      settle,
    )
    const shoulderTwist = gait * 0.09
    const sideLean = gait * 0.025
    this.playerTorso.rotation.x = THREE.MathUtils.lerp(
      this.playerTorso.rotation.x,
      this.playerWalkBlend * 0.025,
      settle,
    )
    this.playerTorso.rotation.y = THREE.MathUtils.lerp(
      this.playerTorso.rotation.y,
      shoulderTwist,
      settle,
    )
    this.playerTorso.rotation.z = THREE.MathUtils.lerp(
      this.playerTorso.rotation.z,
      sideLean,
      settle,
    )
    this.playerHead.rotation.y = THREE.MathUtils.lerp(
      this.playerHead.rotation.y,
      -shoulderTwist * 0.55,
      settle,
    )
    this.playerHead.rotation.z = THREE.MathUtils.lerp(
      this.playerHead.rotation.z,
      -sideLean * 0.55,
      settle,
    )
    const bob = this.playerWalkBlend * (0.012 - Math.cos(this.playerWalkPhase * 2) * 0.008)
    const lateralSway = gait * 0.012
    this.player.position.set(
      snapshot.playerAt.x + Math.cos(snapshot.playerHeading) * lateralSway,
      playerGround + bob,
      snapshot.playerAt.z - Math.sin(snapshot.playerHeading) * lateralSway,
    )
    this.player.rotation.y = snapshot.playerHeading
    this.previousPlayerAt = { x: snapshot.playerAt.x, z: snapshot.playerAt.z }

    const activeZone = EDIT_ZONES.find(({ id }) => id === this.activeEditZoneId)
    if (activeZone) {
      this.updateEditCamera(activeZone, deltaSeconds, false)
    } else {
      this.updateWalkingCamera(snapshot, deltaSeconds, playerGround)
    }

    for (const water of this.animatedWater) {
      water.material.emissiveIntensity =
        0.035 + Math.sin(snapshot.elapsed * 1.7 + water.phase) * 0.012
    }
    for (const leaf of this.animatedWaterwayLeaves) {
      const drift = (Math.sin(snapshot.elapsed * 0.62 + leaf.phase) + 1) * 0.5
      leaf.mesh.position.x = leaf.baseX + Math.sin(snapshot.elapsed * 0.9 + leaf.phase) * 0.055
      leaf.mesh.position.y =
        leaf.baseY + Math.sin(snapshot.elapsed * 2.1 + leaf.phase) * 0.035
      leaf.mesh.position.z = leaf.baseZ + drift * 0.24
      leaf.mesh.rotation.y =
        leaf.phase + Math.sin(snapshot.elapsed * 0.75 + leaf.phase) * 0.32
    }
    for (const foam of this.animatedHeadwaterFoam) {
      const speed = 0.14 + this.headwaterProfile.continuity * 0.46
      const progress = (snapshot.elapsed * speed + foam.phase) % 1
      const deltaX = foam.to.x - foam.from.x
      const deltaZ = foam.to.z - foam.from.z
      const length = Math.max(0.001, Math.hypot(deltaX, deltaZ))
      const normalX = -deltaZ / length
      const normalZ = deltaX / length
      const x = foam.from.x + deltaX * progress + normalX * foam.lateral
      const z = foam.from.z + deltaZ * progress + normalZ * foam.lateral
      foam.mesh.position.set(x, waterSurfaceHeight(x, z) + 0.065, z)
      foam.mesh.rotation.z = -Math.atan2(deltaX, deltaZ)
      const pulse = Math.sin(progress * Math.PI)
      foam.mesh.scale.set(0.42 + pulse * 0.46, 0.11, 1)
    }
    this.updateUpstreamDeliveryVisuals(snapshot.elapsed)
    this.updateEditEntryReactions(snapshot.started && !snapshot.blocked ? deltaSeconds : 0)
    this.ecologyView.update(
      snapshot.started && !snapshot.blocked ? deltaSeconds : 0,
      snapshot.elapsed,
    )
    this.renderer.render(this.scene, this.camera)
  }

  private updateEditEntryReactions(deltaSeconds: number): void {
    for (const [id, group] of this.editEntryGroups) {
      const age = this.editEntryReactions.get(id)
      const contactPart = group.getObjectByName('structure-contact-part')
      group.rotation.x = 0
      group.rotation.z = 0
      group.scale.set(1, 1, 1)
      if (contactPart) {
        contactPart.rotation.x = 0
        contactPart.rotation.z = 0
      }
      if (age === undefined) {
        continue
      }
      const nextAge = age + deltaSeconds
      const strength = Math.max(0, 1 - nextAge / 0.95)
      const kind = group.userData.editEntryKind as EditEntry['kind'] | undefined
      const bend = Math.sin(nextAge * Math.PI * 5.2) * strength
      if (kind === 'low-flower') {
        group.rotation.z = bend * 0.11
        group.scale.y = 1 - Math.sin(Math.min(1, nextAge / 0.34) * Math.PI) * 0.09
      } else if (kind === 'low-cover') {
        group.rotation.x = bend * 0.055
        group.scale.y = 1 - Math.sin(Math.min(1, nextAge / 0.4) * Math.PI) * 0.06
      } else if (kind === 'structure') {
        const form = group.userData.structureForm as StructureEntry['form'] | undefined
        if (form === 'shade' && contactPart) {
          contactPart.rotation.z = bend * 0.045
        } else if (form === 'support' || form === 'rack') {
          group.rotation.z = bend * 0.025
        }
      }
      if (nextAge >= 0.95) {
        this.editEntryReactions.delete(id)
        group.rotation.x = 0
        group.rotation.z = 0
        group.scale.set(1, 1, 1)
        if (contactPart) {
          contactPart.rotation.x = 0
          contactPart.rotation.z = 0
        }
      } else {
        this.editEntryReactions.set(id, nextAge)
      }
    }
  }

  private updateProjection(): void {
    this.camera.aspect = this.viewportWidth / this.viewportHeight
    this.camera.fov = this.compactLandscape ? 57 : 52
    this.camera.clearViewOffset()
    if (this.activeEditZoneId) {
      const reservedBottom = this.editDockReserve()
      this.camera.setViewOffset(
        this.viewportWidth,
        this.viewportHeight,
        0,
        reservedBottom / 2,
        this.viewportWidth,
        this.viewportHeight,
      )
      return
    }
    this.camera.updateProjectionMatrix()
  }

  private updateWalkingCamera(
    snapshot: GameSnapshot,
    deltaSeconds: number,
    playerGround: number,
  ): void {
    const cameraHeight = this.compactLandscape ? 6.05 : 5.2
    const distance = snapshot.cameraDistance + (this.compactLandscape ? 0.55 : 0)
    const lookAhead = 0.42
    this.cameraTarget.set(
      snapshot.playerAt.x + Math.sin(snapshot.playerHeading) * lookAhead,
      playerGround + 1.12,
      snapshot.playerAt.z + Math.cos(snapshot.playerHeading) * lookAhead,
    )
    this.desiredCamera.set(
      this.cameraTarget.x + Math.sin(snapshot.cameraYaw) * distance,
      this.cameraTarget.y + cameraHeight,
      this.cameraTarget.z + Math.cos(snapshot.cameraYaw) * distance,
    )
    const blend = 1 - Math.exp(-Math.max(0, deltaSeconds) * 5.5)
    if (this.camera.position.lengthSq() === 0) {
      this.camera.position.copy(this.desiredCamera)
    } else {
      this.camera.position.lerp(this.desiredCamera, blend)
    }
    this.camera.lookAt(this.cameraTarget)
  }

  private updateEditCamera(zone: EditZone, deltaSeconds: number, snap: boolean): void {
    const ground = this.groundHeightAt(zone.focus.x, zone.focus.z)
    const radius = Math.max(
      1,
      ...zone.outline.map((point) => {
        const deltaY = this.groundHeightAt(point.x, point.z) - ground
        return Math.hypot(point.x - zone.focus.x, point.z - zone.focus.z, deltaY)
      }),
    ) + 0.55
    const usableFraction = Math.max(
      0.52,
      (this.viewportHeight - this.editDockReserve() - 20) / this.viewportHeight,
    )
    const halfVerticalFov = THREE.MathUtils.degToRad(this.camera.fov / 2)
    const distance = Math.max(
      5.5,
      radius / (Math.tan(halfVerticalFov) * usableFraction * 0.8),
    )
    const directionY = 1 / Math.hypot(1, 0.55)
    const directionZ = 0.55 / Math.hypot(1, 0.55)

    this.cameraTarget.set(zone.focus.x, ground + 0.18, zone.focus.z)
    this.desiredCamera.set(
      zone.focus.x,
      this.cameraTarget.y + directionY * distance,
      zone.focus.z + directionZ * distance,
    )
    const blend = snap ? 1 : 1 - Math.exp(-Math.max(0, deltaSeconds) * 6.5)
    if (snap || this.camera.position.lengthSq() === 0) {
      this.camera.position.copy(this.desiredCamera)
    } else {
      this.camera.position.lerp(this.desiredCamera, blend)
    }
    this.camera.lookAt(this.cameraTarget)
  }

  private editDockReserve(): number {
    return Math.min(138, Math.max(108, this.viewportHeight * 0.22))
  }

  private buildLights(): void {
    const sky = new THREE.HemisphereLight(0xe8f1df, 0x4c5e4d, 1.5)
    this.scene.add(sky)
    const sun = new THREE.DirectionalLight(0xffedba, 3.05)
    sun.position.set(-19, 31, 13)
    sun.target.position.set(WORLD_CENTER.x, 0, WORLD_CENTER.z)
    sun.castShadow = true
    sun.shadow.mapSize.set(1536, 1536)
    sun.shadow.camera.left = -34
    sun.shadow.camera.right = 34
    sun.shadow.camera.top = 34
    sun.shadow.camera.bottom = -34
    sun.shadow.camera.near = 4
    sun.shadow.camera.far = 90
    sun.shadow.bias = -0.00025
    sun.shadow.normalBias = 0.025
    this.scene.add(sun, sun.target)
  }

  private buildSky(): void {
    const geometry = new THREE.SphereGeometry(112, 28, 16)
    const positions = geometry.getAttribute('position')
    const colors: number[] = []
    const horizon = new THREE.Color(0xe9e4c8)
    const middle = new THREE.Color(0xc8ddd8)
    const top = new THREE.Color(0x91bfd0)
    for (let index = 0; index < positions.count; index += 1) {
      const normalizedY = THREE.MathUtils.clamp((positions.getY(index) / 112 + 0.14) / 0.92, 0, 1)
      const color = normalizedY < 0.42
        ? horizon.clone().lerp(middle, normalizedY / 0.42)
        : middle.clone().lerp(top, (normalizedY - 0.42) / 0.58)
      colors.push(color.r, color.g, color.b)
    }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    const sky = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        toneMapped: false,
      }),
    )
    sky.position.set(WORLD_CENTER.x, -9, WORLD_CENTER.z)
    sky.renderOrder = -10
    this.scene.add(sky)
  }

  private buildDistantLandscape(): void {
    const hills: readonly Readonly<{
      x: number
      z: number
      radius: number
      height: number
      color: number
      rotation: number
    }>[] = [
      { x: -31, z: -24, radius: 14, height: 15, color: 0x5f7959, rotation: 0.2 },
      { x: -13, z: -35, radius: 17, height: 19, color: 0x647d58, rotation: 0.7 },
      { x: 10, z: -34, radius: 15, height: 17, color: 0x6b815b, rotation: 1.1 },
      { x: 25, z: -18, radius: 14, height: 13, color: 0x6e845e, rotation: 0.4 },
      { x: 24, z: 7, radius: 13, height: 11, color: 0x748962, rotation: 0.8 },
      { x: 14, z: 33, radius: 18, height: 10, color: 0x809267, rotation: 0.1 },
      { x: -13, z: 37, radius: 19, height: 12, color: 0x768b61, rotation: 0.55 },
      { x: -31, z: 19, radius: 14, height: 14, color: 0x617a58, rotation: 0.9 },
    ]
    for (const hill of hills) {
      const mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1, 1),
        new THREE.MeshStandardMaterial({
          color: hill.color,
          roughness: 1,
          flatShading: true,
        }),
      )
      mesh.scale.set(hill.radius, hill.height * 0.58, hill.radius * 0.72)
      mesh.position.set(hill.x, terrainHeight(hill.x, hill.z) + hill.height * 0.18 - 2.4, hill.z)
      mesh.rotation.y = hill.rotation
      mesh.receiveShadow = true
      this.scene.add(mesh)
    }
  }

  private buildTerrain(): void {
    const width = WORLD_RADII.x * 2.12
    // 북쪽 발원지는 걷는 경계 가까이에 있어 자유 카메라에서 지형 끝이 드러나기 쉽다.
    // 충돌 경계는 그대로 두고 화면용 지형만 뒤로 넓혀 기존 저장 좌표를 건드리지 않는다.
    const depth = WORLD_RADII.z * 2.56
    // 좁은 수로의 완만한 양쪽 비탈이 각 단면에서 여러 꼭짓점으로 표현되게 한다.
    const geometry = new THREE.PlaneGeometry(width, depth, 96, 144)
    geometry.rotateX(-Math.PI / 2)
    const positions = geometry.getAttribute('position')
    const colors: number[] = []
    for (let index = 0; index < positions.count; index += 1) {
      const worldX = positions.getX(index) + WORLD_CENTER.x
      const worldZ = positions.getZ(index) + WORLD_CENTER.z
      const height = this.groundHeightAt(worldX, worldZ)
      positions.setXYZ(index, worldX, height, worldZ)
      const color = this.terrainColorAt(worldX, worldZ, height)
      colors.push(color.r, color.g, color.b)
    }
    positions.needsUpdate = true
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.computeVertexNormals()
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.96,
      metalness: 0,
    })
    this.terrainMesh = new THREE.Mesh(geometry, material)
    this.terrainMesh.receiveShadow = true
    this.scene.add(this.terrainMesh)
  }

  private terrainColorAt(x: number, z: number, height: number): THREE.Color {
    const homeInfluence = Math.exp(-distanceSquared({ x, z }, { x: -11, z: 0 }) / 82)
    const forestInfluence = Math.max(
      Math.exp(-distanceSquared({ x, z }, { x: -1.2, z: -8 }) / 58),
      Math.exp(-distanceSquared({ x, z }, { x: -3, z: -16 }) / 72),
    )
    const lowlandInfluence = Math.exp(-distanceSquared({ x, z }, { x: -4, z: 17 }) / 92)
    const waterDistance = distanceToPolyline({ x, z }, WATER_COURSE)
    const dampInfluence = 1 - THREE.MathUtils.smoothstep(waterDistance, 2.2, 6.4)
    const edgeRadius = Math.sqrt(
      ((x - WORLD_CENTER.x) / WORLD_RADII.x) ** 2 +
      ((z - WORLD_CENTER.z) / WORLD_RADII.z) ** 2,
    )
    const edgeInfluence = THREE.MathUtils.smoothstep(edgeRadius, 0.78, 1.02)
    const heightInfluence = THREE.MathUtils.clamp((height - 2.4) / 4.8, 0, 1)
    // 꼭짓점마다 끊기는 난수 얼룩 대신 넓게 이어지는 미세한 색 변화만 준다.
    const variation =
      Math.sin(x * 0.34 + z * 0.19) * 0.018 +
      Math.cos(z * 0.27 - x * 0.11) * 0.012

    const color = TERRAIN_COLORS.meadow.clone()
    color.lerp(TERRAIN_COLORS.home, homeInfluence * 0.48)
    color.lerp(TERRAIN_COLORS.forest, forestInfluence * 0.72)
    color.lerp(TERRAIN_COLORS.highForest, heightInfluence * forestInfluence * 0.28)
    color.lerp(TERRAIN_COLORS.lowland, lowlandInfluence * 0.5)
    color.lerp(TERRAIN_COLORS.damp, dampInfluence * 0.44)
    color.lerp(TERRAIN_COLORS.edge, edgeInfluence * 0.84)
    color.offsetHSL(variation * 0.08, variation * 0.16, variation)
    return color
  }

  private buildRoutes(): void {
    for (const route of RENDER_ROUTES) {
      const baseColor = new THREE.Color(ROUTE_COLORS[route.kind])
      const material = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 1,
        polygonOffset: true,
        polygonOffsetFactor: -1,
      })
      const path = new THREE.Mesh(this.createRouteGeometry(route, baseColor), material)
      path.receiveShadow = true
      path.name = 'terrain-following-route-' + route.id
      this.routeMeshes.set(route.id, path)
      this.scene.add(path)
    }
  }

  private createRouteGeometry(route: RenderRoute, baseColor: THREE.Color): THREE.BufferGeometry {
    const points = subdividePolyline(route.points, 0.62)
    const positions: number[] = []
    const colors: number[] = []
    const indices: number[] = []
    const columns = 3
    points.forEach((point, index) => {
      const normal = this.polylineNormal(points, index)
      const widthVariation = 0.94 + unitNoise(point.x, point.z, 7) * 0.1
      const halfWidth = route.width * 0.5 * widthVariation
      ;[-halfWidth, 0, halfWidth].forEach((offset, column) => {
        const x = point.x + normal.x * offset
        const z = point.z + normal.z * offset
        const centerCrown = column === 1 ? 0.018 : 0
        positions.push(x, this.groundHeightAt(x, z) + 0.042 + centerCrown, z)
        const shade = baseColor.clone()
        const noise = unitNoise(x, z, 9)
        shade.offsetHSL((noise - 0.5) * 0.018, (noise - 0.5) * 0.045, (noise - 0.5) * 0.08)
        if (column !== 1) {
          shade.multiplyScalar(0.91)
        }
        colors.push(shade.r, shade.g, shade.b)
      })
    })

    for (let row = 0; row < points.length - 1; row += 1) {
      for (let column = 0; column < columns - 1; column += 1) {
        const nearLeft = row * columns + column
        const nearRight = nearLeft + 1
        const farLeft = nearLeft + columns
        const farRight = farLeft + 1
        indices.push(nearLeft, nearRight, farLeft, nearRight, farRight, farLeft)
      }
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    return geometry
  }

  private buildWater(): void {
    this.buildChannelSurface()
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x4b9295,
      emissive: 0x2f6f73,
      emissiveIntensity: 0.045,
      roughness: 0.22,
      metalness: 0,
      clearcoat: 0.42,
      clearcoatRoughness: 0.28,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
    const water = new THREE.Mesh(this.createWaterRibbonGeometry(), material)
    water.receiveShadow = true
    this.scene.add(water)
    this.animatedWater.push({ material, phase: 0 })
    for (let index = 0; index < 8; index += 1) {
      const z = -16.15 + index * 0.42
      const x = 1.3 + index * 0.13 + Math.sin(index * 2.1) * 0.16
      const foam = new THREE.Mesh(
        new THREE.CircleGeometry(0.24 + (index % 3) * 0.045, 14),
        new THREE.MeshBasicMaterial({
          color: index % 2 === 0 ? 0xf2f4e7 : 0xddece3,
          transparent: true,
          opacity: 0.74,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
      )
      foam.rotation.x = -Math.PI / 2
      foam.rotation.z = -0.26 + Math.sin(index) * 0.2
      foam.scale.set(1.7 + (index % 2) * 0.55, 0.42, 1)
      foam.position.set(x, waterSurfaceHeight(x, z) + 0.055, z)
      foam.renderOrder = 2
      this.scene.add(foam)
    }
    this.buildHeadwaterWaterDetails()
  }

  /**
   * 발원지에서는 같은 청록 띠 하나로 끝내지 않고 마른 작업 가장자리, 스미는 둔덕,
   * 잔잔한 작은 소와 빠른 여울을 낮은 형태 차이로 먼저 읽게 한다.
   */
  private buildHeadwaterWaterDetails(): void {
    this.scene.add(this.headwaterVisualRoot)
    const source = HEADWATER_COURSE[0]!
    const slow = HEADWATER_COURSE[1]!
    const fastFrom = HEADWATER_COURSE[3]!
    const fastTo = HEADWATER_COURSE[4]!

    const slowWater = new THREE.Mesh(
      new THREE.CircleGeometry(1, 24),
      new THREE.MeshPhysicalMaterial({
        color: 0x3f7f82,
        emissive: 0x315f62,
        emissiveIntensity: 0.07,
        roughness: 0.31,
        clearcoat: 0.28,
        transparent: true,
        opacity: 0.76,
        depthWrite: false,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -2,
      }),
    )
    slowWater.name = 'headwater-slow-pool'
    slowWater.rotation.x = -Math.PI / 2
    slowWater.scale.set(0.86, 0.58, 1)
    slowWater.position.set(slow.x, waterSurfaceHeight(slow.x, slow.z) + 0.045, slow.z)
    slowWater.renderOrder = 3
    slowWater.userData.noShadow = true
    this.headwaterSlowWater = slowWater

    const seepAt = { x: -0.75, z: -22.35 }
    const seepPatch = new THREE.Mesh(
      new THREE.CircleGeometry(1, 20),
      new THREE.MeshStandardMaterial({
        color: 0x496653,
        roughness: 0.9,
        transparent: true,
        opacity: 0.68,
        depthWrite: false,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -2,
      }),
    )
    seepPatch.name = 'headwater-seeping-edge'
    seepPatch.rotation.x = -Math.PI / 2
    seepPatch.scale.set(0.84, 0.45, 1)
    seepPatch.position.set(seepAt.x, terrainHeight(seepAt.x, seepAt.z) + 0.052, seepAt.z)
    seepPatch.renderOrder = 2
    seepPatch.userData.noShadow = true
    this.headwaterSeepPatch = seepPatch

    const dryAt = { x: -5.65, z: -21.45 }
    const dryPatch = new THREE.Mesh(
      new THREE.CircleGeometry(1, 18),
      new THREE.MeshStandardMaterial({
        color: 0x877c5f,
        roughness: 1,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -2,
      }),
    )
    dryPatch.name = 'headwater-dry-edge'
    dryPatch.rotation.x = -Math.PI / 2
    dryPatch.scale.set(0.7, 0.42, 1)
    dryPatch.position.set(dryAt.x, terrainHeight(dryAt.x, dryAt.z) + 0.05, dryAt.z)
    dryPatch.renderOrder = 2
    dryPatch.userData.noShadow = true
    this.headwaterDryPatch = dryPatch

    const foamMaterial = new THREE.MeshBasicMaterial({
      color: 0xe8eee3,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
    for (let index = 0; index < 5; index += 1) {
      const foam = new THREE.Mesh(new THREE.CircleGeometry(0.22, 12), foamMaterial)
      foam.name = 'headwater-fast-foam'
      foam.rotation.x = -Math.PI / 2
      foam.renderOrder = 4
      foam.userData.noShadow = true
      this.animatedHeadwaterFoam.push({
        mesh: foam,
        from: fastFrom,
        to: fastTo,
        phase: index / 5,
        lateral: (index % 2 === 0 ? -1 : 1) * (0.08 + (index % 3) * 0.035),
      })
      this.headwaterVisualRoot.add(foam)
    }

    // 수원 머리의 얕은 젖음이 물 리본의 네모난 끝을 감춘다.
    const sourceWet = new THREE.Mesh(
      new THREE.CircleGeometry(0.68, 20),
      new THREE.MeshStandardMaterial({
        color: 0x526b59,
        roughness: 0.84,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    )
    sourceWet.name = 'headwater-source-seep'
    sourceWet.rotation.x = -Math.PI / 2
    sourceWet.scale.set(1.08, 0.72, 1)
    sourceWet.position.set(source.x, terrainHeight(source.x, source.z) + 0.044, source.z - 0.08)
    sourceWet.userData.noShadow = true
    this.headwaterVisualRoot.add(dryPatch, seepPatch, slowWater, sourceWet)
    this.buildUpstreamDeliveryVisuals()
    this.updateHeadwaterProfileVisuals()
  }

  private buildUpstreamDeliveryVisuals(): void {
    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0xc58b3e,
      emissive: 0x76532d,
      emissiveIntensity: 0.06,
      roughness: 0.88,
    })
    const movingLeaf = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 5), leafMaterial)
    movingLeaf.name = 'upstream-delivery-moving-leaf'
    movingLeaf.scale.set(1.45, 0.15, 0.72)
    movingLeaf.visible = false
    movingLeaf.renderOrder = 5
    movingLeaf.userData.noShadow = true
    this.upstreamDeliveryLeaf = movingLeaf
    this.scene.add(movingLeaf)

    const bAt = { x: 2.55, z: 0.05 }
    const calmWater = new THREE.Mesh(
      new THREE.CircleGeometry(1, 24),
      new THREE.MeshPhysicalMaterial({
        color: 0x4b8785,
        emissive: 0x315f60,
        emissiveIntensity: 0.055,
        roughness: 0.3,
        clearcoat: 0.3,
        transparent: true,
        opacity: 0.34,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    )
    calmWater.name = 'b-upstream-delivered-calm-water'
    calmWater.rotation.x = -Math.PI / 2
    calmWater.position.set(bAt.x, waterSurfaceHeight(bAt.x, bAt.z) + 0.052, bAt.z)
    calmWater.renderOrder = 4
    calmWater.userData.noShadow = true
    this.bDeliveredCalmWater = calmWater

    const ripple = new THREE.Mesh(
      new THREE.RingGeometry(0.24, 0.31, 24),
      new THREE.MeshBasicMaterial({
        color: 0xd5e6dc,
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    )
    ripple.name = 'b-upstream-delivered-ripple'
    ripple.rotation.x = -Math.PI / 2
    ripple.position.set(bAt.x + 0.08, waterSurfaceHeight(bAt.x, bAt.z) + 0.07, bAt.z + 0.03)
    ripple.renderOrder = 5
    ripple.userData.noShadow = true
    this.bDeliveredRipple = ripple

    const deliveredLeaf = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 8, 5),
      leafMaterial.clone(),
    )
    deliveredLeaf.name = 'b-upstream-delivered-leaf'
    deliveredLeaf.scale.set(1.45, 0.15, 0.72)
    deliveredLeaf.position.set(
      bAt.x - 0.06,
      waterSurfaceHeight(bAt.x, bAt.z) + 0.09,
      bAt.z + 0.04,
    )
    deliveredLeaf.rotation.y = 0.48
    deliveredLeaf.renderOrder = 6
    deliveredLeaf.userData.noShadow = true
    this.bDeliveredLeaf = deliveredLeaf

    this.bDeliveredRoot.name = 'b-upstream-delivered-profile'
    this.bDeliveredRoot.visible = false
    this.bDeliveredRoot.add(calmWater, ripple, deliveredLeaf)
    this.scene.add(this.bDeliveredRoot)
  }

  private updateHeadwaterProfileVisuals(): void {
    const { shade, retention, continuity } = this.headwaterProfile
    if (this.headwaterSlowWater) {
      this.headwaterSlowWater.scale.set(
        0.62 + retention * 0.64,
        0.43 + retention * 0.36,
        1,
      )
      const material = this.headwaterSlowWater.material as THREE.MeshPhysicalMaterial
      material.opacity = 0.54 + retention * 0.28
      material.roughness = 0.4 - retention * 0.2
      material.color.set(0x4f8a87).lerp(HEADWATER_DEEP_WATER_COLOR, retention)
    }
    if (this.headwaterSeepPatch) {
      this.headwaterSeepPatch.scale.set(
        0.66 + retention * 0.5,
        0.34 + retention * 0.3,
        1,
      )
      const material = this.headwaterSeepPatch.material as THREE.MeshStandardMaterial
      material.opacity = 0.42 + retention * 0.34
      material.color.set(0x5f7357).lerp(HEADWATER_SHADED_SEEP_COLOR, shade)
    }
    if (this.headwaterDryPatch) {
      const material = this.headwaterDryPatch.material as THREE.MeshStandardMaterial
      material.opacity = Math.max(0.18, 0.58 - retention * 0.25 - shade * 0.13)
    }
    for (const foam of this.animatedHeadwaterFoam) {
      foam.mesh.visible = continuity > 0.06
      const material = foam.mesh.material as THREE.MeshBasicMaterial
      material.opacity = 0.26 + continuity * 0.62
    }
  }

  private updateUpstreamDeliveryVisuals(worldElapsed: number): void {
    const state = this.upstreamWaterwayState
    const movingLeaf = this.upstreamDeliveryLeaf
    if (!state || !movingLeaf) {
      if (movingLeaf) movingLeaf.visible = false
      this.bDeliveredRoot.visible = false
      return
    }

    const pending = pendingUpstreamDelivery(state)
    const progress = upstreamDeliveryProgress(state, worldElapsed)
    const pendingArrived = pending !== undefined && progress >= 1
    const bHasProfile = hasUpstreamDeliveryArrived(state, worldElapsed)
    const bProfile = pendingArrived ? pending.profile : headwaterProfileAtB(state)
    this.bDeliveredRoot.visible = bHasProfile
    if (bHasProfile) this.updateBDeliveredProfileVisuals(bProfile)
    movingLeaf.visible = pending !== undefined && !pendingArrived
    if (!pending || pendingArrived) return

    const profile = pending.profile
    let wanted = progress * UPSTREAM_DELIVERY_LENGTH
    let active = UPSTREAM_DELIVERY_SEGMENTS.at(-1)
    for (const segment of UPSTREAM_DELIVERY_SEGMENTS) {
      active = segment
      if (wanted <= segment.length) break
      wanted -= segment.length
    }
    if (!active) return
    const amount = Math.max(0, Math.min(1, wanted / Math.max(0.0001, active.length)))
    const x = active.from.x + (active.to.x - active.from.x) * amount
    const z = active.from.z + (active.to.z - active.from.z) * amount
    movingLeaf.position.set(
      x,
      waterSurfaceHeight(x, z) + 0.085 + Math.sin(worldElapsed * 2.1) * 0.022,
      z,
    )
    movingLeaf.rotation.y = -Math.atan2(active.to.z - active.from.z, active.to.x - active.from.x)
    const material = movingLeaf.material as THREE.MeshStandardMaterial
    material.color.set(0xc58b3e).lerp(UPSTREAM_SHADED_LEAF_COLOR, profile.shade * 0.58)
  }

  private updateBDeliveredProfileVisuals(profile: HeadwaterProfile): void {
    if (this.bDeliveredCalmWater) {
      this.bDeliveredCalmWater.scale.set(
        0.58 + profile.retention * 0.82,
        0.38 + profile.retention * 0.42,
        1,
      )
      const material = this.bDeliveredCalmWater.material as THREE.MeshPhysicalMaterial
      material.opacity = 0.16 + profile.retention * 0.42
      material.roughness = 0.42 - profile.retention * 0.22
    }
    if (this.bDeliveredRipple) {
      this.bDeliveredRipple.scale.setScalar(0.72 + profile.continuity * 1.18)
      const material = this.bDeliveredRipple.material as THREE.MeshBasicMaterial
      material.opacity = 0.14 + profile.continuity * 0.56
    }
    if (this.bDeliveredLeaf) {
      const material = this.bDeliveredLeaf.material as THREE.MeshStandardMaterial
      material.color.set(0xc58b3e).lerp(UPSTREAM_SHADED_LEAF_COLOR, profile.shade * 0.66)
    }
  }

  private buildChannelSurface(): void {
    const offsets = [
      -WATER_CHANNEL.bankHalfWidth,
      -WATER_CHANNEL.bankHalfWidth * 0.78,
      -WATER_CHANNEL.waterHalfWidth,
      -WATER_CHANNEL.bedHalfWidth,
      -WATER_CHANNEL.bedHalfWidth * 0.42,
      0,
      WATER_CHANNEL.bedHalfWidth * 0.42,
      WATER_CHANNEL.bedHalfWidth,
      WATER_CHANNEL.waterHalfWidth,
      WATER_CHANNEL.bankHalfWidth * 0.78,
      WATER_CHANNEL.bankHalfWidth,
    ]
    const positions: number[] = []
    const colors: number[] = []
    const indices: number[] = []
    const shallow = new THREE.Color(0x637262)
    const bed = new THREE.Color(0x4d5b53)

    RENDER_WATER_COURSE.forEach((point, pointIndex) => {
      const normal = this.polylineNormal(RENDER_WATER_COURSE, pointIndex)
      offsets.forEach((offset) => {
        const x = point.x + normal.x * offset
        const z = point.z + normal.z * offset
        positions.push(x, terrainHeight(x, z) + 0.018, z)
        const distance = Math.abs(offset)
        const groundColor = this.terrainColorAt(x, z, terrainHeight(x, z))
        const noise = unitNoise(x, z, 13)
        const color = distance <= WATER_CHANNEL.bedHalfWidth
          ? bed.clone().lerp(new THREE.Color(0x786f5c), noise * 0.2)
          : distance <= WATER_CHANNEL.waterHalfWidth
            ? shallow.clone().lerp(groundColor, 0.18)
            : groundColor.clone().lerp(
              shallow,
              THREE.MathUtils.smoothstep(
                WATER_CHANNEL.bankHalfWidth - distance,
                0,
                WATER_CHANNEL.bankHalfWidth - WATER_CHANNEL.waterHalfWidth,
              ) * 0.48,
            )
        colors.push(color.r, color.g, color.b)
      })
    })

    const rowWidth = offsets.length
    for (let row = 0; row < RENDER_WATER_COURSE.length - 1; row += 1) {
      for (let column = 0; column < rowWidth - 1; column += 1) {
        const nearLeft = row * rowWidth + column
        const nearRight = nearLeft + 1
        const farLeft = nearLeft + rowWidth
        const farRight = farLeft + 1
        indices.push(nearLeft, nearRight, farLeft, nearRight, farRight, farLeft)
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    const surface = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.98,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -1,
      }),
    )
    surface.receiveShadow = true
    this.scene.add(surface)
  }

  private createWaterRibbonGeometry(): THREE.BufferGeometry {
    const positions: number[] = []
    const indices: number[] = []
    const halfWidth = WATER_CHANNEL.waterHalfWidth - 0.04
    RENDER_WATER_COURSE.forEach((point, index) => {
      const normal = this.polylineNormal(RENDER_WATER_COURSE, index)
      const height = waterSurfaceHeight(point.x, point.z) + 0.025
      positions.push(
        point.x - normal.x * halfWidth,
        height,
        point.z - normal.z * halfWidth,
        point.x + normal.x * halfWidth,
        height,
        point.z + normal.z * halfWidth,
      )
      if (index < RENDER_WATER_COURSE.length - 1) {
        const nearLeft = index * 2
        const nearRight = nearLeft + 1
        const farLeft = nearLeft + 2
        const farRight = nearLeft + 3
        indices.push(nearLeft, nearRight, farLeft, nearRight, farRight, farLeft)
      }
    })
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    return geometry
  }

  private polylineNormal(points: readonly Point2[], index: number): Point2 {
    const previous = points[Math.max(0, index - 1)]!
    const next = points[Math.min(points.length - 1, index + 1)]!
    const deltaX = next.x - previous.x
    const deltaZ = next.z - previous.z
    const length = Math.max(0.0001, Math.hypot(deltaX, deltaZ))
    return { x: -deltaZ / length, z: deltaX / length }
  }

  private buildEditZones(): void {
    for (const zone of EDIT_ZONES) {
      const soil = new THREE.Mesh(
        this.createSoilGeometry(zone),
        new THREE.MeshStandardMaterial({
          color: zone.soilColor,
          vertexColors: true,
          roughness: zone.tone === 'moist' || zone.tone === 'headwater' ? 0.72 : 0.94,
          metalness: 0,
          side: THREE.DoubleSide,
          polygonOffset: true,
          polygonOffsetFactor: -1,
        }),
      )
      soil.name = 'edit-soil-' + zone.id
      soil.receiveShadow = true
      soil.userData.editZoneId = zone.id
      this.soilMeshes.set(zone.id, soil)
      this.scene.add(soil)

      const outline = new THREE.LineLoop(
        this.createEditOutlineGeometry(zone),
        new THREE.LineBasicMaterial({
          color: 0xffe6a0,
          transparent: true,
          opacity: 0.86,
          depthTest: true,
        }),
      )
      outline.name = 'edit-outline-' + zone.id
      outline.visible = false
      outline.renderOrder = 2
      this.zoneOutlines.set(zone.id, outline)
      this.scene.add(outline)
    }
  }

  private createEditOutlineGeometry(zone: EditZone): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry().setFromPoints(
      zone.outline.map((point) => new THREE.Vector3(
        point.x,
        this.groundHeightAt(point.x, point.z) + SOIL_LIFT + 0.035,
        point.z,
      )),
    )
    geometry.computeBoundingBox()
    geometry.computeBoundingSphere()
    return geometry
  }

  private buildWaterwayClues(): void {
    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0xc58b3e,
      emissive: 0x8a5e28,
      emissiveIntensity: 0.08,
      roughness: 0.88,
      side: THREE.DoubleSide,
    })
    WATERWAY_CLUES.forEach((clue, clueIndex) => {
      // 살펴보기 자리는 마른 둑에 남기되 보이는 잎은 실제 물 중심에 띄운다.
      const visualAt = clue.id === 'b-drifting-leaf'
        ? { x: 2.6, z: 0.05 }
        : clue.id === 'd-white-water'
          ? { x: 1.88, z: -15 }
          : clue.id === 'd-headwater-source'
            ? HEADWATER_COURSE.reduce((nearest, point) =>
                distanceSquared(point, clue.at) < distanceSquared(nearest, clue.at)
                  ? point
                  : nearest,
              HEADWATER_COURSE[0]!)
            : { x: 1.82, z: 17.2 }
      const waterHeight = waterSurfaceHeight(visualAt.x, visualAt.z)
      for (let index = 0; index < 3; index += 1) {
        const angle = (index / 3) * Math.PI * 2 + clueIndex * 0.7
        const leaf = new THREE.Mesh(
          new THREE.SphereGeometry(0.19, 8, 5),
          leafMaterial.clone(),
        )
        leaf.scale.set(1.35, 0.16, 0.7)
        leaf.position.set(
          visualAt.x + Math.cos(angle) * 0.28,
          waterHeight + 0.075 + index * 0.018,
          visualAt.z + Math.sin(angle) * 0.28,
        )
        leaf.rotation.y = angle
        leaf.castShadow = true
        this.scene.add(leaf)
        this.animatedWaterwayLeaves.push({
          mesh: leaf,
          baseX: leaf.position.x,
          baseY: leaf.position.y,
          baseZ: leaf.position.z,
          phase: clueIndex * 1.7 + index * 2.1,
        })
      }
    })
  }

  private createSoilGeometry(zone: EditZone): THREE.BufferGeometry {
    const contour = zone.outline.map(({ x, z }) => new THREE.Vector2(x, z))
    const faces = THREE.ShapeUtils.triangulateShape(contour, [])
    const positions: number[] = []
    const normals: number[] = []
    const colors: number[] = []
    const indices: number[] = []
    const addVertex = (x: number, z: number): number => {
      const y = this.groundHeightAt(x, z) + SOIL_LIFT
      const epsilon = 0.08
      const normal = new THREE.Vector3(
        this.groundHeightAt(x - epsilon, z) - this.groundHeightAt(x + epsilon, z),
        epsilon * 2,
        this.groundHeightAt(x, z - epsilon) - this.groundHeightAt(x, z + epsilon),
      ).normalize()
      const shade = 0.91 + (
        Math.sin(x * 1.13 + z * 0.47) + Math.cos(z * 0.82 - x * 0.29)
      ) * 0.025
      positions.push(x, y, z)
      normals.push(normal.x, normal.y, normal.z)
      colors.push(shade, shade, shade)
      return positions.length / 3 - 1
    }

    for (const face of faces) {
      const [a, b, c] = face.map((index) => contour[index]!) as [
        THREE.Vector2,
        THREE.Vector2,
        THREE.Vector2,
      ]
      const maximumEdge = Math.max(a.distanceTo(b), b.distanceTo(c), c.distanceTo(a))
      const segments = Math.max(1, Math.ceil(maximumEdge / 0.32))
      const rows: number[][] = []
      for (let row = 0; row <= segments; row += 1) {
        const rowIndices: number[] = []
        for (let column = 0; column <= segments - row; column += 1) {
          const towardB = row / segments
          const towardC = column / segments
          const towardA = 1 - towardB - towardC
          rowIndices.push(addVertex(
            a.x * towardA + b.x * towardB + c.x * towardC,
            a.y * towardA + b.y * towardB + c.y * towardC,
          ))
        }
        rows.push(rowIndices)
      }
      for (let row = 0; row < segments; row += 1) {
        const width = segments - row
        for (let column = 0; column < width; column += 1) {
          const topLeft = rows[row]![column]!
          const topRight = rows[row]![column + 1]!
          const bottomLeft = rows[row + 1]![column]!
          indices.push(topLeft, topRight, bottomLeft)
          if (column < width - 1) {
            const bottomRight = rows[row + 1]![column + 1]!
            indices.push(topRight, bottomRight, bottomLeft)
          }
        }
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.setIndex(indices)
    geometry.computeBoundingBox()
    geometry.computeBoundingSphere()
    return geometry
  }

  private createEditEntryGroup(entry: EditEntry): THREE.Group {
    const group = new THREE.Group()
    group.name = 'edit-entry-' + entry.id
    group.userData.editEntryId = entry.id
    group.userData.editEntryKind = entry.kind
    group.userData.editZoneId = entry.zoneId
    group.userData.editEntryThinned = entry.kind === 'low-flower' && entry.thinned

    if (entry.kind === 'low-flower') {
      this.addLowFlower(group, entry)
    } else if (entry.kind === 'low-cover') {
      this.addLowCover(group, entry)
    } else if (entry.kind === 'surface-adjustment') {
      this.addSurfaceAdjustment(group, entry)
    } else if (entry.kind === 'terrain-patch') {
      this.addTerrainPatchMarker(group, entry)
    } else if (entry.kind === 'drainage-segment') {
      this.addDrainageSegment(group, entry)
    } else if (entry.kind === 'structure') {
      group.userData.structureForm = entry.form
      this.addStructure(group, entry)
    }

    group.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        const pickOnly = object.userData.pickOnly === true
        object.castShadow = !pickOnly && object.userData.noShadow !== true
        object.receiveShadow = !pickOnly
      }
    })
    return group
  }

  private addLowFlower(group: THREE.Group, entry: EditEntry): void {
    const seed = textSeed(entry.id)
    // 씨앗과 작은 싹도 손가락으로 쉽게 다시 잡을 수 있게 보이지 않는 선택 면을 둔다.
    // 화면에는 그리지 않지만 식물의 실제 편집 반경 안에서 raycast에는 응답한다.
    const pickTarget = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.38, 0.025, 16),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        colorWrite: false,
      }),
    )
    pickTarget.name = 'plant-pick-target'
    pickTarget.position.y = 0.025
    pickTarget.userData.pickOnly = true
    group.add(pickTarget)
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x4f7b50, roughness: 0.94 })
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x5c8053, roughness: 0.96 })
    const palette = [0xf0d06f, 0xe8c879, 0xf0d99a]
    const petalMaterial = new THREE.MeshStandardMaterial({
      color: palette[seed % palette.length],
      roughness: 0.8,
    })
    const centerMaterial = new THREE.MeshStandardMaterial({ color: 0xb86b3c, roughness: 0.82 })
    const seedStage = new THREE.Group()
    seedStage.name = 'plant-stage-seed'
    seedStage.userData.plantStage = 'seed'
    const seedMound = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.22, 1),
      new THREE.MeshStandardMaterial({ color: 0x71553c, roughness: 1 }),
    )
    seedMound.scale.set(1.2, 0.2, 0.82)
    seedMound.position.y = -0.035
    seedStage.add(seedMound)
    for (let index = 0; index < 3; index += 1) {
      const kernel = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 7, 4),
        new THREE.MeshStandardMaterial({ color: 0xc0a66c, roughness: 0.96 }),
      )
      const angle = index * 2.2 + seed * 0.001
      kernel.scale.set(1.25, 0.46, 0.7)
      kernel.position.set(Math.cos(angle) * 0.08, 0.018, Math.sin(angle) * 0.055)
      kernel.rotation.y = -angle
      seedStage.add(kernel)
    }

    const sproutStage = new THREE.Group()
    sproutStage.name = 'plant-stage-sprout'
    sproutStage.userData.plantStage = 'sprout'
    const sproutOffsets = [
      { x: -0.09, z: 0.025, height: 0.2 },
      { x: 0.085, z: -0.04, height: 0.23 },
      { x: 0.02, z: 0.12, height: 0.18 },
    ]
    sproutOffsets.forEach((offset, sproutIndex) => {
      const sprout = new THREE.Group()
      if (sproutIndex === sproutOffsets.length - 1) {
        sprout.name = 'plant-density-extra'
      }
      const sproutStem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.024, offset.height, 6),
        stemMaterial,
      )
      sproutStem.position.set(offset.x, offset.height / 2, offset.z)
      sprout.add(sproutStem)
      for (const side of [-1, 1]) {
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.075, 7, 4), leafMaterial)
        leaf.scale.set(1.35, 0.2, 0.62)
        leaf.position.set(
          offset.x + side * 0.055,
          offset.height * 0.86,
          offset.z,
        )
        leaf.rotation.y = side * 0.72 + sproutIndex * 0.31
        sprout.add(leaf)
      }
      sproutStage.add(sprout)
    })

    const youngStage = new THREE.Group()
    youngStage.name = 'plant-stage-young'
    youngStage.userData.plantStage = 'young'
    const offsets = [
      { x: -0.14, z: 0.05, height: 0.45 },
      { x: 0.12, z: -0.08, height: 0.56 },
      { x: 0.04, z: 0.17, height: 0.39 },
    ]
    for (let shootIndex = 0; shootIndex < offsets.length; shootIndex += 1) {
      const offset = offsets[shootIndex]!
      const shoot = new THREE.Group()
      if (shootIndex === offsets.length - 1) {
        shoot.name = 'plant-density-extra'
      }
      const height = offset.height * 0.68
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.032, height, 6),
        stemMaterial,
      )
      stem.position.set(offset.x, height / 2, offset.z)
      shoot.add(stem)
      for (const side of [-1, 1]) {
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.11, 7, 4), leafMaterial)
        leaf.scale.set(1.32, 0.22, 0.62)
        leaf.position.set(
          offset.x + side * 0.075,
          height * (0.6 + side * 0.08),
          offset.z + side * 0.025,
        )
        leaf.rotation.y = side * 0.8 + shootIndex * 0.34
        shoot.add(leaf)
      }
      youngStage.add(shoot)
    }

    const adultStage = new THREE.Group()
    adultStage.name = 'plant-stage-adult'
    adultStage.userData.plantStage = 'adult'
    for (let bloomIndex = 0; bloomIndex < offsets.length; bloomIndex += 1) {
      const offset = offsets[bloomIndex]!
      const variation = unitNoise(seed, bloomIndex, 79)
      const height = offset.height * (0.92 + variation * 0.16)
      const shoot = new THREE.Group()
      if (bloomIndex === offsets.length - 1) {
        shoot.name = 'plant-density-extra'
      }
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.024, 0.036, height, 6),
        stemMaterial,
      )
      stem.position.set(offset.x, height / 2, offset.z)
      stem.rotation.z = (variation - 0.5) * 0.12
      shoot.add(stem)
      for (let petalIndex = 0; petalIndex < 5; petalIndex += 1) {
        const angle = (petalIndex / 5) * Math.PI * 2 + variation * 0.35
        const petal = new THREE.Mesh(new THREE.SphereGeometry(0.085, 7, 5), petalMaterial)
        petal.scale.set(1.18, 0.38, 0.68)
        petal.position.set(
          offset.x + Math.cos(angle) * 0.095,
          height + 0.025,
          offset.z + Math.sin(angle) * 0.095,
        )
        petal.rotation.y = -angle
        shoot.add(petal)
      }
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.061, 8, 6), centerMaterial)
      center.position.set(offset.x, height + 0.045, offset.z)
      shoot.add(center)
      adultStage.add(shoot)
    }
    for (const side of [-1, 1]) {
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 7, 4),
        leafMaterial,
      )
      leaf.scale.set(1.4, 0.22, 0.58)
      leaf.position.set(side * 0.15, 0.1, -side * 0.04)
      leaf.rotation.y = side * 0.72
      adultStage.add(leaf)
    }
    seedStage.visible = true
    sproutStage.visible = false
    youngStage.visible = false
    adultStage.visible = false
    group.add(seedStage, sproutStage, youngStage, adultStage)
  }

  private addLowCover(group: THREE.Group, entry: EditEntry): void {
    const seed = textSeed(entry.id)
    if (entry.zoneId === 'd-headwater-edge') {
      const pickTarget = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.42, 0.025, 14),
        new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          depthWrite: false,
          colorWrite: false,
        }),
      )
      pickTarget.name = 'headwater-cover-pick-target'
      pickTarget.position.y = 0.025
      pickTarget.userData.pickOnly = true
      group.add(pickTarget)

      const wetGround = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.46, 1),
        new THREE.MeshStandardMaterial({ color: 0x493d2d, roughness: 1 }),
      )
      wetGround.name = 'headwater-cover-wet-ground'
      wetGround.scale.set(1.08, 0.055, 0.8)
      wetGround.position.y = 0.018
      wetGround.rotation.y = unitNoise(seed, 0, 197) * Math.PI
      group.add(wetGround)

      const leafGeometry = new THREE.SphereGeometry(0.19, 7, 4)
      const leafMaterials = [0x76583b, 0x916b3f, 0xaa7d43, 0x614a34].map(
        (color) => new THREE.MeshStandardMaterial({ color, roughness: 1 }),
      )
      const leafCount = 9 + (seed % 3)
      for (let index = 0; index < leafCount; index += 1) {
        const angle = index * 2.399 + unitNoise(seed, index, 199) * 0.52
        const radius = index === 0 ? 0 : 0.17 + (index % 4) * 0.055
        const leaf = new THREE.Mesh(leafGeometry, leafMaterials[index % leafMaterials.length])
        leaf.name = 'headwater-fallen-leaf'
        leaf.scale.set(1.42, 0.11 + (index % 3) * 0.018, 0.68)
        leaf.position.set(
          Math.cos(angle) * radius,
          0.045 + (index % 4) * 0.014,
          Math.sin(angle) * radius,
        )
        leaf.rotation.set(
          (unitNoise(seed, index, 211) - 0.5) * 0.18,
          -angle + unitNoise(seed, index, 223) * 0.38,
          (index % 3 - 1) * 0.08,
        )
        group.add(leaf)
      }

      const twigMaterial = new THREE.MeshStandardMaterial({ color: 0x4d3928, roughness: 1 })
      for (let index = 0; index < 2; index += 1) {
        const twig = new THREE.Mesh(
          new THREE.CylinderGeometry(0.015, 0.022, 0.42 - index * 0.09, 6),
          twigMaterial,
        )
        twig.name = 'headwater-cover-twig'
        twig.rotation.z = Math.PI / 2
        twig.rotation.y = (seed % 13) * 0.19 + index * 1.1
        twig.position.set(index === 0 ? -0.04 : 0.12, 0.07 + index * 0.008, index === 0 ? 0.03 : -0.08)
        group.add(twig)
      }
      return
    }

    const tones = [0x47704c, 0x587c50, 0x668855, 0x4f7654, 0x738d58]
    for (let index = 0; index < 7; index += 1) {
      const angle = index * 2.399 + unitNoise(seed, index, 83) * 0.42
      const radius = index === 0 ? 0 : 0.22 + (index % 3) * 0.07
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 8, 5),
        new THREE.MeshStandardMaterial({ color: tones[index % tones.length], roughness: 0.96 }),
      )
      leaf.scale.set(1.5, 0.28 + (index % 2) * 0.08, 0.7)
      leaf.position.set(
        Math.cos(angle) * radius,
        0.11 + (index % 3) * 0.045,
        Math.sin(angle) * radius,
      )
      leaf.rotation.set((index % 2 === 0 ? -1 : 1) * 0.12, -angle, (index % 3 - 1) * 0.09)
      group.add(leaf)
    }
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.032, 0.04, 0.62, 6),
      new THREE.MeshStandardMaterial({ color: 0x456544, roughness: 1 }),
    )
    stem.rotation.z = Math.PI / 2
    stem.rotation.y = (seed % 11) * 0.23
    stem.position.y = 0.105
    group.add(stem)
  }

  private addSurfaceAdjustment(group: THREE.Group, entry: EditEntry): void {
    const zone = EDIT_ZONES.find(({ id }) => id === entry.zoneId)
    const material = new THREE.MeshStandardMaterial({
      color: zone?.soilColor ?? 0x6b553b,
      roughness: 0.9,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    })
    const managedSoil = new THREE.Mesh(
      this.createTerrainPatchDiscGeometry(
        entry,
        MANAGED_SOIL_PATCH_RADIUS,
        SOIL_LIFT + 0.012,
      ),
      material,
    )
    managedSoil.name = 'managed-soil-extension'
    managedSoil.receiveShadow = true
    group.add(managedSoil)

    const clodMaterial = new THREE.MeshStandardMaterial({
      color: 0x6b553b,
      roughness: 0.96,
    })
    for (let index = 0; index < 3; index += 1) {
      const patch = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.2 - index * 0.018, 1),
        clodMaterial,
      )
      patch.scale.set(1.22, 0.12 + index * 0.018, 0.72)
      patch.position.set((index - 1) * 0.2, 0.035 + index * 0.008, Math.sin(index * 2.2) * 0.1)
      patch.rotation.y = index * 0.82
      group.add(patch)
    }
  }

  private addTerrainPatchMarker(
    group: THREE.Group,
    entry: TerrainPatchEntry,
  ): void {
    const pickTarget = new THREE.Mesh(
      this.createTerrainPatchDiscGeometry(entry, 0.58, SOIL_LIFT + 0.028),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        colorWrite: false,
        side: THREE.DoubleSide,
      }),
    )
    pickTarget.name = 'terrain-patch-pick-target'
    pickTarget.userData.pickOnly = true

    const marker = new THREE.Mesh(
      this.createTerrainPatchRingGeometry(
        entry,
        0.48,
        0.57,
        SOIL_LIFT + 0.034,
      ),
      new THREE.MeshBasicMaterial({
        color: entry.direction === 'raise' ? 0xd6a15e : 0x667f91,
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -2,
      }),
    )
    marker.name = 'terrain-patch-marker'
    marker.renderOrder = 3
    group.add(pickTarget, marker)
  }

  private addDrainageSegment(
    group: THREE.Group,
    entry: DrainageSegmentEntry,
  ): void {
    const halfLength = entry.length / 2
    const groove = new THREE.Mesh(
      this.createGroundRectangleGeometry(
        entry,
        halfLength,
        DRAINAGE_SEGMENT_HALF_WIDTH,
        SOIL_LIFT + 0.012,
        Math.max(4, Math.ceil(entry.length / 0.16)),
        2,
      ),
      new THREE.MeshStandardMaterial({
        color: 0x4d493d,
        roughness: 1,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -1,
      }),
    )
    groove.name = 'drainage-groove'
    groove.renderOrder = 2

    const water = new THREE.Mesh(
      this.createGroundRectangleGeometry(
        entry,
        halfLength * 0.96,
        DRAINAGE_SEGMENT_HALF_WIDTH * 0.43,
        SOIL_LIFT + 0.024,
        Math.max(4, Math.ceil(entry.length / 0.16)),
        1,
      ),
      new THREE.MeshStandardMaterial({
        color: 0x4e9a98,
        emissive: 0x356e70,
        emissiveIntensity: 0.12,
        roughness: 0.38,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -2,
      }),
    )
    water.name = 'drainage-water'
    water.renderOrder = 3
    water.userData.noShadow = true
    water.userData.editZoneId = entry.zoneId
    water.visible = this.isZoneVisuallyMoist(entry.zoneId) &&
      this.wetDrainageEntryIds.has(entry.id)
    this.drainageWaterMeshes.set(entry.id, water)

    const marker = new THREE.Mesh(
      this.createGroundRectangleGeometry(
        entry,
        halfLength + 0.055,
        DRAINAGE_SEGMENT_HALF_WIDTH + 0.055,
        SOIL_LIFT + 0.032,
        Math.max(4, Math.ceil(entry.length / 0.18)),
        2,
      ),
      new THREE.MeshBasicMaterial({
        color: 0x55c4bd,
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -3,
      }),
    )
    marker.name = 'drainage-build-marker'
    marker.renderOrder = 4
    marker.userData.buildOnly = true
    marker.userData.noShadow = true

    const pickTarget = new THREE.Mesh(
      this.createGroundRectangleGeometry(
        entry,
        halfLength + 0.08,
        Math.max(0.25, DRAINAGE_SEGMENT_HALF_WIDTH + 0.09),
        SOIL_LIFT + 0.045,
        Math.max(4, Math.ceil(entry.length / 0.2)),
        2,
      ),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        colorWrite: false,
        side: THREE.DoubleSide,
      }),
    )
    pickTarget.name = 'drainage-pick-target'
    pickTarget.userData.pickOnly = true
    pickTarget.userData.buildOnly = true
    group.add(groove, water, marker, pickTarget)
  }

  private addStructure(group: THREE.Group, entry: StructureEntry): void {
    if (entry.zoneId === 'd-headwater-edge') {
      this.addHeadwaterStructure(group, entry)
      return
    }
    const footprint = STRUCTURE_FOOTPRINTS[entry.form]
    const wood = new THREE.MeshStandardMaterial({
      color: entry.form === 'fence' ? 0x816447 : 0x70583d,
      roughness: 0.96,
    })
    const pieces: StructurePiece[] = []
    const base = (x: number, z: number): number =>
      this.groundAnchoredLocalHeight(entry, x, z, SOIL_LIFT + 0.018)
    const point = (x: number, z: number, height = 0): THREE.Vector3 =>
      new THREE.Vector3(x, base(x, z) + height, z)
    const addPost = (x: number, z: number, height: number, thickness = 0.085): void => {
      pieces.push({ from: point(x, z), to: point(x, z, height), thickness })
    }

    if (entry.form === 'support') {
      addPost(0, 0, 1.24, 0.095)
      pieces.push({
        from: point(-0.25, 0, 1.03),
        to: point(0.25, 0, 1.03),
        thickness: 0.072,
      })
      pieces.push(
        { from: point(-0.18, 0.02), to: point(0, 0, 0.62), thickness: 0.052 },
        { from: point(0.18, 0.02), to: point(0, 0, 0.62), thickness: 0.052 },
      )
    } else if (entry.form === 'rack') {
      const x = footprint.halfLength * 0.84
      const z = footprint.halfWidth * 0.78
      for (const sideX of [-1, 1]) {
        for (const sideZ of [-1, 1]) {
          addPost(sideX * x, sideZ * z, 0.86, 0.072)
        }
      }
      for (const sideZ of [-1, 1]) {
        pieces.push({
          from: point(-x, sideZ * z, 0.86),
          to: point(x, sideZ * z, 0.86),
          thickness: 0.062,
        })
      }
      for (const slatX of [-x, 0, x]) {
        pieces.push({
          from: point(slatX, -z, 0.9),
          to: point(slatX, z, 0.9),
          thickness: 0.052,
        })
      }
    } else if (entry.form === 'fence') {
      const x = footprint.halfLength * 0.9
      for (const postX of [-x, 0, x]) {
        addPost(postX, 0, postX === 0 ? 0.69 : 0.76, 0.082)
      }
      for (const height of [0.31, 0.58]) {
        pieces.push({
          from: point(-x, 0, height),
          to: point(x, 0, height),
          thickness: 0.07,
          depth: 0.055,
        })
      }
    } else {
      const x = footprint.halfLength * 0.86
      const z = footprint.halfWidth * 0.84
      for (const sideX of [-1, 1]) {
        for (const sideZ of [-1, 1]) {
          addPost(sideX * x, sideZ * z, sideZ < 0 ? 1.08 : 1, 0.074)
        }
      }
      for (const sideZ of [-1, 1]) {
        const height = sideZ < 0 ? 1.08 : 1
        pieces.push({
          from: point(-x, sideZ * z, height),
          to: point(x, sideZ * z, height),
          thickness: 0.058,
        })
      }
      for (const sideX of [-1, 1]) {
        pieces.push({
          from: point(sideX * x, -z, 1.08),
          to: point(sideX * x, z, 1),
          thickness: 0.058,
        })
      }
    }

    const frame = this.createStructurePieceMesh(pieces, wood)
    frame.name = entry.form === 'shade' ? 'structure-frame' : 'structure-contact-part'
    group.add(frame)

    if (entry.form === 'shade') {
      const x = footprint.halfLength * 0.9
      const z = footprint.halfWidth * 0.88
      const canopyPieces: StructurePiece[] = []
      for (let strip = 0; strip < 5; strip += 1) {
        const stripZ = -z + strip / 4 * z * 2
        const height = 1.08 - strip / 4 * 0.08
        canopyPieces.push({
          from: point(-x, stripZ, height + 0.035),
          to: point(x, stripZ, height + 0.035),
          thickness: 0.055,
          depth: z * 0.48,
        })
      }
      const canopy = this.createStructurePieceMesh(
        canopyPieces,
        new THREE.MeshStandardMaterial({
          color: 0x8d9463,
          roughness: 0.9,
          side: THREE.DoubleSide,
        }),
      )
      canopy.name = 'structure-contact-part'
      group.add(canopy)
    }

    const marker = new THREE.Mesh(
      this.createGroundRectangleGeometry(
        entry,
        footprint.halfLength + 0.055,
        footprint.halfWidth + 0.055,
        SOIL_LIFT + 0.032,
        4,
        3,
      ),
      new THREE.MeshBasicMaterial({
        color: 0x55c4bd,
        transparent: true,
        opacity: 0.13,
        depthWrite: false,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -3,
      }),
    )
    marker.name = 'structure-build-marker'
    marker.renderOrder = 4
    marker.userData.buildOnly = true
    marker.userData.noShadow = true

    const pickTarget = new THREE.Mesh(
      this.createGroundRectangleGeometry(
        entry,
        footprint.halfLength + 0.12,
        footprint.halfWidth + 0.12,
        SOIL_LIFT + 0.05,
        4,
        3,
      ),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        colorWrite: false,
        side: THREE.DoubleSide,
      }),
    )
    pickTarget.name = 'structure-pick-target'
    pickTarget.userData.pickOnly = true
    pickTarget.userData.buildOnly = true
    group.add(marker, pickTarget)
  }

  /** 같은 네 기능도 발원지에서는 새 목재 시설보다 그 자리에 있던 돌·가지·낙엽으로 읽힌다. */
  private addHeadwaterStructure(group: THREE.Group, entry: StructureEntry): void {
    const footprint = STRUCTURE_FOOTPRINTS[entry.form]
    const base = (x: number, z: number): number =>
      this.groundAnchoredLocalHeight(entry, x, z, SOIL_LIFT + 0.018)
    const point = (x: number, z: number, height = 0): THREE.Vector3 =>
      new THREE.Vector3(x, base(x, z) + height, z)
    const branchMaterial = new THREE.MeshStandardMaterial({ color: 0x63513e, roughness: 1 })
    const pieces: StructurePiece[] = []

    if (entry.form === 'support') {
      const stoneGeometry = new THREE.DodecahedronGeometry(0.2, 0)
      const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0x718078, roughness: 1 })
      const stones = new THREE.InstancedMesh(stoneGeometry, stoneMaterial, 4)
      const matrix = new THREE.Matrix4()
      const placements = [
        { x: -0.1, z: 0.02, y: 0.13, scale: 1.18, rotation: 0.2 },
        { x: 0.12, z: -0.03, y: 0.14, scale: 1.04, rotation: 1.1 },
        { x: -0.02, z: 0.01, y: 0.39, scale: 0.88, rotation: 0.65 },
        { x: 0.02, z: -0.01, y: 0.59, scale: 0.65, rotation: 1.65 },
      ] as const
      placements.forEach((placement, index) => {
        matrix.compose(
          new THREE.Vector3(
            placement.x,
            base(placement.x, placement.z) + placement.y,
            placement.z,
          ),
          new THREE.Quaternion().setFromEuler(new THREE.Euler(0, placement.rotation, 0.08 * index)),
          new THREE.Vector3(placement.scale, 0.72 * placement.scale, 0.9 * placement.scale),
        )
        stones.setMatrixAt(index, matrix)
      })
      stones.instanceMatrix.needsUpdate = true
      stones.name = 'structure-contact-part'
      group.add(stones)
    } else {
      const x = footprint.halfLength * 0.86
      const z = footprint.halfWidth * 0.8
      if (entry.form === 'rack') {
        for (const sideX of [-1, 1]) {
          for (const sideZ of [-1, 1]) {
            pieces.push({
              from: point(sideX * x, sideZ * z),
              to: point(sideX * x * 0.94, sideZ * z, 0.66 + sideX * 0.025),
              thickness: 0.064,
            })
          }
        }
        for (const sideZ of [-1, 1]) {
          pieces.push({
            from: point(-x, sideZ * z, 0.64),
            to: point(x, sideZ * z, 0.69),
            thickness: 0.055,
          })
        }
        for (const slatX of [-x * 0.7, 0, x * 0.72]) {
          pieces.push({
            from: point(slatX, -z, 0.69),
            to: point(slatX + 0.06, z, 0.66),
            thickness: 0.046,
          })
        }
      } else if (entry.form === 'fence') {
        for (const postX of [-x, 0, x]) {
          pieces.push({
            from: point(postX, 0),
            to: point(postX + (postX === 0 ? 0.035 : -Math.sign(postX) * 0.04), 0, 0.46),
            thickness: 0.074,
          })
        }
        pieces.push(
          { from: point(-x, 0, 0.2), to: point(x, 0, 0.28), thickness: 0.066, depth: 0.052 },
          { from: point(-x, 0, 0.39), to: point(x, 0, 0.34), thickness: 0.06, depth: 0.05 },
          { from: point(-x * 0.62, 0.05), to: point(x * 0.56, -0.04, 0.43), thickness: 0.045 },
        )
      } else {
        for (const sideX of [-1, 1]) {
          pieces.push(
            {
              from: point(sideX * x, -z),
              to: point(sideX * x * 0.9, -z * 0.85, 0.9),
              thickness: 0.07,
            },
            {
              from: point(sideX * x, z),
              to: point(sideX * x * 0.92, z * 0.84, 0.77),
              thickness: 0.065,
            },
          )
        }
        pieces.push(
          { from: point(-x, -z, 0.9), to: point(x, -z, 0.9), thickness: 0.052 },
          { from: point(-x, z, 0.77), to: point(x, z, 0.77), thickness: 0.052 },
          { from: point(-x, -z, 0.9), to: point(-x, z, 0.77), thickness: 0.045 },
          { from: point(x, -z, 0.9), to: point(x, z, 0.77), thickness: 0.045 },
        )
      }
      const frame = this.createStructurePieceMesh(pieces, branchMaterial)
      frame.name = entry.form === 'shade' ? 'structure-frame' : 'structure-contact-part'
      group.add(frame)

      if (entry.form === 'shade') {
        const leafGeometry = new THREE.DodecahedronGeometry(0.19, 0)
        const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x6f7650, roughness: 0.98 })
        const leaves = new THREE.InstancedMesh(leafGeometry, leafMaterial, 9)
        const matrix = new THREE.Matrix4()
        for (let index = 0; index < 9; index += 1) {
          const column = index % 3
          const row = Math.floor(index / 3)
          const localX = -x * 0.72 + column * x * 0.72
          const localZ = -z * 0.68 + row * z * 0.68
          const height = 0.88 - row * 0.055 + Math.sin(index * 1.7) * 0.025
          matrix.compose(
            new THREE.Vector3(localX, base(localX, localZ) + height, localZ),
            new THREE.Quaternion().setFromEuler(new THREE.Euler(0.1, index * 0.91, 0.08)),
            new THREE.Vector3(1.35, 0.24, 0.68),
          )
          leaves.setMatrixAt(index, matrix)
        }
        leaves.instanceMatrix.needsUpdate = true
        leaves.name = 'structure-contact-part'
        group.add(leaves)
      }
    }

    const marker = new THREE.Mesh(
      this.createGroundRectangleGeometry(
        entry,
        footprint.halfLength + 0.055,
        footprint.halfWidth + 0.055,
        SOIL_LIFT + 0.032,
        4,
        3,
      ),
      new THREE.MeshBasicMaterial({
        color: 0x55c4bd,
        transparent: true,
        opacity: 0.13,
        depthWrite: false,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -3,
      }),
    )
    marker.name = 'structure-build-marker'
    marker.renderOrder = 4
    marker.userData.buildOnly = true
    marker.userData.noShadow = true

    const pickTarget = new THREE.Mesh(
      this.createGroundRectangleGeometry(
        entry,
        footprint.halfLength + 0.12,
        footprint.halfWidth + 0.12,
        SOIL_LIFT + 0.05,
        4,
        3,
      ),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        colorWrite: false,
        side: THREE.DoubleSide,
      }),
    )
    pickTarget.name = 'structure-pick-target'
    pickTarget.userData.pickOnly = true
    pickTarget.userData.buildOnly = true
    group.add(marker, pickTarget)
  }

  private createStructurePieceMesh(
    pieces: readonly StructurePiece[],
    material: THREE.MeshStandardMaterial,
  ): THREE.InstancedMesh {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const mesh = new THREE.InstancedMesh(geometry, material, pieces.length)
    const matrix = new THREE.Matrix4()
    const midpoint = new THREE.Vector3()
    const direction = new THREE.Vector3()
    const quaternion = new THREE.Quaternion()
    const scale = new THREE.Vector3()
    const xAxis = new THREE.Vector3(1, 0, 0)
    pieces.forEach((piece, index) => {
      direction.subVectors(piece.to, piece.from)
      const length = Math.max(0.001, direction.length())
      direction.multiplyScalar(1 / length)
      midpoint.addVectors(piece.from, piece.to).multiplyScalar(0.5)
      quaternion.setFromUnitVectors(xAxis, direction)
      scale.set(length, piece.thickness, piece.depth ?? piece.thickness)
      matrix.compose(midpoint, quaternion, scale)
      mesh.setMatrixAt(index, matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
    mesh.computeBoundingBox()
    mesh.computeBoundingSphere()
    return mesh
  }

  private createGroundRectangleGeometry(
    entry: GroundAnchoredEntry,
    halfLength: number,
    halfWidth: number,
    surfaceLift: number,
    lengthSegments: number,
    widthSegments: number,
  ): THREE.BufferGeometry {
    const positions: number[] = []
    const indices: number[] = []
    const safeLengthSegments = Math.max(1, Math.floor(lengthSegments))
    const safeWidthSegments = Math.max(1, Math.floor(widthSegments))
    for (let lengthIndex = 0; lengthIndex <= safeLengthSegments; lengthIndex += 1) {
      const localX = -halfLength + lengthIndex / safeLengthSegments * halfLength * 2
      for (let widthIndex = 0; widthIndex <= safeWidthSegments; widthIndex += 1) {
        const localZ = -halfWidth + widthIndex / safeWidthSegments * halfWidth * 2
        positions.push(
          localX,
          this.groundAnchoredLocalHeight(entry, localX, localZ, surfaceLift),
          localZ,
        )
      }
    }
    const rowWidth = safeWidthSegments + 1
    for (let lengthIndex = 0; lengthIndex < safeLengthSegments; lengthIndex += 1) {
      for (let widthIndex = 0; widthIndex < safeWidthSegments; widthIndex += 1) {
        const nearLeft = lengthIndex * rowWidth + widthIndex
        const nearRight = nearLeft + 1
        const farLeft = nearLeft + rowWidth
        const farRight = farLeft + 1
        indices.push(nearLeft, nearRight, farLeft, farLeft, nearRight, farRight)
      }
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    geometry.computeBoundingBox()
    geometry.computeBoundingSphere()
    return geometry
  }

  /** 편집물 루트의 회전을 고려해 한 로컬 지점의 실제 지면 상대 높이를 구한다. */
  private groundAnchoredLocalHeight(
    entry: GroundAnchoredEntry,
    localX: number,
    localZ: number,
    surfaceLift: number,
  ): number {
    const renderRotation = entry.kind === 'drainage-segment' || entry.kind === 'structure'
      ? -entry.rotation
      : entry.rotation
    const cosine = Math.cos(renderRotation)
    const sine = Math.sin(renderRotation)
    const worldX = entry.at.x + cosine * localX + sine * localZ
    const worldZ = entry.at.z - sine * localX + cosine * localZ
    const rootHeight = this.groundHeightAt(entry.at.x, entry.at.z) + EDIT_ENTRY_LIFT
    return this.groundHeightAt(worldX, worldZ) + surfaceLift - rootHeight
  }

  /** 투명 선택면도 원판 여러 고리의 정점을 실제 지표에 맞춰 굽힌다. */
  private createTerrainPatchDiscGeometry(
    entry: EditEntry,
    radius: number,
    surfaceLift: number,
  ): THREE.BufferGeometry {
    const segments = 32
    const radialSegments = 4
    const positions: number[] = [
      0,
      this.groundAnchoredLocalHeight(entry, 0, 0, surfaceLift),
      0,
    ]
    const indices: number[] = []

    for (let ring = 1; ring <= radialSegments; ring += 1) {
      const ringRadius = radius * ring / radialSegments
      const ringStart = 1 + (ring - 1) * segments
      for (let segment = 0; segment < segments; segment += 1) {
        const angle = segment / segments * Math.PI * 2
        const localX = Math.cos(angle) * ringRadius
        const localZ = Math.sin(angle) * ringRadius
        positions.push(
          localX,
          this.groundAnchoredLocalHeight(entry, localX, localZ, surfaceLift),
          localZ,
        )
      }

      for (let segment = 0; segment < segments; segment += 1) {
        const next = (segment + 1) % segments
        const current = ringStart + segment
        const nextCurrent = ringStart + next
        if (ring === 1) {
          indices.push(0, nextCurrent, current)
          continue
        }
        const previousStart = ringStart - segments
        const previous = previousStart + segment
        const nextPrevious = previousStart + next
        indices.push(previous, nextPrevious, current, nextPrevious, nextCurrent, current)
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    geometry.computeBoundingBox()
    geometry.computeBoundingSphere()
    return geometry
  }

  /** 보이는 고리는 안팎 두 둘레 모두 현재 지표를 따라간다. */
  private createTerrainPatchRingGeometry(
    entry: EditEntry,
    innerRadius: number,
    outerRadius: number,
    surfaceLift: number,
  ): THREE.BufferGeometry {
    const segments = 32
    const positions: number[] = []
    const indices: number[] = []
    for (let segment = 0; segment < segments; segment += 1) {
      const angle = segment / segments * Math.PI * 2
      const cosine = Math.cos(angle)
      const sine = Math.sin(angle)
      for (const radius of [innerRadius, outerRadius]) {
        const localX = cosine * radius
        const localZ = sine * radius
        positions.push(
          localX,
          this.groundAnchoredLocalHeight(entry, localX, localZ, surfaceLift),
          localZ,
        )
      }
    }
    for (let segment = 0; segment < segments; segment += 1) {
      const next = (segment + 1) % segments
      const inner = segment * 2
      const outer = inner + 1
      const nextInner = next * 2
      const nextOuter = nextInner + 1
      indices.push(inner, nextInner, outer, nextInner, nextOuter, outer)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    geometry.computeBoundingBox()
    geometry.computeBoundingSphere()
    return geometry
  }

  private removeEditEntry(id: string, group: THREE.Group | undefined): void {
    if (!group) {
      return
    }
    this.drainageWaterMeshes.delete(id)
    this.activeEditUseIds.delete(id)
    this.editEntryReactions.delete(id)
    this.editEntryRoot.remove(group)
    this.disposeObject(group)
    this.editEntryGroups.delete(id)
  }

  private disposeObject(root: THREE.Object3D): void {
    const geometries = new Set<THREE.BufferGeometry>()
    const materials = new Set<THREE.Material>()
    root.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return
      }
      geometries.add(object.geometry)
      const objectMaterials = Array.isArray(object.material) ? object.material : [object.material]
      objectMaterials.forEach((material) => materials.add(material))
    })
    geometries.forEach((geometry) => geometry.dispose())
    materials.forEach((material) => material.dispose())
  }

  private setPointerRay(clientX: number, clientY: number): boolean {
    const bounds = this.canvas.getBoundingClientRect()
    if (
      bounds.width <= 0 ||
      bounds.height <= 0 ||
      !Number.isFinite(clientX) ||
      !Number.isFinite(clientY)
    ) {
      return false
    }
    this.pointer.set(
      ((clientX - bounds.left) / bounds.width) * 2 - 1,
      -((clientY - bounds.top) / bounds.height) * 2 + 1,
    )
    this.camera.updateMatrixWorld()
    this.raycaster.setFromCamera(this.pointer, this.camera)
    return true
  }

  private buildLandmarks(): void {
    this.buildHouse()
    TREE_POSITIONS.forEach(({ at, scale, kind, tone }) => this.buildTree(at, scale, kind, tone))
    this.buildRockCluster({ x: -4.5, z: -15.8 })
    this.buildRockCluster({ x: 4.6, z: -13.8 })
    this.buildRockCluster({ x: -0.2, z: -23.55 })
    this.buildGardenDetails()
    this.buildPlaceVegetation()
    this.buildAmbientGroundCover()
  }

  /**
   * 물을 뜨는 두 자리다.
   * 우물은 낮은 돌 두름과 나무 두레박대, 개울 자리는 물가에 놓인 디딤돌로 읽힌다.
   * 안내 문구나 표식을 세우지 않고 형태만으로 알아보게 한다.
   */
  private buildWaterSources(): void {
    for (const source of WATER_SOURCES) {
      const ground = terrainHeight(source.at.x, source.at.z)
      if (source.id === 'a-well') {
        const well = new THREE.Group()
        well.position.set(source.at.x, ground, source.at.z)
        const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0x8b8a7d, roughness: 0.98 })
        const inner = new THREE.Mesh(
          new THREE.CylinderGeometry(0.7, 0.76, 0.7, 14, 1, true),
          new THREE.MeshStandardMaterial({
            color: 0x5f625b,
            roughness: 1,
            side: THREE.DoubleSide,
          }),
        )
        inner.position.y = 0.35
        well.add(inner)
        for (let index = 0; index < 12; index += 1) {
          const angle = (index / 12) * Math.PI * 2
          const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 0), stoneMaterial)
          stone.scale.set(1.3, 0.72 + (index % 3) * 0.08, 0.82)
          stone.position.set(Math.cos(angle) * 0.73, 0.66, Math.sin(angle) * 0.73)
          stone.rotation.set(index * 0.17, -angle, index * 0.11)
          well.add(stone)
        }
        const water = new THREE.Mesh(
          new THREE.CircleGeometry(0.66, 12),
          new THREE.MeshStandardMaterial({
            color: 0x35566b,
            roughness: 0.24,
            metalness: 0.08,
          }),
        )
        water.rotation.x = -Math.PI / 2
        water.position.y = 0.51
        const woodMaterial = new THREE.MeshStandardMaterial({
          color: 0x6d5a41,
          roughness: 1,
        })
        for (const side of [-1, 1]) {
          const post = new THREE.Mesh(
            new THREE.CylinderGeometry(0.09, 0.1, 2.05, 6),
            woodMaterial,
          )
          post.position.set(side * 0.72, 1.18, 0)
          well.add(post)
        }
        const beam = new THREE.Mesh(new THREE.BoxGeometry(1.86, 0.13, 0.13), woodMaterial)
        beam.position.set(0, 2.18, 0)
        const bucket = new THREE.Mesh(
          new THREE.CylinderGeometry(0.21, 0.18, 0.3, 8),
          new THREE.MeshStandardMaterial({ color: 0x7d6547, roughness: 0.95 }),
        )
        bucket.position.set(0, 1.45, 0)
        const rope = new THREE.Mesh(
          new THREE.CylinderGeometry(0.02, 0.02, 0.58, 5),
          new THREE.MeshStandardMaterial({ color: 0xb8a888, roughness: 1 }),
        )
        rope.position.set(0, 1.83, 0)
        well.add(water, beam, bucket, rope)
        well.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.castShadow = true
            object.receiveShadow = true
          }
        })
        this.scene.add(well)
        continue
      }
      for (const [index, offset] of [-0.42, 0.1, 0.58].entries()) {
        const stone = new THREE.Mesh(
          new THREE.SphereGeometry(0.34 - index * 0.04, 7, 5),
          new THREE.MeshStandardMaterial({ color: 0x9a9488, roughness: 1 }),
        )
        stone.scale.y = 0.42
        stone.position.set(
          source.at.x + offset * 0.72,
          terrainHeight(source.at.x + offset * 0.72, source.at.z + offset) + 0.08,
          source.at.z + offset,
        )
        stone.castShadow = true
        stone.receiveShadow = true
        this.scene.add(stone)
      }
    }
  }

  private buildHouse(): void {
    const x = -12.6
    const z = -3.2
    const ground = terrainHeight(x, z)
    const house = new THREE.Group()
    house.position.set(x, ground, z)
    const stone = new THREE.Mesh(
      new THREE.BoxGeometry(3.75, 0.34, 3.08),
      new THREE.MeshStandardMaterial({ color: 0x817e70, roughness: 1 }),
    )
    stone.position.y = 0.17
    const walls = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 2.18, 2.72),
      new THREE.MeshStandardMaterial({ color: 0xd9c99f, roughness: 0.93 }),
    )
    walls.position.y = 1.38
    const timberMaterial = new THREE.MeshStandardMaterial({ color: 0x74583d, roughness: 1 })
    for (const sideX of [-1, 1]) {
      for (const sideZ of [-1, 1]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.25, 0.14), timberMaterial)
        post.position.set(sideX * 1.62, 1.39, sideZ * 1.28)
        house.add(post)
      }
    }
    const beam = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.15, 0.16), timberMaterial)
    beam.position.set(0, 2.38, 1.31)
    const door = new THREE.Mesh(
      new THREE.BoxGeometry(0.82, 1.62, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x6f5439, roughness: 0.96 }),
    )
    door.position.set(0.48, 1.12, 1.41)
    const doorInset = new THREE.Mesh(
      new THREE.BoxGeometry(0.53, 0.04, 0.03),
      new THREE.MeshStandardMaterial({ color: 0x9a7448, roughness: 0.9 }),
    )
    doorInset.position.set(0.48, 1.14, 1.47)
    const handle = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 8, 5),
      new THREE.MeshStandardMaterial({ color: 0xd2b56e, roughness: 0.58 }),
    )
    handle.position.set(0.18, 1.16, 1.49)

    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x8bb7b0,
      emissive: 0x557b70,
      emissiveIntensity: 0.12,
      roughness: 0.34,
    })
    const frontWindow = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.08), windowMaterial)
    frontWindow.position.set(-0.72, 1.5, 1.42)
    const sideWindow = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.76, 0.82), windowMaterial)
    sideWindow.position.set(-1.73, 1.5, -0.35)
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xa94f3d, roughness: 0.82 })
    const roofAngle = 0.41
    for (const side of [-1, 1]) {
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(1.95, 0.12, 3.18),
        roofMaterial,
      )
      panel.rotation.z = -side * roofAngle
      panel.position.set(side * 0.87, 2.82, 0)
      house.add(panel)
    }
    const ridge = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 3.2, 6), roofMaterial)
    ridge.rotation.x = Math.PI / 2
    ridge.position.set(0, 3.18, 0)
    const gableGeometry = new THREE.BufferGeometry()
    gableGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute([-1.68, 2.42, 0, 1.68, 2.42, 0, 0, 3.16, 0], 3),
    )
    gableGeometry.computeVertexNormals()
    const gableMaterial = new THREE.MeshStandardMaterial({
      color: 0xd3c197,
      roughness: 0.94,
      side: THREE.DoubleSide,
    })
    const frontGable = new THREE.Mesh(gableGeometry, gableMaterial)
    frontGable.position.z = 1.375
    const backGable = frontGable.clone()
    backGable.position.z = -1.375
    const chimney = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 1.18, 0.42),
      new THREE.MeshStandardMaterial({ color: 0x726e63, roughness: 1 }),
    )
    chimney.position.set(-0.82, 3.06, -0.46)
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.18, 0.62),
      new THREE.MeshStandardMaterial({ color: 0x938979, roughness: 1 }),
    )
    step.position.set(0.45, 0.37, 1.65)
    house.add(
      stone,
      walls,
      beam,
      door,
      doorInset,
      handle,
      frontWindow,
      sideWindow,
      frontGable,
      backGable,
      ridge,
      chimney,
      step,
    )
    house.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
    this.scene.add(house)
  }

  private buildTree(
    point: Point2,
    scale: number,
    kind: 'conifer' | 'deciduous',
    tone: number,
  ): void {
    const ground = terrainHeight(point.x, point.z)
    const tree = new THREE.Group()
    tree.position.set(point.x, ground, point.z)
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.17 * scale, 0.24 * scale, 2.15 * scale, 7),
      new THREE.MeshStandardMaterial({ color: 0x64533c, roughness: 1 }),
    )
    trunk.position.y = 1.08 * scale
    tree.add(trunk)
    if (kind === 'conifer') {
      const tones = [0x3f684b, 0x496f4c, 0x56764e]
      const material = new THREE.MeshStandardMaterial({ color: tones[tone % tones.length], roughness: 0.97 })
      for (let level = 0; level < 3; level += 1) {
        const crown = new THREE.Mesh(
          new THREE.ConeGeometry((1.18 - level * 0.16) * scale, 2.2 * scale, 8),
          material,
        )
        crown.position.y = (2.45 + level * 0.72) * scale
        crown.rotation.y = level * 0.7 + tone * 0.23
        tree.add(crown)
      }
    } else {
      const tones = [0x58794d, 0x668252, 0x728b58]
      const material = new THREE.MeshStandardMaterial({ color: tones[tone % tones.length], roughness: 0.98 })
      const clusters = [
        { x: -0.48, y: 2.72, z: 0.05, size: 0.94 },
        { x: 0.42, y: 2.84, z: 0.15, size: 1.02 },
        { x: 0.02, y: 3.35, z: -0.18, size: 1.08 },
        { x: 0.05, y: 2.65, z: -0.58, size: 0.82 },
      ]
      for (const cluster of clusters) {
        const crown = new THREE.Mesh(
          new THREE.IcosahedronGeometry(cluster.size * scale, 1),
          material,
        )
        crown.scale.y = 0.82
        crown.position.set(cluster.x * scale, cluster.y * scale, cluster.z * scale)
        tree.add(crown)
      }
    }
    tree.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
    this.scene.add(tree)
  }

  private buildGardenDetails(): void {
    const garden = EDIT_ZONES.find(({ id }) => id === 'a-garden')
    if (!garden) {
      return
    }
    const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0x9a927c, roughness: 1 })
    garden.outline.forEach((point, index) => {
      // 집과 길에서 자연스럽게 들어오는 두 곳은 가장자리를 비워 둔다.
      if (index === 1 || index === 7) {
        return
      }
      const next = garden.outline[(index + 1) % garden.outline.length]!
      const length = Math.hypot(next.x - point.x, next.z - point.z)
      const count = Math.max(1, Math.floor(length / 0.62))
      for (let stoneIndex = 0; stoneIndex < count; stoneIndex += 1) {
        const amount = (stoneIndex + 0.5) / count
        const x = point.x + (next.x - point.x) * amount
        const z = point.z + (next.z - point.z) * amount
        const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16, 0), stoneMaterial)
        stone.scale.set(1.25, 0.58, 0.86)
        stone.position.set(x, terrainHeight(x, z) + 0.09, z)
        stone.rotation.set(0.08, unitNoise(x, z, 21) * Math.PI, 0.04)
        stone.castShadow = true
        stone.receiveShadow = true
        this.scene.add(stone)
      }
    })

    const steppingStones: readonly Point2[] = [
      { x: -11.8, z: -0.85 },
      { x: -11.35, z: 0.02 },
      { x: -10.9, z: 0.88 },
      { x: -10.4, z: 1.72 },
    ]
    steppingStones.forEach((point, index) => {
      const step = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42 - index * 0.025, 0.46, 0.12, 8),
        stoneMaterial,
      )
      step.scale.z = 0.7
      step.position.set(point.x, terrainHeight(point.x, point.z) + 0.055, point.z)
      step.rotation.y = index * 0.51
      step.receiveShadow = true
      this.scene.add(step)
    })
  }

  private buildPlaceVegetation(): void {
    const shrubs: readonly Readonly<{ at: Point2; scale: number; tone: number }>[] = [
      { at: { x: -6.2, z: -5.6 }, scale: 0.82, tone: 0 },
      { at: { x: -5.2, z: -7.7 }, scale: 0.9, tone: 1 },
      { at: { x: -4.5, z: -10.1 }, scale: 1.02, tone: 0 },
      { at: { x: -0.2, z: -10.6 }, scale: 0.88, tone: 2 },
      { at: { x: 4.8, z: -8.8 }, scale: 0.78, tone: 1 },
      { at: { x: 4.7, z: -3.9 }, scale: 0.74, tone: 2 },
      { at: { x: -5.8, z: 8.7 }, scale: 0.82, tone: 2 },
      { at: { x: -7.1, z: 12.3 }, scale: 0.9, tone: 1 },
      { at: { x: 4.7, z: 13.8 }, scale: 0.76, tone: 0 },
      { at: { x: -7.1, z: 18.1 }, scale: 0.68, tone: 1 },
      { at: { x: -1.1, z: 20.6 }, scale: 0.72, tone: 2 },
    ]
    shrubs.forEach(({ at, scale, tone }) => this.buildShrub(at, scale, tone))

    const reedGeometry = new THREE.ConeGeometry(0.075, 0.82, 5)
    const reedMaterial = new THREE.MeshStandardMaterial({ color: 0x7d9157, roughness: 1 })
    const reeds = new THREE.InstancedMesh(reedGeometry, reedMaterial, 42)
    const dummy = new THREE.Object3D()
    let count = 0
    for (let index = 0; index < RENDER_WATER_COURSE.length && count < 42; index += 2) {
      const point = RENDER_WATER_COURSE[index]!
      const normal = this.polylineNormal(RENDER_WATER_COURSE, index)
      for (const side of [-1, 1]) {
        for (let tuft = 0; tuft < 3 && count < 42; tuft += 1) {
          const distance = 1.32 + tuft * 0.18 + unitNoise(point.x, point.z, count) * 0.16
          const x = point.x + normal.x * distance * side + Math.sin(count * 2.3) * 0.12
          const z = point.z + normal.z * distance * side + Math.cos(count * 1.7) * 0.12
          dummy.position.set(x, terrainHeight(x, z) + 0.36, z)
          dummy.rotation.set(0, count * 1.31, (unitNoise(x, z, 3) - 0.5) * 0.18)
          const scale = 0.72 + unitNoise(x, z, 4) * 0.52
          dummy.scale.set(0.82, scale, 0.82)
          dummy.updateMatrix()
          reeds.setMatrixAt(count, dummy.matrix)
          count += 1
        }
      }
    }
    reeds.count = count
    reeds.instanceMatrix.needsUpdate = true
    reeds.castShadow = true
    this.scene.add(reeds)
  }

  private buildShrub(point: Point2, scale: number, tone: number): void {
    const colors = [0x4f704e, 0x607a4d, 0x6d8453]
    const material = new THREE.MeshStandardMaterial({ color: colors[tone % colors.length], roughness: 1 })
    const shrub = new THREE.Group()
    shrub.position.set(point.x, terrainHeight(point.x, point.z), point.z)
    const clusters = [
      { x: -0.28, y: 0.32, z: 0.06, size: 0.42 },
      { x: 0.22, y: 0.38, z: 0.12, size: 0.48 },
      { x: 0.02, y: 0.58, z: -0.12, size: 0.46 },
    ]
    for (const cluster of clusters) {
      const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(cluster.size * scale, 0), material)
      mesh.scale.y = 0.72
      mesh.position.set(cluster.x * scale, cluster.y * scale, cluster.z * scale)
      mesh.rotation.y = unitNoise(point.x + cluster.x, point.z + cluster.z, tone) * Math.PI
      mesh.castShadow = true
      mesh.receiveShadow = true
      shrub.add(mesh)
    }
    this.scene.add(shrub)
  }

  private buildAmbientGroundCover(): void {
    const maximum = 210
    const geometry = new THREE.ConeGeometry(0.055, 0.42, 4)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 })
    const grass = new THREE.InstancedMesh(geometry, material, maximum)
    const dummy = new THREE.Object3D()
    let count = 0
    for (let attempt = 0; attempt < 1800 && count < maximum; attempt += 1) {
      const x = WORLD_CENTER.x + (unitNoise(attempt, 3, 31) * 2 - 1) * WORLD_RADII.x
      const z = WORLD_CENTER.z + (unitNoise(attempt, 7, 37) * 2 - 1) * WORLD_RADII.z
      const point = { x, z }
      if (!isInsideWorld(point) || getEditZoneAt(point)) {
        continue
      }
      if (distanceToPolyline(point, WATER_COURSE) < WATER_CHANNEL.bankHalfWidth + 0.32) {
        continue
      }
      if (distanceSquared(point, { x: -12.6, z: -3.2 }) < 4.2 ** 2) {
        continue
      }
      const nearRoute = RENDER_ROUTES.some(
        (route) => distanceToPolyline(point, route.points) < route.width * 0.5 + 0.52,
      )
      if (nearRoute) {
        continue
      }
      const density = z < -6 ? 0.76 : z > 10 ? 0.62 : 0.48
      if (unitNoise(x, z, 43) > density) {
        continue
      }
      const height = 0.48 + unitNoise(x, z, 47) * 0.72
      dummy.position.set(x, terrainHeight(x, z) + 0.19 * height, z)
      dummy.rotation.set(0, unitNoise(x, z, 53) * Math.PI, (unitNoise(x, z, 59) - 0.5) * 0.17)
      dummy.scale.set(0.82 + unitNoise(x, z, 61) * 0.55, height, 0.82)
      dummy.updateMatrix()
      grass.setMatrixAt(count, dummy.matrix)
      const color = z < -6
        ? new THREE.Color(0x506f4d).lerp(new THREE.Color(0x6f8755), unitNoise(x, z, 67))
        : new THREE.Color(0x78915a).lerp(new THREE.Color(0xa2a96a), unitNoise(x, z, 71))
      grass.setColorAt(count, color)
      count += 1
    }
    grass.count = count
    grass.instanceMatrix.needsUpdate = true
    grass.instanceColor!.needsUpdate = true
    grass.receiveShadow = true
    this.scene.add(grass)
  }

  private buildRockCluster(center: Point2): void {
    for (let index = 0; index < 4; index += 1) {
      const x = center.x + (index - 1.5) * 0.95
      const z = center.z + Math.sin(index * 2.1) * 0.7
      const scale = 0.72 + index * 0.12
      const rock = new THREE.Mesh(
        new THREE.DodecahedronGeometry(scale, 0),
        new THREE.MeshStandardMaterial({ color: 0x7f877d, roughness: 1 }),
      )
      rock.scale.y = 0.65
      rock.rotation.set(index * 0.17, index * 0.63, index * 0.11)
      rock.position.set(x, terrainHeight(x, z) + scale * 0.45, z)
      rock.castShadow = true
      rock.receiveShadow = true
      this.scene.add(rock)
    }
  }

  private buildPlayer(): void {
    const crownWood = new THREE.MeshStandardMaterial({
      color: 0xb66f34,
      roughness: 0.84,
      flatShading: true,
    })
    const faceWood = new THREE.MeshStandardMaterial({
      color: 0xe2ae70,
      roughness: 0.82,
    })
    const bodyWood = new THREE.MeshStandardMaterial({
      color: 0xae6b34,
      roughness: 0.86,
    })
    const limbWood = new THREE.MeshStandardMaterial({
      color: 0xb9783e,
      roughness: 0.86,
    })
    const faceDetail = new THREE.MeshStandardMaterial({
      color: 0x4d301e,
      roughness: 0.38,
    })
    const greenWood = new THREE.MeshStandardMaterial({
      color: 0x728e4e,
      roughness: 0.82,
      flatShading: true,
    })

    this.player.name = 'greenstar-player'
    this.playerTorso.name = 'costume-ready-torso-root'
    this.playerHead.name = 'costume-ready-head-root'

    const torso = new THREE.Mesh(
      new THREE.LatheGeometry([
        new THREE.Vector2(0.13, -0.43),
        new THREE.Vector2(0.25, -0.39),
        new THREE.Vector2(0.32, -0.22),
        new THREE.Vector2(0.34, 0.04),
        new THREE.Vector2(0.31, 0.25),
        new THREE.Vector2(0.23, 0.41),
        new THREE.Vector2(0.1, 0.46),
      ], 12),
      bodyWood,
    )
    torso.name = 'greenstar-seed-torso'
    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.095, 0.105, 0.12, 12),
      bodyWood,
    )
    neck.name = 'costume-neck-anchor'
    neck.position.y = 0.4

    const starShape = new THREE.Shape()
    for (let point = 0; point < 10; point += 1) {
      const radius = point % 2 === 0 ? 0.125 : 0.063
      const angle = -Math.PI / 2 + point * Math.PI / 5
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      if (point === 0) {
        starShape.moveTo(x, y)
      } else {
        starShape.lineTo(x, y)
      }
    }
    starShape.closePath()
    const chestStar = new THREE.Mesh(
      new THREE.ExtrudeGeometry(starShape, {
        depth: 0.018,
        bevelEnabled: true,
        bevelSegments: 1,
        bevelSize: 0.006,
        bevelThickness: 0.006,
      }),
      greenWood,
    )
    chestStar.name = 'greenstar-chest-emblem'
    chestStar.position.set(0, 0.08, 0.334)
    this.playerTorso.position.y = 1.08
    this.playerTorso.add(torso, neck, chestStar)

    this.playerHead.position.y = 1.73
    const head = new THREE.Mesh(
      new THREE.LatheGeometry([
        new THREE.Vector2(0.06, -0.34),
        new THREE.Vector2(0.27, -0.31),
        new THREE.Vector2(0.36, -0.12),
        new THREE.Vector2(0.37, 0.14),
        new THREE.Vector2(0.29, 0.33),
        new THREE.Vector2(0.1, 0.47),
        new THREE.Vector2(0, 0.5),
      ], 8),
      crownWood,
    )
    head.name = 'faceted-chestnut-head'

    const faceShape = new THREE.Shape()
    faceShape.moveTo(-0.265, -0.19)
    faceShape.quadraticCurveTo(-0.295, -0.04, -0.275, 0.13)
    faceShape.quadraticCurveTo(-0.14, 0.21, 0, 0.215)
    faceShape.quadraticCurveTo(0.14, 0.21, 0.275, 0.13)
    faceShape.quadraticCurveTo(0.295, -0.04, 0.265, -0.19)
    faceShape.quadraticCurveTo(0, -0.285, -0.265, -0.19)
    const facePanel = new THREE.Mesh(
      new THREE.ExtrudeGeometry(faceShape, {
        depth: 0.024,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.018,
        bevelThickness: 0.018,
        curveSegments: 6,
      }),
      faceWood,
    )
    facePanel.name = 'broad-faceted-face-panel'
    facePanel.position.set(0, -0.015, 0.336)

    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.042, 14, 10), faceDetail)
    const rightEye = leftEye.clone()
    leftEye.name = 'left-eye'
    rightEye.name = 'right-eye'
    leftEye.scale.z = 0.42
    rightEye.scale.z = 0.42
    leftEye.position.set(-0.12, -0.02, 0.386)
    rightEye.position.set(0.12, -0.02, 0.386)

    const smileCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.058, -0.105, 0.388),
      new THREE.Vector3(0, -0.15, 0.394),
      new THREE.Vector3(0.058, -0.105, 0.388),
    )
    const smile = new THREE.Mesh(
      new THREE.TubeGeometry(smileCurve, 10, 0.009, 8, false),
      faceDetail,
    )
    smile.name = 'small-friendly-smile'
    this.playerHead.add(head, facePanel, leftEye, rightEye, smile)

    const addArm = (
      root: THREE.Group,
      elbowRoot: THREE.Group,
      side: -1 | 1,
    ): void => {
      root.name = side < 0 ? 'left-costume-arm-root' : 'right-costume-arm-root'
      root.position.set(side * 0.345, 1.34, 0)
      root.rotation.z = side * 0.1
      const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.125, 12, 8), limbWood)
      shoulder.name = 'broad-rounded-shoulder'
      shoulder.scale.set(0.94, 1, 0.9)
      const upperArm = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.085, 0.12, 4, 8),
        limbWood,
      )
      upperArm.name = 'chunky-simple-upper-arm'
      upperArm.position.y = -0.155
      elbowRoot.position.y = -0.31
      const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.078, 12, 8), limbWood)
      elbow.name = 'subtle-rounded-elbow'
      const lowerArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.085, 0.12, 0.22, 8),
        limbWood,
      )
      lowerArm.name = 'tapered-simple-forearm'
      lowerArm.position.y = -0.15
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 10), faceWood)
      hand.name = 'large-simple-mitten-hand'
      hand.scale.set(0.72, 1.05, 0.7)
      hand.position.y = -0.34
      elbowRoot.add(elbow, lowerArm, hand)
      root.add(shoulder, upperArm, elbowRoot)
    }

    const addLeg = (
      root: THREE.Group,
      kneeRoot: THREE.Group,
      side: -1 | 1,
    ): void => {
      root.name = side < 0 ? 'left-costume-leg-root' : 'right-costume-leg-root'
      root.position.set(side * 0.17, 0.72, 0)
      const hip = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 8), limbWood)
      hip.name = 'broad-rounded-hip'
      hip.scale.set(0.9, 1, 0.9)
      const upperLeg = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.1, 0.08, 4, 8),
        limbWood,
      )
      upperLeg.name = 'chunky-simple-upper-leg'
      upperLeg.position.y = -0.14
      kneeRoot.position.y = -0.28
      const knee = new THREE.Mesh(new THREE.SphereGeometry(0.095, 12, 8), limbWood)
      knee.name = 'subtle-rounded-knee'
      const lowerLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.095, 0.12, 0.2, 8),
        limbWood,
      )
      lowerLeg.name = 'tapered-simple-lower-leg'
      lowerLeg.position.y = -0.13
      const foot = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 10), faceWood)
      foot.name = 'large-rounded-boot-foot'
      foot.scale.set(0.82, 0.48, 1.14)
      foot.position.set(0, -0.34, 0.06)
      kneeRoot.add(knee, lowerLeg, foot)
      root.add(hip, upperLeg, kneeRoot)
    }

    addArm(this.playerLeftArm, this.playerLeftElbow, -1)
    addArm(this.playerRightArm, this.playerRightElbow, 1)
    addLeg(this.playerLeftLeg, this.playerLeftKnee, -1)
    addLeg(this.playerRightLeg, this.playerRightKnee, 1)
    this.player.add(
      this.playerTorso,
      this.playerHead,
      this.playerLeftArm,
      this.playerRightArm,
      this.playerLeftLeg,
      this.playerRightLeg,
    )
    this.player.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
    this.scene.add(this.player)
  }
}

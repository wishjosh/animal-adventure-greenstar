import * as THREE from 'three'
import {
  EDIT_ZONES,
  PLACES,
  ROUTES,
  WATER_COURSE,
  WATER_SOURCES,
  WORLD_CENTER,
  WORLD_RADII,
  terrainHeight,
  type EditZone,
  type EditZoneId,
  type Point2,
} from '../content/first-map.ts'
import type {
  EditEntry,
  EditSnapshot,
} from '../domain/edit-model.ts'
import type { FireBelliedToadState, ToadCue } from '../domain/fire-bellied-toad.ts'
import type { SmallResidentsState } from '../domain/small-residents.ts'
import type { GameSnapshot } from '../runtime/game-runtime.ts'
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

const SOIL_LIFT = 0.075
const EDIT_ENTRY_LIFT = 0.095

export class ThreeScene {
  private readonly scene = new THREE.Scene()
  private readonly camera = new THREE.PerspectiveCamera(52, 1, 0.1, 180)
  private readonly renderer: THREE.WebGLRenderer
  private readonly ecologyView: EcologyThreeView
  private readonly canvas: HTMLCanvasElement
  private readonly player = new THREE.Group()
  private readonly editEntryRoot = new THREE.Group()
  private readonly cameraTarget = new THREE.Vector3()
  private readonly desiredCamera = new THREE.Vector3()
  private readonly animatedWater: AnimatedWater[] = []
  private readonly soilMeshes = new Map<EditZoneId, THREE.Mesh>()
  private readonly zoneOutlines = new Map<EditZoneId, THREE.LineLoop>()
  private readonly editEntryGroups = new Map<string, THREE.Group>()
  private readonly raycaster = new THREE.Raycaster()
  private readonly pointer = new THREE.Vector2()
  private activeEditZoneId: EditZoneId | undefined
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
    this.scene.background = new THREE.Color(0xc9dfd1)
    this.scene.fog = new THREE.Fog(0xc9dfd1, 34, 82)
    this.buildLights()
    this.buildTerrain()
    this.buildRoutes()
    this.buildWater()
    this.buildEditZones()
    this.buildWaterSources()
    this.buildLandmarks()
    this.buildPlayer()
    this.scene.add(this.editEntryRoot)
    this.ecologyView = new EcologyThreeView(
      this.scene,
      initialSmallResidents,
      initialToad,
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
  syncSurfaceMoisture(moisture: Readonly<Record<EditZoneId, 'dry' | 'moist'>>): void {
    for (const zone of EDIT_ZONES) {
      const soil = this.soilMeshes.get(zone.id)
      if (!soil) {
        continue
      }
      const material = soil.material as THREE.MeshStandardMaterial
      const wet = moisture[zone.id] === 'moist'
      material.color.set(zone.soilColor)
      if (wet) {
        material.color.multiplyScalar(0.72)
      }
      material.roughness = wet ? 0.62 : zone.tone === 'moist' ? 0.72 : 0.94
      material.needsUpdate = true
    }
  }

  syncEdits(snapshot: EditSnapshot): void {
    const currentIds = new Set<string>()
    for (const zone of EDIT_ZONES) {
      for (const entry of Object.values(snapshot[zone.id])) {
        currentIds.add(entry.id)
        let group = this.editEntryGroups.get(entry.id)
        if (group?.userData.editEntryKind !== entry.kind) {
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
          terrainHeight(entry.at.x, entry.at.z) + EDIT_ENTRY_LIFT,
          entry.at.z,
        )
        group.rotation.set(0, entry.rotation, 0)
        group.userData.editEntryId = entry.id
        group.userData.editEntryKind = entry.kind
        group.userData.editZoneId = entry.zoneId
      }
    }

    for (const [id, group] of this.editEntryGroups) {
      if (!currentIds.has(id)) {
        this.removeEditEntry(id, group)
      }
    }
  }

  syncEcology(
    smallResidents: SmallResidentsState,
    toad: FireBelliedToadState,
    cues: readonly ToadCue[],
  ): void {
    this.ecologyView.sync(smallResidents, toad, cues)
  }

  resetEcology(
    smallResidents: SmallResidentsState,
    toad: FireBelliedToadState,
  ): void {
    this.ecologyView.reset(smallResidents, toad)
  }

  setEditZone(zoneId: EditZoneId | undefined): void {
    this.activeEditZoneId = zoneId
    for (const [id, outline] of this.zoneOutlines) {
      outline.visible = id === zoneId
    }
    this.player.visible = zoneId === undefined
    this.updateProjection()

    const zone = EDIT_ZONES.find(({ id }) => id === zoneId)
    if (zone) {
      this.updateEditCamera(zone, 0, true)
    }
  }

  pickGround(clientX: number, clientY: number): Point2 | undefined {
    if (!this.activeEditZoneId || !this.setPointerRay(clientX, clientY)) {
      return undefined
    }
    const soil = this.soilMeshes.get(this.activeEditZoneId)
    if (!soil) {
      return undefined
    }
    const hit = this.raycaster.intersectObject(soil, false)[0]
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
        if (typeof id === 'string' && zoneId === this.activeEditZoneId) {
          return id
        }
        object = object.parent
      }
    }
    return undefined
  }

  render(snapshot: GameSnapshot, deltaSeconds: number): void {
    const playerGround = terrainHeight(snapshot.playerAt.x, snapshot.playerAt.z)
    const bob = snapshot.started && !snapshot.blocked
      ? Math.sin(snapshot.elapsed * 10) * 0.035
      : 0
    this.player.position.set(snapshot.playerAt.x, playerGround + bob, snapshot.playerAt.z)
    this.player.rotation.y = snapshot.playerHeading

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
    this.ecologyView.update(
      snapshot.started && !snapshot.blocked ? deltaSeconds : 0,
      snapshot.elapsed,
    )
    this.renderer.render(this.scene, this.camera)
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
    const cameraHeight = this.compactLandscape ? 7.2 : 6.4
    const distance = snapshot.cameraDistance + (this.compactLandscape ? 0.8 : 0)
    this.cameraTarget.set(snapshot.playerAt.x, playerGround + 1.15, snapshot.playerAt.z)
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
    const ground = terrainHeight(zone.focus.x, zone.focus.z)
    const radius = Math.max(
      1,
      ...zone.outline.map((point) => {
        const deltaY = terrainHeight(point.x, point.z) - ground
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
    return Math.min(112, Math.max(78, this.viewportHeight * 0.24))
  }

  private buildLights(): void {
    const sky = new THREE.HemisphereLight(0xeaf5df, 0x536856, 2.25)
    this.scene.add(sky)
    const sun = new THREE.DirectionalLight(0xfff1bf, 2.6)
    sun.position.set(-17, 29, 12)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    sun.shadow.camera.left = -34
    sun.shadow.camera.right = 34
    sun.shadow.camera.top = 34
    sun.shadow.camera.bottom = -34
    this.scene.add(sun)
  }

  private buildTerrain(): void {
    const width = WORLD_RADII.x * 2.12
    const depth = WORLD_RADII.z * 2.12
    const geometry = new THREE.PlaneGeometry(width, depth, 58, 72)
    geometry.rotateX(-Math.PI / 2)
    const positions = geometry.getAttribute('position')
    for (let index = 0; index < positions.count; index += 1) {
      const worldX = positions.getX(index) + WORLD_CENTER.x
      const worldZ = positions.getZ(index) + WORLD_CENTER.z
      positions.setXYZ(index, worldX, terrainHeight(worldX, worldZ), worldZ)
    }
    positions.needsUpdate = true
    geometry.computeVertexNormals()
    const material = new THREE.MeshStandardMaterial({
      color: 0x769367,
      roughness: 0.96,
      metalness: 0,
    })
    const terrain = new THREE.Mesh(geometry, material)
    terrain.receiveShadow = true
    this.scene.add(terrain)
  }

  private buildRoutes(): void {
    for (const route of ROUTES) {
      const material = new THREE.MeshStandardMaterial({
        color: ROUTE_COLORS[route.kind],
        roughness: 1,
      })
      this.addSegmentStrip(route.points, route.width, 0.075, material)
    }
  }

  private buildWater(): void {
    for (let index = 0; index < WATER_COURSE.length - 1; index += 1) {
      const material = new THREE.MeshStandardMaterial({
        color: 0x5e9da5,
        emissive: 0x4f8f99,
        emissiveIntensity: 0.04,
        roughness: 0.32,
        metalness: 0.04,
        transparent: true,
        opacity: 0.9,
      })
      this.addSegmentStrip(
        [WATER_COURSE[index]!, WATER_COURSE[index + 1]!],
        2.25,
        0.14,
        material,
      )
      this.animatedWater.push({ material, phase: index * 0.8 })
    }
    for (const z of [-15.8, -14.8, -13.9]) {
      const foam = new THREE.Mesh(
        new THREE.SphereGeometry(0.43, 12, 7),
        new THREE.MeshBasicMaterial({ color: 0xf2f5e6, transparent: true, opacity: 0.82 }),
      )
      const x = 1.45 + (z + 15.8) * 0.34
      foam.scale.set(1.8, 0.15, 0.62)
      foam.position.set(x, terrainHeight(x, z) + 0.27, z)
      this.scene.add(foam)
    }
  }

  private buildEditZones(): void {
    for (const zone of EDIT_ZONES) {
      const soil = new THREE.Mesh(
        this.createSoilGeometry(zone),
        new THREE.MeshStandardMaterial({
          color: zone.soilColor,
          roughness: zone.tone === 'moist' ? 0.72 : 0.94,
          metalness: 0,
          side: THREE.DoubleSide,
        }),
      )
      soil.name = 'edit-soil-' + zone.id
      soil.receiveShadow = true
      soil.userData.editZoneId = zone.id
      this.soilMeshes.set(zone.id, soil)
      this.scene.add(soil)

      const outlineGeometry = new THREE.BufferGeometry().setFromPoints(
        zone.outline.map(
          (point) =>
            new THREE.Vector3(
              point.x,
              terrainHeight(point.x, point.z) + SOIL_LIFT + 0.035,
              point.z,
            ),
        ),
      )
      const outline = new THREE.LineLoop(
        outlineGeometry,
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

  private createSoilGeometry(zone: EditZone): THREE.BufferGeometry {
    const first = zone.outline[0]!
    const shape = new THREE.Shape()
    shape.moveTo(first.x, first.z)
    for (let index = 1; index < zone.outline.length; index += 1) {
      const point = zone.outline[index]!
      shape.lineTo(point.x, point.z)
    }
    shape.closePath()

    const geometry = new THREE.ShapeGeometry(shape)
    const positions = geometry.getAttribute('position')
    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index)
      const z = positions.getY(index)
      positions.setXYZ(index, x, terrainHeight(x, z) + SOIL_LIFT, z)
    }
    positions.needsUpdate = true
    geometry.computeVertexNormals()
    geometry.computeBoundingSphere()
    return geometry
  }

  private createEditEntryGroup(entry: EditEntry): THREE.Group {
    const group = new THREE.Group()
    group.name = 'edit-entry-' + entry.id
    group.userData.editEntryId = entry.id
    group.userData.editEntryKind = entry.kind
    group.userData.editZoneId = entry.zoneId

    if (entry.kind === 'low-flower') {
      this.addLowFlower(group)
    } else if (entry.kind === 'low-cover') {
      this.addLowCover(group)
    } else {
      this.addSurfaceAdjustment(group)
    }

    group.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
    return group
  }

  private addLowFlower(group: THREE.Group): void {
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.045, 0.42, 7),
      new THREE.MeshStandardMaterial({ color: 0x4e7a4c, roughness: 0.92 }),
    )
    stem.position.y = 0.22
    group.add(stem)

    const petalMaterial = new THREE.MeshStandardMaterial({ color: 0xf2d475, roughness: 0.78 })
    for (let index = 0; index < 5; index += 1) {
      const angle = (index / 5) * Math.PI * 2
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.105, 8, 6), petalMaterial)
      petal.scale.set(1.15, 0.45, 0.72)
      petal.position.set(Math.cos(angle) * 0.12, 0.47, Math.sin(angle) * 0.12)
      petal.rotation.y = -angle
      group.add(petal)
    }
    const center = new THREE.Mesh(
      new THREE.SphereGeometry(0.085, 9, 7),
      new THREE.MeshStandardMaterial({ color: 0xb96f3f, roughness: 0.8 }),
    )
    center.position.y = 0.49
    group.add(center)
  }

  private addLowCover(group: THREE.Group): void {
    const tones = [0x47704c, 0x587c50, 0x668855, 0x4f7654, 0x738d58]
    for (let index = 0; index < tones.length; index += 1) {
      const angle = index * 2.399
      const radius = index === 0 ? 0 : 0.24 + (index % 2) * 0.06
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 8, 5),
        new THREE.MeshStandardMaterial({ color: tones[index], roughness: 0.96 }),
      )
      leaf.scale.set(1.35, 0.34, 0.74)
      leaf.position.set(Math.cos(angle) * radius, 0.11 + (index % 2) * 0.035, Math.sin(angle) * radius)
      leaf.rotation.y = -angle
      group.add(leaf)
    }
  }

  private addSurfaceAdjustment(group: THREE.Group): void {
    const patch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.56, 0.085, 10),
      new THREE.MeshStandardMaterial({
        color: 0x6d5840,
        roughness: 0.88,
        polygonOffset: true,
        polygonOffsetFactor: -1,
      }),
    )
    patch.scale.z = 0.76
    patch.position.y = 0.045
    group.add(patch)
  }

  private removeEditEntry(id: string, group: THREE.Group | undefined): void {
    if (!group) {
      return
    }
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

  private addSegmentStrip(
    points: readonly Point2[],
    width: number,
    lift: number,
    material: THREE.Material,
  ): void {
    for (let index = 0; index < points.length - 1; index += 1) {
      const start = points[index]!
      const end = points[index + 1]!
      const deltaX = end.x - start.x
      const deltaZ = end.z - start.z
      const length = Math.hypot(deltaX, deltaZ)
      const midpointX = (start.x + end.x) / 2
      const midpointZ = (start.z + end.z) / 2
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.08, length + 0.15),
        material,
      )
      mesh.position.set(
        midpointX,
        terrainHeight(midpointX, midpointZ) + lift,
        midpointZ,
      )
      mesh.rotation.y = Math.atan2(deltaX, deltaZ)
      mesh.receiveShadow = true
      this.scene.add(mesh)
    }
  }

  private buildLandmarks(): void {
    this.buildHouse()
    const treePositions: readonly Point2[] = [
      { x: -15.6, z: -2.8 }, { x: -14.2, z: -6.8 }, { x: -10.8, z: -10.2 },
      { x: -6.5, z: -11.9 }, { x: -6.8, z: -7.2 }, { x: -7.8, z: 8.5 },
      { x: -12.5, z: 7.8 }, { x: -13.8, z: 12.2 }, { x: -8.2, z: 14.4 },
      { x: -17.5, z: 1.2 }, { x: 6.4, z: -4.2 }, { x: 6.8, z: 7.2 },
    ]
    treePositions.forEach((point, index) => this.buildTree(point, 0.86 + (index % 3) * 0.12))
    this.buildRockCluster({ x: -4.5, z: -15.8 })
    this.buildRockCluster({ x: 4.6, z: -13.8 })

    for (const place of PLACES) {
      if (place.id === 'F') {
        for (let index = 0; index < 16; index += 1) {
          const angle = index * 2.399
          const radius = 2.1 + (index % 4) * 0.55
          const x = place.center.x + Math.cos(angle) * radius
          const z = place.center.z + Math.sin(angle) * radius
          const grass = new THREE.Mesh(
            new THREE.ConeGeometry(0.11, 0.72, 5),
            new THREE.MeshStandardMaterial({ color: 0xa6ae67, roughness: 1 }),
          )
          grass.position.set(x, terrainHeight(x, z) + 0.34, z)
          this.scene.add(grass)
        }
      }
    }
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
        const rim = new THREE.Mesh(
          new THREE.CylinderGeometry(0.78, 0.86, 0.82, 12),
          new THREE.MeshStandardMaterial({ color: 0x8d8880, roughness: 0.95 }),
        )
        rim.position.set(source.at.x, ground + 0.41, source.at.z)
        rim.castShadow = true
        rim.receiveShadow = true
        const water = new THREE.Mesh(
          new THREE.CircleGeometry(0.66, 12),
          new THREE.MeshStandardMaterial({
            color: 0x35566b,
            roughness: 0.24,
            metalness: 0.08,
          }),
        )
        water.rotation.x = -Math.PI / 2
        water.position.set(source.at.x, ground + 0.72, source.at.z)
        const woodMaterial = new THREE.MeshStandardMaterial({
          color: 0x6d5a41,
          roughness: 1,
        })
        for (const side of [-1, 1]) {
          const post = new THREE.Mesh(
            new THREE.CylinderGeometry(0.09, 0.1, 2.05, 6),
            woodMaterial,
          )
          post.position.set(source.at.x + side * 0.72, ground + 1.02, source.at.z)
          post.castShadow = true
          this.scene.add(post)
        }
        const beam = new THREE.Mesh(new THREE.BoxGeometry(1.86, 0.13, 0.13), woodMaterial)
        beam.position.set(source.at.x, ground + 2.02, source.at.z)
        beam.castShadow = true
        const bucket = new THREE.Mesh(
          new THREE.CylinderGeometry(0.21, 0.18, 0.3, 8),
          new THREE.MeshStandardMaterial({ color: 0x7d6547, roughness: 0.95 }),
        )
        bucket.position.set(source.at.x, ground + 1.52, source.at.z)
        bucket.castShadow = true
        const rope = new THREE.Mesh(
          new THREE.CylinderGeometry(0.02, 0.02, 0.36, 5),
          new THREE.MeshStandardMaterial({ color: 0xb8a888, roughness: 1 }),
        )
        rope.position.set(source.at.x, ground + 1.85, source.at.z)
        this.scene.add(rim, water, beam, bucket, rope)
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
    const walls = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 2.3, 2.8),
      new THREE.MeshStandardMaterial({ color: 0xe2d2a8, roughness: 0.9 }),
    )
    walls.position.set(x, ground + 1.15, z)
    walls.castShadow = true
    walls.receiveShadow = true
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(2.65, 1.45, 4),
      new THREE.MeshStandardMaterial({ color: 0xa84f3f, roughness: 0.82 }),
    )
    roof.rotation.y = Math.PI / 4
    roof.scale.z = 0.78
    roof.position.set(x, ground + 2.9, z)
    roof.castShadow = true
    this.scene.add(walls, roof)
  }

  private buildTree(point: Point2, scale: number): void {
    const ground = terrainHeight(point.x, point.z)
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18 * scale, 0.24 * scale, 2.1 * scale, 7),
      new THREE.MeshStandardMaterial({ color: 0x64533c, roughness: 1 }),
    )
    trunk.position.set(point.x, ground + 1.05 * scale, point.z)
    trunk.castShadow = true
    const crown = new THREE.Mesh(
      new THREE.ConeGeometry(1.25 * scale, 3.3 * scale, 8),
      new THREE.MeshStandardMaterial({ color: 0x466e4c, roughness: 0.95 }),
    )
    crown.position.set(point.x, ground + 3.05 * scale, point.z)
    crown.castShadow = true
    this.scene.add(trunk, crown)
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
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.42, 0.95, 10),
      new THREE.MeshStandardMaterial({ color: 0x456f62, roughness: 0.8 }),
    )
    body.position.y = 0.65
    body.castShadow = true
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.33, 16, 12),
      new THREE.MeshStandardMaterial({ color: 0xd8b985, roughness: 0.82 }),
    )
    head.position.y = 1.38
    head.castShadow = true
    const direction = new THREE.Mesh(
      new THREE.ConeGeometry(0.16, 0.38, 6),
      new THREE.MeshStandardMaterial({ color: 0xf2d36f, roughness: 0.75 }),
    )
    direction.rotation.x = Math.PI / 2
    direction.position.set(0, 0.88, 0.42)
    this.player.add(body, head, direction)
    this.scene.add(this.player)
  }
}

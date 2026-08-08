import * as THREE from 'three'
import {
  terrainHeight,
  waterSurfaceHeight,
  type Point2,
} from '../content/first-map.ts'
import {
  toadRoutePointAt,
  type FireBelliedToadState,
  type ToadCue,
} from '../domain/fire-bellied-toad.ts'
import { B_C_PROTECTED_COVER_PATH } from '../domain/local-environment.ts'
import {
  BUTTERFLY_PROTECTED_FLOWER,
  type ResidentRuntime,
  type SmallResidentsState,
} from '../domain/small-residents.ts'
import { deriveToadHopMotion } from './toad-hop-motion.ts'

type FadingMark = {
  mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
  age: number
  duration: number
  startOpacity: number
  grow: number
  baseScale: THREE.Vector3
}

export type GroundHeightAt = (x: number, z: number) => number

const MAX_SNAIL_TRAIL_MARKS = 20
const MAX_TOAD_MARKS = 8

export class EcologyThreeView {
  private readonly scene: THREE.Scene
  private readonly root = new THREE.Group()
  private readonly transientRoot = new THREE.Group()
  private readonly butterfly = new THREE.Group()
  private readonly snail = new THREE.Group()
  private readonly toad = new THREE.Group()
  private readonly leftWing = new THREE.Group()
  private readonly rightWing = new THREE.Group()
  private readonly snailTentacles = new THREE.Group()
  private readonly toadBody = new THREE.Group()
  private readonly toadHindLegs = new THREE.Group()
  private readonly toadEyes = new THREE.Group()
  private readonly groundHeightAt: GroundHeightAt
  private readonly protectedFlower = new THREE.Group()
  private readonly refugeLeaves = new THREE.Group()
  private readonly snailTrailMarks: FadingMark[] = []
  private readonly toadMarks: FadingMark[] = []
  private smallState: SmallResidentsState
  private toadState: FireBelliedToadState
  private lastButterflyPosition: Point2 | undefined
  private lastSnailPosition: Point2 | undefined
  private lastToadPosition: Point2 | undefined
  private lastButterflyPhase: ResidentRuntime['phase'] | undefined
  private lastButterflyTargetId: string | undefined
  private trailDistance = 0
  private flowerBendAge = Number.POSITIVE_INFINITY
  private leafWobbleAge = Number.POSITIVE_INFINITY
  private disposed = false

  constructor(
    scene: THREE.Scene,
    initialSmall: SmallResidentsState,
    initialToad: FireBelliedToadState,
    groundHeightAt: GroundHeightAt = terrainHeight,
  ) {
    this.scene = scene
    this.groundHeightAt = groundHeightAt
    this.smallState = initialSmall
    this.toadState = initialToad
    this.root.name = 'ecology-residents-and-habitat'
    this.transientRoot.name = 'ecology-transient-traces'
    scene.add(this.root, this.transientRoot)

    this.createProtectedFlower()
    this.createProtectedCover()
    this.createRefugeLeaves(initialToad.refuge)
    this.createButterfly()
    this.createSnail()
    this.createToad()
    this.root.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
    this.reset(initialSmall, initialToad)
  }

  sync(
    small: SmallResidentsState,
    toad: FireBelliedToadState,
    cues: readonly ToadCue[],
  ): void {
    if (this.disposed) {
      return
    }
    this.syncButterfly(small.butterfly, true)
    this.syncSnail(small.snail, true)
    this.syncToad(toad, cues)
    this.smallState = small
    this.toadState = toad
  }

  update(delta: number, elapsed: number): void {
    const safeDelta = Math.max(0, delta)
    if (this.disposed || safeDelta === 0) {
      return
    }

    const butterfly = this.smallState.butterfly
    const wingSpeed = butterfly.phase === 'using' ? 3.2 : 9.5
    const wingAmount = 0.25 + (Math.sin(elapsed * wingSpeed) + 1) * 0.24
    this.leftWing.rotation.z = wingAmount
    this.rightWing.rotation.z = -wingAmount
    if (this.butterfly.visible) {
      const travelLift =
        butterfly.phase === 'using'
          ? 0
          : Math.sin(butterfly.motionProgress * Math.PI) * 0.42
      const usingHeight = butterfly.target?.heightOffset ?? 0.72
      this.butterfly.position.y =
        this.groundHeightAt(butterfly.position.x, butterfly.position.z) +
        (butterfly.phase === 'using' ? usingHeight : 0.9) +
        travelLift +
        Math.sin(elapsed * 4.1) * 0.045

      // 빈 흙을 살필 때는 `내려가려다 바깥으로 밀려나는` 동작을 반복한다.
      // 앉기와 구별되는 것은 높이가 아니라 낮아질수록 중심에서 벗어나는 것이다.
      // 낮고 가운데에 오면 사람 눈에는 앉은 것으로 읽히므로 둘을 반대로 묶는다.
      // 최저점 1.02는 앉은 높이(0.72)와 0.30 떨어져 있다.
      if (butterfly.phase === 'searching' && butterfly.motionProgress >= 1) {
        const attempt = Math.abs(Math.sin(butterfly.phaseSeconds * 2.2))
        const swing = 0.2 + attempt * 0.52
        const heading = butterfly.phaseSeconds * 1.15
        this.butterfly.position.x = butterfly.position.x + Math.cos(heading) * swing
        this.butterfly.position.z = butterfly.position.z + Math.sin(heading) * swing
        this.butterfly.position.y =
          this.groundHeightAt(butterfly.position.x, butterfly.position.z) +
          1.28 -
          attempt * 0.26 +
          Math.sin(elapsed * 5.6) * 0.05
      }

      // 피난처에서는 나뭇잎 사이를 느리게 맴돈다. 한 점에 굳어 있으면
      // 쉬는 것으로 보이므로 살피기보다 느리고 넓게 돈다.
      if (butterfly.phase === 'refuge' && butterfly.motionProgress >= 1) {
        const drift = butterfly.phaseSeconds * 0.62
        this.butterfly.position.x = butterfly.position.x + Math.cos(drift) * 0.34
        this.butterfly.position.z = butterfly.position.z + Math.sin(drift) * 0.34
        this.butterfly.position.y =
          this.groundHeightAt(butterfly.position.x, butterfly.position.z) +
          0.94 +
          Math.sin(elapsed * 3.4) * 0.06
      }
    }

    const snail = this.smallState.snail
    this.snailTentacles.rotation.z =
      snail.phase === 'using' ? Math.sin(elapsed * 0.86) * 0.055 : 0

    const toad = this.toadState
    if (this.toad.visible) {
      const travelling =
        toad.phase === 'approaching' ||
        (toad.phase === 'away' && Boolean(toad.activeRoute))
      const route = toad.activeRoute
      let hopLift = 0
      let crouch = 0
      if (travelling && route) {
        // 개구리는 등속으로 미끄러지지 않는다. 웅크렸다가 튀어 나가고
        // 내려앉아 잠시 멈춘다. 도메인의 등속 진행을 화면에서만 이 리듬으로
        // 다시 나눈다. 이동 속도와 도착 시각 계약은 그대로 둔다.
        const motion = deriveToadHopMotion(toad.routeProgress, route.hopCount)
        const spot = toadRoutePointAt(route, motion.routeProgress)
        this.toad.position.x = spot.x
        this.toad.position.z = spot.z
        hopLift = motion.lift
        crouch = motion.crouch
      }
      const breath = toad.phase === 'using' ? Math.sin(elapsed * 2.1) * 0.018 : 0
      this.toad.position.y =
        this.groundHeightAt(this.toad.position.x, this.toad.position.z) +
        0.19 +
        hopLift +
        breath
      this.toadBody.scale.y = 1 + breath * 0.85 - crouch
      const extension = Math.min(0.34, hopLift * 0.72)
      this.toadHindLegs.scale.set(1 + extension, 1, 1 + extension * 0.82)
      const blink = toad.phase === 'using' && Math.sin(elapsed * 1.36) > 0.985
      this.toadEyes.scale.y = blink ? 0.18 : 1
    }

    this.flowerBendAge += safeDelta
    this.protectedFlower.rotation.z =
      this.flowerBendAge <= 0.72
        ? Math.sin((this.flowerBendAge / 0.72) * Math.PI) * 0.075
        : 0

    this.leafWobbleAge += safeDelta
    this.refugeLeaves.rotation.z =
      this.leafWobbleAge < 0.9
        ? Math.sin((this.leafWobbleAge / 0.9) * Math.PI * 3) *
          0.08 *
          (1 - this.leafWobbleAge / 0.9)
        : 0

    this.updateMarks(this.snailTrailMarks, safeDelta)
    this.updateMarks(this.toadMarks, safeDelta)
  }

  reset(small: SmallResidentsState, toad: FireBelliedToadState): void {
    if (this.disposed) {
      return
    }
    this.resetGroundTraces()
    this.lastButterflyPosition = undefined
    this.lastSnailPosition = undefined
    this.lastToadPosition = undefined
    this.lastButterflyPhase = small.butterfly.phase
    this.lastButterflyTargetId = small.butterfly.target?.id
    this.trailDistance = 0
    this.flowerBendAge = Number.POSITIVE_INFINITY
    this.leafWobbleAge = Number.POSITIVE_INFINITY
    this.protectedFlower.rotation.z = 0
    this.refugeLeaves.rotation.z = 0
    this.toadBody.scale.set(1, 1, 1)
    this.toadHindLegs.scale.set(1, 1, 1)
    this.toadEyes.scale.set(1, 1, 1)
    this.smallState = small
    this.toadState = toad
    this.syncButterfly(small.butterfly, false)
    this.syncSnail(small.snail, false)
    this.syncToad(toad, [])
  }

  /** 지면이 바뀌기 전에 찍힌 흔적이 새 표면 위에 뜨거나 파묻히지 않게 없앤다. */
  resetGroundTraces(): void {
    if (this.disposed) {
      return
    }
    this.clearMarks(this.snailTrailMarks)
    this.clearMarks(this.toadMarks)
    this.trailDistance = 0
  }

  dispose(): void {
    if (this.disposed) {
      return
    }
    this.clearMarks(this.snailTrailMarks)
    this.clearMarks(this.toadMarks)
    this.scene.remove(this.root, this.transientRoot)
    this.disposeObject(this.root)
    this.disposeObject(this.transientRoot)
    this.root.clear()
    this.transientRoot.clear()
    this.disposed = true
  }

  private syncButterfly(runtime: ResidentRuntime, allowContactCue: boolean): void {
    // 나비는 피난처에 있어도 화면에서 지우지 않는다. 사라졌다 나타나면
    // 살피기까지 `왔다가 없어졌다`로 읽혀 하나의 이야기로 이어지지 않는다.
    this.butterfly.visible = true
    this.butterfly.position.set(
      runtime.position.x,
      this.groundHeightAt(runtime.position.x, runtime.position.z) +
        (runtime.phase === 'using' ? runtime.target?.heightOffset ?? 0.72 : 0.9),
      runtime.position.z,
    )
    this.turnToward(this.butterfly, this.lastButterflyPosition, runtime.position)

    if (
      allowContactCue &&
      runtime.phase === 'using' &&
      runtime.target?.protected &&
      (this.lastButterflyPhase !== 'using' ||
        this.lastButterflyTargetId !== runtime.target.id)
    ) {
      this.flowerBendAge = 0
    }
    this.lastButterflyPhase = runtime.phase
    this.lastButterflyTargetId = runtime.target?.id
    this.lastButterflyPosition = { ...runtime.position }
  }

  private syncSnail(runtime: ResidentRuntime, allowTrail: boolean): void {
    // 달팽이도 피난처에서 지우지 않는다. 덮임 아래에 그대로 있고 촉수만
    // 거의 다 집어넣어, 사라진 것이 아니라 들어가 있는 것으로 보이게 한다.
    this.snail.visible = true
    this.snail.position.set(
      runtime.position.x,
      this.groundHeightAt(runtime.position.x, runtime.position.z) + 0.13,
      runtime.position.z,
    )
    this.turnToward(this.snail, this.lastSnailPosition, runtime.position)

    if (allowTrail && this.lastSnailPosition) {
      this.trailDistance += Math.hypot(
        runtime.position.x - this.lastSnailPosition.x,
        runtime.position.z - this.lastSnailPosition.z,
      )
      if (this.trailDistance >= 0.18) {
        this.trailDistance = 0
        this.addSnailTrailMark(runtime.position)
      }
    }

    const tentacleScale =
      runtime.phase === 'refuge'
        ? Math.max(0.12, 1 - runtime.motionProgress * 0.88)
        : runtime.phase === 'returning'
          ? Math.min(1, 0.18 + runtime.motionProgress * 0.82)
          : // 마른 흙을 살필 때는 촉수를 반쯤만 내민다. 자리를 쓰는 모습과 구별한다.
            runtime.phase === 'searching'
            ? 0.55
            : 1
    this.snailTentacles.scale.y = tentacleScale
    this.lastSnailPosition = { ...runtime.position }
  }

  private syncToad(state: FireBelliedToadState, cues: readonly ToadCue[]): void {
    const visible =
      state.phase === 'approaching' ||
      state.phase === 'using' ||
      (state.phase === 'away' && Boolean(state.activeRoute) && state.routeProgress > 0)
    this.toad.visible = visible
    this.toad.position.set(
      state.position.x,
      this.groundHeightAt(state.position.x, state.position.z) + 0.19,
      state.position.z,
    )
    this.turnToward(this.toad, this.lastToadPosition, state.position)

    for (const cue of cues) {
      if (cue === 'refuge-rustle') {
        this.leafWobbleAge = 0
      } else if (cue === 'water-ripple' && state.activeRoute) {
        this.addRipple(state.activeRoute.rippleAt, 0xadcfd0, 0.38)
      } else if (cue === 'water-touch') {
        this.addRipple(state.activeRoute?.rippleAt ?? state.position, 0xc3ddcf, 0.44)
      } else if (cue === 'departure') {
        this.addDampMark(state.position)
      }
    }

    this.lastToadPosition = { ...state.position }
  }

  private createProtectedFlower(): void {
    const stems = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.028, 0.043, 1, 6),
      new THREE.MeshStandardMaterial({ color: 0x50764a, roughness: 1 }),
      3,
    )
    const petals = new THREE.InstancedMesh(
      new THREE.SphereGeometry(1, 7, 4),
      new THREE.MeshStandardMaterial({ color: 0xe5d99d, roughness: 0.9 }),
      9,
    )
    const centers = new THREE.InstancedMesh(
      new THREE.SphereGeometry(1, 7, 4),
      new THREE.MeshStandardMaterial({ color: 0xc59b45, roughness: 0.9 }),
      3,
    )
    const dummy = new THREE.Object3D()
    const offsets = [-0.17, 0, 0.16]

    offsets.forEach((offset, index) => {
      const height = 0.46 + index * 0.06
      dummy.position.set(offset, height / 2, index % 2 === 0 ? 0.03 : -0.05)
      dummy.rotation.set(0, 0, offset * 0.35)
      dummy.scale.set(1, height, 1)
      dummy.updateMatrix()
      stems.setMatrixAt(index, dummy.matrix)

      const bloomY = 0.5 + index * 0.06
      for (let petalIndex = 0; petalIndex < 3; petalIndex += 1) {
        dummy.position.set(
          offset + (petalIndex - 1) * 0.075,
          bloomY,
          index % 2 === 0 ? 0.03 : -0.05,
        )
        dummy.rotation.set(0, 0, 0)
        dummy.scale.set(0.098, 0.038, 0.061)
        dummy.updateMatrix()
        petals.setMatrixAt(index * 3 + petalIndex, dummy.matrix)
      }

      dummy.position.set(offset, bloomY + 0.03, index % 2 === 0 ? 0.03 : -0.05)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.setScalar(0.055)
      dummy.updateMatrix()
      centers.setMatrixAt(index, dummy.matrix)
    })
    stems.instanceMatrix.needsUpdate = true
    petals.instanceMatrix.needsUpdate = true
    centers.instanceMatrix.needsUpdate = true
    this.protectedFlower.add(stems, petals, centers)
    this.protectedFlower.position.set(
      BUTTERFLY_PROTECTED_FLOWER.at.x,
      this.groundHeightAt(
        BUTTERFLY_PROTECTED_FLOWER.at.x,
        BUTTERFLY_PROTECTED_FLOWER.at.z,
      ) + 0.04,
      BUTTERFLY_PROTECTED_FLOWER.at.z,
    )
    this.root.add(this.protectedFlower)
  }

  private createProtectedCover(): void {
    const sampled: Point2[] = []
    for (let index = 0; index < B_C_PROTECTED_COVER_PATH.length - 1; index += 1) {
      const start = B_C_PROTECTED_COVER_PATH[index]!
      const end = B_C_PROTECTED_COVER_PATH[index + 1]!
      const length = Math.hypot(end.x - start.x, end.z - start.z)
      const steps = Math.max(1, Math.ceil(length / 0.38))
      for (let step = 0; step < steps; step += 1) {
        const amount = step / steps
        sampled.push({
          x: start.x + (end.x - start.x) * amount,
          z: start.z + (end.z - start.z) * amount,
        })
      }
    }
    const last = B_C_PROTECTED_COVER_PATH.at(-1)
    if (last) {
      sampled.push(last)
    }
    const leavesPerPoint = 4
    const leaves = new THREE.InstancedMesh(
      new THREE.SphereGeometry(1, 7, 4),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 }),
      sampled.length * leavesPerPoint,
    )
    const dummy = new THREE.Object3D()
    const offsets = [
      { x: -0.18, z: 0.02, rotation: -0.38 },
      { x: 0.16, z: -0.08, rotation: 0.55 },
      { x: 0.01, z: 0.18, rotation: 1.18 },
      { x: 0.08, z: -0.2, rotation: 1.82 },
    ]
    let instance = 0
    sampled.forEach((point, pointIndex) => {
      offsets.forEach((offset, leafIndex) => {
        dummy.position.set(
          point.x + offset.x,
          this.groundHeightAt(point.x, point.z) + 0.13 + leafIndex * 0.014,
          point.z + offset.z,
        )
        dummy.rotation.set(0, offset.rotation + pointIndex * 1.37, 0)
        dummy.scale.set(
          0.29 + ((pointIndex + leafIndex) % 2) * 0.035,
          0.045,
          0.13,
        )
        dummy.updateMatrix()
        leaves.setMatrixAt(instance, dummy.matrix)
        leaves.setColorAt(
          instance,
          new THREE.Color((pointIndex + leafIndex) % 3 === 0 ? 0x526b43 : 0x60784a),
        )
        instance += 1
      })
    })
    leaves.instanceMatrix.needsUpdate = true
    leaves.instanceColor!.needsUpdate = true
    leaves.name = 'b-c-protected-cover'
    this.root.add(leaves)
  }

  private createRefugeLeaves(at: Point2): void {
    const leaves = new THREE.InstancedMesh(
      new THREE.SphereGeometry(1, 8, 5),
      new THREE.MeshStandardMaterial({ color: 0x4c6748, roughness: 1 }),
      4,
    )
    const dummy = new THREE.Object3D()
    const offsets = [-0.38, -0.12, 0.16, 0.39]
    offsets.forEach((offset, index) => {
      dummy.position.set(offset, 0.18 + (index % 2) * 0.04, (index - 1.5) * 0.12)
      dummy.rotation.set(0, offset * 1.7, (index % 2 === 0 ? -1 : 1) * 0.22)
      dummy.scale.set(0.12, 0.016, 0.3)
      dummy.updateMatrix()
      leaves.setMatrixAt(index, dummy.matrix)
    })
    leaves.instanceMatrix.needsUpdate = true
    this.refugeLeaves.add(leaves)
    this.refugeLeaves.position.set(at.x, this.groundHeightAt(at.x, at.z) + 0.05, at.z)
    this.root.add(this.refugeLeaves)
  }

  private createButterfly(): void {
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(0.095, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0x44392e, roughness: 0.85 }),
    )
    body.scale.set(0.68, 0.56, 1.72)
    const wingGeometry = new THREE.SphereGeometry(0.2, 9, 5)
    const wingMaterial = new THREE.MeshStandardMaterial({
      color: 0xd28a46,
      roughness: 0.9,
      side: THREE.DoubleSide,
    })
    const rearWingMaterial = new THREE.MeshStandardMaterial({
      color: 0xe1ad5e,
      roughness: 0.9,
      side: THREE.DoubleSide,
    })
    const markMaterial = new THREE.MeshStandardMaterial({
      color: 0x4f3d2e,
      roughness: 0.88,
      side: THREE.DoubleSide,
    })
    for (const [side, wing] of [[-1, this.leftWing], [1, this.rightWing]] as const) {
      const front = new THREE.Mesh(wingGeometry, wingMaterial)
      front.scale.set(1.28, 0.11, 0.9)
      front.position.set(side * 0.2, 0, 0.02)
      const rear = new THREE.Mesh(wingGeometry, rearWingMaterial)
      rear.scale.set(0.88, 0.1, 0.68)
      rear.position.set(side * 0.16, -0.005, -0.15)
      const mark = new THREE.Mesh(new THREE.SphereGeometry(0.047, 7, 4), markMaterial)
      mark.scale.set(1.15, 0.16, 0.76)
      mark.position.set(side * 0.3, 0.03, 0.02)
      wing.add(front, rear, mark)
    }
    const antennaMaterial = new THREE.MeshStandardMaterial({ color: 0x3b342c, roughness: 1 })
    for (const side of [-1, 1]) {
      const antenna = new THREE.Mesh(
        new THREE.CylinderGeometry(0.009, 0.012, 0.27, 5),
        antennaMaterial,
      )
      antenna.rotation.x = Math.PI / 2.35
      antenna.rotation.z = side * 0.2
      antenna.position.set(side * 0.035, 0.015, 0.18)
      this.butterfly.add(antenna)
    }
    this.butterfly.add(body, this.leftWing, this.rightWing)
    this.butterfly.scale.setScalar(1.36)
    this.root.add(this.butterfly)
  }

  private createSnail(): void {
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x918c5d, roughness: 0.92 })
    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.15, 9, 6), bodyMaterial)
    foot.scale.set(0.76, 0.24, 1.82)
    foot.position.set(0, -0.015, 0.01)
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 9, 6), bodyMaterial)
    head.scale.set(0.86, 0.72, 1.06)
    head.position.set(0, 0.075, 0.24)
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(0.19, 10, 7),
      new THREE.MeshStandardMaterial({ color: 0xb2743f, roughness: 0.88 }),
    )
    shell.scale.set(0.52, 1, 0.95)
    shell.position.set(0, 0.17, -0.05)
    const shellMarks = new THREE.Group()
    const shellMarkMaterial = new THREE.MeshStandardMaterial({ color: 0x5b402d, roughness: 0.9 })
    for (const side of [-1, 1]) {
      for (const [radius, tube] of [[0.086, 0.014], [0.044, 0.009]] as const) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(radius, tube, 5, 12),
          shellMarkMaterial,
        )
        ring.rotation.y = Math.PI / 2
        ring.position.set(side * 0.106, 0.17, -0.05)
        shellMarks.add(ring)
      }
    }

    const stalks = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.012, 0.018, 0.2, 5),
      new THREE.MeshStandardMaterial({ color: 0x696943, roughness: 1 }),
      2,
    )
    const tips = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.025, 6, 4),
      new THREE.MeshStandardMaterial({ color: 0x494934, roughness: 1 }),
      2,
    )
    const dummy = new THREE.Object3D()
    ;[-0.075, 0.075].forEach((x, index) => {
      dummy.position.set(x, 0.13, 0.24)
      dummy.rotation.set(-0.42, 0, 0)
      dummy.scale.set(1, 1, 1)
      dummy.updateMatrix()
      stalks.setMatrixAt(index, dummy.matrix)
      dummy.position.set(x, 0.23, 0.31)
      dummy.rotation.set(0, 0, 0)
      dummy.updateMatrix()
      tips.setMatrixAt(index, dummy.matrix)
    })
    stalks.instanceMatrix.needsUpdate = true
    tips.instanceMatrix.needsUpdate = true
    this.snailTentacles.add(stalks, tips)
    this.snail.add(foot, head, shell, shellMarks, this.snailTentacles)
    this.snail.scale.setScalar(1.28)
    this.root.add(this.snail)
  }

  private createToad(): void {
    const backMaterial = new THREE.MeshStandardMaterial({
      color: 0x66724f,
      roughness: 0.96,
    })
    const sideMaterial = new THREE.MeshStandardMaterial({
      color: 0x505a40,
      roughness: 0.98,
    })
    const torso = new THREE.Mesh(new THREE.SphereGeometry(0.31, 12, 8), backMaterial)
    torso.scale.set(1.08, 0.45, 1.12)
    torso.position.z = -0.05
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 8), backMaterial)
    head.scale.set(1.22, 0.52, 0.76)
    head.position.set(0, 0.015, 0.28)

    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x9c9b58, roughness: 0.7 })
    const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x20251c, roughness: 0.58 })
    for (const side of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.061, 8, 6), eyeMaterial)
      eye.position.set(side * 0.145, 0.145, 0.39)
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.033, 8, 6), pupilMaterial)
      pupil.position.set(side * 0.148, 0.157, 0.433)
      this.toadEyes.add(eye, pupil)

      const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.22, 3, 7), sideMaterial)
      thigh.rotation.set(Math.PI / 2, side * 0.5, Math.PI / 2)
      thigh.position.set(side * 0.34, -0.025, -0.12)
      const shin = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.24, 3, 7), sideMaterial)
      shin.rotation.set(Math.PI / 2, -side * 0.38, Math.PI / 2)
      shin.position.set(side * 0.48, -0.075, -0.31)
      const foot = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 5), sideMaterial)
      foot.scale.set(1.35, 0.35, 0.78)
      foot.position.set(side * 0.58, -0.105, -0.42)
      this.toadHindLegs.add(thigh, shin, foot)

      const frontLeg = new THREE.Mesh(new THREE.CapsuleGeometry(0.042, 0.16, 3, 6), sideMaterial)
      frontLeg.rotation.set(0, -side * 0.3, Math.PI / 2)
      frontLeg.position.set(side * 0.23, -0.065, 0.27)
      this.toadBody.add(frontLeg)
    }

    const spotMaterial = new THREE.MeshStandardMaterial({ color: 0x46503a, roughness: 1 })
    const spots = [
      { x: -0.13, z: -0.06, size: 0.07 },
      { x: 0.12, z: -0.17, size: 0.055 },
      { x: 0.02, z: 0.08, size: 0.045 },
    ]
    for (const spot of spots) {
      const mark = new THREE.Mesh(new THREE.SphereGeometry(spot.size, 7, 4), spotMaterial)
      mark.scale.y = 0.18
      mark.position.set(spot.x, 0.145, spot.z)
      this.toadBody.add(mark)
    }
    this.toadBody.add(torso, head, this.toadEyes)
    this.toad.add(this.toadHindLegs, this.toadBody)
    this.toad.scale.setScalar(1.34)
    this.root.add(this.toad)
  }

  private addSnailTrailMark(at: Point2): void {
    this.makeRoom(this.snailTrailMarks, MAX_SNAIL_TRAIL_MARKS)
    const opacity = 0.2
    const mesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.045, 8),
      new THREE.MeshBasicMaterial({
        color: 0xa8b9a4,
        transparent: true,
        opacity,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    )
    mesh.rotation.x = -Math.PI / 2
    mesh.scale.set(1.8, 0.52, 1)
    mesh.position.set(at.x, this.groundHeightAt(at.x, at.z) + 0.032, at.z)
    this.transientRoot.add(mesh)
    this.snailTrailMarks.push({
      mesh,
      age: 0,
      duration: 7.5,
      startOpacity: opacity,
      grow: 0.08,
      baseScale: mesh.scale.clone(),
    })
  }

  private addRipple(at: Point2, color: number, opacity: number): void {
    this.makeRoom(this.toadMarks, MAX_TOAD_MARKS)
    const mesh = new THREE.Mesh(
      new THREE.RingGeometry(0.16, 0.21, 20),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    )
    mesh.rotation.x = -Math.PI / 2
    mesh.position.set(at.x, waterSurfaceHeight(at.x, at.z) + 0.04, at.z)
    this.transientRoot.add(mesh)
    this.toadMarks.push({
      mesh,
      age: 0,
      duration: 2.1,
      startOpacity: opacity,
      grow: 2.7,
      baseScale: mesh.scale.clone(),
    })
  }

  private addDampMark(at: Point2): void {
    this.makeRoom(this.toadMarks, MAX_TOAD_MARKS)
    const opacity = 0.19
    const mesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.18, 12),
      new THREE.MeshBasicMaterial({
        color: 0x4d6658,
        transparent: true,
        opacity,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    )
    mesh.rotation.x = -Math.PI / 2
    mesh.scale.set(1.6, 0.74, 1)
    mesh.position.set(at.x, this.groundHeightAt(at.x, at.z) + 0.1, at.z)
    this.transientRoot.add(mesh)
    this.toadMarks.push({
      mesh,
      age: 0,
      duration: 9,
      startOpacity: opacity,
      grow: 0.25,
      baseScale: mesh.scale.clone(),
    })
  }

  private updateMarks(marks: FadingMark[], delta: number): void {
    for (let index = marks.length - 1; index >= 0; index -= 1) {
      const mark = marks[index]
      if (!mark) {
        continue
      }
      mark.age += delta
      const progress = Math.min(1, mark.age / mark.duration)
      mark.mesh.material.opacity = mark.startOpacity * (1 - progress)
      mark.mesh.scale.copy(mark.baseScale).multiplyScalar(1 + progress * mark.grow)
      if (progress >= 1) {
        this.removeMark(marks, index)
      }
    }
  }

  private makeRoom(marks: FadingMark[], maximum: number): void {
    while (marks.length >= maximum) {
      this.removeMark(marks, 0)
    }
  }

  private clearMarks(marks: FadingMark[]): void {
    while (marks.length > 0) {
      this.removeMark(marks, marks.length - 1)
    }
  }

  private removeMark(marks: FadingMark[], index: number): void {
    const mark = marks[index]
    if (!mark) {
      return
    }
    marks.splice(index, 1)
    this.transientRoot.remove(mark.mesh)
    this.disposeObject(mark.mesh)
  }

  private disposeObject(root: THREE.Object3D): void {
    const geometries = new Set<THREE.BufferGeometry>()
    const materials = new Set<THREE.Material>()
    root.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return
      }
      geometries.add(object.geometry)
      const objectMaterials = Array.isArray(object.material)
        ? object.material
        : [object.material]
      objectMaterials.forEach((material) => materials.add(material))
    })
    geometries.forEach((geometry) => geometry.dispose())
    materials.forEach((material) => material.dispose())
  }

  private turnToward(
    group: THREE.Group,
    previous: Point2 | undefined,
    next: Point2,
  ): void {
    if (!previous) {
      return
    }
    const deltaX = next.x - previous.x
    const deltaZ = next.z - previous.z
    if (deltaX * deltaX + deltaZ * deltaZ > 0.000001) {
      group.rotation.y = Math.atan2(deltaX, deltaZ)
    }
  }
}

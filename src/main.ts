import './style.css'
import {
  EDIT_ZONES,
  assertFirstMapContract,
  getNearbyEditZone,
  getNearbyWaterSource,
  isCareZoneId,
  type Point2,
  type EditZone,
  type Place,
} from './content/first-map.ts'
import {
  STRUCTURE_FOOTPRINTS,
  findTerrainPatchAt,
  type EditEntry,
  type EditSnapshot,
  type EditGuard,
  type StructureForm,
} from './domain/edit-model.ts'
import type { ZoneEnvironmentReading } from './domain/local-environment.ts'
import { derivePlantGrowth, type PlantGrowthStage } from './domain/plant-growth.ts'
import {
  advanceUpstreamWaterway,
  createUpstreamWaterwayState,
  deriveHeadwaterProfile,
  headwaterProfileAtB,
  pendingUpstreamDelivery,
  upstreamDeliveryProgress,
  type HeadwaterProfile,
  type PersistentUpstreamWaterwayState,
} from './domain/upstream-waterway.ts'
import {
  OBSERVATION_CARDS,
  ObservationNotebookRuntime,
  type ObservationEntry,
} from './domain/observation-notebook.ts'
import {
  assertWaterwayClueContract,
  getNearbyWaterwayClue,
  type WaterwayClue,
} from './content/waterway-clues.ts'
import { InputState, isLandscapeViewport, normalizeStick } from './input/input-state.ts'
import {
  LOCAL_SAVE_KEYS,
  LOCAL_SAVE_MAP_ID,
  LOCAL_SAVE_SCHEMA_VERSION,
  LocalSaveStore,
  type CurrentLocalSave,
  type LocalSaveLoadResult,
} from './persistence/local-save.ts'
import { ThreeScene } from './render/three-scene.ts'
import { EcologyRuntime } from './runtime/ecology-runtime.ts'
import {
  GameRuntime,
  type MovementObstacle,
} from './runtime/game-runtime.ts'
import { ResidentsRuntime, type ResidentsSnapshot } from './runtime/residents-runtime.ts'

// 도구는 모두 정원에서 하는 일이다. `고르기`는 도구가 아니다.
// 이미 심어 둔 것을 그냥 누르면 잡히므로 별도 도구가 필요 없다.
type EditTool = 'low-flower' | 'low-cover' | 'surface-adjustment' | 'water'
type EditLayer = 'care' | 'build'
type BuildPanel = 'root' | 'terrain' | 'structures'
type BuildTool = 'raise' | 'lower' | 'restore' | 'drainage'

const PLACE_SYMBOLS: Readonly<Record<Place['id'], string>> = Object.freeze({
  A: '⌂',
  B: '≈',
  C: '♧',
  D: '◇',
  E: '↘',
  F: '⌁',
})

const STRUCTURE_LABELS: Readonly<Record<StructureForm, string>> = Object.freeze({
  support: '지지대',
  rack: '시렁',
  fence: '낮은 울타리',
  shade: '그늘막',
})

const HEADWATER_STRUCTURE_LABELS: Readonly<Record<StructureForm, string>> = Object.freeze({
  support: '돌무더기',
  rack: '가지 시렁',
  fence: '가지 둑',
  shade: '낙엽 그늘',
})

const structureLabel = (form: StructureForm, zoneId?: string): string =>
  (zoneId === 'd-headwater-edge' ? HEADWATER_STRUCTURE_LABELS : STRUCTURE_LABELS)[form]

const withObjectParticle = (word: string): string => {
  const code = word.charCodeAt(word.length - 1) - 0xac00
  return word + (code >= 0 && code <= 0x2ba3 && code % 28 !== 0 ? '을' : '를')
}

function movementObstaclesFor(snapshot: EditSnapshot): readonly MovementObstacle[] {
  return Object.values(snapshot)
    .flatMap((overlay) => Object.values(overlay))
    .flatMap((entry): readonly MovementObstacle[] => {
      if (entry.kind !== 'structure') {
        return []
      }
      const footprint = STRUCTURE_FOOTPRINTS[entry.form]
      if (entry.form === 'support') {
        return [{ kind: 'circle', at: entry.at, radius: 0.12 }]
      }
      if (entry.form === 'rack' || entry.form === 'fence') {
        return [{
          kind: 'oriented-box',
          at: entry.at,
          rotation: entry.rotation,
          halfLength: footprint.halfLength,
          halfWidth: entry.form === 'fence' ? 0.12 : footprint.halfWidth,
        }]
      }
      const cosine = Math.cos(entry.rotation)
      const sine = Math.sin(entry.rotation)
      const halfX = footprint.halfLength * 0.86
      const halfZ = footprint.halfWidth * 0.84
      return [-1, 1].flatMap((sideX) =>
        [-1, 1].map((sideZ): MovementObstacle => {
          const localX = sideX * halfX
          const localZ = sideZ * halfZ
          return {
            kind: 'circle',
            at: {
              x: entry.at.x + localX * cosine - localZ * sine,
              z: entry.at.z + localX * sine + localZ * cosine,
            },
            radius: 0.09,
          }
        }),
      )
    })
}

function requireElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector)
  if (!element) {
    throw new Error(selector + ' 화면 요소를 준비하지 못했습니다.')
  }
  return element
}

const app = requireElement<HTMLDivElement>('#app')
app.innerHTML = [
  '<main id="game-shell" data-mode="walk">',
  '  <canvas id="world" tabindex="0" aria-label="산촌의 첫 물길 3D 화면"></canvas>',
  '  <section id="place-card" aria-live="polite">',
  '    <span id="place-code">A</span>',
  '    <div><strong id="place-name">산촌 집·작은 정원</strong><p id="place-cue">붉은 집 지붕이 돌아갈 자리를 알려 줍니다.</p></div>',
  '  </section>',
  '  <aside id="desktop-help" aria-label="컴퓨터 조작">',
  '    <span><kbd>WASD</kbd> 걷기</span><span>↔ 끌어보기</span><span><kbd>Space</kbd> 살펴보기·만들기</span><span><kbd>N</kbd> 관계 수첩</span>',
  '  </aside>',
  '  <section id="touch-controls" aria-label="터치 조작">',
  '    <div id="move-pad" role="group" aria-label="이동 패드">',
  '      <span class="move-ring" aria-hidden="true"></span>',
  '      <span id="move-knob" aria-hidden="true">●</span>',
  '    </div>',
  '    <p id="look-hint" aria-hidden="true"><span>↔</span> 화면을 끌어 둘러보기</p>',
  '  </section>',
  '  <button id="edit-entry-button" type="button" hidden>🌱 정원 가꾸기</button>',
  '  <button id="water-fill-button" type="button" hidden>💧 물 뜨기</button>',
  '  <button id="waterway-clue-button" type="button" hidden>🍃 물길 살펴보기</button>',
  '  <section id="edit-hud" aria-label="정원을 가꾸는 자리" hidden>',
  '    <p id="edit-status" aria-live="polite">아래에서 해 보고 싶은 것을 골라 주세요.</p>',
  '    <nav id="edit-layer-tabs" aria-label="흙자리에서 할 일">',
  '      <button id="care-layer-button" type="button" data-edit-layer="care" aria-pressed="true">🌱 가꾸기</button>',
  '      <button id="build-layer-button" type="button" data-edit-layer="build" aria-pressed="false">🛠 만들기</button>',
  '    </nav>',
  '    <nav id="edit-dock" aria-label="정원 가꾸기"></nav>',
  '  </section>',
  '  <button id="notebook-button" type="button" aria-controls="notebook-panel" aria-expanded="false" hidden>📖 관계 수첩</button>',
  '  <p id="notebook-toast" role="status" aria-live="polite" hidden></p>',
  '  <section id="notebook-panel" role="dialog" aria-modal="true" aria-labelledby="notebook-title" hidden>',
  '    <div class="notebook-sheet">',
  '      <header class="notebook-header"><div><span>ANIMAL ADVENTURE</span><h2 id="notebook-title">관계 수첩</h2></div><button id="notebook-close" type="button" aria-label="수첩 덮기">×</button></header>',
  '      <p class="notebook-intro">이곳에서 직접 본 연결만 그려집니다. 마음 가는 질문을 따라가거나 정원으로 돌아가도 괜찮아요.</p>',
  '      <div id="notebook-entries" class="notebook-entries"></div>',
  '    </div>',
  '  </section>',
  '  <section id="start-screen">',
  '    <div class="start-panel">',
  '      <p class="eyebrow">ANIMAL ADVENTURE</p>',
  '      <h1>산촌의 첫 물길</h1>',
  '      <p>정원을 가꾸거나, 물길에서 떠온 잎을 따라가 볼까요?</p>',
  '      <div class="start-actions">',
  '        <button id="start-button" type="button">걸어 보기</button>',
  '        <button id="new-game-button" type="button" hidden>새로 걷기</button>',
  '      </div>',
  '      <small id="start-note">목표도 시간 제한도 없습니다.</small>',
  '    </div>',
  '  </section>',
  '  <section id="orientation-gate" role="status" aria-live="polite" hidden>',
  '    <div class="orientation-card">',
  '      <span class="rotate-mark" aria-hidden="true">↻</span>',
  '      <strong id="orientation-title">가로 화면으로 돌려 주세요</strong>',
  '      <small>지금 모습은 그대로 기다립니다.</small>',
  '    </div>',
  '  </section>',
  '  <section id="error-panel" hidden>',
  '    <h1>3D 화면을 열 수 없습니다</h1>',
  '    <p>최신 브라우저에서 다시 열어 주세요.</p>',
  '  </section>',
  '</main>',
].join('')

const shell = requireElement<HTMLElement>('#game-shell')
const canvas = requireElement<HTMLCanvasElement>('#world')
const startScreen = requireElement<HTMLElement>('#start-screen')
const startButton = requireElement<HTMLButtonElement>('#start-button')
const newGameButton = requireElement<HTMLButtonElement>('#new-game-button')
const startNote = requireElement<HTMLElement>('#start-note')
const placeCode = requireElement<HTMLElement>('#place-code')
const placeName = requireElement<HTMLElement>('#place-name')
const placeCue = requireElement<HTMLElement>('#place-cue')
const orientationGate = requireElement<HTMLElement>('#orientation-gate')
const orientationTitle = requireElement<HTMLElement>('#orientation-title')
const movePad = requireElement<HTMLElement>('#move-pad')
const moveKnob = requireElement<HTMLElement>('#move-knob')
const editEntryButton = requireElement<HTMLButtonElement>('#edit-entry-button')
const waterFillButton = requireElement<HTMLButtonElement>('#water-fill-button')
const waterwayClueButton = requireElement<HTMLButtonElement>('#waterway-clue-button')
const editHud = requireElement<HTMLElement>('#edit-hud')
const editStatus = requireElement<HTMLElement>('#edit-status')
const editLayerTabs = requireElement<HTMLElement>('#edit-layer-tabs')
const careLayerButton = requireElement<HTMLButtonElement>('#care-layer-button')
const buildLayerButton = requireElement<HTMLButtonElement>('#build-layer-button')
const editDock = requireElement<HTMLElement>('#edit-dock')
const notebookButton = requireElement<HTMLButtonElement>('#notebook-button')
const notebookToast = requireElement<HTMLElement>('#notebook-toast')
const notebookPanel = requireElement<HTMLElement>('#notebook-panel')
const notebookClose = requireElement<HTMLButtonElement>('#notebook-close')
const notebookEntries = requireElement<HTMLElement>('#notebook-entries')
const errorPanel = requireElement<HTMLElement>('#error-panel')

try {
  assertFirstMapContract()
  assertWaterwayClueContract()
  const input = new InputState()
  let saveStore = new LocalSaveStore(window.localStorage)
  let loadResult: LocalSaveLoadResult = saveStore.load()
  const restored = loadResult.status === 'loaded' ? loadResult.save : undefined
  const runtime = new GameRuntime(
    restored
      ? {
          playerAt: restored.player.at,
          playerHeading: restored.player.heading,
          cameraYaw: restored.camera.yaw,
          cameraDistance: restored.camera.distance,
          elapsed: restored.elapsed,
        }
      : undefined,
  )
  const ecology = new EcologyRuntime(
    restored?.edits,
    restored?.plantGrowth,
    restored?.elapsed ?? 0,
  )
  const initialEcology = ecology.snapshot()
  let upstream: PersistentUpstreamWaterwayState = restored?.upstream ??
    createUpstreamWaterwayState(initialEcology.editState, restored?.elapsed ?? 0)
  const residents = new ResidentsRuntime(
    initialEcology.editState,
    initialEcology.environment,
    initialEcology.plantGrowth,
    initialEcology.ecologyRevision,
  )
  const notebook = new ObservationNotebookRuntime(restored?.notebook)
  const initialResidents = residents.snapshot()
  const view = new ThreeScene(
    canvas,
    initialResidents.smallResidents,
    initialResidents.toad,
  )
  view.syncEdits(initialEcology.editState.current)
  view.syncPlantGrowth(initialEcology.plantGrowth, restored?.elapsed ?? 0)
  view.syncSurfaceMoisture(
    initialEcology.surfaceMoisture,
    initialEcology.wetDrainageEntryIds,
  )
  view.syncUpstreamWaterway(upstream, restored?.elapsed ?? 0)
  runtime.setMovementObstacles(movementObstaclesFor(initialEcology.editState.current))

  const coarsePointer = window.matchMedia('(pointer: coarse)')
  let currentPlaceId: string | undefined
  let orientationBlocked = false
  let visibilityBlocked = document.hidden
  let notebookOpen = false
  let notebookToastUntil = 0
  let movePointerId: number | undefined
  let lookPointerId: number | undefined
  let lastLookX = 0
  let nearbyEditZone: EditZone | undefined
  let nearbyWaterwayClue: WaterwayClue | undefined
  let editLayer: EditLayer = 'care'
  let editTool: EditTool | undefined
  let buildPanel: BuildPanel = 'root'
  let buildTool: BuildTool | undefined
  let structureForm: StructureForm | undefined
  let drainageStart: Point2 | undefined
  let buildRotation = 0
  let selectedEntryId: string | undefined
  let movingEntry = false
  let lastSaveFingerprint = restored ? JSON.stringify(restored) : ''
  let lastSaveAttempt = performance.now()
  let lastResidentGuardSignature = ''

  const isEditing = (): boolean => ecology.snapshot().activeZoneId !== undefined
  const residentGuard = (): EditGuard => {
    const base = residents.editGuard()
    const editState = ecology.snapshot().editState
    const occupiedPoints = (base.occupiedEntryIds ?? []).flatMap((id) => {
      for (const overlay of Object.values(editState.current)) {
        const entry = overlay[id]
        if (entry) return [{ at: entry.at, radius: 0.48 }]
      }
      return []
    })
    return {
      ...base,
      protectedGroundPoints: [
        ...occupiedPoints,
        { at: runtime.snapshot().playerAt, radius: 0.36 },
      ],
    }
  }

  const advanceResidents = (deltaSeconds: number) => {
    const game = runtime.snapshot()
    const ecologySnapshot = ecology.snapshot()
    const frame = residents.advance({
      deltaSeconds,
      editState: ecologySnapshot.editState,
      environment: ecologySnapshot.environment,
      plantGrowth: ecologySnapshot.plantGrowth,
      ecologyRevision: ecologySnapshot.ecologyRevision,
      playerAt: game.playerAt,
      ...(ecologySnapshot.activeZoneId
        ? { activeEditZoneId: ecologySnapshot.activeZoneId }
        : {}),
      started: game.started,
      blocked: game.blocked,
    })
    view.syncEcology(
      frame.snapshot.smallResidents,
      frame.snapshot.toad,
      frame.toadCues,
    )
    const observationFrame = notebook.capture({
      elapsed: game.elapsed,
      playerAt: game.playerAt,
      started: game.started,
      blocked: game.blocked,
      smallResidents: frame.snapshot.smallResidents,
      smallEvents: frame.smallEvents,
      toad: frame.snapshot.toad,
      toadCues: frame.toadCues,
    })
    if (observationFrame.added.length > 0) {
      onObservationAdded(observationFrame.added)
    }
    return frame
  }

  const resetMovePad = (): void => {
    movePointerId = undefined
    moveKnob.style.transform = 'translate(0px, 0px)'
    input.setTouchMovement({ forward: 0, right: 0 })
  }

  const buildSave = (): CurrentLocalSave => {
    const game = runtime.persistentState()
    return {
      schemaVersion: LOCAL_SAVE_SCHEMA_VERSION,
      mapId: LOCAL_SAVE_MAP_ID,
      elapsed: game.elapsed,
      player: { at: game.playerAt, heading: game.playerHeading },
      camera: { yaw: game.cameraYaw, distance: game.cameraDistance },
      edits: ecology.persistentState(),
      notebook: notebook.snapshot(),
      plantGrowth: ecology.persistentPlantGrowthState(),
      upstream,
    }
  }

  const flushSave = (): void => {
    if (!runtime.snapshot().started || saveStore.writeLocked) {
      return
    }
    const save = buildSave()
    const fingerprint = JSON.stringify(save)
    if (fingerprint === lastSaveFingerprint) {
      return
    }
    const result = saveStore.write(save)
    document.documentElement.dataset.saveWrite = result.status
    if (result.status === 'saved') {
      lastSaveFingerprint = fingerprint
    }
  }

  const syncBlockedState = (): void => {
    const blocked = orientationBlocked || visibilityBlocked || notebookOpen
    runtime.setBlocked(blocked)
    ecology.setBlocked(blocked)
    if (blocked) {
      input.reset()
      resetMovePad()
      lookPointerId = undefined
    }
  }

  const syncViewport = (): void => {
    const bounds = shell.getBoundingClientRect()
    const wasOrientationBlocked = orientationBlocked
    orientationBlocked = !isLandscapeViewport(bounds.width, bounds.height)
    if (!wasOrientationBlocked && orientationBlocked) {
      flushSave()
    }
    orientationGate.hidden = !orientationBlocked
    orientationTitle.textContent = coarsePointer.matches
      ? '기기를 가로로 돌려 주세요'
      : '창을 가로로 넓혀 주세요'
    shell.dataset.viewport = orientationBlocked ? 'blocked' : 'landscape'
    view.resize(bounds.width, bounds.height)
    syncBlockedState()
  }

  const updatePlaceCard = (place: Place | undefined): void => {
    if (place?.id === currentPlaceId) {
      return
    }
    currentPlaceId = place?.id
    placeCode.textContent = place ? PLACE_SYMBOLS[place.id] : '·'
    placeName.textContent = place?.name ?? '장소와 장소 사이'
    placeCue.textContent = place?.cue ?? '물길·빛·바닥과 소리가 다음 자리를 이어 줍니다.'
    placeCode.style.setProperty(
      '--place-color',
      place ? '#' + place.color.toString(16).padStart(6, '0') : '#8e9b83',
    )
  }

  const selectedEntry = (): EditEntry | undefined => {
    const snapshot = ecology.snapshot()
    return snapshot.activeZoneId && selectedEntryId
      ? snapshot.editState.current[snapshot.activeZoneId][selectedEntryId]
      : undefined
  }

  const environmentWords = (reading: ZoneEnvironmentReading): string => {
    const light = { bright: '환한 빛', dappled: '얼룩빛', shaded: '그늘' }[reading.light]
    const opening = { open: '열린 틈', pockets: '작은 틈', sheltered: '감싸인 틈' }[
      reading.opening
    ]
    const moisture = reading.surfaceMoisture === 'moist' ? '촉촉한 표면' : '마른 표면'
    const cover = {
      'open-ground': '드러난 흙',
      patches: '듬성한 덮임',
      linked: '이어진 덮임',
      dense: '촘촘한 덮임',
    }[reading.lowCover]
    const drainage = {
      none: '물길 없음',
      holding: '물이 머무는 홈',
      outflow: '물이 빠지는 길',
    }[reading.drainage]
    return [light, moisture, opening, cover, drainage].join(' · ')
  }

  const headwaterProfileWords = (profile: HeadwaterProfile): string => {
    const shade = profile.shade >= 0.66
      ? '깊은 그늘'
      : profile.shade >= 0.43
        ? '얼룩진 그늘'
        : '열린 숲빛'
    const retention = profile.retention >= 0.7
      ? '오래 머무는 물'
      : profile.retention >= 0.48
        ? '잠시 머무는 물'
        : '빠르게 지나는 물'
    const continuity = profile.continuity >= 0.7
      ? '이어진 흐름'
      : profile.continuity >= 0.42
        ? '나뉘는 흐름'
        : '스미는 가장자리'
    return [shade, retention, continuity].join(' · ')
  }

  const setEditStatus = (message?: string): void => {
    const snapshot = ecology.snapshot()
    const zoneId = snapshot.activeZoneId
    if (!zoneId) {
      return
    }
    const zone = EDIT_ZONES.find(({ id }) => id === zoneId)
    editStatus.textContent = message ?? (zone
      ? zoneId === 'd-headwater-edge'
        ? zone.shortName + ' · ' + headwaterProfileWords(
            deriveHeadwaterProfile(snapshot.editState),
          )
        : editLayer === 'build'
        ? zone.shortName + ' · 본래 길과 개울은 두고 땅·물길·구조물을 만듭니다.'
        : zone.shortName + ' · ' + environmentWords(
            snapshot.environment.zones[isCareZoneId(zoneId) ? zoneId : 'a-garden'],
          )
      : '')
  }

  const dockButton = (
    action: string,
    label: string,
    pressed = false,
    disabled = false,
    className = '',
  ): string =>
    '<button type="button" data-edit-action="' + action + '" aria-pressed="' +
    String(pressed) + '"' + (disabled ? ' disabled' : '') +
    (className ? ' class="' + className + '"' : '') + '>' + label + '</button>'

  // 남은 양은 숫자가 아니라 물뿌리개 안의 물높이로만 보인다.
  const waterLabel = (level: number): string => {
    const glyph = level <= 0 ? '◌' : level <= 0.5 ? '◔' : '💧'
    return glyph + ' 물주기'
  }

  const renderEditDock = (): void => {
    const guard = residentGuard()
    const snapshot = ecology.snapshot(guard)
    const entry = selectedEntry()
    if (!snapshot.activeZoneId) {
      editHud.hidden = true
      return
    }
    const headwater = snapshot.activeZoneId === 'd-headwater-edge'
    editHud.hidden = false
    editLayerTabs.hidden = headwater
    careLayerButton.setAttribute('aria-pressed', String(editLayer === 'care'))
    buildLayerButton.setAttribute('aria-pressed', String(editLayer === 'build'))
    editDock.setAttribute(
      'aria-label',
      headwater ? '발원지 흐름 다듬기' : editLayer === 'care' ? '정원 가꾸기' : '정원 만들기',
    )
    shell.dataset.editLayer = editLayer
    document.documentElement.dataset.editLayer = editLayer
    if (movingEntry && entry) {
      editDock.innerHTML = dockButton('cancel', '↩ 그만두기')
      setEditStatus(
        entry.kind === 'structure'
          ? '옮겨 세울 자리를 눌러 주세요.'
          : entry.kind === 'drainage-segment'
            ? '물길의 새 중심을 눌러 주세요.'
            : '옮겨 심을 자리를 눌러 주세요.',
      )
      return
    }
    if (editLayer === 'build') {
      if (headwater && entry?.kind === 'low-cover') {
        const occupied = guard.occupiedEntryIds?.includes(entry.id) ?? false
        editDock.innerHTML = [
          dockButton('cancel', '↩ 그만두기'),
          dockButton('move', '↔ 옮기기', false, occupied),
          dockButton('retrieve', '🧺 걷어두기', false, occupied, 'danger-soft'),
          dockButton('undo', '↶ 되돌리기', false, !snapshot.canUndoActiveZone),
        ].join('')
        setEditStatus('물이 천천히 스며들 낙엽 덮임을 잡았습니다.')
        return
      }
      if (entry?.kind === 'terrain-patch') {
        editDock.innerHTML = [
          dockButton('cancel', '↩ 그만두기'),
          dockButton('restore-terrain', '◌ 원래대로', false, false, 'danger-soft'),
          dockButton('undo', '↶ 되돌리기', false, !snapshot.canUndoActiveZone),
        ].join('')
        setEditStatus(entry.direction === 'raise'
          ? '높인 땅을 잡았습니다.'
          : '낮춘 땅을 잡았습니다.')
        return
      }
      if (entry?.kind === 'structure' || entry?.kind === 'drainage-segment') {
        const occupied = guard.occupiedEntryIds?.includes(entry.id) ?? false
        editDock.innerHTML = [
          dockButton('cancel', '↩ 그만두기'),
          dockButton('move', '↔ 옮기기', false, occupied),
          dockButton('rotate', '↻ 방향', false, occupied),
          dockButton(
            entry.kind === 'structure' ? 'retrieve' : 'restore-drainage',
            entry.kind === 'structure' ? '🧺 걷어두기' : '◌ 메우기',
            false,
            occupied,
            'danger-soft',
          ),
          dockButton('undo', '↶ 되돌리기', false, !snapshot.canUndoActiveZone),
        ].join('')
        setEditStatus(entry.kind === 'structure'
          ? withObjectParticle(structureLabel(entry.form, snapshot.activeZoneId)) + ' 잡았습니다.'
          : headwater
            ? '물이 지나갈 얕은 홈을 잡았습니다.'
            : '얕은 물길을 잡았습니다.')
        return
      }
      if (buildPanel === 'terrain') {
        const terrainPatches = Object.values(
          snapshot.editState.current[snapshot.activeZoneId],
        ).filter((candidate) => candidate.kind === 'terrain-patch')
        editDock.innerHTML = [
          dockButton('build-back', '↩ 만들기'),
          dockButton('raise', headwater ? '⬆ 돌턱' : '⬆ 높이기', buildTool === 'raise', false, 'terrain-raise'),
          dockButton('lower', headwater ? '⬇ 웅덩이' : '⬇ 낮추기', buildTool === 'lower', false, 'terrain-lower'),
          dockButton(
            'restore-tool',
            '◌ 원래대로',
            buildTool === 'restore',
            terrainPatches.length === 0,
            'danger-soft',
          ),
          dockButton('undo', '↶ 되돌리기', false, !snapshot.canUndoActiveZone),
        ].join('')
        setEditStatus()
        return
      }
      if (buildPanel === 'structures') {
        editDock.innerHTML = [
          dockButton('build-back', '↩ 만들기'),
          dockButton('support', headwater ? '● 돌무더기' : '│ 지지대', structureForm === 'support', false, 'build-choice'),
          dockButton('rack', headwater ? '⌗ 가지 시렁' : '⌗ 시렁', structureForm === 'rack', false, 'build-choice'),
          dockButton('fence', headwater ? '≋ 가지 둑' : '╫ 낮은 울타리', structureForm === 'fence', false, 'build-choice'),
          dockButton('shade', headwater ? '▰ 낙엽 그늘' : '▰ 그늘막', structureForm === 'shade', false, 'build-choice'),
        ].join('')
        setEditStatus(structureForm
          ? withObjectParticle(structureLabel(structureForm, snapshot.activeZoneId)) +
            (headwater ? ' 놓을 자리를 눌러 주세요.' : ' 세울 자리를 눌러 주세요.')
          : headwater ? '흐름에 보탤 돌이나 가지 모양을 골라 주세요.' : '세울 모양을 골라 주세요.')
        return
      }
      if (headwater) {
        editDock.innerHTML = [
          dockButton('walk', '↩ 걷기로'),
          dockButton('low-cover', '🍂 낙엽 덮기', editTool === 'low-cover'),
          dockButton('terrain-menu', '↕ 물머리'),
          dockButton(
            'drainage',
            drainageStart ? '〰 끝 고르기' : '〰 얕은 홈',
            buildTool === 'drainage',
            false,
            'drainage-tool',
          ),
          dockButton('structures-menu', '🪨 돌·가지'),
          dockButton('undo', '↶ 되돌리기', false, !snapshot.canUndoActiveZone),
        ].join('')
        setEditStatus(
          drainageStart
            ? '홈이 끝날 자리를 눌러 주세요.'
            : buildTool === 'drainage'
              ? '물이 지나갈 홈의 시작을 눌러 주세요.'
              : editTool === 'low-cover'
                ? '물이 머물고 스며들 낙엽 자리를 눌러 주세요.'
                : undefined,
        )
        return
      }
      editDock.innerHTML = [
        dockButton('walk', '↩ 걷기로'),
        dockButton('terrain-menu', '⛰ 땅'),
        dockButton(
          'drainage',
          drainageStart ? '〰 끝 고르기' : '〰 물길',
          buildTool === 'drainage',
          snapshot.activeZoneId !== 'a-garden',
          'drainage-tool',
        ),
        dockButton('structures-menu', '🪵 세우기'),
        dockButton('undo', '↶ 되돌리기', false, !snapshot.canUndoActiveZone),
      ].join('')
      setEditStatus(
        drainageStart
          ? '물길이 끝날 자리를 눌러 주세요.'
          : buildTool === 'drainage'
            ? '물길이 시작할 자리를 눌러 주세요.'
            : undefined,
      )
      return
    }
    if (entry) {
      const occupied = guard.occupiedEntryIds?.includes(entry.id) ?? false
      const growthRecord = entry.kind === 'low-flower'
        ? snapshot.plantGrowth.byEntryId[entry.id]
        : undefined
      const growthStage = growthRecord
        ? derivePlantGrowth(growthRecord, runtime.snapshot().elapsed).stage
        : undefined
      const canThin = entry.kind === 'low-flower' &&
        !entry.thinned && growthStage !== undefined && growthStage !== 'seed'
      editDock.innerHTML = entry.kind === 'surface-adjustment'
        ? [
            dockButton('cancel', '↩ 그만두기'),
            dockButton('restore', '◌ 원래 흙으로', false, occupied, 'danger-soft'),
            dockButton('undo', '↶ 되돌리기', false, !snapshot.canUndoActiveZone),
          ].join('')
        : [
            dockButton('cancel', '↩ 그만두기'),
            dockButton('move', '↔ 옮겨심기', false, occupied),
            ...(canThin
              ? [dockButton('thin', '✂ 솎아 주기', false, occupied)]
              : []),
            dockButton('retrieve', '🧺 캐서 담기', false, occupied, 'danger-soft'),
            dockButton('undo', '↶ 되돌리기', false, !snapshot.canUndoActiveZone),
          ].join('')
      const growthWords: Readonly<Record<PlantGrowthStage, string>> = {
        seed: '아직 흙 속에서 기다리는 씨앗입니다.',
        sprout: '작은 싹이 올라왔습니다.',
        young: '잎이 무성해지는 어린 식물입니다.',
        adult: entry.kind === 'low-flower' && entry.thinned
          ? '사이가 보이는 꽃 포기입니다.'
          : '꽃이 핀 포기입니다.',
      }
      setEditStatus(entry.kind === 'surface-adjustment'
        ? '북돋운 흙을 잡았습니다.'
        : growthStage
          ? growthWords[growthStage]
          : '심어 둔 것을 잡았습니다.')
      return
    }
    const canEmpty = snapshot.wateringCanLevel <= 0
    editDock.innerHTML = [
      dockButton('walk', '↩ 걷기로'),
      dockButton('low-flower', '🌱 심기', editTool === 'low-flower'),
      dockButton('water', waterLabel(snapshot.wateringCanLevel), editTool === 'water', canEmpty),
      dockButton('low-cover', '🍂 덮어 주기', editTool === 'low-cover'),
      dockButton('surface-adjustment', '⌇ 흙 북돋우기', editTool === 'surface-adjustment'),
      dockButton('undo', '↶ 되돌리기', false, !snapshot.canUndoActiveZone),
    ].join('')
    setEditStatus()
  }

  const advanceUpstreamState = (): Readonly<{ changed: boolean; arrived: boolean }> => {
    const before = upstream
    const pendingBefore = pendingUpstreamDelivery(before)
    const elapsed = runtime.snapshot().elapsed
    const next = advanceUpstreamWaterway(before, {
      editState: ecology.snapshot().editState,
      worldElapsed: elapsed,
    })
    if (next === before) {
      return { changed: false, arrived: false }
    }
    upstream = next
    view.syncUpstreamWaterway(upstream, elapsed)
    const arrived = pendingBefore !== undefined &&
      pendingUpstreamDelivery(next) === undefined &&
      next.delivered?.sourceChangedAt === pendingBefore.sourceChangedAt
    return { changed: true, arrived }
  }

  const syncEditVisuals = (): void => {
    const snapshot = ecology.snapshot()
    view.syncEdits(snapshot.editState.current)
    view.syncPlantGrowth(snapshot.plantGrowth, runtime.snapshot().elapsed)
    view.syncSurfaceMoisture(
      snapshot.surfaceMoisture,
      snapshot.wetDrainageEntryIds,
    )
    view.syncUpstreamWaterway(upstream, runtime.snapshot().elapsed)
    runtime.setMovementObstacles(movementObstaclesFor(snapshot.editState.current))
    document.documentElement.dataset.editRevision = String(snapshot.editState.revision)
    document.documentElement.dataset.editEntries = String(
      Object.values(snapshot.editState.current)
        .flatMap((overlay) => Object.keys(overlay)).length,
    )
    document.documentElement.dataset.terrainPatches = String(
      Object.values(snapshot.editState.current)
        .flatMap((overlay) => Object.values(overlay))
        .filter((entry) => entry.kind === 'terrain-patch').length,
    )
    document.documentElement.dataset.drainageSegments = String(
      Object.values(snapshot.editState.current)
        .flatMap((overlay) => Object.values(overlay))
        .filter((entry) => entry.kind === 'drainage-segment').length,
    )
    document.documentElement.dataset.structures = String(
      Object.values(snapshot.editState.current)
        .flatMap((overlay) => Object.values(overlay))
        .filter((entry) => entry.kind === 'structure').length,
    )
    document.documentElement.dataset.surfaceMoisture = Object.entries(
      snapshot.surfaceMoisture,
    )
      .map(([zoneId, state]) => zoneId + ':' + state)
      .join(',')
    document.documentElement.dataset.wetDrainage = snapshot.wetDrainageEntryIds.join(',')
    document.documentElement.dataset.wateringCan = snapshot.wateringCanLevel.toFixed(2)
    document.documentElement.dataset.plantGrowth = Object.entries(
      snapshot.plantGrowth.byEntryId,
    )
      .map(([id, record]) => id + ':' + derivePlantGrowth(
        record,
        runtime.snapshot().elapsed,
      ).stage)
      .join(',')
    const sourceProfile = deriveHeadwaterProfile(snapshot.editState)
    const bProfile = headwaterProfileAtB(upstream)
    document.documentElement.dataset.headwaterSourceProfile = [
      sourceProfile.shade,
      sourceProfile.retention,
      sourceProfile.continuity,
    ].map((value) => value.toFixed(3)).join(',')
    document.documentElement.dataset.headwaterBProfile = [
      bProfile.shade,
      bProfile.retention,
      bProfile.continuity,
    ].map((value) => value.toFixed(3)).join(',')
    document.documentElement.dataset.upstreamDeliveryProgress =
      upstreamDeliveryProgress(upstream, runtime.snapshot().elapsed).toFixed(3)
    document.documentElement.dataset.upstreamPending = String(
      pendingUpstreamDelivery(upstream) !== undefined,
    )
  }

  const observationMarkup = (entry: ObservationEntry): string => {
    const card = OBSERVATION_CARDS[entry.id]
    return [
      '<article class="notebook-entry">',
      '  <div class="notebook-relation">',
      '    <span class="notebook-condition">' + card.condition + '</span>',
      '    <span class="notebook-arrow" aria-hidden="true">→</span>',
      '    <strong>' + card.resident + '</strong>',
      '    <span class="notebook-arrow" aria-hidden="true">→</span>',
      '    <span class="notebook-behavior">' + card.behavior + '</span>',
      '  </div>',
      '  <p>' + card.question + '</p>',
      '</article>',
    ].join('')
  }

  const renderNotebook = (): void => {
    const entries = notebook.snapshot().entries
    notebookEntries.innerHTML = entries.length > 0
      ? [...entries].reverse().map(observationMarkup).join('')
      : [
          '<div class="notebook-empty">',
          '  <span aria-hidden="true">〰</span>',
          '  <strong>아직 그려진 관계가 없어요.</strong>',
          '  <p>낮은 꽃 가까이, 촉촉한 덮임, 물가의 작은 흔적을 살펴보세요.</p>',
          '</div>',
        ].join('')
  }

  const onObservationAdded = (added: readonly ObservationEntry[]): void => {
    const latest = added.at(-1)
    if (!latest) {
      return
    }
    const card = OBSERVATION_CARDS[latest.id]
    notebookButton.dataset.new = 'true'
    notebookButton.setAttribute('aria-label', '새 관계가 있는 관계 수첩')
    notebookToast.textContent = '수첩에 새 관계 · ' + card.resident + ' — ' + card.behavior
    notebookToast.hidden = false
    notebookToastUntil = performance.now() + 4200
    renderNotebook()
  }

  const openNotebook = (): void => {
    if (
      notebookOpen ||
      isEditing() ||
      !runtime.snapshot().started ||
      orientationBlocked ||
      visibilityBlocked
    ) {
      return
    }
    notebookOpen = true
    notebookPanel.hidden = false
    notebookButton.setAttribute('aria-expanded', 'true')
    delete notebookButton.dataset.new
    notebookButton.setAttribute('aria-label', '관계 수첩')
    notebookToast.hidden = true
    notebookToastUntil = 0
    renderNotebook()
    syncBlockedState()
    notebookClose.focus()
  }

  const closeNotebook = (): void => {
    if (!notebookOpen) {
      return
    }
    notebookOpen = false
    notebookPanel.hidden = true
    notebookButton.setAttribute('aria-expanded', 'false')
    syncBlockedState()
    canvas.focus()
  }

  const toggleNotebook = (): void => {
    if (notebookOpen) {
      closeNotebook()
    } else {
      openNotebook()
    }
  }

  const inspectWaterwayClue = (clue: WaterwayClue | undefined): void => {
    if (
      !clue ||
      isEditing() ||
      !runtime.snapshot().started ||
      runtime.snapshot().blocked
    ) {
      return
    }
    const elapsed = runtime.snapshot().elapsed
    const added = [...notebook.record(clue.observationId, elapsed)]
    if (
      clue.id === 'b-drifting-leaf' &&
      upstream.delivered &&
      notebook.has('headwater-source')
    ) {
      added.push(...notebook.record('headwater-arrival', elapsed))
    }
    if (added.length > 0) {
      onObservationAdded(added)
    }
    const pending = pendingUpstreamDelivery(upstream)
    const bResult = clue.id === 'b-drifting-leaf'
      ? pending
        ? '지금 물가에는 ' + headwaterProfileWords(headwaterProfileAtB(upstream)) +
          '이 보입니다. 위쪽에서 달라진 잎은 물길을 따라 오는 중입니다.'
        : upstream.delivered
          ? '위쪽에서 보낸 잎이 이곳에 닿았습니다. ' +
            headwaterProfileWords(headwaterProfileAtB(upstream)) +
            '이 물빛과 잎의 머무는 모습으로 이어집니다.'
          : clue.result
      : clue.result
    notebookToast.textContent = bResult
    notebookToast.hidden = false
    notebookToastUntil = performance.now() + 6200
    document.documentElement.dataset.lastWaterwayClue = clue.id
    renderNotebook()
    flushSave()
    canvas.focus()
  }

  const describeRejection = (rejection: string | undefined): string => {
    if (rejection === 'outside-edit-zone') return '관리된 흙 안쪽을 눌러 주세요.'
    if (rejection === 'overlap') return '조금 떨어진 자리를 눌러 주세요.'
    if (rejection === 'nothing-to-undo') return '되돌릴 것이 없습니다.'
    if (rejection === 'occupied') return '지금 누군가 쓰는 자리는 그대로 둡니다.'
    if (rejection === 'plant-too-young') return '싹이 올라온 뒤 사이를 벌려 주세요.'
    if (rejection === 'already-thinned') return '이미 사이가 보입니다.'
    if (rejection === 'protected-ground') return '길과 개울 가까이는 원래 모습으로 둡니다.'
    if (rejection === 'terrain-patch-limit') return '이 흙자리는 충분히 다듬었습니다.'
    if (rejection === 'drainage-zone-only') return '작은 물길은 정원 흙에서 낼 수 있습니다.'
    if (rejection === 'drainage-length') return '조금 더 가깝거나 먼 끝 자리를 골라 주세요.'
    if (rejection === 'drainage-limit') return '이 정원에는 물길을 충분히 냈습니다.'
    if (rejection === 'structure-limit') return '이 흙자리에는 구조물을 충분히 세웠습니다.'
    if (rejection === 'ground-too-steep') return '다리가 모두 닿도록 조금 더 고른 자리를 골라 주세요.'
    return '지금은 그 자리를 바꾸지 않습니다.'
  }

  const commitEdit = (result: ReturnType<EcologyRuntime['apply']>, success: string): void => {
    if (result.changed) {
      advanceUpstreamState()
      syncEditVisuals()
      advanceResidents(0)
      flushSave()
    }
    renderEditDock()
    setEditStatus(result.changed ? success : describeRejection(result.rejection))
  }

  const setEditLayer = (layer: EditLayer): void => {
    const headwater = ecology.snapshot().activeZoneId === 'd-headwater-edge'
    editLayer = headwater ? 'build' : layer
    editTool = undefined
    buildPanel = 'root'
    buildTool = undefined
    structureForm = undefined
    drainageStart = undefined
    selectedEntryId = undefined
    movingEntry = false
    view.setDrainageStart(undefined)
    view.setBuildMode(headwater || layer === 'build')
    renderEditDock()
  }

  const enterEdit = (zone: EditZone): void => {
    if (orientationBlocked || visibilityBlocked || !runtime.snapshot().started) {
      return
    }
    input.reset()
    resetMovePad()
    ecology.enter(zone.id)
    const headwater = zone.id === 'd-headwater-edge'
    editHud.setAttribute(
      'aria-label',
      headwater ? '발원지 흐름을 다듬는 자리' : '정원을 가꾸는 자리',
    )
    editLayer = headwater ? 'build' : 'care'
    editTool = undefined
    buildPanel = 'root'
    buildTool = undefined
    structureForm = undefined
    drainageStart = undefined
    selectedEntryId = undefined
    movingEntry = false
    shell.dataset.mode = 'edit'
    view.setEditZone(zone.id)
    view.setBuildMode(headwater)
    view.setDrainageStart(undefined)
    document.documentElement.dataset.editZone = zone.id
    renderEditDock()
  }

  const exitEdit = (): void => {
    ecology.exit()
    editTool = undefined
    buildPanel = 'root'
    buildTool = undefined
    structureForm = undefined
    drainageStart = undefined
    selectedEntryId = undefined
    movingEntry = false
    editHud.hidden = true
    editLayerTabs.hidden = false
    shell.dataset.mode = 'walk'
    view.setEditZone(undefined)
    view.setBuildMode(false)
    view.setDrainageStart(undefined)
    delete shell.dataset.editLayer
    delete document.documentElement.dataset.editZone
    delete document.documentElement.dataset.editLayer
    canvas.focus()
  }

  const cancelEditLayer = (): void => {
    if (!isEditing()) {
      return
    }
    if (movingEntry) {
      movingEntry = false
      renderEditDock()
      return
    }
    if (selectedEntryId) {
      selectedEntryId = undefined
      renderEditDock()
      return
    }
    if (drainageStart) {
      drainageStart = undefined
      view.setDrainageStart(undefined)
      renderEditDock()
      return
    }
    if (editLayer === 'build' && (buildPanel !== 'root' || buildTool || structureForm)) {
      buildPanel = 'root'
      buildTool = undefined
      structureForm = undefined
      renderEditDock()
      return
    }
    exitEdit()
  }

  const undoEdit = (): void => {
    const zoneId = ecology.snapshot().activeZoneId
    if (!zoneId) return
    const result = ecology.apply({ type: 'undo', zoneId }, residentGuard())
    if (result.changed && selectedEntryId && !selectedEntry()) {
      selectedEntryId = undefined
      movingEntry = false
    }
    commitEdit(result, '방금 한 것을 되돌렸습니다.')
  }

  const handleCanvasEdit = (clientX: number, clientY: number): void => {
    const zoneId = ecology.snapshot().activeZoneId
    if (!zoneId || orientationBlocked || visibilityBlocked) {
      return
    }
    if (movingEntry && selectedEntryId) {
      const to = view.pickGround(clientX, clientY)
      if (!to) {
        setEditStatus('관리된 흙 안쪽을 골라 주세요.')
        return
      }
      const result = ecology.apply(
        { type: 'move', zoneId, id: selectedEntryId, to },
        residentGuard(),
      )
      if (result.changed) movingEntry = false
      const moved = selectedEntry()
      commitEdit(
        result,
        moved?.kind === 'structure'
          ? zoneId === 'd-headwater-edge' ? '새 자리에 놓았습니다.' : '새 자리에 세웠습니다.'
          : moved?.kind === 'drainage-segment'
            ? '물길을 새 자리로 옮겼습니다.'
            : '새 자리로 옮겼습니다.',
      )
      return
    }
    if (editLayer === 'build') {
      const snapshot = ecology.snapshot()
      const pickedId = view.pickEditEntry(clientX, clientY)
      const picked = pickedId
        ? snapshot.editState.current[zoneId][pickedId]
        : undefined
      if (picked?.kind === 'terrain-patch') {
        if (buildTool === 'restore') {
          selectedEntryId = undefined
          commitEdit(
            ecology.apply(
              { type: 'restore-terrain', zoneId, id: picked.id },
              residentGuard(),
            ),
            '이 자리의 원래 높이로 돌아왔습니다.',
          )
        } else {
          selectedEntryId = picked.id
          renderEditDock()
        }
        return
      }
      if (
        picked?.kind === 'structure' ||
        picked?.kind === 'drainage-segment' ||
        (zoneId === 'd-headwater-edge' && picked?.kind === 'low-cover')
      ) {
        selectedEntryId = picked.id
        drainageStart = undefined
        view.setDrainageStart(undefined)
        renderEditDock()
        return
      }
      const at = view.pickGround(clientX, clientY)
      if (!at) {
        setEditStatus('관리된 흙 안쪽을 눌러 주세요.')
        return
      }
      if (zoneId === 'd-headwater-edge' && editTool === 'low-cover') {
        commitEdit(
          ecology.apply(
            { type: 'place', zoneId, kind: 'low-cover', at, rotation: buildRotation },
            residentGuard(),
          ),
          '낙엽을 덮어 물이 머물고 스미는 자리를 만들었습니다.',
        )
        return
      }
      if (buildPanel === 'structures') {
        if (!structureForm) {
          setEditStatus('세울 모양을 먼저 골라 주세요.')
          return
        }
        const result = ecology.apply(
          {
            type: 'place-structure',
            zoneId,
            form: structureForm,
            at,
            rotation: buildRotation,
          },
          residentGuard(),
        )
        if (result.changed) selectedEntryId = result.entryId
        commitEdit(
          result,
          withObjectParticle(structureLabel(structureForm, zoneId)) +
            (zoneId === 'd-headwater-edge' ? ' 놓았습니다.' : ' 세웠습니다.'),
        )
        return
      }
      if (buildTool === 'drainage') {
        if (!drainageStart) {
          drainageStart = at
          view.setDrainageStart(at)
          renderEditDock()
          return
        }
        const result = ecology.apply(
          { type: 'place-drainage', zoneId, from: drainageStart, to: at },
          residentGuard(),
        )
        if (result.changed) {
          drainageStart = undefined
          view.setDrainageStart(undefined)
          selectedEntryId = result.entryId
        }
        commitEdit(
          result,
          zoneId === 'd-headwater-edge'
            ? '물이 지나갈 얕은 홈을 이었습니다.'
            : '얕은 물길을 냈습니다. 물을 주면 흐르는 자리가 보입니다.',
        )
        return
      }
      if (buildPanel === 'terrain') {
        if (!buildTool) {
          setEditStatus('높이기나 낮추기를 먼저 골라 주세요.')
          return
        }
        if (buildTool === 'restore') {
          const terrainPatch = findTerrainPatchAt(snapshot.editState.current, zoneId, at)
          if (!terrainPatch) {
            setEditStatus('높이거나 낮춘 자리를 눌러 주세요.')
            return
          }
          commitEdit(
            ecology.apply(
              { type: 'restore-terrain', zoneId, id: terrainPatch.id },
              residentGuard(),
            ),
            '이 자리의 원래 높이로 돌아왔습니다.',
          )
          return
        }
        commitEdit(
          ecology.apply(
            {
              type: 'shape-ground',
              zoneId,
              direction: buildTool,
              at,
              rotation: 0,
            },
            residentGuard(),
          ),
          buildTool === 'raise'
            ? zoneId === 'd-headwater-edge'
              ? '낮은 돌턱처럼 땅을 완만하게 높였습니다.'
              : '땅을 완만하게 높였습니다.'
            : zoneId === 'd-headwater-edge'
              ? '물이 잠시 머물 웅덩이를 완만하게 낮췄습니다.'
              : '땅을 완만하게 낮췄습니다.',
        )
        return
      }
      setEditStatus('땅, 물길, 세우기 가운데 하나를 골라 주세요.')
      return
    }
    // 이미 심어 둔 것을 누르면 도구와 상관없이 그것을 잡는다.
    // 겹쳐 놓기는 어차피 막혀 있으므로 잃는 조작이 없다.
    const pickedEntry = view.pickEditEntry(clientX, clientY)
    if (pickedEntry) {
      selectedEntryId = pickedEntry
      renderEditDock()
      return
    }
    const at = view.pickGround(clientX, clientY)
    if (!at) {
      setEditStatus('관리된 흙 안쪽을 눌러 주세요.')
      return
    }
    if (!editTool) {
      setEditStatus('아래에서 해 보고 싶은 것을 골라 주세요.')
      return
    }
    if (editTool === 'water') {
      const watered = ecology.water(at)
      let waterMessage: string | undefined
      if (watered.changed) {
        syncEditVisuals()
        waterMessage = '물을 주었습니다. 볕에 그대로 두면 곧 마릅니다.'
      } else if (watered.rejection === 'empty-can') {
        waterMessage = '물뿌리개가 비었습니다. 우물이나 개울에서 다시 떠 오세요.'
      }
      renderEditDock()
      if (waterMessage) {
        setEditStatus(waterMessage)
      }
      return
    }
    const rotation = Math.atan2(at.z - 1.7, at.x + 8.1)
    const result = editTool === 'surface-adjustment'
      ? ecology.apply({ type: 'adjust-ground', zoneId, at, rotation }, residentGuard())
      : ecology.apply(
          { type: 'place', zoneId, kind: editTool, at, rotation },
          residentGuard(),
        )
    commitEdit(
      result,
      editTool === 'low-flower'
        ? '씨앗을 심었습니다. 촉촉한 흙에서 천천히 자랍니다.'
        : editTool === 'low-cover'
          ? '풀잎으로 덮어 주었습니다.'
          : '흙을 북돋웠습니다. 물을 더 오래 머금습니다.',
    )
  }

  const handleDockAction = (action: string): void => {
    const zoneId = ecology.snapshot().activeZoneId
    if (!zoneId) return
    if (action === 'walk') {
      exitEdit()
      return
    }
    if (action === 'cancel') {
      cancelEditLayer()
      return
    }
    if (action === 'undo') {
      undoEdit()
      return
    }
    if (action === 'terrain-menu') {
      buildPanel = 'terrain'
      buildTool = undefined
      editTool = undefined
      structureForm = undefined
      drainageStart = undefined
      view.setDrainageStart(undefined)
      renderEditDock()
      return
    }
    if (action === 'structures-menu') {
      buildPanel = 'structures'
      buildTool = undefined
      editTool = undefined
      structureForm = undefined
      drainageStart = undefined
      view.setDrainageStart(undefined)
      renderEditDock()
      return
    }
    if (action === 'build-back') {
      buildPanel = 'root'
      buildTool = undefined
      editTool = undefined
      structureForm = undefined
      drainageStart = undefined
      view.setDrainageStart(undefined)
      renderEditDock()
      return
    }
    if (action === 'drainage') {
      buildPanel = 'root'
      buildTool = buildTool === 'drainage' ? undefined : 'drainage'
      editTool = undefined
      structureForm = undefined
      drainageStart = undefined
      selectedEntryId = undefined
      movingEntry = false
      view.setDrainageStart(undefined)
      renderEditDock()
      return
    }
    if (
      action === 'support' ||
      action === 'rack' ||
      action === 'fence' ||
      action === 'shade'
    ) {
      structureForm = structureForm === action ? undefined : action
      buildTool = undefined
      editTool = undefined
      selectedEntryId = undefined
      movingEntry = false
      renderEditDock()
      return
    }
    if (action === 'raise' || action === 'lower' || action === 'restore-tool') {
      const nextTool: BuildTool = action === 'restore-tool' ? 'restore' : action
      buildTool = buildTool === nextTool ? undefined : nextTool
      editTool = undefined
      structureForm = undefined
      drainageStart = undefined
      view.setDrainageStart(undefined)
      selectedEntryId = undefined
      movingEntry = false
      renderEditDock()
      if (buildTool) {
        setEditStatus(buildTool === 'raise'
          ? zoneId === 'd-headwater-edge'
            ? '물살을 나눌 낮은 돌턱 자리를 눌러 주세요.'
            : '완만하게 높일 자리를 눌러 주세요.'
          : buildTool === 'lower'
            ? zoneId === 'd-headwater-edge'
              ? '물이 잠시 머물 웅덩이 자리를 눌러 주세요.'
              : '완만하게 낮출 자리를 눌러 주세요.'
            : '원래 높이로 돌릴 자리를 눌러 주세요.')
      }
      return
    }
    if (
      action === 'low-flower' ||
      action === 'low-cover' ||
      action === 'surface-adjustment' ||
      action === 'water'
    ) {
      // 같은 도구를 다시 누르면 내려놓는다.
      editTool = editTool === action ? undefined : action
      if (editLayer === 'build') {
        buildPanel = 'root'
        buildTool = undefined
        structureForm = undefined
        drainageStart = undefined
        view.setDrainageStart(undefined)
      }
      selectedEntryId = undefined
      movingEntry = false
      renderEditDock()
      const hint = {
        'low-flower': '심을 자리를 눌러 주세요.',
        'low-cover': '덮어 줄 자리를 눌러 주세요.',
        'surface-adjustment': '북돋울 흙을 눌러 주세요.',
        water: '물을 줄 흙을 눌러 주세요.',
      }
      if (editTool) {
        setEditStatus(hint[editTool])
      }
      return
    }
    const entry = selectedEntry()
    if (!entry) return
    if (
      action === 'move' &&
      entry.kind !== 'surface-adjustment' &&
      entry.kind !== 'terrain-patch'
    ) {
      movingEntry = true
      renderEditDock()
      return
    }
    if (action === 'thin' && entry.kind === 'low-flower') {
      commitEdit(
        ecology.apply({ type: 'thin', zoneId, id: entry.id }, residentGuard()),
        '사이를 벌려 주었습니다.',
      )
      return
    }
    if (action === 'retrieve') {
      selectedEntryId = undefined
      commitEdit(
        ecology.apply({ type: 'retrieve', zoneId, id: entry.id }, residentGuard()),
        entry.kind === 'structure'
          ? zoneId === 'd-headwater-edge'
            ? '놓아 둔 돌이나 가지를 걷었습니다.'
            : '구조물을 걷어 두었습니다.'
          : zoneId === 'd-headwater-edge'
            ? '덮어 둔 낙엽을 걷었습니다.'
            : '캐서 바구니에 담았습니다.',
      )
      return
    }
    if (action === 'rotate' && (entry.kind === 'structure' || entry.kind === 'drainage-segment')) {
      const rotation = entry.rotation + Math.PI / 4
      const result = ecology.apply(
        { type: 'rotate', zoneId, id: entry.id, rotation },
        residentGuard(),
      )
      if (result.changed) buildRotation = rotation
      commitEdit(result, '방향을 돌렸습니다.')
      return
    }
    if (action === 'restore-drainage' && entry.kind === 'drainage-segment') {
      selectedEntryId = undefined
      commitEdit(
        ecology.apply(
          { type: 'restore-drainage', zoneId, id: entry.id },
          residentGuard(),
        ),
        zoneId === 'd-headwater-edge'
          ? '얕은 홈을 메워 원래 흐름으로 돌렸습니다.'
          : '얕은 물길을 메웠습니다.',
      )
      return
    }
    if (action === 'restore') {
      selectedEntryId = undefined
      commitEdit(
        ecology.apply(
          { type: 'restore-ground', zoneId, id: entry.id },
          residentGuard(),
        ),
        '원래 흙으로 돌아왔습니다.',
      )
      return
    }
    if (action === 'restore-terrain' && entry.kind === 'terrain-patch') {
      selectedEntryId = undefined
      commitEdit(
        ecology.apply(
          { type: 'restore-terrain', zoneId, id: entry.id },
          residentGuard(),
        ),
        '이 자리의 원래 높이로 돌아왔습니다.',
      )
    }
  }

  const updateDevelopmentState = (
    snapshot: ReturnType<GameRuntime['snapshot']>,
    residentSnapshot: ResidentsSnapshot,
  ): void => {
    document.documentElement.dataset.playerAt =
      snapshot.playerAt.x.toFixed(3) + ',' + snapshot.playerAt.z.toFixed(3)
    document.documentElement.dataset.worldElapsed = snapshot.elapsed.toFixed(3)
    document.documentElement.dataset.viewportBlocked = String(snapshot.blocked)
    document.documentElement.dataset.cameraYaw = snapshot.cameraYaw.toFixed(4)
    document.documentElement.dataset.cameraDistance = snapshot.cameraDistance.toFixed(3)
    document.documentElement.dataset.saveLoaded = String(loadResult.status === 'loaded')
    document.documentElement.dataset.saveLoadStatus = loadResult.status
    document.documentElement.dataset.mode = isEditing() ? 'edit' : 'walk'
    document.documentElement.dataset.butterflyPhase =
      residentSnapshot.smallResidents.butterfly.phase
    document.documentElement.dataset.butterflyTarget =
      residentSnapshot.smallResidents.butterfly.target?.kind ?? 'none'
    document.documentElement.dataset.snailPhase = residentSnapshot.smallResidents.snail.phase
    document.documentElement.dataset.snailTarget =
      residentSnapshot.smallResidents.snail.target?.kind ?? 'none'
    document.documentElement.dataset.toadPhase = residentSnapshot.toad.phase
    document.documentElement.dataset.toadRoute =
      residentSnapshot.toad.activeRoute?.kind ?? 'none'
    document.documentElement.dataset.toadVisits = String(residentSnapshot.toad.visitCount)
    document.documentElement.dataset.residentEventId = String(residentSnapshot.lastEventId)
    document.documentElement.dataset.occupiedEditEntries =
      residents.occupiedEditEntryIds().join(',')
    document.documentElement.dataset.notebookEntries = String(
      notebook.snapshot().entries.length,
    )
    document.documentElement.dataset.notebookOpen = String(notebookOpen)
    const sourceProfile = deriveHeadwaterProfile(ecology.snapshot().editState)
    const bProfile = headwaterProfileAtB(upstream)
    document.documentElement.dataset.headwaterSourceProfile = [
      sourceProfile.shade,
      sourceProfile.retention,
      sourceProfile.continuity,
    ].map((value) => value.toFixed(3)).join(',')
    document.documentElement.dataset.headwaterBProfile = [
      bProfile.shade,
      bProfile.retention,
      bProfile.continuity,
    ].map((value) => value.toFixed(3)).join(',')
    document.documentElement.dataset.upstreamDeliveryProgress =
      upstreamDeliveryProgress(upstream, snapshot.elapsed).toFixed(3)
    document.documentElement.dataset.upstreamPending = String(
      pendingUpstreamDelivery(upstream) !== undefined,
    )
  }

  const configureStartScreen = (): void => {
    if (loadResult.status === 'loaded') {
      startButton.textContent = '이어 걷기'
      newGameButton.hidden = false
      startNote.textContent = loadResult.recovered
        ? '앞서 안전하게 저장된 모습으로 돌아왔습니다.'
        : '지난번 걷던 모습이 이 기기에 남아 있습니다.'
      return
    }
    if (loadResult.status === 'unsupported-future') {
      startButton.textContent = '저장 없이 걸어 보기'
      newGameButton.textContent = '저장 지우고 새로 걷기'
      newGameButton.hidden = false
      startNote.textContent = '더 새 버전의 저장은 건드리지 않고 그대로 둡니다.'
      return
    }
    if (loadResult.status === 'storage-error') {
      startNote.textContent = '이 브라우저에서는 이번 걷기를 저장하지 못할 수 있습니다.'
      return
    }
    startButton.textContent = '걸어 보기'
    newGameButton.hidden = true
    // `목표가 없다`는 안심시키려는 말이지만 아이에게는 `할 게 없다`로 읽힌다.
    // 지시하지 않으면서 방향만 주는 한 줄로 둔다.
    startNote.textContent = '어느 쪽을 먼저 해도 괜찮아요.'
  }

  const beginGame = (): void => {
    runtime.start()
    startScreen.classList.add('is-gone')
    canvas.focus()
    flushSave()
  }

  const clearLocalWorld = (): void => {
    try {
      for (const key of Object.values(LOCAL_SAVE_KEYS)) {
        window.localStorage.removeItem(key)
      }
    } catch {
      // 저장소를 쓸 수 없어도 현재 메모리에서는 새 세계를 시작할 수 있다.
    }
    saveStore = new LocalSaveStore(window.localStorage)
    loadResult = { status: 'none', writeLocked: false }
    lastSaveFingerprint = ''
    runtime.reset()
    ecology.reset()
    const resetEcology = ecology.snapshot()
    upstream = createUpstreamWaterwayState(resetEcology.editState, 0)
    residents.reset(
      resetEcology.editState,
      resetEcology.environment,
      resetEcology.plantGrowth,
      resetEcology.ecologyRevision,
    )
    notebook.reset()
    const resetResidents = residents.snapshot()
    view.resetEcology(resetResidents.smallResidents, resetResidents.toad)
    view.syncUpstreamWaterway(upstream, 0)
    lastResidentGuardSignature = ''
    delete notebookButton.dataset.new
    notebookButton.setAttribute('aria-label', '관계 수첩')
    notebookToast.hidden = true
    notebookToastUntil = 0
    delete document.documentElement.dataset.lastWaterwayClue
    renderNotebook()
    exitEdit()
    syncBlockedState()
    syncEditVisuals()
    configureStartScreen()
  }

  configureStartScreen()
  const resizeObserver = new ResizeObserver(syncViewport)
  resizeObserver.observe(shell)
  coarsePointer.addEventListener('change', syncViewport)
  syncViewport()

  startButton.addEventListener('click', beginGame)
  newGameButton.addEventListener('click', () => {
    clearLocalWorld()
    beginGame()
  })
  editEntryButton.addEventListener('click', () => {
    if (nearbyEditZone) enterEdit(nearbyEditZone)
  })
  editLayerTabs.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-edit-layer]',
    )
    const layer = button?.dataset.editLayer
    if (layer === 'care' || layer === 'build') {
      setEditLayer(layer)
    }
  })
  waterFillButton.addEventListener('click', () => {
    const source = getNearbyWaterSource(runtime.snapshot().playerAt)
    if (source) ecology.fill(source.id)
  })
  waterwayClueButton.addEventListener('click', () => inspectWaterwayClue(nearbyWaterwayClue))
  notebookButton.addEventListener('click', openNotebook)
  notebookClose.addEventListener('click', closeNotebook)
  editDock.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-edit-action]')
    if (button && !button.disabled) handleDockAction(button.dataset.editAction ?? '')
  })

  window.addEventListener('keydown', (event) => {
    if (input.keyDown(event.key, performance.now())) {
      event.preventDefault()
    }
  })
  window.addEventListener('keyup', (event) => input.keyUp(event.key))
  window.addEventListener('blur', () => input.reset())
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) flushSave()
    visibilityBlocked = document.hidden
    syncBlockedState()
  })
  window.addEventListener('pagehide', flushSave)

  canvas.addEventListener('pointerdown', (event) => {
    if (isEditing() || orientationBlocked || lookPointerId !== undefined) {
      return
    }
    lookPointerId = event.pointerId
    lastLookX = event.clientX
    canvas.setPointerCapture(event.pointerId)
    canvas.focus()
  })
  canvas.addEventListener('pointermove', (event) => {
    if (event.pointerId !== lookPointerId) return
    input.addLookDelta(event.clientX - lastLookX)
    lastLookX = event.clientX
  })
  const releaseLook = (event: PointerEvent): void => {
    if (event.pointerId !== lookPointerId) return
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId)
    lookPointerId = undefined
  }
  canvas.addEventListener('pointerup', releaseLook)
  canvas.addEventListener('pointercancel', releaseLook)
  canvas.addEventListener('click', (event) => {
    if (isEditing()) handleCanvasEdit(event.clientX, event.clientY)
  })
  canvas.addEventListener(
    'wheel',
    (event) => {
      event.preventDefault()
      if (!isEditing()) input.addZoomDelta(event.deltaY)
    },
    { passive: false },
  )
  canvas.addEventListener('contextmenu', (event) => event.preventDefault())

  const updateMovePad = (event: PointerEvent): void => {
    const bounds = movePad.getBoundingClientRect()
    const radius = bounds.width * 0.31
    const axes = normalizeStick(
      event.clientX - (bounds.left + bounds.width / 2),
      event.clientY - (bounds.top + bounds.height / 2),
      radius,
    )
    input.setTouchMovement(axes)
    moveKnob.style.transform =
      'translate(' + String(axes.right * radius) + 'px, ' + String(-axes.forward * radius) + 'px)'
  }
  movePad.addEventListener('pointerdown', (event) => {
    if (isEditing() || orientationBlocked || movePointerId !== undefined) return
    event.preventDefault()
    movePointerId = event.pointerId
    movePad.setPointerCapture(event.pointerId)
    updateMovePad(event)
  })
  movePad.addEventListener('pointermove', (event) => {
    if (event.pointerId === movePointerId) {
      event.preventDefault()
      updateMovePad(event)
    }
  })
  const releaseMove = (event: PointerEvent): void => {
    if (event.pointerId !== movePointerId) return
    if (movePad.hasPointerCapture(event.pointerId)) movePad.releasePointerCapture(event.pointerId)
    resetMovePad()
  }
  movePad.addEventListener('pointerup', releaseMove)
  movePad.addEventListener('pointercancel', releaseMove)

  const idleMovement = {
    moveForward: 0,
    moveRight: 0,
    lookDeltaX: 0,
    zoomDelta: 0,
    actions: [],
  } as const

  let lastFrameTime = performance.now()
  const animate = (frameTime: number): void => {
    const delta = Math.min((frameTime - lastFrameTime) / 1000, 0.05)
    lastFrameTime = frameTime
    const frame = input.consumeFrame(frameTime)
    for (const action of frame.actions) {
      if (action === 'interact' && !isEditing()) {
        if (
          nearbyWaterwayClue &&
          !notebook.has(nearbyWaterwayClue.observationId)
        ) {
          inspectWaterwayClue(nearbyWaterwayClue)
        } else if (nearbyEditZone) {
          enterEdit(nearbyEditZone)
        } else {
          inspectWaterwayClue(nearbyWaterwayClue)
        }
      }
      if (action === 'cancel') {
        if (notebookOpen) closeNotebook()
        else cancelEditLayer()
      }
      if (action === 'notebook') toggleNotebook()
      if (action === 'undo' && isEditing()) undoEdit()
    }
    runtime.advance(delta, isEditing() ? idleMovement : frame)
    const snapshot = runtime.snapshot()
    const upstreamFrame = advanceUpstreamState()
    if (upstreamFrame.changed) {
      flushSave()
    }
    // 표면은 세계 시간을 따라 마른다. 젖음과 마름이 뒤바뀐 순간에만 다시 판정한다.
    if (snapshot.started && ecology.advanceMoisture(delta)) {
      syncEditVisuals()
      if (isEditing()) renderEditDock()
    }
    const growthFrame = ecology.advancePlantGrowth(
      delta,
      snapshot.elapsed,
      snapshot.started && !snapshot.blocked,
    )
    if (growthFrame.changed) {
      const growthSnapshot = ecology.snapshot()
      view.syncPlantGrowth(growthSnapshot.plantGrowth, snapshot.elapsed)
      document.documentElement.dataset.plantGrowth = Object.entries(
        growthSnapshot.plantGrowth.byEntryId,
      )
        .map(([id, record]) => id + ':' + derivePlantGrowth(record, snapshot.elapsed).stage)
        .join(',')
    }
    if (growthFrame.stageChanged && isEditing()) {
      renderEditDock()
    }
    const residentFrame = advanceResidents(delta)
    const guardSignature = residents.occupiedEditEntryIds().join(',')
    if (guardSignature !== lastResidentGuardSignature) {
      lastResidentGuardSignature = guardSignature
      if (isEditing()) renderEditDock()
    }
    updatePlaceCard(snapshot.place)
    nearbyEditZone = !isEditing() ? getNearbyEditZone(snapshot.playerAt, 1.8) : undefined
    editEntryButton.hidden =
      !snapshot.started || snapshot.blocked || !nearbyEditZone || isEditing()
    if (nearbyEditZone) {
      editEntryButton.textContent = nearbyEditZone.id === 'd-headwater-edge'
        ? '🍂 발원지 흐름 다듬기'
        : '🌿 ' + nearbyEditZone.shortName + ' 가꾸기·만들기'
    }
    const nearbySource = !isEditing() ? getNearbyWaterSource(snapshot.playerAt) : undefined
    const canFull = ecology.snapshot().wateringCanLevel >= 1
    waterFillButton.hidden =
      !snapshot.started || snapshot.blocked || !nearbySource || canFull || isEditing()
    if (nearbySource) {
      waterFillButton.textContent = '💧 ' + nearbySource.shortName + '에서 물 뜨기'
    }
    nearbyWaterwayClue = !isEditing()
      ? getNearbyWaterwayClue(snapshot.playerAt)
      : undefined
    waterwayClueButton.hidden =
      !snapshot.started || snapshot.blocked || !nearbyWaterwayClue || isEditing()
    if (nearbyWaterwayClue) {
      waterwayClueButton.textContent = nearbyWaterwayClue.id === 'b-drifting-leaf' &&
        pendingUpstreamDelivery(upstream)
        ? '🍃 물가 변화 살펴보기'
        : nearbyWaterwayClue.id === 'b-drifting-leaf' && upstream.delivered
          ? '🍃 달라진 잎 살펴보기'
          : notebook.has(nearbyWaterwayClue.observationId)
            ? nearbyWaterwayClue.revisitingAction
            : nearbyWaterwayClue.action
      document.documentElement.dataset.nearbyWaterwayClue = nearbyWaterwayClue.id
    } else {
      delete document.documentElement.dataset.nearbyWaterwayClue
    }
    notebookButton.hidden =
      !snapshot.started || orientationBlocked || visibilityBlocked || isEditing()
    if (!notebookToast.hidden && frameTime >= notebookToastUntil) {
      notebookToast.hidden = true
    }
    updateDevelopmentState(snapshot, residentFrame.snapshot)
    view.render(snapshot, delta)
    if (snapshot.started && frameTime - lastSaveAttempt >= 5000) {
      lastSaveAttempt = frameTime
      flushSave()
    }
    requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
} catch (error) {
  startScreen.hidden = true
  orientationGate.hidden = true
  errorPanel.hidden = false
  console.error(error)
}

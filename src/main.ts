import './style.css'
import {
  EDIT_ZONES,
  assertFirstMapContract,
  getNearbyEditZone,
  getNearbyWaterSource,
  type EditZone,
  type Place,
} from './content/first-map.ts'
import type { EditEntry } from './domain/edit-model.ts'
import type { ZoneEnvironmentReading } from './domain/local-environment.ts'
import { InputState, isLandscapeViewport, normalizeStick } from './input/input-state.ts'
import {
  LOCAL_SAVE_KEYS,
  LOCAL_SAVE_MAP_ID,
  LOCAL_SAVE_SCHEMA_VERSION,
  LocalSaveStore,
  type LocalSaveV1,
  type LocalSaveLoadResult,
} from './persistence/local-save.ts'
import { ThreeScene } from './render/three-scene.ts'
import { EcologyRuntime } from './runtime/ecology-runtime.ts'
import { GameRuntime } from './runtime/game-runtime.ts'
import { ResidentsRuntime, type ResidentsSnapshot } from './runtime/residents-runtime.ts'

// 도구는 모두 정원에서 하는 일이다. `고르기`는 도구가 아니다.
// 이미 심어 둔 것을 그냥 누르면 잡히므로 별도 도구가 필요 없다.
type EditTool = 'low-flower' | 'low-cover' | 'surface-adjustment' | 'water'

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
  '    <span><kbd>WASD</kbd> 걷기</span><span>↔ 끌어보기</span><span><kbd>Space</kbd> 정원 가꾸기</span>',
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
  '  <section id="edit-hud" aria-label="정원을 가꾸는 자리" hidden>',
  '    <p id="edit-status" aria-live="polite">아래에서 해 보고 싶은 것을 골라 주세요.</p>',
  '    <nav id="edit-dock" aria-label="정원 가꾸기"></nav>',
  '  </section>',
  '  <section id="start-screen">',
  '    <div class="start-panel">',
  '      <p class="eyebrow">ANIMAL ADVENTURE</p>',
  '      <h1>산촌의 첫 물길</h1>',
  '      <p>이 정원에 누가 사는지 볼래요?</p>',
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
const editHud = requireElement<HTMLElement>('#edit-hud')
const editStatus = requireElement<HTMLElement>('#edit-status')
const editDock = requireElement<HTMLElement>('#edit-dock')
const errorPanel = requireElement<HTMLElement>('#error-panel')

try {
  assertFirstMapContract()
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
  const ecology = new EcologyRuntime(restored?.edits)
  const initialEcology = ecology.snapshot()
  const residents = new ResidentsRuntime(
    initialEcology.editState,
    initialEcology.environment,
  )
  const initialResidents = residents.snapshot()
  const view = new ThreeScene(
    canvas,
    initialResidents.smallResidents,
    initialResidents.toad,
  )
  view.syncEdits(initialEcology.editState.current)
  view.syncSurfaceMoisture(initialEcology.surfaceMoisture)

  const coarsePointer = window.matchMedia('(pointer: coarse)')
  let currentPlaceId: string | undefined
  let orientationBlocked = false
  let visibilityBlocked = document.hidden
  let movePointerId: number | undefined
  let lookPointerId: number | undefined
  let lastLookX = 0
  let nearbyEditZone: EditZone | undefined
  let editTool: EditTool | undefined
  let selectedEntryId: string | undefined
  let movingEntry = false
  let lastSaveFingerprint = restored ? JSON.stringify(restored) : ''
  let lastSaveAttempt = performance.now()
  let lastResidentGuardSignature = ''

  const isEditing = (): boolean => ecology.snapshot().activeZoneId !== undefined
  const residentGuard = () => residents.editGuard()

  const advanceResidents = (deltaSeconds: number) => {
    const game = runtime.snapshot()
    const ecologySnapshot = ecology.snapshot()
    const frame = residents.advance({
      deltaSeconds,
      editState: ecologySnapshot.editState,
      environment: ecologySnapshot.environment,
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
    return frame
  }

  const resetMovePad = (): void => {
    movePointerId = undefined
    moveKnob.style.transform = 'translate(0px, 0px)'
    input.setTouchMovement({ forward: 0, right: 0 })
  }

  const buildSave = (): LocalSaveV1 => {
    const game = runtime.persistentState()
    return {
      schemaVersion: LOCAL_SAVE_SCHEMA_VERSION,
      mapId: LOCAL_SAVE_MAP_ID,
      elapsed: game.elapsed,
      player: { at: game.playerAt, heading: game.playerHeading },
      camera: { yaw: game.cameraYaw, distance: game.cameraDistance },
      edits: ecology.persistentState(),
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
    const blocked = orientationBlocked || visibilityBlocked
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
    placeCode.textContent = place?.id ?? '·'
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
    return [light, moisture, opening, cover].join(' · ')
  }

  const setEditStatus = (message?: string): void => {
    const snapshot = ecology.snapshot()
    const zoneId = snapshot.activeZoneId
    if (!zoneId) {
      return
    }
    const zone = EDIT_ZONES.find(({ id }) => id === zoneId)
    editStatus.textContent = message ??
      (zone ? zone.shortName + ' · ' + environmentWords(snapshot.environment.zones[zoneId]) : '')
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
    editHud.hidden = false
    if (movingEntry && entry) {
      editDock.innerHTML = dockButton('cancel', '↩ 그만두기')
      setEditStatus('옮겨 심을 자리를 눌러 주세요.')
      return
    }
    if (entry) {
      const occupied = guard.occupiedEntryIds?.includes(entry.id) ?? false
      editDock.innerHTML = entry.kind === 'surface-adjustment'
        ? [
            dockButton('cancel', '↩ 그만두기'),
            dockButton('restore', '◌ 원래 흙으로', false, occupied, 'danger-soft'),
            dockButton('undo', '↶ 되돌리기', false, !snapshot.canUndoActiveZone),
          ].join('')
        : [
            dockButton('cancel', '↩ 그만두기'),
            dockButton('move', '↔ 옮겨심기', false, occupied),
            dockButton('retrieve', '🧺 캐서 담기', false, occupied, 'danger-soft'),
            dockButton('undo', '↶ 되돌리기', false, !snapshot.canUndoActiveZone),
          ].join('')
      setEditStatus(
        entry.kind === 'surface-adjustment'
          ? '북돋운 흙을 잡았습니다.'
          : '심어 둔 것을 잡았습니다.',
      )
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

  const syncEditVisuals = (): void => {
    const snapshot = ecology.snapshot()
    view.syncEdits(snapshot.editState.current)
    view.syncSurfaceMoisture(snapshot.surfaceMoisture)
    document.documentElement.dataset.editRevision = String(snapshot.editState.revision)
    document.documentElement.dataset.editEntries = String(
      Object.values(snapshot.editState.current)
        .flatMap((overlay) => Object.keys(overlay)).length,
    )
    document.documentElement.dataset.surfaceMoisture = Object.entries(
      snapshot.surfaceMoisture,
    )
      .map(([zoneId, state]) => zoneId + ':' + state)
      .join(',')
    document.documentElement.dataset.wateringCan = snapshot.wateringCanLevel.toFixed(2)
  }

  const describeRejection = (rejection: string | undefined): string => {
    if (rejection === 'outside-edit-zone') return '관리된 흙 안쪽을 눌러 주세요.'
    if (rejection === 'overlap') return '조금 떨어진 자리를 눌러 주세요.'
    if (rejection === 'nothing-to-undo') return '되돌릴 것이 없습니다.'
    if (rejection === 'occupied') return '지금 작은 생명이 쓰는 자리는 그대로 둡니다.'
    return '지금은 그 자리를 바꾸지 않습니다.'
  }

  const commitEdit = (result: ReturnType<EcologyRuntime['apply']>, success: string): void => {
    if (result.changed) {
      syncEditVisuals()
      advanceResidents(0)
      flushSave()
    }
    renderEditDock()
    setEditStatus(result.changed ? success : describeRejection(result.rejection))
  }

  const enterEdit = (zone: EditZone): void => {
    if (orientationBlocked || visibilityBlocked || !runtime.snapshot().started) {
      return
    }
    input.reset()
    resetMovePad()
    ecology.enter(zone.id)
    editTool = undefined
    selectedEntryId = undefined
    movingEntry = false
    shell.dataset.mode = 'edit'
    view.setEditZone(zone.id)
    document.documentElement.dataset.editZone = zone.id
    renderEditDock()
  }

  const exitEdit = (): void => {
    ecology.exit()
    editTool = undefined
    selectedEntryId = undefined
    movingEntry = false
    editHud.hidden = true
    shell.dataset.mode = 'walk'
    view.setEditZone(undefined)
    delete document.documentElement.dataset.editZone
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
      commitEdit(result, '새 자리로 옮겼습니다.')
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
      const watered = ecology.water()
      if (watered.changed) {
        syncEditVisuals()
        setEditStatus('물을 주었습니다. 볕에 그대로 두면 곧 마릅니다.')
      } else if (watered.rejection === 'empty-can') {
        setEditStatus('물뿌리개가 비었습니다. 우물이나 개울에서 다시 떠 오세요.')
      }
      renderEditDock()
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
        ? '꽃을 심었습니다.'
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
    if (
      action === 'low-flower' ||
      action === 'low-cover' ||
      action === 'surface-adjustment' ||
      action === 'water'
    ) {
      // 같은 도구를 다시 누르면 내려놓는다.
      editTool = editTool === action ? undefined : action
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
    if (action === 'move' && entry.kind !== 'surface-adjustment') {
      movingEntry = true
      renderEditDock()
      return
    }
    if (action === 'retrieve') {
      selectedEntryId = undefined
      commitEdit(
        ecology.apply({ type: 'retrieve', zoneId, id: entry.id }, residentGuard()),
        '캐서 바구니에 담았습니다.',
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
    startNote.textContent = '천천히 둘러봐도 괜찮아요.'
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
    residents.reset(resetEcology.editState, resetEcology.environment)
    const resetResidents = residents.snapshot()
    view.resetEcology(resetResidents.smallResidents, resetResidents.toad)
    lastResidentGuardSignature = ''
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
  waterFillButton.addEventListener('click', () => {
    const source = getNearbyWaterSource(runtime.snapshot().playerAt)
    if (source) ecology.fill(source.id)
  })
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
      if (action === 'interact' && !isEditing() && nearbyEditZone) enterEdit(nearbyEditZone)
      if (action === 'cancel') cancelEditLayer()
      if (action === 'undo' && isEditing()) undoEdit()
    }
    runtime.advance(delta, isEditing() ? idleMovement : frame)
    const snapshot = runtime.snapshot()
    // 표면은 세계 시간을 따라 마른다. 젖음과 마름이 뒤바뀐 순간에만 다시 판정한다.
    if (snapshot.started && ecology.advanceMoisture(delta)) {
      syncEditVisuals()
      if (isEditing()) renderEditDock()
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
      editEntryButton.textContent = '🌱 ' + nearbyEditZone.shortName + ' 가꾸기'
    }
    const nearbySource = !isEditing() ? getNearbyWaterSource(snapshot.playerAt) : undefined
    const canFull = ecology.snapshot().wateringCanLevel >= 1
    waterFillButton.hidden =
      !snapshot.started || snapshot.blocked || !nearbySource || canFull || isEditing()
    if (nearbySource) {
      waterFillButton.textContent = '💧 ' + nearbySource.shortName + '에서 물 뜨기'
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

import { cp, mkdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// GitHub Pages는 `아이디.github.io/저장소이름/` 아래에서 서빙하므로 자산 경로에
// 저장소 이름이 들어가야 한다. Sites는 주소 최상위에서 서빙하므로 `/`를 쓴다.
const PAGES_BASE = '/animal-adventure-greenstar/'

// Sites가 정적 게임과 배포 메타데이터를 같은 검증된 빌드로 묶도록 한다.
// GitHub Pages는 워커도 `.openai` 메타데이터도 쓰지 않으므로 Sites 빌드에서만 켠다.
function sitesBundle() {
  let root = process.cwd()

  return {
    name: 'animal-adventure-sites-bundle',
    apply: 'build',
    configResolved(config) {
      root = config.root
    },
    async buildStart() {
      // Sites는 dist/client를 정적 자산 루트로 사용한다. 이전 구조의 파일이
      // 새 배포 묶음에 섞이지 않도록 전체 dist를 먼저 비운다.
      await rm(resolve(root, 'dist'), { recursive: true, force: true })
    },
    async closeBundle() {
      const hostingSource = resolve(root, '.openai', 'hosting.json')
      const workerSource = resolve(root, 'worker', 'index.js')
      const metadataDirectory = resolve(root, 'dist', '.openai')
      const serverDirectory = resolve(root, 'dist', 'server')

      await rm(metadataDirectory, { recursive: true, force: true })
      await rm(serverDirectory, { recursive: true, force: true })
      await mkdir(metadataDirectory, { recursive: true })
      await mkdir(serverDirectory, { recursive: true })
      await cp(hostingSource, resolve(metadataDirectory, 'hosting.json'))
      await cp(workerSource, resolve(serverDirectory, 'index.js'))
    },
  }
}

// Pages 빌드는 dist를 비우기만 하고 Sites 메타데이터를 만들지 않는다.
function pagesBundle() {
  let root = process.cwd()

  return {
    name: 'animal-adventure-pages-bundle',
    apply: 'build',
    configResolved(config) {
      root = config.root
    },
    async buildStart() {
      await rm(resolve(root, 'dist'), { recursive: true, force: true })
    },
  }
}

export default defineConfig(({ mode }) => {
  const forPages = mode === 'pages'
  return {
    base: forPages ? PAGES_BASE : '/',
    build: { outDir: 'dist/client' },
    plugins: [forPages ? pagesBundle() : sitesBundle()],
  }
})

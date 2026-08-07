import assert from 'node:assert/strict'
import test from 'node:test'
import worker from '../worker/index.js'

function assets() {
  const requests = []
  return {
    requests,
    binding: {
      async fetch(request) {
        const url = new URL(request.url)
        requests.push({ method: request.method, pathname: url.pathname })
        if (url.pathname === '/index.html') {
          return new Response('animal-adventure', { status: 200 })
        }
        if (url.pathname === '/assets/game.js') {
          return new Response('game-code', { status: 200 })
        }
        return new Response('missing', { status: 404 })
      },
    },
  }
}

test('존재하는 정적 자산은 그대로 응답한다', async () => {
  const source = assets()
  const response = await worker.fetch(
    new Request('https://example.test/assets/game.js'),
    { ASSETS: source.binding },
  )
  assert.equal(response.status, 200)
  assert.equal(await response.text(), 'game-code')
  assert.deepEqual(source.requests, [{ method: 'GET', pathname: '/assets/game.js' }])
})

test('확장자 없는 게임 경로는 첫 화면으로 안전하게 돌아간다', async () => {
  const source = assets()
  const response = await worker.fetch(
    new Request('https://example.test/first-waterway', {
      headers: { accept: 'text/html' },
    }),
    { ASSETS: source.binding },
  )
  assert.equal(response.status, 200)
  assert.equal(await response.text(), 'animal-adventure')
  assert.deepEqual(source.requests, [
    { method: 'GET', pathname: '/first-waterway' },
    { method: 'GET', pathname: '/index.html' },
  ])
})

test('없는 자산·데이터 요청과 쓰기 요청은 첫 화면으로 위장하지 않는다', async () => {
  const missingFile = assets()
  const fileResponse = await worker.fetch(
    new Request('https://example.test/assets/missing.js'),
    { ASSETS: missingFile.binding },
  )
  assert.equal(fileResponse.status, 404)

  const data = assets()
  const dataResponse = await worker.fetch(
    new Request('https://example.test/first-waterway', {
      headers: { accept: 'application/json' },
    }),
    { ASSETS: data.binding },
  )
  assert.equal(dataResponse.status, 404)
  assert.equal(data.requests.length, 1)

  const post = assets()
  const postResponse = await worker.fetch(
    new Request('https://example.test/first-waterway', {
      method: 'POST',
      headers: { accept: 'text/html' },
    }),
    { ASSETS: post.binding },
  )
  assert.equal(postResponse.status, 404)
  assert.equal(post.requests.length, 1)
})

function indexRequest(request) {
  const url = new URL(request.url)
  url.pathname = '/index.html'
  url.search = ''
  url.hash = ''
  return new Request(url, request)
}

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    const acceptsHtml = request.headers.get('accept')?.includes('text/html') ?? false
    const isNavigation = request.headers.get('sec-fetch-mode') === 'navigate'
    if (
      response.status !== 404 ||
      (request.method !== 'GET' && request.method !== 'HEAD') ||
      (!acceptsHtml && !isNavigation)
    ) {
      return response
    }
    return env.ASSETS.fetch(indexRequest(request))
  },
}

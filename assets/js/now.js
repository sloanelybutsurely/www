const API = "https://public.api.bsky.app/xrpc/"

const HANDLE = "sloane.is";
const LIMIT = 20;

async function call(method, params) {
  const query = new URLSearchParams(params);
  const resp = await fetch(`${API}${method}?${query}`);

  if (resp.ok) {
    return resp.json()
  } else {
    throw resp
  }
}

async function init() {
  const { did } = await call('com.atproto.identity.resolveHandle', { handle: HANDLE })
  const { feed: [latest, ...previously] } = await call('app.bsky.feed.getAuthorFeed', {
    actor: did,
    limit: LIMIT
  })

  document.getElementById('latest-content').innerText = latest.post.record.text

  if (previously.length > 0) {
    const container = document.getElementById('previously')
    const details = document.createElement('details')
    const summary = document.createElement('summary')
    summary.innerText = 'Previously'

    const list = document.createElement('ul')

    for (const { post } of previously) {
      const item = document.createElement('li')
      item.innerText = post.record.text
      list.appendChild(item)
    }

    details.appendChild(summary)
    details.appendChild(list)
    container.appendChild(details)
  }
}


if (['interactive', 'complete'].includes(document.readyState)) {
  init()
} else {
  addEventListener('readystatechange', () => init())
}

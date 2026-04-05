function init() {
  // add section links to headers with ids
  document.querySelectorAll('h1[id],h2[id],h3[id]').forEach(heading => {
    const parent = heading.parentNode
    const link = document.createElement('a')
    link.setAttribute('href', `#${heading.id}`)
    heading.childNodes.forEach(child => {
      link.appendChild(child)
    })
    heading.appendChild(link)
  })

  // set external links to open in a new tab
  document.querySelectorAll('a[href]').forEach(link => {
    const url = new URL(link.href)
    if (url.host != location.host) {
      link.setAttribute('target', '_blank')
    }
  })
}


if (['interactive', 'complete'].includes(document.readyState)) {
  init()
} else {
  addEventListener('readystatechange', () => init())
}

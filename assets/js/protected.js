---
---

const PASSPHRASE = "{{ site.passphrase }}"

function decode(data) {
  return atob(data)
          .split('')
          .map((char, i) => 
            String.fromCharCode(char.charCodeAt(0) ^ PASSPHRASE.charCodeAt(i % PASSPHRASE.length))
          )
          .join('')
}

function unprotect() {
  Array.from(document.querySelectorAll('.protected')).forEach(el => {
    Object.entries(el.dataset)
          .filter(([key, _]) => key.startsWith('protected'))
          .map(([key, value]) => {
            const titleCasedAttr = key.replace(/^protected/, '')
            const attr = titleCasedAttr[0].toLowerCase() + titleCasedAttr.slice(1)
            return [attr, value]
          })
          .forEach(([attr, encoded]) => {
            el[attr] = decode(encoded)
          })

    el.removeEventListener('click', handleUnprotect)
    el.removeEventListener('keyup', handleUnprotect)
  })

  localStorage.setItem('unprotect', 'true')
}

function handleUnprotect(event) {
  if (event.type === 'keyup' && !['Space', 'Enter'].includes(event.code)) return 

  event.preventDefault()
  
  unprotect()
}

function init() {
  if (localStorage.getItem('unprotect') === 'true') {
    unprotect()
  } else {
    Array.from(document.querySelectorAll('.protected')).forEach(el => {
      el.addEventListener('click', handleUnprotect)
      el.addEventListener('keyup', handleUnprotect)
    })
  }
}

if (['interactive', 'complete'].includes(document.readyState)) {
  init()
} else {
  addEventListener('readystatechange', () => init())
}

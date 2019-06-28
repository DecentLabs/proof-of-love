import { getWeb3, prove, getNetwork, getNetworkUrl } from './w3.js'
import { createHeart, getColorPalette } from './heart.js'
import Portis from '@portis/web3'

const card = document.getElementById('card')
const PORTIS_APP_ID = '41af45bb-dc18-4307-9c65-e992283b0640'
const PORTIS_NET = 'rinkeby'

document.addEventListener('click', (e) => {
  const button = document.getElementById('flip-button')
  if (e.target === button) {
    card.classList.add('flip')

    let ready = null

    if (window.ethereum) {
      getWeb3(ethereum)
      ready = ethereum.enable()
      gtag('event', 'metamask', {
        event_category: 'startup'
      })
    } else if (window.web3) {
      // Use Mist/MetaMask's provider
      getWeb3(web3.currentProvider)
      ready = Promise.resolve()
      gtag('event', 'old-metamask', {
        event_category: 'startup'
      })
    } else {
      const portis = new Portis(PORTIS_APP_ID, PORTIS_NET)
      ready = Promise.resolve(getWeb3(portis.provider))
      gtag('event', 'portis', {
        event_category: 'startup'
      })
    }

    ready.then(() => start())
  }
})

function start () {
  loveForm.addEventListener('submit', function (event) {
    event.preventDefault()

    gtag('event', 'start proving', {
      event_category: 'send',
      event_value: (name1 && name1.trim().length) + '|' + (name2 && name2.trim().length)
    })

    const name1 = name1Element.value
    const name2 = name2Element.value
    if (name1 && name2 && name1.trim().length && name2.trim().length) {
      Promise.all([
        prove(name1, name2),
        getNetwork()
      ]).then(
        ([hash, network]) => {
          gtag('event', 'network ' + network, {
            event_category: 'send'
          })

          if (hash !== undefined) {
            window.location.href = `/proof.html?${hash}${network !== '1' ? '@' + network : ''}`
          }
        })
    }
  })
}

const loveForm = document.getElementById('love-form')
const errormsg = document.getElementById('error-msg')
const name1Element = document.getElementById('name1')
const name2Element = document.getElementById('name2')
const homeCanvas = document.getElementById('home-canvas')
const hash = `0x${'f00f'.repeat(16)}`
const palette = getColorPalette(true)

createHeart(hash, homeCanvas, palette)



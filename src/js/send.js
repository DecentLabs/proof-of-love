import { getWeb3, prove, getNetwork, getNetworkUrl } from './w3.js'
import { createHeart, getColorPalette } from './heart.js'
import Portis from '@portis/web3'

const card = document.getElementById('card')
const PORTIS_APP_ID = '41af45bb-dc18-4307-9c65-e992283b0640'
const PORTIS_NETWORKS = {
  '1': {name: 'mainnet', options: {gasRelay: false} },
  '3': {name: 'ropsten', options: {gasRelay: true}},
  '4': {name: 'rinkeby', options: {gasRelay: false}}
}
const DEFAULT_NETWORK = '1'
const loveForm = document.getElementById('love-form')
const name1Element = document.getElementById('name1')
const name2Element = document.getElementById('name2')
const homeCanvas = document.getElementById('home-canvas')
const hash = `0x${'f00f'.repeat(16)}`
const palette = getColorPalette(true)
const button = document.getElementById('flip-button')
let ready = null

const connectListener = (e) => {
  if (ready === null) {
    console.log('ready listener')

    const networkId = decodeURIComponent(window.location.search.slice(1).split('&')[0]).split('@')[1] || DEFAULT_NETWORK
    console.log('networkId: ', networkId)

    card.classList.add('flip')

    if (window.ethereum) {
      console.log('using window.ethereum')
      getWeb3(ethereum)
      ready = ethereum.enable()
      gtag('event', 'metamask', {
        event_category: 'startup'
      })
    } else if (window.web3) {
      console.log('using window.web3')
      // Use Mist/MetaMask's provider
      getWeb3(web3.currentProvider)
      ready = Promise.resolve()
      gtag('event', 'old-metamask', {
        event_category: 'startup'
      })
    } else {
      const network = PORTIS_NETWORKS[networkId]
      console.log('using portis on', network.name)
      const portis = new Portis(PORTIS_APP_ID, network.name, network.options)
      ready = portis.provider.enable()
      getWeb3(portis.provider)
      gtag('event', 'portis', {
        event_category: 'startup'
      })
    }

    ready.then(() => {
      button.removeEventListener('click', connectListener)
      console.log('ready!')
      start()
    })
  }
}


function start () {
  card.classList.remove('waiting')
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

createHeart(hash, homeCanvas, palette)

button.addEventListener('click', connectListener)


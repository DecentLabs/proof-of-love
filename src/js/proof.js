import { renderMain } from './partials.js'
import { createHeart, getColorPalette, toDataURL } from './heart.js'
import {
  onStateChange,
  update
} from './state.js'
import {
  getWeb3FromURL,
  startPolling,
  getNetworkUrl
} from './w3.js'

const [tx_hash, network] = decodeURIComponent(window.location.search.slice(1).split('&')[0]).split('@')
const mainElement = document.getElementById('proofmain')

update({
  transactionID: tx_hash
})

function makeHeart (canvas, mono = false) {
  const palette = getColorPalette(mono)
  createHeart(tx_hash, canvas, palette)
}

function makeMonoHeart () {
  const loadCanvas = document.getElementById('load-canvas')
  if (loadCanvas) {
    makeHeart(loadCanvas, true)
  }
}

function makeColorHeart () {
  const canvas = document.createElement('canvas')
  makeHeart(canvas)
  update({imageURL: toDataURL(canvas)})
}

makeMonoHeart()

makeColorHeart()

getWeb3FromURL(getNetworkUrl(network))

onStateChange(({state}) => {
  renderMain(state, mainElement)
}, ['timestamp', 'names', 'imageURL'])


startPolling(tx_hash, 2)


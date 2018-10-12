import { renderMain } from './partials.js'
import { createHeart, getColorPalette, toDataURL } from './heart.js'
import {
  onStateChange,
  update
} from './state.js'
import {
  getLovers,
  getWeb3FromURL,
  startPollingForConfirmation,
  getNetworkUrl
} from './w3.js'

const [tx_hash, network] = window.location.search.slice(1).split('@')
const mainElement = document.getElementById('proofmain')

let canvas = document.getElementById('load-canvas')
let palette = getColorPalette(true)

update({
  pending: true,
  confirmed: 0,
  error: '',
  transactionID: tx_hash
})

createHeart(tx_hash, canvas, palette)

getWeb3FromURL(getNetworkUrl(network))

startPollingForConfirmation(tx_hash, 2)


onStateChange(({state, oldState}) => {
  if (!state.pending && oldState.pending) {

    getLovers(tx_hash)
  }
})

onStateChange(({state, updatedKeys}) => {
  if (updatedKeys.has('timestamp') || updatedKeys.has('names') || updatedKeys.has('imageURL')) {
    renderMain(state, mainElement)
  }
})

onStateChange(({updatedKeys}) => {
  if (updatedKeys.has('names')) {
    canvas = document.getElementById('heart-canvas')
    palette = getColorPalette()
    createHeart(tx_hash, canvas, palette)

    update({imageURL: toDataURL(canvas)})
  }
})

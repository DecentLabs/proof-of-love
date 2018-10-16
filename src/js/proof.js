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

const [tx_hash, network] =  decodeURIComponent(window.location.search.slice(1).split('&')[0]).split('@')
const mainElement = document.getElementById('proofmain')

let loadCanvas = document.getElementById('load-canvas')
let palette = getColorPalette(true)

update({
  pending: true,
  confirmed: 0,
  error: '',
  transactionID: tx_hash,
  fbInit: false,
  names: []
})

createHeart(tx_hash, loadCanvas, palette)

getWeb3FromURL(getNetworkUrl(network))

startPollingForConfirmation(tx_hash, 2)

onStateChange(({state, oldState}) => {
  if (!state.pending && oldState.pending) {
    getLovers(tx_hash)
  }
})

onStateChange(({state}) => {
  renderMain(state, mainElement)
}, ['timestamp', 'names', 'imageURL'])

onStateChange(() => {
  const canvas = document.createElement('canvas');
  palette = getColorPalette()
  createHeart(tx_hash, canvas, palette)

  update({imageURL: toDataURL(canvas)})
}, ['names'])

onStateChange(({state}) => {
  if (state.fbInit && state.names.length) {
    document.getElementById('share').addEventListener('click', () => {
      FB.ui({
        method: 'share_open_graph',
        display: 'dialog',
        action_type: 'og.likes',
        action_properties: JSON.stringify({
          object: {
            title: `${state.names[0]} loves ${state.names[1]}`,
            description: `Carved forever into Ethereum Blockchain`,
            url: window.location.href
          }
        })
      }, (response) => console.log(response))
    })
  }
}, ['fbInit', 'names'])

window.fbAsyncInit = function () {
  FB.init({
    appId: '913741655680114',
    xfbml: true,
    version: 'v3.1'
  })

  update({fbInit: true})
}

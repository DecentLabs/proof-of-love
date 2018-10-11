import { onStateChange, update } from './state.js'
import { getLovers, getWeb3FromURL, startPollingForConfirmation } from './w3.js'
import { renderMain } from './partials.js'
import { createHeart } from './heart.js'

const tx_hash = window.location.search.slice(1)
const mainElement = document.getElementById('proofmain');

update({
  pending: true,
  confirmed: 0,
  error: '',
  transactionID: tx_hash
})

getWeb3FromURL('https://rinkeby.infura.io/')

startPollingForConfirmation(tx_hash, 10)

onStateChange(({state}) => {
  renderMain(state, mainElement)
})

onStateChange(({state, oldState}) => {
  if(!state.pending && oldState.pending) {
    getLovers(tx_hash)
  }
})

onStateChange(({state, updatedKeys}) => {
  if (updatedKeys.has('names')) {
    const canvas = document.getElementById('heart-canvas')

    createHeart(tx_hash, canvas, state.names[0], state.names[1])
  }
})

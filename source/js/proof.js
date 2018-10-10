import { onStateChange, update } from './state.js'
import { getLovers, getWeb3FromURL, startPollingForConfirmation } from './w3.js'
import { renderMain } from './partials.js'

const tx_hash = window.location.search.slice(1)
const mainElement = document.getElementById('proofmain');

update({
  pending: true,
  confirmed: 0,
  error: ''
})

getWeb3FromURL('https://rinkeby.infura.io/')

startPollingForConfirmation(tx_hash, 10)

onStateChange(({state}) => renderMain(state, mainElement))

onStateChange(({state, oldState}) => {
  if(!state.pending && oldState.pending) {
    getLovers(tx_hash)
  }
})

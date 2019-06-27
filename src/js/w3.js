import abiDecode from 'abi-decoder/dist/abi-decoder.js'
import { ABI, ADDRESS, TESTADDRESS } from './contract.js'
import { update, onStateChange, getState } from './state.js'

abiDecode.addABI(ABI)
let web3js = null
let CONTRACT = null
let NETWORKID = null

function getContract () {
  if (!CONTRACT) {
    CONTRACT = getNetwork().then(netId => web3js.eth.contract(ABI).at(netId === '1' ? ADDRESS : TESTADDRESS))
  }

  return CONTRACT
}

export function getWeb3 (provider) {
  web3js = new Web3(provider)
  return web3js
}

export function getWeb3FromURL (url) {
  return getWeb3(new Web3.providers.HttpProvider(url))
}

export function prove (name1, name2) {
  return getContract().then(contract => new Promise(resolve => {
    gtag('event','start',{
      event_category:'prove'
    })
    contract.prove(name1, name2, (error, result) => {
      gtag('event','end',{
        event_category:'prove'
      })
      resolve(result)
    })
  }))
}

export function getLovers (tx_hash) {
  const {rcpt, names} = getState()

  if (rcpt && names.length) {
    return Promise.resolve(false)
  }

  return new Promise(resolve => {
    web3js.eth.getTransactionReceipt(tx_hash, function (error, rcpt) {
      if (error === null && rcpt && rcpt.logs && rcpt.blockNumber) {
        const events = abiDecode.decodeLogs(rcpt.logs)
        let names = []
        if (events.length) {
          names = events[0].events.map(eventData => eventData.value)
        }
        update({rcpt, names})
      }
      resolve(true)
    })
  })
}

function getTimestamp () {
  const {timestamp, rcpt} = getState()

  if (timestamp) {
    return Promise.resolve(false)
  }

  if (!rcpt) {
    return Promise.resolve(true)
  }

  return new Promise(resolve => {
    web3js.eth.getBlock(rcpt.blockNumber, function (error, block) {
      if (error === null && block && block.timestamp) {
        let timestamp = new Date(block.timestamp * 1000).toISOString()
        update({timestamp})
      }
      resolve(true)
    })
  })
}

function getConfirmation (tx_hash, maxConfirmation) {

  const {confirmed} = getState()

  if(confirmed === 1) {
    gtag('event','first confirmation',{
      event_category:'prove'
    })
  }

  if (confirmed >= maxConfirmation) {
    gtag('event','confirmed',{
      event_category:'prove',
      event_value: confirmed
    })

    return Promise.resolve(false)
  }

  return new Promise((resolve) => {
    web3js.eth.getTransaction(tx_hash, function (error, response) {
      if (error !== null) {
        update({pending: true, hasError: true, error})
        resolve(true)
      } else {
        if (!response || response.blockNumber === null) {
          update({pending: true})
          resolve(true)
        } else {
          web3js.eth.getBlockNumber(function (error, latestBlockNumber) {
            if (error !== null) {
              console.log('Error:' + error)
            }
            const numConfirmations = (latestBlockNumber - response.blockNumber) + 1
            update({pending: false, confirmed: numConfirmations})
            resolve(true)
          })
        }
      }
    })
  })
}

export function startPolling(tx_hash, maxConfirmation) {

  update({
    loading: false,
    needsPolling: true
  })

  const poll = function () {
    console.log('poll')

    return Promise.all([
      getConfirmation(tx_hash, maxConfirmation),
      getLovers(tx_hash),
      getTimestamp()
    ])
  }

  onStateChange(({state}) => {
    if (!state.loading && state.needsPolling) {
      update({loading: true})
      setTimeout(() => poll().then((polls) => {
        const needsPolling = polls.some(poll => poll)
        update({loading: false, needsPolling})
      }), 1000)
    }
  })

  poll()
}

export function getNetwork () {
  if (!NETWORKID) {
    NETWORKID = new Promise(resolve => {
      web3js.version.getNetwork((err, netId) => resolve(netId))
    })
  }
  return NETWORKID
}

export function getNetworkUrl (id) {
  switch (id) {
    case '4':
      return 'https://rinkeby.infura.io/'
    default:
      return 'https://mainnet.infura.io/'
  }
}

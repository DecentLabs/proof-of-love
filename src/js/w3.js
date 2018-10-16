import abiDecode from './abidecode.js'
import { ABI, ADDRESS, TESTADDRESS } from './contract.js'
import { update, onStateChange } from './state.js'

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

export function getLovers (tx_hash) {
  const names = new Promise(resolve => {
    web3js.eth.getTransactionReceipt(tx_hash, function (error, rcpt) {
      const events = abiDecode.decodeLogs(rcpt.logs)
      let names = []
      if (events.length) {
        names = events[0].events.map(eventData => eventData.value)
      }
      resolve({rcpt, names})
    })
  })

  return names.then(({rcpt, names}) => new Promise(resolve => {
    web3js.eth.getBlock(rcpt.blockNumber, function (error, block) {
      let timestamp = (new Date()).toISOString()
      if (error !== null || !block || !block.timestamp) {
        console.log('Error:' + error)
      } else {
        timestamp = new Date(block.timestamp * 1000).toISOString()
      }

      update({names, timestamp})
      resolve()
    })
  }))
}

export function prove (name1, name2) {
  return getContract().then(contract => new Promise(resolve => {
    contract.prove(name1, name2, (error, result) => {
      resolve(result)
    })
  }))
}

export function startPollingForConfirmation (tx_hash, maxConfirmation) {

  const poll = function () {
    console.log('poll')
    return new Promise((resolve, reject) => {
      web3js.eth.getTransaction(tx_hash, function (error, response) {
        if (error !== null) {
          update({pending: false, hasError: true, loading: false, error})
          reject(error)
        } else {
          if (!response || response.blockNumber === null) {
            update({pending: true, loading: false})
            resolve()
          } else {
            web3js.eth.getBlockNumber(function (error, latestBlockNumber) {
              if (error !== null) {
                console.log('Error:' + error)
              }
              const numConfirmations = (latestBlockNumber - response.blockNumber) + 1
              update({pending: false, confirmed: numConfirmations, loading: false})
              resolve()
            })
          }
        }
      })
    })
  }

  update({loading: false})

  onStateChange(({state}) => {
    if (!state.loading && (state.pending || state.confirmed < maxConfirmation)) {
      update({loading: true})
      setTimeout(() => poll(), 1000)
    }
  })

  poll()
}

export function getNetwork () {
  if(!NETWORKID) {
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
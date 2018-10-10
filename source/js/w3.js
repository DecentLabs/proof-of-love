import abiDecode from './abidecode.js'
import { ABI, ADDRESS } from './contract.js'
import { update, onStateChange } from './state.js'

abiDecode.addABI(ABI)
let web3js = null
let CONTRACT = null

function getContract () {
  if (!CONTRACT) {
    CONTRACT = web3js.eth.contract(ABI).at(ADDRESS)
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
  return new Promise(resolve => {
    web3js.eth.getTransactionReceipt(tx_hash, function (error, rcpt) {
      const events = abiDecode.decodeLogs(rcpt.logs)
      let names = []
      if (events.length) {
        names = events[0].events.map(eventData => eventData.value)
      }
      update({names})
      resolve(names)

      web3js.eth.getBlock(rcpt.blockNumber, function (error, block) {
        if (error !== null) {
          console.log('Error:' + error)
        }
        console.log("timestamp (UTC): ", new Date(block.timestamp * 1000).toISOString());
      })

    })
  })
}

export function prove (name1, name2) {
  return new Promise(resolve => {
    getContract().prove(name1, name2, (error, result) => {
      resolve(result)
    })
  })
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
          if (response.blockNumber === null) {
            update({pending: true, loading: false})
            resolve()
          } else {
            web3js.eth.getBlockNumber(function (error, latestBlockNumber) {
              if (error !== null) {
                console.log('Error:' + error)
              }
              const numConfirmations = (latestBlockNumber - response.blockNumber)
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



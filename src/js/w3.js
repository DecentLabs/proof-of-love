import abiDecoder from 'abi-decoder'
import { ABI, ADDRESS, TESTADDRESS } from './contract.js'
import { update, onStateChange, getState } from './state.js'
import Web3 from 'web3'

abiDecoder.addABI(ABI)
let web3js = null
let CONTRACT = null
let NETWORKID = null

function getContract () {
  if (!CONTRACT) {
    CONTRACT = getNetwork().then(netId => new web3js.eth.Contract(ABI,netId === '1' ? ADDRESS : TESTADDRESS))
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

export async function prove (name1, name2) {
  const accounts = await web3js.eth.getAccounts();
  console.log(accounts)
  const contract = await getContract();
  gtag('event','start',{
    event_category:'prove'
  })
  const result = contract.methods.prove(name1, name2).send({gas: 50000, from:accounts[0]});

  return new Promise(resolve => {
    result.once('transactionHash',(txHash) => {
      gtag('event','end',{
        event_category:'prove'
      })
      resolve(txHash)
    })
  });
}

export function getLovers (tx_hash) {
  const {rcpt, names} = getState()

  if (rcpt && names.length) {
    return Promise.resolve(false)
  }

  return web3js.eth.getTransactionReceipt(tx_hash).then(rcpt => {
    if (rcpt && rcpt.logs && rcpt.blockNumber) {
      const events = abiDecoder.decodeLogs(rcpt.logs)
      let names = []
      if (events.length) {
        names = events[0].events.map(eventData => eventData.value)
      }
      update({rcpt, names})
    }
    return true
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

  return web3js.eth.getBlock(rcpt.blockNumber).then(block => {
    if (block && block.timestamp) {
      let timestamp = new Date(block.timestamp * 1000).toISOString()
      update({timestamp})
    }
    return true
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
    NETWORKID = web3js.eth.net.getId()
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

import { ABI, ADDRESS } from './contract.js'
import { update, onStateChange, getState } from './state.js'
import Web3 from 'web3'

let web3js = null
let CONTRACT = null
let NETWORKID = '3'

function getContract() {
  console.log('getContract')
  console.log(getNetwork().then(x => console.log(x)))
  if (!CONTRACT) {
    CONTRACT = getNetwork().then(netId => new web3js.eth.Contract(ABI, ADDRESS[netId]))
  }
  console.log(CONTRACT)
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

  return web3js.eth.getTransactionReceipt(tx_hash).then(async rcpt => {

    const contract = await getContract();

    if (rcpt && rcpt.logs && rcpt.logs.length && rcpt.blockNumber) {
      const result = await contract.getPastEvents('Love',{fromBlock: rcpt.blockNumber});
      let names = []
      if (result && result.length) {
        names = [result[0].returnValues[0],result[0].returnValues[1]]
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
  console.log('confirmed',confirmed)

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
      if (error) {
        update({pending: true, hasError: true, error})
        resolve(true)
      } else {
        if (!response || response.blockNumber === null) {
          update({pending: true})
          resolve(true)
        } else {
          web3js.eth.getBlockNumber(function (error, latestBlockNumber) {
            if (error) {
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
        console.log(polls);
        const needsPolling = polls.some(poll => poll)
        update({loading: false, needsPolling})
      }), 1000)
    }
  })

  poll()
}

export function getNetwork () {
  if (!NETWORKID) {
    return web3js.eth.net.getId()
  } else {
    return new Promise(function(resolve, reject) {
      resolve(NETWORKID)
    })
  }
}

export function getNetworkUrl (id) {
  switch (id) {
    case '3':
      return 'https://ropsten.infura.io/'
    case '4':
      return 'https://rinkeby.infura.io/'
    default:
      return 'https://mainnet.infura.io/'
  }
}

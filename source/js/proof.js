import abiDecode from './abidecode.js'
import {ABI} from './contract.js'

abiDecode.addABI(ABI)

const web3js = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'))
const tx_hash = window.location.search.slice(1)

web3js.eth.getTransaction(tx_hash, function (error, response) {
  console.log(response)
  if (error !== null) {
    console.log("Error: " + error);
  }
  if (response.blockNumber === null) {
    console.log('Still mining transaction');
  }
  if (response.blockNumber > 0) {
    console.log('Tx included in block ' + response.blockNumber)

    web3js.eth.getBlockNumber(function(error, latestBlockNumber) {
        if (error !== null) {
            console.log('Error:' + error)
        }
        console.log('Latest block: ' + latestBlockNumber);
        var numConfirmations = (latestBlockNumber - response.blockNumber) + 1;
        console.log('Number of confirmations: ' + numConfirmations);
    })
  }
})

const getLovers = tx_hash => new Promise(resolve => {
  web3js.eth.getTransactionReceipt(tx_hash, function(error, rcpt) {
    const events = abiDecode.decodeLogs(rcpt.logs);
    let names = [];
    if(events.length) {
      names = events[0].events.map(eventData => eventData.value)
    }

    resolve(names);
  });
})

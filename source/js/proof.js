
const web3js = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'))

const tx_hash = window.location.search.slice(1)

web3js.eth.getTransaction(tx_hash, function (error, rcpt) {
  console.log(rcpt.input)
  if (error !== null) {
    console.log("Error: " + error);
  }
  if (rcpt.blockNumber === null) {
    console.log('Still mining transaction');
  }
  if (rcpt.blockNumber > 0) {
    console.log('Tx included in block ' + rcpt.blockNumber)

    web3js.eth.getBlockNumber(function(error, latestBlockNumber) {
        if (error !== null) {
            console.log('Error:' + error)
        }
        console.log('Latest block: ' + latestBlockNumber);
        var numConfirmations = (latestBlockNumber - rcpt.blockNumber) + 1;
        console.log('Number of confirmations: ' + numConfirmations);
    })
  }
})




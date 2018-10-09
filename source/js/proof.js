
const web3js = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'))

const tx_hash = window.location.search.slice(1)

const receipt = web3js.eth.getTransaction(tx_hash, function (error, rcpt) {
  console.log(rcpt.input)
})


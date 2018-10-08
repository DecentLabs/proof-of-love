window.addEventListener('load', function() {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
    //TODO: send names to eth
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    window.location.href='/no-metamask.html'
  }
})
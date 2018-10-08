(function() {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // Set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }



  web3.eth.getBlock(6476963, function(error, result){
    if(!error)
      console.log(JSON.stringify(result));
    else
      console.error(error);
  })

})()
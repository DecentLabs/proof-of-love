(function() {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // Set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }


  var contract_abi = [{"constant":false,"inputs":[{"name":"name1","type":"string"},{"name":"name2","type":"string"}],"name":"prove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"name1","type":"string"},{"indexed":false,"name":"name2","type":"string"}],"name":"Love","type":"event"}];
  var contract_address = '0x00CF09F905b0485e1a6b7845693DBd63c6922986';
  var tx_hash = '0x02989f908d8349cf9f248ebd02217da5d61fa27a364034dcc1405fa43dd49571'

  //var contract = new web3.eth.Contract(contract_abi, contract_address);
  var MyContract = web3.eth.contract(contract_abi);
  var c = MyContract.at(contract_address);

  var callback = function(error, rcpt) {
    console.log(error);
    var raw_data = rcpt.logs[0].data; 
    console.log(raw_data); 
    // TODO: parse the event!!!
    //console.log(web3.eth.abi.decodeLog(contract_abi[2].inputs, raw_data, []));
  }
  var receipt = web3.eth.getTransactionReceipt(tx_hash, callback);

})()
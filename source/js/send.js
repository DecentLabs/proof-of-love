window.addEventListener('load', function () {

  const name1Element = document.getElementById('name1')
  const name2Element = document.getElementById('name2')
  const sendButton = document.getElementById('send')

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    sendButton.addEventListener('click', function () {
      const name1 = name1Element.value
      const name2 = name2Element.value
      if (name1 && name2 && name1.trim().length && name2.trim().length) {
        web3 = new Web3(web3.currentProvider)
        const c = new web3.eth.contract([
          {
            'constant': false,
            'inputs': [{'name': 'name1', 'type': 'string'}, {'name': 'name2', 'type': 'string'}],
            'name': 'prove',
            'outputs': [],
            'payable': false,
            'stateMutability': 'nonpayable',
            'type': 'function'
          },
          {'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor'},
          {
            'anonymous': false,
            'inputs': [
              {'indexed': false, 'name': 'name1', 'type': 'string'},
              {'indexed': false, 'name': 'name2', 'type': 'string'}],
            'name': 'Love',
            'type': 'event'
          }]);
        const cInstance = c.at('0x00CF09F905b0485e1a6b7845693DBd63c6922986');
        var result = cInstance.prove(name1, name2);
        console.log(result) // '0x25434534534'

      }
    })
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    window.location.href = '/no-metamask.html'
  }
})
import { getWeb3, prove, getNetwork } from './w3.js'

window.addEventListener('load', function () {

  const name1Element = document.getElementById('name1')
  const name2Element = document.getElementById('name2')
  const sendButton = document.getElementById('send')

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    const web3js = getWeb3(web3.currentProvider)

    sendButton.addEventListener('click', function () {
      const name1 = name1Element.value
      const name2 = name2Element.value
      if (name1 && name2 && name1.trim().length && name2.trim().length) {
        Promise.all([
          prove(name1, name2),
          getNetwork()
        ]).then(
          ([hash, network]) => {
            window.location.href = `/proof.html?${hash}${ network !== '1' ? '@' + network : ''}`
          })
      }
    })
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    window.location.href = '/no-metamask.html'
  }
})
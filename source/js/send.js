import { getWeb3, prove, getNetwork } from './w3.js'
import { createHeart, getColorPalette } from './heart.js'

document.addEventListener('click', (e) => {
  const button = document.getElementById('flip-button')
  if (e.target === button) {
    const card = document.getElementById('card')

    card.classList.add('flip')
  }
})

window.addEventListener('load', () => {
  const loveForm = document.getElementById('love-form')
  const name1Element = document.getElementById('name1')
  const name2Element = document.getElementById('name2')
  const homeCanvas = document.getElementById('home-canvas')
  const hash = `0x${'f00f'.repeat(16)}`
  const palette = getColorPalette(true)

  createHeart(hash, homeCanvas, palette)


  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    const web3js = getWeb3(web3.currentProvider)

    loveForm.addEventListener('submit', function (event) {
      event.preventDefault()

      const name1 = name1Element.value
      const name2 = name2Element.value
      if (name1 && name2 && name1.trim().length && name2.trim().length) {
        Promise.all([
          prove(name1, name2),
          getNetwork()
        ]).then(
          ([hash, network]) => {
            if (hash !== undefined) {
              window.location.href = `/proof.html?${hash}${ network !== '1' ? '@' + network : ''}`
            }
          })
      }
    })
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    window.location.href = '/no-metamask.html'
  }
})
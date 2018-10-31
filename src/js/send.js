import { getWeb3, prove, getNetwork } from './w3.js'
import { createHeart, getColorPalette } from './heart.js'

const card = document.getElementById('card')

document.addEventListener('click', (e) => {
  const button = document.getElementById('flip-button')
  if (e.target === button) {

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

  let ready = null

  if (window.ethereum) {
    getWeb3(ethereum)
    ready = ethereum.enable()
  } else if (window.web3) {
    // Use Mist/MetaMask's provider
    getWeb3(web3.currentProvider)
    ready = Promise.resolve()
  } else {
    ready = Promise.reject()
    console.log('No web3? You should consider trying MetaMask!')
    card.classList.add('no-metamask')
  }

  ready.then(() => loveForm.addEventListener('submit', function (event) {
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
  }))
})

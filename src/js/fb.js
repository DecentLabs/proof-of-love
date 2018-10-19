import { html } from 'lit-html'
import { getState, update } from './state.js'

window.fbAsyncInit = function () {
  FB.init({
    appId: '913741655680114',
    xfbml: true,
    version: 'v3.1'
  })

  update({fbInit: true})
}

const fbShare = (names) => {
  FB.ui({
    method: 'share_open_graph',
    action_type: 'og.likes',
    action_properties: JSON.stringify({
      object: {
        title: `${names[0]} loves ${names[1]}`,
        description: `Carved forever into Ethereum Blockchain`,
        url: window.location.href
      }
    })
  })
}

export const fbButton = () => {
  const {names, fbInit} = getState()
  return (names.length && fbInit) ? html`
    <button class="button" id="share" @click="${() => fbShare(names)}">Share it on Facebook</button>
  ` : ''
}
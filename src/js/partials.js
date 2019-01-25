import { html, render } from 'lit-html'
import { getSvg } from './svg.js'
import origamiUrl from '../assets/origami.png'
import { fbButton } from './fb.js'

const heartAndNames = ({names, imageURL}) => (names.length && imageURL) ? html`
<div class="row">
<h2>${names[0]}</h2>
<img src="${imageURL}">
<h2>${names[1]}</h2>
</div>
` : ''

const timestampText = (timestamp) => (timestamp) ? html `Carved forever in the Blockchain since ${timestamp}` : ''

const timestampAndId = ({timestamp, transactionID}) => (transactionID) ? html`
<div class="row">
<p>${timestampText(timestamp)} Transaction id:
<br><span class="tx">${transactionID}</span><br>encoded into your unique heart</p>
</div>
` : ''

const printWrapper = ({imageURL, names, qrCode}) => (names.length && imageURL && qrCode) ? html`
<div class="print-wrapper">
${getSvg(imageURL, names, qrCode)}
<img src="${origamiUrl}">
</div>
` : ''

const buttonRow = ({imageURL, names},{printHandler, downloadHandler}) => (names.length && imageURL) ? html`
<div class="row button-row">
<a href="${imageURL}" @click="${downloadHandler}" class="button small" id="dl-canvas" download="${names[0]}_heart_${names[1]}.png">Download your unique heart</a>
${fbButton()}
</div>
<div class="row button-row">
<button class="button" @click="${printHandler}">Print origami heart</button>
</div>
` : ''

const main = (state, eventHandlers) => html`
${heartAndNames(state)}
${timestampAndId(state)}
${buttonRow(state, eventHandlers)}
${printWrapper(state)}
`

export function renderMain (state, element, eventHandlers) {
  render(main(state, eventHandlers), element)
}
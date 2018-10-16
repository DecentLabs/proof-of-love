import {html, render} from 'lit-html';
import {getSvg} from './svg.js'
import origamiUrl from '../assets/origami.png'

const main = (state) => (state.names.length && state.imageURL) ? html`
<div class="row">
<h2>${state.names && state.names[0]}</h2>
<img src="${state.imageURL}">
<h2>${state.names && state.names[1]}</h2>
</div>
<div class="row">
<p>Carved forever in the Blockchain since ${state.timestamp || 'now'} Transaction id:
<br><span class="tx">${state.transactionID}</span><br>encoded into your unique heart</p>
</div>
<div class="row button-row">
<a href="${state.imageURL || ''}" class="button" id="dl-canvas" download="${state.names && state.names[0]}_heart_${state.names && state.names[1]}.png">Download your unique heart</a>
<button class="button" onclick="window.print();return false;">Print</button>
<button class="button" id="share">Share it on Facebook</button>
</div>
<div class="print-wrapper">
${getSvg(state.imageURL, state.names, state.transactionID)}
<img src="${origamiUrl}">
</div>
` : ''

export function renderMain(state, element) {
  render(main(state), element)
}
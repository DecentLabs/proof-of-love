import {html, render} from 'lit-html';
import {getSvg} from './svg.js'
import origamiUrl from '../assets/origami.png'


const confirmed = (state) => html`
<div class="row">
<h2>${state.names && state.names[0]}</h2>
<canvas id="heart-canvas"></canvas>
<h2>${state.names && state.names[1]}</h2>
</div>
<div class="row">
<p>Carved forever in the Blockchain since ${state.timestamp || 'now'} Transaction id:
<br><span class="tx">${state.transactionID}</span><br>encoded into your unique heart</p>
</div>
<div class="row button-row">
<a href="${state.imageURL || ''}" class="button" id="dl-canvas" download="${state.names && state.names[0]}_heart_${state.names && state.names[1]}.png">${!state.pending && 'Download your unique heart'}</a>
<button class="button" onclick="window.print();return false;">Print</button>
</div>
<div class="print-wrapper">
${getSvg(state.imageURL, state.names, state.transactionID)}
<img src="${origamiUrl}">
</div>
`

const main = (state) => html`${confirmed(state)}`

export function renderMain(state, element) {
  render(main(state), element)
}
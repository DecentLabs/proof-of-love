import {html, render} from 'https://unpkg.com/lit-html?module';

const confirmed = (state) => html`
<div class="row">
<h2>${state.names && state.names[0]}</h2>
<canvas id="heart-canvas"></canvas>
<h2>${state.names && state.names[1]}</h2>
</div>
<p>Carved forever in the Blockchain since ${state.timestamp || 'now'} Transaction id:
<br><span class="tx">${state.transactionID}</span><br>encoded into your uniqe heart</p>
<div class="row">
<a href="" class="w-button" id="dl-canvas" download="${state.names && state.names[0]}_heart_${state.names && state.names[1]}.png">${!state.pending && 'Download your unique heart'}</a>
<button class="w-button" onclick="window.print();return false;">Print</button>
</div>
`

const main = (state) => html`${confirmed(state)}`

export function renderMain(state, element) {
  render(main(state), element)
}
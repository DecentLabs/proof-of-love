import {html, render} from 'https://unpkg.com/lit-html?module';

const pending = html`<h1>Proooooving love</h1>`

const confirmed = (state) => html`
<div class="row">
<h2>${state.names && state.names[0]}</h2>
<canvas id="heart-canvas"></canvas>
<h2>${state.names && state.names[1]}</h2>
</div>
<p>Carved forever in the Blockchain since ${state.timestamp} at<br><span class="tx">${state.transactionID}</span></p>
<a href="" id="dl-canvas" download="${state.names && state.names[0]}_heart_${state.names && state.names[1]}.png">${!state.pending && 'Download your unique heart'}</a>
<a>Save URL</a>
<a>Print</a>
`

const main = (state) => html`${state.pending ? pending : confirmed(state)}`

export function renderMain(state, element) {
  render(main(state), element)
}
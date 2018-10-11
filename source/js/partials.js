import {html, render} from 'https://unpkg.com/lit-html?module';

const pending = html`<h1>Prooving love</h1>`

const confirmed = (state) => html`
<canvas id="heart-canvas"></canvas>
<p>Carved forever in the Blockchain since ${state.timestamp} at<br><span class="tx">${state.transactionID}</span></p>
<a href="" id="dl-canvas">${!state.pending && 'Download you unique heart'}</a>
`

const main = (state) => html`<div>${state.pending ? pending : confirmed(state)}</div>`

export function renderMain(state, element) {
  render(main(state), element)
}
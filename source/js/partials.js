import {html, render} from 'https://unpkg.com/lit-html?module';

const pending = html`<h1>Proooooving love</h1>`

const confirmed = (state) => html`
<canvas id="heart-canvas"></canvas>
<p>Carved forever in the Blockchain since ${state.timestamp} at<br><span class="tx">${state.transactionID}</span></p>
`

const main = (state) => html`${state.pending ? pending : confirmed(state)}`

export function renderMain(state, element) {
  render(main(state), element)
}
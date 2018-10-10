import {html, render} from 'https://unpkg.com/lit-html?module';

const pending = html`<h1>Prooving love</h1>`

const confirmed = (state) => html`
<p>The love between <b>${state.names && state.names[0]}</b> and <b>${state.names && state.names[1]}</b>
  has been proven by carving into the blockchain</p>
<p>The transaction ID is ${state.transactionID}</p>
<canvas id="heart-canvas"></canvas>
<div>confirmed from: ${state.confirmed}</div>
`

const main = (state) => html`<div>${state.pending ? pending : confirmed(state)}</div>`

export function renderMain(state, element) {
  render(main(state), element)
}
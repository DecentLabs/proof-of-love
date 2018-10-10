import {html, render} from 'https://unpkg.com/lit-html?module';

const pending = html`<h1>Prooving love</h1>`

const confirmed = (state) => html`
<div>confirmed from: ${state.confirmed}</div>
<div>${(state.names || []).join('♥')}</div>
`

const main = (state) => html`<div>${state.pending ? pending : confirmed(state)}</div>`

export function renderMain(state, element) {
  render(main(state), element)
}
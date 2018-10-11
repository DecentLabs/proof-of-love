import {html} from 'https://unpkg.com/lit-html?module';

export const getSvg = (imageUrl, names, hash) => {
  if (!imageUrl || !names || !names.length || !hash) {
    return html``
  }

  const [name1, name2] = names
  const hash1 = hash.slice(2, 34)
  const hash2 = hash.slice(34, 66)

  return html`
<svg version="1.1" id="Layer_1" 
	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 600 600"
	 enable-background="new 0 0 600 600" xml:space="preserve">
	<g>
		<rect x="87.7" y="87.5" transform="matrix(0.7071 0.7071 -0.7071 0.7071 299.8663 -124.3195)" fill="none" stroke="#000000" stroke-miterlimit="10" width="424.5" height="424.5"/>
		<image overflow="visible" width="160" height="160" href="${imageUrl}" transform="matrix(0.8375 0 0 0.8375 233 69)"></image>
		<text transform="matrix(1 0 0 1 159.457 210.3564)" font-size="16px">${name1}</text>
		<text transform="matrix(1 0 0 1 387.5127 210.3564)" font-size="16px">${name2}</text>
		<text transform="matrix(6.123234e-17 -1 1 6.123234e-17 147.1523 360.1992)" font-size="7px">${hash1}</text>
		<text transform="matrix(6.123234e-17 1 -1 6.123234e-17 452.8472 225.8011)" font-size="7px">${hash2}</text>
	</g>
</svg>
`
}
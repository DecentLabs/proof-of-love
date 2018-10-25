import {html} from 'lit-html';

export const getSvg = (imageUrl, names) => {
  if (!imageUrl || !names || !names.length) {
    return html``
  }

  const [name1, name2] = names

  return html`
<svg version="1.1" id="Layer_1" 
	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 600 600"
	 enable-background="new 0 0 600 600" xml:space="preserve">
	<g>
		<rect x="87.7" y="87.5" transform="matrix(0.7071 0.7071 -0.7071 0.7071 299.8663 -124.3195)" fill="none" stroke="#000000" stroke-miterlimit="10" width="424.5" height="424.5"/>
		<image overflow="visible" width="160" height="160" href="${imageUrl}" transform="matrix(0.8375 0 0 0.8375 233 69)"></image>
		<text transform="matrix(1 0 0 1 159.457 210.3564)" font-size="16px">${name1}</text>
		<text transform="matrix(1 0 0 1 387.5127 210.3564)" font-size="16px">${name2}</text>
    <text transform="matrix(6.123234e-17 -1 1 6.123234e-17 91.0312 352.4873)" font-size="14px">Blockchain data</text>
    <text transform="matrix(-5.551115e-17 1 -1 -5.551115e-17 508.9863 225.8616)" font-size="14px">stays forever</text>
    <text transform="matrix(-1 0 0 -1 389.4863 410.957)" font-size="11px">https://proofoflove.digital</text>
    <text transform="matrix(6.123234e-17 -1 1 6.123234e-17 122.418 319.1738)" font-size="9px">So does this love</text>
    <text transform="matrix(6.123234e-17 1 -1 6.123234e-17 478.2148 227.8262)" font-size="9px">letter remain eternal</text>
    <text transform="matrix(6.123234e-17 -1 1 6.123234e-17 149.3677 265.6323)" font-size="9px">See the</text>
    <text transform="matrix(6.123234e-17 1 -1 6.123234e-17 451.2344 228.2332)" font-size="9px">message...</text>
    <image style="overflow:visible;" width="320" height="320" xlink:href=""  transform="matrix(0.2812 0 0 0.2812 255 300)"></image>
	</g>
</svg>
`
}
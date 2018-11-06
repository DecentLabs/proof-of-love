import {html} from 'lit-html';

export const getSvg = (imageUrl, names, qrCode) => {
  if (!imageUrl || !names || !names.length || !qrCode) {
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
    <text transform="matrix(0 -1 1 0 91.0312 352.4873)" font-size="14px" >Blockchain data</text>
    <text transform="matrix(0 1 -1 0 508.9863 227.8616)" font-size="14px" >stays forever</text>
    <text transform="matrix(0 -1 1 0 122.418 319.1738)" font-size="9px">So does this love</text>
    <text transform="matrix(0 1 -1 0 477.2148 227.8262)" font-size="9px">remain eternal</text>
    <text transform="matrix(0 -1 1 0 151.3677 287.6318)" font-size="9px" >carved into</text>
    <text transform="matrix(0 1 -1 0 448.2344 228.2332)" font-size="9px" >the blockchain</text>
    <text transform="matrix(0 -1 1 0 181.3675 265.6318)" font-size="9px" >See the</text>
    <text transform="matrix(0 1 -1 0 418.2324 228.2333)" font-size="9px" >message...</text>
    <text transform="matrix(-1 0 0 -1 412.2324 410.957)" font-size="11px">all that is captured of this love:</text>
    <text transform="matrix(-1 0 0 -1 371.4863 307.957)" font-size="9px">https://proofoflove.digital</text>
    <image height="320" overflow="visible" transform="matrix(.25 0 0 .25 259.992 320.992)" width="320" href="${qrCode}"/>
	</g>
</svg>
`
}
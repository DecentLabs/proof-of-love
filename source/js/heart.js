export const createHeart = (hash, canvas, name1 = 'Adam', name2 = 'Eve') => {
  let code = hash.slice(2) || '02989f908d8349cf9f248ebd02217da5d61fa27a364034dcc1405fa43dd49571'
  let ctx = canvas.getContext('2d')
  let bgFontSize = 66
  let heartArea = 240
  canvas.width = bgFontSize * 0.61 * 16
  canvas.height = bgFontSize * 1.2 * 4

  let start = {
    x: canvas.width / 2 - heartArea / 2,
    y: canvas.height / 2 - heartArea / 2
  }

  let colorpalette = getColorPalette()

  drawHash(code)
  drawHeart()
  drawNames(name1, name2)

  function drawHeart() {
    let positions = [
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0]
    ]

    const size = heartArea / 5
    let cell = 0

    for (let i = 0; i < positions.length; i++) {
      for (let j = 0; j < positions[i].length; j++) {
        if (positions[i][j] === 1) {
          drawPixels(j, i, cell, size)
          cell++
        }
      }
    }
  }

  function drawPixels(x, y,  cell, size) {
    let dot = size / 2
    let cellpixel = cell * 4
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        ctx.fillStyle = colorpalette[code[cellpixel]]
        ctx.fillRect(
          start.x + x * size + j * dot,
          start.y + y * size + i * dot,
          dot, dot)
        cellpixel++
      }
    }
  }

  function drawNames(name1, name2) {
    ctx.font = '36px IBM Plex Mono'
    ctx.textAlign = 'right'
    ctx.fillText(name1, canvas.width / 2 - (heartArea * 2 / 3), canvas.height / 2)
    ctx.textAlign = 'left'
    ctx.fillText(name2, canvas.width / 2 + (heartArea * 2 / 3), canvas.height / 2)
  }

  function drawHash(code) {
    const lineHeight = 1.1

    ctx.font = `${bgFontSize}px IBM Plex Mono`
    ctx.fillStyle = '#ededed'
    ctx.textAlign = 'left'

    for (let i = 0; i < Math.ceil(code.length / 16); i++) {
      let chunk = code.slice(i*16, (i + 1) * 16)
      ctx.fillText(chunk, 0, (i+1) * bgFontSize * lineHeight)
    }
  }

  function getColorPalette() {
    let palette = {}
    for (let i = 0; i < 16; i++) {
      let index = i.toString(16)
      let r = i * 16 + 8
      let b = i * 16 * 0.52 + 8
      let g = i * 16 * 0.32 + 8
      palette[index] = `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`
    }
    return palette
  }

  function downloadCanvas() {

  }
}

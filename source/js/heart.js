let code = '02989f908d8349cf9f248ebd02217da5d61fa27a364034dcc1405fa43dd49571'
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.width = 160
canvas.height = 160


let colorpalette = getColorPalette()

drawHeart()

function drawHeart() {
  let positions = [
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0]
  ]

  let size = canvas.width / 5
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
      ctx.fillRect(x * size + j * dot, y * size + i * dot, dot, dot)
      cellpixel++
    }
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

export const createHeart = (hash, canvas, palette) => {
  const code = hash.slice(2)
  const ctx = canvas.getContext('2d')
  canvas.width = 160
  canvas.height = 160

  const positions = makeHeart(code)
  drawHeart(positions)

  function getPositions() {
    const ascii = '00001111000011110000000111111001111110000011111111111111110001111111111111111110011111111111111111101111111111111111111111111111111111111111111111111111111111110111111111111111111001111111111111111110001111111111111111000011111111111111110000011111111111111000000011111111111100000000011111111110000000000011111111000000000000011111100000000000000011110000000000000000011000000000'

    let positions = []
    for (let i = 0; i < ascii.length; i++) {
      if (ascii[i] === '1') {
        let pos = {
          x: i % 20,
          y: Math.floor(i / 20)
        }
        positions.push(pos)
      }

    }

    return positions
  }

  function getHexChunk(hex) {
    return parseInt(hex, 16).toString(2).padStart(4, '0')
  }


  function makeHeart(hash) {
    const positions = getPositions()

    for (let i = 0; i < 64; i++) {
     const hex = hash[i]
     const binary = getHexChunk(hex)

     for (let j = 0; j < 4; j++) {
       const bit = binary[j]
       const color = palette[parseInt(bit, 10)][j]
       const index = i * 4 + j
       positions[index].color = color
     }
    }

    return positions
  }

  function drawHeart(positions) {
    const size = canvas.width / 20
    for (let i = 0; i < positions.length; i++) {
      let pixel = positions[i]
      ctx.fillStyle = pixel.color
      ctx.fillRect(
        pixel.x * size,
        pixel.y * size,
        size, size
      )
    }
  }
}

export function getColorPalette(bw=false) {
  let palette = [[], []]
  for (let i = 0; i < 8; i++) {
    let hue = 342
    let saturation = bw ? '0%' : '80%'
    let lightness = i < 4 ? `${i * 14 + 8}%` : `${i * 10}%`
    let color = `hsl(${hue}, ${saturation}, ${lightness})`
    if (i < 4) {
      palette[0].push(color)
    } else {
      palette[1].push(color)
    }
  }
  return palette
}

export function toDataURL(canvas) {
  return canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
}
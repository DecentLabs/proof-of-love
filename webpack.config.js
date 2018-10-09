const path = require('path')
module.exports = {
  entry: './lib/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './source/js'),
    filename: 'lib.js',
    libraryTarget: 'assign',
    library: 'export const pol'
  }
}
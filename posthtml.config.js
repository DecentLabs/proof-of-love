module.exports = {
  plugins: {
    'posthtml-modules': {
        root: __dirname, // (String) root path for modules lookup,
        plugins: [], // (Array || Function) posthtml plugins to apply for every parsed module, if a function provided – it will be called with module's file path
        from: '', // (String) root filename for processing apply, needed for path resolving (it's better to always provide it),
        initial: true // (Boolean) apply plugins to root file after modules processing
    },
    'posthtml-include': {
      root: __dirname, // (String) root path for modules lookup,
    }
  }
}
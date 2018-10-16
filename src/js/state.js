let STATE = {}

let onStateChangeMethods = []

export function onStateChange (callback, filter = []) {
  onStateChangeMethods.push({callback, filter})
}

export function update (newState) {
  const oldState = STATE
  const updatedKeys = new Set(Object.keys(newState))
  console.log(newState)
  STATE = Object.assign({}, STATE, newState)
  onStateChangeMethods.forEach(({callback, filter}) => {
    if (filter.length === 0 || filter.some(key => updatedKeys.has(key))) {
      callback({state: STATE, oldState, updatedKeys})
    }
  })
}

export function getState () {
  return STATE
}
let STATE = {}

let onStateChangeMethods = []

export function onStateChange(callback) {
  onStateChangeMethods.push(callback)
}

export function update(newState) {
  const oldState = STATE;
  const updatedKeys = new Set(Object.keys(newState));
  console.log(newState);
  STATE = Object.assign({}, STATE, newState)
  onStateChangeMethods.forEach(callback => callback({state: STATE, oldState, updatedKeys}))
}

export function getState() {
  return STATE;
}
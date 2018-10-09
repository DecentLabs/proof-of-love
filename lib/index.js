import Web3 from 'web3'

export function init(provider) {
  return new Web3(provider)
}

export function initWithUrl(url) {
  return init(new Web3.providers.HttpProvider(url))
}

export function initContract(web3, abi, address) {
  return new web3.eth.Contract(abi, address)
}

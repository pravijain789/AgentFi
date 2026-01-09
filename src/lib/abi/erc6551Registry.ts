export const registryAbi = [
  {
    "inputs": [
      { "internalType": "address", "name": "implementation", "type": "address" },
      { "internalType": "uint256", "name": "chainId", "type": "uint256" },
      { "internalType": "address", "name": "tokenContract", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "internalType": "uint256", "name": "salt", "type": "uint256" }
    ],
    "name": "account",
    "outputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "implementation", "type": "address" },
      { "internalType": "uint256", "name": "chainId", "type": "uint256" },
      { "internalType": "address", "name": "tokenContract", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "internalType": "uint256", "name": "salt", "type": "uint256" }
    ],
    "name": "createAccount",
    "outputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const { LAMPORTS_PER_SOL } = require('@solana/web3.js');

/**
 * Contructor
 */
var configs = {};

/**
 * Development configurations
 */
configs.development = {
  coinbase: {
    address: 'HNuQFgpiZV6Mex9CSnZKs4EEAVzH9g3KnL8WwVwo72un',
    secretKey: '158fb85c0ab799efd946a7ed18d9a68ad4d669ff2a84a7c2992b751072fd7889f357700e52edf26f741c9f9d0143a09c620eb7f1489951fa1245fe8431f16ba9',
  },
  node: 'https://devnet.solana.com',
  tokenFactoryAddress: 'JCbHuGZyQiC9abPpEHfs6W8evgumEYthpqqBsgDRewa8',
  tokens: ['8FEeLWU2U6LdwoCz1vHFssTMtzQUNwP5cvwP2ohrMYcE', '4cTjQrw4qUU8fKFBVS8K9de3HJRn3bk6d445BMJ5aUXd'],
  tokenAccounts: ['CxtUFA7ThVJYjJor8rtNffQiVaL7cjFHtXeuvVtSWwS5', '7iHxtkpDuF4evhpBsUQLeVTWjtQuTj6Gdw33bCp9gyop'],
  airdropAmount: 100000000000n, // 100 tokens
  lamports: 0.1 * LAMPORTS_PER_SOL, // 0.01 SOL
};

/**
 * Staging configurations
 */
configs.staging = {
  coinbase: {
    address: 'HNuQFgpiZV6Mex9CSnZKs4EEAVzH9g3KnL8WwVwo72un',
    secretKey: '158fb85c0ab799efd946a7ed18d9a68ad4d669ff2a84a7c2992b751072fd7889f357700e52edf26f741c9f9d0143a09c620eb7f1489951fa1245fe8431f16ba9',
  },
  node: 'https://devnet.solana.com',
  tokenFactoryAddress: 'JCbHuGZyQiC9abPpEHfs6W8evgumEYthpqqBsgDRewa8',
  tokens: ['8FEeLWU2U6LdwoCz1vHFssTMtzQUNwP5cvwP2ohrMYcE', '4cTjQrw4qUU8fKFBVS8K9de3HJRn3bk6d445BMJ5aUXd'],
  tokenAccounts: ['CxtUFA7ThVJYjJor8rtNffQiVaL7cjFHtXeuvVtSWwS5', '7iHxtkpDuF4evhpBsUQLeVTWjtQuTj6Gdw33bCp9gyop'],
  airdropAmount: 100000000000n, // 100 tokens
  lamports: 0.1 * LAMPORTS_PER_SOL, // 0.01 SOL
};

/**
 * Production configurations
 */
configs.production = {
  coinbase: {
    address: null,
    secretKey: null,
  },
  node: 'http://localhost:8899',
  tokenFactoryAddress: 'D5cRXHjf8aMpdSgjTMf2tGuEJRSEF5azVGbYmKZeRFxc',
  tokens: [],
  tokenAccounts: [],
  airdropAmount: 0n, // 0 tokens
  lamports: 0 * LAMPORTS_PER_SOL, // 0 SOL
};

/**
 * Module exports
 */
module.exports = configs;
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
    address: '5vHjWRc2hys4XwZkMktg35N8oALt5d1ZXYkwCXXX3JHm',
    secretKey: 'e06a1a17cf400f6c322e32377a9a7653eecf58f3eb0061023b743c689b43a5fa491573553e4afdcdcd1c94692a138dd2fd0dc0f6946ef798ba34ac1ad00b3720',
  },
  node: 'https://devnet.solana.com',
  spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  swapAddress: 'D8UuF1jPr5gtxHvnVz3HpxP2UkgtxLs9vwz7ecaTkrGy',
  mints: ['8jk4eJymMfNZV9mkRNxJEt2VJ3pRvdJvD5FE94GXGBPM', '27hdcZv7RtuMp75vupThR3T4KLsL61t476eosMdoec4c', '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'],
  accounts: ['4mBj4rqzwGZNJSwQT6ErjNhpJdT2DjYm7ShpepvXP9W8', '8UMCo415r51DBrjeTXCkmazwrgxTn6yvupvh3F1SvuQz', '5UaNrW6GvGLzGBxwVp5Re2UY395n3nPt56skK2KLeheA'],
  airdropAmount: 100000000000n, // 100 tokens
};

/**
 * Staging configurations
 */
configs.staging = {
  coinbase: {
    address: '5vHjWRc2hys4XwZkMktg35N8oALt5d1ZXYkwCXXX3JHm',
    secretKey: 'e06a1a17cf400f6c322e32377a9a7653eecf58f3eb0061023b743c689b43a5fa491573553e4afdcdcd1c94692a138dd2fd0dc0f6946ef798ba34ac1ad00b3720',
  },
  node: 'https://devnet.solana.com',
  spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  swapAddress: 'D8UuF1jPr5gtxHvnVz3HpxP2UkgtxLs9vwz7ecaTkrGy',
  mints: ['8jk4eJymMfNZV9mkRNxJEt2VJ3pRvdJvD5FE94GXGBPM', '27hdcZv7RtuMp75vupThR3T4KLsL61t476eosMdoec4c', '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'],
  accounts: ['4mBj4rqzwGZNJSwQT6ErjNhpJdT2DjYm7ShpepvXP9W8', '8UMCo415r51DBrjeTXCkmazwrgxTn6yvupvh3F1SvuQz', '5UaNrW6GvGLzGBxwVp5Re2UY395n3nPt56skK2KLeheA'],
  airdropAmount: 100000000000n, // 100 tokens
};

/**
 * Production configurations
 */
configs.production = {
  coinbase: {
    address: null,
    secretKey: null,
  },
  node: 'https://api.mainnet-beta.solana.com',
  spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  swapAddress: 'D8UuF1jPr5gtxHvnVz3HpxP2UkgtxLs9vwz7ecaTkrGy',
  mints: [],
  accounts: [],
  airdropAmount: 0n, // 0 tokens
};

/**
 * Module exports
 */
module.exports = configs;
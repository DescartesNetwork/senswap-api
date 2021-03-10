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
  mints: ['8jk4eJymMfNZV9mkRNxJEt2VJ3pRvdJvD5FE94GXGBPM', '27hdcZv7RtuMp75vupThR3T4KLsL61t476eosMdoec4c'],
  accounts: ['4mBj4rqzwGZNJSwQT6ErjNhpJdT2DjYm7ShpepvXP9W8', '8UMCo415r51DBrjeTXCkmazwrgxTn6yvupvh3F1SvuQz'],
  airdropAmount: 100000000000n, // 100 tokens
  lamports: 0.1 * LAMPORTS_PER_SOL, // 0.01 SOL
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
  mints: ['8jk4eJymMfNZV9mkRNxJEt2VJ3pRvdJvD5FE94GXGBPM', '27hdcZv7RtuMp75vupThR3T4KLsL61t476eosMdoec4c'],
  accounts: ['9W3JQdp1pUerAHtXUgVDmYrAtM8oSB7s5a1VQdBL6ifn', '3e7nCzPJiqwFf7opkvoHc9cdyzdrwmzTanStDJSKZkjn'],
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
  node: 'https://devnet.solana.com',
  spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  mints: [],
  accounts: [],
  airdropAmount: 0n, // 0 tokens
  lamports: 0 * LAMPORTS_PER_SOL, // 0 SOL
};

/**
 * Module exports
 */
module.exports = configs;
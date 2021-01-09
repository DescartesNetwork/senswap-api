/**
 * Contructor
 */
var configs = {};

/**
 * Development configurations
 */
configs.development = {
  coinbase: {
    address: '4QCAA5sjpf2m6Mweu5UkQcuqbLCA6sVJS9eK6VEocCnj',
    secretKey: 'd5209524464e438e740a4c75c40a84eed298ee5e621396054e66074a957ebd9c3284091f5c1a113eb756ddc4e077e9e86b0383710a03af41778ff1a7288bafe0',
  },
  node: 'http://localhost:8899',
  tokenFactoryAddress: 'BcfSEsgAp5cfTS18CQTWibq63KJoR2Rkd6ENXu5AyaWU',
  tokens: ['3ywMF3fJ9UjaUYpsGWptXX6xnK8DbqBtpi8t2nyJJ1Nu'],
  tokenAccounts: ['GUmSeA4Kg1Xb1J3qwv35y7FJG1VkrEPTAEQwgKqYRGvd'],
  airdropAmount: 100000000000n, // 100 SPRX
};

/**
 * Staging configurations
 */
configs.staging = {
  coinbase: {
    address: null,
    secretKey: null,
  },
  node: 'http://localhost:8899',
  tokenFactoryAddress: 'D5cRXHjf8aMpdSgjTMf2tGuEJRSEF5azVGbYmKZeRFxc',
  tokens: [],
  tokenAccounts: [],
  airdropAmount: 10
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
  airdropAmount: 10
};

/**
 * Module exports
 */
module.exports = configs;
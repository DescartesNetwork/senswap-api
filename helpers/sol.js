const configs = global.configs;
const {
  Account, Connection, PublicKey, Transaction,
  LAMPORTS_PER_SOL, SystemProgram, sendAndConfirmTransaction,
  TransactionInstruction,
} = require('@solana/web3.js');
const soproxABI = require('soprox-abi');

/**
 * Constants
 */
const ACCOUNT_SCHEMA = [
  { key: 'owner', type: 'pub' },
  { key: 'token', type: 'pub' },
  { key: 'amount', type: 'u64' },
  { key: 'initialized', type: 'bool' }
];
const TOKEN_SCHEMA = [
  { key: 'symbol', type: '[char;4]' },
  { key: 'total_supply', type: 'u64' },
  { key: 'decimals', type: 'u8' },
  { key: 'initialized', type: 'bool' }
];

/**
 * Main
 */
const SOL = {}

SOL.isAddress = (address) => {
  try {
    const publicKey = new PublicKey(address);
    if (!publicKey) throw new Error('Invalid public key');
    return true;
  } catch (er) {
    return false;
  }
}

SOL.fromSecretKey = (secretKey) => {
  const account = new Account(Buffer.from(secretKey, 'hex'));
  return account;
}

SOL.fromAddress = (address) => {
  const publicKey = new PublicKey(address);
  return publicKey;
}

SOL.createConnection = () => {
  const { sol: { node } } = configs;
  const connection = new Connection(node, 'recent');
  return connection;
}

SOL.transfer = (amount, tokenPublicKey, srcPublickey, dstPublickey, payer) => {
  return new Promise((resolve, reject) => {
    const connection = SOL.createConnection();
    const { sol: { tokenFactoryAddress } } = configs;
    const programId = SOL.fromAddress(tokenFactoryAddress);

    const layout = new soproxABI.struct(
      [
        { key: 'code', type: 'u8' },
        { key: 'amount', type: 'u64' }
      ],
      { code: 3, amount });
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: payer.publicKey, isSigner: true, isWritable: false },
        { pubkey: tokenPublicKey, isSigner: false, isWritable: false },
        { pubkey: srcPublickey, isSigner: false, isWritable: true },
        { pubkey: dstPublickey, isSigner: false, isWritable: true },
      ],
      programId,
      data: layout.toBuffer()
    });
    const transaction = new Transaction();
    transaction.add(instruction);
    return sendAndConfirmTransaction(
      connection, transaction, [payer],
      {
        skipPreflight: true,
        commitment: 'recent'
      }).then(txId => {
        return resolve(txId);
      }).catch(er => {
        console.error(er);
        return reject('Cannot transfer token')
      });
  });
}

module.exports = SOL;
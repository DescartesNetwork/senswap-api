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
const POOL_SCHEMA = [
  { key: 'token', type: 'pub' },
  { key: 'treasury', type: 'pub' },
  { key: 'reserve', type: 'u64' },
  { key: 'lpt', type: 'u64' },
  { key: 'fee_numerator', type: 'u64' },
  { key: 'fee_denominator', type: 'u64' },
  { key: 'initialized', type: 'bool' }
];

/**
 * Main
 */
const SOL = {}

SOL.toSymbol = (symbol) => {
  if (!symbol) return '';
  return symbol.join('').replace(/\u0000/g, '').replace(/-/g, '');
}

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

SOL.getPurePoolData = (poolAddress) => {
  return new Promise((resolve, reject) => {
    if (!poolAddress) return reject('Invalid public key');
    const connection = SOL.createConnection();
    let result = { address: poolAddress }
    return connection.getAccountInfo(SOL.fromAddress(poolAddress)).then(({ data: poolData }) => {
      if (!poolData) return reject(`Cannot find data of ${result.address}`);
      const poolLayout = new soproxABI.struct(POOL_SCHEMA);
      poolLayout.fromBuffer(poolData);
      let treasury = { address: poolLayout.value.treasury };
      let token = { address: poolLayout.value.token };
      result = { ...result, ...poolLayout.value, treasury, token };
      return connection.getAccountInfo(SOL.fromAddress(result.token.address));
    }).then(({ data: tokenData }) => {
      if (!tokenData) return reject(`Cannot find data of ${result.token.address}`);
      const tokenLayout = new soproxABI.struct(TOKEN_SCHEMA);
      tokenLayout.fromBuffer(tokenData);
      result.token = { ...result.token, ...tokenLayout.value };
      return connection.getAccountInfo(SOL.fromAddress(result.treasury.address));
    }).then(({ data: treasuryData }) => {
      if (!treasuryData) return reject(`Cannot find data of ${result.treasury.address}`);
      const treasuryLayout = new soproxABI.struct(ACCOUNT_SCHEMA);
      treasuryLayout.fromBuffer(treasuryData);
      result.treasury = { ...result.treasury, ...treasuryLayout.value };
      return resolve(result);
    }).catch(er => {
      console.error(er);
      return reject('Cannot read data');
    });
  });
}

SOL.transferLamports = (lamports, dstPublickey, payer) => {
  return new Promise((resolve, reject) => {
    const connection = SOL.createConnection();
    const instruction = SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: dstPublickey,
      lamports
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
        return reject('Cannot transfer lamports');
      });
  });
}

SOL.transferToken = (amount, tokenPublicKey, srcPublickey, dstPublickey, payer) => {
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
        return reject('Cannot transfer token');
      });
  });
}

module.exports = SOL;
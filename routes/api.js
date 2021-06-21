const express = require('express');
const router = express.Router();

/**
 * Middlewares & Graphs
 */
const {
  auth, faucet, user, pool, mint, ping, stakePool
} = require('../controllers');

/**
 * Convention
 * @method GET: get data
 * @method POST: add new data
 * @method PUT: update data
 * @method DELETE: delete data
 */

// Healthcheck
router.get('/', ping.ok);

// User
router.get('/user', user.getUser);
router.post('/user', user.addUser);
router.put('/user', auth.bearerToken('admin'), user.updateUser);
router.delete('/user', auth.bearerToken('admin'), user.deleteUser);

// Faucet
router.get('/faucet', faucet.getWhiteList);
router.post('/faucet/airdrop', auth.preventSpam, faucet.airdrop);

// Pool
router.get('/pool', pool.getPool);
router.get('/pools', pool.getPools);
router.post('/pool', pool.parsePool, pool.addPool);
router.put('/pool', auth.bearerToken('operator'), pool.updatePool);
router.delete('/pool', auth.bearerToken('admin'), pool.deletePool);

// Mint
router.get('/mint', mint.getMint);
router.get('/mints', mint.getMints);
router.post('/mint', auth.bearerToken('operator'), mint.addMint);
router.put('/mint', auth.bearerToken('operator'), mint.updateMint);
router.delete('/mint', auth.bearerToken('operator'), mint.deleteMint);

// Ping
router.get('/ping', ping.ok);
router.post('/ping', auth.bearerToken('user'), ping.ok);
router.put('/ping', auth.bearerToken('user'), ping.ok);
router.delete('/ping', auth.bearerToken('user'), ping.ok);

// Stake Pool (Farming)
router.get('/stake-pools', stakePool.getStakePools);
router.post('/stake-pool', stakePool.addStakePool);
/**
 * Module exports
 */
module.exports = router;
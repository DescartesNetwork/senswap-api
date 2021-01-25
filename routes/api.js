const express = require('express');
const router = express.Router();

/**
 * Middlewares & Graphs
 */
const {
  auth, faucet, user, pool,
} = require('../controllers');

/**
 * Convention
 * @method GET: get data
 * @method POST: add new data
 * @method PUT: update data
 * @method DELETE: delete data
 */

// User
router.get('/user', user.getUser);
router.post('/user', user.addUser);
router.put('/user', user.updateUser);
router.delete('/user', user.deleteUser);

// Faucet
router.get('/faucet', faucet.getWhiteList);
router.post('/faucet/tokens', auth.preventSpam, faucet.airdrop);
router.post('/faucet/lamports', auth.preventSpam, faucet.lamports);

// Pool
router.get('/pool', pool.getPool);
router.get('/pools', pool.getPools);
router.post('/pool', pool.parsePool, pool.addPool);
// router.put('/pool', pool.updatePool);
// router.delete('/pool', pool.deletePool);

/**
 * Module exports
 */
module.exports = router;
var express = require('express');
var router = express.Router();

/**
 * Middlewares & Graphs
 */
var {
  auth, user, file, item,
  project, order, recommendation,
  comment, feeling, stat,
} = require('../controllers');

/**
 * Convention
 * @method GET: get data
 * @method POST: add new data
 * @method PUT: update data
 * @method DELETE: delete data
 */

// User (core)
router.get('/user', user.getUser);
router.post('/user', user.addUser);
router.put('/user', user.updateUser);
// router.delete('/user', user.deleteUser);

/**
 * Module exports
 */
module.exports = router;
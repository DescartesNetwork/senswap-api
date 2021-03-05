const configs = global.configs;
const swap = global.swap;

const ssjs = require('senswapjs');

const db = require('../db');


module.exports = {

  /**
   * Moddileware to parse pool data
   * @function parsePool
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  parsePool: function (req, res, next) {
    const { pool } = req.body;
    if (!pool || !pool.address) return next('Invalid input');
    return swap.getPoolData(pool.address).then(data => {
      const { mint: { address } } = data;
      req.body.pool.mint = address;
    }).then(re => {
      return ssjs.symbolFromCGK(pool.cgk);
    }).then(symbol => {
      req.body.pool.symbol = symbol;
      return next();
    }).catch(er => {
      return next(er);
    });
  },

  /**
   * Get an pool
   * @function getPool
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getPool: function (req, res, next) {
    const { _id } = req.query;
    if (!_id) return next('Invalid input');

    return db.Pool.findOne({ _id }, function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Get pools
   * @function getPools
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getPools: function (req, res, next) {
    const condition = req.query.condition || {}
    const limit = req.query.limit || configs.db.LIMIT_DEFAULT;
    const page = req.query.page || configs.db.PAGE_DEFAULT;

    return db.Pool.aggregate([
      { $match: condition },
      { $sort: { createdAt: -1 } },
      { $skip: limit * page },
      { $limit: limit },
      { $project: { _id: 1 } }
    ]).exec(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re, pagination: { limit, page } });
    });
  },

  /**
   * Add a pool
   * @function addPool
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addPool: function (req, res, next) {
    const { pool } = req.body;
    if (!pool) return next('Invalid input');

    return swap.getPoolData(pool.address).then(({ mint }) => {
      pool.mint = mint.address;
      const newPool = new db.Pool({ ...pool });
      return newPool.save(function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
    }).catch(er => {
      return next(er);
    });
  },

  /**
   * Update a pool
   * @function updatePool
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  updatePool: function (req, res, next) {
    const { pool } = req.body;
    if (!pool) return next('Invalid input');

    return db.Pool.findOneAndUpdate(
      { _id: pool._id },
      { ...pool },
      { new: true },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Delete a pool
   * @function deletePool
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  deletePool: function (req, res, next) {
    const { pool } = req.body;
    if (!pool) return next('Invalid input');

    return db.Pool.findOneAndDelete({ _id: pool._id }, function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },
}
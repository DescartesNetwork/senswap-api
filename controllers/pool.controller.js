const configs = global.configs;
const swap = global.swap;

const db = require('../db');


module.exports = {

  /**
   * Middleware to parse pool data
   * @function parsePool
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  parsePool: function (req, res, next) {
    const { pool } = req.body;
    if (!pool || !pool.address) return next('Invalid input');
    return swap.getPoolData(pool.address).then(data => {
      const {
        mint_lpt: { address: mintLPT },
        mint_s: { address: mintS },
        mint_a: { address: mintA },
        mint_b: { address: mintB },
      } = data;
      req.body.pool.mintLPT = mintLPT;
      req.body.pool.mintS = mintS;
      req.body.pool.mintA = mintA;
      req.body.pool.mintB = mintB;
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

      let data = re.toObject();
      if (!data) return res.send({ status: 'OK', data });

      const { mintS, mintA, mintB } = re;
      const mintAddresses = [mintS, mintA, mintB];
      return Promise.all(mintAddresses.map(address => db.Mint.findOne({ address }))).then(re => {
        re.forEach(mintData => {
          if (data.mintS == mintData.address) data.mintS = mintData.toObject();
          if (data.mintA == mintData.address) data.mintA = mintData.toObject();
          if (data.mintB == mintData.address) data.mintB = mintData.toObject();
        });
        data.mintLPT = { address: data.mintLPT }
        return res.send({ status: 'OK', data });
      }).catch(er => {
        return next('Database error');
      });
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

    let paging = [{ $skip: limit * page }, { $limit: limit }]
    if (limit == -1) paging = []

    return db.Pool.aggregate([
      { $match: condition },
      { $sort: { createdAt: -1 } },
      ...paging,
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

    const newPool = new db.Pool({ ...pool });
    return newPool.save(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
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
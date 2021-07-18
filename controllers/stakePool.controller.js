const configs = global.configs;

const ssjs = require('senswapjs');

const db = require("../db");


module.exports = {

  /**
   * Get a stake pool
   * @function getStakePool
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getStakePool: function (req, res, next) {
    const { address } = req.query;
    if (!ssjs.isAddress(address)) return next('Invalid input');

    return db.StakePool.findOne({ address }, function (er, re) {
      if (er) return next('Database error');
      if (!re) return res.send({ status: 'OK', data: {} });

      const stakePoolData = re.toObject();
      const { mintLPT } = stakePoolData;
      return db.Pool.findOne({ mintLPT }, async function (er, re) {
        if (er) return next('Database error');
        if (!re) return res.send({ status: 'OK', data: {} });

        try {
          const { mintS, mintA, mintB } = re.toObject();
          const mintData = await Promise.all([mintS, mintA, mintB].map(address => db.Mint.findOne({ address })));
          stakePoolData.mintS = mintData[0];
          stakePoolData.mintA = mintData[1];
          stakePoolData.mintB = mintData[2];
          return res.send({ status: 'OK', data: stakePoolData });
        } catch (er) {
          return next('Database error');
        }
      });
    });
  },

  /**
   * Get stake pools
   * @function getStakePools
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getStakePools: function (req, res, next) {
    const condition = req.query.condition || {};
    const limit = req.query.limit || configs.db.LIMIT_DEFAULT;
    const page = req.query.page || configs.db.PAGE_DEFAULT;

    let paging = [{ $skip: limit * page }, { $limit: limit }];
    if (limit == -1) paging = [];

    return db.StakePool.aggregate([
      { $match: condition },
      { $sort: { createdAt: -1 } },
      ...paging,
      { $project: { address: 1 } }
    ]).exec(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re, pagination: { limit, page } });
    });
  },

  /**
   * Add a stake pool
   * @function addStakePool
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addStakePool: function (req, res, next) {
    const { stakePool } = req.body;
    if (!stakePool) return next('Invalid input');

    const newStakePool = new db.StakePool({ ...stakePool });
    return newStakePool.save(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },
};

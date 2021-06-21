const configs = global.configs;
const db = require('../db');


module.exports = {

  /**
   * Get StakePools
   * @function getStakePools
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getStakePools: function (req, res, next) {
    const condition = req.query.condition || {}
    const limit = req.query.limit || configs.db.LIMIT_DEFAULT;
    const page = req.query.page || configs.db.PAGE_DEFAULT;

    let paging = [{ $skip: limit * page }, { $limit: limit }]
    if (limit == -1) paging = []

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
   * Add a StakePool
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

}
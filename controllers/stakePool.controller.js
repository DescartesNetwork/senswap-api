const configs = global.configs;
const db = require("../db");

module.exports = {
  /**
   * Get an pool
   * @function getStakePool
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getStakePool: function (req, res, next) {
    const { address } = req.query;

    return db.StakePool.findOne({ address }, async function (er, re) {
      if (er) return next("Database error");
      const stakePoolData = re.toObject();
      const { mintLPT } = stakePoolData;

      await db.Pool.findOne({ mintLPT }, async function (er, re) {
        let pool = re.toObject();
        const { mintS, mintA, mintB } = pool;
        const mintData = await Promise.all([mintS, mintA, mintB].map((address) => db.Mint.findOne({ address })));
        stakePoolData.mintS = mintData[0];
        stakePoolData.mintA = mintData[1];
        stakePoolData.mintB = mintData[2];
        return res.send({ status: "OK", data: stakePoolData });
      });
    });
  },
  /**
   * Get StakePools
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

    return db.StakePool.aggregate([{ $match: condition }, { $sort: { createdAt: -1 } }, ...paging, { $project: { address: 1 } }]).exec(function (er, re) {
      if (er) return next("Database error");
      return res.send({ status: "OK", data: re, pagination: { limit, page } });
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
    if (!stakePool) return next("Invalid input");
    console.log("stakePool", stakePool);
    const newStakePool = new db.StakePool({ ...stakePool });

    return newStakePool.save(function (er, re) {
      if (er) return next("Database error");
      return res.send({ status: "OK", data: re });
    });
  },
};

const configs = global.configs;

const ssjs = require('senswapjs');

const db = require('../db');


module.exports = {

  /**
   * Get an mint
   * @function getMint
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getMint: function (req, res, next) {
    const { address } = req.query;
    if (!ssjs.isAddress(address)) return next('Invalid input');

    return db.Mint.findOne({ address }, function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Get mints
   * @function getMints
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getMints: function (req, res, next) {
    const condition = req.query.condition || {}
    const limit = req.query.limit || configs.db.LIMIT_DEFAULT;
    const page = req.query.page || configs.db.PAGE_DEFAULT;

    let paging = [{ $skip: limit * page }, { $limit: limit }]
    if (limit == -1) paging = []

    return db.Mint.aggregate([
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
   * Add a mint
   * @function addMint
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addMint: function (req, res, next) {
    const { mint } = req.body;
    if (!mint) return next('Invalid input');

    const newMint = new db.Mint({ ...mint });
    return newMint.save(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Update a mint
   * @function updateMint
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  updateMint: function (req, res, next) {
    const { mint } = req.body;
    if (!mint) return next('Invalid input');

    return db.Mint.findOneAndUpdate(
      { _id: mint._id },
      { ...mint },
      { new: true },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Delete a mint
   * @function deleteMint
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  deleteMint: function (req, res, next) {
    const { mint } = req.body;
    if (!mint) return next('Invalid input');

    return db.Mint.findOneAndDelete({ _id: mint._id }, function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },
}
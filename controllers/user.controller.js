var configs = global.configs;

var db = require('../db');


module.exports = {

  /**
   * Get an user
   * @function getUser
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getUser: function (req, res, next) {
    const { address } = req.query;
    if (!address) return next('Invalid inputs');

    return db.User.findOne(
      { address },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Get users
   * @function getUsers
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getUsers: function (req, res, next) {
    const condition = req.query.condition || {}
    const limit = req.query.limit || configs.db.LIMIT_DEFAULT;
    const page = req.query.page || configs.db.PAGE_DEFAULT;

    return db.User.aggregate([
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
   * Add an user
   * @function addUser
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addUser: function (req, res, next) {
    const { user } = req.body;
    if (!user) return next('Invalid inputs');

    const newUser = new db.User({ ...user });
    return newUser.save(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Update an user
   * @function updateUser
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  updateUser: function (req, res, next) {
    const { user } = req.body;
    if (!user) return next('Invalid inputs');

    return db.User.findOneAndUpdate(
      { _id: user._id },
      { ...user },
      { new: true },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Delete an user
   * @function deleteUser
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  deleteUser: function (req, res, next) {
    const { user } = req.body;
    if (!user) return next('Invalid inputs');

    return db.Item.findOneAndDelete(
      { _id: user._id },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },
}
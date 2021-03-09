const db = require('../db');


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
    if (!address) return next('Invalid input');

    return db.User.findOne({ address }, function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
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
    if (!user) return next('Invalid input');

    delete user.role;
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
    if (!user) return next('Invalid input');
    
    delete user.role;
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
    if (!user) return next('Invalid input');

    return db.User.findOneAndDelete({ _id: user._id }, function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },
}
module.exports = {

  /**
   * For testing only
   * @function ping
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  ok: function (req, res, next) {
    return res.send({ status: 'OK', data: 'keep 2 of 4' });
  }
}
const configs = global.configs;

const db = require('../db');


module.exports = {

  /**
   * Prevent spam request
   * @function preventSpam
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  preventSpam: function (req, res, next) {
    const { settings: { tpm } } = configs;
    const { connection: { remoteAddress } } = req;
    if (!remoteAddress) return next('Invalid input');

    return db.IP.findOne({ ipAddress: remoteAddress }, function (er, re) {
      if (er) return next('Database error');
      if (!re) {
        const newIP = new db.IP({ ipAddress: remoteAddress });
        return newIP.save(function (er) {
          if (er) return next('Database error');
          return next();
        });
      }
      if (re.tpm >= tpm) return next('Too many requests');
      return db.IP.findOneAndUpdate(
        { ipAddress: remoteAddress },
        { tpm: re.tpm + 1 },
        { new: true },
        function (er, re) {
          if (er) return next('Database error');
          return next();
        });
    });
  },
}
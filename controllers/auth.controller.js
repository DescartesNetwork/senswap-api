const configs = global.configs;

const ssjs = require('senswapjs');

const db = require('../db');
const util = require('../helpers/util');


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

  /**
   * Verify user by:
   * - Decrypt access token (encrypted datetime)
   * - Validate datetime, the encrypted datetime must be in future
   * - Check role
   * @function verify
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  bearerToken: function (maxRole = 'guest') {
    return function (req, res, next) {
      const { authorization } = req.headers;
      if (!authorization || typeof authorization != 'string') return next('Unauthenticated request');
      const [address, accessToken] = authorization.split(' ');
      if (!ssjs.isAddress(address) || !accessToken) return next('Unauthenticated request');
      
      try {
        const msg = ssjs.verify(address, accessToken);
        const future = Number(msg.substring(0, 13));
        const now = Number(new Date());
        if (future < now) return next('Outdated access token');

        return db.User.findOne({ address }, function (er, user) {
          if (er) return next('Database error');
          if (!user) return next('Unauthenticated request');

          const roleValue = util.parseRole(user.role);
          const maxRoleValue = util.parseRole(maxRole);
          if (roleValue < maxRoleValue) return next('Permission denied');
          req.auth = { address, role: user.role }
          return next();
        });
      } catch (er) {
        if (er) return next('Unauthenticated request');
      }
    }
  },
}
const configs = global.configs;

const sol = require('../helpers/sol');


module.exports = {

  /**
   * Get tokens
   * @function getWhiteList
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  getWhiteList: (req, res, next) => {
    const { sol: { tokens } } = configs;
    return res.send({ status: 'OK', data: { tokens } });
  },

  /**
   * Airdrop token to users
   * @function airdrop
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  airdrop: (req, res, next) => {
    const { dstAddress, tokenAddress } = req.body;
    if (!dstAddress || !tokenAddress) return next('Invalid input');

    const {
      sol: {
        tokens,
        tokenAccounts,
        airdropAmount,
        coinbase: {
          secretKey
        }
      }
    } = configs;
    const tokenIndex = tokens.indexOf(tokenAddress);
    if (tokenIndex == -1) return next('Invalid type of token');
    const tokenAccount = tokenAccounts[tokenIndex];
    if (!tokenAccount) return next('Invalid type of token');

    const payer = sol.fromSecretKey(secretKey);
    const tokenPublicKey = sol.fromAddress(tokenAddress);
    const srcAccount = sol.fromAddress(tokenAccount);
    const dstAccount = sol.fromAddress(dstAddress);
    return sol.transfer(
      airdropAmount,
      tokenPublicKey,
      srcAccount,
      dstAccount,
      payer).then(txId => {
        return res.send({ status: 'OK', data: { tokenAddress, dstAddress, txId } });
      }).catch(er => {
        return next(er);
      });
  },
}
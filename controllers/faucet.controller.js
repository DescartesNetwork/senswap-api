const configs = global.configs;
const splt = global.splt;

const ssjs = require('senswapjs');


module.exports = {

  /**
   * Get mints
   * @function getWhiteList
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  getWhiteList: (req, res, next) => {
    const { sol: { mints } } = configs;
    return res.send({ status: 'OK', data: mints });
  },

  /**
   * Airdrop token to users
   * @function airdrop
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  airdrop: (req, res, next) => {
    const { dstAddress, mintAddress } = req.body;
    if (!ssjs.isAddress(dstAddress)) return next('Invalid destination address');
    if (!ssjs.isAddress(mintAddress)) return next('Invalid mint address');

    const {
      sol: {
        mints,
        accounts,
        airdropAmount,
        coinbase: {
          secretKey
        }
      }
    } = configs;
    const mintIndex = mints.indexOf(mintAddress);
    if (mintIndex < 0) return next('Invalid mint address');
    const srcAddress = accounts[mintIndex];
    if (!ssjs.isAddress(srcAddress)) return next('Invalid source address');

    const wallet = new ssjs.RawWallet(secretKey);
    return splt.transfer(airdropAmount, srcAddress, dstAddress, wallet).then(txId => {
      return res.send({ status: 'OK', data: { mintAddress, dstAddress, txId } });
    }).catch(er => {
      return next(er);
    });
  },
}
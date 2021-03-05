const configs = global.configs;
const splt = global.splt;
const lamports = global.lamports;

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
    return res.send({ status: 'OK', data: { mints } });
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

    const payer = ssjs.fromSecretKey(secretKey);
    return splt.transfer(airdropAmount, srcAddress, dstAddress, payer).then(txId => {
      return res.send({ status: 'OK', data: { mintAddress, dstAddress, txId } });
    }).catch(er => {
      return next(er);
    });
  },

  /**
   * Airdrop SOL to users
   * @function fund
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  fund: (req, res, next) => {
    const { dstAddress } = req.body;
    if (!ssjs.isAddress(dstAddress)) return next('Invalid input');

    const { sol: { lamports: amount, coinbase: { secretKey } } } = configs;
    const payer = ssjs.fromSecretKey(secretKey);
    return lamports.transfer(amount, dstAddress, payer).then(txId => {
      return res.send({ status: 'OK', data: { dstAddress, txId } });
    }).catch(er => {
      return next(er);
    });
  }
}
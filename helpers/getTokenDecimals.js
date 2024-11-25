const parseBigNumber = require('./parseBigNumber');
const getAbiFile = require('./getAbiFile');
const getEthereumWeb3 = require('./getEthereumWeb3.js');

async function getTokenDecimals(chain, wallet_address) {
    console.log('getTokenDecimals', wallet_address);

    const web3 = getEthereumWeb3(chain);

    const abi = getAbiFile(chain, 'IERC20Metadata');

    const tokenContract = new web3.eth.Contract(abi, wallet_address);

    const decimals = await tokenContract.methods.decimals().call();

    return parseBigNumber(decimals, 0);
}

module.exports = getTokenDecimals;
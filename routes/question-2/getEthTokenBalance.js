require('dotenv').config({
    path: 'envs/plume.env'
});

const getTokenDecimals = require('../../helpers/getTokenDecimals');
const parseBigNumber = require('../../helpers/parseBigNumber');
const getAbiFile = require('../../helpers/getAbiFile');
const getEthereumWeb3 = require('../../helpers/getEthereumWeb3.js');

async function getEthTokenBalance(chain, wallet_address, token_address) {
    console.log('getEthTokenBalance', wallet_address, token_address);

    const web3 = getEthereumWeb3(chain);

    const abi = getAbiFile(chain, 'IERC20Metadata');

    const tokenContract = new web3.eth.Contract(abi, token_address);

    const decimals = await getTokenDecimals(chain, token_address);

    const balance = await tokenContract.methods.balanceOf(wallet_address).call();

    return parseBigNumber(balance, decimals);
}

module.exports = getEthTokenBalance;
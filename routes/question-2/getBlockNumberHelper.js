const getEthereumWeb3 = require('../../helpers/getEthereumWeb3');
const parseBigNumber = require('../../helpers/parseBigNumber');

async function getBlockNumberHelper() {
    const web3 = getEthereumWeb3();

    const blockNumber = await web3.eth.getBlockNumber();

    return parseBigNumber(blockNumber, 0);
}

module.exports = getBlockNumberHelper;
const getEthereumWeb3 = require('./getEthereumWeb3');
const parseBigNumber = require('./parseBigNumber');

async function getBlockNumberHelper() {
    const web3 = getEthereumWeb3();

    const blockNumber = await web3.eth.getBlockNumber();

    return parseBigNumber(blockNumber, 0);
}

module.exports = getBlockNumberHelper;
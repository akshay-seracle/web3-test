const getEthereumWeb3 = require('./getEthereumWeb3');

async function getBlockHelper(blockNumber) {
    const web3 = getEthereumWeb3();

    const block = await web3.eth.getBlock(blockNumber, true);

    return block;
}

module.exports = getBlockHelper;
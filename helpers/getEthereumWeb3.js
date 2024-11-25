const {
    Web3 
} = require('web3');

require('dotenv').config({
    path: '.env'
});

function getEthereumWeb3() {
    const provider = new Web3.providers.HttpProvider(process.env.ETHEREUM_RPC_URL);

    const web3 = new Web3(provider);

    return web3;
}

module.exports = getEthereumWeb3;
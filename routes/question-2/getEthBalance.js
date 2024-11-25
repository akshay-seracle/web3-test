const parseBigNumber = require('../../helpers/parseBigNumber');
const getEthereumWeb3 = require('../../helpers/getEthereumWeb3');

async function getEthBalance(chain, wallet_address) {
    console.log('getEthBalance', wallet_address);

    if (wallet_address === '')
        return 0;

    try {
        const web3 = getEthereumWeb3(chain);

        let balance = await web3.eth.getBalance(wallet_address);

        balance = parseBigNumber(balance, 18);

        return balance;
    } 
    catch (err) {
        console.error(err);

        return 0;
    }
}

module.exports = getEthBalance;
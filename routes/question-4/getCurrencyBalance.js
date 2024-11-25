const nullChecker = require('../../helpers/nullChecker');
const getEthBalance = require('./getEthBalance');
const getEthTokenBalance = require('./getEthTokenBalance');

async function getCurrencyBalance(req, res) {
    let blockchain = req.query.blockchain;
    let chain = req.query.chain;
    let wallet_address = req.query.wallet_address;
    let token_address = req.query.token_address;

    if (nullChecker(blockchain)) {
        return res.status(400).send({
            message: 'blockchain is required'
        });
    }

    if (nullChecker(wallet_address)) {
        return res.status(400).send({
            message: 'wallet_address is required'
        });
    }

    wallet_address = wallet_address.trim().toLowerCase();
    blockchain = blockchain.trim().toLowerCase();
    chain = chain.trim().toLowerCase();

    try {
        let balance = 0;

        if (nullChecker(chain)) {
            return res.status(400).send({
                message: 'chain is required'
            });
        }

        if (nullChecker(token_address))
            balance = await getEthBalance(chain, wallet_address);

        else {
            token_address = token_address.trim().toLowerCase();

            balance = await getEthTokenBalance(chain, wallet_address, token_address);
        }

        return res.status(200).send({
            data: balance
        });
    }
    catch (err) {
        console.error(err);

        // we can decide whether to return 200 with zero balance or 500 with error message
        res.status(200).send({
            data: 0
        });
    }
}

module.exports = getCurrencyBalance;
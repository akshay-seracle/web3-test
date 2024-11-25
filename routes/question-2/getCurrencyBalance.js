const nullChecker = require('../../helpers/nullChecker');
const getEthBalance = require('./getEthBalance');
const getEthTokenBalance = require('./getEthTokenBalance');

async function getCurrencyBalance(req, res) {
    const blockchain = req.query.blockchain;
    const chain = req.query.chain;
    const wallet_address = req.query.wallet_address;
    const token_address = req.query.token_address;

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

    try {
        let balance = 0;

        if (nullChecker(chain)) {
            return res.status(400).send({
                message: 'chain is required'
            });
        }

        if (nullChecker(token_address))
            balance = await getEthBalance(chain, wallet_address);

        else
            balance = await getEthTokenBalance(chain, wallet_address, token_address);

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
const nullChecker = require('../../helpers/nullChecker');
const getTransactionsByAccount = require('./getTransactionsByAccount');
const config = require('../../configurations/config')();

const db = config.getDB();

const LIMIT = 5;

async function transactionTracking(req, res) {
    let wallet_address = req.body.wallet_address;

    if (nullChecker(wallet_address)) {
        return res.status(400).send({
            message: 'wallet_address is required'
        });
    }

    wallet_address = wallet_address.trim().toLowerCase();

    const transactions = await getTransactionsByAccount(wallet_address, null, null, LIMIT);

    console.log('Transactions found: ' + transactions);

    if (transactions.length > 0) 
        await db.collection('transactions').insertMany(transactions);
    
    return res.status(200).send({
        message: `${transactions.length} transactions found`
    });
}

module.exports = transactionTracking;
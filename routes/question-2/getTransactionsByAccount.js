const nullChecker = require('../../helpers/nullChecker');
const getBlockNumberHelper = require('./getBlockNumberHelper');
const getBlockHelper = require('./getBlockHelper');
const parseRawTransaction = require('./parseRawTransaction');

async function getTransactionsByAccount(wallet_address, startBlockNumber, endBlockNumber) {
    if (nullChecker(endBlockNumber)) {
        endBlockNumber = await getBlockNumberHelper();
        console.log('Using endBlockNumber: ' + endBlockNumber);
    }

    if (nullChecker(startBlockNumber)) {
        startBlockNumber = endBlockNumber - 100;
        console.log('Using startBlockNumber: ' + startBlockNumber);
    }

    console.log('Searching for transactions to/from account "' + wallet_address + '" within blocks '  + startBlockNumber + ' and ' + endBlockNumber);

    const transactions = [];
  
    for (let i = startBlockNumber; i <= endBlockNumber; i++) {
        console.log('Searching block ' + i);
      
        const block_info = await getBlockHelper(i, true);

        if (nullChecker(block_info))
            continue;
        
        if (nullChecker(block_info.transactions))
            continue;

        block_info.transactions.forEach(function(e) {
            // console.log(e.from, e.to);

            if (wallet_address === '*' || wallet_address === e.from || wallet_address === e.to) {
                const transaction = parseRawTransaction(e, block_info);
                
                transactions.push(transaction);
            }
        });
    }

    return transactions;
}
  
module.exports = getTransactionsByAccount;
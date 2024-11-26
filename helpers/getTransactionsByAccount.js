const nullChecker = require('./nullChecker');
const getBlockNumberHelper = require('./getBlockNumberHelper');
const getBlockHelper = require('./getBlockHelper');
const parseRawTransaction = require('./parseRawTransaction');

async function getTransactionsByAccount(wallet_address, startBlockNumber, endBlockNumber, limit) {
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

        for (let j = 0; j < block_info.transactions.length; j++) {
            const raw_transaction = block_info.transactions[j];
            // console.log(e.from, e.to);

            if (wallet_address === '*' || wallet_address === raw_transaction.from || wallet_address === raw_transaction.to) {
                const transaction = parseRawTransaction(wallet_address, raw_transaction, block_info);
                
                transactions.push(transaction);

                if (transactions.length === limit)
                    break;
            }
        }

        if (transactions.length === limit)
            break;
    }

    return transactions;
}
  
module.exports = getTransactionsByAccount;
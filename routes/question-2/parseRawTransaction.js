const parseBigNumber = require('../../helpers/parseBigNumber');

async function parseRawTransaction(raw_transaction, block_info) {
    const transaction = {
        blockHash: raw_transaction.blockHash,
        blockNumber: raw_transaction.blockNumber,
        from: raw_transaction.from,
        gas: raw_transaction.gas,
        gasPrice: raw_transaction.gasPrice,
        hash: raw_transaction.hash,
        input: raw_transaction.input,
        nonce: raw_transaction.nonce,
        time: new Date(parseBigNumber(block_info.timestamp, 0) * 1000),
        to: raw_transaction.to,
        transactionIndex: raw_transaction.transactionIndex,
        value: raw_transaction.value
    };
    
    return transaction;
}
  
module.exports = parseRawTransaction;
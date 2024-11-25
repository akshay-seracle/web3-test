const parseBigNumber = require('../../helpers/parseBigNumber');

function parseRawTransaction(wallet_address, raw_transaction, block_info) {
    const transaction = {
        blockHash: raw_transaction.blockHash,
        blockNumber: raw_transaction.blockNumber,
        created: new Date().getTime(),
        from: raw_transaction.from,
        gas: raw_transaction.gas,
        gasPrice: raw_transaction.gasPrice,
        hash: raw_transaction.hash,
        input: raw_transaction.input,
        nonce: raw_transaction.nonce,
        time: parseBigNumber(block_info.timestamp, 0) * 1000,
        to: raw_transaction.to,
        transactionIndex: raw_transaction.transactionIndex,
        updated: new Date().getTime(),
        value: raw_transaction.value,
        wallet_address: wallet_address
    };
    
    return transaction;
}
  
module.exports = parseRawTransaction;
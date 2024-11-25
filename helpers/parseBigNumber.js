const BigNumber = require('bignumber.js');

function parseBigNumber(value, decimal) {
    const rawValue = new BigNumber(value).toString();

    const parsedValue = parseFloat(rawValue) / Math.pow(10, decimal);

    return parsedValue;
}

module.exports = parseBigNumber;
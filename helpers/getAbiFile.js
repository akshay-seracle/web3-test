const fs = require('fs');

function getAbiFile(chain, filename) {
    console.log('getAbiFile =>', chain, filename);

    const data = fs.readFileSync(`abis/${filename}.json`).toString();
    const abi = JSON.parse(data).abi;

    return abi;
}

module.exports = getAbiFile;
/**
 * @title BlockCDN
 * @symbol BCDN
 * @ethContractAddr 0x1e797Ce986C3CFF4472F7D38d5C4aba55DfEFE40
 * @implementation Dynamic
 * @cmcId blockcdn
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x1e797Ce986C3CFF4472F7D38d5C4aba55DfEFE40?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -15)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};

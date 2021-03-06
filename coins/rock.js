/**
 * @title Rock
 * @symbol RKT
 * @ethContractAddr 0x106aa49295b525fcf959aa75ec3f7dcbf5352f1c
 * @implementation Dynamic
 * @cmcId rock
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x106aa49295b525fcf959aa75ec3f7dcbf5352f1c?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -18)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};

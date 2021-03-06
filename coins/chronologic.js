/**
 * @title Chronologic
 * @symbol DAY
 * @ethContractAddr 0xE814aeE960a85208C3dB542C53E7D4a6C8D5f60F
 * @implementation Dynamic
 * @cmcId chronologic
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xE814aeE960a85208C3dB542C53E7D4a6C8D5f60F?apiKey=freekey', (error, response, body) => {
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

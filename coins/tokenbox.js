/**
 * @title Tokenbox
 * @symbol TBX
 * @ethContractAddr 0x3a92bd396aef82af98ebc0aa9030d25a23b11c6b
 * @implementation Dynamic
 * @cmcId tokenbox
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x3a92bd396aef82af98ebc0aa9030d25a23b11c6b?apiKey=freekey', (error, response, body) => {
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

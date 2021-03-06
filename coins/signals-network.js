/**
 * @title Signals Network
 * @symbol SGN
 * @ethContractAddr 0xb2135ab9695a7678dd590b1a996cb0f37bcb0718
 * @implementation Dynamic
 * @cmcId signals-network
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xb2135ab9695a7678dd590b1a996cb0f37bcb0718?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -9)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};

/**
 * @title Gifto
 * @symbol GTO
 * @ethContractAddr 0xc5bbae50781be1669306b9e001eff57a2957b09d
 * @implementation Dynamic
 * @cmcId gifto
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xc5bbae50781be1669306b9e001eff57a2957b09d?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -5)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};

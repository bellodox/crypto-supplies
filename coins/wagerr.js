/**
 * @title Wagerr
 * @symbol WGR
 * @implementation Dynamic
 * @cmcId wagerr
 */

module.exports = (callback, request) => {
    request('https://chainz.cryptoid.info/wgr/api.dws?q=circulating', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            callback({
                c: Number(body)
            });
        } else {
            callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
        }
    });
};

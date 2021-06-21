let apiKeys;
let timeOffset;
let tickerList = [];
function tasks() {

    return {
        load_apiKeys,
        getApiUsageStatus,
        currentCoinBalance,
        withdrawHistory,
        depositHistory,
        orderStatus,
        cancelOrder,
        listOpenOrders,
        listExecutedOrders,
        listOpenStopOrders,
        placeBuyOrder,
        buyStopLoss,
        sellStopLoss,
        getCoinAddress,
        placeSellOrder,
        placeOrders,
        getOrders,
        cancelStopLossOrder,
        platformStatus,
        getBuyOrderBook,
        getSellOrderBook,
        getTickerApi,
        cancelMarginOrder,
        listMarginExecuted,
        listMarginMarketOrders,
        listMarginPending,
        placeMarginOrders,
        settleMargin,
        settleMarginPartial
    };

    function load_apiKeys() {
        let keys = SpreadsheetApp.getActive().getSheetByName("config").getRange("B2:B3").getValues();
        // console.log("Api keys from the sheet", keys);
        let data = {
            apiKey: keys[0][0],
            apiSecretKey: keys[1][0]
        };
        if (typeof (data.apiKey) !== 'string') utils().alertMessage('API_KEY NOT FOUND.');
        if (typeof (data.apiSecretKey) !== 'string') utils().alertMessage('API_SECRET_KEY NOT FOUND.');
        if (data.apiKey.length < 5) utils().alertMessage('API_KEY IS NOT OF VALID SIZE.');
        if (data.apiSecretKey.length < 5) utils().alertMessage('API_SECRET_KEY IS NOT OF VALID SIZE.');
        if (typeof data === 'object') {
            apiKeys = data;
        } else {
            utils().alertMessage('Data Format is incorrect.');
        }
    }
    /*
        Cancels an open buy or sell order
        @params {string} symbol -> name of coin
        @params {string} user_id -> the user id of user whose data is to retrieved
        @params {integer} entry_id -> the id of the of the user
        @return {function} -> function will return either body or error
      */
    function getApiUsageStatus(callback) {
        utils().requestAuthenticate('USAGE', callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = {};
            utils().makePostRequest('USAGE', "getApiUsageStatus", body, callback);
            return callback("", "apikeys verified");
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }



    function orderStatus(symbol, entry_id, callback) {
        utils().requestAuthenticate(symbol, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = { entry_id: entry_id };
            utils().makePostRequest(symbol, "orderStatus", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    function cancelOrder(symbol, entry_id, callback) {
        utils().requestAuthenticate(symbol, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = { entry_id: entry_id };
            utils().makePostRequest(symbol, "cancelOrder", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    /*
     Gives a list of open orders for a particular coin
     @params {string} symbol -> name of coin
     @params {string} user_id -> the user id of user whose data is to retrieved
     @return {function} -> function will return either body or error
   */

    function listOpenOrders(symbol, callback) {
        utils().requestAuthenticate(symbol, callback);

        if (utils().verifyApiKeys(apiKeys)) {
            let body = { page: 0 };
            utils().makePostRequest(symbol, "listOpenOrders", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    function listExecutedOrders(symbol, pageNo, since, callback) {
        utils().requestAuthenticate(symbol, callback);

        if (utils().verifyApiKeys(apiKeys)) {
            let body = { page: pageNo, since: since };
            utils().makePostRequest(symbol, "listExecutedOrders", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    function listOpenStopOrders(symbol, callback) {
        utils().requestAuthenticate(symbol, callback);

        if (utils().verifyApiKeys(apiKeys)) {
            let body = { page: 0 };
            utils().makePostRequest(symbol, "listOpenStopOrders", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    function currentCoinBalance(symbol, callback) {
        utils().requestAuthenticate(symbol, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = {};
            utils().makePostRequest(symbol, "currentCoinBalance", body, callback);
        }
        else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    /*
    Places sell order for a particular coin
    @params {string} symbol -> name of coin
    @params {string} user_id -> the user id of user whose data is to retrieved
    @params {integer} quantity -> the amount of coin to buy
    @params {integer} rate -> the rate at which to buy
    @return {function} -> function will return either body or error
  */
    function placeBuyOrder(symbol, quantity, rate, callback) {
        utils().requestAuthenticate(symbol, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = { quantity: quantity, rate: rate };
            utils().makePostRequest(symbol, "placeBuyOrder", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    function depositHistory(symbol, page, callback) {
        utils().requestAuthenticate(symbol, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = { page: page };
            utils().makePostRequest(symbol, "deposiutils()tory", body, callback);
        }
        else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    function withdrawHistory(symbol, page, callback) {
        utils().requestAuthenticate(symbol, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = { page: page };
            utils().makePostRequest(symbol, "withdrawHistory", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    function buyStopLoss(symbol, quantity, rate, t_rate, callback) {
        utils().requestAuthenticate(symbol, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = { quantity: quantity, rate: rate, t_rate: t_rate };
            utils().makePostRequest(symbol, "buyStopLoss", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    function sellStopLoss(symbol, quantity, rate, t_rate, callback) {
        utils().requestAuthenticate(symbol, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = { quantity: quantity, rate: rate, t_rate: t_rate };
            utils().makePostRequest(symbol, "sellStopLoss", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    function getCoinAddress(symbol, callback) {
        utils().requestAuthenticate(symbol, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = {};
            utils().makePostRequest(symbol, "getCoinAddress", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    function placeSellOrder(symbol, quantity, rate, callback) {
        utils().requestAuthenticate(symbol, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = { quantity: quantity, rate: rate };
            utils().makePostRequest(symbol, "placeSellOrder", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    function placeOrders(orders_obj, callback) {
        utils().requestAuthenticate2(orders_obj, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = orders_obj;
            utils().makePostRequest2("orders", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    function getOrders(orders_obj, callback) {
        utils().requestAuthenticate2(orders_obj, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = orders_obj;
            utils().makePostRequest2("getordersnew", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }
    function cancelStopLossOrder(symbol, entry_id, callback) {
        utils().requestAuthenticate(symbol, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = { entry_id: entry_id };
            utils().makePostRequest(symbol, "cancelStopLossOrder", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }

    /*
        Get the current status of the platform
        @return {object} -> whether the paltform is up for down for each coin present
      */
    function platformStatus(callback) {
        let options = utils().setOption('GET', '/platform/status', { 'X-BITBNS-APIKEY': apiKeys.apiKey });
        let query = UrlFetchApp.fetch(options.url, options);
        let responseCode = query.getResponseCode()
        query = JSON.parse(query)
        if (!query.error && responseCode == 200) {
            return callback(query.error, query);
        } else {
            return callback(query.error, query);
        }
    }

    /*
      @params  coin_name -> Name of coin for which we want to get list of buy orders
      @function callback -> this function will return error or data body
    */
    function getBuyOrderBook(coin_name, callback) {
        let options = utils().setOption('GET', `/orderbook/buy/${coin_name}`, { 'X-BITBNS-APIKEY': apiKeys.apiKey });
        let query = UrlFetchApp.fetch(options.url, options);
        let responseCode = query.getResponseCode()
        query = JSON.parse(query)
        if (!query.error && responseCode == 200) {
            return callback(query.error, query);
        } else {
            return callback(query.error, query);
        }

    }

    /*
      @params  coin_name -> Name of coin for which we want to get list of sell orders
      @function callback -> this function will return error or data body
    */
    function getSellOrderBook(coin_name, callback) {
        let options = utils().setOption('GET', `/orderbook/sell/${coin_name}`, { 'X-BITBNS-APIKEY': apiKeys.apiKey });
        let query = UrlFetchApp.fetch(options.url, options);
        let responseCode = query.getResponseCode()
        query = JSON.parse(query)
        if (!query.error && responseCode == 200) {
            return callback(query.error, query);
        } else {
            return callback(query.error, query);
        }
    }

    /*
      Get the result from ticker api of a list of coins
      @return {object} -> ticker api results for each of the coins
    */
    function getTickerApi(symbols, callback) {
        let options = utils().setOption('GET', '/tickers', { 'X-BITBNS-APIKEY': apiKeys.apiKey });
        let query = UrlFetchApp.fetch(options.url, options);
        let responseCode = query.getResponseCode()
        query = JSON.parse(query)
        // console.log("Ticker query", query)

        if (responseCode == 200) {
            let symbolArray = symbols.split(',');
            let completeList = query;
            if (tickerList.length == 0) {
                for (let i in completeList)
                    tickerList.push(i)
            }
            Object.keys(completeList).forEach(function (key) {
                completeList[key] = {
                    "highest_buy_bid": completeList[key].highest_buy_bid,
                    "lowest_sell_bid": completeList[key].lowest_sell_bid,
                    "last_traded_price": completeList[key].last_traded_price
                }
            })
            let filteredList = {}; let errorFlag = 200;
            if (symbolArray.length === 1 && symbolArray[0] === "") {
                return callback(null, { "data": completeList, "status": 1, "error": null, "code": 200 });
            }
            symbolArray.forEach((entity) => {
                if (!completeList[entity]) {
                    errorFlag = 403;
                }
                filteredList[entity] = completeList[entity];
            })
            return callback("", { "data": filteredList, "status": 1, "error": null, "code": errorFlag });
        } else {
            utils().alertMessage(query.error)
            return callback("Error in Api call", { "data": query, "status": 1, "error": null, "code": responseCode });
        }
    }

    // Margin Trading starts here - V2

    function placeMarginOrders(orders_obj, callback) {
        utils().requestAuthenticate2(orders_obj, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = orders_obj;
            utils().makePostRequest2("marginOrders", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }

    function cancelMarginOrder(orders_obj, callback) {
        utils().requestAuthenticate2(orders_obj, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = orders_obj;
            utils().makePostRequest2("marginOrders", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }

    function settleMarginPartial(orders_obj, callback) {
        utils().requestAuthenticate2(orders_obj, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = orders_obj;
            utils().makePostRequest2("marginOrders", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }

    function settleMargin(orders_obj, callback) {
        utils()().requestAuthenticate2(orders_obj, callback);
        if (utils()().verifyApiKeys(apiKeys)) {
            let body = orders_obj;
            utils().makePostRequest2("marginOrders", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }

    function listMarginExecuted(orders_obj, callback) {
        utils().requestAuthenticate2(orders_obj, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = orders_obj;
            utils().makePostRequest2("marginOrders", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }

    function listMarginPending(orders_obj, callback) {
        utils().requestAuthenticate2(orders_obj, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = orders_obj;
            utils().makePostRequest2("marginOrders", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }

    function listMarginMarketOrders(orders_obj, callback) {
        utils().requestAuthenticate2(orders_obj, callback);
        if (utils().verifyApiKeys(apiKeys)) {
            let body = orders_obj;
            utils().makePostRequest2("marginOrders", body, callback);
        } else {
            return callback("apiKeys Not Found , Please intialize it first", "");
        }
    }

}
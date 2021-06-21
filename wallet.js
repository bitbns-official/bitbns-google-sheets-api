/**
 * For calculating portfolio value
 */

function getPriceList(arr, callback) {
    let prices = {}
    tasks().getTickerApi("", function (error, data) {
        if (!error) {
            // console.log(data)
            for (let val of arr) {
                // console.log(val)
                let coinPrice = data.data[val[0]]
                coinPrice = coinPrice["lowest_sell_bid"]
                prices[val[0]] = coinPrice
            }
            return callback(prices)
        }
        else
            throw Error(error)
    })
}
function getWalletValue(arr, callback) {
    let portfolioValue = 0;
    getPriceList(arr, function (response) {
        console.log(response)
        for (let val of arr) {
            let tokenValueInWallet = parseFloat(val[1]) * parseFloat(response[val[0]])
            portfolioValue = parseFloat(portfolioValue) + parseFloat(tokenValueInWallet)
        }
    })
    // console.log("portfolio", portfolioValue)
    return callback(portfolioValue)
}

function getCurrentWalletValues(callback) {
    tasks().load_apiKeys();

    tasks().currentCoinBalance('EVERYTHING', function (error, data) {
        if (!error) {

            let arr = []
            let fiatWallet = data.data["availableorderMoney"]
            console.log("Fiat Wallet :: ", fiatWallet)
            let data2 = data.data
            for (var key in data2) {
                if (data2[key] > 0) {
                    if (key.toString().includes("inorder"))
                        continue
                    let token = ""
                    for (let i = key.length - 1; i >= 0; i--) {
                        if (key[i] == key[i].toUpperCase())
                            token = key[i] + token
                        else
                            break
                    }
                    if (token) {
                        arr.push([token, data2[key]])
                    }
                }
            }
            let cryptoWalletValue = 0
            getWalletValue(arr, (response) => {
                cryptoWalletValue = response
                // console.log(response)
            })
            console.log(`Crypto Wallet Value:: ${cryptoWalletValue}`)
            return callback("", cryptoWalletValue);
            // console.log('Data ::', data);
        } else {
            console.log('Error ::', error);
            return callback(error, "");
        }
    })
}
// function toDebug() {
//     getCurrentWalletValues((error, cryptoWalletValue) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log("In to debug, crypto wallet value :: ", cryptoWalletValue)
//         }
//     })
// }

/**
 * Hourly Wallet Value Trigger
 */
function portfolioTriggerCall() {
    getCurrentWalletValues((error, cryptoWalletValue) => {
        if (error) {
            console.log(error);
        } else {
            var time = utils().getCurrentDate();
            console.log("IN TRIGGER CALL :: ", "time ::", time, "value ::", cryptoWalletValue);
            SpreadsheetApp.getActive().getSheetByName("Portfolio").appendRow([time, cryptoWalletValue]);
            var lastRow = SpreadsheetApp.getActive().getSheetByName("Portfolio").getLastRow();
            if (lastRow > 25) {
                SpreadsheetApp.getActive().getSheetByName("Portfolio").deleteRow(2);
            }
            var values = SpreadsheetApp.getActive().getSheetByName("Portfolio").getRange("A2:B25");
            values.setBackground("black");
            values.setFontColor("#fbbc04")
        }
    })
}

/**
 * Daily Wallet Value Trigger
 */
function portfolioTriggerCallDaily() {
    getCurrentWalletValues((error, cryptoWalletValue) => {
        if (error) {
            console.log(error);
        } else {
            var time = utils().getddmmyy();
            console.log("IN TRIGGER CALL :: ", "time ::", time, "value ::", cryptoWalletValue);
            SpreadsheetApp.getActive().getSheetByName("PortfolioDaily").appendRow([time, cryptoWalletValue]);
            var lastRow = SpreadsheetApp.getActive().getSheetByName("PortfolioDaily").getLastRow();
            if (lastRow > 31) {
                SpreadsheetApp.getActive().getSheetByName("PortfolioDaily").deleteRow(2);
            }
            var values = SpreadsheetApp.getActive().getSheetByName("PortfolioDaily").getRange("A2:B31");
            values.setBackground("black");
            values.setFontColor("#fbbc04")
        }
    })
}

/**
 * Weekly Wallet Value Trigger
 */
function portfolioTriggerCallWeekly() {
    getCurrentWalletValues((error, cryptoWalletValue) => {
        if (error) {
            console.log(error);
        } else {
            var time = utils().getddmmyy();
            console.log("IN TRIGGER CALL :: ", "time ::", time, "value ::", cryptoWalletValue);
            SpreadsheetApp.getActive().getSheetByName("PortfolioWeekly").appendRow([time, cryptoWalletValue]);
            var lastRow = SpreadsheetApp.getActive().getSheetByName("PortfolioWeekly").getLastRow();
            if (lastRow > 53) {
                SpreadsheetApp.getActive().getSheetByName("PortfolioWeekly").deleteRow(2);
            }
            var values = SpreadsheetApp.getActive().getSheetByName("PortfolioWeekly").getRange("A2:B53");
            values.setBackground("black");
            values.setFontColor("#fbbc04")
        }
    })
}
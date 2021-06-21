/** What should the add-on do after it is installed */
function onInstall() {
    onOpen();

}
/**
* Need the below function to include Javascript.html and Stylesheet.html in main html
* https://stackoverflow.com/questions/42141355/apps-script-sidebar-reference-error-when-using-include
*/
function include(File) {
    return HtmlService.createHtmlOutputFromFile(File).getContent();
};
/** What should the add-on do when a document is opened */
function onOpen() {

    SpreadsheetApp.getUi()
        .createAddonMenu() // Add a new option in the Google Docs Add-ons Menu
        .addItem("Bitbns SIP", "showSidebar")
        .addToUi();  // Run the showSidebar function when someone clicks the menu
    makeTriggersIfEmpty();
}

/* Show a 300px sidebar with the HTML from googlemaps.html */
function showSidebar() {
    var html = HtmlService.createTemplateFromFile("SIP")
        .evaluate()
        .setTitle("Bitbns SIP"); // The title shows in the sidebar
    SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Calls the ticker API to get all coins
 */
/**
 * Flow : 
 * 1.Get minimum volume of each coin from the spreadsheet
 * 2.Get all prices from ticker API
 * 3.Calculate the minimum investment amount for each coin 
 *    a)For INR : (current price)*(minimum volume)*2 and then find the nearest upper factor of 50.
 *    b) For USD :(current price)*(minimum volume)*2 and then find the nearest upper factor of 1.
 *    c)Minimum investment amount will be >=100 for INR market and >=2 for USD market
 */
function getAllSymbols() {

    let allPrices;
    function importData() {
        var url = "https://docs.google.com/spreadsheets/d/1EiZsSHq0S9ko7wp6DA5BpuMsEFNNyPBLhXCoq15QiHs/edit?usp=sharing"
        var infoSpreadsheet = SpreadsheetApp.openByUrl(url).getSheetByName("Sheet1")
        return infoSpreadsheet.getDataRange().getValues()
    }
    function getAllPrices() {
        tasks().load_apiKeys();
        tasks().getTickerApi("", function (error, data) {
            if (!error) {
                allPrices = data;
                Logger.log("Got Prices")
            }
            else {
                Logger.log("Error :: ", error)
            }
        })
    }
    function getMinInvestmentPriceINR(coin, qty) {
        let coinPrice = allPrices.data[coin]
        coinPrice = coinPrice["lowest_sell_bid"]
        let investmentPrice = 50 * Math.ceil((parseFloat(coinPrice) * qty * 2) / 50)
        // console.log(coin,coinPrice, qty, coinPrice*qty, investmentPrice);
        return Math.max(investmentPrice, 100)
    }
    function getMinInvestmentPriceUSD(coin, qty) {
        let coinPrice = allPrices.data[coin]
        coinPrice = coinPrice["lowest_sell_bid"]
        coinPrice = Math.ceil((parseFloat(coinPrice) * qty * 2))
        return Math.max(coinPrice, 2)
    }



    var coinData = importData()
    getAllPrices()
    let inr = {}, usdt = {}
    for (let i = 1; i < coinData.length; i++) {
        let val = coinData[i];
        if (val[1] == "INR") {
            let coin = val[0]
            inr[coin] = { "price": getMinInvestmentPriceINR(coin, val[2]) }
        }
        else {
            let coin = val[0] + "USDT"
            usdt[coin] = { "price": getMinInvestmentPriceUSD(coin, val[2]) }
        }
    }
    let clientData = {
        "INR": inr,
        "USD": usdt
    };
    Logger.log(clientData)
    return clientData
}


/*
Confirm SIP alert
https://spreadsheet.dev/pop-up-alert-messages-in-google-sheets
*/
function confirmAddSipAlert() {
    var result = SpreadsheetApp.getUi().alert("Are you sure you want to add SIP?", SpreadsheetApp.getUi().ButtonSet.OK_CANCEL);
    if (result === SpreadsheetApp.getUi().Button.OK) {
        SpreadsheetApp.getActive().toast("Placed SIP");
        return true;
    } else {
        SpreadsheetApp.getActive().toast("Didn't add SIP");
        return false;
    }
}
function confirmDeleteSipAlert() {
    var result = SpreadsheetApp.getUi().alert("Are you sure you want to delete SIP?", SpreadsheetApp.getUi().ButtonSet.OK_CANCEL);
    if (result === SpreadsheetApp.getUi().Button.OK) {
        return true;
    } else {
        SpreadsheetApp.getActive().toast("Didn't delete SIP");
        return false;
    }
}
/**
 * Get add SIP form data from the front-end
 */
function getFormData(data) {
    console.log(data);
    var result = confirmAddSipAlert()
    if (!result)
        return false;
    tasks().load_apiKeys();
    // console.log(apiKeys);
    addSip(data);
    return true;
}
/**
 * Get trigger id from delete SIP front-end
 */
function deletSipWithTriggerId(triggerId) {
    console.log(`In delete SIP ,trigger id:: ${triggerId}`)
    var result = confirmDeleteSipAlert()
    if (!result)
        return false;
    deleteTriggerByUid(triggerId)

}

function deleteRowWithTriggerId(triggerId) {
    var lastRow = SpreadsheetApp.getActive().getSheetByName("SIP").getLastRow();
    var allTriggerIds = SpreadsheetApp.getActive().getSheetByName("SIP").getRange(2, 1, lastRow - 1, 1).getValues();
    for (var id in allTriggerIds) {
        console.log(id, allTriggerIds[id]);
        if (triggerId == allTriggerIds[id]) {
            SpreadsheetApp.getActive().getSheetByName("SIP").deleteRows(parseInt(id) + 2, 1);
            // console.log(`Row ${parseInt(id) + 2} deleted`);
            SpreadsheetApp.getActive().toast("Deleted SIP");
            return;
        }

    }
    utils().alertMessage(`No SIP with trigger id : ${triggerId}`, 0)
}

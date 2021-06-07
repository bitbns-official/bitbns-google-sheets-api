/** What should the add-on do after it is installed */
function onInstall() {
    onOpen();
    onOpen2();
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
function getAllSymbols() {
    tasks().load_apiKeys();
    if (tickerList.length == 0) {
        tasks().getTickerApi("", function (error, data) {
        })
    }
    console.log(tickerList)
    return tickerList;
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

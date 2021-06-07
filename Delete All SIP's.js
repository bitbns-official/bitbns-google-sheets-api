/**
 * In case you mess up with trigger ids and want to start fresh,run the below functions to delete all SIPS
 */

function deleteAllSip() {
  var allTriggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < allTriggers.length; i++) {
    ScriptApp.deleteTrigger(allTriggers[i]);
    PropertiesService.getScriptProperties().deleteProperty(allTriggers[i]);
  }
  var lastRow = SpreadsheetApp.getActive().getSheetByName("SIP").getLastRow();
  SpreadsheetApp.getActive().getSheetByName("SIP").deleteRows(2, lastRow);
}
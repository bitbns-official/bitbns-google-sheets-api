var recurringKey = "recurring";
var argumentKey = "arguments";

/**
 * Sets up the arguments for the given trigger.
 *
 * @param {Trigger} trigger - The trigger for which the arguments are set up
 * @param {*} functionArguments - The arguments which should be stored for the function call
 * @param {boolean} recurring - Whether the trigger is recurring; if not the 
 *   arguments and the trigger are removed once it called the function
 */
function setupTriggerArguments(trigger, functionArguments, recurring) {
    var triggerUid = trigger.getUniqueId();
    var triggerData = {};
    triggerData[recurringKey] = recurring;
    triggerData[argumentKey] = functionArguments;
    console.log("set argument trigger ::", triggerData);
    PropertiesService.getScriptProperties().setProperty(triggerUid, JSON.stringify(triggerData));
}

/**
 * Function which should be called when a trigger runs a function. Returns the stored arguments 
 * and deletes the properties entry and trigger if it is not recurring.
 *
 * @param {string} triggerUid - The trigger id
 * @return {*} - The arguments stored for this trigger
 */
function handleTriggered(triggerUid) {
    var scriptProperties = PropertiesService.getScriptProperties();
    var triggerData = (scriptProperties.getProperty(triggerUid));
    triggerData = JSON.parse(triggerData)
    console.log(`handle trigger data :: ${triggerData}`, typeof (triggerData))
    console.log("arguments of trigger data", triggerData[argumentKey])
    return JSON.stringify(triggerData[argumentKey]);
}

/**
 * Deletes trigger arguments of the trigger with the given id.
 *
 * @param {string} triggerUid - The trigger id
 */
function deleteTriggerArguments(triggerUid) {
    PropertiesService.getScriptProperties().deleteProperty(triggerUid);
    console.log("Deleted trigger arguments :: ", triggerUid)
    deleteRowWithTriggerId(triggerUid);
}

/**
 * Deletes a trigger with the given id and its arguments.
 * When no project trigger with the id was found only an error is 
 * logged and the function continues trying to delete the arguments.
 * 
 * @param {string} triggerUid - The trigger id
 */
function deleteTriggerByUid(triggerUid) {
    if (!ScriptApp.getProjectTriggers().some(function (trigger) {
        if (trigger.getUniqueId() === triggerUid) {
            ScriptApp.deleteTrigger(trigger);
            console.log("Deleted trigger", triggerUid)
            return true;
        }

        return false;
    })) {
        console.error("Could not find trigger with id '%s'", triggerUid);
    }

    deleteTriggerArguments(triggerUid);
}

/**
 * Deletes a trigger and its arguments.
 * 
 * @param {Trigger} trigger - The trigger
 */
function deleteTrigger(trigger) {
    ScriptApp.deleteTrigger(trigger);
    deleteTriggerArguments(trigger.getUniqueId());
}

/**
 * Creates the portfolio triggers at the creation of a new sheet
 */
function makeTriggersIfEmpty() {
    if (ScriptApp.getProjectTriggers().length < 1)
        makeTriggers();
}

function makeTriggers() {
    trigger = ScriptApp.newTrigger('portfolioTriggerCall')
        .timeBased()
        .everyHours(1)
        .create();

    setupTriggerArguments(trigger, { portfolio: true }, true);

    trigger = ScriptApp.newTrigger('portfolioTriggerCallDaily')
        .timeBased()
        .everyDays(1)
        .create();

    setupTriggerArguments(trigger, { portfolio: true }, true);

    trigger = ScriptApp.newTrigger('portfolioTriggerCallWeekly')
        .timeBased()
        .everyWeeks(1)
        .onWeekDay(ScriptApp.WeekDay.SUNDAY)
        .create();

    setupTriggerArguments(trigger, { portfolio: true }, true);
}

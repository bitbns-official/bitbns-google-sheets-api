/*
  function to add Sip trigger
  @params {object} data -> arguments of the Sip (coin, freuency and amount)
*/
function addSip(data) {
  var trigger;
  console.log(data);

  if (data.unit == "hour") {
    trigger = ScriptApp.newTrigger('triggerCall')
      .timeBased()
      .everyHours(data.frequency)
      .create();

  } else if (data.unit == "day") {
    trigger = ScriptApp.newTrigger('triggerCall')
      .timeBased()
      .everyDays(data.frequency)
      .create();

  } else if (data.unit == "week") {
    var date = new Date();
    console.log(date.getHours());
    console.log(date, date.getDay());

    trigger = ScriptApp.newTrigger('triggerCall')
      .timeBased()
      .everyWeeks(data.frequency)
      .onWeekDay(utils().getDayOfWeek(date.getDay()))
      .create();

  } else if (data.unit == "month") {
    trigger = ScriptApp.newTrigger('triggerCall')
      .timeBased()
      .everyDays(parseInt(data.frequency) * 30)
      .create();
  }

  // console.log("TriggerID", id, typeof (id));
  let currentDate = utils().getCurrentDate()
  SpreadsheetApp.getActive().getSheetByName("SIP").appendRow([trigger.getUniqueId(), data.tickers, data.frequency, data.unit, data.amount, currentDate]);
  setupTriggerArguments(trigger, data, true);

}

function triggerCall(event) {
  var functionArguments = handleTriggered(event.triggerUid);
  console.log("Function arguments:", functionArguments);
  placeSipOrder(functionArguments, event.triggerUid)
}

/*
  function to place Sip order at every trigger call
  @params {object} data -> arguments of the Sip (coin, freuency and amount)
  @params {string} triggerId -> the trigger id of the trigger which is placing the order
*/
function placeSipOrder(data, triggerId) {
  data = JSON.parse(data);
  tasks().load_apiKeys();
  let coin = data.tickers
  let sipAmount = data.amount
  tasks().getSellOrderBook(coin, function (error, res) {
    console.log(res)
    if (res.status == 1) {

      let volume_available = 0;
      let max_sell_price_available = 0;
      for (let idx = 0; idx < res.data.length; idx++) {
        volume_available += res.data[idx].btc;// Here .btc represent Volume
        max_sell_price_available = Math.max(max_sell_price_available, parseFloat(res.data[idx].rate));
        if (volume_available * max_sell_price_available >= sipAmount) {
          break;
        }
      }
      if (volume_available * max_sell_price_available >= sipAmount) {
        let volume_to_buy = parseFloat(sipAmount / max_sell_price_available)
        tasks().placeBuyOrder(coin, volume_to_buy, max_sell_price_available, function (error, res) {
          if (res.status) {
            console.log('OrderId ::', res);
          } else {
            let message = `Your SIP with Trigger id : ${triggerId} ,token : ${data.tickers}, amount: ${data.amount} , with the frequency of ${data.frequency} ${data.unit} could not be placed because of ${res.data} `
            // utils().sendMail(message);
            console.log('Error ::', res.data);
          }
        })

        console.log(`volume_to_buy :: ${volume_to_buy}`)
        console.log(`amount that'll be invested :: ${volume_to_buy * max_sell_price_available}`)
        console.log(`Volume Available:: ${volume_available} \n Volume Buy:: ${volume_to_buy} \n Max sell price Available:: ${max_sell_price_available} \n `)
      }
      else {
        console.log("Volume insufficent");
      }

    }
    else
      console.log(res.msg)
  });
}



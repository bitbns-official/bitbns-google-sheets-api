/**function to add Sip trigger
 * Hourly,weekly and monthly orders will be placed instantly. Daily orders will be placed at midnight
  *@params {object} data -> arguments of the Sip (coin, freuency and amount)
*/
function addSip(data) {
  var trigger;
  console.log(data);

  if (data.unit == "hour") {
    trigger = ScriptApp.newTrigger('triggerCall')
      .timeBased()
      .everyHours(data.frequency)
      .create();
    placeSipOrder(JSON.stringify(data), trigger.getUniqueId());
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
    placeSipOrder(JSON.stringify(data), trigger.getUniqueId());
  } else if (data.unit == "month") {
    trigger = ScriptApp.newTrigger('triggerCall')
      .timeBased()
      .everyDays(parseInt(data.frequency) * 30)
      .create();
    placeSipOrder(JSON.stringify(data), trigger.getUniqueId());
  }

  // console.log("TriggerID", id, typeof (id));
  let currentDate = utils().getCurrentDate()
  let market = "INR"
  if (data.tickers.toString().includes("USDT") && data.tickers.toString() != "USDT")
    market = "USD"
  SpreadsheetApp.getActive().getSheetByName("SIP").appendRow([trigger.getUniqueId(), data.tickers, data.frequency, data.unit, data.amount, currentDate, market]);
  var values = SpreadsheetApp.getActive().getSheetByName("SIP").getRange("A:G")
  // values.setBackground("black");
  values.setFontColor("#fbbc04")
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
        let coin2 = coin
        // console.log(coin)
        if (coin != "USDT" && coin.toString().includes("USDT")) {
          coin2 = coin2.slice(0, -4) + "_USDT"
          console.log(coin2)
        }

        let placeOrderObject = {
          symbol: coin2,
          side: 'BUY',
          quantity: volume_to_buy,
          rate: max_sell_price_available,
        }
        tasks().placeOrders(placeOrderObject, function (error, res) {
          if (res.status) {
            console.log('OrderId ::', res);
          } else {
            if (res.code == "416") {
              let message = `Your SIP with Trigger id : ${triggerId}, token : ${data.tickers}, amount: ${data.amount}, with the frequency of ${data.frequency} ${data.unit} could not be placed because of insufficient balance. We request you to add money to your wallet. Till their is insufficient balance, your SIP order will keep getting rejected. `

              utils().sendMail(message);
            } else if (res.code == "413") {
              let message = `Your SIP with Trigger id : ${triggerId}, token : ${data.tickers}, amount: ${data.amount}, with the frequency of ${data.frequency} ${data.unit} could not be placed because of more than 2x increase in price of ${data.tickers} since the day of SIP initiation. We request you to cancel this SIP and start again with a higher investment amount as this coin has given significant return since the begining of your SIP. `
              utils().sendMail(message);
            }

            console.log('Error ::', res.data);
          }
        })

        console.log(`Volume_to_buy :: ${volume_to_buy}`)
        console.log(`Amount that'll be invested :: ${volume_to_buy * max_sell_price_available}`)
        console.log(`Volume Available:: ${volume_available} \nVolume Buy:: ${volume_to_buy} \nMax sell price Available:: ${max_sell_price_available} \n `)
      }
      else {
        console.log("Insufficent volume of coin in the market");
      }

    }
    else
      console.log(res.msg)
  });
}



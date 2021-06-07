
/*
This file has all the utility functions required for api usage.
Returns requestAuthenticate, verifyApiKeys, makePostRequest, alertMessage, sendMail functions as objects to other files
For more details, refer to https://github.com/bitbns-official/node-bitbns-api
*/
function utils() {
  let baseURL = "https://api.bitbns.com/api/trade/v1";
  let baseURL2 = "https://api.bitbns.com/api/trade/v2"
  const api_headers = {
    "X-BITBNS-APIKEY": "",
    "X-BITBNS-PAYLOAD": "",
    "X-BITBNS-SIGNATURE": "",
    "Accept": "application/json",
    "Accept-Charset": "utf-8",
    "content-type": "application/x-www-form-urlencoded",
  };
  return {
    requestAuthenticate,
    verifyApiKeys,
    makePostRequest,
    makePostRequest2,
    setOption,
    requestAuthenticate2,
    getAllSymbols,
    alertMessage,
    sendMail,
    getDayOfWeek
  };

  /*
  Authentication and validation functions required to authenticate input data such as api keys, symbols.
  */
  function requestAuthenticate(symbols, callback) {
    if (typeof (symbols) !== 'string' || symbols.length < 1) {
      throw Error('Prices apiError :: symbols not found.');
    }
    if (typeof (callback) !== 'function') {
      throw Error('Prices apiError :: Callback not found.');
    }
  }
  function requestAuthenticate2(orders_obj, callback) {
    if (typeof (orders_obj.symbol) !== 'string' || typeof (orders_obj.side) != 'string')
      throw Error('Invalid Object Passed');
    if (typeof (callback) !== 'function')
      throw Error('Prices apiError :: Callback not found.');
  }

  function verifyApiKeys(data) {
    if (typeof (data.apiKey) === 'string' && data.apiKey.length >= 5 && typeof (data.apiSecretKey) === 'string' && data.apiSecretKey.length >= 5) {
      return true;
    }
    else {
      return false;
    }
  }

  function setOption(method, route, headers = {}, body = {}) {
    let options = {
      url: baseURL + route,
      method: method,
      headers: headers,
      // payload: JSON.stringify(body),
      muteHttpExceptions: true
    };
    return options;
  }
  /*
  Generates payload which would be used to generate signature
  timStamp_nonce :: time of the local machine - delta 
  delta is the timeOffset which would be calculated as soon as the user loads his/her api keys
  It is used to overcome the delay between the local machine and the server
 
  For ease of use, you can directly fetch the server time but that would not be recommended as we should make as less api calls as possible
  */
  function getPayload(symbols, body) {
    // var timeStamp_nonce = parseInt(parseInt(Date.now())) - parseInt(timeOffset)
    let timeStamp_nonce = parseInt(Date.now());
    console.log(`timestamp :: ${timeStamp_nonce}`);
    /*
    Final payload generation
 
    To read more about base64 encoding in appscript,follow the below link:
    https://developers.google.com/apps-script/reference/utilities/utilities#base64Encode(Byte)
     */
    const data = {
      symbol: symbols,
      timeStamp_nonce: timeStamp_nonce,
      body: body
    };
    Logger.log(`Data :: ${JSON.stringify(data)}`)
    let encodedPayload = Utilities.base64Encode(JSON.stringify(data), Utilities.Charset.UTF_8).toString()
    // Logger.log(`encoded payload :: ${encodedPayload}`)
    return encodedPayload
  }



  function populateHeadersForPost(symbols, methodName, body) {
    let headers = api_headers;
    let payload = getPayload(`/${methodName}/${symbols}`, body);
    let signature = getSignature(payload, apiKeys.apiSecretKey);
    // console.log(payload,typeof(payload));
    headers["X-BITBNS-APIKEY"] = apiKeys.apiKey;
    headers["X-BITBNS-PAYLOAD"] = payload;
    headers["X-BITBNS-SIGNATURE"] = signature;
    return headers;
  }

  function getSignature(payload, apiSecretKey) {

    var byteSignature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, payload, apiSecretKey, Utilities.Charset.UTF_8);
    /*
    Converting byte array to hex string i.e digesting
    Apps script doesn't provide hex digestion.
    The digestion algorithm was taken from here: 
    https://stackoverflow.com/questions/41232615/how-to-get-hex-value-from-computehmacsha256signature-method-of-google-apps-scrip
    */
    var signature = byteSignature.reduce(function (str, chr) {
      chr = (chr < 0 ? chr + 256 : chr).toString(16);
      return str + (chr.length == 1 ? '0' : '') + chr;
    }, '');
    // Logger.log(`Signature :: ${signature}`)
    return signature

  }
  /**This function makes api calls to v1 version :: "https://api.bitbns.com/api/trade/v1"
   * Another function would be added to make api calls to v2 version :: "https://api.bitbns.com/api/trade/v2" 
   * */

  function makePostRequest(symbols, methodName, body, callback) {
    body = JSON.stringify(body)
    var options = {
      url: baseURL + '/' + methodName + '/' + symbols,
      method: "post",
      // body: body,
      payload: body,
      muteHttpExceptions: true,
    }

    var url = baseURL + '/' + methodName + '/' + symbols;
    let headers = populateHeadersForPost(symbols, methodName, body);
    options.headers = headers;
    console.log("options send to the api", options)

    let query = UrlFetchApp.fetch(url, options).getContentText()
    query = JSON.parse(query)
    console.log("response from api", query)
    if (!query.error) {
      try {
        body = query;
        return callback("", body);
      } catch (err) {
        // Logger.log(query.getContentText())
        return callback("Invalid Non-JSON response " + methodName, "");
      }
    }
    else {
      return callback(query.error, "");
    }
  }
  function makePostRequest2(methodName, body, callback) {
    const options = {
      url: `${baseURL2}/${methodName}`,
      method: 'POST',
      // body: JSON.stringify(body),
      payload: JSON.stringify(body),
      muteHttpExceptions: true,
      followRedirects: true
    }
    let headers = populateHeadersForPost(body.symbol, methodName, JSON.stringify(body));
    options.headers = headers;
    var query = UrlFetchApp.fetch(url, options).getContentText();

    query = JSON.parse(query)
    // Logger.log(`Query Answer :: ${query}`)
    if (!query.error) {
      try {
        body = query;
        return callback("", body);
      } catch (err) {

        return callback(err, "");
      }
    }
    else {
      return callback(error, "");
    }
  }

  /**
   * Used to show and alert to the user
   */
  function alertMessage(message, throw_error = 1) {
    SpreadsheetApp.getUi().alert(message);
    if (throw_error)
      throw Error(message)
  }

  /**
 * Sends an email to the current user with the error.
 */
  function sendMail(message) {

    // Get the email address of the active user - that's you.
    var email = Session.getActiveUser().getEmail();

    var subject = "Bitbns SIP error";

    // Append a new string to the "url" variable to use as an email body.
    var body = message;

    // Send yourself an email with the error.
    GmailApp.sendEmail(email, subject, body);
  }

  function getDayOfWeek(d) {
    let weekobj = ScriptApp.WeekDay
    if (d == 1)
      return weekobj.MONDAY
    else if (d == 2)
      return weekobj.TUESDAY
    else if (d == 3)
      return weekobj.WEDNESDAY
    else if (d == 4)
      return weekobj.THURSDAY
    else if (d == 5)
      return weekobj.FRIDAY
    else if (d == 6)
      return weekobj.SATURDAY
    else
      return weekobj.SUNDAY
  }
}



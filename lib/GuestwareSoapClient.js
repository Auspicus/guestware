var unirest = require('unirest');
var DOMParser = require('xmldom').DOMParser;

/**
 * Create a new GuestwareSoapClient
 * @param       {String} appName       ApplicationName
 * @param       {String} versionNumber VersionNumber
 * @param       {String} appId         Application wrapper ID
 * @param       {String} username      UserName
 * @param       {String} password      PassWord
 * @constructor
 */
function GuestwareSoapClient(wsdl, appName, versionNumber, appId, username, password) {
  this.wsdl = wsdl;
  this.appName = appName;
  this.versionNumber = versionNumber;
  this.appId = appId;
  this.username = username;
  this.password = password;
  this.requestHeader = generateRequestHeader(
    this.appName,
    this.versionNumber,
    this.appId,
    this.username,
    this.password
  );
  this.requestFooter = generateRequestFooter();
  this.domParser = new DOMParser();

  function generateRequestHeader(appName, versionNumber, appId, username, password) {
    return [
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.guestware.com/">',
        '<soapenv:Header>',
          '<web:' + appId + '>',
            '<web:UserName>' + username + '</web:UserName>',
            '<web:PassWord>' + password + '</web:PassWord>',
            '<web:ApplicationName>' + appName + '</web:ApplicationName>',
            '<web:VersionNumber>' + versionNumber + '</web:VersionNumber>',
          '</web:' + appId + '>',
        '</soapenv:Header>',
        '<soapenv:Body>'
    ];
  }

  function generateRequestFooter() {
    return [
        '</soapenv:Body>',
      '</soapenv:Envelope>'
    ];
  }
}

/**
 * Generate a request body for a specific SOAP method
 * @type {Array}
 */
GuestwareSoapClient.prototype.generateMethodBody = function (method, args) {
  var body = [];
  var argKeys = Object.keys(args);
  // Create the method XML object
  body.push('<web:' + method + '>');
  // Create an object for each argument provided, placing the value inside
  argKeys.forEach(function (key) {
    body.push('<web:' + key + '>');
    body.push(args[key]);
    body.push('</web:' + key + '>');
  });
  // Close the method XML object
  body.push('</web:' + method + '>');
  return body;
}

/**
 * Generate a request POST body for a SOAP method
 * @type {Object} -> {raw, string}
 */
GuestwareSoapClient.prototype.generateRequestBody = function (method, arguments) {
  var request = [];
  Array.prototype.push.apply(request, this.requestHeader);
  Array.prototype.push.apply(request, this.generateMethodBody(method, arguments));
  Array.prototype.push.apply(request, this.requestFooter);
  return {
    raw: request,
    string: request.join('')
  };
}

/**
 * Make a SOAP request
 * @type {Promise<Object>}
 */
GuestwareSoapClient.prototype.request = function (method, arguments) {
  var wsdl = this.wsdl;
  var body = this.generateRequestBody(method, arguments).string;
  var doc = this.domParser;
  return new Promise(function (resolve, reject) {
    unirest
    .post(wsdl)
    .headers({
      'Content-Type': 'text/xml'
    })
    .send(body)
    .end(function (response) {
      if (response.code === 200) {
        resolve({
          raw: response.body,
          parsed: doc.parseFromString(response.body, 'text/xml')
        })
      }
      else reject(response);
    });
  });
}

/**
 * Format the SOAP response into a readable JavaScript object format
 * @param  {DOMParser<Document>} parsedResponse
 * @param  {Object}              dataMap -> {guestwareTagName: newJavaScriptObjectKey}
 * @type   {Object}
 */
GuestwareSoapClient.prototype.formatResponse = function(parsedResponse, dataMap) {
  if (dataMap.$$liTagName) {
    var liTagName = dataMap.$$liTagName;
    delete dataMap.$$liTagName;
    var dataMapKeys = Object.keys(dataMap);
    var itemList = parsedResponse.getElementsByTagName(liTagName);
    var resultList = [];
    for (var i = 0; i < itemList.$$length; i++) {
      var result = {};
      dataMapKeys.forEach(function (key) {
        result[dataMap[key]] = itemList[i].getElementsByTagName(key)[0].firstChild.data;
      });
      resultList.push(result);
    }
    return resultList;
  } else {
    var result = {};
    var dataMapKeys = Object.keys(dataMap);
    dataMapKeys.forEach(function (key) {
      result[dataMap[key]] = parsedResponse.getElementsByTagName(key)[0].firstChild.data;
    });
    return result;
  }
}

module.exports = GuestwareSoapClient;

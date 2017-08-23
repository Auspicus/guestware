var unirest = require('unirest');
var DOMParser = require('xmldom').DOMParser;

/**
 * @param {String} appName       ApplicationName
 * @param {String} versionNumber VersionNumber
 * @param {String} username      UserName
 * @param {String} password      PassWord
 * @param {String} appID         SOAP Application Wrapper ID (optional)
 * @constructor
 */
function Guestware(wsdl, appName, versionNumber, username, password, appID) {
  this.wsdl = wsdl;
  this.appName = appName;
  this.versionNumber = versionNumber;
  this.username = username;
  this.password = password;
  this.appID = appID;
  this.domParser = new DOMParser();
}

/**
 * @param  {String}  elementType        type of SOAP element (eg. GUEST_VISIT)
 * @param  {Boolean} elementUpdated     flag for whether element was modified (true) or inserted (false)
 * @param  {String}  elementId          index of element
 * @param  {Object}  elementProperties  values of SOAP element (eg. GuestID)
 * @return {Object} {newObject<Array>, oldObject<Array>}
 */
Guestware.prototype.generateElement = function (
  elementType,
  elementUpdated,
  elementId,
  elementProperties
) {
  function generateElementValue (keyName, keyValue) {
    if (typeof keyValue !== 'undefined') {
      return (
        '<'+keyName+'>'
          + keyValue +
        '</'+keyName+'>'
      );
    }
  }

  var result = {
    newObject: [],
    oldObject: []
  }

  if (typeof elementType === 'undefined'
   || typeof elementUpdated === 'undefined')
    return result;

  elementUpdated = elementUpdated ? 'modified' : 'inserted';

  result.newObject.push(
    '<' + elementType + ' diffgr:id="' + elementType + elementId +
    '" msdata:rowOrder="' + (elementId - 1) + '" diffgr:hasChanges="'
    + elementUpdated + '">');
  if (elementUpdated === 'modified') {
    result.oldObject.push(
      '<' + elementType + ' diffgr:id="' + elementType + elementId +
      '" msdata:rowOrder="' + (elementId - 1) + '">');
  }

  Object.keys(elementProperties).forEach(function (valueKey) {
    if (valueKey !== '$$elementType' && valueKey !== '$$elementUpdateType') {
      result.newObject.push(
        generateElementValue(valueKey, elementProperties[valueKey]));
      if (elementUpdated === 'modified') {
        result.oldObject.push(
          generateElementValue(valueKey, elementProperties[valueKey]));
      }
    }
  });

  result.newObject.push('</' + elementType + '>');
  if (elementUpdated === 'modified') {
    result.oldObject.push('</' + elementType + '>');
  }

  return result;
}

/**
 * @return {Array}
 */
Guestware.prototype.generateReadBody = function (
  method,
  args,
  body
) {
  var body = body || [];
  var argKeys = Object.keys(args);
  // Create the method XML object
  if (typeof method !== 'undefined') body.push('<web:' + method + '>');
  // Create an object for each argument provided, placing the value inside
  argKeys.forEach(function (key) {
    if (typeof args[key] !== 'undefined') {
      body.push('<web:' + key + '>');
      body.push(args[key]);
      body.push('</web:' + key + '>');
    }
  }.bind(this));
  // Close the method XML object
  if (typeof method !== 'undefined') body.push('</web:' + method + '>');
  return body;
}

/**
 * @return {Object} {raw, string}
 */
Guestware.prototype.generateUpdateRequestBody = function (
  method,
  objectName,
  changeList
) {
  var oldList = [];
  var newList = [];
  var typeCounters = {};
  changeList.forEach(function (change, i) {
    if (typeof typeCounters[change.type] === 'undefined')
      typeCounters[change.type] = 1;
    else
      typeCounters[change.type]++;

    var elementBody = this.generateElement(change.type, change.updated, typeCounters[change.type], change.properties);
    Array.prototype.push.apply(newList, elementBody.newObject);
    if (elementBody.oldObject.length > 0) {
      Array.prototype.push.apply(oldList, elementBody.oldObject);
    }
  }.bind(this));

  var request = [];
  Array.prototype.push.apply(request, [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">',
      '<soap:Header>',
        this.appID ? '<' + this.appID + ' xmlns="http://webservices.guestware.com/">' : '',
          '<UserName>' + this.username + '</UserName>',
          '<PassWord>' + this.password + '</PassWord>',
        this.appID ? '</' + this.appID + '>' : '',
      '</soap:Header>',
      '<soap:Body>'
  ]);
  Array.prototype.push.apply(request, [
        '<'+method+' xmlns="http://webservices.guestware.com/">',
          '<'+objectName+' xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" msdata:SchemaSerializationMode="ExcludeSchema">',
            '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://webservices.guestware.com/dstGST.xsd" xmlns:msprop="urn:schemas-microsoft-com:xml-msprop" xmlns:mstns="http://webservices.guestware.com/dstGST.xsd" id="dstGST" targetNamespace="http://webservices.guestware.com/dstGST.xsd" attributeFormDefault="qualified" elementFormDefault="qualified">',
              '<xs:element name="dstGST" msdata:IsDataSet="true" msdata:UseCurrentLocale="true">',
                '<xs:complexType>',
                  '<xs:choice minOccurs="0" maxOccurs="unbounded"/>',
                '</xs:complexType>',
              '</xs:element>',
            '</xs:schema>',
            '<diffgr:diffgram xmlns:diffgr="urn:schemas-microsoft-com:xml-diffgram-v1">'
  ]);
  request.push('<dstGST xmlns="http://webservices.guestware.com/dstGST.xsd">');
  Array.prototype.push.apply(request, newList);
  request.push('</dstGST>');
  request.push('<diffgr:before>');
  Array.prototype.push.apply(request, oldList);
  request.push('</diffgr:before>');
  Array.prototype.push.apply(request, [
            '</diffgr:diffgram>',
          '</'+objectName+'>',
        '</'+method+'>'
  ]);
  Array.prototype.push.apply(request, [
      '</soap:Body>',
    '</soap:Envelope>'
  ]);

  return {
    raw: request,
    string: request.join('')
  };
}

/**
 * @return {Object} {raw, string}
 */
Guestware.prototype.generateReadRequestBody = function (
  method,
  args
) {
  var request = [];
  Array.prototype.push.apply(request, [
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.guestware.com/">',
      '<soapenv:Header>',
        '<web:' + this.appID + '>',
          '<web:UserName>' + this.username + '</web:UserName>',
          '<web:PassWord>' + this.password + '</web:PassWord>',
          '<web:ApplicationName>' + this.appName + '</web:ApplicationName>',
          '<web:VersionNumber>' + this.versionNumber + '</web:VersionNumber>',
        '</web:' + this.appID + '>',
      '</soapenv:Header>',
      '<soapenv:Body>'
  ]);
  Array.prototype.push.apply(request, this.generateReadBody(method, args));
  Array.prototype.push.apply(request, [
      '</soapenv:Body>',
    '</soapenv:Envelope>'
  ]);
  return {
    raw: request,
    string: request.join('')
  };
}

/**
 * @param  {String} body
 * @return {Promise<Object>} {raw, parsed}
 */
Guestware.prototype.generateRequest = function (
  body
) {
  var wsdl = this.wsdl;
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
        });
      }
      else reject(response);
    });
  });
}

/**
 * @param {String} method     SOAP update method name eg. 'UpdateGuestDetailTables'
 * @param {String} objectName SOAP object name eg. 'pardstGuestDetailTables'
 * @param {Array}  changeList
 * @return {Promise<Object>}
 */
Guestware.prototype.update = function (
  method,
  objectName,
  changeList
) {
  return this.generateRequest(
    this.generateUpdateRequestBody(method, objectName, changeList).string
  );
}

/**
 * @param {String} method     SOAP read method name eg. 'ReadGuestLogin'
 * @param {Object} args       request arguments eg. {parstrGuestID: 0}
 * @return {Promise<Object>}
 */
Guestware.prototype.read = function (
  method,
  args
) {
  return this.generateRequest(
    this.generateReadRequestBody(method, args).string
  );
}

/**
 * Format the SOAP response into a readable object / array format
 * @param  {Object}    parsedResponse response.parsed
 * @param  {Object}    options {liTagName, map} or {...map}
 * @param  {Boolean}   verbose
 * @return {Object}
 */
Guestware.prototype.formatResponse = function(
  parsedResponse,
  options,
  verbose
) {
  if (options.liTagName) {
    try {
      var itemList = parsedResponse.getElementsByTagName(options.liTagName);
    } catch (err) {
      throw err;
    }
    var propertyKeys = Object.keys(options.map);
    var resultList = [];
    for (var i = 0; i < itemList.$$length; i++) {
      var result = {};
      propertyKeys.forEach(function (key) {
        try {
          result[key] = itemList[i].getElementsByTagName(options.map[key])[0].firstChild.data;
        } catch (err) {
          if (verbose) console.error('[WARNING] Failed to find key: ' + key);
        }
      });
      resultList.push(result);
    }
    return resultList;
  } else {
    var result = {};
    var propertyKeys = Object.keys(options);
    propertyKeys.forEach(function (key) {
      try {
        result[key] = itemList[i].getElementsByTagName(options[key])[0].firstChild.data;
      } catch (err) {
        if (verbose) console.error('[WARNING] Failed to find key: ' + key);
      }
    });
    return result;
  }
}

/**
 * @param methodName SOAP method name
 * @param data mock response data (formatted like an Update request body)
 * @return {Object} {raw, parsed}
 */
Guestware.prototype.generateMockResponse = function (methodName, data) {
  var output = [];
  Array.prototype.push.apply(output, [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">',
      '<soap:Body>',
        '<'+methodName+'Response xmlns="http://webservices.guestware.com/">',
          '<'+methodName+'Result msdata:SchemaSerializationMode="ExcludeSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">',
            '<xs:schema id="dstGST" targetNamespace="http://webservices.guestware.com/dstGST.xsd" xmlns:mstns="http://webservices.guestware.com/dstGST.xsd" xmlns="http://webservices.guestware.com/dstGST.xsd" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" xmlns:msprop="urn:schemas-microsoft-com:xml-msprop" attributeFormDefault="qualified" elementFormDefault="qualified">',
              '<xs:element name="dstGST" msdata:IsDataSet="true" msdata:UseCurrentLocale="true">',
                '<xs:complexType>',
                  '<xs:choice minOccurs="0" maxOccurs="unbounded" />',
                '</xs:complexType>',
              '</xs:element>',
            '</xs:schema>',
            '<diffgr:diffgram xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" xmlns:diffgr="urn:schemas-microsoft-com:xml-diffgram-v1">',
              '<dstGST xmlns="http://webservices.guestware.com/dstGST.xsd">',
  ]);
  var typeCounters = {};
  data.forEach(function (dataObject, i) {
    if (typeof typeCounters[dataObject.type] === 'undefined')
      typeCounters[dataObject.type] = 1;
    else typeCounters[dataObject.type]++;
    Array.prototype.push.apply(output, this.generateElement(
      dataObject.type,
      dataObject.updated,
      typeCounters[dataObject.type],
      dataObject.properties
    ).oldObject);
  }.bind(this));
  Array.prototype.push.apply(output, [
              '</dstGST>',
            '</diffgr:diffgram>',
          '</'+methodName+'Result>',
        '</'+methodName+'Response>',
      '</soap:Body>',
    '</soap:Envelope>'
  ]);
  return ({
    raw: output.join(''),
    parsed: this.domParser.parseFromString(output.join(''), 'text/xml')
  });
}


/**
 * @param  {String} guestEmail
 * @return {Promise<Object>}
 */
Guestware.prototype.getGuestInformationByEmail = function (guestEmail) {
  return this.read('ReadGuestLoginGuestIDString', { parstrGuestID: guestEmail })
  .then(function (response) {
    return this.formatResponse(response.parsed, {
      liTagName: 'GUEST_LOGIN',
      map: {
        id: 'GuestID',
        email: 'GuestLoginID',
        password: 'GuestLoginPassword',
        language: 'CultureID',
        logActivity: 'LogActivity',
        disableLogin: 'DisableLogin',
        created: 'EntryDate',
        createdBy: 'EntryBy',
        updated: 'LastEditDate',
        updatedBy: 'LastEditBy'
      }
    })[0];
  }.bind(this))
  .catch(function (err) {
    console.log(err);
  });
}

/**
 * @param  {Integer} guestID
 * @return {Promise<Object>}
 */
Guestware.prototype.getGuestInformationByID = function (guestID) {
  return this.read('ReadGuestLogin', { parintGuestID: guestID })
  .then(function (response) {
    return this.formatResponse(response.parsed, {
      liTagName: 'GUEST_LOGIN',
      map: {
        id: 'GuestID',
        email: 'GuestLoginID',
        password: 'GuestLoginPassword',
        language: 'CultureID',
        logActivity: 'LogActivity',
        disableLogin: 'DisableLogin',
        created: 'EntryDate',
        createdBy: 'EntryBy',
        updated: 'LastEditDate',
        updatedBy: 'LastEditBy'
      }
    })[0];
  }.bind(this))
  .catch(function (err) {
    console.log(err);
  });
}

/**
 * @param  {Integer} guestID
 * @param  {String}  locationID (optional)
 * @return {Promise<Object>}
 */
Guestware.prototype.getGuestVisits = function (guestID, locationID) {
  return this.read('ReadGuestVisit', {
    parintGuestID: guestID,
    parstrLocationID: locationID
  })
  .then(function (response) {
    return this.formatResponse(response.parsed, {
      liTagName: 'GUEST_VISIT',
      map: {
        id: 'VisitLogNo',
        confirmation: 'ConfirmationNo',
        location: 'LocationID',
        status: 'VisitStatus',
        arrival: 'ArrivalDate',
        departure: 'DepartureDate',
        reservationDate: 'ReservationDate',
        reservationSource: 'ReservationSource',
        roomNumber: 'RoomNo',
        roomType: 'RoomType',
        roomRate: 'RoomRate',
        revenueRoom: 'VisitRoomRevenue',
        revenueFb: 'VisitFBRevenue',
        revenueMisc: 'VisitMiscRevenue',
        revenueUserDef1: 'UserDefRevenue1',
        revenueUserDef2: 'UserDefRevenue2',
        currency: 'CurrencyCode',
        marketCode: 'MarketCode',
        note: 'VisitNote',
        numberOfVisits: 'NumberOfVisits',
        numberOfNights: 'NumberOfNights',
        created: 'EntryDate',
        createdBy: 'EntryBy',
        updated: 'LastEditDate',
        updatedBy: 'LastEditBy',
        folioId: 'FolioID',
        visitRecordType: 'VisitRecordType'
      }
    })
  }.bind(this))
  .catch(function (err) {
    console.log(err);
  });
}

/**
 * @param  {Array} details
 * @return {Promise<Object>}
 */
Guestware.prototype.updateGuestDetails = function (details) {
  return this.update(
    'UpdateGuestDetailTables',
    'pardstGuestDetailTables',
    details
  );
}

/**
 * @param  {Integer} guestID
 * @return {Promise<Object>}
 */
Guestware.prototype.getGuestDetails = function (guestID) {
  return this.read('ReadGuestDetailTables', {
    parintGuestID: guestID
  })
  .then(function (response) {
    return {
      guest: this.formatResponse(response.parsed, {
        liTagName: 'GUEST',
        map: {
          id: 'GuestID',
          program: 'GstRecordType',
          type: 'ProfileType',
          first_name: 'GivenName',
          last_name: 'Surname',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }),
      classes: this.formatResponse(response.parsed, {
        liTagName: 'GUEST_CLASS',
        map: {
          id: 'GuestID',
          classId: 'GuestClassID',
          className: 'ClassName',
          classReason: 'ClassReason',
          location: 'LocationID',
          start: 'StartDate',
          end: 'EndDate',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }),
      communications: this.formatResponse(response.parsed, {
        liTagName: 'GUEST_COMM_METHOD',
        map: {
          id: 'GuestID',
          type: 'GuestCommType',
          value: 'CommValue',
          format: 'FormatType',
          optOut: 'OptOut',
          preferred: 'PreferredFlag',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }),
      events: this.formatResponse(response.parsed, {
        liTagName: 'GUEST_EVENT',
        map: {
          id: 'GuestID',
          type: 'GuestEventType',
          order: 'DisplayOrder'
        }
      }),
      ids: this.formatResponse(response.parsed, {
        liTagName: 'GUEST_ISSUED_ID',
        map: {
          id: 'GuestID',
          logNumber: 'IssueLogNo',
          contactType: 'ContactType',
          associateName: 'AssociateName',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }),
      addresses: this.formatResponse(response.parsed, {
        liTagName: 'GUEST_ADDRESS',
        map: {
          id: 'GuestID',
          type: 'AddressType',
          string: 'CompleteAddress',
          country: 'CountryCode',
          postal: 'PostalCode',
          state: 'StateCode',
          city: 'City',
          address1: 'AddressLine1',
          address2: 'AddressLine2',
          undeliverable: 'Undeliverable',
          preferred: 'PreferredFlag',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }),
      interests: this.formatResponse(response.parsed, {
        liTagName: 'GUEST_INTERESTS',
        map: {
          id: 'GuestID',
          interest: 'Interest',
          commFormatType: 'CommFormatType',
          optOut: 'OptOut',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }),
      logins: this.formatResponse(response.parsed, {
        liTagName: 'GUEST_LOGIN',
        map: {
          id: 'GuestID',
          email: 'GuestLoginID',
          password: 'GuestLoginPassword',
          language: 'CultureID',
          logActivity: 'LogActivity',
          disableLogin: 'DisableLogin',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      })
    };
  }.bind(this));
}

/**
 * @param  {Integer} guestID
 * @return {Promise<Object>}
 */
Guestware.prototype.getGuestRewards = function (guestID) {
  return this.read('ReadGuestRewardTransactionAndDetailsByGuestID', {
    parintGuestID: guestID
  });
}

/**
 * @param  {Integer} guestID
 * @return {Promise<Object>}
 */
Guestware.prototype.getGuestRewardBalance = function (guestID) {
  return this.read('ReadGuestRewardBalance', {
    parintGuestID: guestID
  });
}

module.exports = Guestware;

import fetch from 'node-fetch'
import { DOMParser } from 'xmldom'
import { useNamespaces as XPathSelectWithNamespaces } from 'xpath'

import Client from './Client'
import Configuration from './Configuration'

import ReadGuestLoginRequest from './Soap/Method/ReadGuestLoginRequest'
import ReadGuestLoginGuestIDStringRequest from './Soap/Method/ReadGuestLoginGuestIDStringRequest'
import ReadGuestVisitRequest from './Soap/Method/ReadGuestVisitRequest'
import ReadGuestDetailTablesRequest from './Soap/Method/ReadGuestDetailTablesRequest'
import ReadGuestRewardTransactionAndDetailsByGuestIDRequest from './Soap/Method/ReadGuestRewardTransactionAndDetailsByGuestIDRequest'
import ReadGuestRewardBalanceRequest from './Soap/Method/ReadGuestRewardBalanceRequest'

import DatasetGuest from './Soap/Dataset/DatasetGuest'
import DatasetGuestRow from './Soap/Dataset/DatasetGuestRow'
import DiffgramRowAction from './Soap/DiffgramRowAction'
import UpdateGuestDetailTablesRequest from './Soap/Method/UpdateGuestDetailTablesRequest'
import SoapRequest from './Soap/SoapRequest'

class Legacy {
  
  parser: DOMParser
  client: Client

  constructor(
    wsdl: string,
    appName: string,
    version: string,
    username: string,
    password: string,
    appId: string,
  ) {
    const configuration = new Configuration({
      wsdl,
      appName,
      appId,
      version,
      username,
      password,
    })
    this.parser = new DOMParser()
    this.client = new Client({
      transport: fetch,
      configuration,
    })
  }

  read(method, args) {
    return this.client.send(
      new SoapRequest(
        this.generateReadRequestBody(
          method,
          args
        ).string
      )
    )
  }

  generateReadRequestBody(method, args) {
    var request = [];
    Array.prototype.push.apply(request, [
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.guestware.com/">',
        '<soapenv:Header>',
          this.client.configuration.appId ? '<web:' + this.client.configuration.appId + '>' : '',
            '<web:UserName>' + this.client.configuration.username + '</web:UserName>',
            '<web:PassWord>' + this.client.configuration.password + '</web:PassWord>',
            '<web:ApplicationName>' + this.client.configuration.appName + '</web:ApplicationName>',
            '<web:VersionNumber>' + this.client.configuration.version + '</web:VersionNumber>',
          this.client.configuration.appId ? '</web:' + this.client.configuration.appId + '>' : '',
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

  generateReadBody(method, args, body?) {
    var body = body || [];
    var argKeys = Object.keys(args);
    // Create the method XML object
    if (typeof method !== 'undefined') body.push('<web:' + method + '>');
    // Create an object for each argument provided, placing the value inside
    argKeys.forEach(function (key) {
      if (typeof args[key] !== 'undefined') {
        if (typeof args[key] !== 'object') {
          body.push('<web:' + key + '>');
          body.push(args[key]);
          body.push('</web:' + key + '>');
        } else {
          body.push('<web:pardstGST msdata:SchemaSerializationMode="ExcludeSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata"><xs:schema id="dstGST" targetNamespace="http://webservices.guestware.com/dstGST.xsd" xmlns:mstns="http://webservices.guestware.com/dstGST.xsd" xmlns="http://webservices.guestware.com/dstGST.xsd" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" xmlns:msprop="urn:schemas-microsoft-com:xml-msprop" attributeFormDefault="qualified" elementFormDefault="qualified"><xs:element name="dstGST" msdata:IsDataSet="true" msdata:UseCurrentLocale="true"><xs:complexType><xs:choice minOccurs="0" maxOccurs="unbounded"/></xs:complexType></xs:element></xs:schema><diffgr:diffgram xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" xmlns:diffgr="urn:schemas-microsoft-com:xml-diffgram-v1"><dstGST xmlns="http://webservices.guestware.com/dstGST.xsd"><virtual_QueryInputParameters diffgr:id="virtual_QueryInputParameters1" msdata:rowOrder="0" diffgr:hasChanges="inserted">')
          Object.keys(args[key]).forEach(function (objKey) {
            body.push('<' + objKey + '>');
            body.push(args[key][objKey]);
            body.push('</' + objKey + '>');
          });
          body.push('</virtual_QueryInputParameters></dstGST></diffgr:diffgram></web:pardstGST>');
        }
      }
    }.bind(this));
    // Close the method XML object
    if (typeof method !== 'undefined') body.push('</web:' + method + '>');
    return body;
  }

  update(method, objectName, changeList) {
    this.client.send(
      new SoapRequest(
        this.generateUpdateRequestBody(
          method,
          objectName,
          changeList
        ).string
      )
    )
  }

  generateUpdateRequestBody(method, objectName, changeList) {
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
          this.client.configuration.appId ? '<' + this.client.configuration.appId + ' xmlns="http://webservices.guestware.com/">' : '',
            '<UserName>' + this.client.configuration.username + '</UserName>',
            '<PassWord>' + this.client.configuration.password + '</PassWord>',
            '<ApplicationName>' + this.client.configuration.appName + '</ApplicationName>',
            '<VersionNumber>' + this.client.configuration.version + '</VersionNumber>',
          this.client.configuration.appId ? '</' + this.client.configuration.appId + '>' : '',
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

  generateElement(elementType, elementUpdated, elementId, elementProperties) {
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
        '" xmlns="http://webservices.guestware.com/dstGST.xsd" msdata:rowOrder="' + (elementId - 1) + '">');
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

  async getGuestInformationByID(id: string): Promise<{
    id: string
    email?: string
    password?: string
    language?: string
    logActivity?: string
    disableLogin?: string
    created?: string
    createdBy?: string
    updated?: string
    updatedBy?: string
  }> {
    const xmlResponse = await this.client.send(new ReadGuestLoginRequest(id))
    return (
      this.formatResponse(this.parser.parseFromString(xmlResponse), {
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
      }).shift()
    )
  }

  async getGuestInformationByEmail(email: string): Promise<{
    id: string
    email?: string
    password?: string
    language?: string
    logActivity?: string
    disableLogin?: string
    created?: string
    createdBy?: string
    updated?: string
    updatedBy?: string
  }> {
    const xmlResponse = await this.client.send(new ReadGuestLoginGuestIDStringRequest(email))
    return (
      this.formatResponse(this.parser.parseFromString(xmlResponse), {
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
      }).shift()
    )
  }

  async getGuestDetails(id: string) {
    const xmlResponse = await this.client.send(new ReadGuestDetailTablesRequest(id))
    const parsed = this.parser.parseFromString(xmlResponse)
    return ({
      guest: this.formatResponse(parsed, {
        liTagName: 'GUEST',
        map: {
          id: 'GuestID',
          program: 'GstRecordType',
          type: 'ProfileType',
          source: 'Source',
          first_name: 'GivenName',
          last_name: 'Surname',
          created: 'EntryDate',
          createdBy: 'EntryBy',
          updated: 'LastEditDate',
          updatedBy: 'LastEditBy'
        }
      }),
      classes: this.formatResponse(parsed, {
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
      communications: this.formatResponse(parsed, {
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
      events: this.formatResponse(parsed, {
        liTagName: 'GUEST_EVENT',
        map: {
          id: 'GuestID',
          type: 'GuestEventType',
          order: 'DisplayOrder'
        }
      }),
      ids: this.formatResponse(parsed, {
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
      addresses: this.formatResponse(parsed, {
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
      interests: this.formatResponse(parsed, {
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
      logins: this.formatResponse(parsed, {
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
    })
  }

  async getGuestVisits(guestID: string, locationID?: string): Promise<object[]> {
    const xmlResponse = await this.client.send(new ReadGuestVisitRequest(guestID, locationID))
    return (
      this.formatResponse(this.parser.parseFromString(xmlResponse), {
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
    )
  }

  async getGuestRewards(guestID: string) {
    const xmlResponse = await this.client.send(new ReadGuestRewardTransactionAndDetailsByGuestIDRequest(guestID))

    return {
      parsed: this.parser.parseFromString(xmlResponse),
      raw: xmlResponse
    }
  }

  async getGuestRewardBalance(guestID: string) {
    const xmlResponse = await this.client.send(new ReadGuestRewardBalanceRequest(guestID))

    return {
      parsed: this.parser.parseFromString(xmlResponse),
      raw: xmlResponse
    }
  }

  async updateGuestDetails(details: {
    type: string,
    updated: boolean,
    properties: { [fieldName: string]: string }
  }[]): Promise<{ parsed: Document, raw: string }> {
    const dataset = this.detailMapToDataset(details)
    const xmlResponse = await this.client.send(new UpdateGuestDetailTablesRequest(dataset))

    return {
      parsed: this.parser.parseFromString(xmlResponse),
      raw: xmlResponse
    }
  }

  detailMapToDataset(details: {
    type: string,
    updated: boolean,
    properties: { [fieldName: string]: string }
  }[]): DatasetGuest {
    return new DatasetGuest(details.map(detail => {
      return new DatasetGuestRow(
        detail.type,
        detail.updated ? DiffgramRowAction.Modified : DiffgramRowAction.Inserted,
        detail.properties
      )
    }))
  }

  formatResponse(parsed: Document, options: {
    liTagName: string,
    map: { [name: string]: string }
  }) {
    const { liTagName, map } = options
    const result = []
    const XPathSelect = XPathSelectWithNamespaces({ dstGST: 'http://webservices.guestware.com/dstGST.xsd' })
    XPathSelect(`//dstGST:${liTagName}`, parsed).forEach(node => {
      const item = {}
      Object.keys(map).forEach(key => {
        item[key] = XPathSelect(`dstGST:${map[key]}/text()`, <Node> node, true).toString()
      })
      result.push(item)
    })
    return result
  }

}

export default Legacy
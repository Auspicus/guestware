"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
var xmldom_1 = require("xmldom");
var xpath_1 = require("xpath");
var Client_1 = require("./Client");
var Configuration_1 = require("./Configuration");
var ReadGuestLoginRequest_1 = require("./Soap/Method/ReadGuestLoginRequest");
var ReadGuestLoginGuestIDStringRequest_1 = require("./Soap/Method/ReadGuestLoginGuestIDStringRequest");
var ReadGuestVisitRequest_1 = require("./Soap/Method/ReadGuestVisitRequest");
var ReadGuestDetailTablesRequest_1 = require("./Soap/Method/ReadGuestDetailTablesRequest");
var ReadGuestRewardTransactionAndDetailsByGuestIDRequest_1 = require("./Soap/Method/ReadGuestRewardTransactionAndDetailsByGuestIDRequest");
var ReadGuestRewardBalanceRequest_1 = require("./Soap/Method/ReadGuestRewardBalanceRequest");
var DatasetGuest_1 = require("./Soap/Dataset/DatasetGuest");
var DatasetGuestRow_1 = require("./Soap/Dataset/DatasetGuestRow");
var DiffgramRowAction_1 = require("./Soap/DiffgramRowAction");
var UpdateGuestDetailTablesRequest_1 = require("./Soap/Method/UpdateGuestDetailTablesRequest");
var SoapRequest_1 = require("./Soap/SoapRequest");
var Legacy = /** @class */ (function () {
    function Legacy(wsdl, appName, version, username, password, appId) {
        var configuration = new Configuration_1["default"]({
            wsdl: wsdl,
            appName: appName,
            appId: appId,
            version: version,
            username: username,
            password: password
        });
        this.parser = new xmldom_1.DOMParser();
        this.client = new Client_1["default"]({
            transport: node_fetch_1["default"],
            configuration: configuration
        });
    }
    Legacy.prototype.read = function (method, args) {
        return this.client.send(new SoapRequest_1["default"](this.generateReadRequestBody(method, args).string));
    };
    Legacy.prototype.generateReadRequestBody = function (method, args) {
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
    };
    Legacy.prototype.generateReadBody = function (method, args, body) {
        var body = body || [];
        var argKeys = Object.keys(args);
        // Create the method XML object
        if (typeof method !== 'undefined')
            body.push('<web:' + method + '>');
        // Create an object for each argument provided, placing the value inside
        argKeys.forEach(function (key) {
            if (typeof args[key] !== 'undefined') {
                if (typeof args[key] !== 'object') {
                    body.push('<web:' + key + '>');
                    body.push(args[key]);
                    body.push('</web:' + key + '>');
                }
                else {
                    body.push('<web:pardstGST msdata:SchemaSerializationMode="ExcludeSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata"><xs:schema id="dstGST" targetNamespace="http://webservices.guestware.com/dstGST.xsd" xmlns:mstns="http://webservices.guestware.com/dstGST.xsd" xmlns="http://webservices.guestware.com/dstGST.xsd" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" xmlns:msprop="urn:schemas-microsoft-com:xml-msprop" attributeFormDefault="qualified" elementFormDefault="qualified"><xs:element name="dstGST" msdata:IsDataSet="true" msdata:UseCurrentLocale="true"><xs:complexType><xs:choice minOccurs="0" maxOccurs="unbounded"/></xs:complexType></xs:element></xs:schema><diffgr:diffgram xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" xmlns:diffgr="urn:schemas-microsoft-com:xml-diffgram-v1"><dstGST xmlns="http://webservices.guestware.com/dstGST.xsd"><virtual_QueryInputParameters diffgr:id="virtual_QueryInputParameters1" msdata:rowOrder="0" diffgr:hasChanges="inserted">');
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
        if (typeof method !== 'undefined')
            body.push('</web:' + method + '>');
        return body;
    };
    Legacy.prototype.update = function (method, objectName, changeList) {
        this.client.send(new SoapRequest_1["default"](this.generateUpdateRequestBody(method, objectName, changeList).string));
    };
    Legacy.prototype.generateUpdateRequestBody = function (method, objectName, changeList) {
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
            '<' + method + ' xmlns="http://webservices.guestware.com/">',
            '<' + objectName + ' xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" msdata:SchemaSerializationMode="ExcludeSchema">',
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
            '</' + objectName + '>',
            '</' + method + '>'
        ]);
        Array.prototype.push.apply(request, [
            '</soap:Body>',
            '</soap:Envelope>'
        ]);
        return {
            raw: request,
            string: request.join('')
        };
    };
    Legacy.prototype.generateElement = function (elementType, elementUpdated, elementId, elementProperties) {
        function generateElementValue(keyName, keyValue) {
            if (typeof keyValue !== 'undefined') {
                return ('<' + keyName + '>'
                    + keyValue +
                    '</' + keyName + '>');
            }
        }
        var result = {
            newObject: [],
            oldObject: []
        };
        if (typeof elementType === 'undefined'
            || typeof elementUpdated === 'undefined')
            return result;
        elementUpdated = elementUpdated ? 'modified' : 'inserted';
        result.newObject.push('<' + elementType + ' diffgr:id="' + elementType + elementId +
            '" msdata:rowOrder="' + (elementId - 1) + '" diffgr:hasChanges="'
            + elementUpdated + '">');
        if (elementUpdated === 'modified') {
            result.oldObject.push('<' + elementType + ' diffgr:id="' + elementType + elementId +
                '" xmlns="http://webservices.guestware.com/dstGST.xsd" msdata:rowOrder="' + (elementId - 1) + '">');
        }
        Object.keys(elementProperties).forEach(function (valueKey) {
            if (valueKey !== '$$elementType' && valueKey !== '$$elementUpdateType') {
                result.newObject.push(generateElementValue(valueKey, elementProperties[valueKey]));
                if (elementUpdated === 'modified') {
                    result.oldObject.push(generateElementValue(valueKey, elementProperties[valueKey]));
                }
            }
        });
        result.newObject.push('</' + elementType + '>');
        if (elementUpdated === 'modified') {
            result.oldObject.push('</' + elementType + '>');
        }
        return result;
    };
    Legacy.prototype.getGuestInformationByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var xmlResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.send(new ReadGuestLoginRequest_1["default"](id))];
                    case 1:
                        xmlResponse = _a.sent();
                        return [2 /*return*/, (this.formatResponse(this.parser.parseFromString(xmlResponse), {
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
                            }).shift())];
                }
            });
        });
    };
    Legacy.prototype.getGuestInformationByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var xmlResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.send(new ReadGuestLoginGuestIDStringRequest_1["default"](email))];
                    case 1:
                        xmlResponse = _a.sent();
                        return [2 /*return*/, (this.formatResponse(this.parser.parseFromString(xmlResponse), {
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
                            }).shift())];
                }
            });
        });
    };
    Legacy.prototype.getGuestDetails = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var xmlResponse, parsed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.send(new ReadGuestDetailTablesRequest_1["default"](id))];
                    case 1:
                        xmlResponse = _a.sent();
                        parsed = this.parser.parseFromString(xmlResponse);
                        return [2 /*return*/, ({
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
                            })];
                }
            });
        });
    };
    Legacy.prototype.getGuestVisits = function (guestID, locationID) {
        return __awaiter(this, void 0, void 0, function () {
            var xmlResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.send(new ReadGuestVisitRequest_1["default"](guestID, locationID))];
                    case 1:
                        xmlResponse = _a.sent();
                        return [2 /*return*/, (this.formatResponse(this.parser.parseFromString(xmlResponse), {
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
                            }))];
                }
            });
        });
    };
    Legacy.prototype.getGuestRewards = function (guestID) {
        return __awaiter(this, void 0, void 0, function () {
            var xmlResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.send(new ReadGuestRewardTransactionAndDetailsByGuestIDRequest_1["default"](guestID))];
                    case 1:
                        xmlResponse = _a.sent();
                        return [2 /*return*/, {
                                parsed: this.parser.parseFromString(xmlResponse),
                                raw: xmlResponse
                            }];
                }
            });
        });
    };
    Legacy.prototype.getGuestRewardBalance = function (guestID) {
        return __awaiter(this, void 0, void 0, function () {
            var xmlResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.send(new ReadGuestRewardBalanceRequest_1["default"](guestID))];
                    case 1:
                        xmlResponse = _a.sent();
                        return [2 /*return*/, {
                                parsed: this.parser.parseFromString(xmlResponse),
                                raw: xmlResponse
                            }];
                }
            });
        });
    };
    Legacy.prototype.updateGuestDetails = function (details) {
        return __awaiter(this, void 0, void 0, function () {
            var dataset, xmlResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataset = this.detailMapToDataset(details);
                        return [4 /*yield*/, this.client.send(new UpdateGuestDetailTablesRequest_1["default"](dataset))];
                    case 1:
                        xmlResponse = _a.sent();
                        return [2 /*return*/, {
                                parsed: this.parser.parseFromString(xmlResponse),
                                raw: xmlResponse
                            }];
                }
            });
        });
    };
    Legacy.prototype.detailMapToDataset = function (details) {
        return new DatasetGuest_1["default"](details.map(function (detail) {
            return new DatasetGuestRow_1["default"](detail.type, detail.updated ? DiffgramRowAction_1["default"].Modified : DiffgramRowAction_1["default"].Inserted, detail.properties);
        }));
    };
    Legacy.prototype.formatResponse = function (parsed, options) {
        var liTagName = options.liTagName, map = options.map;
        var result = [];
        var XPathSelect = xpath_1.useNamespaces({ dstGST: 'http://webservices.guestware.com/dstGST.xsd' });
        XPathSelect("//dstGST:" + liTagName, parsed).forEach(function (node) {
            var item = {};
            Object.keys(map).forEach(function (key) {
                item[key] = XPathSelect("dstGST:" + map[key] + "/text()", node, true).toString();
            });
            result.push(item);
        });
        return result;
    };
    return Legacy;
}());
exports["default"] = Legacy;

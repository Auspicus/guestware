"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var SoapRequest_1 = require("../SoapRequest");
var ReadGuestListSearchRequest = /** @class */ (function (_super) {
    __extends(ReadGuestListSearchRequest, _super);
    function ReadGuestListSearchRequest(config) {
        var _this = _super.call(this, '') || this;
        var start = config.start, end = config.end, sortAsc = config.sortAsc, outCount = config.outCount, sortBy = config.sortBy, queryInputParameters = config.queryInputParameters;
        var parstrSortBy = sortBy ? "<web:parstrSortBy>" + sortBy + "</web:parstrSortBy>" : "";
        _this.xml = "\n      <soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:web=\"http://webservices.guestware.com/\">\n        <soapenv:Header>\n            <web:GWCNOBJ>\n              <web:UserName>{{UserName}}</web:UserName>\n              <web:PassWord>{{PassWord}}</web:PassWord>\n              <web:ApplicationName>{{AppName}}</web:ApplicationName>\n              <web:VersionNumber>{{Version}}</web:VersionNumber>\n            </web:GWCNOBJ>\n        </soapenv:Header>\n        <soapenv:Body>\n            <web:ReadGuestListSearch>\n              <web:parintStart>" + start + "</web:parintStart>\n              <web:parintEnd>" + end + "</web:parintEnd>\n              " + parstrSortBy + "\n              <web:parblnSortAsc>" + sortAsc.toString() + "</web:parblnSortAsc>\n              <web:parOUTintCount>" + outCount + "</web:parOUTintCount>\n              <web:pardstGST msdata:SchemaSerializationMode=\"ExcludeSchema\" xmlns:msdata=\"urn:schemas-microsoft-com:xml-msdata\">\n                <xs:schema id=\"dstGST\" targetNamespace=\"http://webservices.guestware.com/dstGST.xsd\" xmlns:mstns=\"http://webservices.guestware.com/dstGST.xsd\" xmlns=\"http://webservices.guestware.com/dstGST.xsd\" xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" xmlns:msdata=\"urn:schemas-microsoft-com:xml-msdata\" xmlns:msprop=\"urn:schemas-microsoft-com:xml-msprop\" attributeFormDefault=\"qualified\" elementFormDefault=\"qualified\">\n                  <xs:element name=\"dstGST\" msdata:IsDataSet=\"true\" msdata:UseCurrentLocale=\"true\">\n                    <xs:complexType>\n                      <xs:choice minOccurs=\"0\" maxOccurs=\"unbounded\"/>\n                    </xs:complexType>\n                  </xs:element>\n                </xs:schema>\n                <diffgr:diffgram xmlns:msdata=\"urn:schemas-microsoft-com:xml-msdata\" xmlns:diffgr=\"urn:schemas-microsoft-com:xml-diffgram-v1\"> \n                  <dstGST xmlns=\"http://webservices.guestware.com/dstGST.xsd\">\n                    " + _this.objectToQueryInputParameters(queryInputParameters) + "\n                  </dstGST>\n                </diffgr:diffgram>\n              </web:pardstGST>\n            </web:ReadGuestListSearch>\n        </soapenv:Body>\n      </soapenv:Envelope>\n    ";
        return _this;
    }
    return ReadGuestListSearchRequest;
}(SoapRequest_1["default"]));
exports["default"] = ReadGuestListSearchRequest;

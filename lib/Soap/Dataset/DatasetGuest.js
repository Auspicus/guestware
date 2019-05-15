"use strict";
exports.__esModule = true;
var DatasetGuestRow_1 = require("./DatasetGuestRow");
var DatasetGuest = /** @class */ (function () {
    function DatasetGuest(components) {
        this.components = components;
    }
    DatasetGuest.prototype.getRow = function (name) {
        return this.components.filter(function (row) { return row.name === name; }).shift();
    };
    DatasetGuest.prototype.getRowN = function (name, n) {
        return this.components.filter(function (row) { return row.name === name; }).slice(n, n + 1).shift();
    };
    DatasetGuest.prototype.serialize = function () {
        var before = '';
        var current = '';
        var seen = {};
        this.components.forEach(function (row) {
            seen[row.name] = typeof seen[row.name] === 'undefined' ? 0 : seen[row.name] + 1;
            var _a = row.serialize(seen[row.name]), rowBefore = _a.before, rowCurrent = _a.current;
            before += rowBefore;
            current += rowCurrent;
        });
        return "\n      <xs:schema\n        xmlns:xs=\"http://www.w3.org/2001/XMLSchema\"\n        xmlns=\"http://webservices.guestware.com/dstGST.xsd\" xmlns:msprop=\"urn:schemas-microsoft-com:xml-msprop\"\n        xmlns:mstns=\"http://webservices.guestware.com/dstGST.xsd\"\n        id=\"dstGST\"\n        targetNamespace=\"http://webservices.guestware.com/dstGST.xsd\"\n        attributeFormDefault=\"qualified\"\n        elementFormDefault=\"qualified\">\n          <xs:element name=\"dstGST\" msdata:IsDataSet=\"true\" msdata:UseCurrentLocale=\"true\">\n            <xs:complexType>\n              <xs:choice minOccurs=\"0\" maxOccurs=\"unbounded\"/>\n            </xs:complexType>\n          </xs:element>\n      </xs:schema>\n      <diffgr:diffgram\n        xmlns:msdata=\"urn:schemas-microsoft-com:xml-msdata\"\n        xmlns:diffgr=\"urn:schemas-microsoft-com:xml-diffgram-v1\">\n        <dstGST xmlns=\"http://webservices.guestware.com/dstGST.xsd\">\n          " + current + "\n        </dstGST>\n        <diffgr:before>\n          " + before + "\n        </diffgr:before>\n      </diffgr:diffgram>\n    ";
    };
    return DatasetGuest;
}());
exports["default"] = DatasetGuest;
var fromResponse = function (response) {
    var dstGST = response.queryFirst(response.baseXPathDiffgr() + "/dstGST:dstGST");
    return new DatasetGuest(Object
        .keys(dstGST.childNodes)
        .map(function (key) { return dstGST.childNodes[key]; })
        .filter(function (child) { return child.nodeName && child.nodeName !== '#text'; })
        .map(function (element) { return DatasetGuestRow_1.fromElements([element]); })
        .reduce(function (acc, val) { return acc.concat(val); }, []));
};
exports.fromResponse = fromResponse;

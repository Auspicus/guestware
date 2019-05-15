"use strict";
exports.__esModule = true;
var xpath_1 = require("xpath");
var xmldom_1 = require("xmldom");
var PropertyNotFound_1 = require("../Exception/PropertyNotFound");
var ParserStrictness;
(function (ParserStrictness) {
    ParserStrictness[ParserStrictness["Strict"] = 0] = "Strict";
    ParserStrictness[ParserStrictness["Flexible"] = 1] = "Flexible";
})(ParserStrictness || (ParserStrictness = {}));
exports.ParserStrictness = ParserStrictness;
var SoapResponse = /** @class */ (function () {
    function SoapResponse(xml) {
        this.xml = xml;
        var parser = new xmldom_1.DOMParser();
        this.document = parser.parseFromString(this.xml);
    }
    SoapResponse.prototype.baseXPath = function () {
        return '/soap:Envelope/soap:Body';
    };
    SoapResponse.prototype.baseXPathDiffgr = function () {
        return this.baseXPath() + "/*/*/diffgr:diffgram";
    };
    SoapResponse.prototype.defaultNamespaces = function () {
        return {
            soap: 'http://schemas.xmlsoap.org/soap/envelope/',
            gw: 'http://webservices.guestware.com/',
            diffgr: 'urn:schemas-microsoft-com:xml-diffgram-v1',
            dstGST: 'http://webservices.guestware.com/dstGST.xsd'
        };
    };
    SoapResponse.prototype.queryFirst = function (xpathQuery, namespaces) {
        namespaces = namespaces || this.defaultNamespaces();
        var XPathSelect = xpath_1.useNamespaces(namespaces);
        return XPathSelect(xpathQuery, this.document, true);
    };
    SoapResponse.prototype.queryAll = function (xpathQuery, namespaces) {
        namespaces = namespaces || this.defaultNamespaces();
        var XPathSelect = xpath_1.useNamespaces(namespaces);
        return XPathSelect(xpathQuery, this.document);
    };
    SoapResponse.prototype.format = function (listItem, map, strictness) {
        strictness = strictness || ParserStrictness.Strict;
        var result = [];
        var namespaces = { dstGST: 'http://webservices.guestware.com/dstGST.xsd' };
        var XPathSelect = xpath_1.useNamespaces(namespaces);
        this
            .queryAll("//dstGST:" + listItem, namespaces)
            .forEach(function (node) {
            var item = {};
            Object.keys(map).forEach(function (key) {
                var found = XPathSelect("dstGST:" + map[key] + "/text()", node, true);
                if (found)
                    item[key] = found.toString();
                else if (strictness === ParserStrictness.Strict)
                    throw new PropertyNotFound_1["default"](listItem + " > " + map[key]);
            });
            result.push(item);
        });
        return result;
    };
    return SoapResponse;
}());
exports["default"] = SoapResponse;

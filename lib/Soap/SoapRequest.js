"use strict";
exports.__esModule = true;
var SoapRequest = /** @class */ (function () {
    function SoapRequest(xml) {
        this.xml = xml;
    }
    SoapRequest.prototype.toString = function () {
        return this.xml;
    };
    SoapRequest.prototype.objectToQueryInputParameters = function (object) {
        var parts = [];
        Object.keys(object).forEach(function (key, i) {
            parts.push("\n        <virtual_QueryInputParameters diffgr:id=\"virtual_QueryInputParameters" + (i + 1) + "\" msdata:rowOrder=\"" + i + "\" diffgr:hasChanges=\"inserted\">\n          <FieldName>" + key + "</FieldName>\n          <FieldValue>" + object[key] + "</FieldValue>\n        </virtual_QueryInputParameters>");
        });
        return parts.join('');
    };
    return SoapRequest;
}());
exports["default"] = SoapRequest;

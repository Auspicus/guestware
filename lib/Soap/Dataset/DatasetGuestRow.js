"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var DiffgramRowAction_1 = require("../DiffgramRowAction");
var DatasetGuestRow = /** @class */ (function () {
    function DatasetGuestRow(name, diff, properties) {
        this.name = name;
        this.diff = diff;
        this.properties = properties;
        this.updatedProperties = {};
    }
    DatasetGuestRow.prototype.serialize = function (rowId) {
        var serializeProperties = function (obj) { return (Object
            .keys(obj)
            .map(function (propertyName) { return "<" + propertyName + ">" + obj[propertyName] + "</" + propertyName + ">"; })
            .join('')); };
        var oldProperties = serializeProperties(this.properties);
        var newProperties = serializeProperties(__assign({}, this.properties, this.updatedProperties));
        return {
            before: this.diff === DiffgramRowAction_1["default"].Modified
                ? "\n        <" + this.name + "\n          diffgr:id=\"" + this.name + (rowId + 1) + "\"\n          xmlns=\"http://webservices.guestware.com/dstGST.xsd\"\n          msdata:rowOrder=\"" + rowId + "\">\n          " + oldProperties + "\n        </" + this.name + ">\n      "
                : "",
            current: "\n        <" + this.name + " diffgr:id=\"" + this.name + (rowId + 1) + "\" msdata:rowOrder=\"" + rowId + "\" diffgr:hasChanges=\"" + this.diff + "\">\n          " + newProperties + "\n        </" + this.name + ">\n      "
        };
    };
    DatasetGuestRow.prototype.values = function () {
        return __assign({}, this.properties, this.updatedProperties);
    };
    DatasetGuestRow.prototype.modify = function (name, value) {
        this.diff = DiffgramRowAction_1["default"].Modified;
        this.updatedProperties[name] = value;
    };
    return DatasetGuestRow;
}());
var fromElements = function (elements) {
    return elements.map(function (element) {
        return new DatasetGuestRow(element.nodeName, DiffgramRowAction_1["default"].NotSet, Object
            .keys(element.childNodes)
            .map(function (key) { return element.childNodes[key]; })
            .filter(function (child) { return child.nodeName && child.nodeName !== '#text'; })
            .reduce(function (a, child) {
            var _a;
            return child ? Object.assign(a, (_a = {}, _a[child.nodeName] = "" + child.firstChild, _a)) : a;
        }, {}));
    });
};
exports.fromElements = fromElements;
exports["default"] = DatasetGuestRow;

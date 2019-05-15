"use strict";
exports.__esModule = true;
var Configuration = /** @class */ (function () {
    function Configuration(_a) {
        var wsdl = _a.wsdl, username = _a.username, password = _a.password, appName = _a.appName, version = _a.version, _b = _a.appId, appId = _b === void 0 ? null : _b;
        this.wsdl = wsdl;
        this.username = username;
        this.password = password;
        this.appName = appName;
        this.version = version;
        this.appId = appId;
    }
    Configuration.prototype.apply = function (xmlBody) {
        return (xmlBody
            .replace(/{{UserName}}/g, this.username)
            .replace(/{{PassWord}}/g, this.password)
            .replace(/{{AppName}}/g, this.appName)
            .replace(/{{Version}}/g, this.version));
    };
    Configuration.prototype.unapply = function (xmlBody) {
        return (xmlBody
            .replace(this.username, "{{UserName}}")
            .replace(this.password, "{{PassWord}}")
            .replace(this.appName, "{{AppName}}")
            .replace(this.version, "{{Version}}"));
    };
    return Configuration;
}());
exports["default"] = Configuration;

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
Object.defineProperty(exports, "__esModule", { value: true });
var package_json_1 = require("webpack/package.json");
var package_json_2 = require("webpack-cli/package.json");
var package_json_3 = require("webpack-dev-server/package.json");
function createArguments(obj) {
    return __assign({ _: [], $0: '' }, obj);
}
exports.createArguments = createArguments;
function getVersion() {
    return [
        "webpack " + package_json_1.version,
        "webpack-cli " + package_json_2.version,
        "webpack-dev-server " + package_json_3.version,
    ].join('\n');
}
exports.getVersion = getVersion;
//# sourceMappingURL=yargsHelpers.js.map
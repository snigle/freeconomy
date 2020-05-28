"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_1 = __importDefault(require("./plugin"));
var webpack_1 = __importDefault(require("./webpack"));
var devServer_1 = __importDefault(require("./devServer"));
exports.options = { plugin: plugin_1.default, webpack: webpack_1.default, devServer: devServer_1.default };
exports.default = exports.options;
//# sourceMappingURL=index.js.map
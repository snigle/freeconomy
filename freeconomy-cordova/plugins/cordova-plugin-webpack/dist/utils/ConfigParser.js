"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var elementtree_1 = __importDefault(require("elementtree"));
var ConfigParser = (function () {
    function ConfigParser(path) {
        this.path = path;
        var data = fs_1.default.readFileSync(path, 'utf-8').toString();
        this.config = elementtree_1.default.parse(data);
    }
    ConfigParser.prototype.findOrCreate = function (name) {
        var element = this.config.find(name);
        if (!element) {
            element = elementtree_1.default.Element(name);
            this.config.getroot().append(element);
        }
        return element;
    };
    ConfigParser.prototype.setElement = function (name, attributes) {
        var element = this.findOrCreate(name);
        element.attrib = attributes;
    };
    ConfigParser.prototype.write = function () {
        fs_1.default.writeFileSync(this.path, this.config.write({ indent: 4 }), 'utf-8');
    };
    return ConfigParser;
}());
exports.default = ConfigParser;
//# sourceMappingURL=ConfigParser.js.map
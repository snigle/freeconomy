"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
var yargs_1 = __importDefault(require("yargs"));
var yargs_unparser_1 = __importDefault(require("yargs-unparser"));
var webpack_1 = __importDefault(require("webpack"));
var convert_argv_1 = __importDefault(require("webpack-cli/bin/utils/convert-argv"));
var is_1 = __importDefault(require("@sindresorhus/is"));
var options_1 = __importDefault(require("./options"));
var webpackHelpers_1 = require("./utils/webpackHelpers");
var yargsHelpers_1 = require("./utils/yargsHelpers");
module.exports = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var platforms, pluginYargs, pluginArgv, webpackYargs, webpackArgv, customWebpackConfig, webpackConfig, compiler;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                platforms = ['browser', 'android', 'ios'];
                if (!platforms.some(function (platform) { return ctx.opts.platforms && ctx.opts.platforms.includes(platform); })) {
                    return [2];
                }
                if (!ctx.opts.options || !ctx.opts.options.argv) {
                    return [2];
                }
                pluginYargs = yargs_1.default(ctx.opts.options.argv);
                pluginArgv = pluginYargs
                    .options(options_1.default.plugin)
                    .version(ctx.opts.plugin.pluginInfo.id + " " + ctx.opts.plugin.pluginInfo.version).argv;
                if (pluginArgv.livereload) {
                    return [2];
                }
                webpackYargs = yargs_1.default(yargs_unparser_1.default(yargsHelpers_1.createArguments(is_1.default.object(pluginArgv.webpack) ? pluginArgv.webpack : {})));
                webpackArgv = webpackYargs
                    .options(options_1.default.webpack)
                    .version(yargsHelpers_1.getVersion()).argv;
                return [4, webpackHelpers_1.createConfig(convert_argv_1.default(webpackArgv))];
            case 1:
                customWebpackConfig = _a.sent();
                webpackConfig = [].concat(customWebpackConfig);
                compiler = webpack_1.default(webpackConfig);
                return [4, new Promise(function (resolve, reject) {
                        compiler.run(function (err, stats) {
                            if (err) {
                                reject(err);
                            }
                            console.log(stats.toString({
                                chunks: false,
                                colors: true,
                            }));
                            resolve();
                        });
                    })];
            case 2:
                _a.sent();
                return [2];
        }
    });
}); };
//# sourceMappingURL=webpackCompile.js.map
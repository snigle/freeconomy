"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options = {
    webpack: {
        alias: 'w',
        describe: 'Passed to the webpack-cli or webpack-dev-server options',
    },
    livereload: {
        type: 'boolean',
        alias: 'l',
        describe: 'Enables LiveReload (HMR)',
        default: false,
    },
};
exports.default = options;
//# sourceMappingURL=plugin.js.map
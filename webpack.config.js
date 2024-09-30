const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const glob = require('glob');

module.exports = {
    ...defaultConfig,
    entry: {
        index: glob.sync('./blocks/**/index.js'),
    },
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'index.js',
    },
};
exports.config = {
    baseUrl: 'https://angularjs.org',

    specs: [
        './test/**/*.js'
    ],

    framework: 'mocha',

    multiCapabilities: [{
        'browserName': 'firefox'
    }, {
        'browserName': 'chrome'
    }],

    onPrepare: function () {
        expect = require('chai').expect;
    },

    allScriptsTimeout: 30000,

    mochaOpts: {
        enableTimeouts: false,
        reporter: 'spec',
        slow: 5000,
        ui: 'bdd'
    },

    seleniumAddress: 'http://localhost:4444/wd/hub'
};

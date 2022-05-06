// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
if (process.env.CI) {
    console.log('Karma in CI mode');
    process.env.CHROME_BIN = '/usr/bin/google-chrome-stable';
}
module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine", "@angular-devkit/build-angular", "karma-custom-env"],
        plugins: [
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-jasmine-html-reporter"),
            require("karma-coverage"),
            require("@angular-devkit/build-angular/plugins/karma"),
            require('./tests/karma-custom-plugin'),
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        coverageReporter: {
            dir: require("path").join(__dirname, "./coverage/port-modelling-fe"),
            subdir: '.',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ],
            check: {
                global: {
                    statements: 20,
                    branches: 20,
                    functions: 20,
                    lines: 20
                }
            }
        },
        reporters: ["progress", "coverage", "kjhtml"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        captureTimeout: 120000,
        browserNoActivityTimeout: 150000,
        browserDisconnectTimeout: 150000,
        processKillTimeout: 150000,
        retryLimit: 5,
        browsers: ['Headless_Chrome'],
        customLaunchers: {
            Headless_Chrome: {
                base: 'Chrome',
                flags: [
                    '--no-sandbox',
                    '--headless',
                    '--remote-debugging-port=9222',
                    '--disable-web-security',
                    '--disable-background-networking',
                    '--disable-extensions'
                ]
            }
        },
        singleRun: true,
        restartOnFileChange: true,
    });
};

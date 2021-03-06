const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const dependencies = require("./package.json").dependencies;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
    /* mapped paths to share */
]);

module.exports = {
    output: {
        uniqueName: "angularShell",
        publicPath: "auto",
    },
    optimization: {
        runtimeChunk: false,
    },
    resolve: {
        modules: ["node_modules"],
        alias: {
            ...sharedMappings.getAliases(),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new ModuleFederationPlugin({
            shared: {
                "@angular/common/http": {
                    requiredVersion: dependencies["@angular/common"],
                    singleton: false,
                    eager: false,
                },
                "@angular/common": {
                    version: dependencies["@angular/common"],
                    requiredVersion: dependencies["@angular/common"],
                    singleton: false,
                    eager: true,
                },
                "@angular/core": {
                    version: dependencies["@angular/core"],
                    requiredVersion: dependencies["@angular/core"],
                    singleton: false,
                    eager: true,
                },
                "@angular/platform-browser": {
                    version: dependencies["@angular/platform-browser"],
                    requiredVersion: dependencies["@angular/platform-browser"],
                    singleton: false,
                    eager: true,
                },
                "@angular/platform-browser-dynamic": {
                    version: dependencies["@angular/platform-browser-dynamic"],
                    requiredVersion: dependencies["@angular/platform-browser-dynamic"],
                    singleton: false,
                    eager: true,
                },
                "@angular/router": {
                    version: dependencies["@angular/router"],
                    requiredVersion: dependencies["@angular/router"],
                    singleton: false,
                    eager: true,
                },
                "@angular/cdk/a11y": {
                    version: dependencies["@angular/cdk"],
                    requiredVersion: dependencies["@angular/cdk"],
                    singleton: false,
                    eager: false,
                },
                "@angular/animations": {
                    version: dependencies["@angular/animations"],
                    requiredVersion: dependencies["@angular/animations"],
                    singleton: false,
                    eager: false,
                },
                "react": {
                    version: dependencies["react"],
                    requiredVersion: dependencies["react"],
                    singleton: true,
                    eager: false,
                },
                "react-dom": {
                    version: dependencies["react-dom"],
                    requiredVersion: dependencies["react-dom"],
                    singleton: true,
                    eager: false,
                },
                "highcharts": {
                    version: dependencies["highcharts"],
                    requiredVersion: dependencies["highcharts"],
                    singleton: true,
                    eager: false,
                },
            },
        }),
    ],
};

var path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require("./package.json").dependencies;

var sourcePath = path.join(__dirname, "./src");
var outPath = path.join(__dirname, "./dist");

const commonConfig = (options) => {
    const isDevelopment = options.mode === "development";
    return {
        context: sourcePath,
        entry: {
            app: "./main.tsx",
        },
        output: {
            path: outPath,
            publicPath: "auto",
        },
        target: "web",
        stats: {
            children: true,
        },
        resolve: {
            extensions: [".js", ".ts", ".tsx"],
            alias: {
                app: path.resolve(__dirname, "src/app/"),
            },
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                cacheDirectory: true,
                                presets: ["@babel/react", "@babel/env"],
                            },
                        },
                    ],
                },
                // .ts, .tsx
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.less$/,
                    use: [
                        // compiles Less to CSS
                        "style-loader",
                        "css-loader",
                        "less-loader",
                    ],
                },
                // static assets
                { test: /\.html$/, use: "html-loader" },
                { test: /\.(a?png|svg)$/, use: "url-loader?limit=10000" },
                {
                    test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                    use: "file-loader",
                },
            ],
        },
        plugins: [
            new ModuleFederationPlugin({
                name: "react_app",
                library: { type: "var", name: "react_app" },
                filename: "remoteEntry.js",
                exposes: {
                    "ReactApp": "./main.plugin",
                },
                shared: [
                    {
                        "react": {
                            version: dependencies["react"],
                            requiredVersion: dependencies["react"],
                            singleton: true,
                            eager: false,
                        },
                    },
                    {
                        "react-dom": {
                            version: dependencies["react-dom"],
                            requiredVersion: dependencies["react-dom"],
                            singleton: true,
                            eager: false,
                        },
                    },
                    {
                        "highcharts": {
                            version: dependencies["highcharts"],
                            requiredVersion: dependencies["highcharts"],
                            singleton: true,
                            eager: false,
                        },
                    },
                    {
                        "react-router-dom": {
                            singleton: true,
                            eager: false,
                        },
                    },
                ],
            }),
        ],
    };
};
module.exports = {
    commonConfig,
};

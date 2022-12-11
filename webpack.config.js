const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const targetDir = "build";

// Instantiate the plugin.
// The `template` property defines the source
// of a template file that this plugin will use.
// We will create it later.
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
});

module.exports = {
    mode: "development",
    performance: {
        hints: false
    },
    // Our application entry point.
    entry: "./src/index.tsx",

    // These rules define how to deal
    // with files with given extensions.
    // For example, .tsx files
    // will be compiled with ts-loader,
    // a spcific loader for webpack
    // that knows how to work with TypeScript files.
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },

    // Telling webpack which extensions
    // we are interested in.
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    // What file name should be used for the result file,
    // and where it should be palced.
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, targetDir),
    },

    // Use the html plugin.
    plugins: [htmlPlugin],

    // devServer: {
        // targetDir
        // contentBase: path.join(__dirname, targetDir),
        // compress: true,
        // port: 9000
    // }
};
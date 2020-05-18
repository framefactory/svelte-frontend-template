/**
 * Webpack configuration
 * Svelte / Typescript / SCSS
 */

"use strict";

require("dotenv").config();

const path = require('path');
const mkdirp = require("mkdirp");
const childProcess = require("child_process");
const webpack = require("webpack");

const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const SveltePreprocess = require("svelte-preprocess");

let projectVersion = "v0.0.0";
try {
    projectVersion = childProcess.execSync("git describe --tags").toString().trim();
}
catch {}

////////////////////////////////////////////////////////////////////////////////
// PROJECT / COMPONENTS

const projectDir = __dirname; //path.resolve(__dirname, "../..");

const dirs = {
    source: path.resolve(projectDir, "source"),
    output: path.resolve(projectDir, "public/built"),
    static: path.resolve(projectDir, "public/static"),
    modules: path.resolve(projectDir, "node_modules"),
    libs: path.resolve(projectDir, "libs"),
};

// module search paths
const modules = [
    dirs.libs,
    dirs.modules,
];

// import aliases
const alias = {
    "svelte": path.resolve(dirs.modules, 'svelte'),
    "@ff/core": "ff-core/source",
    "@ff/svc": "ff-svc/source",
};

// project components to be built
const components = {
    "default": {
        bundle: "index",
        title: "template",
        version: projectVersion,
        subdir: "",
        entry: "index.ts",
        template: "index.hbs",
    }
};

////////////////////////////////////////////////////////////////////////////////

module.exports = function(env, argv)
{
    const environment = {
        isDevMode: argv.mode !== undefined ? argv.mode !== "production" : process.env["NODE_ENV"] !== "production",
    };

    console.log(`
WEBPACK - PROJECT BUILD CONFIGURATION
      build mode: ${environment.isDevMode ? "development" : "production"}
   source folder: ${dirs.source}
   output folder: ${dirs.output}
  modules folder: ${dirs.modules}
  library folder: ${dirs.libs}`);

    const componentKey = argv.component !== undefined ? argv.component : "default";

    if (componentKey === "all") {
        return Object.keys(components).map(key => createBuildConfiguration(environment, dirs, components[key]));
    }

    const component = components[componentKey];
    if (component === undefined) {
        console.warn(`\n[webpack.config.js] can't build, component not existing: '${componentKey}'`);
        process.exit(1);
    }

    return createBuildConfiguration(environment, dirs, components[componentKey]);
}

////////////////////////////////////////////////////////////////////////////////

function createBuildConfiguration(environment, dirs, component)
{
    const isDevMode = environment.isDevMode;
    const buildMode = isDevMode ? "development" : "production";

    const displayTitle = `${component.title} ${component.version} ${isDevMode ? "DEV" : "PROD"}`;

    const outputDir = path.resolve(dirs.output, component.subdir);
    mkdirp.sync(outputDir);

    const jsOutputFileName = isDevMode ? "js/[name].dev.js" : "js/[name].min.js";
    const cssOutputFileName = isDevMode ? "css/[name].dev.css" : "css/[name].min.css";
    const htmlOutputFileName = isDevMode ? `${component.bundle}.dev.html` : `${component.bundle}.html`;

    console.log(`
    WEBPACK - COMPONENT BUILD CONFIGURATION
            bundle: ${component.bundle}
             title: ${displayTitle}
           version: ${component.version}
     output folder: ${outputDir}
           js file: ${jsOutputFileName}
          css file: ${cssOutputFileName}
         html file: ${htmlOutputFileName}`);

    return {
        mode: buildMode,
        devtool: isDevMode ? "source-map" : false,

        entry: {
            [component.bundle]: path.resolve(dirs.source, component.entry),
        },

        output: {
            path: outputDir,
            filename: jsOutputFileName,
            //chunkFilename: '[name].[id].js'
        },

        resolve: {
            modules,
            alias,
            extensions: [".ts", ".js", ".mjs", ".svelte", ".json"],
            mainFields: ["svelte", "browser", "module", "main"],
        },

        optimization: {
            minimize: !isDevMode,

            minimizer: [
                new TerserPlugin({ parallel: true }),
                new OptimizeCSSAssetsPlugin({}),
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                ENV_PRODUCTION: JSON.stringify(!isDevMode),
                ENV_DEVELOPMENT: JSON.stringify(isDevMode),
                ENV_VERSION: JSON.stringify(component.version),
            }),
            new MiniCssExtractPlugin({
                filename: cssOutputFileName,
                allChunks: true,
            }),
            new HTMLWebpackPlugin({
                filename: htmlOutputFileName,
                template: path.resolve(dirs.source, component.template),
                title: displayTitle,
                version: component.version,
                isDevelopment: isDevMode,
                chunks: [ component.bundle ],
            })
        ],

        module: {
            rules: [
                {
                    // Typescript
                    test: /\.tsx?$/,
                    use: {
                        loader: "ts-loader",
                        options: { compilerOptions: { noEmit: false } },
                    },
                },
                {
                    // SCSS
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    // CSS
                    test: /\.css$/,
                    use: [
                        // MiniCssExtractPlugin doesn't support hot reloading.
                        // During development, embed styles with "style-loader".
                        isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    // Handlebars
                    test: /\.hbs$/,
                    loader: "handlebars-loader",
                },
                {
                    // Svelte
                    test: /\.svelte$/,
                    use: {
                        loader: "svelte-loader",
                        options: {
                            emitCss: true,
                            hotReload: true,
                            preprocess: SveltePreprocess({
                                typescript: {
                                    tsconfigDirectory: ".",
                                    compilerOptions: { noEmit: false },
                                },
                            }),
                        }
                    }
                },
            ]
        },

        devServer: {
            contentBase: [ dirs.output, dirs.static ],
            contentBasePublicPath: [ "/", "/" ],
            sockHost: process.env["DEV_SERVER_WEBSOCKET_HOST"],
            sockPort: process.env["DEV_SERVER_WEBSOCKET_PORT"],
            port: process.env["DEV_SERVER_PORT"],
            disableHostCheck: true
        }
    }
}

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import scss from "./rollup-plugin-scss";
// import scss from "rollup-plugin-scss";
// import sass from 'rollup-plugin-sass';
import json from "@rollup/plugin-json";
import visualizer from "rollup-plugin-visualizer";
import analyze from "rollup-plugin-analyzer";
// import postcss from "rollup-plugin-postcss";

const postcssInlineBase64 = require("postcss-inline-base64");
const postcssUrl = require("postcss-url")
const atImport = require("postcss-import");

import packageJson from "./package.json";

const plugins = (esBundle) => {
  return [
    scss({
      output: esBundle ? false : "dist/quickstarts.css",
      includePaths: ["../../node_modules/"],
      importer(path) {
        return { file: path[0] !== "~" ? path : path.slice(1) };
      },
      watch: [
        "src/style.scss",
        "src/ConsoleInternal/style.scss",
        "src/ConsoleInternal/vendor.scss",
        "src/ConsoleInternal/style/_vars.scss",
      ],
    }),
    peerDepsExternal(),
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    typescript({
      typescript: require("typescript"),
      tsconfig: "tsconfig.json"
    }),
    json(),
    // postcss({
    //   inject: true,
    //   plugins: [
    //     postcssInlineBase64({
    //       baseDir: '../node_modules/@patternfly/patternfly/assets',
    //     }),
    //     // postcssUrl({
    //     //   url: 'inline',
    //     // }),
    //     // atImport({
    //     //   path: path.resolve(__dirname, '../'),
    //     // }),
    //   ],
    // }),
    // analyze({ summaryOnly: true, limit: 10 }),
    visualizer(),
  ];
};

// export default [
//   {
//     input: "src/index.ts",
//     output: {
//       file: packageJson.main,
//       format: "cjs",
//       sourcemap: true,
//     },
//     external: ["react", "react-dom"],
//     plugins: plugins(false),
//   },
// ];

export default [
  {
    input: "src/index.ts",
    output: {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    external: ["react", "react-dom"],
    plugins: plugins(false),
  },
  {
    input: "src/index.ts",
    output: {
      file: packageJson.module,
      format: "es",
      sourcemap: true,
    },
    external: ["react", "react-dom"],
    plugins: plugins(true),
  },
];

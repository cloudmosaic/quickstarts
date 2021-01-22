import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import scss from "./rollup-plugin-scss";
import copy from 'rollup-plugin-copy'
import json from '@rollup/plugin-json';
import visualizer from "rollup-plugin-visualizer";
// import nodePolyfills from 'rollup-plugin-node-polyfills';

import packageJson from "./package.json";

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;
const PROTOCOL = process.env.PROTOCOL || "http";

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "es",
      sourcemap: true,
    },
  ],
  external: ["react", "react-dom", "react-router-dom"],
  plugins: [
    replace({
      __PUBLIC_PATH__: `"${PROTOCOL}://${HOST}:${PORT}/"`,
    }),
    scss({
      output: "dist/quickstarts.css",
      includePaths: ["../../node_modules/"],
      importer(path) {
        return { file: path[0] !== "~" ? path : path.slice(1) };
      },
    }),
    peerDepsExternal(),
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    typescript({ typescript: require("typescript") }),
    // copy({
    //   targets: [
    //     { src: 'src/locales', dest: 'dist/locales' },
    //   ]
    // }),
    json(),
    visualizer()
    // nodePolyfills()
  ],
};

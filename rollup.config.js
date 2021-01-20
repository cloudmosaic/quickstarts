import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
const scss = require('rollup-plugin-scss');

import packageJson from "./package.json";

export default {
  input: "./module/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  external: ['react', 'react-dom', 'react-router-dom'],
  plugins: [peerDepsExternal(), resolve(), commonjs(), typescript(), scss()]
};
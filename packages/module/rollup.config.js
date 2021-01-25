import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import scss from "./rollup-plugin-scss";
import json from '@rollup/plugin-json';
import visualizer from "rollup-plugin-visualizer";

import packageJson from "./package.json";

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
    json(),
    visualizer()
  ],
};

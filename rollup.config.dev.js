import path from "path";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import autoprefixer from "autoprefixer";
import { fileName, globalName } from "./rollup.config";

const buildHelper = require("./config/build-helper");

export default buildHelper([
  {
    name: globalName,
    input: "./demo/src/App.ts",
    output: `./demo/dist/app.js`,
    format: "umd",
    resolve: true,
    plugins: [
      postcss({
        extract: true,
      }),
      serve({
        open: true,
        contentBase: "demo",
      }),
      livereload("."),
    ]
  }
]);


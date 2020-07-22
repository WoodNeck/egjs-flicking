import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { fileName, globalName } from "./rollup.config";

const buildHelper = require("@egjs/build-helper");

export default buildHelper([
  {
    name: globalName,
    input: "./src/index.umd.ts",
    output: `./demo/dist/${fileName}.pkgd.js`,
    format: "umd",
    resolve: true,
    plugins: [
      serve({
        open: true,
        contentBase: "demo",
      }),
      livereload("."),
    ]
  }
]);


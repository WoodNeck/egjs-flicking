import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const buildHelper = require("@egjs/build-helper");
const name = "Flicking";

export default buildHelper([
  {
    name,
    input: "./src/index.umd.ts",
    output: `./demo/dist/flicking.pkgd.js`,
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


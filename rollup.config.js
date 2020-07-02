
// flicking.js
// flicking.min.js
// flicking.pkgd.js
// flicking.pkgd.min.js
// flicking.esm.js

const buildHelper = require("@egjs/build-helper");
const name = "Flicking";

export default buildHelper([
		{
      name,
			input: "./src/index.umd.ts",
      output: "./dist/flicking.js",
      format: "umd",
    },
    {
      name,
			input: "./src/index.umd.ts",
      output: "./dist/flicking.min.js",
      format: "umd",
      uglify: true,
    },
    {
      name,
			input: "./src/index.umd.ts",
      output: "./dist/flicking.pkgd.js",
      format: "umd",
      resolve: true,
    },
    {
      name,
			input: "./src/index.umd.ts",
      output: "./dist/flicking.pkgd.min.js",
      format: "umd",
      resolve: true,
      uglify: true,
    },
    {
      input: "./src/index.ts",
      output: "./dist/flicking.esm.js",
      format: "esm",
      exports: "named",
    },
]);


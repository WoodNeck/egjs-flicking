
// flicking.js
// flicking.min.js
// flicking.pkgd.js
// flicking.pkgd.min.js
// flicking.esm.js

const buildHelper = require("./config/build-helper");
export const fileName = "flicking";
export const globalName = "Flicking";

export default buildHelper([
		{
      name: globalName,
			input: "./src/index.umd.ts",
      output: `./dist/${fileName}.js`,
      format: "umd",
    },
    {
      name: globalName,
			input: "./src/index.umd.ts",
      output: `./dist/${fileName}.min.js`,
      format: "umd",
      uglify: true,
    },
    {
      name: globalName,
			input: "./src/index.umd.ts",
      output: `./dist/${fileName}.pkgd.js`,
      format: "umd",
      resolve: true,
    },
    {
      name: globalName,
			input: "./src/index.umd.ts",
      output: `./dist/${fileName}.pkgd.min.js`,
      format: "umd",
      resolve: true,
      uglify: true,
    },
    {
      input: "./src/index.ts",
      output: `./dist/${fileName}.esm.js`,
      format: "esm",
      exports: "named",
    },
]);


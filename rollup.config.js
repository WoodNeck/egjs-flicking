import path from "path";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";

const buildHelper = require("./config/build-helper");
export const fileName = "flicking";
export const globalName = "Flicking";

const plugins = [
  postcss({
    extract: path.resolve(`./dist/${fileName}.css`),
    minimize: true,
    plugins: [autoprefixer],
  }),
];

export default buildHelper([
		{
      name: globalName,
			input: "./src/index.umd.ts",
      output: `./dist/${fileName}.js`,
      format: "umd",
      plugins,
    },
    {
      name: globalName,
			input: "./src/index.umd.ts",
      output: `./dist/${fileName}.min.js`,
      format: "umd",
      uglify: true,
      plugins,
    },
    {
      name: globalName,
			input: "./src/index.umd.ts",
      output: `./dist/${fileName}.pkgd.js`,
      format: "umd",
      resolve: true,
      plugins,
    },
    {
      name: globalName,
			input: "./src/index.umd.ts",
      output: `./dist/${fileName}.pkgd.min.js`,
      format: "umd",
      resolve: true,
      uglify: true,
      plugins,
    },
    {
      input: "./src/index.ts",
      output: `./dist/${fileName}.esm.js`,
      format: "esm",
      exports: "named",
      plugins,
    },
]);


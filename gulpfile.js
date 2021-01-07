const { src, dest, parallel, series, watch } = require("gulp");
const pug = require("gulp-pug");
const concat = require("gulp-concat");
const clean = require("gulp-clean");
const inject = require("gulp-inject");
const posthtml = require("gulp-posthtml");
const esbuild = require("gulp-esbuild");
const postcss = require("gulp-postcss");
const connect = require("gulp-connect");

const pugOptions = require("./pug.config");

const esbuildWatch = esbuild.createGulpEsbuild();

const TARGET_DIR = "build";

const INTERMEDIATE_FILES = [`${TARGET_DIR}/**/*.js`, `${TARGET_DIR}/**/*.css`];

function build({ production, watchMode }) {
  const esbuildTask = watchMode ? esbuildWatch : esbuild;

  return series(
    parallel(
      () =>
        src("src/**/*.css")
          .pipe(postcss())
          .pipe(concat("styles.css"))
          .pipe(dest(TARGET_DIR)),
      () =>
        src("src/**/*.entry.js")
          .pipe(
            esbuildTask({
              bundle: true,
              minify: production,
            })
          )
          .pipe(concat("index.js"))
          .pipe(dest(TARGET_DIR))
    ),
    () =>
      src("src/index.pug")
        .pipe(pug(pugOptions))
        .pipe(
          inject(src(INTERMEDIATE_FILES, { read: false }), {
            removeTags: true,
            relative: true,
          })
        )
        .pipe(posthtml())
        .pipe(dest(TARGET_DIR))
  );
}

module.exports.build = series(
  () => src(TARGET_DIR, { allowEmpty: true }).pipe(clean()),
  build({ production: true, watchMode: false }),
  () => src(INTERMEDIATE_FILES).pipe(clean())
);

module.exports.dev = series(
  build({ production: false, watchMode: false }),
  parallel(
    () => watch("./src/**", build({ production: false, watchMode: false })),
    () => connect.server({ root: TARGET_DIR })
  )
);

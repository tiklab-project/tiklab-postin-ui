const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const replace = require("gulp-replace");
const sourcemaps = require("gulp-sourcemaps");
const size = require("gulp-filesize");
const postcssPresetEnv = require("postcss-preset-env");
const postcss = require("gulp-postcss");
const { name } = require("../package.json");

const resolve = dir => path.join(__dirname, ".", dir);
const distDir = resolve("../dist");
const libDir = resolve("../lib");
const esDir = resolve("../es");
const scssDir = resolve("../src/**/*.scss");
const indexJsDir = resolve("../src/**/style/erer.js");

function copyPostcss() {
    return gulp
        .src(scssDir)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(libDir))
        .pipe(gulp.dest(esDir));
}

function replaceIndexJs() {
    return gulp
        .src(indexJsDir)
        .pipe(sourcemaps.init())
        .pipe(replace("scss", "css"))
        .pipe(
            rename(function(path) {
                path.basename = "css";
                path.extname = ".js";
            })
        )
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(libDir))
        .pipe(gulp.dest(esDir));
}

function compilePostcss() {
    return (
        gulp
            .src(scssDir)
            .pipe(sourcemaps.init())
            .pipe(
                postcss([
                    postcssPresetEnv({
                        stage: 3,
                        features: {
                            "custom-properties": true,
                            "nesting-rules": true
                        },
                        browsers: "last 2 versions"
                    })
                ])
            )
            .pipe(
                rename(function(path) {
                    path.extname = ".css";
                })
            )
            .pipe(cleanCSS({ inline: ["none"] }))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(libDir))
            .pipe(gulp.dest(esDir))
    );
}

function distCss() {
    return (
        gulp
            .src(scssDir)
            .pipe(sourcemaps.init())
            .pipe(
                postcss([
                    postcssPresetEnv({
                        stage: 3,
                        features: {
                            "custom-properties": true,
                            "nesting-rules": true
                        }
                    })
                ])
            )
            .pipe(concat(`${name}.css`))
            .pipe(size())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(distDir))
            .pipe(concat(`${name}.min.css`))
            .pipe(size())
            .pipe(cleanCSS({ inline: ["none"] }))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(distDir))
    );
}

gulp.task("copy-postcss", copyPostcss);
gulp.task("replace-indexjs", replaceIndexJs);
gulp.task("compile-postcss", compilePostcss);
gulp.task("dist-css", distCss);
gulp.task("compile", gulp.series("copy-postcss", "replace-indexjs", "compile-postcss", "dist-css"));

const gulp = require("gulp");
const typeScript = require("gulp-typescript");
const sourceMaps = require("gulp-sourcemaps");
const tslint = require("gulp-tslint");
const liveServer = require("gulp-live-server");
const cache = require("gulp-cached");
const tsLintStylish = require("gulp-tslint-stylish");
const nodeInspector = require("gulp-node-inspector");
const path = require("path");

const gulpTaskNames = {
  default: "default",
  serve: "serve",
  transpile: "transpile",
  tsLint: "tslint",
  watch: "watch",
};

gulp.task(gulpTaskNames.tsLint, () => {
  return gulp.src(["src/**/*.ts", "./gulpfile.js"])
        .pipe(tslint())
        .pipe(tslint.report(tsLintStylish));
});

gulp.task(gulpTaskNames.transpile, () => {
  const typeScriptProject = typeScript.createProject("tsconfig.json");

  const transpilationResult = typeScriptProject.src()
    .pipe(sourceMaps.init())
    .pipe(typeScriptProject());

  const changedFiles = transpilationResult.js
    .pipe(sourceMaps.mapSources(function(sourcePath) {
        return path.basename(sourcePath);
    }))
    .pipe(sourceMaps.write())
    .pipe(cache("scripts"));

  return changedFiles.pipe(gulp.dest("dist"));
});

gulp.task(gulpTaskNames.watch, [gulpTaskNames.tsLint, gulpTaskNames.transpile], () => {
  gulp.watch("src/**/*.ts", [gulpTaskNames.tsLint, gulpTaskNames.transpile]);
});

gulp.task(gulpTaskNames.serve, [gulpTaskNames.watch], () => {
  const server = liveServer.new(["--debug", "dist/bootstrapper.js"]);
  server.start();

  const allOutputFiles = "dist/**/*";
  gulp.watch(allOutputFiles, restartServer);

  return gulp.src(allOutputFiles)
    .pipe(nodeInspector());

  function restartServer() {
    server.start.bind(server)();
  }
});

gulp.task(gulpTaskNames.default, [gulpTaskNames.serve]);

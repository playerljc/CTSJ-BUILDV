const path = require('path');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sourceMap = require('gulp-sourcemaps');

const copyexts = [
  'less',
  'css',
  'svg',
  'jpg',
  'jpeg',
  'gif',
  'png',
  'bmp',
  'json',
  'eot',
  'woff',
  'ttf',
];
const commandArgs = require('./commandArgs');

const argsMap = commandArgs.initCommandArgs();
const outputpath = argsMap.get('--outputpath')[0];
const compilePath = argsMap.get('--compilepath')[0];

// buildpackage生成的目录名称
// const generateDirName = 'lib';

/**
 * copy
 */
gulp.task('copy', () => {
  const srcs = copyexts.map((ext) => path.join(compilePath, '**', `*.${ext}`));
  return gulp.src(srcs).pipe(gulp.dest(outputpath));
});

/**
 * 压缩
 */
gulp.task('minjs', () => {
  console.log('minjsoutputpath',outputpath)
  return gulp
    .src([
      // `${runtimePath}lib\\**\\*.js`,
      // `${runtimePath}lib\\**\\*.jsx`,
      path.join(outputpath, '**', '*.js'),
      path.join(outputpath, '**', '*.jsx'),
    ])
    .pipe(sourceMap.init())
    .pipe(uglify())
    .pipe(sourceMap.write('.'))
    .pipe(gulp.dest(outputpath));
});

gulp.task('default', gulp.series('copy', 'minjs'));

const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');

// 代码编译路径
const compilePath = process.env.compilePath;

// 代码输出路径
const outputPath = process.env.outputPath;

// 配置文件路径
const configPath = process.env.configPath;

const customConfig = require(configPath);

const tsProject = ts.createProject(customConfig.getTsConfigPath());
const babelConfig = require(path.join(__dirname, 'babel.config.js'));

customConfig.getBabelConfig(babelConfig);

gulp.task('default', function () {
  return gulp
    .src([
      path.join(compilePath, '**', '*.js'),
      path.join(compilePath, '**', '*.jsx'),
      path.join(compilePath, '**', '*.ts'),
      path.join(compilePath, '**', '*.tsx'),
    ])
    .pipe(tsProject())
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(outputPath));
});

const { spawn } = require('child_process');
const path = require('path');
const { getEnv, isWin32 } = require('./util');

// 运行脚本的路径
const runtimePath = process.cwd();

// 脚本所在的路径
const codePath = __dirname;

const commandPath = path.join(codePath, 'node_modules', '.bin', path.sep);

// buildpackage生成的目录名称
const generateDirName = 'lib';

// buildpackage原始名称
const srcDirName = 'src';

// 代码输出路径
const outputPath = path.join(runtimePath, generateDirName);

// 代码编译路径
let compilePath;

// 配置文件所在路径
let configPath;

let packageName;

let define;

let index = 0;

// buildpackage的所有任务
const tasks = [
  // 清除生成目录
  clearTask,
  // 使用vue-loader进行处理
  webpackTask,
  // 样式
  gulpTask,
];

/**
 * clearTask
 * 清除输出目录
 * @return {Promise}
 */
function clearTask() {
  return new Promise((resolve) => {
    const command = isWin32() ? `rimraf.cmd` : `rimraf`;

    const rimrafProcess = spawn(command, [outputPath], {
      cwd: codePath,
      encoding: 'utf-8',
      env: getEnv(commandPath),
    });

    rimrafProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    rimrafProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    rimrafProcess.on('close', (code) => {
      console.log(`rimrafClose：${code}`);
      resolve();
    });
  });
}

/**
 * webpackTask
 * @return {Promise}
 */
function webpackTask() {
  return new Promise((resolve) => {
    const command = isWin32() ? `webpack.cmd` : `webpack`;

    const babelProcess = spawn(
      command,
      [
        '--open',
        '--config',
        path.join('webpackconfig', 'webpack.packagets.js'),
        '--progress',
        '--colors',
        '--runtimepath',
        path.join(runtimePath, path.sep),
        '--packagename',
        packageName,
        '--customconfig',
        configPath,
        '--define',
        define.join(' '),
      ],
      {
        cwd: codePath,
        encoding: 'utf-8',
        env: getEnv(commandPath),
      },
    );

    babelProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    babelProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    babelProcess.on('close', (code) => {
      console.log(`webpackTaskClose：${code}`);
      resolve();
    });
  });
}

/**
 * gulpTask
 * @return {Promise}
 */
function gulpTask() {
  return new Promise((resolve) => {
    const command = isWin32() ? `gulp.cmd` : `gulp`;

    const gulpProcess = spawn(
      command,
      [
        '--outputpath',
        // 输出路径
        path.join(outputPath, path.sep),
        '--compilepath',
        // 编译目录
        path.join(compilePath, path.sep),
      ],
      {
        cwd: codePath,
        encoding: 'utf-8',
        env: getEnv(commandPath),
      },
    );

    gulpProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    gulpProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    gulpProcess.on('close', (code) => {
      console.log(`gulpTaskClose：${code}`);
      resolve();
    });
  });
}

/**
 * loopTask
 * @return {Promise}
 */
function loopTask() {
  return new Promise((resolve, reject) => {
    if (index >= tasks.length) {
      resolve();
    } else {
      const task = tasks[index++];
      if (task) {
        task()
          .then(() => {
            loopTask().then(() => {
              resolve();
            });
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject();
      }
    }
  });
}

module.exports = {
  /**
   * build
   * @param srcPath
   */
  build({ srcpath = '',config: ctbuildvConfigPath = '', packagename = 'index', define: defineMap }) {
    if (ctbuildvConfigPath) {
      if (path.isAbsolute(ctbuildvConfigPath)) {
        configPath = ctbuildvConfigPath;
      } else {
        configPath = path.join(runtimePath, ctbuildvConfigPath);
      }
    } else {
      configPath = path.join(runtimePath, 'ctbuildv.config.js');
    }

    if (srcpath) {
      // 指定了编译目录
      if (path.isAbsolute(srcpath)) {
        // 是绝对路径
        compilePath = srcpath;
      } else {
        // 是相对路径
        compilePath = path.join(runtimePath, srcpath);
      }
    } else {
      // 没有指定编译目录
      compilePath = path.join(runtimePath, srcDirName);
    }
    // console.log('buildpackage-srcPath----------------------', srcPath);

    packageName = packagename;

    define = defineMap;

    loopTask()
      .then(() => {
        console.log('finish');
        process.exit();
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

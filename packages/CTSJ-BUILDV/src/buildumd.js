#!/usr/bin/env node
const path = require('path');
const { spawn } = require('child_process');
const { getEnv, isWin32 } = require('./util');

// 运行命令的路径
const runtimePath = process.cwd();

// 运行命令的路径去掉/
const srcPath = runtimePath.substring(0, runtimePath.lastIndexOf(path.sep));

// build.js所在的路径
const codePath = __dirname;

// ctbuildv.cmd或者ctbuildv.sh所在路径
const commandPath = path.join(codePath, '../', 'node_modules', '.bin', path.sep);

// 配置文件所在路径
let configPath;

// [packageName].bundle.js
// [packageName].css
let packageName;

let define;

const tasks = [copySrcTask, webpackTask];

let index = 0;

/**
 * 复制src到runtimePath
 */
function copySrcTask() {
  return new Promise((resolve) => {
    const commands = {
      win32: {
        command: 'xcopy',
        params: [path.join(srcPath, 'src'), path.join(runtimePath, 'src'), '/e', '/i', '/y'],
      },
      linux: {
        command: 'cp',
        params: ['-r', '-f', path.join(srcPath, 'src'), path.join(runtimePath, 'src')],
      },
    };

    const { command, params } = isWin32() ? commands.win32 : commands.linux;

    const copyProcess = spawn(command, params, {
      cwd: path.join(codePath, '../'),
      encoding: 'utf-8',
    });

    copyProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    copyProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    copyProcess.on('close', (code) => {
      console.log(`crossenvClose：${code}`);
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
        '--config',
        path.join(codePath, 'webpackconfig', 'webpack.umd.js'),
        '--progress',
        '--env',
        [
          `runtimepath=${path.join(runtimePath, path.sep)}`,
          `packagename=${packageName}`,
          `customconfig=${configPath}`,
          `define=${Buffer.from(JSON.stringify(define)).toString('base64')}`,
        ].join(' '),
      ],
      {
        cwd: path.join(codePath, '../'),
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
  build: ({ config: ctbuildvConfigPath = '', packagename = 'packagename', define: defineMap }) => {
    if (ctbuildvConfigPath) {
      if (path.isAbsolute(ctbuildvConfigPath)) {
        configPath = ctbuildvConfigPath;
      } else {
        configPath = path.join(runtimePath, ctbuildvConfigPath);
      }
    } else {
      configPath = path.join(runtimePath, 'ctbuildv.config.js');
    }

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

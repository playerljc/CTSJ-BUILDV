#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');
const { getEnv, isWin32 } = require('./util');

// 运行命令的路径
const runtimePath = process.cwd();

// build.js所在的路径
const codePath = __dirname;

// ctbuildv.cmd或者ctbuildv.sh所在路径
const commandPath = path.join(codePath, 'node_modules', '.bin', path.sep);

// 配置文件所在路径
let configPath;

let define;

const tasks = [corssenvTask, webpackTask];

let index = 0;

/**
 * corssenvTask
 * @return {Promise}
 */
function corssenvTask() {
  return new Promise((resolve) => {
    const command = isWin32() ? `cross-env.cmd` : `cross-env`;

    const crossenvProcess = spawn(command, ['REAP_PATH=prod', 'NODE_ENV=production'], {
      cwd: codePath,
      encoding: 'utf-8',
      env: getEnv(commandPath),
    });

    crossenvProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    crossenvProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    crossenvProcess.on('close', (code) => {
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
        '--open',
        '--config',
        path.join('webpackconfig', 'webpack.prod.js'),
        '--progress',
        '--colors',
        '--runtimepath',
        path.join(runtimePath, path.sep),
        '--customconfig',
        configPath,
        '--define',
        define.join(' '),
        // '--profile',
        // '--json',
        // '>',
        // path.join(runtimePath,'stats.json'),
      ],
      {
        cwd: codePath,
        encoding: 'utf-8',
        env: getEnv(commandPath),
      },
    );

    // console.log('-----------env-start-----------');
    // console.log(process.env);
    // console.log('-----------env-end-------------');

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
  /**
   * build
   * @param {String} - ctbuildvConfigPath
   * ctbuildv.config.js配置文件的路径，如果没有指定则会寻找命令运行目录下的ctbuildv.config.js文件
   */
  build: ({ config: ctbuildvConfigPath = '', define: defineMap }) => {
    if (ctbuildvConfigPath) {
      if (path.isAbsolute(ctbuildvConfigPath)) {
        configPath = ctbuildvConfigPath;
      } else {
        configPath = path.join(runtimePath, ctbuildvConfigPath);
      }
    } else {
      configPath = path.join(runtimePath, 'ctbuildv.config.js');
    }

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

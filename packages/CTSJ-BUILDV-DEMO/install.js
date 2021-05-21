const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');
const rimraf = require('./rimraf');

const args = initCommandArgs();

const packageBackFilePath = path.join(__dirname, 'package.pre.json');

/**
 * 初始化命令行参数
 * --type 构建类型
 * --config 另外的配置文件
 * @return {Map}
 */
function initCommandArgs() {
  return process.argv.slice(2);
}

/**
 * 根据package.json创建package.pre.json文件
 */
function createFile() {
  console.log('创建package.pre.json文件');

  const content = fs.readFileSync(path.join(__dirname, 'package.json'));

  fs.writeFileSync(path.join(__dirname, 'package.pre.json'), content);
}

/**
 * package.json中的依赖项是否发生了变化
 * @return boolean
 */
function isChange() {
  console.log('package中是否有变化');
  const md51 = crypto.createHash('md5');

  const content1 = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8');

  const result1 = md51.update(content1).digest('hex');

  const md52 = crypto.createHash('md5');

  const content2 = fs.readFileSync(path.join(__dirname, 'package.pre.json'), 'utf8');

  const result2 = md52.update(content2).digest('hex');

  return result1 !== result2;
}

/**
 * 替换package.pre.json文件
 */
function replace() {
  console.log('替换package.pre.json文件');
  createFile();
}

/**
 * 执行安装
 */
function install() {
  // rimraf.sync(__dirname + '/target')

  // 安装前先清空node_modules的构建目录
  if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
    console.log('删除node_modules目录');
    rimraf.sync(path.join(__dirname, 'node_modules'));
  }

  console.log('执行安装');
  const command = process.platform === 'win32' ? `${args[0]}.cmd` : args[0];

  // const command = args[0];
  const crossenvProcess = spawn(command, args.slice(1), {
    encoding: 'utf-8',
  });

  crossenvProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  crossenvProcess.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  crossenvProcess.on('close', (code) => {
    console.log(`crossenvClose：${code}`);
  });
}

/**
 * execute - 执行
 */
function execute() {
  // 存在package.json的备份文件
  if (fs.existsSync(packageBackFilePath)) {
    // if(package.pre.json和package.json 没有改变) {
    //   // 不执行
    // } else {
    //   用package.json替换package.pre.json
    //   执行安装
    // }
    console.log('文件已存在');

    // package.json中的依赖发生了变化
    if (isChange()) {
      // 重新生成package.json文件的备份文件
      replace();

      // 执行安装操作
      install();
    }
  }
  // 不存在package.json的备份文件
  else {
    console.log('文件不存在');
    // 创建package.pre.json文件

    // 根据package.json创建package.json的备份文件
    createFile();

    // 执行安装
    install();
  }
}

execute();

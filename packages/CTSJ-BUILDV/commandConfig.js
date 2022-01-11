const startapp = require('./startapp');
const buildapp = require('./buildapp');
const buildumd = require('./buildumd');
const buildpackage = require('./buildpackage');
const buildpackagetswp = require('./buildpackagetswp');
const buildpackagets = require('./buildpackagets');

/**
 * 将用","分割的define参数转换成key/value的map
 * @return Array
 * @param define
 */
function getDefineMap(define = '') {
  return define.split(',');
}

module.exports = {
  startapp: {
    alias: 'start',
    description: 'run dev',
    options: [
      {
        command: '-c, --config <path>',
        description: 'ctbuildv.config.js Configuration file path',
      },
      {
        command: '-d, --define <path>',
        description: 'custom params split ","',
      },
    ],
    action: (entry) => {
      console.log('startapp');
      const { config, define = '' } = entry;
      startapp.build({
        config,
        define: getDefineMap(define),
      });
    },
  },
  buildapp: {
    alias: 'build',
    description: 'build app',
    options: [
      {
        command: '-c, --config <path>',
        description: 'ctbuildv.config.js Configuration file path',
      },
      {
        command: '-d, --define <path>',
        description: 'custom params split ","',
      },
    ],
    action: (entry) => {
      console.log('buildapp');
      // buildapp.build(entry.config, entry.define);
      const { config, define = '' } = entry;
      buildapp.build({
        config,
        define: getDefineMap(define),
      });
    },
  },
  buildumd: {
    alias: 'umd',
    description: 'build app by umd',
    options: [
      {
        command: '-c, --config <path>',
        description: 'ctbuildv.config.js Configuration file path',
      },
      {
        command: '-p, --packagename <name>',
        description: 'package name',
      },
      {
        command: '-d, --define <path>',
        description: 'custom params split ","',
      },
    ],
    action: (entry) => {
      console.log('buildumd');
      const { config, packagename, define = '' } = entry;
      buildumd.build({
        config,
        packagename,
        define: getDefineMap(define),
      });
    },
  },
  buildpackage: {
    alias: 'package',
    description: 'build package',
    options: [
      {
        command: '-c --config <path>',
        description: 'ctbuildv.package.config.js Configuration file path',
      },
      {
        command: '-p, --srcpath <path>',
        description: 'build path',
      },
      {
        command: '-d --output <path>',
        description: 'output path',
      },
    ],
    action: (entry) => {
      console.log('buildpackage');
      buildpackage.build(entry);
    },
  },
  // 编译package的ts版本
  buildpackagetswp: {
    alias: 'packagetswp',
    description: 'build packagets by webpack',
    options: [
      {
        command: '-p, --srcpath <path>',
        description: 'build path',
      },
      {
        command: '-c, --config <path>',
        description: 'ctbuildv.config.js Configuration file path',
      },
      {
        command: '-p, --packagename <name>',
        description: 'package name',
      },
      {
        command: '-d, --define <path>',
        description: 'custom params split ","',
      },
    ],
    action: (entry) => {
      console.log('buildpackage');
      const { srcpath, config, packagename, define = '' } = entry;
      buildpackagetswp.build({
        srcpath,
        config,
        packagename,
        define: getDefineMap(define),
      });
    },
  },
  buildpackagets: {
    alias: 'packagets',
    description: 'build packagets by gulp',
    options: [
      {
        command: '-c, --config <path>',
        description: 'ctbuildv.package.ts.config.js Configuration file path',
      },
      {
        command: '-e --src <path>',
        description: 'src path'
      },
      {
        command: '-o, --output <name>',
        description: 'output path',
      },
    ],
    action: (entry) => {
      buildpackagets.build(entry);
    },
  }
};

const projectAlias = require('./projectAlias');
const projectCssModules = require('./projectCssModules');
const projectEvnVars = require('./projectEvnVars');
const projectStatic = require('./projectStatic');
const projectBundleAnalyzer = require('./projectBundleAnalyzer');
const projectCurResolveModule = require('./projectCurResolveModule');
const projectRuntimeCompiler = require('./projectRuntimeCompiler');
const projectDisableStrict = require('./projectDisableStrict');

const map = {
  analysis: {
    handler: projectBundleAnalyzer,
  },
  cssModules: {
    handler: projectCssModules,
  },
  evnVars: {
    handler: projectEvnVars,
  },
  static: {
    handler: projectStatic,
  },
  alias: {
    handler: projectAlias,
  },
  curResolveModule: {
    handler: projectCurResolveModule,
  },
  runtimeCompiler: {
    handler: projectRuntimeCompiler,
  },
  disableStrict: {
    handler: projectDisableStrict
  }
};

module.exports = function ({ defineArgs, ...others }) {
  const keys = Object.getOwnPropertyNames(map);

  keys.forEach((key) => {
    const exists = defineArgs.has(key);

    if (exists) {
      map[key].handler({ ...others, val: defineArgs.get(key) });
    }
  });
};

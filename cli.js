#!/usr/bin/env node

// require('./utils/version')
// require('v8-compile-cache')
const chalk = require('chalk')
const commander = require('commander')
const program = commander
program.version('0.0.1').usage('<command> [options]');

program
  .command('create <app-name>')
  .description('创建一个全新的 npm 组件模块')
  .action((name, cmd) => {
    const options = cmd
    require('./create')(name, options);
  });

// 用户未输入完整命令 输出帮助
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);
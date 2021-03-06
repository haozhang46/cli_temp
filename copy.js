const fs = require('fs')
const path = require('path')
// const dir = require('../utils/dir')
const isDir = require('./Isdir')
const ejs = require('ejs')

async function copy({ from, to, renderData, ignore = [] }) {
  let files = fs.readdirSync(from)
  // 区分 文件 和 目录
  let rFiles = []
  let dirs = []
  for (const fileName of files) {
    if (isDir(path.resolve(from, fileName))) {
      dirs.push(fileName)
    } else {
      rFiles.push(fileName)
    }
  }

  // 复制并编译文件
  rFiles.forEach(fileName => {
    // 需要忽略
    if (ignore.some(v => v === fileName)) {
      return
    }
    let content = fs.readFileSync(path.resolve(from, fileName), 'utf-8')
    // // 该文件需要调用 ejs 模板引擎进行编译
    // if (/ejs$/.test(fileName)) {
    //   content = ejs.render(content, renderData)
    //   fileName = fileName.replace('.ejs', '')
    // }
    fs.writeFileSync(path.resolve(to, fileName), content)
  })

  // 递归复制 目录
  dirs.forEach(dirName => {
    // 需要忽略
    if (ignore.some(v => v === dirName)) {
      return
    }
    const fromDir = path.resolve(from, dirName)
    const toDir = path.resolve(to, dirName)
    if (!dir.isDir(toDir)) {
      fs.mkdirSync(toDir)
    }
    copy({ from: fromDir, to: toDir, renderData, ignore })
  })
}

module.exports = copy

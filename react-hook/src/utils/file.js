/*
 * @Descripttion: 
 * @Author: candice
 * @Date: 2020-08-06 10:36:13
 * @LastEditors: candice
 * @LastEditTime: 2020-08-06 15:30:49
 */
const fs = window.require("fs").promises

const path = window.require("path")

const fileHelper = {
  readFile: (path) => {
    return fs.readFile(path, { encoding: 'utf8' })
  },
  writeFile: (path, content) => {
    return fs.writeFile(path, content, { encoding: "utf8" })
  },
  renameFile: (path, newPath) => {
    return fs.rename(path, newPath)
  },
  deleteFile: (path) => {
    return fs.unlink(path)
  }
}

export default fileHelper

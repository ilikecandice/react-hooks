/*
 * @Descripttion: 
 * @Author: candice
 * @Date: 2020-08-03 17:44:33
 * @LastEditors: candice
 * @LastEditTime: 2020-08-06 16:19:23
 */
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.less';
import './theme.less'
import { Button } from 'antd'
import FileSearch from '@/components/FileSearch'
import FileList from '@/components/FileList'
import fileHelper from "@/utils/file"
import useContextMenu from '@/hooks/useContextMenu'
const Store = window.require('electron-store')

// import LayoutContainer from '@/components/Layout'

const fs = window.require("fs")
const path = require("path")
const { remote } = window.require('electron')
console.dir(fs)
const saveLocation = remote.app.getPath("documents")
const store = new Store({ name: "filesData" })
store.set("name", "cc")
console.log(store, store.get("name"))


store.delete("name")
console.log(store.get("name"))
function App () {
  const [src, setSrc] = useState("")
  const importFiles = () => {
    remote.dialog.showOpenDialog({
      title: "导入文件",
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]

    }
    ).then((paths) => {
      if (Array.isArray(paths.filePaths))

        console.log(paths)
      fileHelper.readFile(paths.filePaths[0]).then((res) => {
        console.log(res)
        setSrc(res)

      })

    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <>
      <Button type="primary" onClick={() => { importFiles() }}>导入</Button>
      <img src={src} />
      <FileSearch onFileSearch={(value) => { console.log(value) }} />
      < FileList onFileClick={(id) => { console.log(id) }} onFileDelete={(id) => { console.log(id) }} onSaveEdit={(id, value) => { console.log(id, value) }} />
    </>

  );
}

export default App;

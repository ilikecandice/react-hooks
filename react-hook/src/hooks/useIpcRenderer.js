/*
 * @Descripttion: 
 * @Author: candice
 * @Date: 2020-08-06 17:09:55
 * @LastEditors: candice
 * @LastEditTime: 2020-08-06 17:49:27
 */
import { useEffect, useRef } from 'react'
const { ipcRenderer } = window.require("electron")
const useIpcRenderer = () => {

  useEffect(() => {
    Object.keys(keyCallBackMap).forEach(key => {
      ipcRenderer.on(key, keyCallBackMap[key])
    })
    return () => {
      Object.keys(keyCallBackMap).forEach(key => {
        ipcRenderer.removeListener(key, keyCallBackMap[key])
      })
    }
  }, [input])
}

export default useIpcRenderer
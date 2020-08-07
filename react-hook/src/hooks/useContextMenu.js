/*
 * @Descripttion: 
 * @Author: candice
 * @Date: 2020-08-06 16:14:29
 * @LastEditors: candice
 * @LastEditTime: 2020-08-06 16:31:05
 */
import React, { useEffect, useRef } from 'react'
const { remote } = window.require("electron")
const { Menu, MenuItem } = remote

const useContextMenu = (itemArr, targetElement) => {
  const clickedElement = useRef()
  useEffect(() => {
    const menu = new Menu()
    itemArr.forEach(element => {
      menu.append(new MenuItem(element))
    });
    const handleContextMenu = (e) => {
      if (document.querySelector(targetElement).contains(e.target)) {
        clickedElement.current = e.target
        menu.popup({ window: remote.getCurrentWindow() })
      }
    }
    window.addEventListener("contextmenu", handleContextMenu)
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  return clickedElement
}
export default useContextMenu
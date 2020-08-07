/*
 * @Descripttion: 
 * @Author: candice
 * @Date: 2020-08-05 19:50:23
 * @LastEditors: candice
 * @LastEditTime: 2020-08-05 20:08:38
 */
import { useState, useEffect, useRef } from 'react'

const useKeyPress = (targetKeyCode) => {
  const [keyPressed, setKeyPressed] = useState(false)
  const keyDownHandler = ({ keyCode }) => {

    if (keyCode === targetKeyCode) {
      setKeyPressed(true)
    }
  }
  const keyUpHandler = ({ keyCode }) => {
    if (keyCode === targetKeyCode) {
      setKeyPressed(false)
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler)
    document.addEventListener("keyup", keyUpHandler)
    return () => {
      document.removeEventListener("keydown", keyDownHandler)
      document.removeEventListener("keyup", keyUpHandler)
    }
  }, [])

  return keyPressed

}
export default useKeyPress
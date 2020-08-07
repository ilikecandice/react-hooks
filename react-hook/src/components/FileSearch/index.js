/*
 * @Descripttion: 
 * @Author: candice
 * @Date: 2020-08-05 09:44:45
 * @LastEditors: candice
 * @LastEditTime: 2020-08-06 09:38:07
 */
import React, { useState, useEffect, useRef } from "react"
import { Button, Input } from "antd"
import PropTypes from 'prop-types';
import useKeyPress from '@/hooks/useKeyPress'

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState("")
  const inputNode = useRef(null)
  const enterKeyPressed = useKeyPress(13)
  const escKeyPressed = useKeyPress(27)

  const closeSearch = () => {
    setInputActive(false)
    setValue('')
  }

  useEffect(() => {
    console.log(enterKeyPressed)
    if (enterKeyPressed && inputActive) {
      onFileSearch(value)
    }
    if (escKeyPressed && inputActive) {
      closeSearch()
    }
  })

  useEffect(() => {
    if (inputActive) {
      inputNode.current.focus()
    }
    return () => {

    }
  }, [inputActive])
  return (
    <div>
      {
        !inputActive &&
        <div>
          <span>{title}</span>
          <Button type="primary" onClick={() => { setInputActive(true) }}>搜索</Button>
        </div>
      }
      {
        inputActive &&
        <div>
          <Input ref={inputNode} placeholder="Basic usage" value={value} onChange={(e) => { setValue(e.target.value) }} />
          <Button type="primary" onClick={closeSearch}>关闭</Button>
        </div>
      }

    </div>
  )
}
FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired
}
FileSearch.defaultProps = {
  title: "我的文档"
}
export default FileSearch
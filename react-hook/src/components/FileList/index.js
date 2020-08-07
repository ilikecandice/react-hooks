/*
 * @Descripttion: 
 * @Author: candice
 * @Date: 2020-08-05 11:32:08
 * @LastEditors: candice
 * @LastEditTime: 2020-08-06 16:47:25
 */
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { FileWordFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd'
import { objToArr, getParentNode } from '@/utils'
import useContextMenu from '@/hooks/useContextMenu'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {

  const [editStatus, setEditStatus] = useState(false)
  const [value, setValue] = useState('')
  const inputNode = useRef(null)

  const closeSearch = (event) => {
    event.preventDefault()
    setEditStatus(false)
    setValue('')
  }
  const handleInputEvent = (event) => {
    const { keyCode } = event
    if (keyCode === 13 && editStatus) {
      const editItem = files.find(file => file.id === editStatus)
      onSaveEdit(editItem.id, value)
      setEditStatus(false)
      setValue("")
    } else if (keyCode === 27 && editStatus) {//esc

      closeSearch(event)
    }
  }
  useEffect(() => {

    document.addEventListener("keyup", handleInputEvent)
    objToArr(files).reduce((result, file) => {
      const { id, title } = file
      result[id] = { id, title }
      console.log(result)
      return result

    }, {})
    return () => {
      document.removeEventListener("keyup", handleInputEvent)
    }
  })
  const menuArr = [{
    label: "打开",
    click: () => {
      const parentElement = getParentNode(clickedItem.current, 'fileName')
      console.log(parentElement)
      console.log(parentElement.dataset)
    }
  }]
  const clickedItem = useContextMenu(menuArr, ".fileList")

  return (
    <ul className="fileList">
      {files.map(file =>
        (<li key={file.id} data-id={file.id} data-title={file.title} className="fileName">
          {file.id !== editStatus &&
            <>
              <span onClick={() => { onFileClick(file.id) }}><FileWordFilled />{file.title}</span>
              <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => { setEditStatus(file.id); setValue(file.title) }}></Button>
              <Button type="primary" shape="circle" icon={<DeleteOutlined />} onClick={() => { onFileDelete(file.id) }}></Button>
            </>
          }
          {file.id === editStatus &&
            <>
              <Input ref={inputNode} placeholder="Basic usage" value={value} onChange={(e) => { setValue(e.target.value) }} />
              <Button type="primary" onClick={closeSearch}>关闭</Button>
            </>

          }


        </li >
        )
      )
      }
    </ul>
  )

}
FileList.propTypes = {
  files: PropTypes.array.isRequired,
  onFileClick: PropTypes.func,
  onSaveEdit: PropTypes.func
}
FileList.defaultProps = {
  files: [{
    id: '1',
    title: "文档名称1"
  },
  {
    id: '2',
    title: "文档名称2"
  }]
}

export default FileList
/*
 * @Descripttion: 
 * @Author: candice
 * @Date: 2020-08-06 09:50:47
 * @LastEditors: candice
 * @LastEditTime: 2020-08-06 16:55:12
 */
export const flattenArr = (arr, key) => {
  return arr.reduce((map, item) => {
    if (key && item[key]) {
      map[item[key]] = item
    }
    return map

  }, {})
}

export const objToArr = (obj) => {
  return Object.keys(obj).map(key => obj[key])
}

export const getParentNode = (node, parentClassName) => {
  let current = node
  const ls = current.classList
  console.log(typeof ls)
  console.log(ls)
  while (current != null) {
    if (current.classList.contains(parentClassName)) {
      return current
    }
    current = current.parentNode
  }
  return false
}
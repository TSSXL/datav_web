
import fetch from '@/utils/fetch'


export function getPageList(listQuery, objQuery) {
  return fetch({
    url: '/resourceentity/pageList',
    method: 'post',
    params: listQuery,
    data: objQuery
  })
}

export function getList(listQuery, objQuery) {
  return fetch({
    url: '/resourceentity/list',
    method: 'post',
    params: listQuery,
    data: objQuery
  })
}

export function getItem(id) {
  return fetch({
    url: '/resourceentity/' + id,
    method: 'get'
  })
}

export function addItem(obj) {
  return fetch({
    url: '/resourceentity',
    method: 'post',
    data: obj
  })
}

export function editItem(obj) {
  return fetch({
    url: '/resourceentity/',
    method: 'put',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: '/resourceentity/' + id,
    method: 'delete'
  })
}
export function addItemCategory(obj) {
  return fetch({
    url: '/resourceentity/category',
    method: 'post',
    data: obj
  })
}
export function editItemCategory(obj) {
  return fetch({
    url: '/resourceentity/category',
    method: 'put',
    data: obj
  })
}
export function removeItemCategory(id,obj) {
  return fetch({
    url: '/resourceentity/category/' + id,
    method: 'put',
    data: obj
  })
}

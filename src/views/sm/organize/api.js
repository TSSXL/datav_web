
import fetch from '@/utils/fetch'

export function getListAll() {
  return fetch({
    url: '/organize/list',
    method: 'post'
  })
}

export function getList(listQuery, objQuery) {
  return fetch({
    url: '/organize/listForTable',
    method: 'post',
    params: listQuery,
    data: objQuery
  })
}

export function getItem(id) {
  return fetch({
    url: '/organize/' + id,
    method: 'get'
  })
}

export function addItem(obj) {
  return fetch({
    url: '/organize',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/organize/' + id,
    method: 'put',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: '/organize/' + id,
    method: 'delete'
  })
}


export function editSort(obj) {
  return fetch({
    url: '/organize',
    method: 'patch',
    data: obj
  })
}

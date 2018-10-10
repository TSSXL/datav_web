
import fetch from '@/views/visualization/vistemplate/fetch'

export function getList(listQuery, objQuery) {
  return fetch({
    url: '/vistemplate/list',
    method: 'post',
    params: listQuery,
    data: objQuery
  })
}

export function getItem(id) {
  return fetch({
    url: '/vistemplate/' + id,
    method: 'get'
  })
}

export function addItem(obj) {
  return fetch({
    url: '/vistemplate',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/vistemplate/' + id,
    method: 'put',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: '/vistemplate/' + id,
    method: 'delete'
  })
}

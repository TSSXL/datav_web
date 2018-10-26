
import fetch from '@/views/visualization/screen/fetch'

export function getList(listQuery, objQuery) {
  return fetch({
    url: '/wsSource/',
    method: 'post',
    params: listQuery,
    data: objQuery
  })
}

export function getItem(id) {
  return fetch({
    url: '/wsSource/' + id,
    method: 'get'
  })
}

export function addItem(obj) {
  return fetch({
    url: '/wsSource',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/wsSource/' + id,
    method: 'put',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: '/wsSource/' + id,
    method: 'delete'
  })
}

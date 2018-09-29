import fetch from '@/utils/fetch'

export function getList(listQuery, objQuery) {
  return fetch({
    url: '/template/list',
    method: 'post',
    params: listQuery,
    data: objQuery
  })
}

export function getItem(id) {
  return fetch({
    url: '/template/' + id,
    method: 'get'
  })
}

export function addItem(obj) {
  return fetch({
    url: '/template',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/template/' + id,
    method: 'put',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: '/template/' + id,
    method: 'delete'
  })
}

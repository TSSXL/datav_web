import fetch from '@/utils/fetch'

export function getList(queryparams, obj) {
  return fetch({
    url: '/page/list',
    method: 'post',
    params: queryparams,
    data: obj
  })
}

export function getItem(id) {
  return fetch({
    url: '/page/' + id,
    method: 'get'
  })
}

export function addItem(obj) {
  return fetch({
    url: '/page',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/page/' + id,
    method: 'put',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: '/page/' + id,
    method: 'delete'
  })
}

export function generateCode(id) {
  return fetch({
    url: '/page/generatecode/' + id,
    method: 'get'
  })
}

export function initPages(entityId) {
  return fetch({
    url: '/page/initPages/' + entityId,
    method: 'get'
  })
}

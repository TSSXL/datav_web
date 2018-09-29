import fetch from '@/utils/fetchEgg'
import store from '@/store'

function getApi() {
  return store.getters.urls.portal_visualization_api + 'api/component'
}

export function getList(paging, queries) {
  return fetch({
    url: getApi() + '/list',
    method: 'post',
    params: paging,
    data: queries
  })
}

export function getAll(params, queries) {
  return fetch({
    url: getApi() + '/all',
    method: 'post',
    params: params,
    data: queries
  })
}

export function getItem(id) {
  return fetch({
    url: getApi() + '/item/' + id,
    method: 'get'
  })
}


export function addItem(obj) {
  return fetch({
    url: getApi(),
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: getApi() + '/' + id,
    method: 'put',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: getApi() + '/' + id,
    method: 'delete'
  })
}

export function editSort(id, obj) {
  return fetch({
    url: getApi() + '/sort/' + id,
    method: 'put',
    data: obj
  })
}

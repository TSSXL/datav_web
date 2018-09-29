import fetch from '@/utils/fetch'
import store from '@/store'
import fetchProject from './fetchProject'

export function getGroups() {
  return fetchProject({
    url: `${store.getters.urls.publish_api}gitlab/groups`,
    method: 'get'
  })
}

export function getList(listQuery, objQuery) {
  return fetch({
    url: '/project/list',
    method: 'post',
    params: listQuery,
    data: objQuery
  })
}

export function getItem(id) {
  return fetch({
    url: '/project/' + id,
    method: 'get'
  })
}

export function addItem(obj) {
  return fetch({
    url: '/project',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/project/' + id,
    method: 'put',
    data: obj
  })
}

export function deployItem(obj) {
  return fetchProject({
    url: '/project/deploy',
    method: 'post',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: '/project/' + id,
    method: 'delete'
  })
}

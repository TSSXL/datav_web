import fetch from '@/utils/fetchEgg'
const entityName = 'user'

export function login(account, password) {
  return fetch({
    url: `/${entityName}/login`,
    method: 'post',
    data: { account: account, password: password }
  })
}

export function userInfo() {
  return fetch({
    url: `/${entityName}/info`,
    method: 'get'
  })
}

export function getList(paging, queries) {
  return fetch({
    url: `/${entityName}/list`,
    method: 'post',
    params: paging,
    data: queries
  })
}

export function getAll(params, queries) {
  return fetch({
    url: `/${entityName}/all`,
    method: 'post',
    params: params,
    data: queries
  })
}

export function getTree(group, queries) {
  return fetch({
    url: `/${entityName}/tree/${group}`,
    method: 'post',
    data: queries
  })
}

export function getChildren(parent) {
  return fetch({
    url: `/${entityName}/children/${parent}`,
    method: 'get'
  })
}

export function getItem(id) {
  return fetch({
    url: `/${entityName}/item/${id}`,
    method: 'get'
  })
}

export function addItem(obj) {
  return fetch({
    url: `/${entityName}/item`,
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: `/${entityName}/item/${id}`,
    method: 'put',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: `/${entityName}/item/${id}`,
    method: 'delete'
  })
}

export function editSort(id, obj) {
  return fetch({
    url: `/${entityName}/sort/${id}`,
    method: 'put',
    data: obj
  })
}

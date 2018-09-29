import fetch from '@/utils/fetchEgg'
const entityName = 'dataGroup'

export function getGroupList(paging, queries, module) {
  return fetch({
    url: `/${entityName}/group/${module}`,
    method: 'post',
    params: paging,
    data: queries
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

export function getItem(id) {
  return fetch({
    url: `/${entityName}/item/${id}`,
    method: 'get'
  })
}

export function exist(module, value) {
  return fetch({
    url: `/${entityName}/exist/${module}/${value}`,
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

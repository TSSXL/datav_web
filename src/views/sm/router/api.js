import fetch from '@/utils/fetchEgg'
const entityName = 'router'

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

export function getChildren(group, parent) {
  return fetch({
    url: `/${entityName}/children/${group}/${parent}`,
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

export function copy(source, obj) {
  return fetch({
    url: `/${entityName}/copy/${source}`,
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

export function removeGroup(id, group) {
  return fetch({
    url: `/${entityName}/group/${id}/${group}`,
    method: 'delete'
  })
}

export function removeChildren(id) {
  return fetch({
    url: `/${entityName}/children/${id}`,
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

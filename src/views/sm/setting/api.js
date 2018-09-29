import fetch from '@/utils/fetchEgg'
const entityName = 'setting'

export function index() {
  return fetch({
    url: `/${entityName}/index`,
    method: 'get'
  })
}

export function newItem() {
  return fetch({
    url: `/${entityName}/new`,
    method: 'get'
  })
}

export function show(id) {
  return fetch({
    url: `/${entityName}/${id}`,
    method: 'get'
  })
}

export function editItem(id) {
  return fetch({
    url: `/${entityName}/${id}/edit`,
    method: 'get'
  })
}

export function create(item) {
  return fetch({
    url: `/${entityName}/create`,
    method: 'post',
    data: item
  })
}

export function update(id, item) {
  return fetch({
    url: `/${entityName}/${id}`,
    method: 'put',
    data: item
  })
}

export function destroy(id) {
  return fetch({
    url: `/${entityName}/${id}`,
    method: 'delete'
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

export function getChildren(group, parent) {
  return fetch({
    url: `/${entityName}/children/${group}/${parent}`,
    method: 'get'
  })
}

export function copy(source, obj) {
  return fetch({
    url: `${url}/copy/${source}`,
    method: 'post',
    data: obj
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

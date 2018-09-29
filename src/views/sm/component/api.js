import fetch from '@/utils/fetchEgg'
const entityName = 'component'

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

export function query(query) {
  return fetch({
    url: `/${entityName}/query`,
    method: 'get',
    params: query
  })
}

export function getItem(id) {
  return fetch({
    url: `/${entityName}/item/${id}`,
    method: 'get'
  })
}

export function exist(module, entity, page) {
  return fetch({
    url: `/${entityName}/exist/${module}/${entity}/${page}`,
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

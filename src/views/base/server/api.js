import fetch from '@/utils/fetchEgg'

export function getList(MODEL_NAME, paging, queries) {
  return fetch({
    url: `/${MODEL_NAME}/list`,
    method: 'post',
    params: paging,
    data: queries
  })
}

export function getAll(MODEL_NAME, params, queries) {
  return fetch({
    url: `/${MODEL_NAME}/all`,
    method: 'post',
    params: params,
    data: queries
  })
}

export function getTree(MODEL_NAME, group, queries) {
  return fetch({
    url: `/${MODEL_NAME}/tree/${group}`,
    method: 'post',
    data: queries
  })
}

export function query(MODEL_NAME, query) {
  return fetch({
    url: `/${MODEL_NAME}/query`,
    method: 'get',
    params: query
  })
}

export function getItem(MODEL_NAME, id) {
  return fetch({
    url: `/${MODEL_NAME}/item/${id}`,
    method: 'get'
  })
}

export function exist(MODEL_NAME, module, model) {
  return fetch({
    url: `/${MODEL_NAME}/exist/${module}/${model}`,
    method: 'get'
  })
}

export function addItem(MODEL_NAME, obj) {
  return fetch({
    url: `/${MODEL_NAME}/item`,
    method: 'post',
    data: obj
  })
}

export function editItem(MODEL_NAME, id, obj) {
  return fetch({
    url: `/${MODEL_NAME}/item/${id}`,
    method: 'put',
    data: obj
  })
}

export function removeItem(MODEL_NAME, id) {
  return fetch({
    url: `/${MODEL_NAME}/item/${id}`,
    method: 'delete'
  })
}

export function removeChildren(MODEL_NAME, id) {
  return fetch({
    url: `/${MODEL_NAME}/children/${id}`,
    method: 'delete'
  })
}

export function editSort(MODEL_NAME, id, obj) {
  return fetch({
    url: `/${MODEL_NAME}/sort/${id}`,
    method: 'put',
    data: obj
  })
}

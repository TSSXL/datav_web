import fetch from '@/utils/fetchEgg'
const entityName = 'collection'

export function getList(model, paging, queries) {
  return fetch({
    url: `/${entityName}/${model}/list`,
    method: 'post',
    params: paging,
    data: queries
  })
}

export function getItem(model, id) {
  return fetch({
    url: `/${entityName}/${model}/item/${id}`,
    method: 'get'
  })
}

export function removeItem(model, id) {
  return fetch({
    url: `/${entityName}/${model}/item/${id}`,
    method: 'delete'
  })
}

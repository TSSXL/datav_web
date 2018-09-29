import fetch from '@/utils/fetchEgg'
const entityName = 'page'

export function getPages(model, paging, queries) {
  return fetch({
    url: `/${entityName}/pages/${model}`,
    method: 'post',
    params: paging,
    data: queries
  })
}

export function copy(id) {
  return fetch({
    url: `/${entityName}/copy/${id}`,
    method: 'get'
  })
}

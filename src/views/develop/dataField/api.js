import fetch from '@/utils/fetchEgg'
const entityName = 'dataField'

export function getTree(group, queries) {
  return fetch({
    url: `/${entityName}/tree/${group}`,
    method: 'post',
    data: queries
  })
}

export function getFields(model, paging, queries) {
  return fetch({
    url: `/${entityName}/fields/${model}`,
    method: 'post',
    params: paging,
    data: queries
  })
}

export function getChildren(group, parent) {
  return fetch({
    url: `/${entityName}/children/${group}/${parent}`,
    method: 'get'
  })
}

export function getExtendsTree(root, parent) {
  return fetch({
    url: `/${entityName}/extends/${root}/${parent}`,
    method: 'get'
  })
}

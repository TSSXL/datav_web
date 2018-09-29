import fetch from '@/views/configuration/fetch'
export function getList(url,method,listQuery, objQuery) {

  return fetch({
    url: url,
    method: method,
    params: listQuery,
    data: objQuery
  })
}
export function remove(url) {

  return fetch({
    url: url,
    method: 'delete'
  })
}

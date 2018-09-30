import fetch from '@/views/visualization/screen/fetch'

export function getList(listQuery, objQuery) {
  return fetch({
    url: '/screen/list',
    method: 'post',
    params: listQuery,
    data: objQuery
  })
}

export function getListCover(listQuery, objQuery) {
  return fetch({
    url: '/screen/list/cover',
    method: 'post',
    params: listQuery,
    data: objQuery
  })
}

export function getCount(objQuery) {
  return fetch({
    url: '/screen/count',
    method: 'post',
    data: objQuery
  })
}

export function getItem(id) {
  return fetch({
    url: '/screen/' + id,
    method: 'get'
  })
}

export function addItem(obj) {
  return fetch({
    url: '/screen',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/screen/' + id,
    method: 'put',
    data: obj
  })
}

export function copyItem(id) {
  return fetch({
    url: '/screen/copy/' + id,
    method: 'get'
  })
}

export function removeItem(id) {
  return fetch({
    url: '/screen/' + id,
    method: 'delete'
  })
}

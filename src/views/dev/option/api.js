import fetch from '@/views/dev/option/fetch'

export function getList(listQuery, objQuery) {
  return fetch({
    url: '/option/list',
    method: 'post',
    params: listQuery,
    data: objQuery
  })
}

export function getItem(id) {
  return fetch({
    url: '/option/' + id,
    method: 'get'
  })
}

export function addItem(obj) {
  return fetch({
    url: '/option',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/option/' + id,
    method: 'put',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: '/option/' + id,
    method: 'delete'
  })
}

/*
自定义方法
*/
export function getItemOptions(name) {
  return fetch({
    url: '/option/' + name + '/options',
    method: 'get'
  })
}

export function getOptinosSubList(name) {
  return fetch({
    url: '/option/selectOption/' + name,
    method: 'get'
  })
}

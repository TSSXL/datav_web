import fetch from '@/views/visualization/screen/fetch'



export function getList(paging, queries) {
  return fetch({
    url: '/component/list',
    method: 'post',
    params: paging,
    data: queries
  })
}

export function getAll(params, queries) {
  return fetch({
    url: '/component/all',
    method: 'post',
    params: params,
    data: queries
  })
}

export function getItem(id) {
  return fetch({
    url: '/component/item/' + id,
    method: 'get'
  })
}


export function addItem(obj) {
  return fetch({
    url:'/component/',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/component/' + id,
    method: 'put',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: '/component/' + id,
    method: 'delete'
  })
}

export function editSort(id, obj) {
  return fetch({
    url: '/component/sort/' + id,
    method: 'put',
    data: obj
  })
}

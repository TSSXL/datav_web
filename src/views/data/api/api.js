import fetch from '@/views/visualization/screen/fetch'

export function postServer(obj) {
  return fetch({
    url:'/apiSource/test/',
    method: 'post',
    data: obj
  })
}
export function getList(paging, queries) {
  return fetch({
    url: '/apiSource/',
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
    url: '/apiSource/' + id,
    method: 'get'
  })
}


export function addItem(obj) {
  return fetch({
    url:'/apiSource',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/apiSource/' + id,
    method: 'put',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: '/apiSource/' + id,
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

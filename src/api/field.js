import fetch from '@/utils/fetch'

export function getList(entityId) {
  return fetch({
    url: '/fields/list/' + entityId,
    method: 'get'
  })
}

export function getItem(id) {
  return fetch({
    url: '/fields/' + id,
    method: 'get'
  })
}

export function addItem(field) {
  return fetch({
    url: '/fields',
    method: 'post',
    data: field
  })
}

export function editItem(id, field) {
  return fetch({
    url: '/fields/' + id,
    method: 'put',
    data: field
  })
}

export function editSort(field) {
  return fetch({
    url: '/fields',
    method: 'patch',
    data: field
  })
}

export function removeItem(id) {
  return fetch({
    url: '/fields/' + id,
    method: 'delete'
  })
}

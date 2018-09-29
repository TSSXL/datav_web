
import fetch from '@/utils/fetch'

export function getList(listQuery, objQuery) {
  return fetch({
    url: '/timecategory/list',
    method: 'post',
    params: listQuery,
    data: objQuery
  })
}

export function getItem(id) {
  return fetch({
    url: '/timecategory/' + id,
    method: 'get'
  })
}

export function addItem(obj) {
  return fetch({
    url: '/timecategory',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/timecategory/' + id,
    method: 'put',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: '/timecategory/' + id,
    method: 'delete'
  })
}


import fetch from '@/utils/fetch'


export function getSystemMenus() {
  return fetch({
    url: '/menu/systemMenus',
    method: 'post'
  })
}

export function getList() {
  return fetch({
    url: '/menu/list',
    method: 'post'
  })
}

export function getItem(id) {
  return fetch({
    url: '/menu/' + id,
    method: 'get'
  })
}

export function addItem(obj) {
  return fetch({
    url: '/menu',
    method: 'post',
    data: obj
  })
}

export function makeItem(obj) {
  return fetch({
    url: '/menu/make',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/menu/' + id,
    method: 'put',
    data: obj
  })
}

export function editSort(obj) {
  return fetch({
    url: '/menu',
    method: 'patch',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: '/menu/' + id,
    method: 'delete'
  })
}

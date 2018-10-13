import fetch from '@/utils/fetch'
import fetchApi from '@/views/dev/attachment/fetchApi'

export function getApi(){
  return process.env.ATTACHMENT_PATH;
}

export function getPath(){
  return process.env.ATTACHMENT_PATH+"public/";
}

export function post(url, data) {
  return fetchApi({
    url: getApi() + url,
    method: 'POST',
    data: data
  })
}

export function put(url, data) {
  return fetchApi({
    url: getApi() + url,
    method: 'PUT',
    data: data
  })
}

export function get(url) {
  return fetchApi({
    url: getApi() + url,
    method: 'get'
  })
}

export function del(url) {
  return fetchApi({
    url: getApi() + url,
    method: 'delete'
  })
}

export function getList(listQuery, objQuery) {
  return fetch({
    url: '/imglib/list',
    method: 'post',
    params: listQuery,
    data: objQuery
  })
}

export function getItem(id) {
  return fetch({
    url: '/imglib/' + id,
    method: 'get'
  })
}

export function addItem(obj) {
  return fetch({
    url: '/imglib',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/imglib/' + id,
    method: 'put',
    data: obj
  })
}

export function removeItem(id) {
  return fetch({
    url: '/imglib/' + id,
    method: 'delete'
  })
}

export function getAll(obj) {
  return fetchApi({
    url: getApi() + 'api/attachment/all',
    method: 'post',
    data: obj
  })
}


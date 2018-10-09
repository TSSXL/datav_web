import fetch from '@/utils/fetch'
import fetchApi from '@/views/dev/attachment/fetchApi'
import store from '@/store'

export function getApi(){
  //return 'http://127.0.0.1:7001/'
  return store.getters.urls.attachment_lib_api
}

export function getPath(){
  //return 'http://127.0.0.1:7001/public/'
  return process.env.ATTACHMENT_PATH;//store.getters.urls.attachment_lib_path
}

export function post(url, data) {
  console.log(url);
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


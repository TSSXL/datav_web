import fetch from '@/views/configuration/fetch'

export function getList(listQuery, objQuery) {
  return fetch({
    url: '/api/configtemplate/',
    method: 'post',
    params: listQuery,
    data: objQuery
  })
}

export function get(id) {
  return fetch({
    url: '/api/configtemplate/' + id,
    method: 'get'
  })
}

export function add(obj) {
  return fetch({
    url: '/api/configtemplate',
    method: 'post',
    data: obj
  })
}

export function edit(id, obj) {
  return fetch({
    url: '/configtemplate/' + id,
    method: 'put',
    data: obj
  })
}

export function remove(id) {
  return fetch({
    url: '/api/configtemplate/' + id,
    method: 'delete'
  })
}
export function getItem(id,name) {
  return fetch({
    url: '/api/configtemplate/'+id+'/item/'+name,
    method: 'get'
  })
}
export function addItem(id,obj) {
  return fetch({
    url: '/api/configtemplate/'+id+'/item',
    method: 'post',
    data: obj
  })
}
export function publish(id) {
  return fetch({
    url: '/api/configtemplate/'+id+'/version',
    method: 'put',
    data: {'memo':''}
  })
}

export function rollback(id,versionId) {
  return fetch({
    url: '/api/configtemplate/'+id+'/version/'+versionId,
    method: 'put',
    data: {'memo':''}
  })
}
export function getVersions(id,listQuery) {
  return fetch({
    url: '/api/configtemplate/'+id+'/version/',
    params: listQuery,
    method: 'post'
  })
}

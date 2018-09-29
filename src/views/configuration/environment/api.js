import fetch from '@/views/configuration/fetch'
export function getList(listQuery, objQuery) {
   return fetch({
     url: '/api/environment/',
     method: 'post',
     params: listQuery,
     data: objQuery
   })
}

export function getContainer(id) {
  return fetch({
    url: '/api/environment/' + id+"/container",
    method: 'get'
  })
}
export function getHost(id) {
  return fetch({
    url: '/api/environment/' + id+"/host",
    method: 'get'
  })
}
export function get(id) {
  return fetch({
    url: '/environment/' + id,
    method: 'get'
  })
}

export function addContainer(obj) {
  return fetch({
    url: '/api/environment/container',
    method: 'post',
    data: obj
  })
}
export function addHost(obj) {
  return fetch({
    url: '/api/environment/host',
    method: 'post',
    data: obj
  })
}

export function removeContainer(id) {
  return fetch({
    url: '/api/environment/container/'+id,
    method: 'delete'
  })
}
export function removeHost(id) {
  return fetch({
    url: '/api/environment/host/'+id,
    method: 'delete'
  })
}
export function addItem(id,obj) {
  return fetch({
    url: '/api/environment/'+id+'/item',
    method: 'post',
    data: obj
  })
}

export function editItem(id, obj) {
  return fetch({
    url: '/environment/' + id,
    method: 'put',
    data: obj
  })
}

export function remove(id) {
  return fetch({
    url: '/api/environment/' + id,
    method: 'delete'
  })
}

export function getAll() {
  return Promise.resolve({ 'data': ENVIRONMENT_LIST })
}
export function fetchNamespaces() {
  return fetch({
    url: '/api/kubernetes/namespace/',
    method: 'get'
  })
}
export function fetchIps() {
  return fetch({
    url: '/api/saltstack/ip/',
    method: 'get'
  })
}
export function getItem(id,name) {
  return fetch({
    url: '/api/environment/'+id+'/item/'+name,
    method: 'get'
  })
}

export function publish(id) {
  return fetch({
    url: '/api/environment/'+id+'/version',
    method: 'put',
    data: {'memo':''}
  })
}
export function rollback(id,versionId) {
  return fetch({
    url: '/api/environment/'+id+'/version/'+versionId,
    method: 'put',
    data: {'memo':''}
  })
}
export function getVersions(id,listQuery) {
  return fetch({
    url: '/api/environment/'+id+'/version/',
    params: listQuery,
    method: 'post'
  })
}

import fetch from '@/utils/fetchEgg'
const entityName = 'jobUser'

export function getList(job, paging, queries) {
  return fetch({
    url: `/${entityName}/list/${job}`,
    method: 'post',
    params: paging,
    data: queries
  })
}

export function getAll(job, params, queries) {
  return fetch({
    url: `/${entityName}/all/${job}`,
    method: 'post',
    params: params,
    data: queries
  })
}

export function setPrimary(id, primary) {
  return fetch({
    url: `/${entityName}/primary/${id}`,
    method: 'put',
    data: { primary: primary }
  })
}

export function batchInsert(job, users) {
  return fetch({
    url: `/${entityName}/users/${job}`,
    method: 'post',
    data: users
  })
}

export function removeItem(id) {
  return fetch({
    url: `/${entityName}/item/${id}`,
    method: 'delete'
  })
}


import fetch from '@/utils/fetch'

export function getResultByApi(url) {
  return fetch({
    url: url,
    method: 'get'
  })
}

export function postResultByApi(url,body) {
  return fetch({
    url: url,
    method: 'post',
    data: body
  })
}






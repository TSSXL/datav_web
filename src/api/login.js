import fetch from '@/utils/fetch'
import fetchEgg from '@/utils/fetchEgg'

export function login(username, password) {
  return fetch({
    url: '/user/auth',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function loginEgg(account, password) {
  return fetchEgg({
    url: `/user/login`,
    method: 'post',
    data: { account: account, password: password }
  })
}

export function userInfo() {
  return fetchEgg({
    url: `/user/info`,
    method: 'get'
  })
}

export function getUrls() {
  return fetch({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}

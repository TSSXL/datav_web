import { loginEgg as login, logout, getUrls, userInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    account: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: [],
    jobs: [],
    urls: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_JOBS: (state, jobs) => {
      state.jobs = jobs
    },
    SET_URLS: (state, urls) => {
      state.urls = urls
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          if (response != null && response.data != null) {
            const token = response.data.token
            const name = response.data.userInfo.name
            const account = response.data.userInfo.account
            const jobs = response.data.userInfo.jobs
            const roles = response.data.userInfo.roles
            setToken(token)
            commit('SET_TOKEN', token)
            commit('SET_NAME', name)
            commit('SET_ACCOUNT', account)
            commit('SET_JOBS', jobs)
            commit('SET_ROLES', roles)
          }
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 获取用户信息
    async GetUserInfo({ commit, state }) {
      var res = await userInfo()
      if (res.success) {
        const info = res.data
        commit('SET_NAME', info.name)
        commit('SET_ACCOUNT', info.account)
        commit('SET_JOBS', info.jobs)
        commit('SET_ROLES', info.roles)
      }
      return res
    },

    // 获取配置的API等信息
    async GetUrls({ commit, state }) {
      var res = await getUrls()
      var urls = res.data
      commit('SET_URLS', urls)
      return urls
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_NAME', '')
          commit('SET_ACCOUNT', '')
          commit('SET_ROLES', [])
          commit('SET_JOBS', [])
          commit('SET_URLS', {})
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user

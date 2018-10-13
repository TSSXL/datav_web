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
      const username = userInfo.username.trim();
    },

    // 获取用户信息
    async GetUserInfo({ commit, state }) {
    },

    // 获取配置的API等信息
    async GetUrls({ commit, state }) {

    },

    // 登出
    LogOut({ commit, state }) {
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

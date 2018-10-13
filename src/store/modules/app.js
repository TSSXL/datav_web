import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    appid: Cookies.get('appid') || "5ab3754c8112781c2cc93541",
    size: Cookies.get('size')
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_APPID: (state, appid) => {
      Cookies.set('appid', appid)
      state.appid = appid
    },
    SET_SIZE: (state, size) => {
      Cookies.set('size', size)
      state.size = size
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    SetAppId: ({ commit }, appid) => {
      commit('SET_APPID', appid)
    },
    SetSize: ({ commit }, size) => {
      commit('SET_SIZE', size)
    }
  }
}

export default app

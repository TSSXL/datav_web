import Cookies from 'js-cookie'

const menu = {
  state: {
    menus: null,
    reset: null,
    menuGroup: Cookies.get('menuGroup')
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_RESET: (state, reset) => {
      state.reset = reset
    },
    SET_GROUP: (state, group) => {
      Cookies.set('menuGroup', group)
      state.menuGroup = group
    }
  },
  actions: {
    SetMenus: ({ commit }, menus) => {
      commit('SET_MENUS', menus)
    },
    SetGroup: ({ commit }, group) => {
      commit('SET_GROUP', group)
    },
    SetReset: ({ commit }, reset) => {
      commit('SET_RESET', reset)
    },
    GenerateMenus: ({ commit }, data) => {
      function genMenus(menus, data) {
        data.forEach((item) => {
          const path = item.redirect ? item.redirect : item.router.join('/')
          const target = item.target ? item.target : '_self'
          const menu = { _id: item._id, name: item.name, path: path, redirect: item.redirect, label: item.label, icon: item.icon, target: target, hidden: item.hidden, dropdown: item.dropdown }
          if (item.children !== undefined && item.children.length > 0) {
            menu.children = []
            genMenus(menu.children, item.children)
          }
          menus.push(menu)
        })
      }

      const menus = []
      console.log("开始生成菜单");
      genMenus(menus, data)
      commit('SET_MENUS', menus)
      commit('SET_RESET', false)
    }
  }
}
export default menu

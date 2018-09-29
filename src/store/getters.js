const getters = {
  sidebar: state => state.app.sidebar,
  appid: state => state.app.appid,
  size: state => state.app.size,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  account: state => state.user.account,
  name: state => state.user.name,
  roles: state => state.user.roles,
  jobs: state => state.user.jobs,
  urls: state => state.user.urls,
  currentPath: state => state.query.currentPath,
  params: state => state.query.params,
  menus: state => state.menu.menus,
  reset: state => state.menu.reset,
  menuGroup: state => state.menu.menuGroup,
  currentMenu: state => state.menu.currentMenu,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters

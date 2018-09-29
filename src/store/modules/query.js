const query = {
  state: {
    currentPath: null,
    params: {
      listQuery: null,
      objQuery: null
    }
  },
  mutations: {
    SET_CURRENT_PATH: (state, path) => {
      state.currentPath = path;
    },
    SET_QUERY: (state, params) => {
      state.params.listQuery = params.listQuery;
      state.params.objQuery = params.objQuery;
    }
  },
  actions: {
    SetCurrentPath: ({commit}, route) => {
      commit('SET_CURRENT_PATH', route)
    },
    SetQuery: ({commit}, params) => {
      commit('SET_QUERY', params)
    }
  }
};
export default query

const state = () => ({
  user: {
    username: '',
    role: ''
  }
})

const getters = {
  getUser: state => state.user
}

const actions = {
  setUser: ({ commit }, payload) => {
    commit('setUser', payload)
  },
  deleteUser: ({ commit }) => {
    commit('deleteUser')
  }
}

const mutations = {
  setUser (state, payload) {
    state.user.username = payload['username']
    state.user.role = payload['user_role']
  },
  deleteUser (state) {
    state.user.username = ''
    state.user.role = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
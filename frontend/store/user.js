const state = () => ({
  user: {
    username: '',
    role: '',
    passcode: "",
    user_id: ""
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
    state.user.passcode = payload['passcode']
    state.user.user_id = payload['user_id']
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
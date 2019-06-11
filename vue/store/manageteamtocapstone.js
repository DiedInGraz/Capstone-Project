/*
  Page: manageteamtocapstone.js

  Primary Contributor: Ruining Yang
 */

export const state = () => ({
  list: [],
  users: []
})

// Adder and Setter for manageteamtocapstone
export const mutations = {
  add(state, project) {
    state.list.push(project)
  },
  emptyList(state) {
    state.list = []
    state.users = []
  },
  addUser(state, user) {
    state.users.push(user)
  },
  sortUser(state) {
    state.users.sort()
  }
}

// Setter for manageteamtocapstone
export const getters = {
  list: state => {
    return state.list
  },
  users: state => {
    return state.users
  }
}
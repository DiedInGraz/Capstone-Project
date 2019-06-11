/*
  Page: sponsor_eachpage.js

  Primary Contributor: Time Lee
 */

export const state = () => ({
  name: ''
})

// Adder and setter
export const mutations = {
  emptyName(state) {
    state.name = []
  },
  setName(state, name) {
    state.name = name
  }
}

// Getter
export const getters = {
  getName(state) {
    return state.name
  }
}
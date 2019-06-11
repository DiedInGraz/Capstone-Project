/*
  Page: modify_events.js

  Primary Contributor: Justin Yu
 */

export const state = () => ({
    list: [],
})

// Adder and Setter for modifyEvent page
export const mutations = {
  add(state, event) {
    state.list.push(event)
  },
  emptyList(state) {
    state.list = []
  }
}

// Getter for modifyEvent page
export const getters = {
  list: state => {
      return state.list
  },
}
/*
  Page: modify_tag.js

  Primary Contributor: Ruining Yang
 */

export const state = () => ({
  list: [],
})

// Adder and setter for modify tag page
export const mutations = {
  add(state, tag) {
    state.list.push(tag)
  },
  emptyList(state) {
    state.list = []
  }
}

// Getter for modify tag page
export const getters = {
  list: state => {
    return state.list
  }
}
/*
  Page: modify_school.js

  Primary Contributor: Ruining Yang
 */

export const state = () => ({
  list: [],
})

// Adder and Setter for modify school page
export const mutations = {
  add(state, school) {
    state.list.push(school)
  },
  emptyList(state) {
    state.list = []
  }
}

// Getter for modify school page
export const getters = {
  list: state => {
    return state.list
  }
}
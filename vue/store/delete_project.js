/*
  Page: delete_project.js

  Primary Contributor: Ruining Yang
 */

export const state = () => ({
  list: []
})

// Adder and Setter functions for delete project page
export const mutations = {
  add(state, project) {
    state.list.push(project)
  },
  emptyList(state) {
    state.list = []
  }
}

// Getter function for delete project page
export const getters = {
  list: state => {
    return state.list
  }
}
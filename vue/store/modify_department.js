/*
  Page: modify_department.js

  Primary Contributor: Ruining Yang
 */


export const state = () => ({
  list: [],
})

// Adder and getter for modifyDepartment page
export const mutations = {
  add(state, department) {
    state.list.push(department)
  },
  emptyList(state) {
    state.list = []
  }
}

// Setter for modifyDepartment page
export const getters = {
  list: state => {
    return state.list
  }
}
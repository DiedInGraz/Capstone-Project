/*
  Page: create_project.js

  Primary Contributor: Ruining Yang
  Secondary Contributor: Justin Yu
 */

export const state = () => ({
  list: [],
  tag_list: [],
  school_list: [],
  department_list: [],
  sponsor_list: []
})

// Adder and Setter functions for create project page
export const mutations = {
  add(state, professor) {
    state.list.push(professor)
  },
  addTag(state, tag) {
    state.tag_list.push(tag)
  },
  addSchool(state, school) {
    state.school_list.push(school)
  },
  addDepartment(state, department) {
    state.department_list.push(department)
  },
  addSponsor(state, sponsor) {
    state.sponsor_list.push(sponsor)
  },
  emptyList(state) {
    state.list = []
    state.tag_list = []
    state.school_list = []
    state.department_list = []
    state.sponsor_list = []
  },
  sortUser(state) {
    state.tag_list.sort()
    state.school_list.sort()
    state.department_list.sort()
  }
}

// Getter functions for create project page
export const getters = {
  list: state => {
    return state.list
  },
  tagList: state => {
    return state.tag_list
  },
  schoolList: state => {
    return state.school_list
  },
  departmentList: state => {
    return state.department_list
  },
  sponsor_list: state => {
    return state.sponsor_list
  }
}
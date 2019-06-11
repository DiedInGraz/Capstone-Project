/*
  Page: modify_project.js

  Primary Contributor: Ruining Yang
  Secondary Contributor: Justin Yu
 */

export const state = () => ({
  list: [],
  professor_list: [],
  tag_list: [],
  sponsor_list: [],
  school_list: [],
  department_list: []
})

// Adder and Setter for modify project page
export const mutations = {
  add(state, user) {
    state.list.push(user)
  },
  emptyList(state) {
    state.list = []
  },
  sortList(state) {
    state.list.sort()
    state.professor_list.sort()
    state.tag_list.sort()
    state.sponsor_list.sort()
    state.school_list.sort()
    state.department_list.sort()
  },
  emptyTag(state) {
    state.tag_list = []
  },
  emptyProfessor(state) {
    state.professor_list = []
  },
  emptySponsor(state) {
    state.sponsor_list = []
  },
  emptySchool(state) {
    state.school_list = []
  },
  emptyDepartment(state) {
    state.department_list = []
  },
  addProfessor(state, professor) {
    state.professor_list.push(professor)
  },
  addTag(state, tag) {
    state.tag_list.push(tag)
  },
  addSponsor(state, sponsor) {
    state.sponsor_list.push(sponsor)
  },
  addSchool(state, school) {
    state.school_list.push(school)
  },
  addDepartment(state, department) {
    state.department_list.push(department)
  }
}


// Getters for modifyProject Page
export const getters = {
  list: state => {
    return state.list
  },
  professor_list: state => {
    return state.professor_list
  },
  sponsor_list: state => {
    return state.sponsor_list
  },
  tagList: state => {
    return state.tag_list
  },
  schoolList: state => {
    return state.school_list
  },
  departmentList: state => {
    return state.department_list
  }
}
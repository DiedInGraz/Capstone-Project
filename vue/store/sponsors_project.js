/*
  Page: sponsor_project.js

  Primary Contributor: Ruining Yang
 */

export const state = () => ({
  list: [],
  tag_list: [],
  school_list: [],
  department_list: [],
  get_project_list: [],
  sponsor: ''
})

// Adder and Setter for sponsor capstone page
export const mutations = {
  add(state, project) {
    //if (!(project.Sponsor === undefined || project.Sponsor.length != 0))
    //project.Sponsor = 'No sponsors yet'
    state.list.push(project)
  },
  emptyList(state) {
    state.list = []
    state.tag_list = []
    state.school_list = []
    state.department_list = []
    state.get_project_list = []
    state.sponsor = ''
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
  addProject(state, project) {
    state.get_project_list.push(project)
  },
  sortUser(state) {
    state.list.sort()
    state.tag_list.sort()
    state.school_list.sort()
    state.department_list.sort()
    state.get_project_list.sort()
  }
}

// Getter for sponsor capstone page
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
  getProjectList: state => {
    return state.get_project_list
  }
}
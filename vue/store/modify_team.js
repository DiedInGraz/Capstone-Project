/*
  Page: modify_team.js

  Primary Contributor: Ruining Yang
 */

export const state = () => ({
  list: [],
  team_list: [],
  student_list: []
})

// Adder and getter for modify team page
export const mutations = {
  add(state, project) {
    state.list.push(project)
  },
  emptyList(state) {
    state.list = []
  },
  emptyTeam(state) {
    state.team_list = []
  },
  addTeam(state, team) {
    state.team_list.push(team)
  },
  emptyStudent(state) {
    state.student_list = []
  },
  addStudent(state, student) {
    state.student_list.push(student)
  }
}

// Getter for modify team page
export const getters = {
  list: state => {
    return state.list
  },
  team_list: state => {
    return state.team_list
  },
  student_list: state => {
    return state.student_list
  }
}
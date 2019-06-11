/*
  Page: capstone_eachpage.js

  Primary Contributor: Ruining Yang
  Secondary Contributor: Time Lee
 */

export const state = () => ({
  list: [],
  title: '',
  team_member: '',
  description: '',
  professor: '',
  sponsor: '',
  department: '',
  college_of: '',
  picture: '',
  tag: ''
})

// Adder and Setter functions for capstone
export const mutations = {
  add(state, capstones_eachpage) {
    state.list.push(capstones_eachpage)
  },
  emptyList(state) {
    state.list = []
  },
  setTitle(state, title) {
    state.title = title
  },
  setTeamMember(state, team_member){
    state.team_member = team_member
  },
  setProfessor(state, professor){
    state.professor = professor
  },
  setSponsor(state, sponsor){
    state.sponsor = sponsor
  },
  setDepartment(state, department){
    state.department = department
  },
  setCollegeOf(state, college_of){
    state.college_of = college_of
  },
  setDescription(state, description) {
    state.description = description
  },
  setPicture(state, picture){
    state.picture = picture
  },
  setTag(state, tag){
    state.tag = tag
  }
}

// Getter functions for capstone
export const getters = {
  list: state => {
    return state.list
  },
  getTitle(state) {
    return state.title
  },
  getTeamMember(state){
    return state.team_member
  },
  getProfessor(state){
    return state.professor
  },
  getSponsor(state){
    return state.sponsor
  },
  getDepartment(state){
    return state.department
  },
  getCollegeOf(state){
    return state.college_of
  },
  getDescription(state) {
    return state.description
  },
  getPicture(state) {
    return state.picture
  },
  getTag(state) {
    return state.tag
  }
}

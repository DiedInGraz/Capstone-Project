/*
  Page: blogposts_eachpage.js

  Primary Contributor: Ruining Yang
 */

export const state = () => ({
  list: [],
  title: '',
  description: '',
  picture: '',
  lastDate: ''
})

// Adder and Setter functions for blogposts
export const mutations = {
  add(state, blogpost) {
      state.list.push(blogpost)
  },
  emptyList(state) {
      state.list = []
  },
  setTitle(state, title) {
    state.title = title
  },
  setDescription(state, description) {
    state.description = description
  },
  setPicture(state, picture){
    state.picture = picture
  },
  setDate(state, lastDate){
    state.lastDate = lastDate
  }
}

// Getter functions for blogposts
export const getters = {
  list: state => {
      return state.list
  },
  getTitle(state) {
    return state.title
  },
  getDescription(state) {
    return state.description
  },
  getPicture(state) {
    return state.picture
  },
  getDate(state) {
    return state.lastDate
  }
}
/*
  Page: index.js

  Primary Contributor: Ben Pennington
 */

//not sure if this file is needed
import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let email = null
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      email = (parsed.email && JSON.parse(parsed.email)) || null
    }

    commit('cookies/setUser', email)
  }
}

export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  }
}


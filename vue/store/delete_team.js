/*
  Page: delete_team.js

  Primary Contributor: Ruining Yang
 */

export const state = () => ({
  list: [],
  team_list: []
})

// Adder and Setter function for delete team page
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
  }
}

// Getter function for delete team page
export const getters = {
  list: state => {
    return state.list
  },
  team_list: state => {
    return state.team_list
  }
}
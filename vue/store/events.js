/*
  Page: events.js

  Primary Contributor: Justin Yu
 */

export const state = () => ({
    list: [],
})

// Adder and Getter function for event page
export const mutations = {
    add(state, event){
        state.list.push(event);
    },
    emptyList(state){
        state.list = [];
    },
}

// Getter function for event page
export const getters = {
    list: state => {
        return state.list;
    },
}


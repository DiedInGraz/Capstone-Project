/*
  Page: cmsuers.js

  Primary Contributor: Time Lee
 */


export const state = () => ({
    list: []
})


export const mutations = {
    add(state, cmsuser){
        state.list.push(cmsuser);
    },
    emptyList(state){
        state.list = [];
    }
}


export const getters = {
    list: state => {
        return state.list;
    }
}

/*
 * Author: Tim Lee
 * Last Modified: 3/27/2019
 *
 * This store has a simple state which contains the list of Sponsors Users.
 * 
 * NOTE: IN STRAPI, THE CONTENT TYPE IS NAMED 'USERS', BUT IN THE FRONT-END CODE 
 *          SUCH AS HERE, WE ARE TREATING THEM AS 'CMSUSERS'.
 * 
 * Mutations:
 *      add: add sponsors to the list
 *      emptyList: empties the list
 * Getter:
 *      Retrieve the list of sponsors from any component
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
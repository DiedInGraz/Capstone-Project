/*
 * Author: Tim Lee
 * Last Modified: 4/2/2019
 *
 * This store class handles the variable to determined permission access for users.
 * 
 * Mutation:
 *      setAccessBool: set the accessBool value to a 'value'
 * Getter:
 *      Gets the value of 'accessBool'
 */


export const state = () => ({
    accessBool: null
})


export const mutations = {
    setAccessBool(state, value){
        console.log("Setting accessBool", value)
        state.accessBool = value
    }
}


export const getters = {
    getAccessBool(state){
        console.log("Getting accessBool", state)
        return state.accessBool
    }
}
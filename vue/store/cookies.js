/*
  Page: cookies.js

  Primary Contributor: Ben Pennington
 */
import Cookies from 'js-cookie';

export const state = () => ({
    //the value of user is to be set with strapi
    user: ''
});

export const mutations = {
    //create a cookie based on user's name
    setUser(state, user) {
        //create a variable user and set to user
        state.user = user;
        //create a cookie named user set to the current user, and have the cookie default to expire in 1 day
        //Cookies.set('user', user, {expires: 1});
        //create a cookie named email set to the user's email as stored in strapi, and have the coookie default to expire in 1 day
        Cookies.set('email', user.email, {expires: 1});
    },
    //logout disables cookie for user
    logout(state){
        console.log('attempting to log out user: ' + state.user)
        //empty user's state
        state.user = null;
        //clear set cookies
        //Cookies.remove('user');
        Cookies.remove('email');
    }
}
/*
 * Author: Ruining Yang
 * File: checkLogin.js
 * 
 * This is a mixin file that is used to distribute reusable functionalities 
 * for Vue components.
 * 
 * This file contains methods that can check whether user have already loged in
 * 
 */

import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = ('http://' + process.env.VUE_APP_API_URL + ':1337') || 'http://localhost:1337' 
const strapi = new Strapi(apiUrl)

var getName = ''

export default {
  data(){
    return{
      PermissionLevel: '',
      allowAccess: 0,
    }
  },
    
  created: function(){
    var token = ''
    token = Cookies.get('jwtAuth')
    if(token != null) {
      var trans = JSON.stringify(jwtDecode(token))
      getName = JSON.parse(trans).name
    }
  },

  beforeMount: async function(){
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query{
            users(where: {email: "${getName}"}){
              username
              PermissionLevel
            }
          }
        `
      }
    })
  
    if(getName != '') {
      window.location.replace("/dashboard/dashboard")
    }

    if(response.data.users == null) {
      window.location.replace("/dashboard/dashboard")
    }

  }
}


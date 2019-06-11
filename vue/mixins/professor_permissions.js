/*
 * Author: Tim Lee
 * File: professor_permissions.js
 * 
 * This is a mixin file that is used to distribute reusable functionalities 
 * for Vue components.
 * 
 * This file contains methods that can be imported into any vue file to 
 * perform permissions checking.
 * 
 * ============================================================================
 * Checks for admin and professor (Levels 1,2) permissions only.
 */

import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = ('http://' + process.env.VUE_APP_API_URL + ':1337') || 'http://localhost:1337' 
const strapi = new Strapi(apiUrl)

var getName = ''

const page_level_1 = 1
const page_level_2 = 2

export default {
  data(){
    return{
      query: '',
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
    response.data.users.forEach(user => {
      this.PermissionLevel = user.PermissionLevel
    })

    if((this.PermissionLevel == page_level_2) ||
        (this.PermissionLevel == page_level_1)){
      
      this.allowAccess = 1
    }
    else if((this.PermissionLevel != page_level_2) ||
            (this.PermissionLevel != page_level_1)){

      this.allowAccess = 0
    }
    
    return this.allowAccess
  }
}


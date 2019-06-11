<template>
  <!--
      File: dashboard.vue
      Author: KJ Smith
      Description: This file serves as the dashboard for all users.
  -->
  <div class="dashboard-background">
    <div v-if="canAccess === true">
      <DefaultLayout/>
      <!-- dynamically display header based on account type -->
      <div class="dashboard-header">
        <span class="h1 dashboard-header">
            {{accountType}} Dashboard
        </span>
      </div>
      <div class="dashboard-table-container">
        <!-- dynamically display name and email of user -->
        <table class="dashboard-info-column">
            <tr><th class="dashboard-table-header">Information</th> </tr>
            <tr><td class="dashboard-table-element">Name: {{name}}</td> </tr>
            <tr><td class="dashboard-table-element">Email: {{email}}</td> </tr>
        </table>

        <!-- dynamically display options based on permission level-->
        <admin_actions v-if="level === 1"/>
        <professor_actions v-else-if="level === 2"/>
        <student_actions v-else-if="level === 3"/>
        <sponsor_actions v-else-if="level === 4"/>
        <publicDropdown v-else/>

        

      </div>
    </div>
    <div v-else>
      <script>console.log("oops")</script>
      <script>window.location.href = "/Authentication/Login"</script>
    </div>
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AccessDenied from '@/pages/AccessDenied.vue'
import student_actions from './student_actions.vue';
import professor_actions from './professor_actions.vue';
import sponsor_actions from './sponsor_actions.vue';
import admin_actions from './admin_actions.vue';
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import authMixin from '@/mixins/allUsers.js'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = ('http://' + process.env.VUE_APP_API_URL + ':1337') || 'http://localhost:1337' 
const strapi = new Strapi(apiUrl)

export default {
  name: 'SupportPage',
  components: {
    DefaultLayout,
    AccessDenied,
    student_actions,
    professor_actions,
    sponsor_actions,
    admin_actions
  },
  data(){
    return{
        name: '',
        email: '',
        level: null,
        accountType: '',
        canAccess: false
    }
  },
  head() {
        return{
            title: "BU | Dashboard"
        }
    },
  mixins: [authMixin],
  async asyncData() {
    var token = null
    token = Cookies.get('jwtAuth')
    var theEmail = ''
    /* make sure user is logged in */
    if(token != null){
      /* extract email from cookie */
      var trans = JSON.stringify(jwtDecode(Cookies.get('jwtAuth')))
      theEmail = JSON.parse(trans).name
    
    /* using the currently-logged in email,
    query for the current user's name and permission level*/
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query{
          users(where: {email: "${theEmail}"}){
            PermissionLevel
            Name
          }
        }`
      }
    })
    
    var usr = response.data.users[0];

    /* set account variable based on permission level */
    var account
    if(usr.PermissionLevel == 1) account = "Admin"
    else if(usr.PermissionLevel == 2) account = "Professor"
    else if(usr.PermissionLevel == 3) account = "Student"
    else if(usr.PermissionLevel == 4) account = "Sponsor"

    return{
      email: theEmail,
      level: usr.PermissionLevel,
      accountType: account,
      name: usr.Name,
      canAccess: true
      }
    }
  },
  
};


</script>
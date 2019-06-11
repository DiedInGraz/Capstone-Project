<!--
 * Author: Ruining Yang
 * File: Register.vue
 * 
 * This file contains website that admin register the user
-->

<template>
  <div id="RegisterPage">
    <script src="https://cdn.auth0.com/js/auth0/9.10.2/auth0.min.js"></script>
    <div class="permissions">
      <div v-if="allowAccess === 1">

        <DefaultLayout></DefaultLayout>
        <!-- @submit equals to v-on:submit -->
        <form class="management-form-container" autocomplete="off" @submit.stop.prevent="handleSubmit">
          <!-- Input form for user name -->
          <div class="form-group">
            <label class="management-form-title" for="Name">Name</label>
            <b-form-input
              id="Name"
              v-model="Name"
              type="text"
              autofocus="true"
              placeholder="Enter Name"
              required/>
          </div>
          <!-- Input form for user username -->
          <div class="form-group">
            <label class="management-form-title" for="Username">Username</label>
            <b-form-input
              id="Username"
              v-model="Username"
              type="text"
              autofocus="true"
              placeholder="Enter Username"
              required/>
          </div>
          <!-- Input form for user email -->
          <div class="form-group">
            <label class="management-form-title" for="Email">Email</label>
            <b-form-input
              id="Email"
              v-model="Email"
              type="email"
              autofocus="true"
              placeholder="Enter Email"
              required/>
          </div>
          <!-- Input form for user password -->
          <div class="form-group">
            <label class="management-form-title" for="Password">Password</label>
            <b-form-input
              id="Password"
              v-model="Password"
              label="Password"
              type="password"
              class="form-control"
              autofocus="true"
              placeholder="Enter Password"
              required/>
          </div>
          <!-- Input form for user phone number -->
          <div class="form-group">
            <label class="management-form-title" for="Phone">Phone</label>
            <b-form-input
              id="Phone"
              v-model="Phone"
              type="tel"
              autofocus="true"
              placeholder="Enter Phone Number"
              pattern='\d{10}'
              required/>
          </div>
          <!-- choose the user permission role -->
          <div class="form-group">
            <label class="management-form-title" >Account Type: </label>
            <select class="management-form-selector" v-model="selected" required>
              <option disabled hidden value="">Please select account type</option>
              <option>administrator</option>
              <option>professor</option>
              <option>student</option>
              <option>sponsor</option>
            </select>
          </div>

          <button v-bind:disabled="loading" type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div v-else>
        <AccessDenied></AccessDenied>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = ('http://' + process.env.VUE_APP_API_URL + ':1337') || 'http://localhost:1337' 
const strapi = new Strapi(apiUrl)
var client_id = ''
var client_domain = ''
var connect_database = ''

// Import mixin file for authentication checking
import authMixin from '@/mixins/admin_permissions.js'
import AccessDenied from '@/pages/AccessDenied.vue'

export default {
  name: 'RegisterPage',
  components: {
    DefaultLayout,
    AccessDenied
  }, 
  data() {
    return {
      Username: '',
      Name: '',
      Email: '',
      Password: '',
      Phone: '',
      loading: false,
      selected: ''
    }
  },
  head() {
    return{
      title: "BU | Create User"
    }
  },
  /*
   * Calls the professor_permissions.js mixin file to check for 
   * professor authentication.
   */
  mixins: [authMixin],
  created: function(){
    console.log("Checking for authentication...")
  },
  mounted () {
    const config = require('~/config.json')
    client_id = config.AUTH0_CLIENT_ID
    client_domain = config.AUTH0_CLIENT_DOMAIN
    connect_database = config.AUTH0_CONNECTION
  },
  methods: {
    // Submit button function
    async handleSubmit() {
      try {
        this.loading = true

        this.Email = this.Email.toLowerCase() // ignore upppcase email
        var level = 0
        if(this.selected === 'administrator') {
          level = 1
        }
        if(this.selected === 'professor') {
          level = 2
        }
        if(this.selected === 'student') {
          level = 3
        }
        if(this.selected === 'sponsor') {
          level = 4
        }
        var username_new = this.Username
        var userType_new = this.selected
        var permissionLevel_new = level
        var email_new = this.Email
        var password_new = this.Password
        var phone_new = this.Phone
        var name_new = this.Name

        var webAuth = new auth0.WebAuth({
          domain:   client_domain,
          clientID: client_id
        });
        
        webAuth.signup({
          connection: connect_database,
          email:   this.Email,
          password: this.Password,
        }, function (err) {
          if (err) {
            return alert(err.code + '\n' + err.policy)
          } else {           
            const response = strapi.request('post', '/auth/local/register', {
              data: {
                username: username_new,
                Name: name_new,
                UserType: userType_new,
                PermissionLevel: permissionLevel_new,
                email: email_new,
                password: password_new,
                Phone: phone_new
              }
            })
            window.location.reload()
          }
        });        

        this.loading = false
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    }
  }
}
</script>
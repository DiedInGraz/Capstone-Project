<!--
 * Author: Ruining Yang
 * File: Login.vue
 * 
 * This file contains website that user logins the website
-->

<template>
  <div id="LoginPage" class="login-page-background">
    <script src="https://cdn.auth0.com/js/auth0/9.10.2/auth0.min.js"></script>
    <DefaultLayout></DefaultLayout>
    
    <!-- Input form for login email -->
    <form class="login-form-container" @submit.stop.prevent="getCode">
      <div class="form-group login-form">
        <label for="email">Email:</label>
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          autofocus="true"
          placeholder="Enter Email"
          required/>
      </div>

      <button type="submit"
      class="login-page-btn">Get Code</button>
    </form>
    
    <!-- Check the code from auth0 -->
    <form class="login-form-container" autocomplete="off" @submit.stop.prevent="handleSubmit">
      <div v-if=check_have_account class="form-group login-form">
        
        <label for="Password">Enter Code from Email Below:</label>
        <b-form-input
          id="password"
          v-model="password"
          label="password"
          type="password"
          class="form-control"
          autofocus="true"
          placeholder="Code"
          required/>

       <button v-bind:disabled="loading" type="submit"
       class="login-page-btn">Login</button>     
      </div>
      
    </form>
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = ('http://' + process.env.VUE_APP_API_URL + ':1337') || 'http://localhost:1337' 
const strapi = new Strapi(apiUrl);
import jwtDecode from 'jwt-decode'

import { mapMutations } from 'vuex';
import authMixin from '@/mixins/checkLogin.js'

var client_id = ''
var client_domain = ''
var connect_database = ''

export default {
  name: 'LoginPage',
  components: {
      DefaultLayout
  },
  data() {
    return {
      email: '',
      password: '',
      check_have_account: false,
      loading: false
    }
  },
  head() {
    return{
      title: "BU | Login"
    }
  },
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
    // get code from auth0
    async getCode() {
      try {
        this.email = this.email.toLowerCase() // ignore upppcase email
        this.check_have_account = false
        const response = await strapi.request('post', '/graphql', {
          data: {
            query: `query{
              users(where: {email: "${this.email}"}){
                username
                PermissionLevel
              }
            }
          `
          }
        })
        response.data.users.forEach(user => {
          this.check_have_account = true
        })

        if(this.check_have_account) {
          var webAuth = new auth0.WebAuth({
            domain:   client_domain,
            clientID: client_id,
            responseType: 'token id_token'
          });

          webAuth.passwordlessStart({
              connection: 'email',
              send: 'code',
              email: this.email
            }, function (err,res) {
              if(err != null) {
                alert(err.description)
                this.$router.go()
              }
            }
          );
        } else {
          alert("Invalid email. Please check your spelling and try again.")
        }
        
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    },
    // Submit button function
    async handleSubmit() {
      try {
        this.email = this.email.toLowerCase() // ignore upppcase email
        this.loading = true
        const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`
        var webAuth = new auth0.WebAuth({
          domain:   client_domain,
          clientID: client_id,
          responseType: 'token id_token',
          redirectUri: `${getBaseUrl()}/auth/signed-in`          
        });

        webAuth.passwordlessLogin({
            connection: 'email',
            email: this.email,
            verificationCode: this.password
          }, function (err,res) {
            if(err != null) {
              alert(err.error + '\n' + err.description)
              this.$router.go()
            }
          }
        );
        this.loading = false
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    }
  }
}
</script>
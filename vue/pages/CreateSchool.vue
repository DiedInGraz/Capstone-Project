<!--
  Page: CreateShool.vue

  Primary Contributor: Justin Yu
  Secondary Contributor: Ruining Yang
-->

<template>
  <div id="CreateSchoolPage" >
    <div v-if="allowAccess === 1">

      <DefaultLayout></DefaultLayout>
      <form class="management-form-container" autocomplete="off" @submit.stop.prevent="handleSubmit">
        <!-- School name -->
        <div class="form-group">
          <label for="tag">Create New School</label>
          <b-form-input
            id="school"
            v-model="school"
            type="text"
            autofocus="true"
            placeholder="Enter School Name"
            pattern="[a-zA-Z ]+"
            required/>
        </div>
        <!-- Submit button -->
          <b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
            <p>Success! Closing after {{ dismissCountDown }} seconds...</p>
          </b-alert>
          
          <b-button :disabled="loading" type="submit" variant="info" class="m-1">
            Submit
          </b-button>
      </form>
    </div>
    <div v-else>
      <AccessDenied></AccessDenied>
    </div>

  </div>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = ('http://' + process.env.VUE_APP_API_URL + ':1337') || 'http://localhost:1337' 
const strapi = new Strapi(apiUrl)

// Import mixin file for authentication checking
import authMixin from '@/mixins/professor_permissions.js'
import AccessDenied from '@/pages/AccessDenied.vue'

export default {
  name: 'CreateSchoolPage',
  components: {
    DefaultLayout,
    AccessDenied
  },
  data() {
    return {
      school: '',
      loading: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    }
  },
  head() {
        return{
            title: "BU | Create School"
        }
    },
  /*
   * Calls the  mixin file to check for authentication.
   */
  mixins: [authMixin],
  created: function(){
    console.log("Checking for authentication...")
  },

  methods: {
    // Submit button function
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    // Submit button function
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    
    // Sumbit button function
    async handleSubmit() {
      this.loading = true
      try {
        const response = await strapi.createEntry('schools', {
          school_name: this.school
        })
        
        this.showAlert()

        window.setTimeout(function(){
            window.location.reload();
        }, 3000);

      } catch (err) {
        this.loading = false
      }
    }
  }
};
</script>
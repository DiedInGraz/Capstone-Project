<!--
  Page: CreateTag.vue

  Primary Contributor: Ruining Yang
  Secondary Contributor: Justin Yu
-->

<template>
  <div id="CreateTagPage">
    <div v-if="allowAccess === 1">

      <DefaultLayout></DefaultLayout>

      <form class="management-form-container" autocomplete="off" @submit.stop.prevent="handleSubmit">
        <!-- Tag name -->
        <div class="form-group">
          <label class="management-form-title" for="tag">Create New Tag</label>
          <b-form-input
            id="tag"
            v-model="tag"
            type="text"
            autofocus="true"
            placeholder="Please Enter a Tag"
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
  name: 'CreateTagPage',
  components: {
    DefaultLayout,
    AccessDenied
  },
  data() {
    return {
      tag: '',
      loading: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    }
  },
  head() {
        return{
            title: "BU | Create Tag"
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
    // Sumbit button function
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    // Sumbit button function
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    
    // Sumbit button function
    async handleSubmit() {
      this.loading = true
      
      try {
        this.loading = true

        const response = await strapi.createEntry('tags', {
          tag_name: this.tag
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
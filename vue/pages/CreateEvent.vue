<!--
  Page: CreateEvent.vue

  Primary Contributor: Justin Yu
  Secondary Contributor: Ruining Yang
-->

<template>
  <div id="CreateEventPage">

    <div class="permissions">
      <!-- If authorized, allow access to page. -->
      <div v-if="allowAccess===1">

        <DefaultLayout></DefaultLayout>
        <!-- @submit equals to v-on:submit -->
        <form class="management-form-container" autocomplete="off" @submit.stop.prevent="handleSubmit">
          <!-- Event Title -->
          <div class="form-group">
            <label class="management-form-title" for="Title">Event Name</label>
            <b-form-input
              id="Title"
              v-model="Title"
              type="text"
              autofocus="true"
              placeholder="Enter Event Title"
              required/>
          </div>
          <!-- Event Description -->
          <div class="form-group">
            <label class="management-form-title" for="Description">Event Description</label>
            <b-form-input
              id="Description"
              v-model="Description"
              type="text"
              autofocus="true"
              placeholder="Enter Event Description"
              required/>
          </div>
          <!-- Event start date -->
          <div class="form-group">
            <label class="management-form-title" for="Start">Start Date</label>
            <b-form-input
              id="Start"
              v-model="Start"
              type="date"
              autofocus="true"
              required/>
          </div>
          <!-- Event start time -->
          <div class="form-group">
            <label class="management-form-title" for="Start">Start Time (ex. 10:00 AM)</label>
            <b-form-input
              id="Start"
              v-model="StartTime"
              type="time"
              autofocus="true"
              required/>
          </div>
          <!-- Event end date -->
          <div class="form-group">
            <label class="management-form-title" for="End">End Date</label>
            <b-form-input 
              id="End"
              v-model="End"
              type="date"
              autofocus="true"
              required/>
          </div>
          <!-- Event end time -->
          <div class="form-group">
            <label class="management-form-title" for="Start">End Time (ex. 12:30 PM)</label>
            <b-form-input
              id="Start"
              v-model="EndTime"
              type="time"
              autofocus="true"
              required/>
          </div>
          <!-- Submit button -->
        
          <b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
            <p>Success! Closing after {{ dismissCountDown }} seconds...</p>
          </b-alert>
          
          <b-button :disabled="clicked" type="submit" variant="info" class="m-1">
            Submit
          </b-button>
        </form>
      </div>
      <!-- If not authorized, show unauthorized component. -->
      <div v-else>
        <!-- <h1>{{ username }} IS UNAUTHORIZED TO SEE THIS PAGE!</h1> -->
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
import moment from 'moment'

// Import mixin file for authentication checking
import professorMixin from '@/mixins/professor_permissions.js'
import AccessDenied from '@/pages/AccessDenied.vue'

export default {
  name: 'CreateEventPage',
  components: {
      DefaultLayout,
      AccessDenied
  }, 
  data() {
    return {
      Title: '',
      Description: '',
      Start: '',
      StartTime: '',
      End: '',
      EndTime: '',
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      clicked: false
    }
  },

  /*
   * Calls the professor_permissions.js mixin file to check for 
   * professor authentication.
   */
  mixins: [professorMixin],
  created: function(){
    console.log("Checking for professor authentication...")
  },

  head() {
    return {
      title: "BU | Create Event"
    }
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

    // Submit button function
    async handleSubmit() {
      this.clicked = true
      
      try {
          var tempStart = moment(this.Start + 'T' + this.StartTime + 'Z');
          var tempEnd = moment(this.End + 'T' + this.EndTime + 'Z');

          if (tempEnd.isAfter(tempStart)) {
            const response = await strapi.createEntry('events', {
              title: this.Title,
              description: this.Description,
              //Concatnating the letter T and the letter Z to satisfie ISO 8061 format
              start: this.Start + 'T' + this.StartTime + 'Z',
              end: this.End + 'T' + this.EndTime + 'Z',
            })
            this.showAlert()

            window.setTimeout(function(){
                window.location.reload();
            }, 3000);
          }
          else {
            this.clicked = false;
            alert('The Start date must come before End date')
          }
      } catch (err) {
        this.clicked = false
      }
    }
  }
}
</script>
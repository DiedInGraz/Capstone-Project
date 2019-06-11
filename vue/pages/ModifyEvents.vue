<!--
  Page: ModifyDepartment.vue

  Primary Contributor: Justin Yu
  Secondary Contributor: Ruining Yang
-->
<template>
  <div class="ModifyEventPage">
    <div v-if="allowAccess === 1">

      <DefaultLayout></DefaultLayout>
      <div class="management-form-container">
        <!-- Select event to be modified -->
      <select class="management-form-selector" v-model="selected">
        <option value="" disabled hidden selected>Select Event</option>
        <option v-for="event in event_list" :key="event.id" :value="event.id">
        {{ event.EventTitle }}
        </option>
      </select>
      <!-- Remove or Modify event option -->
      <div v-if="selected !== ''">
        <button v-on:click.prevent="removeEvent" type="button" class="btn btn-danger mx-3">Remove Event</button>
        <button v-on:click.prevent="modify = true" type="button" class="btn btn-primary mx-3">Modify Event</button>
      </div>
      <!-- Option for modify -->
      <div v-if="modify">
        <select class="management-form-selector" v-model="options">
          <option value="" hidden disabled>Select Attribute</option>
          <option>Title</option>
          <option>Description</option>
          <option>Start Time</option>
          <option>End Time</option>
        </select>
      </div>
      <!-- Change event title -->
      <form autocomplete="off" @submit.stop.prevent="changeTitle">
        <div v-if="options == 'Title'">
          <div class="form-group">
            <label class="management-form-title" for="Title">Event Title</label>
            <b-form-input
            id="Title"
            v-model="Title"
            type="text"
            autofocus="true"
            placeholder="Enter new title"
            required/>
          </div>
          <!-- Submit button -->
          <b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
            <p>Success! Closing after {{ dismissCountDown }} seconds...</p>
          </b-alert>
          
          <b-button :disabled="clicked" type="submit" variant="info" class="m-1">
            Submit
          </b-button>
        </div>
      </form>
      <!-- Change event description -->
      <form autocomplete="off" @submit.stop.prevent="changeDescription">
        <div v-if="options == 'Description'">
          <div class="form-group">
            <label class="management-form-title" for="Description">Event Description</label>
            <b-form-input
            id="Description"
            v-model="Description"
            type="text"
            autofocus="true"
            placeholder="Enter new description"
            required/>
          </div>
          <!-- Submit button -->
          <b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
            <p>Success! Closing after {{ dismissCountDown }} seconds...</p>
          </b-alert>
          
          <b-button :disabled="clicked" type="submit" variant="info" class="m-1">
            Submit
          </b-button>
        </div>
      </form>
      <!-- Change event start date and time -->
      <form autocomplete="off" @submit.stop.prevent="changeStartTime">
        <div v-if="options == 'Start Time'">
          <div class="form-group">
            <label class="management-form-title" for="StartTime">Start Date</label>
            <b-form-input
            id="StartTime"
            v-model="Start"
            type="date"
            autofocus="true"
            required/>
          </div>
          <div class="form-group">
            <label class="management-form-title" for="Start">Start Time (ex. 10:00 AM)</label>
            <b-form-input
            id="Start"
            v-model="StartTime"
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
        </div>
      </form>
      <!-- Change even end date and time -->
      <form autocomplete="off" @submit.stop.prevent="changeEndTime">
        <div v-if="options == 'End Time'">
          <div class="form-group">
            <label class="management-form-title" for="EndTime">End Date</label>
            <b-form-input
            id="EndTime"
            v-model="End"
            type="date"
            autofocus="true"
            required/>
          </div>
          <div class="form-group">
            <label class="management-form-title" for="End">End Time (ex. 12:30 PM)</label>
            <b-form-input
            id="End"
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
        </div>
      </form>

    </div>
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
import moment from 'moment'

import authMixin from '@/mixins/professor_permissions.js'
import AccessDenied from '@/pages/AccessDenied.vue'

export default {
  name: 'ModifyEventPage',
  components: {
      DefaultLayout,
      AccessDenied
  }, 
  head() {
        return{
            title: "BU | Modify Event"
        }
    },
  data() {
    return {
      Title: '',
      Description: '',
      Start: '',
      StartTime: '',
      End: '',
      EndTime: '',
      selected: '',
      options: '',
      modify: false,
      clicked: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    }
  },

  /*
  * Calls the  mixin file to check for authentication.
  */
  mixins: [authMixin],
  created: function(){
    console.log("Checking for authentication...")
  },

  computed: {
    event_list() {
      return this.$store.getters['modify_events/list']
    }
  },

  methods: {
    // Submit button count down function
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    // Submit button count down function
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },

    // Remove event function
    async removeEvent() {
      const response = strapi.deleteEntry('events', this.selected)
      window.location.reload();
    },

    // Change event title function
    async changeTitle() {
      this.clicked = true

      const response = await strapi.updateEntry('events', this.selected, {
          title: this.Title
      })
      this.showAlert()

      window.setTimeout(function(){
          window.location.reload();
      }, 3000);
    },
    // Change event description function
    async changeDescription() {
      this.clicked = true

      const response = await strapi.updateEntry('events', this.selected, {
          description: this.Description
      })
      this.showAlert()

      window.setTimeout(function(){
          window.location.reload();
      }, 3000);
    },

    // Change event start time function
    async changeStartTime() {
      this.clicked = true

      const response = await strapi.updateEntry('events', this.selected, {
          start: this.Start + 'T' + this.StartTime + 'Z',
      })
      this.showAlert()

      window.setTimeout(function(){
          window.location.reload();
      }, 3000);
    },

    // Change event end time function
    async changeEndTime() {
      this.clicked = true
      
      const response = await strapi.updateEntry('events', this.selected, {
          end: this.End + 'T' + this.EndTime + 'Z',
      })
      this.showAlert()

      window.setTimeout(function(){
          window.location.reload();
      }, 3000);
    }
  },
  // Updating page data from strapi when webpage loads up
  async fetch({ store }) {
    store.commit('modify_events/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          events {
            _id
            title
            description
            start
            end
          }
        }
        `
      }
    })
    response.data.events.forEach(event => {
      store.commit('modify_events/add', {
        id: event._id,
        EventTitle: event.title,
        ...event
      })
    })
  }
}
</script>


<!--
  Page: ModifySchool.vue

  Primary Contributor: Ruining Yang
  Secondary Contributor: Justin Yu
-->

<template>
  <div id="ModifySchoolPage">
    <div v-if="allowAccess === 1">
      <DefaultLayout></DefaultLayout>
      <div class="management-form-container">
        <!-- Select schol -->
        <select class="management-form-selector" v-model="selected">
          <option  value="" disabled hidden selected>Select School</option>
          <option v-for="each_school in school_list" :key="each_school.id" :value="each_school.id">
            {{ each_school.SchoolName }}
          </option>
        </select>
        <!-- Remove or modify school -->
        <div v-if="selected !== ''">
            <button v-on:click.prevent="removeDepartment" type="button" class="btn btn-danger mx-3">Remove School</button>
            <button v-on:click.prevent="modify = true" type="button" class="btn btn-primary mx-3">Modify School</button>
        </div>
      
        <div v-if="modify">
          <form autocomplete="off" @submit.stop.prevent="handleSubmit">
            <!-- School name -->
            <div class="form-group">
              <label class="management-form-title" for="school">New School</label>
              <b-form-input
                id="school"
                v-model="school"
                type="text"
                autofocus="true"
                placeholder="Enter school name"
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

// Import mixin file for authentication checking
import authMixin from '@/mixins/professor_permissions.js'
import AccessDenied from '@/pages/AccessDenied.vue'

export default {
  name: 'ModifySchoolPage',
  components: {
    DefaultLayout,
    AccessDenied
  },
  data() {
    return {
      school: '',
      selected: '',
      loading: false,
      modify: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    }
  },
  head() {
        return{
            title: "BU | Modify School"
        }
    },
  computed: {
    school_list() {
      return this.$store.getters['modify_school/list']
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
    // Submit button count down function
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    // Submit button count down function
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },

    // Remove school
    async removeSchool() {
      try {
        this.loading = true
        const change = strapi.deleteEntry('schools', this.selected)

        this.loading = false
        this.$router.go() // to the new page
      } catch (err) {
        this.loading = false
        //may add details for each err.message. For example:
        // unique title name, cannot submit image, etc.
        alert(err.message || 'An error occurred.')
      }
    },

    // Submit button function
    async handleSubmit() {
      this.loading = true

      try {
        const change = await strapi.updateEntry('schools', this.selected, {
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
  },

  // Updating page data from strapi when page loads up
  async fetch({ store }) {
    store.commit('modify_school/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          schools {
            _id
            school_name
          }
        }
        `
      }
    })

    response.data.schools.forEach(school => {     
      store.commit('modify_school/add', {
        id: school._id,
        SchoolName: school.school_name
      })
    })
  }
};
</script>
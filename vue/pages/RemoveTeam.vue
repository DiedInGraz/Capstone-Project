<!--
  Page: RemoveCapstone.vue

  Primary Contributor: Ruining Yang
  Secondary Contributor: Justin Yu
-->

<template>
  <div id="DeleteTeamPage">
    <div class="permissions">
      <div v-if="allowAccess === 1">
        <DefaultLayout></DefaultLayout>
        <form class="management-form-container" autocomplete="off" @submit.stop.prevent="handleSubmit">
          <!-- Pick capstone project -->
          <select class="management-form-selector" v-model="selected" v-on:change="updateTeam" required>
            <option disabled hidden value="">Select Capstone</option>
            <option v-for="name in project_name" :key="name.id">
              {{ name }}
            </option>
          </select>
          <!-- <span>Selected: {{ selected }}</span> test selected project-->

          <!-- Pick capstone project team -->
          <select class="management-form-selector" v-model="selected_team" required>
            <option disabled hidden value="">Select Team</option>
            <option v-for="name in team_name" :key="name.id">
              {{ name }}
            </option>
          </select>

          <!-- Submit button -->
          <b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
              <p>Success! Closing after {{ dismissCountDown }} seconds...</p>
            </b-alert>
            
            <b-button :disabled="loading" type="submit" variant="info" class="m-1">
              Remove
            </b-button>
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

// Import mixin file for authentication checking
import authMixin from '@/mixins/professor_permissions.js'
import AccessDenied from '@/pages/AccessDenied.vue'

export default {
  name: 'DeleteTeamPage',
  components: {
    DefaultLayout,
    AccessDenied
  },
  data() {
    return {
      selected: '',
      selected_team: '',
      loading: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    }
  },
  head() {
        return{
            title: "BU | Remove Team"
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
    project_name() {
      return this.$store.getters['delete_team/list']
    },
    team_name() {
      return this.$store.getters['delete_team/team_list']
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

    // Update team data when a capstone is picked
    async updateTeam() {
      this.$store.commit('delete_team/emptyTeam')
      const response = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            projects {
              _id
              ProjectName
              teams {
                _id
                name
              }
            }
          }
          `
        }
      })

      response.data.projects.forEach(project => {     
        if(project.ProjectName === this.selected) {
          for(var each in project.teams) {
            this.$store.commit('delete_team/addTeam', project.teams[each].name)
          }
        }
      })
    },

    // Submit button function
    async handleSubmit() {
      this.loading = true

      try {

        var projectId = ''

        const matchProjectName = await strapi.request('post', '/graphql', {
          data: {
            query: `query {
              teams {
                _id
                name
              }
            }
            `
          }
        }) 
        matchProjectName.data.teams.forEach(team => {     
          if(this.selected_team === team.name) {
            projectId = team._id
          }
        })

        const response = strapi.deleteEntry('teams', projectId)

        this.showAlert()

        window.setTimeout(function(){
            window.location.reload();
        }, 3000);

      } catch (err) {
        this.loading = false
      }
    }
  },

  // Updating data from strapi when page loads up
  async fetch({ store }) {
    store.commit('delete_team/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          projects {
            _id
            ProjectName
          }
        }
        `
      }
    })

    response.data.projects.forEach(project => {     
      store.commit('delete_team/add', project.ProjectName)
    })
  }
};
</script>

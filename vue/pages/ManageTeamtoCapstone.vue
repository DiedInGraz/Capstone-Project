<!--
  Page: ManageTeamtoCapstone.vue

  Primary Contributor: Ruining Yang
  Secondary Contributor: Justin Yu
-->

<template>
  <div >
    <div class="permissions">
      <div v-if="allowAccess === 1">

        <DefaultLayout></DefaultLayout>
        <div class="management-form-container">
        <form autocomplete="off" @submit.stop.prevent="handleSubmit">
          <!-- Pick capstone project -->
          <select class="management-form-selector" v-model="selected" required>
            <option class="management-form-title" disabled hidden value="">Select Capstone</option>
            <option v-for="name in project_name" :key="name.id">
              {{ name }}
            </option>
          </select>
          <!-- <span>Selected: {{ selected }}</span> test selected project-->

          <!-- Team name -->
          <div>
            <label class="management-form-title" for="teamName">Enter Team Name: </label>
            <b-form-input
              id="teamName"
              v-model="teamName"
              type="text"
              autofocus="true"
              placeholder="Enter your team name"
              required/>
          </div>
          <!-- Select student option -->
          <form style="display: flex" v-on:submit.prevent="addTeamMember">
            <select class="management-form-selector" v-model="soldier">
              <option disabled hidden value="">Select Student</option>
              <option v-for="name in user_list" :key="name.id">
                {{ name }}
              </option>
            </select>

            <button class="management-form-btn">Add</button>
          </form>
          
          <li v-for="name in groupMember" :key="name.id">
            {{ name.memberName }}
            <button class="management-form-remove-tag-btn" v-on:click.prevent="removeTeamMember(name.memberName)">x</button>
          </li>
        
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
  name: 'ManageTeamtoCapstonePage',
  components: {
    DefaultLayout,
    AccessDenied
  },
  data() {
    return {
      selected: '',
      soldier: '',
      groupMember: [],
      teamName: '',
      loading: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    }
  },
  head() {
        return{
            title: "BU | Create Team"
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

    // Function to add team members to the list
    addTeamMember() {
      var addSoldier = true
      for(var i = this.groupMember.length; i--;) {
        if(this.groupMember[i].memberName === this.soldier) {
          addSoldier = false
        }
      }
      if(this.soldier === '') {
        addSoldier = false
      }
      if(addSoldier) {
        this.groupMember.push({
          memberName: this.soldier
        })
      }
      this.soldier = ''
    },
    // Function to remove team members to the list
    removeTeamMember:function(memberName) {
      for(var i = this.groupMember.length; i--;) {
        if ( this.groupMember[i].memberName === memberName) {
          this.groupMember.splice(i, 1);
        }
      }
    },

    // Submit button function
    async handleSubmit() {
      this.loading = true
      
      try {
        var convertTeamMember = []
        var projectId = ''

        const matchTeamMember = await strapi.request('post', '/graphql', {
          data: {
            query: `query {
              users {
                _id
                username
              }
            }
            `
          }
        })
        matchTeamMember.data.users.forEach(user => {     
          for(var each in this.groupMember) {
            if(this.groupMember[each].memberName === user.username) {
              convertTeamMember.push(user._id)
            }
          }
        })
        
        const matchProjectName = await strapi.request('post', '/graphql', {
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
        matchProjectName.data.projects.forEach(project => {     
          if(this.selected === project.ProjectName) {
            projectId = project._id
          }
        })

        const response = await strapi.createEntry('teams', {
          name: this.teamName,
          project: projectId,
          users: convertTeamMember
        })

        this.showAlert()

        window.setTimeout(function(){
            window.location.reload();
        }, 3000);


      } catch (err) {
        this.loading = false
        //alert(err.message || 'An error occurred.')
        //may add details for each err.message. For example:
        // unique title name, cannot submit image, etc.
        if("An internal server error occurred" === err.message) {
          const response = await strapi.request('post', '/graphql', {
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

          response.data.teams.forEach(team => {
            if(this.teamName === team.name) {
              alert("Team name already exists")
            }
          })
        } else {
          alert(err.message || 'An error occurred.')
        }
      }
    }
  },
  computed: {
    // Getting data from store js files
    project_name() {
      return this.$store.getters['manageteamtocapstone/list']
    },
    user_list() {
      return this.$store.getters['manageteamtocapstone/users']
    }
  },

  // Update page data from strapi when web page is loaded
  async fetch({ store }) {
    store.commit('manageteamtocapstone/emptyList')
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
      store.commit('manageteamtocapstone/add', project.ProjectName)
    })

    const getUser = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          users {
            _id
            username
            PermissionLevel
          }
        }
        `
      }
    })

    getUser.data.users.forEach(user => {   
      if(user.PermissionLevel === 3) { 
        store.commit('manageteamtocapstone/addUser', user.username)
      }
    })
    store.commit('manageteamtocapstone/sortUser')
  }
};
</script>


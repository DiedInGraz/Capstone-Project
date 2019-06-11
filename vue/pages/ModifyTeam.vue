<!--
  Page: ModifyTag.vue

  Primary Contributor: Ruining Yang
  Secondary Contributor: Justin Yu
-->

<template>
  <div id="ModifyTeamPage">

    <div class="permissions">
      <!-- If authorized, allow access to page. -->
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

          <!-- Pick capstone project team -->
          <select class="management-form-selector"  v-model="selected_team" v-on:change="updateUser" required>
            <option disabled hidden value="">Select Team</option>
            <option v-for="name in team_name" :key="name.id">
              {{ name }}
            </option>
          </select>

          <!-- Pick student for capstone -->
          <form style="display: flex" v-on:submit.prevent="addUser">
            <select class="management-form-selector" v-model="soldier" required>
              <option disabled hidden value="">Select Student</option>
              <option v-for="student in student_list" :key="student.id">
                {{ student }}
              </option>
            </select>

            <button class="management-form-btn" >Add</button>
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
      <!-- If not authorized, show unauthorized component. -->
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
  name: 'ModifyTeamPage',
  components: {
    DefaultLayout,
    AccessDenied
  },
  data() {
    return {
      selected: '',
      selected_team: '',
      soldier: '',
      groupMember: [],
      loading: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    }
  },
  head() {
        return{
            title: "BU | Modify Team"
        }
    },
  /*
   * Calls the mixin file to check for authentication.
   */
  mixins: [authMixin],
  created: function(){
    console.log("Checking for authentication...")
  },

  computed: {
    project_name() {
      return this.$store.getters['modify_team/list']
    },
    team_name() {
      return this.$store.getters['modify_team/team_list']
    },
    student_list() {
      return this.$store.getters['modify_team/student_list']
    }
  },
  methods: {
    // Submit button count down function
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    showAlert() {
    // Submit button count down function
      this.dismissCountDown = this.dismissSecs
    },

    // Add user to the list
    addUser() {
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

    // Remove using from the list
    removeTeamMember:function(memberName) {
      for(var i = this.groupMember.length; i--;) {
        if ( this.groupMember[i].memberName === memberName) {
          this.groupMember.splice(i, 1);
        }
      }
    },

    // Updating data from strapi when grabing team for specific capstone
    async updateTeam() {
      this.$store.commit('modify_team/emptyTeam')
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
            this.$store.commit('modify_team/addTeam', project.teams[each].name)
          }
        }
      })
    },
    async updateUser() {
      this.groupMember = []
      this.$store.commit('modify_team/emptyStudent')
      const response = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            projects {
              _id
              ProjectName
              teams {
                _id
                name
                users {
                  _id
                  username
                  PermissionLevel
                }
              }
            }
          }
          `
        }
      })

      response.data.projects.forEach(project => {     
        if(project.ProjectName === this.selected) {
          for(var team in project.teams) {
            if(project.teams[team].name === this.selected_team) {
              for(var each in project.teams[team].users) {
                if(project.teams[team].users[each].PermissionLevel === 3) {
                  this.groupMember.push({
                    memberName: project.teams[team].users[each].username
                  })
                }
              }
            } else {
              continue
            }
          }
        }
      })

      const findAllProfessor = await strapi.request('post', '/graphql', {
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
      findAllProfessor.data.users.forEach(user => {
        if(user.PermissionLevel === 3) {
          this.$store.commit('modify_team/addStudent', user.username)
        }
      })
      
    },

    // Submit button funtion
    async handleSubmit() {
      this.loading = true

      try {
        var convertTeamMember = []
        var projectId = ''

        const matchProjectName = await strapi.request('post', '/graphql', {
          data: {
            query: `query {
              teams {
                _id
                name
                users {
                  _id
                  username
                  PermissionLevel
                }
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

        matchProjectName.data.teams.forEach(team => {     
          if(team.name === this.selected_team) {
            for(var each in team.users) {
              if(team.users[each].PermissionLevel !== 3) {
                convertTeamMember.push(team.users[each]._id)
              }
            }
          }
        })

        const addStudentintoProject = await strapi.request('post', '/graphql', {
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
        addStudentintoProject.data.users.forEach(user => {     
          for(var each in this.groupMember) {
            if(this.groupMember[each].memberName === user.username) {
              convertTeamMember.push(user._id)
            }
          }
        })

        const response = await strapi.updateEntry('teams', projectId, {
          users: convertTeamMember
        })
       
        this.showAlert()

        window.setTimeout(function(){
            window.location.reload();
        }, 3000);
        //this.$router.push('/') // to the new page

      } catch (err) {
        this.loading = false
      }
    }
  },

  // Updating page with strapi data when page loads up
  async fetch({ store }) {
    store.commit('modify_team/emptyList')
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
      store.commit('modify_team/add', project.ProjectName)
    })
  }
};
</script>
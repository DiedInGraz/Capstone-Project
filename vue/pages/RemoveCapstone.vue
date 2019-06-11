<!--
  Page: RemoveCapstone.vue

  Primary Contributor: Ruining Yang
  Secondary Contributor: Justin Yu
-->

<template>
  <div id="DeleteCapstonePage">
    <div class="permissions">
      <div v-if="allowAccess === 1">
        
        <DefaultLayout></DefaultLayout>
        <form class="management-form-container" autocomplete="off" @submit.stop.prevent="handleSubmit">
          <!-- Pick capstone project -->
          <select class="management-form-selector" v-model="selected" required>
            <option disabled hidden value="">Select Capstone</option>
            <option v-for="name in project_name" :key="name.id" :value="name.id">
              {{ name.project_name }}
            </option>
          </select>

          <!-- Submit function -->
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
  name: 'DeleteCapstonePage',
  components: {
    DefaultLayout,
    AccessDenied
  },
  data() {
    return {
      selected: '',
      loading: false,
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
  head() {
        return{
            title: "BU | Remove Capstone"
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
    
    // Submit button function
    async handleSubmit() {
      this.loading = true
      
      try {
        var projectId = ''
        var blogpostAll = []
        var teamAll = []
        var commentAll = []
        const matchProjectName = await strapi.request('post', '/graphql', {
          data: {
            query: `query {
              projects {
                _id
                ProjectName
                blogposts {
                  _id
                  comments {
                    _id
                  }
                }
                teams {
                  _id
                }
              }
            }
            `
          }
        }) 
        matchProjectName.data.projects.forEach(project => {     
          if(this.selected === project._id) {
            for(var each in project.blogposts) {
              blogpostAll.push(project.blogposts[each]._id)
              for(var comment in project.blogposts[each].comments) {
                commentAll.push(project.blogposts[each].comments[comment]._id)
              }
            }
            for(var each in project.teams) {
              teamAll.push(project.teams[each]._id)
            }
          }
        })

        for(const each in blogpostAll) {
          const response = strapi.deleteEntry('blogposts', blogpostAll[each])
        }
        for(const each in commentAll) {
          const response = strapi.deleteEntry('comments', commentAll[each])
        }
        for(const each in teamAll) {
          const response = strapi.deleteEntry('teams', teamAll[each])
        }

        const response = strapi.deleteEntry('projects', this.selected)

        this.showAlert()

        window.setTimeout(function(){
            window.location.reload();
        }, 3000);

      } catch (err) {
        this.loading = false
      }
    }
  },
  computed: {
    project_name() {
      return this.$store.getters['delete_project/list']
    }
  },

  // Updating page data with strapi when page loads up
  async fetch({ store }) {
    store.commit('delete_project/emptyList')
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
      store.commit('delete_project/add', {
        id: project._id,
        project_name: project.ProjectName
      })
    })
  }
};
</script>
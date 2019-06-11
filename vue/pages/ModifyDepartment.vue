<!--
  Page: ModifyDepartment.vue

  Primary Contributor: Ruining Yang
  Secondary Contributor: Justin Yu
-->

<template>
  <div id="ModifyDepartmentPage">
    <div v-if="allowAccess === 1">

      <DefaultLayout></DefaultLayout>
      <div class="management-form-container">
        <!-- Pick a department option -->
        <select class="management-form-selector" v-model="selected">
          <option value="" disabled selected>Select Department</option>
          <option v-for="each_department in department_list" :key="each_department.id" :value="each_department.id">
            {{ each_department.DepartmentName }}
          </option>
        </select>

        <!-- Modify or Remove -->
        <div v-if="selected !== ''">
            <button v-on:click.prevent="removeDepartment" type="button" class="btn btn-danger mx-3">Remove</button>
            <button v-on:click.prevent="modify = true" type="button" class="btn btn-primary mx-3">Modify</button>
        </div>

        <div v-if="modify">
          <form autocomplete="off" @submit.stop.prevent="handleSubmit">
            <!-- Department name -->
            <div class="form-group">
              <label class="management-form-title" for="department">New Department</label>
              <b-form-input
                id="department"
                v-model="department"
                type="text"
                autofocus="true"
                placeholder="Enter Department Name"
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
  name: 'ModifyDepartmentPage',
  components: {
    DefaultLayout,
    AccessDenied
  },
  data() {
    return {
      department: '',
      selected: '',
      loading: false,
      modify: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    }
  },
  computed: {
    department_list() {
      return this.$store.getters['modify_department/list']
    }
  },
  head() {
        return{
            title: "BU | Modify Department"
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
    // Submit button countdown function 
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    
    // Submit button countdown function
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },

    // Remove department from list
    async removeDepartment() {
      try {
        this.loading = true
        const change = strapi.deleteEntry('departments', this.selected)

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
        const change = await strapi.updateEntry('departments', this.selected, {
          department_name: this.department
        })
        
        this.showAlert()

        window.setTimeout(function(){
            window.location.reload();
        }, 3000);

      } catch (err) {
        this.loading = false
        //may add details for each err.message. For example:
        // unique title name, cannot submit image, etc.
        alert(err.message || 'An error occurred.')
      }
    }
  },

  // Updating page data from strapi when page loads up 
  async fetch({ store }) {
    store.commit('modify_department/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          departments {
            _id
            department_name
          }
        }
        `
      }
    })

    response.data.departments.forEach(department => {     
      store.commit('modify_department/add', {
        id: department._id,
        DepartmentName: department.department_name
      })
    })
  }
};
</script>
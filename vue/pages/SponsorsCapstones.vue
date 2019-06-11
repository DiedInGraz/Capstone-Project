<!--
  Page: SponsorsCapstones.vue

  Primary Contributor: Ruining Yang
-->

<template>
  <section class="capstone-page-background-detail">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div id="CapstonePage">
      
      <div v-if="allowAccess === 1">
        <DefaultLayout></DefaultLayout>
        <!-- search bar based on different attributes -->
        <div class="capstone-page-center-all-things">
          <div class="capstone-page-dropdown-searchbar-margin">
            <select v-model="search_option" class="capstone-page-all-dropdown">
              <!-- if do not put disabled option, in IOS device it might have problem.
              For further details: https://vuejs.org/v2/guide/forms.html#Select -->
              <option disabled value="">Search By</option>
              <option>All</option>
              <option>Title</option>
              <option>Team member</option>
              <option>Professor</option>
            </select>  

            <div class="row">
              <div class="col-md-12">
                <div class="form-group capstone-page-searchbar">
                  <!-- add trim to avoid space from the input from the beginning or the end -->
                  <input v-model.trim="query" type="text" placeholder="Search for" class="form-control">
                </div>
              </div>
            </div>
          </div>
          <!-- sort the result based on time -->
          <div class="capstone-page-sponsors-box-and-dropdown">
            <div>
              <select class="management-form-selector" v-model="selected">
                <!-- if do not put disabled option, in IOS device it might have problem.
                For further details: https://vuejs.org/v2/guide/forms.html#Select -->
                <option disabled value="">Please choose</option>
                <option>Default</option>
                <option>Update time: Latest to Oldest</option>
                <option>Update time: Oldest to Latest</option>
              </select>
            </div>
          </div>
          
          <br>
          <!-- Section to Hide and Show Tags for selection. -->
          
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <button v-b-toggle.accordion-1 class="button btn-primary">Show Tags</button>
                <b-collapse id="accordion-1" accordion="accordion1">
                  <div v-for="name in tag_list" :key="name.id">
                    <input type="checkbox" :id=name :value=name v-model="checkTag"> {{ name }}
                  </div>
                </b-collapse>
              </div>

              <div class="col-sm">
                <button v-b-toggle.accordion-2 class="button btn-primary">Show Schools</button>
                <b-collapse id="accordion-2" accordion="accordion2">
                  <div v-for="name in school_list" :key="name.id">
                    <input type="checkbox" :id=name :value=name v-model="checkSchool"> {{ name }}
                  </div>
                </b-collapse>
              </div>

              <div class="col-sm">
                <button v-b-toggle.accordion-3 class="button btn-primary">Show Departments</button>
                <b-collapse id="accordion-3" accordion="accordion3">
                  <div v-for="name in department_list" :key="name.id">
                    <input type="checkbox" :id=name :value=name v-model="checkDepartment"> {{ name }}
                  </div>
                </b-collapse>
              </div>

            </div>
          </div>
        </div>

        <hr class="featurette-divider">
        <br>
        <!-- show the capstone details -->
        <div class="row">
          <div class="col-md-12">
            <ul class="card-columns list-unstyled">
              <li v-for="project in filteredList" :key="project._id" class="card">
                <router-link :to="{ name: 'projects-id', params: { id: project._id }}">
                <span v-bind:title="'Title: ' + project.ProjectName + '\n' + 'Description: ' + project.Description
                + '\n' + 'Sponsor: ' + project.Sponsor + '\n' + 'Last Update Time: ' + project.time">
                  <div v-for="(single_one, index) in project.Picture" :key="single_one._id">
                    <div v-if="index == 0">
                      <!-- v-bind:src="" -->
                      <img :src="single_one.url" class="card-img-top">
                    </div>
                  </div>
                </span>
                <div class="card-body bg-dark">
                  <h5 class="card-title text-light">{{ project.ProjectName }}</h5>
                </div>
                </router-link>
              </li>
              <p v-if="!filteredList.length">No results :(</p>
            </ul>
          </div>
        </div>
      </div>
      <div v-else>
        <AccessDenied></AccessDenied>
      </div>

    </div>
  </section>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Strapi from 'strapi-sdk-javascript/build/main'
import moment from 'moment'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
const apiUrl = ('http://' + process.env.VUE_APP_API_URL + ':1337') || 'http://localhost:1337' 
const strapi = new Strapi(apiUrl)

// Import mixin file for authentication checking
import sponsorMixin from '@/mixins/allUsers.js'
import AccessDenied from '@/pages/AccessDenied.vue'

export default {
  
  name: 'CapstonePage',
    components: {
      DefaultLayout,
      AccessDenied
  },
  data() {
    return {
      query: '',
      selected: 'Default',
      search_option: 'All',
      checkTag: [],
      checkSchool: [],
      checkDepartment: []
    }
  },

  /*
   * Calls the  mixin file to check for authentication.
   */
  mixins: [sponsorMixin],
  created: function(){
    console.log("Checking for authentication...")
  },
  head() {
    return{
      title: "BU | Your Capstones"
    }
  },

  computed: {
    filterByButton() {
      return this.filterByQuery.filter(project => {
        var check = false
        return this.checkTag.every(elem => project.tag_list.indexOf(elem) > -1) && 
                this.checkSchool.every(elem => project.school_list.indexOf(elem) > -1) && 
                  this.checkDepartment.every(elem => project.department_list.indexOf(elem) > -1)
      })
    },
    filterByQuery() {
      return this.projects.filter(project => {
        var checkInProject = false
        for(var each in this.project_sponsor_list) {
          if(this.project_sponsor_list[each] === project.ProjectName) {
            checkInProject = true
          }
        }

        if(checkInProject) {
          // convert to readable time format, need to npm install moment
          time: project.time = moment(project.updatedAt).format('MMMM Do YYYY')

          // search by title
          if(this.search_option === 'All') {
            var check = false
            check = project.ProjectName.toLowerCase().includes(this.query.toLowerCase())
            for(var each in project.teams) {
              for(var each_memeber in project.teams[each].users) {
                if(project.teams[each].users[each_memeber].PermissionLevel === 3 && project.teams[each].users[each_memeber].username.toLowerCase().includes(this.query.toLowerCase())) {
                  check = true
                }
              }
            }
            for(var each in project.users) {
              if(project.users[each].PermissionLevel === 2 && project.users[each].username.toLowerCase().includes(this.query.toLowerCase())) {
                check = true
              }
            }
            return check
          }

          // search by title
          if(this.search_option === 'Title') {
            return project.ProjectName.toLowerCase().includes(this.query.toLowerCase())
          }
          
          // search by team member
          if(this.search_option === 'Team member') {
            for(var each in project.teams) {
              for(var each_memeber in project.teams[each].users) {
                if(project.teams[each].users[each_memeber].PermissionLevel === 3 && project.teams[each].users[each_memeber].username.toLowerCase().includes(this.query.toLowerCase())) {
                  return true
                }
              }
            }
            return false
          }

          // search by professor
          if(this.search_option === 'Professor') {
            for(var each in project.users) {
              if(project.users[each].PermissionLevel === 2 && project.users[each].username.toLowerCase().includes(this.query.toLowerCase())) {
                return true
              }
            }
            return false
          }
        }
        
      })
    },
    filteredList() {
      // using the default search
      if(this.selected === 'Default') {
        return this.filterByButton.sort(function(a, b) {
          if (new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime())
            return -1;
          if (new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime())
            return 1;
          return 0;
        })
      }
      // sort based on the oldest update time
      if(this.selected === 'Update time: Oldest to Latest') {
        return this.filterByButton.sort(function(a, b) {
          if (new Date(a.updatedAt).getTime() < new Date(b.updatedAt).getTime())
            return -1;
          if (new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime())
            return 1;
          return 0;
        })
      }
      // sort based on the latest update time
      if(this.selected === 'Update time: Latest to Oldest') {
        return this.filterByButton.sort(function(a, b) {
          if (new Date(a.updatedAt).getTime() < new Date(b.updatedAt).getTime())
            return 1;
          if (new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime())
            return -1;
          return 0;
        })
      }
      
    },
    projects() {
      return this.$store.getters['sponsors_project/list']
    },
    tag_list() {
      return this.$store.getters['sponsors_project/tagList']
    },
    school_list() {
      return this.$store.getters['sponsors_project/schoolList']
    },
    department_list() {
      return this.$store.getters['sponsors_project/departmentList']
    },
    project_sponsor_list() {
      return this.$store.getters['sponsors_project/getProjectList']
    }
  },
  async fetch({ store }) {
    store.commit('sponsors_project/emptyList')

    var trans = JSON.stringify(jwtDecode(Cookies.get('jwtAuth')))
    var user_email = JSON.parse(trans).name
    var checkNotStudent = true
    const getProject = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          users {
            email
            PermissionLevel
            project {
              ProjectName
            }
          }
        }
        `
      }
    })

    getProject.data.users.forEach(user => {
      if(user.email === user_email) {
        if(user.PermissionLevel == 2 || user.PermissionLevel == 4) {
          checkNotStudent = false
          for(var each in user.project) {
            store.commit('sponsors_project/addProject', user.project[each].ProjectName)
          }
        }
      }
    })

    if(checkNotStudent) {
      const getProject = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            users {
              email
              Name
              teams {
                project {
                  ProjectName
                }
              }
            }
          }
          `
        }
      })

      getProject.data.users.forEach(user => {
        if(user.email === user_email) {
          console.log("fsfdfds")
          for(var team in user.teams) {
            store.commit('sponsors_project/addProject', user.teams[team].project.ProjectName)
          }
        }
      })
    }

    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          projects {
            _id
            ProjectName
            Description
            LastUpdated
            createdAt
            updatedAt
            Picture {
              _id
              url
            }
            teams {
              _id
              users {
                _id
                username
                PermissionLevel
              }
            }
            users {
              _id
              username
              PermissionLevel
            }
            tags {
              _id
              tag_name
            }
            schools {
              _id
              school_name
            }
            departments {
              _id
              department_name
            }
          }
        }
        `
      }
    })

    response.data.projects.forEach(project => {
      var store_sponsor = []
      var store_tag = []
      var store_school = []
      var store_department = []
      for(var single_one in project.Picture) {
        project.Picture[single_one].url = `${apiUrl}${project.Picture[single_one].url}`
      }
      for(var each in project.users) {
        if(project.users[each].PermissionLevel === 4) {
          store_sponsor.push(project.users[each].username)
        }
      }
      if(store_sponsor.length === 0) {
        store_sponsor.push('No sponsors yet')
      }
      for(var each in project.tags) {
        store_tag.push(project.tags[each].tag_name)
      }
      for(var each in project.schools) {
        store_school.push(project.schools[each].school_name)
      }
      for(var each in project.departments) {
        store_department.push(project.departments[each].department_name)
      }
      store.commit('sponsors_project/add', {
        id: project.id,
        Sponsor: store_sponsor.toString(),
        tag_list: store_tag,
        school_list: store_school,
        department_list: store_department,
        ...project
      })
    })

    const getTag = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          tags {
            _id
            tag_name
          }
        }
        `
      }
    })

    getTag.data.tags.forEach(tag => {
      store.commit('sponsors_project/addTag', tag.tag_name)
    })

    const getSchool = await strapi.request('post', '/graphql', {
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

    getSchool.data.schools.forEach(school => {
      store.commit('sponsors_project/addSchool', school.school_name)
    })

    const getDepartment = await strapi.request('post', '/graphql', {
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

    getDepartment.data.departments.forEach(department => {
      store.commit('sponsors_project/addDepartment', department.department_name)
    })

    store.commit('sponsors_project/sortUser')
    
  }
}
</script>


<!--
  Page: ModifyCapstone.vue

  Primary Contributor: Ruining Yang
  Secondary Contributor: Justin Yu
-->

<template>
  <div id="ModifyProjectPage">
    <div class="permissions">
      <div v-if="allowAccess === 1">

        <DefaultLayout></DefaultLayout>

        <form class="management-form-container" autocomplete="off" @submit.stop.prevent="handleSubmit">
          <!-- Pick capstone project -->
          <select class="management-form-selector" v-model="selected" v-on:change="updateProfessor" required>
            <option disabled hidden value="">Select Capstone</option>
            <option v-for="name in project_name" :key="name.id" :value="name.id">
              {{ name.project_name }}
            </option>
          </select>
          <!-- Pick school -->
          <select class="management-form-selector" v-model="CollegeOf">
            <option hidden disabled value="">Select School</option>
            <option  v-for="name in school_list" :key="name.id" :value="name.id">
              {{ name.SchoolName }}
            </option>
          </select>
          <!-- Pick department -->
          <select class="management-form-selector" v-model="Department">
            <option hidden disabled value="">Select Department</option>
            <option class="management-form-selector-option" v-for="name in department_list" :key="name.id" :value="name.id">
              {{ name.DepartmentName }}
            </option>
          </select>   
          <!-- Pick professor -->
          <form style="display: flex" v-on:submit.prevent="addProfessor">
            <select class="management-form-selector" v-model="soldier" required>
              <option disabled hidden value="">Select Professor</option>
              <option v-for="professor in professor_list" :key="professor.id">
                {{ professor }}
              </option>
            </select>

            <button class="management-form-btn">Add</button>
          </form>

          <li v-for="name in groupMember" :key="name.id">
            {{ name.memberName }}
            <button class="management-form-remove-tag-btn" v-on:click.prevent="removeTeamMember(name.memberName)">x</button>
          </li>
          <!-- Pick sponsor -->
          <form style="display: flex" v-on:submit.prevent="addSponsor">
            <select class="management-form-selector"  v-model="get_sponsor" required>
              <option disabled hidden value="">Select Sponsor</option>
              <option v-for="sponsor in sponsor_list" :key="sponsor.id">
                {{ sponsor }}
              </option>
            </select>

            <button class="management-form-btn">Add</button>
          </form>

          <li v-for="name in sponsorList" :key="name.id">
            {{ name.memberName }}
            <button class="management-form-remove-tag-btn" v-on:click.prevent="removeSponsor(name.memberName)">x</button>
          </li>
          <!-- Pick tag -->
          <form style="display: flex" v-on:submit.prevent="addTag">
            <select class="management-form-selector" v-model="eachTag" required>
              <option disabled hidden value="">Select Tag</option>
              <option v-for="name in tag_list" :key="name.id">
                {{ name }}
              </option>
            </select>

            <button class="management-form-btn">Add</button>
          </form>
          
          <li v-for="name in groupTag" :key="name.id">
            {{ name.memberName }}
            <button class="management-form-remove-tag-btn" v-on:click.prevent="removeTag(name.memberName)">x</button>
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
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

// Import mixin file for authentication checking
import authMixin from '@/mixins/professor_permissions.js'
import AccessDenied from '@/pages/AccessDenied.vue'

export default {
  name: 'ModifyProjectPage',
  components: {
    DefaultLayout,
    AccessDenied
  },
  data() {
    return {
      selected: '',
      Department: '',
      CollegeOf: '',
      soldier: '',
      get_sponsor: '',
      groupMember: [],
      sponsorList: [],
      loading: false,
      eachTag: '',
      groupTag: [],
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    }
  },
  head() {
        return{
            title: "BU | Modify Capstone"
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
    // Getting data from store js files
    project_name() {
      return this.$store.getters['modify_project/list']
    },
    professor_list() {
      return this.$store.getters['modify_project/professor_list']
    },
    sponsor_list() {
      return this.$store.getters['modify_project/sponsor_list']
    },
    tag_list() {
      return this.$store.getters['modify_project/tagList']
    },
    school_list() {
      return this.$store.getters['modify_project/schoolList']
    },
    department_list() {
      return this.$store.getters['modify_project/departmentList']
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

    // Adding professor to list
    addProfessor() {
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

    // Removing professor to list
    removeTeamMember:function(memberName) {
      for(var i = this.groupMember.length; i--;) {
        if ( this.groupMember[i].memberName === memberName) {
          this.groupMember.splice(i, 1);
        }
      }
    },

    // Adding sponsor to list
    addSponsor() {
      var add_sponsor = true
      for(var i = this.sponsorList.length; i--;) {
        if(this.sponsorList[i].memberName === this.get_sponsor) {
          add_sponsor = false
        }
      }
      if(this.get_sponsor === '') {
        add_sponsor = false
      }
      if(add_sponsor) {
        this.sponsorList.push({
          memberName: this.get_sponsor
        })
      }
      this.get_sponsor = ''
    },

    // Removing sponsor to list
    removeSponsor:function(memberName) {
      for(var i = this.sponsorList.length; i--;) {
        if (this.sponsorList[i].memberName === memberName) {
          this.sponsorList.splice(i, 1);
        }
      }
    },

    // Adding tag to list
    addTag() {
      var add_tag = true
      for(var i = this.groupTag.length; i--;) {
        if(this.groupTag[i].memberName === this.eachTag) {
          add_tag = false
        }
      }
      if(this.eachTag === '') {
        add_tag = false
      }
      if(add_tag) {
        this.groupTag.push({
          memberName: this.eachTag
        })
      }
      this.eachTag = ''
    },
    
    // Removing sponsor to list
    removeTag:function(memberName) {
      for(var i = this.groupTag.length; i--;) {
        if ( this.groupTag[i].memberName === memberName) {
          this.groupTag.splice(i, 1);
        }
      }
    },

    // Updating page with strapi data when page loads up
    async updateProfessor() {
      this.groupMember = []
      this.groupTag = []
      this.sponsorList = []
      this.CollegeOf = ''
      this.Department = '',
      this.$store.commit('modify_project/emptyProfessor')
      this.$store.commit('modify_project/emptySponsor')
      this.$store.commit('modify_project/emptyTag')
      this.$store.commit('modify_project/emptySchool')
      this.$store.commit('modify_project/emptyDepartment')

      const response = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            projects {
              _id
              ProjectName
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
        if(project._id === this.selected) {
          for(var each in project.users) {
            if(project.users[each].PermissionLevel === 2) {
              this.groupMember.push({
                memberName: project.users[each].username
              })
            }
            if(project.users[each].PermissionLevel === 4) {
              this.sponsorList.push({
                memberName: project.users[each].username
              })
            }
          }
          
          for(var each in project.tags) {
            this.groupTag.push({
              memberName: project.tags[each].tag_name
            })
          }

          this.CollegeOf = project.schools._id
          this.Department = project.departments._id
        }
      })

      const findAllProfessor_Sponsor = await strapi.request('post', '/graphql', {
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
      findAllProfessor_Sponsor.data.users.forEach(user => {
        if(user.PermissionLevel === 2) {
          this.$store.commit('modify_project/addProfessor', user.username)
        }
        if(user.PermissionLevel === 4) {
          this.$store.commit('modify_project/addSponsor', user.username)
        }
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
        this.$store.commit('modify_project/addTag', tag.tag_name)
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
        this.$store.commit('modify_project/addSchool', {
          id: school._id,
          SchoolName: school.school_name
        })
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
        this.$store.commit('modify_project/addDepartment', {
          id: department._id,
          DepartmentName: department.department_name
        })
      })

      this.$store.commit('modify_project/sortList')
    },

    // Submit button function
    async handleSubmit() {
      this.loading = true
      
      try {
        var convertTeamMember = []
        var convertTag = []

        // convert team member to user Id
        const matchProjectName = await strapi.request('post', '/graphql', {
          data: {
            query: `query {
              projects {
                _id
                ProjectName
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

        // add professor in the list
        const addProfSponsorintoProject = await strapi.request('post', '/graphql', {
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
        addProfSponsorintoProject.data.users.forEach(user => {     
          for(var each in this.groupMember) {
            if(this.groupMember[each].memberName === user.username) {
              convertTeamMember.push(user._id)
              break
            }
          }
          for(var each in this.sponsorList) {
            if(this.sponsorList[each].memberName === user.username) {
              convertTeamMember.push(user._id)
              break
            }
          }
        })

        // convert tag to tag Id
        const matchTag = await strapi.request('post', '/graphql', {
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
        matchTag.data.tags.forEach(tag => {     
          for(var each in this.groupTag) {
            if(this.groupTag[each].memberName === tag.tag_name) {
              convertTag.push(tag._id)
              break
            }
          }
        })

        const response = await strapi.updateEntry('projects', this.selected, {
          users: convertTeamMember,
          tags: convertTag,
          schools: this.CollegeOf,
          departments: this.Department
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

  // Updating page data from strapi when web page loads up
  async fetch({ store }) {
    store.commit('modify_project/emptyList')
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
      store.commit('modify_project/add', {
        id: project._id,
        project_name: project.ProjectName
      })
    })

    store.commit('modify_project/sortList')
  }
};
</script>

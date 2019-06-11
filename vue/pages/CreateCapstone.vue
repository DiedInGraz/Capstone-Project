<!--
  Page: CreateDepartment.vue

  Primary Contributor: Ruining Yang
  Secondary Contributor: Justin Yu
-->

<template>
  <div id="CreateCapstone">
    <div class="create-capstone-permissions">
      <div v-if="allowAccess === 1">

        <DefaultLayout></DefaultLayout>
        <!-- @submit equals to v-on:submit -->
        <!-- Input form for capstone name -->
        <form class="management-form-container" autocomplete="off" @submit.stop.prevent="handleSubmit">
          <div class="form-group">
            <label class="management-form-title" for="ProjectName">Capstone Name</label>
            <b-form-input
              id="ProjectName"
              v-model="ProjectName"
              type="text"
              autofocus="true"
              placeholder="Enter Capstone Title"
              required/>
          </div>
          <!-- Input form for capstone description -->
          <div class="form-group">
            <label class="management-form-title" for="Description">Description</label>
            <b-form-input
              id="Description"
              v-model="Description"
              type="text"
              autofocus="true"
              placeholder="Enter Capstone Description"
              required/>
          </div>
          
          <!-- Select form for school -->
          <select class="management-form-selector" v-model="CollegeOf">
            <option hidden disabled value="">Select School</option>
            <option  v-for="name in school_list" :key="name.id" :value="name.id">
              {{ name.SchoolName }}
            </option>
          </select>

          <!-- Select form for Department -->
          <select class="management-form-selector" v-model="Department">
            <option hidden disabled value="">Select Department</option>
            <option class="management-form-selector-option" v-for="name in department_list" :key="name.id" :value="name.id">
              {{ name.DepartmentName }}
            </option>
          </select>

          <!-- Select form for professor -->
          <form style="display: flex" v-on:submit.prevent="addTeamMember">
            <select class="management-form-selector" v-model="soldier">
              <option hidden disabled value="">Select Professor</option>
              <option class="management-form-selector-option" v-for="name in professor_list" :key="name.id">
                {{ name }}
              </option>
            </select>
            
            <!-- Button to add the professor -->
            <button class="management-form-btn" >Add</button>
          </form>
          
          <!-- Button to remove the professor -->
          <li v-for="name in groupMember" :key="name.id">
            {{ name.memberName }}
            <button class="management-form-remove-tag-btn" v-on:click.prevent="removeTeamMember(name.memberName)">x</button>
          </li>

          <!-- Select form for sponsor -->
          <form style="display: flex" v-on:submit.prevent="addSponsor">
            <select class="management-form-selector" v-model="soldier2">
              <option hidden disabled value="">Select Sponsor</option>
              <option class="management-form-selector-option" v-for="name in sponsor_list" :key="name.id">
                {{ name }}
              </option>
            </select>

            <!-- Button to remove the sponsor -->
            <button class="management-form-btn" >Add</button>
          </form>
          
          <!-- Button to remove the sponsor -->
          <li v-for="name in sponsorList" :key="name.id">
            {{ name.memberName }}
            <button class="management-form-remove-tag-btn" v-on:click.prevent="removeSponsor(name.memberName)">x</button>
          </li>

          <!-- Select form for tag -->
          <form style="display: flex" v-on:submit.prevent="addTag">
            <select class="management-form-selector" v-model="eachTag">
              <option hidden disabled value="">Select Tag</option>
              <option class="management-form-selector-option" v-for="name in tag_list" :key="name.id">
                {{ name }}
              </option>
            </select>

            <!-- Button to remove the tag -->
            <button class="management-form-btn">Add</button>
          </form>
          
          <!-- Button to remove the tag -->
          <li v-for="name in groupTag" :key="name.id">
            {{ name.memberName }}
            <button class="management-form-remove-tag-btn" v-on:click.prevent="removeTag(name.memberName)">x</button>
          </li>

          <!-- Upload option for capstone picture -->
          <div class="form-group">
            <input class="management-form-btn" type="file" accept="image/jpeg, image/jpg" @change="onFileSelected" required/>
          </div>

          <b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
            <p>Success! Closing after {{ dismissCountDown }} seconds...</p>
          </b-alert>
          
          <!-- Final submit button for the page-->
          <b-button :disabled="clicked" type="submit" variant="info" class="m-1">
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
import moment from 'moment'
const apiUrl = ('http://' + process.env.VUE_APP_API_URL + ':1337') || 'http://localhost:1337' 
const strapi = new Strapi(apiUrl)

// Import mixin file for authentication checking
import authMixin from '@/mixins/professor_permissions.js'
import AccessDenied from '@/pages/AccessDenied.vue'

export default {
  name: 'CreateCapstone',
  components: {
      DefaultLayout,
      AccessDenied
  },
  head() {
        return{
            title: "BU | Create Capstone"
        }
    }, 
  data() {
    return {
      ProjectName: '',
      Department: '',
      CollegeOf: '',
      Description: '',
      clicked: false,
      selectedFile: null,
      soldier: '',
      soldier2: '',
      groupMember: [],
      eachTag: '',
      groupTag: [],
      sponsorList: [],
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
    //Getting data from .js files in store
    professor_list() {
      return this.$store.getters['create_project/list']
    },
    sponsor_list() {
      return this.$store.getters['create_project/sponsor_list']
    },
    tag_list() {
      return this.$store.getters['create_project/tagList']
    },
    school_list() {
      return this.$store.getters['create_project/schoolList']
    },
    department_list() {
      return this.$store.getters['create_project/departmentList']
    }
  },

  methods: {
    // Used in success button
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
    },

    // Used in success button
    showAlert() {
        this.dismissCountDown = this.dismissSecs
    },

    // Function used when adding team members
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
    // Function used when revmoving team members
    removeTeamMember:function(memberName) {
      for(var i = this.groupMember.length; i--;) {
        if ( this.groupMember[i].memberName === memberName) {
          this.groupMember.splice(i, 1);
        }
      }
    },

    // Function used when adding sponsors
    addSponsor() {
      var addSoldier = true
      for(var i = this.sponsorList.length; i--;) {
        if(this.sponsorList[i].memberName === this.soldier2) {
          addSoldier = false
        }
      }
      if(this.soldier2 === '') {
        addSoldier = false
      }
      if(addSoldier) {
        this.sponsorList.push({
          memberName: this.soldier2
        })
      }
      this.soldier2 = ''
    },

    // Function used when removing sponsors
    removeSponsor:function(memberName) {
      for(var i = this.sponsorList.length; i--;) {
        if ( this.sponsorList[i].memberName === memberName) {
          this.sponsorList.splice(i, 1);
        }
      }
    },

    // Function used when adding tags
    addTag() {
      var addSoldier = true
      for(var i = this.groupTag.length; i--;) {
        if(this.groupTag[i].memberName === this.eachTag) {
          addSoldier = false
        }
      }
      if(this.eachTag === '') {
        addSoldier = false
      }
      if(addSoldier) {
        this.groupTag.push({
          memberName: this.eachTag
        })
      }
      this.eachTag = ''
    },

    // Function used when revmoing sponsors
    removeTag:function(memberName) {
      for(var i = this.groupTag.length; i--;) {
        if ( this.groupTag[i].memberName === memberName) {
          this.groupTag.splice(i, 1);
        }
      }
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    },

    // Function called when submit button clicked
    async handleSubmit() {
      this.clicked = true
      try {
        var convertTeamMember = []
        var convertTag = []
        var convertSchool  = []
        var convertDepartment = []

        convertSchool.push(this.CollegeOf)
        convertDepartment.push(this.Department)
        // convert team member to user Id
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

        const response = await strapi.createEntry('projects', {
          ProjectName: this.ProjectName,
          Description: this.Description,
          users: convertTeamMember,
          tags: convertTag,
          schools: this.CollegeOf,
          departments: this.Department,
          photo: this.selectedFile
        })

        const form = new FormData()
        form.append('files', this.selectedFile, this.selectedFile.name)

        const files = await strapi.upload(form)
        
        const addPhoto = await strapi.updateEntry('projects', response.id, {
          Picture: files,
          LastUpdated: moment().format()
        })
        
        this.showAlert()

        window.setTimeout(function(){
            window.location.reload();
        }, 3000);
      } catch (err) {
        this.clicked = false
        //may add details for each err.message. For example:
        // unique title name, cannot submit image, etc.
        if("An internal server error occurred" === err.message) {
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
            if(this.ProjectName === project.ProjectName) {
              alert("Project already exists")
            }
          })
        } else {
          alert(err.message || 'An error occurred.')
        }
      }
    }
  },

  // Getting data from strapi when page is loaded
  async fetch({ store }) {
    store.commit('create_project/emptyList')
    const getProfessor = await strapi.request('post', '/graphql', {
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
    
    getProfessor.data.users.forEach(user => {
      if(user.PermissionLevel === 2) { 
        store.commit('create_project/add', user.username)
      }
      if(user.PermissionLevel === 4) {
        store.commit('create_project/addSponsor', user.username)
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
      store.commit('create_project/addTag', tag.tag_name)
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
      store.commit('create_project/addSchool', {
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
      store.commit('create_project/addDepartment', {
        id: department._id,
        DepartmentName: department.department_name
      })
    })

    store.commit('create_project/sortUser')
  }
}
</script>

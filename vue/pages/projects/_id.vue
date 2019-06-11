<!--
Created By: Ruining Yang
Edited By: Tim Lee (Permissions and Additional HTML)

This page displays informatin for a specific project. 
All information related to a capstone is displayed, including title, image, 
description, sponsors, team members, and newsfeed.
Additionally, updates to the project can be posted on the newsfeed through a form.
-->

<template>
  <div class="capstone-id-detail">
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    </head>
    <DefaultLayout></DefaultLayout>

    <main role="main">
      <!-- Carousel that displays the project image -->
      <div id="capstone-id-carousel" class="carousel slide capstone-id-carousel" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active capstone-id-carousel-item">
            <img class="first-slide d-block w-100" :src=picture alt="First slide">
            <div class="container">
              <div class="carousel-caption text-left capstone-id-caption">
                <h1 class="capstone-id-title">{{ title }}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wraps the rest of the page in another container to center all the content. -->
      <div class="container marketing capstone-id-marketing">

        <!-- Displays Sponsors and Professor -->
        <div class="row">
          <div class="col" align="center">
            <h2 class="capstone-id-title-marketing">Sponsor(s)</h2>
            <h3 class="marketing-text">{{ sponsor }}</h3>
            <button 
              id="details-sponsor" 
              type="button" 
              class="btn btn-primary"
              onclick="location.href = '/Sponsors';"> 
              More details >>
            </button>
          </div>

          <div class="col" align="center">
            <h2 class="capstone-id-title-marketing">Professor</h2>
            <h3 class="marketing-text">{{ professor }}</h3>
          </div>
        </div>


        <!-- START THE FEATURETTES -->
        <hr class="featurette-divider capstone-id-featurette-divider">

        <!-- Displays Description about the project -->
        <div class="row featurette">
          <div class="col-md-7 capstone-id-featurette-margin1">
            <h2 class="featurette-heading capstone-id-featurette-heading">About <span class="text-muted">{{ title }}</span></h2>
            <h2 class="capstone-id-about-sub">
              College of {{ college_of }}<br> 
              Department of {{ department }}<br>
            </h2>
            <p class="lead">{{ description }}</p>

            <button v-b-toggle.accordion-1 class="button btn-dark">Show tags</button>
            <b-collapse id="accordion-1" accordion="accordion1">
              <span class="badge badge-light capstone-id-tag-text text-secondary">
                Tags: {{ tag }}
              </span>
            </b-collapse>

          </div>
          <div class="col-md-5">
            <img class="featurette-image img-fluid mx-auto" :src=picture alt="Empty image">
          </div>
        </div>

        <hr class="featurette-divider capstone-id-featurette-divider">

        <!-- Displays team members for the project -->
        <div class="row featurette">
          <div class="col-md-5 order-md-2">
            <div class="capstone-id-team-text">
              <h2 class="featurette-heading capstone-id-featurette-heading">Team Member(s) <span class="text-muted"></span></h2>
              <div class="capstone-id-team-members-text">
                <li>{{ team_member }}</li>
              </div>
            </div>
          </div>
          <div class="col-md-7 order-md-1">
            <img class="featurette-image img-fluid mx-auto" src="@/assets/teamwork.jpg" alt="Generic placeholder image">
          </div>
        </div>

        <hr class="featurette-divider capstone-id-featurette-divider">

        <!-- Displays all newsfeeds for specific project -->
        <div class="row featurette">
          <div class="capstone-id-blogpost-left-col col-md-7">
            <div>
              <h2 class="featurette-heading capstone-id-featurette-heading">Newsfeed <span class="text-muted"></span></h2>
              <br>
              <ul class="list-unstyled">
              <div v-for="page in filteredList" :key="page._id">
                <h2><u>{{ page.Title }}</u></h2>
                <h4 class="capstone-id-blogpost-description"> --> {{ page.Description }} </h4>
                <div v-for="single_one in page.Picture" :key="single_one._id">
                  <img :src="single_one.url" class="card-img-top capstone-id-blog-image">
                  <br><br>
                </div>
                <h5 class="capstone-id-blogpost-user"> User: {{ page.username }} </h5>
                <footer class="blockquote-footer"> {{ page.time }} </footer>
                <router-link :to="{ name: 'blogposts-id', params: { id: page._id }}">
                  <h5>More Details >></h5>
                </router-link>
                <div v-if="checkUser(page.email)">
                  <button v-bind:disabled="loading" type="submit" @click.prevent="removeBlogpost(page._id)">Remove</button>
                </div>
                <br><br><br>
              </div>
              </ul>
            </div>
          </div>
          <div class="col-md-5 capstone-id-blog-section">
            <!-- If the user is permitted, can post a newsfeed -->
            <div v-if="allowAccess===1">
              <!-- Section displaying a form to create a blogPost. -->
              <h3 class="capstone-id-enter-blogpost-heading">Post an Update</h3>
              <form autocomplete="off" @submit.stop.prevent="handleSubmit">
              <div class="form-group">
                <label for="Title" class="capstone-id-blogpost-form-label">Title</label>
                <b-form-input
                id="Title"
                v-model="Title"
                type="text"
                autofocus="true"
                placeholder="Enter your Title"
                required/>
              </div>
              <div class="form-group">
                <label for="Description" class="capstone-id-blogpost-form-label">Description</label>
                <br>
                <textarea rows="4" cols="46"
                id="Description"
                v-model="Description"
                type="text"
                autofocus="true"
                placeholder="Enter your Description"
                required/>
              </div>
              <div class="form-group">
                <input type="file" @change="onFileSelected">
              </div>
              <button v-bind:disabled="loading" type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
              </form>
            </div>

            <!-- If user not permitted, the form does not appear on page -->
            <div v-else>
              <!-- Don't show the form. -->
            </div>
          </div>
        </div>
        <hr class="featurette-divider capstone-id-featurette-divider">
        <!-- /END THE FEATURETTES -->
      </div>
    </main>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

  </div>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Strapi from 'strapi-sdk-javascript/build/main'
import moment from 'moment'
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode'
const apiUrl = ('http://' + process.env.VUE_APP_API_URL + ':1337') || 'http://localhost:1337' 
const strapi = new Strapi(apiUrl)

import authMixin from '@/mixins/allUsers.js'

export default {
  name: 'Capstone_detail',
  components: {
    DefaultLayout
  },
  data(){
    return{
      Title: '',
      Description: '',
      loading: false,
      selectedFile: null,
    }
  },
  head() {
        return{
            title: "BU | Project"
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
    id() {
      return this.$route.params.id
    },
    title() {
      return this.$store.getters['capstones_eachpage/getTitle']
    },
    description() {
      return this.$store.getters['capstones_eachpage/getDescription']
    },
    team_member(){
      return this.$store.getters['capstones_eachpage/getTeamMember']
    },
    professor(){
      return this.$store.getters['capstones_eachpage/getProfessor']
    },
    sponsor(){
      return this.$store.getters['capstones_eachpage/getSponsor']
    },
    tag(){
      return this.$store.getters['capstones_eachpage/getTag']
    },
    department(){
      return this.$store.getters['capstones_eachpage/getDepartment']
    },
    college_of(){
      return this.$store.getters['capstones_eachpage/getCollegeOf']
    },
    picture(){
      return this.$store.getters['capstones_eachpage/getPicture']
    },

    filteredList() {
      return this.capstones_eachpage.filter(page => {
        // convert to readable time format, need to npm install moment
        time: page.time = moment(page.LastPublished).format('MMMM Do YYYY')
        return page
      }).sort(function(a, b) {
        if (new Date(a.LastPublished).getTime() < new Date(b.LastPublished).getTime())
          return 1;
        if (new Date(a.LastPublished).getTime() > new Date(b.LastPublished).getTime())
          return -1;
      return 0;
      })
    },
    capstones_eachpage() {      
      return this.$store.getters['capstones_eachpage/list']
    }
  },
  methods: {
    //check whether user has permission to delete the comment
    checkUser(store_email) {
      if(Cookies.get('jwtAuth') == null) {
        return false
      }
      var trans = JSON.stringify(jwtDecode(Cookies.get('jwtAuth')))
      var user_email = JSON.parse(trans).name
      
      if(store_email == user_email) {
        return true
      } else {
        return false
      }
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    },
    async removeBlogpost(blogpostId) {
      this.loading = true
      try {
        const deleteBlogpost = strapi.deleteEntry('blogposts', blogpostId)
        this.loading = false
        this.$router.go(this.$route.params.id) // to the new page
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred when handling submit.')
      }
    },
    async handleSubmit(params) {
      this.loading = true
      try {
        var trans = JSON.stringify(jwtDecode(Cookies.get('jwtAuth')))
        var user_email = JSON.parse(trans).name
        // check whether user is login
        if(user_email == null) {
          window.location.replace("/Authentication/Login")
        } else {
          var user_id = ''
          const findUserId = await strapi.request('post', '/graphql', {
            data: {
              query: `query {
                users {
                  _id
                  email
                }
              }
              `
            }
          })
          for(var one in findUserId.data.users) {
            if(findUserId.data.users[one].email === user_email) {
              user_id = findUserId.data.users[one]._id
            }
          }

          const response = await strapi.createEntry('blogposts', {
            Title: this.Title,
            Description: this.Description,
            photo: this.selectedFile,
            project: this.$route.params.id,
            user: user_id
          })
          if(this.selectedFile === null) {
            const noPhotoparams = await strapi.updateEntry('blogposts', response.id, {
              LastPublished: moment().format()
            })
          } else {
            const form = new FormData()
            form.append('files', this.selectedFile, this.selectedFile.name)
            // Strapi official document parameter
            //form.append('ref', 'capstone') form.append('refId', response.id) form.append('filed', 'photo')
            const files = await strapi.upload(form)
            const addPhotoparams = await strapi.updateEntry('blogposts', response.id, {
              Picture: files,
              LastPublished: moment().format()
            })
          }
          this.loading = false
          
          this.$router.go(this.$route.params.id) // to the new page
        }
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred when handling submit.')
      }
    }
  },

  async fetch({ store, params }) {
    store.commit('capstones_eachpage/emptyList')
         
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          project (id: "${params.id}") {
            _id
            ProjectName
            Description
            users {
              _id
              username
              Name
              PermissionLevel
            }
            teams {
              _id
              users {
                _id
                username
                Name
                PermissionLevel
              }
            }
            Picture {
              _id
              url
            }
            tags {
              _id
              tag_name
            }
            blogposts {
              _id
              Title
              LastPublished
              Description
              Picture {
                _id
                url
              }
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
    /* Binds project picture locally for display. */
    for(var one in response.data.project.Picture) {
      response.data.project.Picture[one].url = `${apiUrl}${response.data.project.Picture[one].url}`
      store.commit('capstones_eachpage/setPicture', response.data.project.Picture[one].url)
    }

    const findReleventUser = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          users {
            _id
            Name
            username
            PermissionLevel
          }
        }
        `
      }
    })

    var prof = []
    var sponsor = []
    var student = []
    var tag_list = []
    var school_list = []
    var department_list = []
    response.data.project.teams.forEach(team => {
      for(var each in team.users) {
        if(team.users[each].PermissionLevel === 3 && student.indexOf(team.users[each].username) < 0) { // make sure do not have duplicate user
          student.push(team.users[each].Name)
        }
      }
    })
    response.data.project.users.forEach(user => {
      if(user.PermissionLevel === 2) {
        prof.push(user.Name)
      }
      if(user.PermissionLevel === 4) {
        sponsor.push(user.Name)
      }
    })    
    if(sponsor.length === 0) {
      sponsor.push('no sponsor')
    }

    school_list.push(response.data.project.schools.school_name)

    department_list.push(response.data.project.departments.department_name)

    response.data.project.tags.forEach(tag => {
      tag_list.push(tag.tag_name)
    })

    store.commit('capstones_eachpage/setTitle', response.data.project.ProjectName)
    store.commit('capstones_eachpage/setDescription', response.data.project.Description)
    store.commit('capstones_eachpage/setTeamMember', student.toString())
    store.commit('capstones_eachpage/setProfessor', prof.toString())
    store.commit('capstones_eachpage/setSponsor', sponsor.toString())
    store.commit('capstones_eachpage/setTag', tag_list.toString())
    store.commit('capstones_eachpage/setDepartment', department_list.toString())
    store.commit('capstones_eachpage/setCollegeOf', school_list.toString())

    const findUser = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          users {
            _id
            Name
            username
            email
            blogposts {
              _id
              Picture {
                _id
                url
              }
            }
          }
        }
        `
      }
    })

    response.data.project.blogposts.forEach(blogpost => {
      var username = ''
      var email = ''
      for(var single_one in blogpost.Picture) {
        blogpost.Picture[single_one].url = `${apiUrl}${blogpost.Picture[single_one].url}`
      }
      for(var user in findUser.data.users) {
        for(var post in findUser.data.users[user].blogposts) {
          if(findUser.data.users[user].blogposts[post]._id === blogpost._id) {
            username = findUser.data.users[user].Name
            email = findUser.data.users[user].email
            break
          }
        }
      }

      store.commit('capstones_eachpage/add', {
        id: blogpost.id,
        username: username,
        email: email,
        ...blogpost
      })
    })
  }
}
</script>

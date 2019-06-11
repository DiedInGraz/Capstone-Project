<!--
 * Author: Ruining Yang
 * File: _id.vue
 * 
 * This file displays information for a specific blogpost. 
 * Information displayed includes the blogpost, all comments related to it, and 
 * the ability to add additional comments if user is logged in.
-->

<template>
  <div class="blogpost-id-detail">
    <head>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    </head>
    <DefaultLayout></DefaultLayout>

    <main role="main">
      <div class="container blogpost-id-section">
        <div class="row">

          <!-- BlogPost and Comments section. -->
          <div class="blogpost-left-col col-md-7">
            <!-- content from each blogpost -->
            <div>
              <h2 class="blogpost-id-heading">{{ title }}<span class="text-muted"></span></h2>
              <br>
              <h4 class="blogpost-id-description">{{ description }} </h4>
              <img class="card-img-top blogpost-id-image" :src=picture alt="">
              <footer class="blockquote-footer"> {{ date }} </footer>
              <br><br>
            </div>

            <!-- check the comment in the blogpost -->
            <h3 class="blogpost-comments-id-heading">Comments</h3><br>
            <div class="blogpost-comments-id-section">
              <div v-for="page in filteredList" :key="page._id">
                <h5> --> {{ page.comment_detail }} </h5>
                <h5 class="blogpost-comment-id-username"> User: {{ page.username }} </h5>
                <footer class="blockquote-footer blogpost-id-comment-time"> 
                  {{ page.time }} 
                </footer>
                <div v-if="checkUser(page.email)">
                  <button v-bind:disabled="loading" type="submit" @click.prevent="removeComment(page._id)">Remove</button>
                </div>
                <br><br>
              </div>
              <h3 v-if="!filteredList.length"><i>(No comments)</i></h3>
            </div>
          </div>

          <!-- Form to post comments. -->
          <div class="col-md-5 make-comment-section">
            <div v-if="allowAccess===1">
              <div class="blogpost-id-form-fixed">
                <form autocomplete="off" @submit.stop.prevent="handleSubmit">
                  <div class="form-group">
                    <label for="Description" class="blogpost-id-form-description">Comment:</label>
                    <br>
                    <textarea rows="4" cols="46"
                      id="Description"
                      v-model="Description"
                      type="text"
                      autofocus="true"
                      placeholder="Enter your comment"
                      required/>
                  </div>
                  <button v-bind:disabled="loading" type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
                </form>
              </div>
            </div>
            <div v-else>
              <!-- Don't show the form. -->
            </div>
          </div>
        </div>

        <hr class="featurette-divider">
      </div>
    </main>
  </div>
</template>


<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Strapi from 'strapi-sdk-javascript/build/main'
import moment from 'moment'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
const apiUrl = ('http://' + process.env.VUE_APP_API_URL + ':1337') || 'http://localhost:1337' 
const strapi = new Strapi(apiUrl)

import authMixin from '@/mixins/allUsers.js'

export default {
  name: 'Blogpost_detail',
  components: {
    DefaultLayout
  },
  data(){
    return{
      Description: '',
      loading: false,
      check: false
    }
  },
  head() {
        return{
            title: "BU | Blogpost"
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
      return this.$store.getters['blogposts_eachpage/getTitle']
    },
    description() {
      return this.$store.getters['blogposts_eachpage/getDescription']
    },
    picture(){
      return this.$store.getters['blogposts_eachpage/getPicture']
    },
    date(){
      return moment(this.$store.getters['blogposts_eachpage/getDate']).format('MMMM Do YYYY')
    },
    allComments() {      
      return this.$store.getters['blogposts_eachpage/list']
    },
    filteredList() {
      return this.allComments.filter(page => {
        // convert to readable time format, need to npm install moment
        time: page.time = moment(page.comment_date).format('MMMM Do YYYY')
        return page
      }).sort(function(a, b) {
        if (new Date(a.updatedAt).getTime() < new Date(b.updatedAt).getTime())
          return 1;
        if (new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime())
          return -1;
      })
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
    // Remove comment function
    async removeComment(commentId) {
      this.loading = true
      try {
        const response = strapi.deleteEntry('comments', commentId)
        this.loading = false
        this.$router.go(this.$route.params.id) // to the new page
        
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred when handling submit.')
      }
    },
    // Submit button function
    async handleSubmit(params) {
      this.loading = true
      try {
        var trans = JSON.stringify(jwtDecode(Cookies.get('jwtAuth')))
        var user_email = JSON.parse(trans).name
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

          const response = await strapi.createEntry('comments', {
            comment_detail: this.Description,
            blogpost: this.$route.params.id,
            users: user_id
          })

          const noPhotoparams = await strapi.updateEntry('comments', response.id, {
            comment_date: moment().format()
          })
          
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
    store.commit('blogposts_eachpage/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          blogpost (id: "${params.id}") {
            _id
            Title
            Description
            Picture {
              _id
              url
            }
            LastPublished
            comments {
              _id
              comment_detail
              comment_date
            }
          }
        }
        `
      }
    })

    const findUser = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          users {
            _id
            Name
            username
            email
            comments {
              _id
            }
          }
        }
        `
      }
    })

    for(var one in response.data.blogpost.Picture) {
      response.data.blogpost.Picture[one].url = `${apiUrl}${response.data.blogpost.Picture[one].url}`
      store.commit('blogposts_eachpage/setPicture', response.data.blogpost.Picture[one].url)
    }
    store.commit('blogposts_eachpage/setTitle', response.data.blogpost.Title)
    store.commit('blogposts_eachpage/setDescription', response.data.blogpost.Description)
    store.commit('blogposts_eachpage/setDate', response.data.blogpost.LastPublished)

    response.data.blogpost.comments.forEach(comment => {    
      var username = ''
      var email = ''
      for(var user in findUser.data.users) {
        for(var each in findUser.data.users[user].comments) {
          if(findUser.data.users[user].comments[each]._id === comment._id) {
            username = findUser.data.users[user].Name
            email = findUser.data.users[user].email
            break
          }
        }
      }

      store.commit('blogposts_eachpage/add', {
        id: comment.id,
        username: username,
        email: email,
        ...comment
      })
    })
  }
}
</script>

<!--
  Page: ModifyTag.vue

  Primary Contributor: Ruining Yang
  Secondary Contributor: Justin Yu
-->

<template>
  <div id="ModifyTagPage">
    <div v-if="allowAccess === 1">

      <DefaultLayout></DefaultLayout>

    <div class="management-form-container">
        <select class="management-form-selector" v-model="selected">
          <!-- Select tag -->
          <option value="" disabled hidden selected>Select Tag</option>
          <option v-for="each_tag in tag_list" :key="each_tag.id" :value="each_tag.id">
            {{ each_tag.TagName }}
          </option>
        </select>

        <!-- Modify or Remove tag -->
        <div v-if="selected !== ''">
            <button v-on:click.prevent="removeDepartment" type="button" class="btn btn-danger mx-3">Remove Tag</button>
            <button v-on:click.prevent="modify = true" type="button" class="btn btn-primary mx-3">Modify Tag</button>
        </div>

        <div v-if="modify">
          <form autocomplete="off" @submit.stop.prevent="handleSubmit">
            <!-- Tag name -->
            <div class="form-group">
              <label class="management-form-title" for="tag">New Tag</label>
              <b-form-input
                id="tag"
                v-model="tag"
                type="text"
                autofocus="true"
                placeholder="Enter tag name"
                required/>
            </div>
            <!-- Submit function -->
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
  name: 'ModifyTagPage',
  components: {
    DefaultLayout,
    AccessDenied
  },
  data() {
    return {
      tag: '',
      selected: '',
      loading: false,
      modify: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    }
  },
  head() {
        return{
            title: "BU | Modify Tag"
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
    tag_list() {
      return this.$store.getters['modify_tag/list']
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

    async removeTag() {
      try {
        this.loading = true
        const change = strapi.deleteEntry('tags', this.selected)

        this.loading = false
        this.$router.go() // to the new page
      } catch (err) {
        this.loading = false
        //may add details for each err.message. For example:
        // unique title name, cannot submit image, etc.
        alert(err.message || 'An error occurred.')
      }
    },
    async handleSubmit() {
      this.loading = true

      try {
        const change = await strapi.updateEntry('tags', this.selected, {
          tag_name: this.tag
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
  async fetch({ store }) {
    store.commit('modify_tag/emptyList')
    const response = await strapi.request('post', '/graphql', {
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

    response.data.tags.forEach(tag => {     
      store.commit('modify_tag/add', {
        id: tag._id,
        TagName: tag.tag_name
      })
    })
  }
};
</script>
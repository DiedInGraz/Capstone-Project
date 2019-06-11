<!--
Author: Tim Lee
Page: Support.vue
Components Used: DefaultLayout

This is the main page of the Support page for the Capstone CMS.
-->

<template>
    <div class="support-page">
        <!-- Imports the DefaultLayout navigation bar component. -->
        <DefaultLayout class="default-layout"></DefaultLayout>

        <div class="page-layout">
            <div>
                <h1 class="support-page-header">Support</h1>
            </div>

            <div class="support-page-content">
                <div class="support-page-inquiry">
                    <br>Have any questions or need help?<br>Contact:
                </div>
                <!-- Fetches each support user from Strapi API, binds to certain
                        user ID, and displays each user's information. -->
                <h1 v-for="cmsuser in filteredList" :key="cmsuser.id">
                    <div class="support-page-info">
                        <br>
                        {{ cmsuser.Name }} {{ cmsuser.LastName }}
                        <br>
                        Email: {{ cmsuser.email }}
                        <br>
                        Phone: {{ cmsuser.Phone }}
                    </div>
                </h1>
                <!-- If no such user(s) exist in database, then this will 
                        be displayed instead. -->
                <h1 v-if="!filteredList.length">No result.</h1>
            </div>

        </div>

    </div>

</template>


<script>

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Strapi from 'strapi-sdk-javascript'
const apiUrl = ('http://' + process.env.VUE_APP_API_URL + ':1337') || 'http://localhost:1337' 
const strapi = new Strapi(apiUrl)

export default {
    /* Exports the components that this page uses. */
    name: 'SupportPage',
    components: {
      DefaultLayout
    },

    head() {
        return{
            title: "BU | Support"
        }
    },

    /* Query returns data, which is the ECS Support user(s) for this page. */
    data: function(){
        return{
            query: ''
        }
    },

    /* Calls the cmsuser store class to get the cms support users from 
        the array. */
    computed: {
        filteredList(){
            return this.users.filter(user => {
                return user.Name.includes(this.query)
            })
        },
        users(){
            return this.$store.getters['cmsusers/list']
        }
    },

    /* Calls the cmsusers store class to retrieve support users and store them into 
        an array. */
    async fetch({ store }){
        store.commit('cmsusers/emptyList')
        const response = await strapi.request('post', '/graphql', {
            data: {
                query: `query{
                            users(where: {Name: "Support"}){
                                Name
                                email
                                Phone
                            }
                        }
                `
            }
        })
        response.data.users.forEach(cmsuser => {
            store.commit('cmsusers/add', {
                id: cmsuser.id,
                ...cmsuser
            })
        })
    }

    

};

</script>


<!--
Author: Tim Lee
Page: Sponsors.vue
Components Used: DefaultLayout, why_sponsor, overview_sponsors

This is the main page of the Sponsors page of the Capstone CMS. 
-->

<template>
    <div class="sponsors-page">
        <!-- Imports the DefaultLayout navigation bar component. -->
        <DefaultLayout class="default-layout"></DefaultLayout>  

        <div class="container">
            <div class="row">
                <div class="col">
                    <!-- Imports the 'why_sponsor' component. -->
                    <why_sponsor class="sponsors-page-why-sponsor-us"></why_sponsor>
                </div>

                <div class="col">
                    <div class="sponsors-page-align-right-col">
                        <h1 class="sponsors-page-our-sponsors">Featured Sponsors</h1>
                        <!-- Fetches each Sponsors user from database, binds to 
                                certain user ID, and displays each Sponsor's 
                                information. -->
                        <div class="sponsors-list-cards">
                            <li class="card" v-for="cmsuser in filteredList" :key="cmsuser.id">
                                <div v-if="cmsuser.Picture != null">
                                    <img class="card-img-top sponsors-page-card-img" :src="cmsuser.Picture.url">
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">{{ cmsuser.username }}
                                        <br>
                                        {{ cmsuser.email }}
                                    </h4>
                                </div>
                                <br>
                            </li>
                            <!-- If no such user(s) exist in database, then this will 
                                    be displayed instead. -->
                            <p v-if="!filteredList.length">No Sponsors.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Imports 'overview_sponsors' component. -->
        <overview_sponsors class="sponsors-page-overview-sponsors"></overview_sponsors>
        
    </div>
</template>


<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import why_sponsor from '@/components/Sponsors/why_sponsor.vue';
import overview_sponsors from '@/components/Sponsors/overview_sponsors.vue';
import Strapi from 'strapi-sdk-javascript';
const apiUrl = ('http://' + process.env.VUE_APP_API_URL + ':1337') || 'http://localhost:1337' 
const strapi = new Strapi(apiUrl);


export default {
    /* Exports the components this page uses. */
    name: 'Home',
    components: {
        DefaultLayout,
        why_sponsor,
        overview_sponsors
    },

    head() {
        return{
            title: "BU | Sponsors"
        }
    },
    /*
     * Query returns data containing the list of featured Sponsors.
     */
    data: function(){
        return{
            query: ''
        }
    },

    /* Calls the sponsors store class to get the sponsors users from 
        the array. */
    computed: {
        filteredList(){
            return this.users.filter(cmsuser => {
                return cmsuser.username.includes(this.query)
            })
        },
        users(){
            return this.$store.getters['sponsors/list']
        }
    },

    /* Calls the sponsors store class to retrieve sponsors and store them into 
        an array. */
    async fetch({ store }){
        store.commit('sponsors/emptyList')
        const response = await strapi.request('post', '/graphql', {
            data: {
                query: `query{
                            users(where: {UserType: "sponsor"}){
                                username
                                email
                                Picture{
                                    url
                                }
                            }
                        }
                `
            }
        })
        response.data.users.forEach(user => {
            if(user.Picture != null)
                user.Picture.url = `${apiUrl}${user.Picture.url}`
            store.commit('sponsors/add', {
                id: user.id,
                ...user
            })
        })
    }


};

</script>

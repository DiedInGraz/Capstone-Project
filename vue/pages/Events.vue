<!--
    Page: Events.vue
    Primary Contributor: Justin Yu
-->

<template>
    <div>
        <DefaultLayout></DefaultLayout>
        <div class="fullCalendar">
            <full-calendar :events="events" @event-render="eventRender" :config="config">
            </full-calendar>
        </div>
    </div>

</template> 


<!-- Need to use endpoints from strapi mongodb 
        for the supportPerson. -->
<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Strapi from 'strapi-sdk-javascript'
const apiUrl = ('http://' + process.env.VUE_APP_API_URL + ':1337') || 'http://localhost:1337' 
const strapi = new Strapi(apiUrl)
const self = this;
import $ from 'jquery';
import 'bootstrap/js/dist/popover.js';
import moment from 'moment'


export default {
    name: 'EventPage',
    components: {
        DefaultLayout
    },
    head() {
        return{
            title: "BU | Events"
        }
    },
    // Data used to render events
    data() {
        return {
            events: this.$store.getters['events/list'],

            config: {
                defaultView: 'month',
                editable: false,
                eventTextColor: 'white',
                buttonText: {
                    today: 'Today',
                },
                header: {
                    left: 'today',
                    center: 'prevYear, prev, title, next, nextYear',
                    right: '',
                },
                
                
            },
        }
    },
    methods: {
        // Popover configuration for events
        eventRender: function(event, element) {
            $(element).popover({
                title: event.title,
                content: "<b>Event Description: </b>" + "<br>" + "<i>" + event.description + "</i><br><br>" + 
                         "<b>Start Time: </b>" + "<i>" + moment(event.start).format('h:mm a') + "</i><br><br>" + 
                         "<b>End Time: </b>" + "<i>" + moment(event.end).format('h:mm a'),
                html: true,
                trigger: 'hover',
                placement: 'top',
                container: 'body'
            });
        },
    },

    // Updating event page data when web page is loaded
    async fetch({ store }){
        store.commit('events/emptyList')
        const response = await strapi.request('post', '/graphql', {
            data: {
                query: 
                    `query {
                        events {
                            title
                            description
                            start
                            end
                        }
                    }`
            }
        })
        response.data.events.forEach(event => {
            store.commit('events/add', {
                id: event.id,
                ...event
            })
        })
    }
    
}
</script>


<template>
<!-- 
  File: professor_actions.vue
  Author: KJ Smith
  Description: This file contains the actions that a user with professor permissions
  will have access to.
 -->
    <table class="dashboard-actions-column">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <tr> <th class="dashboard-table-header">Actions</th> </tr>
      <tr>
            <!-- navigation button to SponsorsCapstones page -->
            <button class="dashboard-button">
                 <nuxt-link class="dashboard-button" to="/SponsorsCapstones">
                    View My Capstones
                 </nuxt-link>
            </button>
        </tr>
       <tr>
            <div>
              <!-- accordion button "Manage Teams" will expand id=accordion-2, showing options -->              
              <button v-b-toggle.accordion-2 class="dashboard-button">Manage Teams</button>
              <b-collapse id="accordion-2" accordion="my-accordion">
                  <ul class="list-group list-group-flush dashboard-card-border">
                    <li class="list-group-item">
                      <nuxt-link class="dashboard-card-text" to="/ManageTeamtoCapstone">
                        Create Team
                      </nuxt-link>
                    </li>
                    <li class="list-group-item">
                      <nuxt-link class="dashboard-card-text" to="/ModifyTeam">
                        Modify Team
                      </nuxt-link>
                    </li>
                    <li class="list-group-item"> 
                      <nuxt-link class="dashboard-card-text" to="/RemoveTeam">
                        Remove Team
                      </nuxt-link>
                    </li>
                  </ul>
              </b-collapse>
            </div>
        </tr>

        <tr>
            <div>
              <!-- accordion button "Manage Events" will expand accordion-3, showing options -->              
              <button v-b-toggle.accordion-3 class="dashboard-button">Manage Events</button>
              <b-collapse id="accordion-3" accordion="my-accordion">
                <ul class="list-group list-group-flush dashboard-card-border">
                    <li class="list-group-item">
                      <nuxt-link class="dashboard-card-text" to="/CreateEvent">
                        Create Event
                      </nuxt-link>
                    </li>
                    <li class="list-group-item">
                      <nuxt-link class="dashboard-card-text" to="/ModifyEvents">
                        Modify/Remove Event
                      </nuxt-link>
                    </li>
                  </ul>
              </b-collapse>
            </div>
        </tr>

        <tr>
            <div>
              <!-- accordion button "Manage Capstones" will expand accordion-4, showing options -->
              <button v-b-toggle.accordion-4 class="dashboard-button">Manage Capstones</button>
              <b-collapse id="accordion-4" accordion="my-accordion">
                <ul class="list-group list-group-flush dashboard-card-border">
                    <li class="list-group-item green-bg">
                      <nuxt-link class="dashboard-card-text" to="/CreateCapstone">
                        Create Capstone
                      </nuxt-link>
                    </li>
                    <li class="list-group-item">
                      <nuxt-link class="dashboard-card-text" to="/ModifyCapstone">
                        Modify Capstone
                      </nuxt-link>
                    </li>
                    <li class="list-group-item "> 
                      <nuxt-link class="dashboard-card-text" to="/RemoveCapstone">
                        Remove Capstone
                      </nuxt-link>
                    </li>
                  </ul>
              </b-collapse>
            </div>
        </tr>
        <tr>
            <div>
              <!-- accordion button "Manage Capstones" will expand accordion-4, showing options -->
              <button v-b-toggle.accordion-5 class="dashboard-button">Manage Tags</button>
              <b-collapse id="accordion-5" accordion="my-accordion">
                <ul class="list-group list-group-flush dashboard-card-border">
                    <li class="list-group-item green-bg">
                      <nuxt-link class="dashboard-card-text" to="/createTag">
                        Create Tag
                      </nuxt-link>
                    </li>
                    <li class="list-group-item">
                      <nuxt-link class="dashboard-card-text" to="/modifyTag">
                        Modify/Remove Tag
                      </nuxt-link>
                    </li>
                  </ul>
              </b-collapse>
            </div>
        </tr>
        <tr>
            <!-- logout button with arrow symbol -->
            <button type="submit" class="dashboard-button logout">
                <nuxt-link class="dashboard-button" to="/auth/sign-off">
                Logout <i class="fa fa-sign-out"></i>                    
              </nuxt-link>
            </button>
        </tr>
    </table>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'

export default {
  name: 'LogoutPage',
  components: {
      DefaultLayout
  },
}
</script>
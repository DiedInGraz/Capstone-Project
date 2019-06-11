<template>
<!-- 
  File: sponsor_actions.vue
  Author: KJ Smith
  Description: This file contains the actions that a user with sponsor permissions
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
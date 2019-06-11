<!-- 
  File: admin_actions.vue
  Author: KJ Smith
  Description: This page is displayed whenever the intended page is restricted
  based on the user's permissions
 -->
<template>
  <div id="AccessDenied">
    <DefaultLayout></DefaultLayout>
        <div class="access-denied-page">
            <img src="../assets/permissions.svg"/>
            <h1>Access Denied</h1>
            <h4>You are not authorized to view this page.</h4>
        </div>

  </div>
  
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default {
  name: 'AccessDenied',
  components: {
    DefaultLayout
  },
  head() {
        return{
            title: "BU | Access Denied"
        }
    },
};
</script>

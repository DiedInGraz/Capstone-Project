<template>
<!-- 
  File: admin_actions.vue
  Author: KJ Smith
  Description: This is the home page for the website.
 -->
  <div class="index-page-layout">
    <DefaultLayout/>
    <home_view/>
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import home_view from '@/components/home_view.vue';

export default {
  name: 'SupportPage',
  components: {
    DefaultLayout,
    home_view
  },
  head() {
        return{
            title: "BU | Home"
        }
    },
};


</script>

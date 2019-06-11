<template>
<!-- 
  File: admin_actions.vue
  Author: KJ Smith
  Description: This is the (old) homepage for the website.
 -->
  <div id="SupportPage">
    <DefaultLayout></DefaultLayout>
    <home_view></home_view>
  </div>
</template>


<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import home_view from '@/components/home_view.vue';

export default {
  name: "homePage",
  components: {
    DefaultLayout,
    home_view
  },
};
</script>
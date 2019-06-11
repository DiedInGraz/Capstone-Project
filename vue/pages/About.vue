<!--
  Page: About.vue

  Primary Contributor: Ben Pennnington
-->

<template>
  <div id="AboutPage" class="about-page-background">
    <DefaultLayout></DefaultLayout>
    <div class="about-header">
        <h1>About Us</h1>
    </div>
    <div class="about-content" style="width: 500px; margin: auto">
      <p>Baylor University's Capstone program is a place where students can put their knowledge into practice alongside industry sponsors.</p>
    </div>
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
//import about from '@/components/about_content.vue';

export default {
  name: 'AboutPage',
  components: {
    DefaultLayout,
    //about
  },
  head() {
        return{
            title: "BU | About"
        }
    },
};
</script>
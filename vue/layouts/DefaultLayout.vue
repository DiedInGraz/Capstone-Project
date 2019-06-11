<template>
<!-- 
  File: admin_actions.vue
  Author: KJ Smith
  Description: This file contains the "template" that each page uses
  before incorporating their individual content.
 -->
  <div id="default-layout" style="margin:0px">
    <Header></Header>
    <Navbar></Navbar>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Navbar from "~/components/Navbar.vue";

export default {
  name: "default-layout",
  components: {
    Header,
    Navbar
  }
};
</script>
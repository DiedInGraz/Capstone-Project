<template>
<!-- 
  File:newHeader.vue
  Author: KJ Smith
  Description: Attempt at a new header. (UNUSED)
 -->
  <header>
    <div class="rectangle">
      <div style="padding: 10px; padding-left: 165px">
        <img src="../assets/logo.png" width="180"/>
      </div>
    </div>
  
  </header>
</template>

<style scoped>
#rectangle {
  width: 100%;
  height: 65px;
  background: rgb(7, 70, 5);
}
</style>


<script>
import Navbar from "../components/Navbar";

export default {
  name: "Header",
  components: {
    Navbar
  },
  props: {
    activePage: String
  }
};
</script>

<style scoped>
.rectangle {
  width: 100%;
  height: 65px;
  background: rgb(7, 70, 5);
}
</style>

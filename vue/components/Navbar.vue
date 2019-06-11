<template>
<!-- 
  File: Navbar.vue
  Author: KJ Smith
  Description: This file contains the navbar to be included in the
  default layout.
 -->
  <div class="navbar-overall-margin">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <nav class="navbar navbar-expand navbar-settings">
      
      <div class="collapse navbar-collapse wrapper" id="navbarNav">
        
        <ul class="navbar-nav">
          <li>
            <nuxt-link class="navbar-nuxt-link" to="/">
              <button id="index" class="nav-link">
                    Home
              </button>
            </nuxt-link>          
          </li>

          <li>
            <nuxt-link class="navbar-nuxt-link" to="/Capstone">
              <button id="Capstone" class="nav-link">
                    Capstones
              </button>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link class="navbar-nuxt-link" to="/Sponsors">
              <button id="Sponsors" class="nav-link">
                    Sponsors
              </button>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link class="navbar-nuxt-link" to="/Events">
              <button id="Events" class="nav-link">
                    Events
              </button>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link class="navbar-nuxt-link" to="/Support">
              <button id="Support" class="nav-link">
                    Support
              </button>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link class="navbar-nuxt-link" to="/About">
              <button id="About" class="nav-link">
                    About
              </button>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link class="navbar-nuxt-link" to="/dashboard/dashboard" style="text-decoration:none">
              <button id="dashboard-dashboard" class="nav-link">
                    Account
              </button>
            </nuxt-link>
          </li>
      </ul> 

       </div>
    </nav>

  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
  integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
  integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
  integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

  </div>
</template>

<script >

export default {
  name: "navBar",
  data(){
    return{
      level: 3,
    }
  },
  mounted(){
    /* disable the nav button for the current page */
    if(document.getElementById(this.$route.name)){
      document.getElementById(this.$route.name).disabled = true;
      
    }
  },
};
</script>
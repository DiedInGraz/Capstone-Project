<template>
<!-- 
  File: account_content.vue
  Author: Ben Pennington
  Description: This file contains the contents for the homepage.
 -->
    <div class="account">
        
        <!-- register -->
        <button 
        id="register" 
        type="button" 
        class="btn btn-primary account-content-button"
        onclick="location.href = '/Authentication/Register';"
        > 
        Register 
        </button>

        <!-- login -->
        <button 
        id="login" 
        type="button" 
        class="btn btn-primary account-content-button"
        onclick="location.href = '/Authentication/Login';"
        > 
        Login 
        </button>

        <!-- logout -->
        <button 
        id="logout" 
        type="button" 
        class="btn btn-primary account-content-button"
        onclick="location.href = '/Authentication/Logout';"
        > 
        Logout 
        </button>

        <ul>
          <!-- start functionality for authentication -->
          <li v-if="username">
            <a href="#">
              Welcome {{ username }}
            </a>
          </li>
          <li v-if="username">
            <router-link tag="a" to="/Authentication/Logout" exact>
              Logout {{ username }}
            </router-link>
          </li>

          <li v-if="!username">
            <router-link v-if="!username" tag="a" to="/Authentication/Login" exact>
              Login (no user logged in)
            </router-link>
          </li>
          <li v-if="!username">
            <router-link v-if="!username" tag="a" to="/Authentication/Register" exact>
              Register (no user logged in)
            </router-link>
          </li>
          <!-- end functionality for authentication -->
        </ul>

    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Cookies from 'js-cookie';

export default {
  //get the username of the user (to determine whether someone is currently logged in or not)
  computed: {
    username() {
        if(Cookies.get('email') == null){
            return undefined;
            
        }
        else{
            return Cookies.get('email');
        }
    }
  }
}
</script>

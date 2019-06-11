<!--
 * Author: Ruining Yang
 * File: sign-off.vue
 * 
 * This file contains methods when user logouts the website
-->

<template>
  <p>Signing off...</p>
</template>

<script>
export default {
  mounted () {
    const unsetToken = require('~/utils/auth').unsetToken
    const logout = require('~/utils/lock').logout

    unsetToken()
    logout()
  }
}
</script>

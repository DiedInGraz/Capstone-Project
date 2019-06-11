<!--
 * Author: Ruining Yang
 * File: signed-in.vue
 * 
 * This file contains methods when user just logins the website
-->

<template>
  <p>Signing in...</p>
</template>

<script>
import { setToken, extractInfoFromHash } from '~/utils/auth'

export default {
  mounted () {
    const { token } = extractInfoFromHash()
    if (!token) {
      alert('Something happened with the Sign In request')
      this.$router.replace('/authentication/login')
    }
    setToken(token)
    this.$router.replace('/dashboard/dashboard')
  }
}
</script>

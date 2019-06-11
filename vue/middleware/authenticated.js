/*
 * Author: Ruining Yang
 * File: authenticated.js
 * 
 * This file contains methods to check whether user is authenticated
 * 
 */

export default function ({ store, redirect }) {
  if (!store.getters.isAuthenticated) {
    return redirect('/auth/sign-in')
  }
}

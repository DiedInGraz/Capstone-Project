/*
 * Author: Ruining Yang
 * File: anonymous.js
 * 
 * This file contains methods to redirecte user to main page
 * 
 */

export default function ({ store, redirect }) {
  if (store.getters.isAuthenticated) {
    return redirect('/')
  }
}

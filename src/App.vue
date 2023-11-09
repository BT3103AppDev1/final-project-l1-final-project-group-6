<script setup>
/*
=========================================================
* Vue  - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-material-kit
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { RouterView } from "vue-router";
</script>

<script>
import firebaseApp from "./firebase";
import { auth } from "./firebase";

export default {
  data() {
    return {
      authState: null,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.authState = user;
    });
  },
  provide() { // provides for all child components to use
    return {
      authState: this.authState,
    };
  },
}
</script>

<template>
  <router-view />
</template>

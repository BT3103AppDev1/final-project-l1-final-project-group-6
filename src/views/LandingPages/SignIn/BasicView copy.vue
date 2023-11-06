<!-- Login.vue -->
<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" v-model="email" required />
      <br />
      <label for="password">Password:</label>
      <input type="password" v-model="password" required />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../../firebase.js"; // Keep this as is

const auth = getAuth(firebaseApp);

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        console.log("Logged in as:", user.email);
        // Redirect or perform other actions upon successful login
        this.$router.push({ name: "explore" });
      } catch (error) {
        console.error("Error logging in:", error.message);
        // Handle login error (display an error message, etc.)
      }
    },
  },
};
</script>

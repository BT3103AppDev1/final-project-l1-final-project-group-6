<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  // signInWithPopup,
  // GoogleAuthProvider,
} from "firebase/auth";
import firebaseApp from "../../../firebase.js"; // Keep this as is

// const provider = new GoogleAuthProvider();

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
        // Redirect upon successful login
        alert("Login successful!")
        this.$router.push({ name: "explore" });
      } catch (error) {
        console.error("Error logging in:", error.message);
        // Handle login error (display an error message, etc.)
        alert("Invalid email or password");
      }
    },
    // Method to navigate to the sign-up page
    async redirectToSignUp() {
      this.$router.push({ name: "signup" }); // Replace "signup" with the actual route name for the sign-up page
    },
    // google sign in method
    // async handleGoogleSignIn() {
    //   try {
    //     const result = await signInWithPopup(auth, provider);
    //     const user = result.user;
    //     console.log("Logged in with Google as:", user.email);
    //     // Redirect or perform other actions upon successful Google sign-in
    //     this.$router.push({ name: "explore" });
    //   } catch (error) {
    //     console.error("Error logging in with Google:", error.message);
    //     // Handle Google sign-in error (display an error message, etc.)
    //   }
    // },
  },
};
</script>
<template>
  <div class="page-header align-items-start min-vh-100">
    <video autoplay loop muted playsinline preload="auto" poster="" class="video-background">
      <source src="../../../data/video4.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>

    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Sign in
                </h4>
                <!-- google sign in button -->
                <!-- <div class="row mt-3">
                  <div class="col-12 text-center">
                    <a class="btn btn-link px-3" @click="handleGoogleSignIn">
                      <i class="fa fa-google text-white text-lg"></i>
                    </a>
                  </div> 
                </div> -->
              </div>
            </div>
            <div class="card-body-login">
              <h1>Login</h1>
              <br>
              <form @submit.prevent="login">
                <label for="email">Email:</label>
                <input type="email" v-model="email" required />
                <br />
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
                <br />
                <button type="submit" class="btn btn-success">Login</button>
              </form>
            </div>
            <MaterialButton @click="redirectToSignUp" class="btn btn-primary">
              Sign Up
            </MaterialButton>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer position-absolute bottom-2 py-2 w-100">
      <div class="container">
        <div class="row align-items-center justify-content-lg-between">
          <div class="col-12 col-md-6 my-auto">
            <div class="copyright text-center text-sm text-white text-lg-start">
              © {{ new Date().getFullYear() }}, made by
              <a
                href="https://nusmods.com/courses/BT3103/application-systems-development-for-business-analytics"
                class="font-weight-bold text-white"
                target="_blank"
                >BT3103</a
              >
              Group 6
            </div>
          </div>
          <div class="col-12 col-md-6">
            <ul
              class="nav nav-footer justify-content-center justify-content-lg-end"
            >
              <li class="nav-item">
                <a
                  href="https://nusmods.com/courses/BT3103/application-systems-development-for-business-analytics"
                  class="nav-link text-white"
                  target="_blank"
                  >BT3103</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>


<style>
.card-body-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-body-login > form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-body-login > form > label {
  display: inline-block;
  margin-bottom: 0.5rem;
  width: auto;
}

.card-body-login > form > input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
}

.card-body-login > button {
  margin-top: 1rem;
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  font-size: 1.2rem;
}

.btn-success {
  font-size: 1rem;
}
</style>

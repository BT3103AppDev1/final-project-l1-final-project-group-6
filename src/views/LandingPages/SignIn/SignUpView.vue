<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
    async signUp() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        console.log("User registered successfully:", user.email);
        // Redirect or perform other actions upon successful registration
        this.$router.push({ name: "signin-basic" }); // Redirect to the sign-in page
      } catch (error) {
        console.error("Error registering user:", error.message);
        // Handle registration error (display an error message, etc.)
      }
    },
  },
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Sign Up</h2>
          </div>
          <div class="card-body">
            <!-- Sign-up form -->
            <form @submit.prevent="signUp">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="form-control input-box"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control input-box"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
/* Define the styling for the input boxes */
.input-box {
  border: 2px solid #ccc; /* Add a 2px solid border */
  border-radius: 5px; /* Add some border radius for rounded corners */
  padding: 8px; /* Add padding to the input fields */
  width: 100%; /* Make the input fields full width */
}
</style>
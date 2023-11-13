<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../../firebase.js"; // Keep this as is
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const firebaseErrors = {
  'auth/weak-password': 'Password must be at least 6 characters',
  'auth/email-already-in-use': 'This email is already in use. Please login instead.',
};

export default {
  data() {
    return {
      email: "",
      password: "",
      entity: "NGO",
      username: "", // Initialize the company name field
      isSignUpError: false,
      accountExists: false,
      errorMessage: "",
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

        // Create a Firestore document under the "users" collection with the user's UID
        const userDocRef = doc(db, "users", user.uid);
        const userData = {
          email: user.email,
          entity: this.entity,
          username: this.username,
          following: 0,
          followers: 0,
          userID: user.uid,
          description: "",
          saved: [],
          posts: [],
          requests: [],
          imageUrl:
            "https://api-private.atlassian.com/users/7831f16b18333c732e152c74f1863d18/avatar",
        };

        await setDoc(userDocRef, userData);

        // Redirect or perform other actions upon successful registration
        this.$router.push({ name: "signin-basic" }); // Redirect to the sign-in page
      } catch (error) {
        console.error("Error registering user:", error.message);
        this.isSignUpError = true;
        // Display the error message to the user
        this.errorMessage = firebaseErrors[error.code] || error.message;
        if (error.code === 'auth/email-already-in-use') {
          this.accountExists = true;
        }
      }
    },
    returnToLogin() {
      this.$router.push({ name: "signin-basic" });
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
              <div class="mb-3">
                <label for="entity" class="form-label"
                  >Are you an NGO or a Company?</label
                >
                <select
                  id="entity"
                  v-model="entity"
                  class="form-control input-box"
                  required
                >
                  <option value="NGO">NGO</option>
                  <option value="Company">Company</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Company Name</label>
                <input
                  type="text"
                  id="username"
                  v-model="username"
                  class="form-control input-box"
                  required
                />
              </div>

              <div class="footer ">
                <div id="error-handling" v-if="isSignUpError">
                  <p id="error-message">{{ errorMessage }}</p>
                  <button class="btn btn-primary" v-if="accountExists" @click="returnToLogin">
                    Return to Login Page
                  </button>
                </div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
              </div>
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
  border: 2px solid #ccc;
  /* Add a 2px solid border */
  border-radius: 5px;
  /* Add some border radius for rounded corners */
  padding: 8px;
  /* Add padding to the input fields */
  width: 100%;
  /* Make the input fields full width */
}

#error-message {
  color: red;
  
}
</style>

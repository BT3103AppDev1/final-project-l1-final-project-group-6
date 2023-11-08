<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../../firebase.js"; // Keep this as is
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      email: "",
      password: "",
      entity: "",
      username: "", // Initialize the company name field
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
          imageURL:
            "https://api-private.atlassian.com/users/7831f16b18333c732e152c74f1863d18/avatar",
        };

        await setDoc(userDocRef, userData);

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
              <div class="mb-3">
                <label for="type" class="form-label"
                  >Are you an NGO or a Company?</label
                >
                <select
                  id="type"
                  v-model="type"
                  class="form-control input-box"
                  required
                >
                  <option value="ngo">NGO</option>
                  <option value="company">Company</option>
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
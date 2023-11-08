<script setup>
import { defineAsyncComponent, onMounted, onUnmounted, ref } from "vue";

//firebase
import app from "../../../firebase.js";
import "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";

//example components
import NavbarDefault from "../../../examples/navbars/NavbarDefault.vue";
import Footer from "../../../examples/footers/SavedFooter.vue";
import Header from "../../../examples/Header.vue";
import FilledInfoCard from "../../../examples/cards/infoCards/FilledInfoCard.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";

//images
import profile from "@/assets/img/profile.jpg";
</script>

<script>
const db = getFirestore(app);
const auth = getAuth();

export default {
  data() {
    return {
      username: "",
      imageURL: "",
      userID: "",
      uid: "",
      description: "",
    };
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        getDoc(userRef).then((doc) => {
          if (doc.exists()) {
            console.log("Document data:");
            console.log(doc.data().username);
            console.log(doc.data().imageURL);
            console.log(doc.data().userID);
            console.log(doc.data().uid);

            this.username = doc.data().username;
            this.imageURL = doc.data().imageURL;
            this.userID = doc.data().userID;
            this.uid = doc.data().uid;
            this.description = doc.data().description;
          }
        });
      }
    });
  },
};
</script>

<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>

  <Header>
    <div
      class="page-header min-vh-50"
      :style="`background-image: url(${profile})`"
      loading="lazy"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative"></div>
        </div>
      </div>
    </div>
  </Header>

  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-7 text-center mx-auto position-relative">
          <div class="user-profile">
            <div class="profile-pic-username">
              <div class="profile-pic">
                <img
                  :src="imageURL"
                  alt="No Profile Picture"
                  style="
                    object-fit: fill;
                    border-radius: 50%;
                    width: 200px;
                    height: 200px;
                    border: 5px solid #57b05b;
                  "
                />
              </div>
              <div class="username">
                <h1 class="text-end">{{ username }}</h1>
              </div>
            </div>

            <div class="description">
              <h3>Description</h3>
              <p>{{ description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.profile-pic-username {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0; /* Make the space between username and profile pic wider */
}

profile-pic {
  width: 200px;
  height: 200px;
  border-radius: 70%;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);
  border: 6px solid #ccc; /* Updated to grey border */
}

.username {
  margin-top: 10px; /* Add margin to separate username from profile pic on small screens */
  font-size: 1.5rem; /* Adjust font size for small screens */
  text-align: center; /* Center align username text */
}

.description {
  text-align: center;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  /* Make the description box wider horizontally */
  max-width: 1000px; /* Adjust the max-width as per your preference */
  width: 100%; /* Make the description container full width on small screens */

  /* Media query for small screens */
  @media screen and (max-width: 768px) {
    margin: 10px 0; /* Reduce top and bottom margin for better spacing on small screens */
  }
}
</style>

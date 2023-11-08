<script setup>
import { onMounted, onUnmounted, ref } from "vue";

//firebase
import firebase from "../../../firebase.js";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
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

//hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});

const auth = getAuth();
const user = auth.currentUser;

if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.username;
  console.log("  Provider-specific UID: " + user.uid);
  const email = user.email;
  const photoURL = user.imageUrl;
  const uid = user.uid;
}
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
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-3 mt-n5 me-2"
              :style="{ display: 'inline-block ' }"
            >
              Profile
            </h1>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="user-profile">
    <div v-if="user">
      <h2>You are logged in as: {{ user.email }}</h2>
      <div>
        <img :src="user.imageURL" alt="User Profile Image" />
      </div>
      <div>
        <p>{{ user.description }}</p>
      </div>
      <div>
        <button @click="editProfile">Edit</button>
      </div>
      <div v-if="isEditing">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="editedUser.username" />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea
            id="description"
            v-model="editedUser.description"
          ></textarea>
        </div>
        <div>
          <button @click="saveChanges">Save Changes</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>
  </div>

  <Footer />
</template>

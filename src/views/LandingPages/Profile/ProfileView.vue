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

  <div class="user-profile">
    <div>
      <br /><br />

      <div class="profile-pic-username">
        <h1>{{ username }}</h1>
      </div>

      <br /><br />

      <div class="profile-pic">
        <img
          :src="imageURL"
          alt="No Profile Picture"
          style="object-fit: fill"
        />
      </div>

      <br /><br />

      <div class="profile-pic-description">
        {{ description }}
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.user-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.profile-pic {
  width: 200px;
  height: 200px;
  border-radius: 60%;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  position: relative;
  top: 50px;
  border: 6px solid #fff;
}
</style>

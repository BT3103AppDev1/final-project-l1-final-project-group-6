<script setup>
//firebase
import app from "../../../firebase.js";
import "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//example components
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";

import DefaultFooter from "../../../examples/footers/FooterDefault.vue";
import Header from "../../../examples/Header.vue";

//images
import profile from "@/assets/img/profile.jpg";
library.add(faTrash);
library.add(faPencilAlt);
</script>

<script>
const db = getFirestore(app);
const auth = getAuth();
var userID = "";

onAuthStateChanged(auth, (user) => {
  userID = user.uid;
  //console.log(userID);
});

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      username: "",
      imageURL: "",
      userID: "",
      description: "",
      entity: "",
      email: "",
      followers: 0,
      following: 0,
      saved: [],
      posts: [],
      postNos: [],
      post_requests: [],
      requestNos: [],
      currentTab: "description",
      editingField: null,
    };
  },
  async created() {
    const userRef = doc(db, "users", userID);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      this.username = userData.username;
      this.imageURL = userData.imageUrl;
      this.userID = userData.userID;
      this.description = userData.description;
      this.entity = userData.entity;
      this.email = userData.email;
      this.following = userData.following;
      this.followers = userData.followers;
      this.saved = userData.saved;
      this.posts = userData.posts;
      this.postNos = userData.posts;
      this.post_requests = userData.post_requests;
      this.requestNos = userData.post_requests;
      //console.log(this.posts);

      if (this.username && this.posts && this.posts.length > 0) {
        const postIDs = this.posts;
        const posts = [];

        for (const postID of postIDs) {
          const postRef = doc(this.db, "posts", postID);
          const postDoc = await getDoc(postRef);

          if (postDoc.exists()) {
            const postData = postDoc.data();
            posts.push(postData);
          }
        }

        this.posts = posts;
      }

      if (
        this.username &&
        this.post_requests &&
        this.post_requests.length > 0
      ) {
        const requestTitles = this.post_requests;
        const requests = [];

        for (const title of requestTitles) {
          const requestRef = doc(this.db, "requests", title);
          const requestDoc = await getDoc(requestRef);

          if (requestDoc.exists()) {
            const requestData = requestDoc.data();
            requests.push(requestData);
          }
        }

        this.post_requests = requests;
        console.log("requests", this.post_requests);
        console.log("posts", this.posts);
      }
    }
  },

  methods: {
    showTab(tabName) {
      this.currentTab = tabName;
    },
    redirectToPost(postID) {
      this.$router.push({ name: "postdetails", params: { id: postID } });
    },
    toggleEdit(field) {
      this.editingField = field;
    },
    async saveChanges() {
      // Validate data before saving
      // Update Firestore document
      console.log(this.requestNos);
      try {
        await setDoc(doc(this.db, "users", this.userID), {
          username: this.username,
          imageUrl: this.imageURL,
          userID: this.userID,
          description: this.description,
          entity: this.entity,
          email: this.email,
          followers: this.followers,
          following: this.following,
          saved: this.saved,
          posts: this.postNos,
          post_requests: this.requestNos,
        });
        this.editingField = null; // Exit edit mode
      } catch (error) {
        console.error("Error updating document:", error);
      }
    },
    async deletePost(postID) {
      alert("Deleting Post");
      try {
        await deleteDoc(doc(this.db, "posts", postID));
        this.posts = this.posts.filter((post) => post.postID !== postID);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
    async deleteRequest(postID) {
      alert("Deleting Request");
      try {
        await deleteDoc(doc(this.db, "requests", postID));
        this.post_requests = this.post_requests.filter(
          (request) => request.title !== postID
        );
      } catch (error) {
        console.error("Error deleting request:", error);
      }
    },
  },
};
</script>

<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <DefaultNavbar :sticky="true" />
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

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
    <div class="post-details-container">
      <div class="entity-tabs">
        <div
          :class="{
            'entity-tab': true,
            active: currentTab === 'description',
          }"
          @click="showTab('description')"
        >
          Description
        </div>
        <div
          :class="{ 'entity-tab': true, active: currentTab === 'posts' }"
          @click="showTab('posts')"
        >
          Posts
        </div>
        <div
          :class="{ 'entity-tab': true, active: currentTab === 'contact' }"
          @click="showTab('contact')"
        >
          Contact Us
        </div>
      </div>
      <div v-if="currentTab === 'description'">
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
            <h1 v-if="editingField !== 'imageURL'">Profile Picture</h1>
            <input v-else v-model="imageURL" type="text" />
            <font-awesome-icon
              class="edit-icon"
              :icon="['fas', 'pencil-alt']"
              @click="toggleEdit('imageURL')"
            />
            <button
              class="btn btn-success"
              @click="saveChanges"
              v-if="editingField === 'imageURL'"
            >
              Save
            </button>
          </div>
          <div class="username">
            <h1 v-if="editingField !== 'username'">{{ username }}</h1>
            <input v-else v-model="username" type="text" />
            <font-awesome-icon
              class="edit-icon"
              :icon="['fas', 'pencil-alt']"
              @click="toggleEdit('username')"
            />
          </div>
          <div class="description">
            <h3 v-if="editingField !== 'description'">{{ description }}</h3>
            <textarea v-else v-model="description"></textarea>
            <font-awesome-icon
              class="edit-icon"
              :icon="['fas', 'pencil-alt']"
              @click="toggleEdit('description')"
            />
          </div>
          <button
            class="btn btn-success"
            @click="saveChanges"
            v-if="editingField"
          >
            Save
          </button>

          <!-- <RouterLink :to="{ name: 'editProfile' }">
            <button class="btn btn-success">Edit Profile</button>
          </RouterLink> -->
        </div>
      </div>
    </div>
    <div v-if="currentTab === 'posts'" class="posts-headers">
      <h3>Listed Posts</h3>
      <div v-for="(post, index) in posts" :key="index" class="post-entry">
        <img :src="post.imageUrl" class="post-entry-image" alt="Post image" />
        <div class="post-entry-content">
          <h3>{{ post.title }}</h3>
          <p>{{ post.description }}</p>
          <span class="post-author" @click="redirectToPost(post.postID)"
            >Read More →</span
          >
          <!-- Trash can icon for deleting the post -->
          <div class="trash-icon-container">
            <font-awesome-icon
              :icon="['fas', 'trash']"
              class="delete-icon"
              @click="deletePost(post.postID)"
            />
          </div>
        </div>
      </div>
      <br />
      <h3>Unlisted Requests</h3>
      <div
        v-for="(post, index) in post_requests"
        :key="index"
        class="post-entry"
      >
        <img :src="post.imageUrl" class="post-entry-image" alt="Post image" />
        <div class="post-entry-content">
          <h3>{{ post.title }}</h3>
          <p>
            Organization name: {{ post.organizationName }} | Description:
            {{ post.description }}
          </p>

          <p>
            SDG Country: {{ post.selectedCountry }} | SDG Selection:
            {{ post.selectedSDG }}
          </p>

          <!-- Trash can icon for deleting the post -->
          <div class="trash-icon-container">
            <font-awesome-icon
              :icon="['fas', 'trash']"
              class="delete-icon"
              @click="deleteRequest(post.title)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentTab === 'contact'" class="posts-headers">
      <h3 class="post-content">{{ username }} | {{ entity }}</h3>
      <div class="post-content">
        <p class="post-description">Email: {{ email }}</p>
      </div>
    </div>
  </div>
  <DefaultFooter />
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
  /* font-size: 1.5rem; Adjust font size for small screens */
  font-size: 1.5rem; /* Fixed font size */
  text-align: center;
}

.description {
  text-align: center;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  /* Make the description box wider horizontally */
  min-width: 800px;
  /* width: 100%; Make the description container full width on small screens */

  /* Media query for small screens */
  @media screen and (max-width: 768px) {
    margin: 10px 0; /* Reduce top and bottom margin for better spacing on small screens */
  }
}
.entity-tabs {
  display: flex;
  justify-content: space-between; /* Distributes space evenly */
  align-items: center; /* Aligns items vertically in the center */
  width: 100%; /* Set the width you desire for the entire tab bar */
  min-width: 600px; /* Example fixed max-width for the tab bar */
  max-width: 600px; /* Example fixed max-width for the tab bar */
  margin: 0 auto; /* Centers the tab bar in the parent container */
  padding: 10px 0; /* Adjust padding as needed, but keep top and bottom padding the same for both tabs */
  cursor: pointer;
}

.entity-tab {
  flex: 1; /* This ensures both tabs take up equal space in the container */
  text-align: center;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  color: grey; /* Non-active tab color */
  flex-grow: 1; /* Ensures each tab takes up equal space */
  margin-bottom: 10px;
}

.entity-tab:hover {
  background-color: #f2f2f2; /* Slight background on hover for interactivity */
}

.entity-tab.active {
  border-bottom: 3px solid blue; /* Active tab underline */
  color: black; /* Active tab color */
}
.header-title,
.header-subtitle {
  z-index: 1;
  /* Ensures text is above the overlay and video */
  position: relative;
  color: rgb(10, 0, 0);
}

.header-title {
  font-weight: bold;
  font-size: 4em;
}

.header-subtitle {
  font-size: 1.2em;
  margin-top: -10px;
}

.post-details-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  align-items: center;
  text-align: center;
}

.editable-field {
  display: flex;
  margin-left: 100px;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Adjust width as needed */
}

.edit-icon {
  font-size: 1.25rem; /* This sets the size of the icon */
}

.edit-icon:hover {
  font-size: 1.5rem; /* This sets the size of the icon */
  cursor: pointer;
}

.post-card {
  background: #fafafa;
  /* Light grey background */
  border-radius: 16px;
  /* Softer corners */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  /* More subtle shadow */
  overflow: hidden;
  margin-bottom: 2rem;
  /* Adds space below the card */
}

.image-container {
  width: 100%;
  padding-top: 56.25%;

  /* 16:9 Aspect Ratio */
  position: relative;
}

.post-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* This will cover the area without stretching the image */
  border-radius: 4px 4px 0 0;
}

.post-content {
  padding: 2rem;
}

.post-title {
  font-family: "Nunito", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 700;
  /* Bold font weight for the title */
  color: #333;
  margin-bottom: 1rem;
  /* More space below the title */
}

.post-meta {
  font-size: 0.95em;
  color: #666;
  margin-bottom: 1.5rem;
}

.post-description {
  font-family: "Nunito", Arial, sans-serif;
  line-height: 1.8;
  /* Increased line height for readability */
  color: #444;
}

.posts-container {
  display: flex;
  flex-direction: column;
}

.post-entry {
  display: flex;
  align-items: center; /* Align items vertically */
  margin-bottom: 1rem; /* Space between entries */
  background: #fafafa; /* Light grey background */
  border-radius: 16px; /* Softer corners */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05); /* Subtle shadow */
  overflow: hidden;
  position: relative;
  justify-content: space-between; /* This will align children to each end */
}

.trash-icon-container {
  margin-left: auto; /* Pushes the icon to the right */
}

.delete-icon {
  font-size: 1.5rem; /* Increases the size of the icon */
  cursor: pointer; /* Changes the cursor to a pointer when hovering over the icon */
}

.post-entry-image {
  width: 120px; /* Adjust size as needed */
  height: 120px; /* Adjust size as needed */
  object-fit: cover;
  border-top-left-radius: 16px; /* Rounded corners on the image */
  border-bottom-left-radius: 16px; /* Rounded corners on the image */
}

.post-entry-content {
  padding: 1rem;
  flex-grow: 1; /* Take up remaining space */
}

.post-author {
  color: blue;
  cursor: pointer;
}

.post-author:hover {
  text-decoration: underline;
}

/* Style your 'Read more' link to match the design */
.router-link {
  color: blue;
  text-decoration: none;
}

.router-link:hover {
  text-decoration: underline;
}
</style>

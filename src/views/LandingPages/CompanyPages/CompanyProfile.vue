<script setup>
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../../examples/footers/FooterDefault.vue";
</script>

<script>
import firebaseApp from "../../../firebase.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

export default {
  data() {
    return {
      db: getFirestore(firebaseApp),
      user: {},
      posts: {},
      currentTab: "description",
    };
  },
  async created() {
    const userId = this.$route.params.id;

    try {
      const userRef = doc(this.db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        this.user = userDoc.data();
      } else {
        console.error("No such user!");
      }

      if (this.user && this.user.posts && this.user.posts.length > 0) {
        const postIds = this.user.posts;
        const posts = [];

        for (const postId of postIds) {
          const postQuery = query(
            collection(this.db, "posts"),
            where("postID", "==", postId)
          );
          const postSnapshot = await getDocs(postQuery);

          if (!postSnapshot.empty) {
            posts.push(postSnapshot.docs[0].data());
          }
        }

        this.posts = posts;
      }
    } catch (error) {
      console.error("Error fetching user and post details:", error);
    }
  },

  methods: {
    showTab(tabName) {
      this.currentTab = tabName;
    },
    redirectToPost(postID) {
      this.$router.push({ name: "postdetails", params: { id: postID } });
    },
    sendEmail() {
      const mailtoLink = `mailto:${this.user.email}`;
      window.location.href = mailtoLink;
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
  <div class="page-header">
    <video autoplay loop muted playsinline class="globe-video">
      <source src="../../../data/video2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <span class="mask bg-gradient-dark opacity-3"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center mx-auto my-auto">
          <h1 class="text-white header-title">
            Entity Information<span id="typed"></span>
          </h1>
          <p class="text-white header-subtitle">
            The better we know each other, the more we love each other
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
    <div class="post-details-container">
      <!-- <div class="post-card"> -->
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
        <div class="image-container">
          <img :src="user.imageUrl" alt="Post Image" class="post-image" />
        </div>
        <div class="post-content">
          <h1 class="post-title">{{ user.username }} | {{ user.entity }}</h1>
          <div class="post-meta">
            <span class="post-entity">{{ user.followers }} followers</span> |
            <span class="post-entity">{{ user.following }} following</span>
          </div>
          <p class="post-description">{{ user.description }}</p>
        </div>
      </div>
      <div v-if="currentTab === 'posts'">
        <div v-for="(post, index) in posts" :key="index" class="post-entry">
          <img :src="post.imageUrl" class="post-entry-image" alt="Post image" />
          <div class="post-entry-content">
            <h3>{{ post.title }}</h3>
            <p>{{ post.description }}</p>
            <span class="post-author" @click="redirectToPost(post.postID)"
              >Read More →</span
            >
          </div>
        </div>
      </div>
      <div v-if="currentTab === 'contact'">
        <h3 class="post-title">{{ user.username }} | {{ user.entity }}</h3>
        <div class="post-content">
          <p class="post-description">Email: {{ user.email }}</p>
          <button class="btn btn-success" @click="sendEmail">
            Contact {{ user.username }}
          </button>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
  <DefaultFooter />
</template>

<style scoped>
.counter-container {
  min-width: max-content;
  white-space: normal;
  /* Allow text to wrap onto the next line */
}

/* Additional CSS to ensure text fits within containers */
.col {
  word-wrap: break-word;
  /* Allow long words to be broken and continue on the next line */
}

.container.my-5 {
  margin-bottom: 3rem !important;
  /* Adjust the margin-bottom value to create more space between the containers */
}

.card.card-body {
  margin-top: 2rem;
  /* Add margin at the top to create space between this container and the one above */
}

/* Header */
.page-header {
  position: relative;
  width: 100%;
  /* Make sure the header is full width */
  height: 50vh;
  /* Adjust the height as needed */
  overflow: hidden;
  /* This will contain the video within the header */
}

.globe-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* This will cover the full area, potentially cropping the video */
  object-position: center 50%;
  /* Center the video in the container */
  position: absolute;
  top: 50;
  z-index: -1;
  /* Keep the video behind other content */
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* Dark overlay */
  z-index: 0;
  /* Above the video but below the text */
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

/* Button container for grouping and alignment */
.button-container {
  display: flex;
  justify-content: start;
  /* Align buttons to the start */
  gap: 10px;
  /* Space between buttons */
  margin-bottom: 20px;
}

.back-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  color: white;
  /* Common text color for contrast */
}

/* Style for the first button */
.back-button:first-child {
  background-color: #007bff;
  /* Blue color */
}

/* Style for the second button */
.back-button:nth-child(2) {
  background-color: #28a745;
  /* Green color */
}

/* Hover effect for both buttons */
.back-button:hover {
  transform: translateY(-2px);
  /* Lift button slightly on hover */
}

/* Specific hover colors for each button */
.back-button:first-child:hover {
  background-color: #0056b3;
  /* Darker blue on hover */
}

.back-button:nth-child(2):hover {
  background-color: #218838;
  /* Darker green on hover */
}

.star-button {
  background: none;
  border: none;
  font-size: 1.5em;
  /* Adjust size as needed */
  color: #ffd700;
  /* Gold color for the star */
  cursor: pointer;
}

.star-button:hover {
  color: #ffac33;
  /* A lighter gold color on hover */
}
</style>

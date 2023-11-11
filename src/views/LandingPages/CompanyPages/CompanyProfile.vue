<!-- eslint-disable prettier/prettier -->
<script setup>
// example components
import DefaultNavbar from '../../../examples/navbars/NavbarDefault.vue';
</script>

<script>
import firebaseApp from '../../../firebase.js';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export default {

  data() {
    return {
      db: getFirestore(firebaseApp),
      post: {}, // will store the detailed post data
      isSaved: false // To track whether the post is saved
    };
  },
  async created() {
    const userId = this.$route.params.id;
    console.log(this.$route.params.id)
    // Fetch the post details using the postId
    try {
      const postRef = doc(this.db, 'users', userId);
      const postDoc = await getDoc(postRef);

      if (postDoc.exists()) {
        this.post = postDoc.data();
      } else {
        console.error('No such post!');
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
    //console.log(this.post)

  },
  methods: {}
};
</script>

<template>
  <DefaultNavbar transparent />
  <div class="page-header">
    <video autoplay loop muted playsinline class="globe-video">
      <source src="../../../data/video2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <span class="mask bg-gradient-dark opacity-3"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center mx-auto my-auto">
          <h1 class="text-white header-title">Entity Information<span id="typed"></span></h1>
          <p class="text-white header-subtitle">Knowledge is Power!</p>
        </div>
      </div>
    </div>
  </div>

  <div class="post-details-container">

    <div class="post-card">
      <div class="image-container">
        <img :src="post.imageUrl" alt="Post Image" class="post-image" />
      </div>
      <div class="post-content">
        <h1 class="post-title">{{ post.username }}</h1>
        <h1 class="post-title">{{ post.entity }}</h1>
        <div class="post-meta">
          <span class="post-author">{{ post.followers }} followers</span> |
          <span class="post-entity">{{ post.following }} following</span>
        </div>
        <p class="post-description">{{ post.description }}</p>
      </div>
    </div>
  </div>
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
  font-family: 'Nunito', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
  font-family: 'Nunito', Arial, sans-serif;
  line-height: 1.8;
  /* Increased line height for readability */
  color: #444;
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
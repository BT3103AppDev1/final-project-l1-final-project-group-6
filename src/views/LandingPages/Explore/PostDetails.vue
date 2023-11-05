<template>
  <div class="post-details-container">
    <button @click="goBack" class="back-button">← Back to Explore Page</button>

    <img :src="post.imageUrl" alt="Post Image" class="post-image" />
    <h1 class="post-title">{{ post.title }}</h1>
    <div class="company-entity">{{ post.username }} | {{ post.entity }}</div>
    <p class="post-description">{{ post.description }}</p>
    <!-- You can add more details here as needed -->
  </div>
</template>

<script>
import firebaseApp from "../../../firebase.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      db: getFirestore(firebaseApp),
      post: {}, // will store the detailed post data
    };
  },
  async created() {
    const postId = this.$route.params.id;

    // Fetch the post details using the postId
    try {
      const postRef = doc(this.db, "posts", postId);
      const postDoc = await getDoc(postRef);

      if (postDoc.exists()) {
        this.post = postDoc.data();
      } else {
        console.error("No such post!");
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: "saved" });
    },
  },
};
</script>

<style scoped>
/* Style as needed */
</style>
<template>
  <div class="post-details-container">
    <div class="button-container">
      <button @click="goBackExplore" class="back-button">← Back to Explore Posts</button>
      <button @click="goBack" class="back-button">← Back to Saved Posts</button>
    </div>
    <div class="post-card">
      <img :src="post.imageUrl" alt="Post Image" class="post-image" />
      <div class="post-content">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-author">{{ post.username }}</span> |
          <span class="post-entity">{{ post.entity }}</span>
        </div>
        <p class="post-description">{{ post.description }}</p>
      </div>
    </div>
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
    goBackExplore() {
      this.$router.push({ name: "explore" });
    },
  },
};
</script>

<style scoped>
.post-details-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.post-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: auto;
  border-radius: 4px 4px 0 0;
}

.post-content {
  padding: 20px;
}

.post-title {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  margin-bottom: 10px;
}

.post-meta {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 20px;
}

.post-description {
  font-family: 'Open Sans', Arial, sans-serif;
  line-height: 1.6;
  color: #444;
}

/* Button container for grouping and alignment */
.button-container {
  display: flex;
  justify-content: start; /* Align buttons to the start */
  gap: 10px; /* Space between buttons */
  margin-bottom: 20px;
}

.back-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  color: white; /* Common text color for contrast */
}

/* Style for the first button */
.back-button:first-child {
  background-color: #007bff; /* Blue color */
}

/* Style for the second button */
.back-button:last-child {
  background-color: #28a745; /* Green color */
}

/* Hover effect for both buttons */
.back-button:hover {
  transform: translateY(-2px); /* Lift button slightly on hover */
}

/* Specific hover colors for each button */
.back-button:first-child:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.back-button:last-child:hover {
  background-color: #218838; /* Darker green on hover */
}
</style>
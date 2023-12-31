<script>
import firebaseApp from "../../../../firebase.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
var userID = "";

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in. Access the UID.
    userID = user.uid;
    console.log(userID);
  }
});

export default {
  data() {
    return {
      db: getFirestore(firebaseApp),
      userID: userID,
      savedPosts: [],
    };
  },
  mounted() {
    this.fetchSavedPosts();
  },
  methods: {
    async fetchSavedPosts() {
      try {
        const userSavedRef = doc(this.db, "users", this.userID.toString());
        const userSavedDoc = await getDoc(userSavedRef);

        if (userSavedDoc.exists()) {
          const savedData = userSavedDoc.data();
          //console.log(savedData);
          if (savedData && savedData.saved && savedData.saved.length > 0) {
            const postIDs = savedData.saved;
            const posts = [];
            console.log(postIDs);

            for (const postID of postIDs) {
              const postRef = doc(this.db, "posts", postID);
              const postDoc = await getDoc(postRef);

              if (postDoc.exists()) {
                const postData = postDoc.data();
                posts.push(postData);
              }
            }

            this.savedPosts = posts;
            console.log(this.savedPosts);
          }
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    },
    redirectToPostDetails(postID) {
      this.$router.push({ name: "postdetails", params: { id: postID } });
    },
  },
};
</script>

<template>
  <div class="card-container">
    <div class="post-card" v-for="(post, index) in savedPosts" :key="index">
      <img :src="post.imageUrl" alt="Post Image" class="post-image" />
      <h2 class="post-title">{{ post.title }}</h2>
      <div class="company-entity">{{ post.username }} | {{ post.entity }}</div>
      <p class="post-description">{{ post.description }}</p>
      <button class="read-more" @click="redirectToPostDetails(post.postID)">
        Read more
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Container for the post cards */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 40px;
  /* Add a gap between the cards */
  margin-left: 40px;
  margin-top: 40px;
}

/* Individual post card styling */
.post-card {
  width: 250px;
  /* Make the cards slightly wider */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: #fff;
  /* Add these for flex layout */
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-10px);
}

/* Standardize the image size */
.post-card img {
  width: 100%;
  height: 150px;
  /* Adjust this value to match the desired height */
  object-fit: cover;
  /* Ensure the image covers the given space without stretching */
}

/* Adjust the title font size */
.post-card h2 {
  font-size: 15px;
  /* Reduce the font size */
  margin: 16px 16px;
}

.post-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.post-title {
  font-size: 20px;
  font-weight: bold;
  margin: 16px;
  /* You can adjust margins as needed */
}

.post-description {
  font-size: 10px;
  margin: 0 16px 16px;
  /* Margins to space out the text and button */
  flex-grow: 1;
  /* This will ensure that the space expands pushing the button to the bottom */
}

.read-more {
  display: block;
  width: 100%;
  /* Full width button */
  background-color: #007bff;
  /* Change this to match your theme color */
  color: white;
  padding: 12px;
  border: none;
  font-size: 13px;
  border-radius: 0 0 16px 16px;
  /* Rounded corners to match the card */
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.read-more:hover {
  background-color: #0056b3;
  /* Darker shade for hover */
}

.company-entity {
  font-size: 12px;
  /* Adjust to fit your design */
  font-weight: 500;
  /* Semi-bold, can be adjusted */
  color: #333;
  /* Adjust color as needed */
  margin: 8px 16px;
  /* Spacing between title and description */
}
</style>

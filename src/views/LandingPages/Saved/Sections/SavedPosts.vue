<script>
import TransparentBlogCard from "../../../../examples/cards/blogCards/TransparentBlogCard.vue";
import firebaseApp from "../../../../firebase.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { ref } from "vue";
import post1 from "@/assets/img/examples/testimonial-6-2.jpg";

export default {
  data() {
    return {
      db: getFirestore(firebaseApp),
      userID: 1,
      savedPosts: [],
    };
  },
  mounted() {
    this.fetchSavedPosts();
  },
  methods: {
    async fetchSavedPosts() {
      try {
        const userSavedRef = doc(this.db, "saved", this.userID.toString());
        const userSavedDoc = await getDoc(userSavedRef);

        if (userSavedDoc.exists()) {
          const savedData = userSavedDoc.data();
          //console.log(savedData);
          if (savedData && savedData.postID && savedData.postID.length > 0) {
            const postIds = savedData.postID;
            const posts = [];

            for (const postId of postIds) {
              const postQuery = query(
                collection(this.db, "posts"),
                where("postID", "==", postId)
              );
              const postSnapshot = await getDocs(postQuery);
              //console.log(postSnapshot.docs[0].data());

              if (!postSnapshot.empty) {
                posts.push(postSnapshot.docs[0].data());
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
  },
};
</script>

<template>
  <section class="py-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <h3 class="mb-5">Saved posts:</h3>
        </div>
      </div>
      <div class="row">
        <div
          v-for="(post, index) in savedPosts"
          :key="index"
          class="col-lg-3 col-sm-6"
        >
          <h2>{{ post.title }}</h2>
          <h2>{{ post.username }}</h2>
          <h2>{{ post.comment }}</h2>
          <h2>{{ post.category }}</h2>
          <h2>{{ post.entity }}</h2>
          <h2>{{ post.comment }}</h2>
        </div>
      </div>
    </div>
  </section>
</template>


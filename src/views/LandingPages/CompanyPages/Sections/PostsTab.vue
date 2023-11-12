<template>
  <div>
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
</template>

<script>
export default {
  props: {
    posts: Array, // Pass the posts array as a prop
  },
  methods: {
    redirectToPost(postID) {
      this.$emit("redirect", postID); // Emit an event to handle redirection in the parent component
    },
  },
};
</script>

<style scoped>
/* Your Posts tab styles here */
</style>

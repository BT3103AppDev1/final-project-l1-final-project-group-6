<template>
    <div class="post-card">
        <img :src="post.imageUrl" class="post-image" alt="Post Image" />

        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-author">{{ post.username }} | {{ post.entity }}</p>
        <p class="post-description">{{ post.description }}</p>

        <button class="read-more" @click="redirectToPost">Read More</button>
    </div>
</template>

<script>
export default {
    props: ['post'],
    methods: {
        redirectToPost() {
            this.$router.push({ name: 'postdetails', params: { id: this.post.postID } });
        }
    }
};
</script>

<style scoped>
.post-card {
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 350px; /* Set a fixed height for the card */
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    background-color: #fff;
    margin-bottom: 20px; /* Adjust margin as needed */
}

.post-card:hover {
    transform: translateY(-10px);
}

.post-image {
    width: 100%;
    height: 150px; /* Set a fixed height for the image */
    object-fit: cover;
    border-radius: 10px 10px 0 0; /* Adjust border-radius to match card */
}

.post-card h2 {
    font-size: 15px;
    font-weight: bold;
    margin: 16px;
}

.post-author {
    font-size: 12px;
    font-weight: 500;
    color: #333;
    margin: 8px 16px;
}

.post-description {
    font-size: 10px;
    margin: 0 16px 16px;
    flex-grow: 1;
}

.read-more {
    display: block;
    width: 100%;
    background-color: #007bff;
    color: white;
    padding: 12px;
    border: none;
    font-size: 13px;
    border-radius: 0 0 10px 10px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s;
}

.read-more:hover {
    background-color: #0056b3;
}
</style>
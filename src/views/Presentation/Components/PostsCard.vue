<template>
    <div class="post">
        <img :src="post.imageUrl" class="post-image" alt="Post Image" />

        <h3 class="post-title">{{ post.title }}</h3>
        <p class="post-author">{{ post.username }} | {{ post.entity }}</p>
        <p class="post-description">{{ post.description }}</p>
        <div class="card-footer">
            <button class="btn btn-success read-more">Read More</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['post']
};
</script>

<style scoped>
.post {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    /* align-items: center;
    text-align: center; */
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
    margin: 10px;
    height: 100%;
    /* flex: 0 0 30%; */
}

.post-image {
    border-radius: 10px;
    max-width: 100%;
    max-height: 150px; /* Set a fixed height for the image */
}
.post-image img {
    width: auto;
    height: 100%;
    object-fit: cover;
}
.post-title {
    font-size: 1.25rem;
    margin: 10px 0;
}

.post-author {
    color: #888;
    margin: 0;
}

.post-description {
    flex-grow: 1; /* Expand to fill remaining vertical space */
    margin: 10px;
}
</style>

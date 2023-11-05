<template>
    <div class="card-container">
        <img :src="post.imageUrl" class="card-img-top" alt="Post Image" />
        <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.username }} | {{ post.entity }}</p>
            <p class="card-text description">{{ post.description }}</p>
        </div>
        <div class="card-footer">
            <button class="btn btn-success btn-sm">Read More</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['post']
};
</script>

<style scoped>
.card-container {
    /* display: flex; */
    /* flex-wrap: wrap; */
    justify-content: space-evenly;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
}

.card-body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1;
}

img {
    width: fit-content;
    height: 100%;
    object-fit: cover;
}

.card-footer {
    padding: 8px;
    display: flex;
    justify-content: flex-end;
}

.description {
    margin: 0 16px 16px;
}
</style>

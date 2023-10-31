<template>
    <div class="card">
        <img :src="post.imageURL" class="card-img-top" alt="Post Image" />
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
.card {
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1;
}

.card img {
    width: 100%;
    height: auto;
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

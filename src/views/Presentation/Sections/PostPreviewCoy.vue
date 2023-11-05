<script>
import getRecentPosts from './Data/getPreviewPosts.js';
import PostsCard from '../Components/PostsCard.vue';

export default {
    data() {
        return {
            previewPosts: []
        };
    },
    methods: {
        getPosts() {
            getRecentPosts('Company').then((data) => {
                console.log(data);
                // Update the previewPosts data property with the fetched data
                this.previewPosts = data;
            });
        }
    },
    created() {
        this.getPosts(); // Call the getPosts method when the component is created
    },
    components: {
        PostsCard
    }
};
</script>

<template>
    <div class="container rounded border border-secondary border-2 py-3">
        <div class="column mx-4">
            <div class="title">
                <h2>Recent Company Posts</h2>
            </div>
            <div class="card-container row justify-content-between mb-3">
                <PostsCard
                    v-for="(post, index) in previewPosts"
                    :post="post"
                    :key="index"
                ></PostsCard>
            </div>
            <div class="justify-content-center row">
                <button class="btn btn-success">View More</button>
                <button @click="getPosts">Test me</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 30%;
    height: 200px;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
}
.card-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
}
</style>

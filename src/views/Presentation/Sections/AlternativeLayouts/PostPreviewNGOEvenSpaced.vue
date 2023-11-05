<!-- THIS SPACES RECENT POSTS OUT EVENLY, INSTEAD OF RESERVING WHITESPACE IF < 3 POSTS -->

<script>
import getRecentPosts from './Data/getPreviewPosts.js';
import PostsCard from '../Components/PostsCard.vue';

export default {
    components: {
        PostsCard
    },
    data() {
        return {
            previewPosts: [],
            numPosts: 3
        };
    },
    methods: {
        getPosts() {
            getRecentPosts('NGO').then((data) => {
                console.log(data);
                // Update the previewPosts data property with the fetched data
                this.previewPosts = data;
            });
        }
    },
    created() {
        this.getPosts(); // Call the getPosts method when the component is created
    },
    computed: {
        visiblePosts() {
            return this.previewPosts.slice(0, this.numPosts);
        }
    }
};
</script>

<template>
    <div class="parent-container">
        <div class="header">
            <h2>Recent Posts</h2>
        </div>

        <div class="post-container">
            <div class="post" v-for="post in visiblePosts" :key="post.id">
                <PostsCard :post="post" />
            </div>
        </div>

        <button class="btn btn-success view-more">View More</button>
    </div>
</template>

<style scoped>
.parent-container {
    border: 1px solid grey;
    border-radius: 10px;
    padding: 20px;
    width: 95%; /* Adjust the width as needed */
    margin: 0 auto;
    text-align: center;
}

.header {
    text-align: left;
    margin-bottom: 20px;
}

.post-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    margin: 0 -10px; /* Add negative margin to offset Bootstrap column gutters */
}

.post {
    flex: 0 0 30%; /* Each post occupies 30% of the container */
    padding: 10px; /* Add padding to create gaps between posts */
}

.view-more {
    width: 100%;
    margin-top: 20px;
}
</style>

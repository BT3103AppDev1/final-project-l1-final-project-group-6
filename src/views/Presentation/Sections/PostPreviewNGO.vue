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
    <div class="parent">
        <div class="title">
            <h2>Recent NGO Posts</h2>
        </div>
        <div class="post-container">
            <div v-for="(post, index) in visiblePosts" :key="index" class="post-list-item">
                <PostsCard :post="post" />
            </div>

            <div v-for="n in numPosts - visiblePosts.length" :key="n" class="post-list-item"></div>
        </div>
        <div class="view-more">
            <button class="btn btn-success view-btn">View More</button>
        </div>
    </div>
</template>

<style scoped>
.parent {
    border: 1px solid grey;
    border-radius: 10px;
    padding: 1em 1em 0 1em;
    width: 95%;
    margin: 0 auto;
    text-align: center;
}

.title {
    text-align: left;
}
.post-container {
    display: flex;
    justify-content: space-between;
}

.post-list-item {
    flex: 0 0 calc(33.33% - 20px); /* Adjust for margins */
    padding: 10px;
}

.view-more {
    text-align: center;
    margin-top: 18px; /* Add spacing between posts and the button */
}
</style>

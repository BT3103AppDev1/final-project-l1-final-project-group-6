<script>
import getRecentPosts from './Data/getPreviewPosts.js';
import PostsCard from '../Components/PostsCard.vue';

export default {
    components: {
        PostsCard
    },
    props: {
        entityType: {
            type: String,
            required: true,
            validator: (value) => {
                return ['Company', 'NGO'].includes(value);
            }
        }
    },
    data() {
        return {
            previewPosts: [],
            numPosts: 4,
            entityLowerCase: this.entityType.toLowerCase()
        };
    },
    methods: {
        getPosts() {
            getRecentPosts(this.entityType).then((data) => {
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
        },
        containerRoute() {
            return `#${this.entityLowerCase}Container`;
        }
    }
};
</script>

<template>
    <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-4 mb-4">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="header-title pt-4" style="margin-top: -30px">
                        Recent {{ this.entityType }} Posts
                    </h2>
                </div>
            </div>
        </div>

        <div class="card-container">
            <div v-for="(post, index) in visiblePosts" :key="index" class="post-list-item">
                <PostsCard :post="post" />
            </div>
        </div>
        <div class="view-more">
            <RouterLink :to="{ path: '/pages/landing-pages/explore', hash: containerRoute }">
                <button class="btn btn-success view-btn">View More</button>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 40px; /* Add a gap between the cards */
    margin-left: 40px;
    margin-top: 40px;
}
.container.my-5 {
    margin-bottom: 3rem !important; /* Adjust the margin-bottom value to create more space between the containers */
}

.card.card-body {
    margin-top: 2rem; /* Add margin at the top to create space between this container and the one above */
}

.header-title {
    font-weight: bold;
    font-size: 3em;
}
.view-more {
    text-align: center;
    margin-top: 18px; /* Add spacing between posts and the button */
}
</style>

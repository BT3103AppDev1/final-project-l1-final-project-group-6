<script setup>
// Vue Material Kit 2 component
import MaterialInput from '@/components/MaterialInput.vue';
</script>

<script>
import DefaultNavbar from '../../../examples/navbars/NavbarDefault.vue';
import Header from '../../../examples/Header.vue';
import Posts from './Sections/SavedPosts.vue';
import counter from 'vue3-autocounter';
import VueMultiselect from 'vue-multiselect';
import DefaultFooter from '../../../examples/footers/FooterDefault.vue';

export default {
    components: {
        DefaultNavbar,
        Header,
        DefaultFooter,
        Posts, // This is your Posts component
        counter,
        VueMultiselect
    },
    data: () => ({
        experienceTitle: 'Number of NGOs',
        githubTitle: 'Number of Companies',
        feedbackTitle: 'Years of Partnership',
        projectsTitle: 'Number of Partnerships'
    }),

    data() {
        return {
            filter: { // object will be passed to the Posts component to filter accordingly
                title: null,
                category: [],
                entityName: null,
                countryName: [],
                sdg: []
            },
            sdgOptions: [
                { name: 'SDG 1 - No Poverty' },
                { name: 'SDG 2 - Zero Hunger' },
                { name: 'SDG 3 - Good Health and Well-being' },
                { name: 'SDG 4 - Quality Education' },
                { name: 'SDG 5 - Gender Equality' },
                { name: 'SDG 6 - Clean Water and Sanitation' },
                { name: 'SDG 7 - Affordable and Clean Energy' },
                { name: 'SDG 8 - Decent Work and Economic Growth' },
                { name: 'SDG 9 - Industry, Innovation and Infrastructure' },
                { name: 'SDG 10 - Reduced Inequality' },
                { name: 'SDG 11 - Sustainable Cities and Communities' },
                { name: 'SDG 12 - Responsible Consumption and Production' },
                { name: 'SDG 13 - Climate Action' },
                { name: 'SDG 14 - Life Below Water' },
                { name: 'SDG 15 - Life on Land' },
                { name: 'SDG 16 - Peace and Justice Strong Institutions' },
                { name: 'SDG 17 - Partnerships to achieve the Goal' }
            ],
            countryOptions: [
                { name: 'Afghanistan' },
                { name: 'Bahrain' },
                { name: 'Bangladesh' },
                { name: 'Brunei' },
                { name: 'Cambodia' },
                { name: 'China' },
                { name: 'India' },
                { name: 'Indonesia' },
                { name: 'Iraq' },
                { name: 'Israel' },
                { name: 'Japan' },
                { name: 'Laos' },
                { name: 'Malaysia' },
                { name: 'Myanmar' },
                { name: 'Pakistan' },
                { name: 'Philippines' },
                { name: 'Saudi Arabia' },
                { name: 'Singapore' },
                { name: 'South Korea' },
                { name: 'Vietnam' }
            ],
            categoryOptions: [{ name: 'Financial' }, { name: 'Non-Financial' }]
        };
    },
    methods: {
        handleCounterFinished() {
            console.log('Counting finished!');
            // You can perform any actions you want here
        },
        updateFilterTitle(event) {
            this.filter.title = event.target.value;
        },
        updateFilterEntityName(event) {
            this.filter.entityName = event.target.value;
        },
    }
};
</script>

<template>
    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                <DefaultNavbar :sticky="true" />
            </div>
        </div>
    </div>

    <Header>
        <div class="page-header" :style="headerStyle">
            <video autoplay loop muted playsinline class="globe-video">
                <source src="../../../data/video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <span class="mask bg-gradient-dark opacity-2"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center mx-auto my-auto">
                        <h1 class="text-white header-title">Explore<span id="typed"></span></h1>
                        <p class="text-white header-subtitle">The world within reach</p>
                    </div>
                </div>
            </div>
        </div>
    </Header>

    <br/>
    <!-- Above the filter-container -->
<div class="search-container">
    <MaterialInput 
        class="input-group-dynamic "
        @input="updateFilterTitle"
        placeholder="Search by post title"
        icon="search"
    />
<br>
    <MaterialInput 
        class="input-group-dynamic "
        @input="updateFilterEntityName"
        placeholder="Search by entity name"
        icon="search"
    />
</div>

    <!-- Filter for all posts -->
    <div class="filter-container">
        <div class="sdg-filter">
            <VueMultiselect
                v-model="filter.sdg"
                :options="sdgOptions"
                :multiple="true"
                :close-on-select="false"
                placeholder="Select SDGs"
                label="name"
                track-by="name"
            />
        </div>

        <div class="country-filter">
            <VueMultiselect
                v-model="filter.countryName"
                :options="countryOptions"
                :multiple="true"
                :close-on-select="false"
                placeholder="Select Countries"
                label="name"
                track-by="name"
            />
        </div>
        
        <div class="category-filter">
            <VueMultiselect
                v-model="filter.category"
                :options="categoryOptions"
                :multiple="true"
                :close-on-select="true"
                placeholder="Select Categories"
                label="name"
                track-by="name"
            />
        </div>
    </div>

    <div>
        <!-- Container for NGOs -->
        <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-4 mb-4">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="header-title" style="margin-top: -30px">NGOs</h2>
                    </div>
                </div>
            </div>
            <Posts category="NGO" :filter="filter" />
        </div>

        <!-- Container for Companies -->
        <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-4 mb-4">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="header-title">Companies</h2>
                    </div>
                </div>
            </div>
            <Posts category="Company" :filter="filter" />
        </div>
    </div>

    <!-- Code for footer -->
    <DefaultFooter />
</template>

<style scoped>
.counter-container {
    min-width: max-content;
    white-space: normal; /* Allow text to wrap onto the next line */
}

/* Additional CSS to ensure text fits within containers */
.col {
    word-wrap: break-word; /* Allow long words to be broken and continue on the next line */
}

.container.my-5 {
    margin-bottom: 3rem !important; /* Adjust the margin-bottom value to create more space between the containers */
}

.card.card-body {
    margin-top: 2rem; /* Add margin at the top to create space between this container and the one above */
}

/* Header */
.page-header {
    position: relative;
    width: 100%; /* Make sure the header is full width */
    height: 50vh; /* Adjust the height as needed */
    overflow: hidden; /* This will contain the video within the header */
}

.globe-video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* This will cover the full area, potentially cropping the video */
    object-position: center 35%; /* Center the video in the container */
    position: absolute;
    top: 50;
    z-index: -1; /* Keep the video behind other content */
}

.mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
    z-index: 0; /* Above the video but below the text */
}

.header-title,
.header-subtitle {
    z-index: 1; /* Ensures text is above the overlay and video */
    position: relative;
    color: rgb(10, 0, 0);
}

.header-title {
    font-weight: bold;
    font-size: 4em;
}

.header-subtitle {
    font-size: 1.2em;
    margin-top: -10px;
}

.search-container {
    /* display: flex; */
    justify-content: center; /* Centers the search bar horizontally */
    margin-top: 2rem; /* Adds space above the search bar */
    margin-bottom: 2rem; /* Adds space below the search bar */
    padding-left: 150px; /* Added padding to ensure it doesn't touch the screen edge */
    padding-right: 150px; /* Added padding to ensure it doesn't touch the screen edge */
}


.input-group-dynamic {
    width: 100%; /* Make the width full inside its container */
    max-width: 500px; /* Maximum width of the search input */
    margin: 0 auto; /* Centers the element horizontally */
    
}

/* This will ensure that the container for the search and filter uses flexbox to align its children */
.filter-container {
    display: flex;
    justify-content: center; /* Centers items horizontally */
    align-items: center; /* Centers items vertically */
    flex-wrap: wrap; /* Allows items to wrap on smaller screens */
}

.sdg-filter {
    margin-left: 15px;
}

.country-filter {
    margin-left: 15px;
}
.category-filter {
    margin-left: 15px;
}

</style>

<!-- Used to style the multiselect component. DO NOT REMOVE -->
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

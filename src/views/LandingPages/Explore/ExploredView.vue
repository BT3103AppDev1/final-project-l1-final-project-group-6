<script setup>
// Vue Material Kit 2 component
import MaterialInput from '@/components/MaterialInput.vue';
</script>

<script>
import DefaultNavbar from '../../../examples/navbars/NavbarDefault.vue';
import Header from '../../../examples/Header.vue';
import Footer from './Sections/SavedFooter.vue';
import Posts from './Sections/SavedPosts.vue';
import counter from 'vue3-autocounter';
import VueMultiselect from 'vue-multiselect';

export default {
    components: {
        DefaultNavbar,
        Header,
        Footer,
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
            filter: {
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
        }
    }
};
</script>

<template>
    <DefaultNavbar transparent />

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

    <!-- Metrics Banner -->
    <!-- <div class="container my-6">
        <div class="row">
            <div class="col text-center d-flex flex-column align-items-center">
                <counter
                    ref="counter"
                    :startAmount="0"
                    :endAmount="2000"
                    suffix="+"
                    :duration="5"
                    :autoinit="true"
                    @finished="handleCounterFinished"
                    class="font-general-medium text-4xl font-bold text-secondary-dark dark:text-secondary-light mb-2"
                    aria-label="About Status Counter"
                    style="margin-top: -40px"
                />
                <span
                    class="text-md text-ternary-dark dark:text-ternary-light"
                    style="margin-top: -10px"
                >
                    {{ experienceTitle }}
                </span>
            </div>

            <div class="col text-center d-flex flex-column align-items-center">
                <counter
                    ref="counter"
                    :startAmount="0"
                    :endAmount="1500"
                    suffix="+"
                    :duration="5"
                    :autoinit="true"
                    @finished="handleCounterFinished"
                    class="font-general-medium text-4xl font-bold text-secondary-dark dark:text-secondary-light mb-2"
                    style="margin-top: -40px"
                />
                <span
                    class="block text-md text-ternary-dark dark:text-ternary-light"
                    style="margin-top: -10px"
                    >{{ githubTitle }}</span
                >
            </div>

            <div class="col text-center d-flex flex-column align-items-center">
                <counter
                    ref="counter"
                    :startAmount="0"
                    :endAmount="5"
                    suffix="+"
                    :duration="5"
                    :autoinit="true"
                    @finished="handleCounterFinished"
                    class="font-general-medium text-4xl font-bold text-secondary-dark dark:text-secondary-light mb-2"
                    style="margin-top: -40px"
                />
                <span
                    class="block text-md text-ternary-dark dark:text-ternary-light"
                    style="margin-top: -10px"
                >
                    {{ feedbackTitle }}
                </span>
            </div>

            <div class="col text-center d-flex flex-column align-items-center">
                <counter
                    ref="counter"
                    :startAmount="0"
                    :endAmount="300"
                    :duration="5"
                    suffix="+"
                    :autoinit="true"
                    @finished="handleCounterFinished"
                    class="font-general-medium text-4xl font-bold text-secondary-dark dark:text-secondary-light mb-2"
                    style="margin-top: -40px"
                />
                <span
                    class="block text-md text-ternary-dark dark:text-ternary-light"
                    style="margin-top: -10px"
                >
                    {{ projectsTitle }}
                </span>
            </div>
        </div>
    </div> -->

    <div class="search-container mt-6">
        <MaterialInput
            class="input-group-dynamic"
            icon="search"
            type="text"
            placeholder="Search by post title"
            name="filterTitle"
            @input="updateFilterTitle"
            style="width: 100%; margin-right: 10px"
        />
    </div>
    <br />

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
    <Footer />
</template>

<style>
@font-face {
    font-family: 'Geologica';
    src: url('path-to-your-font-files/Geologica-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
</style>

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

.filter-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.search-filter,
.sdg-filter,
.country-filter,
.category-filter {
    flex: 1;
    margin-right: 10px;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

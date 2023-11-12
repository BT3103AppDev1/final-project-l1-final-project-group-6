<script setup>
// example components
import DefaultNavbar from '../../../examples/navbars/NavbarDefault.vue';
import Header from '../../../examples/Header.vue';
import DefaultFooter from '../../../examples/footers/FooterDefault.vue';

// sections
import Posts from './Sections/SavedPosts.vue';
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
                <source src="../../../data/video2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <span class="mask bg-gradient-dark opacity-3"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center mx-auto my-auto">
                        <h1 class="text-white header-title">Saved Posts<span id="typed"></span></h1>
                        <p class="text-white header-subtitle">
                            See the ideas that align with your values
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Header>

    <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
        <Posts />
    </div>
    <DefaultFooter />
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
    object-position: center 50%; /* Center the video in the container */
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
</style>

<script setup>
import { onMounted, onUnmounted } from 'vue';

//example components
import NavbarDefault from '../..//examples/navbars/NavbarDefault.vue';
import DefaultFooter from '../../examples/footers/FooterDefault.vue';
import Header from '../../examples/Header.vue';

//Vue Material Kit 2 components
import MaterialSocialButton from '@/components/MaterialSocialButton.vue';

// sections
import RecentPostPreview from './Sections/RecentPostPreview.vue';

//images
/* import vueMkHeader from "@/assets/img/vue-mk-header.jpg"; */
import childrenSmiling from '@/assets/img/children-smiling.jpg';

//hooks
const body = document.getElementsByTagName('body')[0];
onMounted(() => {
    body.classList.add('presentation-page');
    body.classList.add('bg-gray-200');
});
onUnmounted(() => {
    body.classList.remove('presentation-page');
    body.classList.remove('bg-gray-200');
});
</script>

<template>
    <!-- Floating Navbar -->
    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                <NavbarDefault :sticky="true" />
            </div>
        </div>
    </div>
    <Header>
        <!-- Use for static image
        <div
            class="page-header min-vh-75"
            :style="`background-image: url(${classroom})`"
            style="background-position-y: 65%"
            loading="lazy"
        > -->
        <!-- Use for video -->
        <div class="page-header min-vh-75">
            <video autoplay loop muted playsinline class="home-video" style="headerStyle">
                <source src="../../assets/videos/solar-installation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div class="container">
                <div class="row">
                    <div class="col-lg-7 text-center mx-auto position-relative">
                        <h1
                            class="text-white pt-3 mt-n5 me-2"
                            :style="{ display: 'inline-block ' }"
                        >
                            Link4Impact
                        </h1>
                        <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">
                            Connecting Compassion with Causes
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Header>

    <!-- Body -->
    <div class="card blur shadow-blur">
        <RecentPostPreview entityType="Company" />

        <br /><br />

        <RecentPostPreview entityType="NGO" />

        <div
            class="container-fluid mt-sm-5 border-radius-xl"
            :style="{
                background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))'
            }"
        >
            <div
                class="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl"
                :style="{
                    backgroundImage: `url(${childrenSmiling})`
                }"
                loading="lazy"
            >
                <span class="mask bg-gradient-dark"></span>
                <div class="container">
                    <div class="row">
                        <div class="d-flex justify-content-center p-5">
                            <div class="col-lg-8 ms-lg-5 text-center">
                                <h3 class="text-white">Ready to create an impact together?</h3>
                                <p class="text-white text-md">
                                    Cause if you do, join us! Whether you represent a nonprofit or a
                                    company looking to help, we are here to help you make a
                                    difference.
                                </p>

                                <a
                                    href="pages/landing-pages/post/"
                                    class="btn btn-sm mb-0 bg-gradient-success px-5 py-3 mt-4"
                                >
                                    Create A Post Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="py-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5 ms-auto">
                        <h4 class="mb-1">Thank you for your support!</h4>
                        <p class="lead mb-0">Share our mission with others</p>
                    </div>
                    <!-- TODO: Update routes -->
                    <div class="col-lg-5 me-lg-auto my-lg-auto text-lg-end mt-5">
                        <MaterialSocialButton
                            route="https://twitter.com/intent/tweet?text=Check%20Material%20Design%20System%20made%20by%20%40CreativeTim%20%23webdesign%20%23designsystem%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fmaterial-design-system-pro"
                            component="twitter"
                            color="twitter"
                            label="Tweet"
                        />
                        <MaterialSocialButton
                            route="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-design-system-pro"
                            component="facebook-square"
                            color="facebook"
                            label="Share"
                        />
                        <MaterialSocialButton
                            route=""
                            component="pinterest"
                            color="pinterest"
                            label="Pin it"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <DefaultFooter />
</template>

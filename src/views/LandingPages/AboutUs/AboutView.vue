<script setup>
import { onMounted, onUnmounted } from 'vue';

//example components
import DefaultNavbar from '../../../examples/navbars/NavbarDefault.vue';
import DefaultFooter from '../../../examples/footers/FooterDefault.vue';

//image
import bg0 from '@/assets/img/bg9.jpg';

//dep
import Typed from 'typed.js';

//sections
import Information from './Sections/AboutInformation.vue';
import AboutTeam from './Sections/AboutTeam.vue';
import Featuring from './Sections/AboutFeaturing.vue';
import Newsletter from './Sections/AboutNewsletter.vue';

const body = document.getElementsByTagName('body')[0];
//hooks
onMounted(() => {
    body.classList.add('about-us');
    body.classList.add('bg-gray-200');

    if (document.getElementById('typed')) {
        // eslint-disable-next-line no-unused-vars
        var typed = new Typed('#typed', {
            stringsElement: '#typed-strings',
            typeSpeed: 90,
            backSpeed: 90,
            backDelay: 200,
            startDelay: 500,
            loop: true
        });
    }
});

onUnmounted(() => {
    body.classList.remove('about-us');
    body.classList.remove('bg-gray-200');
});
</script>
<template>
    <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
            <div class="col-12">
                <DefaultNavbar :sticky="true" />
            </div>
        </div>
    </div>
    <header class="bg-gradient-dark">
        <div class="page-header min-vh-75">
            <video
                src="../../../data/video6.mp4"
                type="video/mp4"
                autoplay
                loop
                muted
                class="min-vh-50 w-100 shifted-video"
            ></video>

            <span class="mask bg-gradient-dark opacity-4"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center mx-auto my-auto">
                        <h1 class="text-white">
                            Partner with an amazing <span class="text-white" id="typed"></span>
                        </h1>
                        <div id="typed-strings">
                            <h1>Team</h1>
                            <h1>Company</h1>
                            <h1>NGO</h1>
                        </div>
                        <p class="lead mb-4 text-white opacity-8">
                            We dream for a world connected.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- components in page -->
    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
        <Information />
        <AboutTeam />
        <Featuring />
        <Newsletter />
    </div>
    <!-- display footer -->
    <DefaultFooter />
</template>

<style>
.shifted-video {
    margin-top: -90px; /* Adjust this value as needed */
}
</style>

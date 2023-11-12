<script setup>
import { onMounted } from 'vue';

//example components
import DefaultNavbar from '@/examples/navbars/NavbarDefault.vue';
import DefaultFooter from '@/examples/footers/FooterDefault.vue';

//image
import image from '@/assets/img/illustrations/illustration-signin.jpg';

//material components
import MaterialInput from '@/components/MaterialInput.vue';
import MaterialTextArea from '@/components/MaterialTextArea.vue';
import MaterialButton from '@/components/MaterialButton.vue';
const sendemail = (event) => {
    event.preventDefault();
    // Access the value of the inputs using their IDs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;


    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields!');
    } else {
        alert('Sending message....');
        window.open(`mailto:hello@link4impact.com?subject=Contact from ${name}&body=${message}`);
        document.getElementById('contact-form').reset();
    }
};

// material-input
import setMaterialInput from '@/assets/js/material-input';
onMounted(() => {
    setMaterialInput();
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
    <section>
        <div class="page-header min-vh-100">
            <div class="container">
                <div class="row">
                    <div
                        class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column"
                    >
                        <div
                            class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                            :style="{
                                backgroundSize: 'cover'
                            }"
                            loading="lazy"
                        >
                            <video
                                src="../../../data/video5.mp4"
                                type="video/mp4"
                                autoplay
                                loop
                                muted
                                class="min-vh-50 w-0-0 shifted-video"
                            ></video>
                        </div>
                    </div>
                    <div
                        class="mt-8 col-xl-5 col-lg-6 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5"
                    >
                        <div
                            class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5"
                        >
                            <div
                                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent"
                            >
                                <div
                                    class="bg-gradient-success shadow-success border-radius-lg p-3"
                                >
                                    <h3 class="text-white text-success mb-0">Contact us</h3>
                                </div>
                            </div>
                            <div class="card-body">
                                <p class="pb-3">
                                    For further questions, including partnership opportunities,
                                    please email hello@link4impact or contact us using this form.
                                </p>
                                <form id="contact-form" method="post" autocomplete="off">
                                    <div class="card-body p-0 my-3">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <MaterialInput
                                                    id = "name"
                                                    class="input-group-static mb-4"
                                                    type="text"
                                                    label="Full Name"
                                                    placeholder="Full Name"
                                                />
                                            </div>
                                            <div class="col-md-6 ps-md-2">
                                                <MaterialInput
                                                    id = "email"
                                                    class="input-group-static mb-4"
                                                    type="email"
                                                    label="Email"
                                                    placeholder="nus"
                                                />
                                            </div>
                                        </div>
                                        <div class="form-group mb-0 mt-md-0 mt-4">
                                            <MaterialTextArea
                                                id="message"
                                                class="input-group-static mb-4"
                                                :rows="6"
                                                placeholder="Describe your problem in at least 250 characters"
                                                >How can we help you?
                                            </MaterialTextArea>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 text-center">
                                                <MaterialButton
                                                    variant="gradient"
                                                    color="success"
                                                    class="mt-3 mb-0"
                                                    @click="sendemail($event)"
                                                    >Send Message
                                                </MaterialButton>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <DefaultFooter />
</template>

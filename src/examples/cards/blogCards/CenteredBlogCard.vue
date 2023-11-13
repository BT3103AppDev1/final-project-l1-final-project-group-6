<script setup>
defineProps({
    image: {
        type: String,
        required: false
    },
    video: {
        type: String,
        required: false
    },
    isVideo: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    action: {
        type: Object,
        color: String,
        route: String,
        label: String,
        default: () => ({
            color: 'bg-gradient-success',
            label: 'Find Out More'
        })
    }
});
</script>

<template>
    <div class="card">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <a :href="action.route" class="d-block blur-shadow-image">
                <!-- Conditionally render image or video -->
                <img
                    v-if="!isVideo && image"
                    :src="image"
                    :alt="title"
                    class="img-fluid border-radius-lg"
                />
                <video v-if="isVideo && video" autoplay loop muted playsinline class="home-video">
                    <source :src="video" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </a>
        </div>
        <div class="card-body text-center">
            <h5 class="font-weight-normal">
                <a href="javascript:;">{{ title }}</a>
            </h5>
            <p class="mb-0">
                {{ description }}
            </p>
            <button type="button" class="btn btn-sm mb-0 mt-3" :class="action.color">
                {{ action.label }}
            </button>
        </div>
    </div>
</template>

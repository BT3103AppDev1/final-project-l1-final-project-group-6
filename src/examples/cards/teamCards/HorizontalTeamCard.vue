<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  profile: {
    type: Object,
    required: true,
  },
  position: {
    type: Object,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="card card-profile h-100">
    <div class="row g-0">
      <div class="col-lg-4 col-md-6 col-12">
        <a :href="profile.link">
          <div class="p-3 pe-md-0 image-container">
            <img
              class="w-100 border-radius-md shadow-lg image-fit"
              :src="image"
              :alt="profile.name"
            />
          </div>
        </a>
      </div>
      <div class="col-lg-8 col-md-6 col-12 my-auto text-container">
        <div class="card-body ps-lg-0">
          <h5 class="mb-0 profile-name">{{ profile.name }}</h5>
          <h6 :class="`text-${position.color} mb-2 position-label`">{{ position.label }}</h6>
          <p class="description">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-container {
  height: 200px;
  overflow: hidden;
}

.image-fit {
  height: 100%;
  object-fit: cover;
}

.text-container {
  padding-left: 20px; /* Increase padding to shift text to the right */
}

.profile-name {
  /* Additional styling for the profile name can be added here if needed */
}

.position-label {
  /* Additional styling for the position label can be added here if needed */
}

.description {
  height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>

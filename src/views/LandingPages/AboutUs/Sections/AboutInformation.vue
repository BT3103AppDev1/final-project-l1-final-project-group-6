<script setup>
// example components
import DefaultInfoCard from "../../../../examples/cards/infoCards/DefaultInfoCard.vue";
import CenteredBlogCard from "../../../../examples/cards/blogCards/CenteredBlogCard.vue";
</script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="row justify-content-start">
            <DefaultInfoCard
              color="info"
              icon="public"
              title="Streamlined Matchmaking"
              description="The app can facilitate a targeted and efficient matchmaking process"
            />
            <DefaultInfoCard
              color="info"
              icon="payments"
              title="Increased Visibility and Awareness"
              description="NGOs can gain significant exposure to a wider audience of potential supporters"
            />
          </div>
          <div class="row justify-content-start mt-4">
            <DefaultInfoCard
              color="info"
              icon="apps"
              title="Enhanced Corporate Social Responsiblity"
              description="Help companies find meaningful and impactful ways to contribute to society"
            />
            <DefaultInfoCard
              color="info"
              icon="3p"
              title="Efficient Resources"
              description="We only connect appropriate NGOs to companies for efficient resource allocation"
            />
          </div>
        </div>
        <div class="col-lg-4 ms-auto mt-lg-0 mt-6">
          <div class="video-overlay"></div> <!-- Add this line for video overlay -->
    <video autoplay loop muted playsinline class="home-video">
        <source src="../../../../data/video8.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    <h3> </h3>
          <CenteredBlogCard
            title="[Beta] Recommendation Engine"
            description="To provide an enhanced user experience, we are working on a recommendation engine so you don't have to seive through the many posts"
          />
        </div>
      </div>
    </div>
  </section>
</template>

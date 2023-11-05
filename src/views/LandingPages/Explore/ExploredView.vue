<script>
import DefaultNavbar from "../../../examples/navbars/NavbarDefault.vue";
import Header from "../../../examples/Header.vue";
import Footer from "./Sections/SavedFooter.vue";
import Posts from "./Sections/SavedPosts.vue";
import counter from 'vue3-autocounter';

export default {
  components: {
    DefaultNavbar,
    Header,
    Footer,
    Posts,
    counter,
  },
  data: () => ({
    experienceTitle: 'Number of NGOs',
    githubTitle: 'Number of Companies',
    feedbackTitle: 'Years of Partnership',
    projectsTitle: 'Number of Partnerships',
  }),
};
</script>

<template>
  <DefaultNavbar transparent />

  <Header>
    <div
      class="page-header"
      :style="{ 
  backgroundImage: `url(https://assets.telecomtv.com/assets/telecomtv/globe-connection-connected-map-16589.jpeg?w=1280)`,
  fontFamily: `'Geologica', sans-serif`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: '45vh'  /* Adjusted height */
}"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-5"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white" style="font-weight: bold">
              Explore<span class="text-white" id="typed"></span>
            </h1>
            <p class="text-white" style="font-weight: bold">
              The world just around the corner
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <!-- Metrics Banner -->
  <div class="container my-6">
    <div class="row">
      <!-- Years of experience counter -->
      <div class="col text-center d-flex flex-column align-items-center">
        <counter
          ref="counter"
          :startAmount="0"
          :endAmount="8"
          :duration="5"
          :autoinit="true"
          @finished="alert(`Counting finished!`)"
          class="font-general-medium text-4xl font-bold text-secondary-dark dark:text-secondary-light mb-2"
          aria-label="About Status Counter"
        />
        <span class="text-md text-ternary-dark dark:text-ternary-light">
          {{ experienceTitle }}
        </span>
      </div>

      <!-- GitHub stars counter -->
      <div class="col text-center d-flex flex-column align-items-center">
        <counter
          ref="counter"
          :startAmount="0"
          :endAmount="2.2"
          :duration="5"
          suffix="m+"
          :autoinit="true"
          @finished="alert(`Counting finished!`)"
          class="font-general-medium text-4xl font-bold text-secondary-dark dark:text-secondary-light mb-2"
        />
        <span
          class="block text-md text-ternary-dark dark:text-ternary-light"
          >{{ githubTitle }}</span
        >
      </div>

      <!-- Positive feedback counter -->
      <div class="col text-center d-flex flex-column align-items-center">
        <counter
          ref="counter"
          :startAmount="0"
          :endAmount="6"
          :duration="5"
          suffix="%"
          :autoinit="true"
          @finished="alert(`Counting finished!`)"
          class="font-general-medium text-4xl font-bold text-secondary-dark dark:text-secondary-light mb-2"
        />
        <span class="block text-md text-ternary-dark dark:text-ternary-light">
          {{ feedbackTitle }}
        </span>
      </div>

      <!-- Projects completed counter -->
      <div class="col text-center d-flex flex-column align-items-center">
        <counter
          ref="counter"
          :startAmount="0"
          :endAmount="300"
          :duration="5"
          suffix="+"
          :autoinit="true"
          @finished="alert(`Counting finished!`)"
          class="font-general-medium text-4xl font-bold text-secondary-dark dark:text-secondary-light mb-2"
        />
        <span class="block text-md text-ternary-dark dark:text-ternary-light">
          {{ projectsTitle }}
        </span>
      </div>
    </div>
  </div>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
    <Posts />
  </div>

  <Footer />
</template>

<style>
@font-face {
  font-family: "Geologica";
  src: url("path-to-your-font-files/Geologica-Regular.ttf") format("truetype");
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
</style>

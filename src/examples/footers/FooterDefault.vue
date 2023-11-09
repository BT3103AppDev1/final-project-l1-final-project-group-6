<script setup>
import logoDark from "@/assets/img/logo-ct-dark.png";
defineProps({
  brand: {
    type: Object,
    name: String,
    logo: String,
    route: "",
    default: () => ({
      name: "",
      logo: logoDark,
      route: "/"
    })
  },
  socials: {
    type: Array,
    icon: String,
    link: String,
    default: () => [
      {
        icon: '<i class="fab fa-facebook text-lg opacity-8"></i>',
        link: "https://www.youtube.com/watch?v=til1yw6eJio"
      },
      {
        icon: '<i class="fab fa-twitter text-lg opacity-8"></i>',
        link: "https://www.youtube.com/watch?v=LA2q3QwhG54"
      },
      {
        icon: '<i class="fab fa-github text-lg opacity-8"></i>',
        link: "https://www.youtube.com/shorts/PQJMeGF2n88"
      },
      {
        icon: '<i class="fab fa-youtube text-lg opacity-8"></i>',
        link: "https://www.youtube.com/shorts/n2BPP589aDg"
      }
    ]
  },
  menus: {
    type: Array,
    name: String,
    items: {
      type: Array,
      name: String,
      href: String
    },
    default: () => [
     
    ]
  }
});
</script>
<template>
  <footer class="footer pt-5 mt-5">
    <div class="container">
      <div class="row">
        <!-- Center the container of the social icons -->
        <div class="d-flex justify-content-center">
          <ul class="nav">
            <li
              class="nav-item"
              v-for="{ icon, link } of socials"
              :key="link"
            >
              <a
                class="nav-link pe-1"
                :href="link"
                target="_blank"
                v-html="icon"
              >
              </a>
            </li>
          </ul>
        </div>
        <!-- Other contents of your footer -->
        <div
          class="col-md-2 col-sm-6 col-6 mb-4"
          v-for="{ name, items } of menus"
          :key="name"
        >
          <h6 class="text-sm">{{ name }}</h6>
          <ul class="flex-column ms-n3 nav">
            <li class="nav-item" v-for="item of items" :key="item.name">
              <a class="nav-link" :href="item.href" target="_blank">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>

        <div class="col-12">
          <div class="text-center">
            <p class="text-dark my-4 text-sm font-weight-normal">
              Please we really need the A
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

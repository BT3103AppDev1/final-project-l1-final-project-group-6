<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";

// images
import ArrDark from "@/assets/img/down-arrow-dark.svg";
import downArrow from "@/assets/img/down-arrow.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons'; // Use the correct icon name

library.add(faSeedling); // Add the icon to the library

import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../../firebase";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = getAuth(firebaseApp);

const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    // You can optionally redirect the user to a different page or perform any other actions after sign-out.
    router.push({ name: "signin-basic" });
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

const props = defineProps({
  action: {
    type: Object,
    route: String,
    color: String,
    label: String,
    default: () => ({
      route: "/pages/landing-pages/post",
      color: "bg-gradient-success",
      label: "Post Now",
    }),
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  darkText: {
    type: Boolean,
    default: false,
  },
});

// set arrow  color
function getArrowColor() {
  if (props.transparent && textDark.value) {
    return ArrDark;
  } else if (props.transparent) {
    return DownArrWhite;
  } else {
    return ArrDark;
  }
}

// set text color
const getTextColor = () => {
  let color;
  if (props.transparent && textDark.value) {
    color = "text-dark";
  } else if (props.transparent) {
    color = "text-white";
  } else {
    color = "text-dark";
  }

  return color;
};

// set nav color on mobile && desktop

let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
  textDark.value = true;
} else if (type.value === "desktop" && textDark.value == false) {
  textDark.value = false;
}

watch(
  () => type.value,
  (newValue) => {
    if (newValue === "mobile") {
      textDark.value = true;
    } else {
      textDark.value = false;
    }
  }
);
</script>
<template>
  <nav
    class="navbar navbar-expand-lg top-0"
    :class="{
      'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-3':
        props.transparent,
      'my-3 blur border-radius-lg z-index-3 py-2 shadow py-2 start-0 end-0 mx-4 position-absolute mt-4':
        props.sticky,
      'navbar-light bg-white py-3': props.light,
      ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark,
    }"
  >
    <div
      :class="
        props.transparent || props.light || props.dark
          ? 'container'
          : 'container-fluid px-0'
      "
    >
  <div :class="containerClass">
    <RouterLink
      :to="{ name: 'presentation' }"
      class="navbar-brand"
      :class="navbarBrandClass"
      rel="tooltip"
      title="Designed and Coded by Lucas"
      data-placement="bottom"
    >
      <font-awesome-icon icon="fa-solid fa-seedling" bounce style="color: #04b949; margin-right: 10px;" />
      <span class="link-text">Link4Impact</span>
    </RouterLink>
  </div>

      <RouterLink
        class="navbar-brand d-block d-md-none" 
        :class="
          props.transparent || props.dark
            ? 'text-white'
            : 'font-weight-bolder ms-sm-3'
        "
        to="/"
        rel="tooltip"
        title="Designed and Coded by Creative Tim"
        data-placement="bottom"
      >
        VueJS
      </RouterLink>
      <a
        href="https://www.creative-tim.com/product/vue-material-kit-pro"
        class="btn btn-sm bg-gradient-success mb-0 ms-auto d-lg-none d-block"
        >Buy Now</a
      >
      <button
        class="navbar-toggler shadow-none ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div
        class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
        id="navigation"
      >
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >dashboard</i
              >
              Details
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="col-12 px-4 py-2">
                  <div class="row">
                    <div class="position-relative">
                      <div
                        class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1"
                      >
                        Landing Pages
                      </div>
                      <RouterLink
                        :to="{ name: 'about' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>About Us</span>
                      </RouterLink>
                      <RouterLink
                        :to="{ name: 'contactus' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>Contact Us</span>
                      </RouterLink>
                      <RouterLink
                        :to="{ name: 'saved' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>Saved Posts</span>
                      </RouterLink>
                  
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-lg-none">
                <div
                  class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-0"
                >
                  Landing Pages
                </div>
                <RouterLink
                  :to="{ name: 'about' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>About Us</span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'contactus' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>Contact Us</span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'saved' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>Saved Posts</span>
                </RouterLink>
                <div
                  class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-0 mt-3"
                >
                  Account
                </div>

                <button @click="handleSignOut" class="btn btn-danger">
                  Sign Out
                </button>
              </div>
            </div>
          </li>

          <li class="nav-item mx-2">
            <RouterLink
              to="/pages/landing-pages/explore"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
            >
              <i class="material-icons opacity-6 me-2 text-md">public</i>
              <!-- Added me-2 for margin -->
              Explore
            </RouterLink>
          </li>

          
          <!-- GITHUB ICON -->
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              href="https://github.com/BT3103AppDev1/final-project-l1-final-project-group-6"
              class="nav-link d-flex cursor-pointer align-items-center"
            >
              <svg
                width="20px"
                height="20px"
                class="material-icons me-2 opacity-6"
                viewBox="0 0 24 24"
                aria-hidden="true"
                data-testid="GitHubIcon"
                :fill="props.transparent && '#fff'"
              >
                <path
                  d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"
                ></path>
              </svg>
              Github
            </a>
          </li>
        </ul>

        <!-- SIGN OUT BUTTONS -->
        <li class="nav-item dropdown">
    <a class="nav-link d-flex align-items-center" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <img src="https://www.comp.nus.edu.sg/stfphotos/shashank.jpg" class="rounded-circle" style="width: 40px; height: 40px;" alt="Profile">
    </a>
    <ul class="dropdown-menu" aria-labelledby="profileDropdown">
      <li><RouterLink to="/profile" class="dropdown-item">View Profile</RouterLink></li>
      <li><button @click="handleSignOut" class="dropdown-item">Sign Out</button></li>
    </ul>
  </li>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<style scoped>
.navbar-profile-pic {
  width: 40px; 
  height: 40px; 
  object-fit: cover;
  margin-left: 12px; /* Adjust as needed for spacing */
}

/* Adjust the line-height if necessary to vertically center the profile pic */
.navbar-nav .nav-item {
  align-items: center; /* Align items vertically */
}

/* Adjust dropdown menu positioning if necessary */
.dropdown-menu {
  top: 100%; /* Ensure it drops down right below the profile pic */
}
.navbar-brand {
  display: flex;
  align-items: center;
}

.nav-item {
  list-style: none; /* This removes the bullet point from the list item */
}

/* Custom CSS to align buttons */
.nav-item .btn {
  vertical-align: middle; /* Aligns the text vertically in the buttons */
  line-height: normal; /* Resets line-height to avoid discrepancies */
  /* If needed, use padding to adjust the vertical position of the buttons */
}


.icon-spacing {
  margin-right: 10px;
}

.link-text:hover {
  color: brightpink; /* This will change the hover color of the text only */
}

.link-text {
  font-weight: bold;
  font-size: 1.25rem; /* This increases the font size */
  font-family: 'Roboto', sans-serif; /* This sets a modern, sans-serif font */
  color: white; /* This sets the text color to white */
}

/* You may need to add the following @font-face if you don't have Roboto loaded in your project */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.googleapis.com/css?family=Roboto) format('woff2');
}


</style>
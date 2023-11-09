<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";

// images
import ArrDark from "@/assets/img/down-arrow-dark.svg";
import downArrow from "@/assets/img/down-arrow.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons"; // Use the correct icon name

library.add(faSeedling); // Add the icon to the library

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "../../firebase";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = getAuth(firebaseApp);

const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    location.reload();
    // You can optionally redirect the user to a different page or perform any other actions after sign-out.
    router.push({ name: "presentation" });
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

const isLoggedIn = ref(false);

onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoggedIn.value = true;
  }
  console.log("in navbar " + isLoggedIn.value);
});
</script>

<template>
  <nav
    class="navbar navbar-expand-lg top-0"
    :class="{
      'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-3':
        props.transparent,
      'my-3 blur border-radius-lg z-index-3 py-2 shadow py-2 start-0 end-0 mx-4 position-absolute mt-4 w-100':
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
          <font-awesome-icon
            icon="fa-solid fa-seedling"
            bounce
            style="color: #04b949; margin-right: 10px"
          />
          <span class="link-text">Link4Impact</span>
        </RouterLink>
      </div>

      <a
        v-if="isLoggedIn"
        href="pages/landing-pages/post"
        class="btn btn-sm bg-gradient-success mb-0 ms-auto d-lg-none d-block"
        >Post Now</a
      >
      <a
        v-if="!isLoggedIn"
        href="/pages/landing-pages/basic"
        class="btn btn-sm bg-gradient-success mb-0 ms-auto d-lg-none d-block"
        >Sign In</a
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

          <li v-if="isLoggedIn" class="nav-item mx-2">
            <RouterLink
              to="/pages/landing-pages/saved"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
            >
              <i class="material-icons opacity-6 me-2 text-md">bookmark</i>
              <!-- Added me-2 for margin -->
              Saved Posts
            </RouterLink>
          </li>
        </ul>
      
        <!-- Post Now button -->

        <ul v-if="isLoggedIn" class="navbar-nav d-lg-block d-none">
          <li class="nav-item">
            <a
              :href="action.route"
              v-if="isLoggedIn"
              class="btn btn-sm mb-0"
              :class="action.color"
              onclick="smoothToPricing('pricing-soft-ui')"
              >{{ action.label }}</a
            >
          </li>
        </ul>

        <!-- SIGN OUT BUTTONS -->
        <li v-if="isLoggedIn" class="nav-item dropdown">
          <a
            class="nav-link d-flex align-items-center"
            id="profileDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://www.comp.nus.edu.sg/stfphotos/shashank.jpg"
              class="rounded-circle"
              style="width: 40px; height: 40px"
              alt="Profile"
            />
          </a>
          <ul class="dropdown-menu" aria-labelledby="profileDropdown">
            <li>
              <RouterLink :to="{ name: 'profile' }" class="dropdown-item"
                >View Profile</RouterLink
              >
            </li>
            <li>
              <button @click="handleSignOut" class="dropdown-item">
                Sign Out
              </button>
            </li>
          </ul>
        </li>

        <!-- SIGN IN BUTTONS -->
        <ul v-if="!isLoggedIn " class="navbar-nav d-lg-block signin">
          <li class="nav-item">
            <RouterLink
              :to="{ name: 'signin-basic' }"
              class="btn btn-sm mb-0"
              style="background-color: #04b949; color: white"
              >Sign In</RouterLink
            >
          </li>
        </ul>
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
  font-family: "Roboto", sans-serif; /* This sets a modern, sans-serif font */
  color: white; /* This sets the text color to white */
}

/* You may need to add the following @font-face if you don't have Roboto loaded in your project */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"), local("Roboto-Regular"),
    url(https://fonts.googleapis.com/css?family=Roboto) format("woff2");
}
</style>

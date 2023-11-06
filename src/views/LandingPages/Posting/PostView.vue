<script setup>
import { onMounted, onUnmounted, ref } from "vue";

//firebase
import firebase from "../../../firebase.js";
import "firebase/firestore";
import "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

//example components
import NavbarDefault from "../../../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../../examples/footers/FooterDefault.vue";
import Header from "../../../examples/Header.vue";
import FilledInfoCard from "../../../examples/cards/infoCards/FilledInfoCard.vue";

//Vue Material Kit 2 components
import MaterialSocialButton from "@/components/MaterialSocialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";

// sections
// import PresentationCounter from "./Sections/PresentationCounter.vue";
// import PresentationPages from "./Sections/PresentationPages.vue";
// import PresentationExample from "./Sections/PresentationExample.vue";
// import data from "./Sections/Data/designBlocksData";
// import BuiltByDevelopers from "./Components/BuiltByDevelopers.vue";
// import PresentationTestimonials from "./Sections/PresentationTestimonials.vue";
// import PresentationInformation from "./Sections/PresentationInformation.vue";

//images
import unhelp from "@/assets/img/post-un.jpg";
import wavesWhite from "@/assets/img/waves-white.svg";
import nus from "@/assets/img/post-nus-removebg-preview.png";
import googleorg from "@/assets/img/post-googleorg.png";
import temasek from "@/assets/img/post-temasek-removebg-preview.png";
import nvpc from "@/assets/img/post-nvpc-removebg-preview.png";

//hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});

const showDropdown = ref(false);
const checkedNames = ref([])

const db = getFirestore(firebase);
const firstName = ref("");
const lastName = ref("");
const projectTitle = ref("");
const organizationName = ref("");
const message = ref("");

const submitToFirebase = async () => {
  console.log("IN AC");
  alert(
    "Submitting your request for project: " +
      document.getElementById("projectTitle").value
  );

  try {
    // Create a new document in Firebase Firestore with the form data
    const docRef = await setDoc(
      doc(db, "requests", document.getElementById("projectTitle").value),
      {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        projectTitle: document.getElementById("projectTitle").value,
        organizationName: document.getElementById("organizationName").value,
        selectedSDG: selectedOption.value,
        message: document.getElementById("message").value,
      }
    );

    console.log(docRef);
    document.getElementById("myform").reset();
    //reset selectedsdg
    selectedOption.value = "SDG";

    // Display a success message (e.g., with a toast or alert)
    alert("Request submitted successfully!");
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error submitting request. Please try again later.");
  }
};

const sdgs = [
  "SDG 1- No Poverty",
  "SDG 2- Zero Hunger",
  "SDG 3- Good Health and Well-being",
  "SDG 4- Quality Education",
  "SDG 5- Gender Equality",
  "SDG 6- Clean Water and Sanitation",
  "SDG 7- Affordable and Clean Energy",
  "SDG 8- Decent Work and Economic Growth",
  "SDG 9- Industry, Innovation and Infrastructure",
  "SDG 10- Reduced Inequality",
  "SDG 11- Sustainable Cities and Communities",
  "SDG 12- Responsible Consumption and Production",
  "SDG 13- Climate Action",
  "SDG 14- Life Below Water",
  "SDG 15- Life on Land",
  "SDG 16- Peace and Justice Strong Institutions",
  "SDG 17- Partnerships to achieve the Goal",
];

// Define the ref for the selected option
const selectedOption = ref("SDG");
</script>

<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <Header>
    <div
      class="page-header min-vh-75"
      :style="`background-image: url(${unhelp})`"
      loading="lazy"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-3 mt-n5 me-2"
              :style="{ display: 'inline-block ' }"
            >
              Post Now
            </h1>
            <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">
              Ready to champoin a cause you are passionate about, or share more
              about your organisation?
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="container">
    <div class="row">
      <div class="d-flex flex-column w-100 text-center p-5 mb-8">
        <h3>Meet our partners</h3>
        <div class="d-flex justify-content-center mt-3 flex-wrap">
          <a
            href="https://cityofgood.sg/"
            target="_blank"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="National Volunteer & Philanthropy Centre"
          >
            <img
              :src="nvpc"
              alt="title"
              loading="lazy"
              :style="{ height: '90px' }"
            />
          </a>
          <a
            class="mx-3"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Google.org - Google's Philanthropic Arm"
          >
          </a>
          <a
            href="https://nus.edu.sg/"
            target="_blank"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="National University of Singapore"
          >
            <img
              :src="nus"
              alt="title"
              loading="lazy"
              :style="{ height: '90px' }"
            />
          </a>
          <a
            href="https://www.creative-tim.com/product/vue-material-kit-pro"
            class="mx-3"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Vue.js - Is a Progressive JavaScript Framework"
          >
          </a>
          <a
            href="https://www.google.org/"
            target="_blank"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Google.org - Google's Philanthropic Arm"
          >
            <img
              :src="googleorg"
              alt="title"
              loading="lazy"
              :style="{ height: '90px' }"
            />
          </a>
          <a
            href="https://www.temasekfoundation.org.sg/"
            target="_blank"
            class="mx-3"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Temasek Foundation- A Singapore Philanthropic Organisation"
          >
            <img
              :src="temasek"
              alt="title"
              loading="lazy"
              :style="{ height: '90px' }"
            />
          </a>
          <a
            class="opacity-5"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Coming Soon"
          >
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <PresentationCounter />
    <PresentationInformation />
    <PresentationExample :data="data" />
    <PresentationPages />
    <BuiltByDevelopers />

    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <FilledInfoCard
            class="p-4"
            :color="{ text: 'white', background: 'bg-gradient-success' }"
            :icon="{ component: 'flag', color: 'white' }"
            title="Getting Started"
            description="Check the possible ways of working with our product and the necessary files for building your own project."
            :action="{
              route:
                'https://www.creative-tim.com/learning-lab/vue/overview/material-kit/',
              label: { text: 'Let\'s start', color: 'white' },
            }"
          />
        </div>
        <div class="col-lg-4">
          <FilledInfoCard
            class="px-lg-1 mt-lg-0 mt-4 p-4"
            height="h-100"
            :icon="{ component: 'precision_manufacturing', color: 'success' }"
            title="Plugins"
            description="Get inspiration and have an overview about the plugins that we
                used to create the Material Kit."
            :action="{
              route:
                'https://www.creative-tim.com/learning-lab/vue/input/material-kit/',
              label: { text: 'Read more' },
            }"
          />
        </div>
        <div class="col-lg-4">
          <FilledInfoCard
            class="px-lg-1 mt-lg-0 mt-4 p-4"
            :icon="{ component: 'receipt_long', color: 'success' }"
            title="Utility Classes"
            description="Material Kit is giving you a lot of pre-made elements. For those
                who want flexibility, we included many utility classes."
            :action="{
              route:
                'https://www.creative-tim.com/learning-lab/vue/utilities/material-kit/',
              label: { text: 'Read more' },
            }"
          />
        </div>
      </div>
    </div>
    <PresentationTestimonials />

    <section>
      <div class="container py-4">
        <div class="row">
          <div
            class="col-lg-7 mx-auto d-flex justify-content-center flex-column"
          >
            <h3 class="text-center">Start your request here</h3>
            <form role="form" id="myform" method="post" autocomplete="off">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <MaterialInput
                      class="input-group-dynamic mb-4"
                      :placeholder="firstNamePlaceholder || 'First Name'"
                      type="text"
                      v-model="firstName"
                      id="firstName"
                    />
                  </div>
                  <div class="col-md-6 ps-2">
                    <MaterialInput
                      class="input-group-dynamic"
                      :placeholder="lastNamePlaceholder || 'Last Name'"
                      type="text"
                      v-model="lastName"
                      id="lastName"
                    />
                  </div>
                </div>
                <div class="mb-4">
                  <MaterialInput
                    class="input-group-dynamic"
                    :placeholder="projectTitlePlaceholder || 'Project Title'"
                    type="text"
                    v-model="projectTitle"
                    id="projectTitle"
                  />
                </div>
                <div class="mb-4">
                  <MaterialInput
                    class="input-group-dynamic"
                    :placeholder="
                      organizationNamePlaceholder || 'Organization Name'
                    "
                    type="text"
                    v-model="organizationName"
                    id="organizationName"
                  />
                </div>
                <div class="col-md6">
                  <div class="dropdown">
                    <MaterialButton
                      variant="gradient"
                      color="success"
                      class="dropdown-toggle"
                      :class="{ show: showDropdown }"
                      @focusout="showDropdown = false"
                      id="selectedOption"
                      data-bs-toggle="dropdown"
                      :area-expanded="showDropdown"
                    >
                      {{ selectedOption }}
                    </MaterialButton>

                    <ul
                      class="dropdown-menu px-2 py-3"
                      :class="{ show: showDropdown }"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li v-for="sdg in sdgs" :key="sdg">
                        <a
                          class="dropdown-item border-radius-md"
                          href="javascript:;"
                          @click="selectedOption = sdg"
                          >{{ sdg }}</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>

                <div>Financial Requested: {{ checkedNames }}</div>

                <input
                  type="checkbox"
                  id="jack"
                  class="input-group-static mb-4"
                  value="Grant"
                  v-model="checkedNames"
                />
                <label for="jack">Grant</label>

                <input
                  type="checkbox"
                  id="john"
                  value="John"
                  v-model="checkedNames"
                />
                <label for="john">John</label>

                <input
                  type="checkbox"
                  id="mike"
                  value="Mike"
                  v-model="checkedNames"
                />
                <label for="mike">Mike</label>

                <MaterialTextArea
                  class="input-group-static mb-4"
                  id="message"
                  :rows="4"
                  v-model="message"
                  >Short Blurb About Your Project</MaterialTextArea
                >
              </div>
              <div class="row">
                <div class="col-md-12">
                  <MaterialSwitch
                    class="mb-4 d-flex align-items-center"
                    id="flexSwitchCheckDefault"
                    checked
                    labelClass="ms-3 mb-0"
                  >
                    I agree to the
                    <a href="javascript:;" class="text-dark"
                      ><u>Terms and Conditions</u></a
                    >.
                  </MaterialSwitch>

                  <div class="col-md-12">
                    <MaterialButton
                      type="button"
                      variant="gradient"
                      color="dark"
                      @click="submitToFirebase"
                      fullWidth
                      >Submit request</MaterialButton
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <div
      class="container-fluid mt-sm-5 border-radius-xl"
      :style="{
        background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
      }"
    >
      <div
        class="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl"
        :style="{
          backgroundImage: `url(${wavesWhite})`,
        }"
        loading="lazy"
      >
        <span class="mask bg-gradient-dark"></span>
        <div class="container">
          <div class="row">
            <div class="d-flex justify-content-center p-5">
              <div class="col-lg-8 ms-lg-5 text-center">
                <h3 class="text-white">
                  Do you love this awesom e UI Kit from Vuejs & Bootstrap?
                </h3>
                <p class="text-white text-md">
                  Cause if you do, it can be yours for FREE. Hit the button
                  below to navigate to Creative Tim where you can <br />
                  find the Design System in HTML. Start a new project or give an
                  old Bootstrap project a new look!
                </p>

                <a
                  href="https://www.creative-tim.com/product/vue-material-kit"
                  class="btn btn-sm mb-0 bg-gradient-success px-5 py-3 mt-4"
                  >Download Now</a
                >
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
            <p class="lead mb-0">We deliver the best web products</p>
          </div>
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

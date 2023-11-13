<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";

//firebase
import firebase from "../../../firebase.js";
import "firebase/firestore";
import "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//example components
import NavbarDefault from "../../../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../../examples/footers/FooterDefault.vue";
import Header from "../../../examples/Header.vue";
import FilledInfoCard from "../../../examples/cards/infoCards/FilledInfoCard.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";

//images
import unhelp from "@/assets/img/post-un.jpg";
import soc from "@/assets/img/computing_places-1-505521.jpg";
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

const isNgo = ref(false);
const financialLabel = computed(() =>
  isNgo.value ? "Financial Support: " : "Financial Requested: "
);
const nonFinancialLabel = computed(() =>
  isNgo.value ? "Non-Financial Support: " : "Non-Financial Requested: "
);
const entityLabel = computed(() =>
  isNgo.value ? "Organisation Name" : "NGO Name"
);
const switchText = computed(() =>
  isNgo.value
    ? "I am Submitting this as an Organisation"
    : "I am Submitting this as an NGO"
);

const showDropdown = ref(false);
const checkedNames = ref([]);
const checkedNonNames = ref([]);

const db = getFirestore(firebase);
const auth = getAuth();

const username = ref("");
const userID = ref("");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    getDoc(userRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          username.value = userData.username;
          userID.value = userData.userID;
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }
});

const firstName = ref("");
const lastName = ref("");
const projectTitle = ref("");
const organizationName = ref("");
const message = ref("");
const submitToFirebase = async () => {
  if (document.getElementById("flexSwitchCheckDefault").checked) {
    console.log("IN AC");
    alert(
      "Submitting your request for project: " +
        document.getElementById("projectTitle").value
    );

    try {
      // Create a new document in Firebase Firestore with the form data
      const entityType = isNgo.value ? "NGO" : "Organization";
      const randomNum = Math.floor(Math.random() * 100) + 1;
      const randomImage = `https://picsum.photos/200/300?random=${randomNum}`;
      const docRef = await setDoc(
        doc(db, "requests", document.getElementById("projectTitle").value),
        {
          entity: entityType,
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          title: document.getElementById("projectTitle").value,
          FinancialRequested: checkedNames.value,
          NonFinancialRequested: checkedNonNames.value,
          organizationName: document.getElementById("organizationName").value,
          selectedSDG: selectedOption.value,
          description: document.getElementById("message").value,
          selectedCountry: selectedCountry.value,
          username: username.value,
          userID: userID.value,
          imageUrl: randomImage,
        }
      );

      const documentRef = doc(db, "users", userID.value);
      // Update the 'yourListField' by appending a new value
      const newValueToAdd = document.getElementById("projectTitle").value;

      updateDoc(documentRef, {
        post_requests: arrayUnion(newValueToAdd),
      })
        .then(() => {
          console.log("Field updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating field:", error);
        });

      console.log(docRef);
      // Display a success message
      console.log("Document written!");
      alert(
        "Your request for project: " +
          document.getElementById("projectTitle").value +
          " has been submitted!"
      );
      //reset form
      document.getElementById("myform").reset();
      //reset selectedsdg
      selectedOption.value = "SDG";
      selectedCountry.value = "Country";
    } catch (error) {
      //display error message
      console.error("Error adding document: ", error);
      alert("Error submitting request. Please try again later.");
    }
  } else {
    alert("Please agree to the Terms and Conditions to submit the request.");
  }
};

const sdgs = [
  "SDG 1 - No Poverty",
  "SDG 2 - Zero Hunger",
  "SDG 3 - Good Health and Well-being",
  "SDG 4 - Quality Education",
  "SDG 5 - Gender Equality",
  "SDG 6 - Clean Water and Sanitation",
  "SDG 7 - Affordable and Clean Energy",
  "SDG 8 - Decent Work and Economic Growth",
  "SDG 9 - Industry, Innovation and Infrastructure",
  "SDG 10 - Reduced Inequality",
  "SDG 11 - Sustainable Cities and Communities",
  "SDG 12 - Responsible Consumption and Production",
  "SDG 13 - Climate Action",
  "SDG 14 - Life Below Water",
  "SDG 15 - Life on Land",
  "SDG 16 - Peace and Justice Strong Institutions",
  "SDG 17 - Partnerships to achieve the Goal",
];

const countries = [
  "Afghanistan",
  "Bahrain",
  "Bangladesh",
  "Brunei",
  "Cambodia",
  "China",
  "India",
  "Indonesia",
  "Iraq",
  "Israel",
  "Japan",
  "Laos",
  "Malaysia",
  "Myanmar",
  "Pakistan",
  "Philippines",
  "Saudi Arabia",
  "Singapore",
  "South Korea",
  "Vietnam",
];

// Define the ref for the selected option
const selectedOption = ref("SDG");
const selectedCountry = ref("Country");
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
              Ready to champion a cause you are passionate about, or share more
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
        <!-- <div class="d-flex justify-content-center mt-3 flex-wrap">
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
        </div> -->
      </div>
    </div>
  </div>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <FilledInfoCard
            class="p-4"
            :color="{ text: 'white', background: 'bg-gradient-success' }"
            :icon="{ component: 'flag', color: 'white' }"
            title="17 United Nations Sustainable Development Goals "
            description="Providing a shared blueprint for peace and prosperity for people and the planet, now and into the future."
            :action="{
              route: 'https://sdgs.un.org/goals',
              label: { text: 'Find out more', color: 'white' },
            }"
          />
        </div>
        <div class="col-lg-6">
          <FilledInfoCard
            class="px-lg-1 mt-lg-0 mt-4 p-4"
            :icon="{ component: 'receipt_long', color: 'success' }"
            title="Our Mission"
            description="To empower the next generation to do good together at scale while leveraging on the power of networks"
            :action="{
              route: 'https://www.un.org/en/',
              label: { text: 'Learn more' },
            }"
          />
        </div>
      </div>
    </div>
    <br />
    <br />

    <section>
      <div class="container py-4">
        <div class="row">
          <div
            class="col-lg-8 mx-auto d-flex justify-content-center flex-column"
          >
            <h3 class="text-center">Start your request here, {{ username }}</h3>
            <p class="lead text-black px-0 mt-3" :style="{ fontWeight: '300' }">
              Please allow a minimum of 2 weeks processing time for your
              submission for listing and reach out to hello@link4impact.com if you
              have any questions about the submission guidelines and endorsement
              criteria.
            </p>
            <form role="form" id="myform" method="post" autocomplete="off">
              <div class="card-body">
                <MaterialSwitch
                  v-model="isNgo"
                  class="mb-4 d-flex align-items-center"
                  id="flexSwitchCheckDefaultNGO"
                  labelClass="ms-3 mb-0"
                >
                  {{ switchText }}
                </MaterialSwitch>
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
                    :placeholder="organizationNamePlaceholder || entityLabel"
                    type="text"
                    v-model="organizationName"
                    id="organizationName"
                  />
                </div>
                <div class="col-md-6">
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

                <div class="col-md-6">
                  <div class="dropdown">
                    <MaterialButton
                      variant="gradient"
                      color="success"
                      class="dropdown-toggle"
                      :class="{ show: showDropdown }"
                      @focusout="showDropdown = false"
                      id="selectedCountry"
                      data-bs-toggle="dropdown"
                      :area-expanded="showDropdown"
                    >
                      {{ selectedCountry }}
                    </MaterialButton>

                    <ul
                      class="dropdown-menu px-2 py-3"
                      :class="{ show: showDropdown }"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li v-for="country in countries" :key="country">
                        <a
                          class="dropdown-item border-radius-md"
                          href="javascript:;"
                          @click="selectedCountry = country"
                          >{{ country }}</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>

                <div>{{ financialLabel }} {{ checkedNames.join(", ") }}</div>

                <input
                  type="checkbox"
                  id="Grant"
                  class="input-group-static mb-4"
                  value="Grant"
                  v-model="checkedNames"
                />
                <label for="Grant" style="margin-right: 10px">Grant</label>

                <input
                  type="checkbox"
                  id="Equity"
                  value="Equity"
                  v-model="checkedNames"
                />
                <label for="Equity" style="margin-right: 10px">Equity</label>

                <input
                  type="checkbox"
                  id="Debt"
                  value="Debt"
                  v-model="checkedNames"
                />
                <label for="Debt">Debt</label>

                <div>
                  {{ nonFinancialLabel }} {{ checkedNonNames.join(", ") }}
                </div>

                <input
                  type="checkbox"
                  id="Mentoring"
                  class="input-group-static mb-5"
                  value="Mentoring"
                  v-model="checkedNonNames"
                />
                <label for="Mentoring" style="margin-right: 10px"
                  >Mentoring</label
                >

                <input
                  type="checkbox"
                  id="Information Technology"
                  value="Information Technology"
                  v-model="checkedNonNames"
                />
                <label for="Information Technology" style="margin-right: 10px"
                  >Information Technology</label
                >

                <input
                  type="checkbox"
                  id="Impact Measurement"
                  value="Impact Measurement"
                  v-model="checkedNonNames"
                />
                <label for="Impact Measurement" style="margin-right: 10px"
                  >Impact Measurement</label
                >

                <input
                  type="checkbox"
                  id="Legal Support"
                  value="Legal Support"
                  v-model="checkedNonNames"
                />
                <label for="Legal Support">Legal Support</label>

                <MaterialTextArea
                  class="input-group-static mb-4"
                  id="message"
                  :rows="6"
                  v-model="message"
                  >Short Blurb About Your Project</MaterialTextArea
                >
              </div>
              <div class="row">
                <div class="col-md-12">
                  <MaterialSwitch
                    class="mb-4 d-flex align-items-center"
                    id="flexSwitchCheckDefault"
                    labelClass="ms-3 mb-0"
                  >
                    I agree to disclose my information to the Link4Impact team
                    and agree to the
                    <a
                      href="https://nusmods.com/courses/BT3103/application-systems-development-for-business-analytics"
                      target="_blank"
                      class="text-dark"
                      ><u>Terms and Conditions</u></a
                    >.
                  </MaterialSwitch>
                  <p>Submission ID: {{ username }}</p>

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
          backgroundImage: `url(${soc})`,
        }"
        loading="lazy"
      >
        <span class="mask bg-gradient-dark"></span>
        <div class="container">
          <div class="row">
            <div class="d-flex justify-content-center p-5">
              <div class="col-lg-8 ms-lg-5 text-center">
                <h3 class="text-white">
                  Want to get in touch with the Link4Impact team?
                </h3>
                <p class="text-white text-md">
                  We are here to help you build your project. Reach out to us
                  and we will get back to you as soon as possible.
                </p>
                <a
                  href="mailto:hello@link4impact.com"
                  class="btn btn-sm mb-0 bg-gradient-success px-5 py-3 mt-4"
                  >Reach out</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DefaultFooter />
</template>

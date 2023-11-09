<script setup>
import NavbarDefault from '../../../examples/navbars/NavbarDefault.vue';
import Footer from '../../../examples/footers/SavedFooter.vue';
import Header from '../../../examples/Header.vue';
import profile from '@/assets/img/profile.jpg';
</script>

<script>
import { auth, db } from '../../../firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default {
    data() {
        return {
            username: '',
            imageURL: '',
            userID: '',
            description: ''
        };
    },
    mounted() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                getDoc(userRef).then((doc) => {
                    if (doc.exists()) {
                        this.username = doc.data().username;
                        this.imageURL = doc.data().imageURL;
                        this.userID = doc.data().userID;
                        this.description = doc.data().description;
                    }
                });
            }
        });
    },
    methods: {
        async updateProfile() {
            const userRef = doc(db, 'users', this.userID);
            setDoc(userRef, {
                username: this.username,
                imageURL: this.imageURL || "https://api-private.atlassian.com/users/7831f16b18333c732e152c74f1863d18/avatar", // updates to fb face by default
                userID: this.userID,
                description: this.description
            }).then(() => {
                console.log('Profile updated');
                alert('Profile updated')
                this.$router.push({ name: 'profile' });
            });
        }
    }
};
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
            class="page-header min-vh-50"
            :style="`background-image: url(${profile})`"
            loading="lazy"
        >
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 text-center mx-auto position-relative"></div>
                </div>
            </div>
        </div>
    </Header>

    <div class="form-container">
        <form @submit.prevent="updateProfile">
            <label for="uid">UID:</label>
            <input v-model="userID" id="uid" disabled />
            <span> DELETE ME</span>
            <br />

            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" disabled />
            <span> DELETE ME</span>
            <br />
            <label for="imageURL">Image URL:</label>
            <input type="text" id="imageURL" v-model="imageURL" />
            <br />
            <label for="description">Description:</label>
            <textarea id="description" v-model="description"></textarea>
            <br />
            <button type="submit">Update Profile</button>
        </form>
    </div>
</template>

<style></style>

<script setup>
// example component
import HorizontalTeamCard from '@/examples/cards/teamCards/HorizontalTeamCard.vue';

// images
import unnamedImage1 from '@/data/profilepics/unnamed.jpg';
import unnamedImage2 from '@/data/profilepics/unnamed (1).jpg';
import unnamedImage3 from '@/data/profilepics/unnamed (2).jpg';
import unnamedImage4 from '@/data/profilepics/unnamed (3).jpg';
import unnamedImage5 from '@/data/profilepics/unnamed (4).jpg';
import unnamedImage6 from '@/data/profilepics/unnamed (5).jpg';
import nathan from '@/data/profilepics/nathan.jpeg';
import hauxiang from '@/data/profilepics/hauxiang.jpeg';
import lucas from '@/data/profilepics/lucas.jpeg';
import jairus from '@/data/profilepics/jairus.jpeg';
import nicholas from '@/data/profilepics/nicholaslee.jpeg';
</script>

<template>
    <section class="pb-5 position-relative bg-gradient-dark mx-n3">
        <div class="container">
            <div class="row">
                <div class="col-md-8 text-start mb-5 mt-5">
                    <h3 class="text-white z-index-1 position-relative">The Link4Impact Team</h3>
                    <p class="text-white opacity-8 mb-0">Catalysing Impact For You</p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-12">
                    <HorizontalTeamCard
                        class="mt-2"
                        :image="'https://www.comp.nus.edu.sg/stfphotos/shashank.jpg'"
                        :profile="{ name: 'Mr. Shashank', link: 'javascript:;' }"
                        :position="{ label: 'Advisor', color: 'success' }"
                        description="Instructor (Educator Track)."
                    />
                </div>

                <div class="col-lg-6 col-12">
                    <HorizontalTeamCard
                        class="mt-2"
                        :image="lucas"
                        :profile="{ name: 'Lucas ', link: 'javascript:;' }"
                        :position="{ label: 'Scrum Master', color: 'success' }"
                        description="Experience : Grasshopper" 
                    />
                </div>
                <div class="col-lg-6 col-12">
                    <HorizontalTeamCard
                        class="mt-lg-4 mt-5"
                        :image="hauxiang"
                        :profile="{ name: 'Hauxiang', link: 'javascript:;' }"
                        :position="{ label: 'Product Owner', color: 'success' }"
                        description="Experience : Shopee "
                    />
                </div>
                <div class="col-lg-6 col-12">
                    <HorizontalTeamCard
                        class="mt-lg-4 mt-5"
                        :image="nathan"
                        :profile="{ name: 'Nathan', link: 'javascript:;' }"
                        :position="{ label: 'Backend Developer', color: 'success' }"
                        description="Experience : Credit Suisse"
                    />
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-lg-6 col-12">
                    <HorizontalTeamCard
                        class="mt-4 z-index-2"
                        :image="nicholas"
                        :profile="{ name: 'Nicholas', link: 'javascript:;' }"
                        :position="{ label: 'Frontend Developer', color: 'success' }"
                        description="Experience : better.sg"
                    />
                </div>
                <div class="col-lg-6 col-12">
                    <HorizontalTeamCard
                        class="mt-lg-4 mt-5 z-index-2"
                        :image="jairus"
                        :profile="{ name: 'Jairus', link: 'javascript:;' }"
                        :position="{ label: 'Frontend Developer', color: 'success' }"
                        description="Experience : LiT Strategy Consulting"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

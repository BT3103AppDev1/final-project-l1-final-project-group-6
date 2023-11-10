<script setup>
// example component
import HorizontalTeamCard from "@/examples/cards/teamCards/HorizontalTeamCard.vue";

// images
import unnamedImage1 from '@/data/profilepics/unnamed.jpg';
import unnamedImage2 from '@/data/profilepics/unnamed (1).jpg';
import unnamedImage3 from '@/data/profilepics/unnamed (2).jpg';
import unnamedImage4 from '@/data/profilepics/unnamed (3).jpg';
import unnamedImage5 from '@/data/profilepics/unnamed (4).jpg';
import unnamedImage6 from '@/data/profilepics/unnamed (5).jpg';
</script>

<template>
  <section class="pb-5 position-relative bg-gradient-dark mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3 class="text-white z-index-1 position-relative">
            The Executive Team
          </h3>
          <p class="text-white opacity-8 mb-0">
            May the bridges i burn light the way
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-2"
            :image="'https://www.comp.nus.edu.sg/stfphotos/shashank.jpg'"
            :profile="{ name: 'Shashank', link: 'javascript:;' }"
            :position="{ label: 'Boss', color: 'success' }"
            description="How can there be 32/66 attendance."
          />
        </div>
        
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-2"
            :image = "unnamedImage4"
            :profile="{ name: 'Lucas ', link: 'javascript:;' }"
            :position="{ label: 'Peasant01', color: 'success' }"
            description="Loves taking long leisure strolls to the fridge"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5"
            :image="unnamedImage2"
            :profile="{ name: 'Hauxiang', link: 'javascript:;' }"
            :position="{ label: 'Mogger', color: 'success' }"
            description="Lost to a 9year-old with 15 years of work experience"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5"
            :image="unnamedImage3"
            :profile="{ name: 'Nathan', link: 'javascript:;' }"
            :position="{ label: 'Hashira', color: 'success' }"
            description="When I drink the coffee, it wakes up instead"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4 z-index-2"
            :image="unnamedImage1"
            :profile="{ name: 'Nic', link: 'javascript:;' }"
            :position="{ label: 'Saitama', color: 'success' }"
            description="Everyone says follow your dreams so i went back to bed"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5 z-index-2"
            :image="unnamedImage5"
            :profile="{ name: 'Jairus', link: 'javascript:;' }"
            :position="{ label: 'Captain Levi', color: 'success' }"
            description="My biggest fear is a killer saying some funny shit while im playing dead"
          />
        </div>
      </div>
    </div>
  </section>
</template>

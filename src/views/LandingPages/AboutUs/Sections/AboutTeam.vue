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
            :image = "unnamedImage"
            :profile="{ name: 'Lucas ', link: 'javascript:;' }"
            :position="{ label: 'Peasant01', color: 'success' }"
            description="Loves taking long leisure strolls to the fridge"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5"
            :image="'https://static.miraheze.org/greatcharacterswiki/thumb/6/6f/CGIThomasNitrogen.png/300px-CGIThomasNitrogen.png'"
            :profile="{ name: 'Hauxiang', link: 'javascript:;' }"
            :position="{ label: 'Mogger', color: 'success' }"
            description="Lost to a 9year-old with 15 years of work experience"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5"
            :image="'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-10/221004-barney-dinosaur-al-1132-c8ea46.jpg'"
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
            :image="'data:image/jpeg;base64,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'"
            :profile="{ name: 'Nic', link: 'javascript:;' }"
            :position="{ label: 'Saitama', color: 'success' }"
            description="Everyone says follow your dreams so i went back to bed"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5 z-index-2"
            :image="marquez"
            :profile="{ name: 'Jairus', link: 'javascript:;' }"
            :position="{ label: 'Captain Levi', color: 'success' }"
            description="My biggest fear is a killer saying some funny shit while im playing dead"
          />
        </div>
      </div>
    </div>
  </section>
</template>

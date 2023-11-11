<script setup>
// example component
import DefaultCounterCard from "../../../../examples/cards/counterCards/DefaultCounterCard.vue";
</script>
<template>
  <section class="pt-4 pb-6" id="count-stats">
    <div class="container">
      
      <div class="row justify-content-center text-center">
        <div class="col-md-3">
          <DefaultCounterCard
            title="Users rate > 4.5 star"
            description="Our app seeks to continue upgrading and enhancing the user experience"
            :count="5234"
            :duration="3000"
          />
        </div>

        <div class="col-md-3">
          <DefaultCounterCard
            title="Support"
            description="Get customised support wherever you are around the world"
            :count="24"
            suffix="/7"
            :duration="4000"
          />
        </div>
      </div>
    </div>
  </section>
</template>

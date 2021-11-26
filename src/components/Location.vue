<template>
  <div class="flex items-center">
    <img class="h-5 w-5" :src="imgSrc" alt="map-pin">
    <p class="text-base text-teal-300 text-sm font-semibold ml-3">{{store.state.city}}, {{store.state.country}}</p>
  </div>
  
</template>

<script>
import img from "../assets/location-thumb.png";
import {inject} from 'vue';
  export default {
    name:"LocationPin",

    props:['city','country'],

    data:()=>({
      imgSrc: img,
    }),

    setup(){
      const store = inject('store');

      return {
        store
      }
    }

  }

</script>
<script >
import store from './store';
import Navbar from "./layouts/Navbar.vue";
import { onMounted, provide } from 'vue';
import { getLocation } from "./services";


export default {
  name: "App",
  components: {
    navbar: Navbar,
  },

  setup(){
    provide('store',store)
    onMounted(()=>{
      getLocation();
    })

  }

};
</script>

<template>
  <navbar></navbar>
  <div class="py-8 px-3 md:px-10">
    <router-view />
  </div>
</template>

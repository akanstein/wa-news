<template>
  <nav class="flex md:px-10 px-3 w-full border-b shadow-sm py-5 h-16">
    <div class="flex items-center justify-between w-full">
      <div>
        <h3 class="text-blue-700 font-bold">WA News</h3>
      </div>
      <ul class="flex items-center md:space-x-10 space-x-3">
        <li><router-link active-class="text-blue-800 font-semibold" class="hover:text-blue-800 text-sm" to="/">Home</router-link></li>
        <li><router-link active-class="text-blue-800 font-semibold" class="hover:text-blue-800 text-sm" to="/list">List</router-link></li>
        <location ></location>
      </ul>
    </div>
  </nav>
</template>

<script>
  import LocationPin from "../components/Location.vue";

  export default {
    name:'Navbar',
    components: {
        location: LocationPin,
    },

  }
</script>

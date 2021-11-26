<template>
  <div class="w-full">
    <div class="flex mb-5 border-b pb-5">
      <p class="text-lg font-semibold">Your Top Headlines List</p>
    </div>

    <div class="flex flex-wrap space-x-reverse mb-3" v-if="articles.length > 0">
      <div class="2xl:w-1/4 xl:w-1/3 md:w-1/2  w-full mb-7" v-for="(item, i) in articles" :key="i">
        <headline  :headline="item" />
      </div>
    </div>
    <div class="flex justify-center mb-3" v-else-if="articles.length === 0">
      <p class="mt-12 text-gray-600 text-sm">No news in your list at the moment</p>
    </div>
  </div>
</template>

<script>
import { ref, inject, watchEffect } from "vue";
import Headline from "../components/Headline.vue";

export default {
  name: "Home",
  components: {
    headline: Headline,
  },
  
  setup() {
    const store = inject("store");
    let articles = ref([]);

    const getListStories = () => {
      let stories = localStorage.getItem('wa-news');
      articles.value = JSON.parse(stories);
    };

    watchEffect(()=>{
      getListStories();
    })

    return {
      store,
      articles,
    };
  },
};
</script>

<style >
.btn{
  border-radius: 5px;
  border: solid 1px #ebebeb;
  box-shadow:1px 1px 3px #9e9d9d;
  padding: 2px 5px;
}
.btn:disabled{
  box-shadow:none;
  color:#b1b1b1;
}
</style>
<template>
  <div
    class="md:w-80 w-full h-120 rounded-md shadow-lg overflow-hidden relative"
  >
    <div class="absolute top-2 right-2">
      <VTooltip>
        <button
          @click="addToList()"
          class="
            rounded-full
            h-10
            w-10
            bg-white
            shadow-md
            border
            flex
            justify-center
            items-center
            text-lg
            font-bold
          "
        >
          +
        </button>
        <template #popper> Add new to list! </template>
      </VTooltip>
    </div>
    <a target="_blank" :href="headline?.url">
      <img
        class="w-full h-48 object-cover"
        :src="headline?.urlToImage || placeholderImg"
        alt="headline image"
      />
    </a>
    <div class="p-3 h-64 text-left">
      <a
        target="_blank"
        :href="headline?.url"
        class="text-base text-blue-600 font-black"
        >{{ headline?.title }}</a
      >
      <p class="text-sm mt-3">
        {{ headline?.description }}...
        <a class="text-sm text-blue-500" :href="headline?.url">read</a>
      </p>
    </div>
    <p class="text-left text-xs text-black px-3">
      {{ headline?.source?.name }}
    </p>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  name: "Headline",
  props: ["headline"],
  data: () => ({
    placeholderImg:
      "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=",
  }),
  setup() {
      const toast = useToast();

      return { toast }
  },

  methods: {
    addToList() {
      let list = JSON.parse(localStorage.getItem("wa-news")) || [];
      localStorage.setItem("wa-news", JSON.stringify([...list, this.headline]));
      this.toast.info("Added to list");
    },
  },
};
</script>
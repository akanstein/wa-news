<template>
  <div class="w-full">
    <div class="flex mb-5 border-b pb-5">
      <p class="text-lg font-semibold">News Top Headlines</p>
    </div>

    <div class="flex flex-wrap items-center justify-start mb-5 pb-5 border-b">
      <div class="flex items-center md:mb-0 mb-3">
        <p class="text-sm text-gray-500 mr-2">Categories:</p>
        <select v-model="category" class="bg-gray-100 p-1 px-2 rounded" name="category" id="category">
          <option selected value="">Select category</option>
          <option value="">All</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      <div class="flex items-center md:ml-10 md:mb-0 mb-3">
        <p class="text-sm text-gray-500 mr-2">Sources:</p>
        <select v-model="sources" class="bg-gray-100 p-1 px-2 rounded" name="category" id="category">
          <option selected value="">Select news source</option>
          <option value="">All</option>
          <option value="bbc-news">BBC</option>
          <option value="cnn">CNN</option>
          <option v-for="(item,i) in sourcesList" :key="i" :value="item?.id">{{item.name}}</option>
        </select>
      </div>
      <div class="flex items-center md:ml-10 ">
        <input v-model="search" class="bg-gray-100 p-1 px-2 rounded-l-md w-48" type="text" placeholder="Search the news" />
        <button @click="searchNews(search)" class="bg-gray-200 p-1 rounded-r-md hover:shadow-md">search</button>
      </div>
    </div>
    <div v-if="loadingHeadlines" class="flex flex-wrap justify-center">
      <div class="vld-parent">
        <loading v-model:active="loadingHeadlines"
                 :can-cancel="true"
                 :is-full-page="true"/>
      </div>
    </div>
    <div class="flex flex-wrap space-x-reverse mb-3" v-if="!loadingHeadlines && (articles.length > 0)">
      <div class="2xl:w-1/4 xl:w-1/3 md:w-1/2 w-full mb-7" v-for="(item, i) in articles" :key="i">
        <headline  :headline="item" />
      </div>
    </div>
    <div class="flex justify-center mb-3" v-else-if="!loadingHeadlines && (articles.length === 0)">
      <p class="mt-12 text-gray-600 text-sm">No news available at the moment</p>
    </div>
    <div class="flex justify-end items-center">
      <span class="text-sm text-gray-500">page {{currentPage}} of {{pages}} pages</span>
      <button class="ml-2 text-blue-400 btn" :disabled="currentPage  === 1" @click="changePage(currentPage - 1)">prev</button>
      <button class="ml-2 text-blue-400 btn" :disabled="currentPage  === pages" @click="changePage(currentPage + 1)">next</button>
    </div>
  </div>
</template>

<script>
import { ref, inject, watch } from "vue";
import { fetchTopNews, fetchTopSources } from "../services";
import Headline from "../components/Headline.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "Home",
  components: {
    headline: Headline,
    Loading
  },
  data:()=>({
    search:""
  }),

  setup() {
    const store = inject("store");
    let articles = ref([]);
    let currentPage = ref(1);
    let pageSize = ref(5);
    let pages = ref(0);
    let category = ref('');
    let sources = ref('');
    let sourcesList = ref([]);
    let keyWord = ref('');
    let loadingHeadlines = ref(true);

    const changePage = function(page){
      currentPage.value = page;
    }

    const searchNews = function(value){
      keyWord.value = value;
    }

    const getTopStories = async (params) => {
      loadingHeadlines.value = true;
      let [country,page,category,sources,keyWord] = params;
      let queryParams = {
        country:country,
        category:category,
        sources:sources,
        page:page,
        q:keyWord,
        pageSize:pageSize.value
      }
      try {
        let top = await fetchTopNews(queryParams);
        articles.value = top?.articles;
        pages.value = Math.ceil(top?.totalResults/5)
      } catch (error) {
        console.log(error);
      }
      loadingHeadlines.value = false;
    };

    const getSources = async (params) =>{
      let [country, _,category] = params;
      let queryParams = {
        country:country,
        category:category,
      }
      try {
        let src = await fetchTopSources(queryParams)
        console.log(src)
        sourcesList.value = src.sources;      
      } catch (error) {
        console.log(error);
      }
    }

    watch(
      () => [store.state.country, currentPage.value, category.value, sources.value, keyWord.value],
      (values, _) => {
        getTopStories(values);
        getSources(values)
      }
    );

    return {
      store,
      loadingHeadlines,
      articles,
      pages,
      category,
      sources,
      sourcesList,
      searchNews,
      currentPage,
      changePage,
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
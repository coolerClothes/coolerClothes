<script>
import { useProductsStore } from "../store";
import Card from "../components/Card.vue";
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Card,
  },

  setup() {
    const store = useProductsStore();
    const route = useRoute();

    const category = ref(route.params.category);
    const searchQuery = ref(route.params.searchquery);
    /*     const sortQuery = ref(route.params.sortquery); */
    const products = ref(store.productsCatalogue);
    const productsArray = ref([]);
    const searchByCategory = computed(() => category.value !== "all");

    /* new product array with only products that match searchquery*/
    const filteredArray = computed(() =>
      productsArray.value.filter(matchesSearchQuery),
    );

    function matchesSearchQuery(product) {
      return searchQuery.value.every((word) =>
        product.title.toLowerCase().includes(word),
      );
    }

    /* watch for if products are fetched from Pinia */
    watch(
      () => store.productsCatalogue,
      (newProductsCatalogue) => {
        products.value = newProductsCatalogue;
        if (products.value) {
          /* Products object turned into an array*/
          productsArray.value = Object.values(products.value);
        }
      },
      { immediate: true },
    );

    /* watchers for route changes */
    watch(
      () => route.params.category,
      (newCategory) => {
        category.value = newCategory;
      },
      { immediate: true },
    );
    watch(
      () => route.params.searchquery,
      (newSearchQuery) => {
        searchQuery.value = newSearchQuery;
        /* split to make an array of multiple word searchqueries */
        searchQuery.value = searchQuery.value.toLowerCase().split(" ");
      },
      { immediate: true },
    );

    /* SORTING FUNCTIONALITY */
    /* const sortCriteria = ref("");
    const sortedProducts = computed(); */
    function sortByName(array) {
      /*  if (criteria == "name") { */
      array.sort((a, b) => {
        let fa = a.title.toLowerCase(),
          fb = b.title.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        console.log(array);
        return 0;
      });
      /* } else if (criteria == "price") {
        filteredArray.sort((a, b) => {
          return a.price - b.price;
        });
      }*/
    }

    return {
      products: store.productsCatalogue,
      filteredArray,
      category,
      searchQuery,
      searchByCategory,
    };
  },
};
</script>

<template>
  <div
    id="template-grid"
    class="grid xl:px-[10%] xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 2xl:gap-[1.7vw] px-4 py-16"
  >
    <div
      id="headers"
      class="text-2xl font-antonio col-span-full space-y-2 mb-2"
    >
      <div v-if="searchByCategory" id="category-name">
        <p>
          {{ category.charAt(0).toUpperCase() + category.substring(1) }}
        </p>
      </div>
      <div v-else>
        <div
          id="query-result-text"
          v-if="filteredArray.length > 0"
          class="space-y-2"
        >
          <h2>
            Results for:
            <span class="text-[#ff007a]">{{ searchQuery.join(" ") }}</span>
          </h2>
        </div>
        <p v-else id="no-result">
          No results found for:
          <span class="text-[#ff007a]">{{ searchQuery.join(" ") }}</span>
        </p>
      </div>
      <!-- possible headers end -->

      <div
        id="sorting"
        v-if="searchByCategory || filteredArray.length > 0"
        class="text-sm font-inter space-x-4"
      >
        <span>Sort by:</span>
        <span class="rounded-full divide-[#a3a3a3] text-[#a3a3a3]">
          <button
            label="popularity"
            class="px-2 rounded-full hover:text-black hover:bg-[#a3a3a3]"
          >
            Popularity
          </button>

          <button
            label="price"
            class="px-2 rounded-full hover:text-black hover:bg-[#a3a3a3]"
          >
            Price
          </button>
          <button
            label="name"
            class="px-2 rounded-full hover:text-black hover:bg-[#a3a3a3]"
          >
            <!--  <RouterLink :to="`/search/${category}/${searchQuery}/${sortQuery}`">
          </RouterLink> -->
            Name
          </button>
          <button
            label="brand"
            class="px-2 rounded-full hover:text-black hover:bg-[#a3a3a3]"
          >
            <!--  <RouterLink :to="`/search/${category}/${searchQuery}/${sortQuery}`">
          </RouterLink> -->
            Brand
          </button>
        </span>
      </div>
      <!-- sorting -->
    </div>
    <!-- headers -->
    <Card
      v-for="product in filteredArray"
      class="col-span-1"
      :key="product.id"
      :product="product"
      :cardImgSrc="product.imgSrc"
      :searchCategory="category"
      :categorySearch="true"
    />
  </div>
</template>

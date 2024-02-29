<script>
import {useProductsStore} from "../store"
import Card from "../components/Card.vue"
import { ref, watch, computed} from "vue";
import {useRoute} from "vue-router"

export default {
  components: {
    Card,
  },
  setup() {
    const store = useProductsStore();
    const route = useRoute();
    const category = ref(route.params.category);
    const searchQuery = ref(route.params.searchquery);
    const products = ref(store.productsCatalogue);
    const productsArray = ref([]);
    const searchByCategory = computed(() => category.value !== "all");

    /* new product array with only products that match searchquery*/
    const filteredArray = computed(() =>
      productsArray.value.filter(matchesSearchQuery)
    );

    function matchesSearchQuery(product) {
      return searchQuery.value.every(word => product.title.toLowerCase().includes(word));
     }

    /* watch for if products are fetched from Pinia */
    watch(
        () => store.productsCatalogue,
        (newProductsCatalogue) => {
            products.value = newProductsCatalogue;
            if(products.value){
              /* Products object turned into an array*/
              productsArray.value = Object.values(products.value);
            }
    }, {immediate: true});

    /* watchers for route changes */
    watch(() => route.params.category, (newCategory) => {
      category.value = newCategory;
    },{ immediate: true });

    watch(() => route.params.searchquery, (newSearchQuery) => {
      searchQuery.value = newSearchQuery;
      /* split to make an array of multiple word searchqueries */
      searchQuery.value = searchQuery.value.toLowerCase().split(" ");
    },{ immediate: true });

    return {
                products: store.productsCatalogue,
                filteredArray,
                category,
                searchQuery,
                searchByCategory
            }

}
}

</script>

<template>
  <div v-if="searchByCategory">
      <p class="text-2xl font-antonio pt-4 pl-4">{{ category}}</p>
    </div>
    <div v-else class="text-2xl font-antonio pt-4 pl-4">
      <p> Search results for "{{ searchQuery }}"</p>
    </div>
  <div
      class="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 p-4">
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

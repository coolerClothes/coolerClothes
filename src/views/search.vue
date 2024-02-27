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

    /* new product array with only products that match searchquery*/
    const filteredArray = computed(() =>
      productsArray.value.filter(matchesSearchQuery)
    );

    /* checks if products in productsArray have at least one value that includes the searchquery*/
    function matchesSearchQuery(product) {
        return Object.values(product).some((value) =>
        typeof value === "string" &&
        /* filtering out product description values from search by using length */
        value.length < 40 &&
        searchQuery.value.some((splitOfQuery) =>
      value.toLowerCase().includes(splitOfQuery.toLowerCase())
    )
    )
    };

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
                category
            }

}}

</script>

<template>
 <div class="grid grid-cols-5 gap-4 p-4">
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

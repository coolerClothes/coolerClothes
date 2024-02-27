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
    const searchquery = ref(route.params.searchquery.toLowerCase());
    const products = ref(store.productsCatalogue);
    const productsArray = ref([]);
 
        const filteredArray = computed(() =>
      productsArray.value.filter(matchesSearchQuery)
    );

    function matchesSearchQuery(product) {
        return Object.values(product).some((value) =>
        typeof value === "string" && value.toLowerCase().includes(searchquery.value)
      );
    }

    watch(
        () => store.productsCatalogue,
        (newProductsCatalogue) => {
            products.value = newProductsCatalogue;
            productsArray.value = Object.values(products.value);
      console.log(productsArray.value)
      console.log (filteredArray.value)
        });

    watch(() => route.params.category, (newCategory) => {
      category.value = newCategory;
    });

    watch(() => route.params.searchquery, (newSearchQuery) => {
      searchquery.value = newSearchQuery;
    });

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

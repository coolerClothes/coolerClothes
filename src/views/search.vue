<script>
import {useProductsStore} from "../store"
import Card from "../components/Card.vue"
import { ref, watch} from "vue";
import {useRoute} from "vue-router"

export default {
  components: {
    Card,
  },
  setup() {
    const store = useProductsStore();
    const route = useRoute();
    const category = ref(route.params.category);
    const products = ref(store.productsCatalogue);
    watch(
        () => store.productsCatalogue,
        (newProductsCatalogue) => {
            products.value = newProductsCatalogue
        });
    watch(() => route.params.category, (newCategory) => {
      category.value = newCategory;
    });

    return {
                products: store.productsCatalogue,
                category
            }

}}
/* testing commit */

</script>

<template>
 <div class="grid grid-cols-5 gap-4 p-4">
    <Card
    v-for="product in products"
      class="col-span-1"
      :key="product.id"
      :product="product"
      :cardImgSrc="product.imgSrc"
      :searchCategory="category"
      :categorySearch="true"
    />
  </div>

</template>

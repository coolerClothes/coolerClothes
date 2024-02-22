<script>
import {useProductsStore} from "../store"
import Card from "../components/Card.vue"
import {ref, watch} from "vue"

export default {
  components: {
    Card,
  },
  setup() {
    const store = useProductsStore();
    const products = ref(store.productsCatalogue);
    watch(
    () => store.productsCatalogue, (newProductsCatalogue)=>{products.value = newProductsCatalogue},)
    return {products};
  },
}

</script>

<template>
 <div class="grid grid-cols-5 gap-4 p-4" >
    <div v-for="product in products">
    <Card v-if="product.category === $route.params.category"
      class="col-span-1"
      :key="product.id"
      :product="product"
      :cardImgSrc="product.imgSrc"
    />
</div>
  </div>

</template>

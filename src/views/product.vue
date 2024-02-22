<script>
import ProductInfo from "../components/ProductInfo.vue";
import Card from "../components/Card.vue";
import { useProductsStore } from "../store";

export default {
  components: {
    ProductInfo,
    Card,
  },
  setup() {
    const store = useProductsStore();
    return {
      products: store.productsCatalogue,
    };
  },
};
</script>
<template>
  <div class="px-24 my-4 overflow-x-hidden">
    <!-- <h1 class="col-span-10">product page view. {{ $route.params.product }}</h1> -->
    <ProductInfo />
    <div class="grid grid-cols-5 gap-4 p-4">
      <Card
        class="col-span-1"
        v-for="product in products"
        :key="product.id"
        :product="product"
        :cardImgSrc="product.imgSrc"
      />
    </div>
  </div>
</template>

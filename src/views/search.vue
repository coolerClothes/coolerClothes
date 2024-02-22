<script>
import {useProductsStore} from "../store"
import Card from "../components/Card.vue"
export default {
  components: {
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
<!--     <div>
 -->     <!--    <div v-for="product in store.productsCatalogue" :key="product.id">
            <li v-if="product.category = $route.params.category">{{ product.title}}: {{product.category}}</li></div>
        <h1>Category: {{$route.params.category}}</h1> -->
<!--         <div class="px-24 my-4 overflow-x-hidden">
 -->    <!-- <h1 class="col-span-10">product page view. {{ $route.params.product }}</h1> -->
    <div class="grid grid-cols-5 gap-4 p-4">
    <div v-for="product in store.productsCatalogue" :key="product.id" :product="product" :cardImgSrc="product.imgSrc">
        <div v-if="product.category === $route.params.category">
      <Card class="col-span-1" v-if="product.category === $route.params.category"></Card>
    </div>
    </div>
    </div>

</template>

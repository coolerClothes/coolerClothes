<script setup>
import ProductInfo from "../components/ProductInfo.vue";
</script>
<template>
  <div class="grid grid-cols-10 space-x-6 px-24 my-4 overflow-hidden">
    <!-- <h1 class="col-span-10">product page view. {{ $route.params.product }}</h1> -->
    <ProductInfo />
  </div>
</template>

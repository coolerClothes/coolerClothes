<template>
  <div id="card-container" class="container h-auto col-span-1">
    <div id="card-background" class="rounded shadow">
      <img :src="cardImgSrc" class="overflow-hidden" />
      <div id="product-info" class="p-4">
        <h3>{{ product.title }}</h3>
        <h2>SEK{{ product.price }}</h2>
        <button id="add-to-cart"></button>
        <button id="read-more"></button>
      </div>
      <!-- product-info -->
    </div>
    <!-- card-background -->
  </div>
  <!-- card-container -->
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    cardImgSrc: {
      type: String,
    },
  },
};
</script>

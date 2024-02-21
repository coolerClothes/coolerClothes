<template>
  <div id="card-container" class="container h-auto col-span-1">
    <div id="card-background" class="rounded shadow">
      <img
        :src="cardImgSrc"
        class="overflow-hidden w-full h-32 sm:h-48 object cover"
      />
      <div id="product-info" class="p-4 grid-cols-3 grid-rows-2">
        <h3>{{ product.title }}</h3>
        <h4>{{ product.brand }}</h4>
        <h2 class="row-span-2">SEK{{ product.price }}</h2>
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

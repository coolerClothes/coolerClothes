<template>
  <div id="card-background" class="rounded shadow overflow-hidden">
    <img :src="cardImgSrc" class="w-full h-32 sm:h-48 object-cover" />
    <div id="product-info" class="grid grid-cols-3 grid-rows-2 p-4">
      <h3 class="col-span-2 row-span-1">{{ product.title }}</h3>
      <h4 class="col-span-2 row-span-1">{{ product.brand }}</h4>
      <h2 class="col-span-1 row-span-2 text-right">SEK{{ product.price }}</h2>
    </div>
    <!-- product-info -->
  </div>
  <!-- card-background -->
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

<!-- MEANT TO BE INSTANCIATED INSIDE A GRID, example below


  <div class="grid grid-cols-5 gap-4 p-4">
    <Card
      class="col-span-1"
      v-for="product in products"
      :key="product.id"
      :product="product"
      :cardImgSrc="product.imgSrc"
    />
  </div> -->

<template>
  <div id="card-background" class="rounded shadow overflow-hidden" v-if="show">
    <RouterLink :to="`/products/${product.id}`">
      <!-- The card links to the product page, that in turn pass these props to the productInfo component on call -->
      <img :src="cardImgSrc" class="w-full h-32 sm:h-48 object-cover" />
    </RouterLink>

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
  computed: {
    show() {
      if (this.categorySearch === true) {
        if (this.product.category === this.searchCategory) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    cardImgSrc: {
      type: String,
    },
    searchCategory: {
      type: String,
    },
    categorySearch: {
      type: Boolean,
    },
  },
};
</script>

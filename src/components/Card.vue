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
  <div
    id="card-background"
    class="flex flex-col rounded shadow overflow-hidden bg-[#1c1c1c]"
    v-if="show">
  <div>
    <RouterLink :to="`/products/${product.id}`">
      <!-- The card links to the product page, that in turn pass these props to the productInfo component on call -->
      <img
        :src="cardImgSrc"
        class="w-full h-32 sm:h-48 lg:h-56 xl:h-[25vh] object-cover"
      />
    </RouterLink>
    <div><img src="/src/assets/icons/favorite-icon.svg" alt="red heart" @click="addToFavorites(product)"></div>

    <div
      id="product-info"
      class="flex flex-row self-stretch items-center px-2 py-3 md:py-6 space-x-2 justify-around h-full"
    >
      <div id="title-brand" class="flex flex-col stretch flex-wrap space-y-1">
        <h3 class="text-sm font-medium">{{ product.title }}</h3>
        <h4 class="text-xs font-light">
          {{ product.brand }}
        </h4>
      </div>
      <!-- end title-brand -->
      <h2 class="flex-none text-md">{{ product.price }}kr</h2>
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
        if (this.searchCategory !== "all") {
          if (this.product.category === this.searchCategory) {
            return true;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
  },
  setup() {
    const addToFavorites = (product) => {
      const favoritesArray = JSON.parse(localStorage.getItem("favoritesArray"))||[];
     favoritesArray.push(product.title)
    localStorage.setItem("favoritesArray", JSON.stringify(favoritesArray));
    }

    return {addToFavorites}
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

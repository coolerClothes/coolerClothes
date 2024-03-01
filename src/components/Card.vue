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
    class="flex flex-col rounded-lg shadow overflow-hidden bg-[#1c1c1c] font-inter"
    v-if="show"
  >
    <div class="flex relative">
      <RouterLink :to="`/products/${product.id}`" class="flex-1">
        <!-- The card links to the product page, that in turn pass these props to the productInfo component on call -->
        <img
          :src="cardImgSrc"
          class="w-full h-32 sm:h-48 lg:h-56 xl:h-[25vh]object-cover"
        />
      </RouterLink>
      <div @click="toggleFavorite(product)" class="absolute right-0">
        <svg
          class="h-10 w-10 text-[#FF007A] rounded-bl-lg bg-black bg-opacity-50 hover:text-[#ff59a9]"
          :class="{ 'fill-[#FF007A] text-[#1c1c1c]': isFavorite }"
          viewBox="-3 -1 29 26"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
    </div>
    <div
      id="product-info"
      class="flex flex-row self-stretch items-center px-2 py-3 md:py-6 space-x-2 justify-around h-full"
    >
      <div id="title-brand" class="flex flex-col stretch flex-wrap space-y-1">
        <h3 class="text-sm font-medium">{{ product.title }}</h3>
        <h4 class="text-xs font-light text-[#c1c1c1]">
          {{ product.brand }}
        </h4>
      </div>
      <!-- end title-brand -->
      <h2 class="flex-none text-lg">{{ product.price }}kr</h2>
    </div>
    <!-- product-info -->
  </div>
  <!-- card-background -->
</template>
<script>
import { ref, onMounted } from "vue";

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
  setup(props, { emit }) {
    const isFavorite = ref();

    const checkFavorite = (product) => {
      let favoritesArray =
        JSON.parse(localStorage.getItem("favoritesArray")) || [];
      if (favoritesArray.includes(product.title)) {
        return (isFavorite.value = true);
      } else {
        return (isFavorite.value = false);
      }
    };

    onMounted(() => {
      checkFavorite(props.product);
    });

    const toggleFavorite = (product) => {
      let favoritesArray =
        JSON.parse(localStorage.getItem("favoritesArray")) || [];
      const index = favoritesArray.lastIndexOf(product.title);
      if (index !== -1) {
        favoritesArray.splice(index, 1);
        isFavorite.value = false;
      } else {
        favoritesArray.push(product.title);
        isFavorite.value = true;
      }
      localStorage.setItem("favoritesArray", JSON.stringify(favoritesArray));
      emit('toggle-favorite');
}

    return { toggleFavorite, isFavorite, checkFavorite };
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

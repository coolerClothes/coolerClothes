<script>
import { useProductsStore } from "../store";
import { ref, watch, computed } from "vue";
import Card from "../components/Card.vue";

export default {
  components: {
    Card,
  },
  setup() {
    const store = useProductsStore();
    const products = ref(store.productsCatalogue);
    const productsArray = ref([]);
    let favoritesArray = ref(
      JSON.parse(localStorage.getItem("favoritesArray")),
    );
    console.log(favoritesArray.value);

    const filteredArray = computed(() =>
      productsArray.value.filter(isInLocalStorage),
    );

    function isInLocalStorage(product) {
      if (favoritesArray.value !== null) {
        return favoritesArray.value.includes(product.title);
      }
    }

    const updateLikedProducts = () => {
      favoritesArray.value = JSON.parse(localStorage.getItem("favoritesArray"));
    };

    watch(
      () => store.productsCatalogue,
      (newProductsCatalogue) => {
        products.value = newProductsCatalogue;
        if (products.value) {
          productsArray.value = Object.values(products.value);
        }
      },
      { immediate: true },
    );

    return {
      filteredArray,
      favoritesArray,
      updateLikedProducts,
    };
  },
};
</script>

<template>
  <div class="xl:px-[10%] px-4 mt-4 overflow-x-hidden text-2xl font-antonio">
    <p class="pt-4 pl-4">Favorites</p>
    <div v-if="favoritesArray.length > 0">
      <div
        class="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 2xl:gap-[1.7vw] p-4"
      >
        <Card
          @toggle-favorite="updateLikedProducts"
          v-for="product in filteredArray"
          class="col-span-1"
          :key="product.id"
          :product="product"
          :cardImgSrc="product.imgSrc"
        />
      </div>
    </div>
    <div v-else>
      <p class="pt-6 pl-4 font-inter font-light text-[#ff007a]">
        No love could be found :(
      </p>
      <p class="pt-2 pl-4 font-light font-inter text-[#505050] text-sm">
        (Add favorites by clicking a products heart icon)
      </p>
    </div>
  </div>
</template>

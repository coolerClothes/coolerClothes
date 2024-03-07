<script setup>
import { ref, watch, reactive } from "vue";
import ProductInfo from "../components/ProductInfo.vue";
import Card from "../components/Card.vue";
import { useProductsStore } from "../store";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useProductsStore();
const products = ref(store.productsCatalogue);
const currentID = ref(route.params.productID);
const currentProduct = ref(null);

if (products.value !== null || undefined) {
  currentProduct.value = Object.values(products.value).find(
    (product) => product.id == route.params.productID,
  );
}

watch(
  () => store.productsCatalogue,
  (newProductsCatalogue) => {
    products.value = newProductsCatalogue;
    currentProduct.value = Object.values(newProductsCatalogue).find(
      (product) => product.id == route.params.productID,
    );
  },
);
watch(
  () => route.params.productID,
  (newValue) => {
    currentID.value = route.params.productID;
    currentProduct.value = Object.values(products.value).find(
      (product) => product.id == newValue,
    );
  },
);
</script>

<template>
  <div
    id="breacrumbs"
    class="flex justify-center my-3 font-inter max-md:hidden text-sm"
  >
    <router-link to="/">
      <h3 class="text-[#858585] hover:text-[#f5f5f5]">Home</h3>
    </router-link>

    <h3 class="px-1 text-[#858585]">/</h3>

    <router-link :to="'/search/' + currentProduct.category">
      <h3 class="text-[#858585] hover:text-[#f5f5f5]">
        {{
          currentProduct.category[0].toUpperCase() +
          currentProduct.category.slice(1)
        }}
      </h3>
    </router-link>

    <h3 class="px-1 text-[#858585]">/</h3>

    <router-link :to="'/products/' + currentProduct.id">
      <h3 class="font-medium cursor-default">
        {{ currentProduct.title }}
      </h3>
    </router-link>
  </div>

  <div class="xl:px-[10%] px-4 my-4 overflow-x-hidden">
    <!-- has to instanciate with only one object, which has to passed to the page -->
    <div v-if="currentProduct !== null">
      <ProductInfo
        :item="currentProduct"
        :galleryImgSrc="currentProduct.imgSrc"
      />
    </div>
  </div>
  <!-- grid for the cards -->
  <h2 class="text-2xl col-span-full font-antonio px-4 pt-4 xl:px-[10%]">
    Similar products
  </h2>
  <div
    class="p-4 grid gap-4 2xl:gap-[1.7vw] xl:px-[10%] xl:grid-cols-5 md:grid-cols-4 max-md:flex max-md:w-full max-md:overflow-x-auto max-md:gap-2 max-md:mb-8 max-md:pb-8 max-md:snap-x"
  >
    <Card
      class="col-span-1"
      v-for="product in products"
      :key="product.id"
      :product="product"
      :cardImgSrc="product.imgSrc"
    />
  </div>
</template>

<style scoped>
*::-webkit-scrollbar {
  width: 20px;
  height: 25px;
}

*::-webkit-scrollbar-track {
  background: #0c0c0c;

  margin: 0 30px;
}

*::-webkit-scrollbar-thumb {
  background-color: #ec3f79;
  padding: 20px;
}
</style>

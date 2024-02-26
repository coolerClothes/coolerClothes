<script setup>
import { ref, watch } from "vue";
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
    (product) => product.id == route.params.productID
  );
  console.log(currentProduct.value);
}

watch(
  () => store.productsCatalogue,
  (newProductsCatalogue) => {
    products.value = newProductsCatalogue;
    currentProduct.value = Object.values(newProductsCatalogue).find(
      (product) => product.id == route.params.productID
    );
    console.log(currentID);
    console.log(currentProduct.value);
  },

  () => route.params.currentID,
  //not working
  (newValue) => {
    currentID.value = route.params.productID;
    currentProduct.value = Object.values(products.value).find(
      (product) => product.id == newID
    );
    console.log(newValue);
  }
);
</script>

<template>
  <div class="lg:px-24 px-4 my-4 overflow-x-hidden">
    <!-- has to instanciate with only one object, which has to passed to the page -->
    <div v-if="currentProduct !== null">
      <ProductInfo
        :product="currentProduct"
        :galleryImgSrc="currentProduct.imgSrc"
      />
    </div>

    <!-- grid for the cards -->
    <div
      class="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 p-4"
    >
      <Card
        class="col-span-1"
        v-for="product in products"
        :key="product.id"
        :product="product"
        :cardImgSrc="product.imgSrc"
      />
    </div>
  </div>
</template>

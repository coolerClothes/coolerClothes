<script>
import { ref, watch } from "vue";
import ProductInfo from "../components/ProductInfo.vue";
import Card from "../components/Card.vue";
import { useProductsStore } from "../store";
import { useRoute } from "vue-router";

export default {
  components: {
    ProductInfo,
    Card,
  },
  setup() {
    const route = useRoute();
    const store = useProductsStore();
    const products = ref(store.productsCatalogue);
    const currentID = ref(route.params.productID);
    watch(
      () => store.productsCatalogue,
      (newProductsCatalogue) => {
        products.value = newProductsCatalogue;
      },
      () => route.params.productID,
      (currentID) => {
        currentID.value = currentID;
      }
    );
    return {
      products: store.productsCatalogue,
      currentID,
    };
  },
};
</script>

<template>
  <div class="px-24 my-4 overflow-x-hidden">
    <!-- has to instanciate with only one object, which has to passed to the page -->
    <!-- <ProductInfo :product="activeProduct" :galleryImgSrc="activeImgSrc" /> -->

    <!-- grid for the cards -->
    <div class="grid grid-cols-5 gap-4 p-4">
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

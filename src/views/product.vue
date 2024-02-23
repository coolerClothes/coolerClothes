<script>
import { ref, watch } from "vue";
import ProductInfo from "../components/ProductInfo.vue";
import Card from "../components/Card.vue";
import { useProductsStore } from "../store";

export default {
  components: {
    ProductInfo,
    Card,
  },
  setup() {
    const store = useProductsStore();
    const products = ref(store.productsCatalogue);
    const currentProduct = ref(route.params.product);
    const galleryImgSrc = ref(route.params.galleryImgSrc);
    watch(
      () => store.productsCatalogue,
      (newProductsCatalogue) => {
        products.value = newProductsCatalogue;
      },
      () => route.params.product,
      (currentProduct) => {
        currentProduct.value = currentProduct;
      },
      () => route.params.galleryImgSrc,
      (currentImg) => {
        galleryImgSrc = currentImg;
      }
    );

    return { currentProduct, galleryImgSrc };
  },
};

/* Removed the code bellow because I tried to specify the product to be displayed through the route parameters instead , to no avail */

/* export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    galleryImgSrc: {
      type: String,
    },
  },
}; */
</script>

<template>
  <div class="px-24 my-4 overflow-x-hidden">
    <!-- has to instanciate with only one object, which has to passed to the page -->
    <ProductInfo :product="currentProduct" :galleryImgSrc="galleryImgSrc" />

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

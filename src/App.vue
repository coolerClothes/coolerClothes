<script setup>
import { useProductsStore } from "./store";
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
const store = useProductsStore();

const fetchProducts = async () => {
  try {
    await fetch("../products.json")
      .then((response) => response.json())
      .then((result) => {
        store.getProducts(result);
      });
  } catch (error) {
    console.log(error);
  }
};

fetchProducts();
</script>

<template>

  <Navbar />
  <div class="flex flex-col min-h-screen justify-around overflow-x-hidden">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<style scoped></style>

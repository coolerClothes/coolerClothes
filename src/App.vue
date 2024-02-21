<script setup>
import { useProductsStore } from "./store";

const store = useProductsStore();

const fetchProducts = async () => {
  try {
    await fetch("../public/products.json")
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
  <div>
     <router-link to="/">home page </router-link>
    <router-link to="/search">search result </router-link>
    <router-link to="/product">product pages </router-link>
    <br>
    <filterFilter></filterFilter>
    <br>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

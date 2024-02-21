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
    <ul>
      router links:
      <li><router-link to="/">home page</router-link></li>
      <li><router-link to="/search">search result</router-link></li>
      <li><router-link to="/product">product pages</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

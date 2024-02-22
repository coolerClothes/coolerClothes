import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  actions: {
    getProducts(data) {
      this.productsCatalogue = data;
    },
    getProductByName(name) {
      return this.productsCatalogue.find((product) => product.name === name);
    },
  },
  state: () => ({ productsCatalogue: null }),
});

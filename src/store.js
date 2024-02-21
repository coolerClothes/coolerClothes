import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  actions: {
    getProducts(data) {
      this.productsCatalogue = data;
    },
  },
  state: () => ({ productsCatalogue: null }),
});

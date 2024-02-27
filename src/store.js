import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  actions: {
    getProducts(data) {
      this.productsCatalogue = data;
    },
  },
  state: () => ({ productsCatalogue: null }),
});

export const useCartStore = defineStore("cart", {
  actions: {
    getCart() {
      this.cart = localStorage.getItem(JSON.parse("cart"));
    },
    addToCart(product) {
      this.cart = [this.cart, product];
    },
    clearCart() {
      this.cart = [];
    },
  },
  state: () => ({ cart: [] }),
});

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
      this.cart = JSON.parse(localStorage.getItem("cart"));
    },

    addToCart(product) {
      if (this.cart) {
        this.cart = [...this.cart, product];
      } else {
        this.cart = [product];
      }

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    removeFromCart(product) {
      const index = this.cart.lastIndexOf(product);
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.cart = [...this.cart];
      }

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    clearCart() {
      this.cart = [];
    },

    removeAllDuplicates(productToRemove) {
      this.cart = this.cart.filter(
        (product) =>
          product.title !== productToRemove.title ||
          product.chosenSize !== productToRemove.chosenSize,
      );
    },
  },
  state: () => ({ cart: [] }),
});

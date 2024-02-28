<script setup>
import { ref, watch } from "vue";
import { useCartStore } from "../store";

const emit = defineEmits(["handle-cart-menu-activation"]);

const store = useCartStore();
const cart = ref({});

const sortCart = () => {
  const newGroupedCart = {};
  const totalAmount = 0;
  for (const product of store.cart) {
    const key = `${product.title}-${product.chosenSize}`;

    if (newGroupedCart[key]) {
      newGroupedCart[key].push(product);
    } else {
      // Otherwise, create a new array with the item
      newGroupedCart[key] = [product];
    }
  }
  cart.value = newGroupedCart;
};

if (store.cart !== null) {
  sortCart();
  console.log(cart.value);
}

watch(
  () => store.cart,
  () => {
    sortCart();
    console.log(cart.value);
  }
);
</script>

<template>
  <div id="cartProducts" v-if="cart" v-for="productArray in cart">
    <div class="p-2">
      <div class="flex">
        <router-link
          :to="'/products/' + productArray[0].id"
          @click="emit('handle-cart-menu-activation')"
          ><img
            :src="productArray[0].imgSrc"
            :alt="productArray[0].alt"
            class="max-w-28"
        /></router-link>

        <div class="flex flex-col flex-1 pl-5">
          <router-link
            :to="'/products/' + productArray[0].id"
            @click="emit('handle-cart-menu-activation')"
          >
            <h2 class="font-semibold leading-1">
              {{ productArray[0].title }}
            </h2>
          </router-link>
          <h3 class="text-xs font-thin pt-1">
            {{ productArray[0].brand }}
          </h3>
          <h3 class="text-sm font-light pt-2">
            {{ productArray[0].category }}
          </h3>
          <div class="flex justify-between items-center">
            <h3 class="text-lg">{{ productArray[0].chosenSize }}</h3>
            <h3 class="text-base pr-5">{{ productArray.length }}</h3>
          </div>
        </div>
        <div class="flex flex-col justify-between mx-3">
          <h2>{{ productArray[0].price }}:-</h2>
          <img
            src="/src/assets/icons/trash-icon.svg"
            alt="trashcan icon"
            class="h-7 cursor-pointer"
            @click="store.removeAllDuplicates(productArray[0])"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else>Cart is empty</div>
</template>

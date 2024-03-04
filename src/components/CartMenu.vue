<script setup>
import { ref, watch } from "vue";
import { useCartStore } from "../store";
import CartCards from "./CartCards.vue";

const emit = defineEmits(["handle-cart-menu-activation"]);
const props = defineProps({
  cartMenuActive: { required: true, type: Boolean },
});

const store = useCartStore();

const totalAmount = ref(0);

const getTotalAmount = () => {
  let newTotalAmount = 0;
  if (!store.cart) {
    return;
  }
  for (const product of store.cart) {
    newTotalAmount += product.price;
  }
  totalAmount.value = newTotalAmount;
};

const handleCartMenuActivation = () => {
  emit("handle-cart-menu-activation");
};

watch(
  () => store.cart,
  () => {
    getTotalAmount();
  },
);

getTotalAmount();
</script>

<template>
  <div
    id="cart-menu-container"
    :class="
      'fixed flex h-full w-full top-0 z-40 transition-all duration-300 bg-[rgba(0,0,0,.3)] justify-end ' +
      (cartMenuActive ? 'opacity-100 ' : ' opacity-0 pointer-events-none ')
    "
  >
    <div class="flex-1" @click="emit('handle-cart-menu-activation')"></div>
    <div
      id="cart-menu"
      :class="
        ' h-full z-50 w-[80%] max-w-[400px] bg-[#1c1c1c] transition-all duration-300 ' +
        (cartMenuActive ? '-translate-x-0 ' : ' translate-x-full ')
      "
    >
      <div id="top" class="relative h-16 flex justify-start items-center">
        <img
          src="/src/assets/icons/close-icon.svg"
          alt="X icon"
          class="fixed pl-2 h-14 py-2 cursor-pointer"
          @click="emit('handle-cart-menu-activation')"
        />
        <div class="flex-1 flex justify-center">
          <h1 class="text-2xl font-bold font-inter">Cart</h1>
        </div>
      </div>
      <div id="bottom" class="flex flex-col h-full">
        <div class="flex-1 bg-[#1c1c1c] overflow-auto">
          <CartCards @handle-cart-menu-activation="handleCartMenuActivation" />
        </div>
        <div
          class="h-72 bg-[#0c0c0c] flex flex-col px-4 border-t-2 border-gray-800"
        >
          <div class="flex justify-between mt-6 font-inter">
            <h3>Delivery Cost</h3>
            <h3>0:-</h3>
          </div>
          <div class="flex justify-between mt-8 font-inter">
            <h3>Total Cost:</h3>
            <h3>{{ totalAmount }}:-</h3>
          </div>
          <button
            class="p-4 bg-[#1c1c1c] rounded-full hover:bg-[#1f1f1f] mt-8 font-inter hover:border-b-2 hover:border-[#ff007a]"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

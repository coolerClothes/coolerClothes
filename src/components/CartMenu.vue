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
          <CartCards
            @handle-cart-menu-activation="handleCartMenuActivation"
            :editAllowed="true"
          />
        </div>
        <div
          class="h-72 bg-[#141414] flex flex-col px-4 border-t-2 border-gray-800"
        >
          <div class="flex justify-between mt-6 font-inter">
            <h3>Delivery Cost</h3>
            <h3>0:-</h3>
          </div>
          <div class="flex justify-between mt-8 font-inter">
            <h3>Total Cost:</h3>
            <h3>{{ totalAmount }}:-</h3>
          </div>
          <router-link to="/checkout/checkout">
            <button
              class="p-2 lg:p-2 2xl:p-2 mt-9 w-[100%] bg-[#0C0C0C] rounded-full hover:opacity-90 font-inter border-y-4 border-[#00000000] drop-shadow-[0_4.3px_1.4px_rgba(0,0,0,0.6)] text-[#f5f5f5]"
            >
              <div id="button-contents" class="relative mt-1">
                <p class="inline">Checkout</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  class="max-w-5 ml-2 mb-[3px] inline"
                  stroke="currentColor"
                  fill="currentColor"
                >
                  <path
                    d="M160-640h640v-80H160v80Zm-80-80q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v240H160v240h164v80H160q-33 0-56.5-23.5T80-240v-480ZM598-80 428-250l56-56 114 112 226-226 56 58L598-80ZM160-720v480-180 113-413Z"
                  />
                </svg>
              </div>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

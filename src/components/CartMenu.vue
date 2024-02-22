<script setup>
import { ref } from "vue";

const emit = defineEmits(["handle-cart-menu-activation"]);
const props = defineProps({
  cartMenuActive: { required: true, type: Boolean },
});
</script>

<template>
  <div
    id="cart-menu-container"
    :class="
      'fixed flex h-full w-full z-50 transition-all duration-300' +
      (cartMenuActive ? 'translate-x-0' : ' translate-x-full')
    "
  >
    <div
      id="overlay"
      class="flex-1 bg-[rgba(0,0,0,.3)]"
      @click="emit('handle-cart-menu-activation')"
    ></div>
    <div id="cart-menu" class="h-full w-[70%] max-w-[400px] bg-white">
      <div id="top" class="flex justify-start items-center border-b">
        <img
          src="/src/assets/icons/close-icon.svg"
          alt="X icon"
          class="h-14 py-2 cursor-pointer"
          @click="emit('handle-cart-menu-activation')"
        />
      </div>
    </div>
  </div>
</template>

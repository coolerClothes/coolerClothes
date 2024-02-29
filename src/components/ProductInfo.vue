<template>
  <div
    id="component-container"
    class="sm:flex sm:flex-col md:grid grid-cols-10 md:space-x-4 space-y-4 md:space-y-0"
  >
    <div
      id="gallery-container"
      class="p-4 space-y-2 col-span-5 lg:col-span-7 bg-[#1c1c1c] flex flex-col lg:h-auto lg:max-h-screen justify-around items-center"
    >
      <img :src="galleryImgSrc" class="max-h-80 overflow-hidden object-cover" />

      <div
        id="gallery-row"
        class="flex justify-around h-fit max-h-1/3 space-x-2"
      >
        <div class="imgContainer overflow-hidden">
          <img :src="galleryImgSrc" class="object-contain rounded" />
        </div>
        <div class="imgContainer overflow-hidden">
          <img :src="galleryImgSrc" class="object-contain rounded" />
        </div>
        <div class="imgContainer overflow-hidden">
          <img :src="galleryImgSrc" class="object-contain rounded" />
        </div>
        <div class="imgContainer overflow-hidden">
          <img :src="galleryImgSrc" class="object-contain rounded" />
        </div>
      </div>
      <!-- gallery row -->
    </div>
    <!-- gallery container -->

    <div
      id="item-info-card"
      class="flex flex-col h-fit col-span-5 lg:col-span-3 p-4 bg-[#1c1c1c] space-y-4 text-white"
    >
      <div id="titles-and-stock" class="relative">
        <h3 class="text-xl font-bold">{{ item.title }}</h3>
        <div class="absolute bottom-1/4 right-0 flex flex-row">
          <span class="flex items-center p-1 text-white"
            ><svg
              class="h-4 w-4 text-emerald-500 mr-1"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            in stock</span
          >
        </div>
        <h4 class="text-[#a3a3a3]">{{ item.brand }}</h4>
      </div>
      <!-- titles and stock -->

      <div id="price-and-disclamer">
        <h2 class="text-2xl">{{ item.price }}kr</h2>
        <span id="small-print" class="text-sm italic text-[#a3a3a3]"
          >Priser ink. moms. Frakt tillkommer.</span
        >
      </div>
      <!-- price and disclamer -->
      <div id="description-container">
        <span id="item-description" class="text-sm">
          {{ item.description }}
        </span>
      </div>
      <!-- desrciption container -->

      <div
        id="counter-container"
        class="flex w-full items-center justify-around"
      >
        <button
          name="decrease"
          @click="decrease()"
          label="-"
          class="px-2 rounded-lg font-semibold bg-[#a3a3a3] text-black"
        >
          -
        </button>
        <span class="">{{ count }}</span>
        <button
          name="increase"
          @click="increase()"
          label="+"
          class="px-2 rounded-lg font-semibold bg-[#a3a3a3] text-black"
        >
          +
        </button>
      </div>
      <!-- counter container -->

      <div id="form" class="space-y-2">
        <div
          id="size-and-amount-container"
          class="flex flex-row justify-around items-center"
        >
          <input
            type="text"
            v-model="selectedSize"
            name="Size"
            list="sizeList"
            class="h-8 rounded-lg my-1.5 text-center bg-[#a3a3a3] text-black"
          />
          <datalist id="sizeList">
            <option v-for="size in item.sizes" :value="size"></option>
          </datalist>
        </div>
        <!-- size and amount container -->
        <button
          @click="console.log(cartItem)"
          label="Add to cart"
          class="h-10 w-full hover:w-11/12 duration-300 ease-in-out bg-black hover:ring hover:ring-[#FF007a] ring-offset-2 text-white font-bold rounded-full p-2 place-self-center"
        >
          Add to cart
        </button>
      </div>
      <!-- form -->
    </div>
    <!-- item info card -->
  </div>
  <!-- component container -->
</template>
<script setup>
import { ref } from "vue";
import { useCartStore } from "../store";

const props = defineProps({
  item: { type: Object, required: true },
  galleryImgSrc: { type: String },
});

const cart = useCartStore();
cart.addToCart();

const productTest = props.item;
/* IT WAS THIS ^^^^^^ THE WHOLE DAMN TIME */
console.log(productTest);

const count = ref(1);
const selectedSize = ref("");

const increase = () => {
  count.value++;
};
const decrease = () => {
  count.value--;
};
</script>

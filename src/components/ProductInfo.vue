<template>
  <div
    id="component-container"
    class="sm:flex sm:flex-col md:grid grid-cols-10 md:space-x-4 md:space-y-0"
  >
    <div
      id="gallery-container"
      class="col-span-5 lg:col-span-7 flex justify-center items-start"
    >
      <div id="imgBg" class="flex flex-col bg-[#1c1c1c] w-full p-4">
        <img
          :src="galleryImgSrc"
          class="overflow-hidden h-[50vh] md:h-[80vh] lg:h-[60vh] w-full object-contain"
        />
      </div>

      <!-- <div
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
      </div> -->
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

      <div id="price-and-disclamer" class="relative">
        <h2 class="text-2xl">{{ item.price }}kr</h2>
        <span id="small-print" class="text-sm italic text-[#a3a3a3]"
          >Priser ink. moms. Frakt tillkommer.</span
        >
        <div @click="toggleFavorite(item)" class="absolute right-0 top-0">
          <svg
            class="h-10 w-10 text-[#FF007A] rounded-bl-lg hover:text-[#ff59a9]"
            :class="{ 'fill-[#FF007A] text-[#1c1c1c]': isFavorite }"
            viewBox="-3 -1 29 26"
            fill="none"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
      <!-- price and disclamer -->
      <div id="description-container">
        <span id="item-description" class="text-sm">
          {{ item.description }}
        </span>
      </div>
      <!-- desrciption container -->

      <div id="form" class="flex flex-col space-y-2 space-x-2 md:space-x-0">
        <div
          id="size-and-amount-container"
          class="flex flex-row justify-center items-center space-x-4"
        >
          <div id="counter-container" class="flex justify-center space-x-2">
            <button
              name="decrease"
              @click="decrease()"
              label="-"
              class="px-2 rounded-lg font-extrabold bg-[#FF007A] disabled:bg-[#a3a3a3] text-black"
              :disabled="decreaseButton(count)"
            >
              -
            </button>
            <span class="">{{ count }}</span>
            <button
              name="increase"
              @click="increase()"
              label="+"
              class="px-2 rounded-lg font-extrabold bg-[#FF007A] text-black"
            >
              +
            </button>
          </div>
          <!-- counter container -->

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
          @click="addClicked(props.item, selectedSize, count)"
          label="Add to cart"
          class="h-10 w-[80%] hover:w-11/12 duration-300 ease-in-out bg-black hover:ring hover:ring-[#FF007a] ring-offset-2 text-white font-bold rounded-full p-2 place-self-center"
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
import { ref, onMounted } from "vue";
import { useCartStore } from "../store";

const props = defineProps({
  item: { type: Object, required: true },
  galleryImgSrc: { type: String },
});

const count = ref(1);

function decreaseButton(count) {
  let isDisabled = count > 1 ? false : true;
  return isDisabled;
}

const selectedSize = ref("");

const cart = useCartStore();

function addClicked(item, selectedSize, amount) {
  while (amount > 0) {
    cart.addToCart({
      title: item.title,
      brand: item.brand,
      category: item.category,
      price: item.price,
      chosenSize: selectedSize,
      imgSrc: item.imgSrc,
    });
    amount--;
  }
}

const increase = () => {
  count.value++;
};
const decrease = () => {
  count.value--;
};

/* favorite functionality by Lucia but with ITEM instead of PRODUCT, since this component needs to take in a different prop */
const isFavorite = ref();

const checkFavorite = (item) => {
  let favoritesArray = JSON.parse(localStorage.getItem("favoritesArray")) || [];
  if (favoritesArray.includes(item.title)) {
    return (isFavorite.value = true);
  } else {
    return (isFavorite.value = false);
  }
};

onMounted(() => {
  checkFavorite(props.item);
});

const toggleFavorite = (item) => {
  let favoritesArray = JSON.parse(localStorage.getItem("favoritesArray")) || [];
  const index = favoritesArray.lastIndexOf(item.title);
  if (index !== -1) {
    favoritesArray.splice(index, 1);
    isFavorite.value = false;
  } else {
    favoritesArray.push(item.title);
    isFavorite.value = true;
  }
  localStorage.setItem("favoritesArray", JSON.stringify(favoritesArray));
  emit("toggle-favorite");
  return { toggleFavorite, isFavorite, checkFavorite };
};
</script>

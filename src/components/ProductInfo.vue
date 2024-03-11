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
        <div class="bg-[#0c0c0c]">
          <img
            :src="galleryImgSrc"
            class="overflow-hidden h-[50vh] md:h-[80vh] lg:h-[70vh] w-full object-contain"
          />
        </div>
      </div>
    </div>
    <!-- gallery container -->

    <div
      id="item-info-card"
      class="flex flex-col h-fit col-span-5 lg:col-span-3 p-4 bg-[#1c1c1c] space-y-4 text-white font-inter"
    >
      <div id="titles-and-stock" class="relative mb-4">
        <h3 class="text-xl font-bold">{{ item.title }}</h3>
        <div class="absolute bottom-1/4 right-0 flex flex-row">
          <span class="flex items-center text-sm 2xl:text-base p-1 text-white"
            ><svg
              class="h-3 w-3 2xl:h-4 2xl:w-4 text-[#00FF66] mr-1"
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
        <h4 class="text-[#858585]">{{ item.brand }}</h4>
      </div>
      <!-- titles and stock -->

      <div id="price-and-disclamer" class="relative">
        <h2 class="xl:text-xl 2xl:text-2xl">{{ item.price }}kr</h2>
        <span id="small-print" class="text-sm italic text-[#858585]"
          >Priser ink. moms. Frakt tillkommer.</span
        >
        <div @click="toggleFavorite(item)" class="absolute right-0 top-0">
          <svg
            class="h-8 w-8 2xl:h-10 2xl:w-10 text-[#c1c1c1] rounded-bl-lg hover:text-[#ff59a9]"
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
          class="flex flex-row justify-center items-center space-x-4 m-4"
        >
          <div id="counter-container" class="flex justify-center space-x-2">
            <!-- OLD BUTTONS -->
            <button
              name="decrease"
              @click="decrease()"
              label="-"
              class="px-2 w-7 font-extrabold rounded-l-md bg-[#FF007A] disabled:bg-[#858585] text-black relative"
              :disabled="decreaseButton(count)"
            >
              -
            </button>

            <h3 class="text-base border border-gray-800 px-2">
              {{ count }}
            </h3>

            <button
              name="increase"
              @click="increase()"
              label="+"
              class="px-2 w-7 rounded-r-md font-extrabold bg-[#FF007A] text-black relative"
            >
              +
            </button>
          </div>
          <!-- counter container -->
          <div class="flex items-center text-sm text-[#858585]">
            <p>Size:</p>
          </div>
          <input
            type="text"
            v-model="selectedSize"
            name="Size"
            list="sizeList"
            class="h-[26px] text-center bg-[#00000000] text-[#f5f5f5] w-14 text-base border border-gray-800"
          />
          <datalist id="sizeList">
            <option v-for="size in item.sizes" :value="size"></option>
          </datalist>
        </div>
        <!-- size and amount container -->
        <button
          @click="addClicked(props.item, selectedSize, count)"
          id="addButton"
          label="Add to cart"

          class="p-4 lg:p-0 2xl:p-1 bg-[#0d0d0d] rounded-full hover:opacity-90 font-inter border-y-4 border-[#00000000] disabled:opacity-20 disabled:hover:border-[#ff007a00] relative drop-shadow-[0_4.3px_1.4px_rgba(0,0,0,0.6)]"

          :disabled="selectedSize === ''"
        >
          <div id="button-contents" class="relative mt-1">
            <p class="inline">Add to cart</p>
            <!-- cart svg -->
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="max-w-5 ml-2 mb-[3px] inline transition duration-300 ease-in-out transform"
              id="add-icon"
            >
              <g clip-path="url(#clip0_119_81)">
                <path
                  d="M18 6H16C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6H6C4.9 6 4 6.9 4 8V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8C20 6.9 19.1 6 18 6ZM10 10C10 10.55 9.55 11 9 11C8.45 11 8 10.55 8 10V8H10V10ZM12 4C13.1 4 14 4.9 14 6H10C10 4.9 10.9 4 12 4ZM16 10C16 10.55 15.55 11 15 11C14.45 11 14 10.55 14 10V8H16V10Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_119_81">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <!-- added svg -->
            <svg
              id="added-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 p-1 mb-[2px] rounded-full ml-[-26px] inline transition duration-300 ease-in-out opacity-0 top-0 left-0 transform text-[#00FF66]"
            >
              <!-- animate-bounce duration-1000 -->
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </button>
      </div>
      <!-- form -->
    </div>
    <!-- item info card -->
  </div>
  <!-- component container -->
</template>

<style scoped>
#addButton:focus #add-icon {
  opacity: 0;
}

#addButton:focus #added-icon {
  opacity: 1;
}
</style>

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
      id: item.id,
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

const emit = defineEmits(["toggle-favorite"]);

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

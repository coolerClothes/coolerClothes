<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import SideMenu from "./SideMenu.vue";
import CartMenu from "./CartMenu.vue";
import { useRouter } from "vue-router";
import SearchMenu from "./SearchMenu.vue";
import { useCartStore } from "../store";

const sideMenuActive = ref(false);
const cartMenuActive = ref(false);
const searchMenuActive = ref(false);
const searchInput = ref("");
const isScrolled = ref(false);
const cartProductsAmount = ref(0);
const cartUpdated = ref(false);

const router = useRouter();

const store = useCartStore();

if (store.cart) {
  cartProductsAmount.value = store.cart.length;
}

const handleSearchMenuActivation = () => {
  searchMenuActive.value = !searchMenuActive.value;
};

const handleSideMenuActivation = () => {
  sideMenuActive.value = !sideMenuActive.value;
};

const handleCartMenuActivation = () => {
  cartMenuActive.value = !cartMenuActive.value;
};

const handleSearch = () => {
  router.push({ path: "/search/all/" + searchInput.value });
  console.log(searchInput.value);
};

// Handle scroll event
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

watch(
  () => store.cart,
  (newCart) => {
    cartProductsAmount.value = newCart.length;
    cartUpdated.value = true;

    setTimeout(() => {
      cartUpdated.value = false;
    }, 400);
  },
);

// Add event listeners on component mount
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// Remove event listeners on component unmount
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const logoSrc = computed(() => {
  return isScrolled.value
    ? "/src/assets/small-logo.png" // Slim logo when scrolled
    : "/src/assets/logo.png"; // Default logo when not scrolled
});
const logoAltSrc = computed(() => {
  return isScrolled.value
    ? "/src/assets/small-alt-logo.png" // Slim logo hover when scrolled
    : "/src/assets/alt-logo.png"; // Default logo hover when not scrolled
});

const bottomContainerClass = computed(() => {
  return isScrolled.value ? "hidden" : "";
});
</script>

<template>
  <div id="navbar" class="z-50 text-[#f5f5f5] top-0 sticky">
    <SideMenu
      :side-menu-active="sideMenuActive"
      @handle-side-menu-activation="handleSideMenuActivation"
    />

    <CartMenu
      :cart-menu-active="cartMenuActive"
      @handle-cart-menu-activation="handleCartMenuActivation"
    />

    <SearchMenu
      :search-menu-active="searchMenuActive"
      @handle-search-menu-activation="handleSearchMenuActivation"
    />

    <div
      id="navbar-top-container"
      class="flex items-center bg-[#1c1c1c] p-3 transition-all h-32 w-full"
      :class="{ 'slim-navbar': isScrolled }"
    >
      <div id="navbar-left" class="flex-1 flex justify-center">
        <div id="input-container" class="relative max-md:hidden">
          <input
            type="text"
            class="w-64 h-10 rounded-full pl-10 text-black focus:outline-[#1e1e1e]"
            placeholder="Search"
            v-model="searchInput"
            @keyup.enter="handleSearch"
          />
          <img
            src="/src/assets/icons/search-icon.svg"
            alt=""
            class="absolute transition-all z-10 duration-300 pl-2 top-2 h-6"
          />
        </div>

        <div
          id="left-side-mobile"
          class="flex max-sm:gap-3 gap-6 w-full ml-5 justify-start md:hidden"
        >
          <img
            src="/src/assets/icons/hamburger-icon.svg"
            alt=""
            class="h-6 cursor-pointer"
            @click="handleSideMenuActivation"
          />
          <img
            src="/src/assets/icons/search-icon-black.svg"
            alt=""
            class="h-6 cursor-pointer"
            @click="handleSearchMenuActivation"
          />
        </div>
      </div>
      <!-- LOGO START -->
      <div id="navbar-center" class="flex flex-1 justify-center">
        <div id="logo-container" class="mx-5 relative">
          <router-link to="/">
            <img
              :src="logoSrc"
              alt="Cooler Clothes logo"
              class="max-h-24 max-sm:my-3 transition duration-300 ease-in-out transform hover:scale-105"
              id="logo1"
            />
            <img
              :src="logoAltSrc"
              alt="Cooler Clothes logo"
              class="max-h-24 max-sm:my-3 transition duration-300 ease-in-out opacity-0 absolute top-0 left-0 transform hover:scale-105"
              id="logo2"
            />
          </router-link>
        </div>
      </div>
      <!-- LOGO END -->
      <div
        id="navbar-right"
        class="flex flex-1 justify-center gap-4 max-sm:gap-5 max-md:gap-9 max-md:justify-end max-md:mr-5 text-sm"
      >
        <!-- LOGIN START -->
        <div class="flex cursor-default pr-1 text-[#616161]">
          <!-- Disabled style > class="flex cursor-default pr-1 text-[#616161]" -->
          <!-- Default style > class="flex cursor-pointer pr-1 hover:text-[#ff007a] text-[#f5f5f5]" -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 386.77 283.29"
            class="min-w-6 mr-1"
          >
            <path
              d="M392.7,93a77,77,0,0,0-126-22.56,78.46,78.46,0,0,0-7.12,7.49c.32-.38-9.86-6.45-10.81-6.92a56,56,0,0,0-12.1-4.35c-8.24-1.92-18.52-2.76-26.38.89l-8.81,4.09A25.17,25.17,0,0,0,196,74.68a6.18,6.18,0,0,0-2.49,3.22,21.54,21.54,0,0,1-5.76-3A77,77,0,0,0,57.94,92.48c-5.27,6.71-12.14,10.89-26.08,8.14v35.31H47.77a125.91,125.91,0,0,1,5.6,12.43,77,77,0,0,0,151.54-10.45c.5-3.51.7-7.11.94-11.13.42-7,1.51-14.88,6.52-20.18,5.73-6,15.23-8.19,22.32-3.19,4.12,2.9,6.61,7.56,8,12.3,1.67,5.75.92,11.76,2.54,17.69a77,77,0,0,0,145.89,31.43,73.2,73.2,0,0,0,10.07-29.05h17.45V100.62C399.86,101.54,397.74,101.31,392.7,93ZM172.18,127.12h0a43.84,43.84,0,0,1-18.41,35.37c-2.7,1.51-5.55,2.81-8.47,4.36a39.22,39.22,0,0,1-4.09,1.87,44.17,44.17,0,0,1-12.93,1.93,43.73,43.73,0,0,1-20.35-5,50.28,50.28,0,0,1-17.21-16.16A43.89,43.89,0,0,1,99.3,93.77a47.15,47.15,0,0,1,41.56-9.1,44,44,0,0,1,28.65,27A54.87,54.87,0,0,1,172.18,127.12Zm169.15,39.12a57.87,57.87,0,0,1-11.11,3.66,43.91,43.91,0,0,1-49.71-29.18,46.79,46.79,0,0,1,8.58-42.88,43.9,43.9,0,0,1,45-13.35,50.38,50.38,0,0,1,5.81,2.12,42.19,42.19,0,0,1,17.78,14.77,47,47,0,0,1,6.67,37.51A44,44,0,0,1,341.33,166.24Z"
              transform="translate(-31.86 -46.76)"
              fill="currentColor"
            />
            <path
              d="M333.85,293.81c-12.69,2.07-25.61.62-35.63-8-6.61-5.68-11.25-13.18-16.28-20.2-5.5-7.68-12.06-13.1-18.89-19.13a7.14,7.14,0,0,0-1.74-1,56.11,56.11,0,0,0-11-3.68,20.51,20.51,0,0,0-7.61-.27,46.87,46.87,0,0,0-15.21,5c-6.88-1.22-12.65-5.2-19.76-5.41a32.91,32.91,0,0,0-16.86,4.53c-10.8,6-19.09,15.88-26.76,25.36-3,3.71-6,7.48-9,11.16-1.43,1.72-3.21,3.37-4.28,5.33a10,10,0,0,1-1.48,2.22c-.82.86-1.81,1.27-3.8,2-11,4-24.14,4.4-34.74-1.34-10-5.4-16.63-15.37-19-26.34-13.72,12.42-7,37.38,5.79,48.84,10.52,9.46,26.06,14.52,39.82,16.32,14.79,1.94,29.15-.76,43.61-3.22a128.74,128.74,0,0,0,21.42-5.58c7.85-2.78,16.31-5.66,23.54-9.78,3.28,3.74,10.41,4.55,15,6,13.63,4.55,27,8.89,41.2,11.37,14.66,2.57,30,3.77,44-2.37,28-3.4,51.85-35.7,33.26-61.64C349.5,278.71,353.34,285.22,333.85,293.81Z"
              transform="translate(-31.86 -46.76)"
              fill="currentColor"
            />
          </svg>

          <h2 class="pl-1 pt-0.5 max-md:hidden">Login</h2>
        </div>
        <!-- LOGIN END -->

        <!-- FAV START -->
        <router-link to="/favorites/favorites">
          <div class="flex pr-1 hover:text-[#ff007a]">
            <svg
              class="min-w-6 mr-1"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                fill="currentColor"
              />
            </svg>
            <h2 class="pl-1 pt-0.5 max-md:hidden">Favorites</h2>
          </div></router-link
        >
        <!-- FAV END -->
        <!-- CART START -->

        <div
          class="flex cursor-pointer pr-1 hover:text-[#ff007a]"
          @click="handleCartMenuActivation"
        >
          <div class="relative">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="max-w-6"
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
            <span
              :class="
                ' absolute -top-2 -right-[0.55rem] size-5 rounded-full bg-[#0c0c0c] text-[#ff007a] flex justify-center items-center text-xs font-medium transition-all duration-300 ' +
                (cartProductsAmount > 0 ? '' : 'hidden') +
                (isScrolled
                  ? cartUpdated
                    ? ' -translate-y-1 scale-150'
                    : ' translate-y-0 scale-100'
                  : cartUpdated
                    ? ' -translate-y-3 scale-150'
                    : ' translate-y-0 scale-100')
              "
              >{{ cartProductsAmount }}</span
            >
          </div>

          <h2 class="pl-2 pt-0.5 max-md:hidden">Cart</h2>
        </div>
        <!-- CART END -->
      </div>
    </div>
    <div
      id="navbar-bottom-container"
      class="h-9 max-md:hidden bg-[#0c0c0c] p-5"
      :class="bottomContainerClass"
    >
      <ul
        class="flex gap-5 h-full justify-center items-center font-inter font-semibold text-xs"
      >
        <li>
          <router-link to="/search/jackets" class="p-4 hover:text-[#ff007a]"
            >JACKETS</router-link
          >
        </li>
        <li>
          <router-link to="/search/hoodies" class="p-4 hover:text-[#ff007a]"
            >HOODIES</router-link
          >
        </li>
        <li>
          <router-link to="/search/shirts" class="p-4 hover:text-[#ff007a]"
            >SHIRTS</router-link
          >
        </li>
        <li>
          <router-link to="/search/pants" class="p-4 hover:text-[#ff007a]"
            >PANTS</router-link
          >
        </li>
        <li>
          <router-link to="/search/accessories" class="p-4 hover:text-[#ff007a]"
            >ACCESSORIES</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#logo-container:hover #logo1 {
  opacity: 0;
}

#logo-container:hover #logo2 {
  opacity: 1;
}

.slim-navbar #logo1 {
  height: 3rem;
}

#navbar-top-container {
  transition: height 0.45s ease-in-out;
}

.slim-navbar {
  height: 4rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: #1c1c1c;
  border-bottom: 5px solid #0c0c0c;
}
.slim-navbar #navbar-bottom-container {
  height: 0;
}
</style>

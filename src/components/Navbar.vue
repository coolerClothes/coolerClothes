<script setup>
import { ref } from "vue";
import SideMenu from "./SideMenu.vue";
import CartMenu from "./CartMenu.vue";
import { useRouter } from "vue-router";
const sideMenuActive = ref(false);
const cartMenuActive = ref(false);
const searchInput = ref("");

const router = useRouter();
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
</script>

<template>
  <div id="navbar-container" class="bg-[#6B7280]">
    <SideMenu
      :side-menu-active="sideMenuActive"
      @handle-side-menu-activation="handleSideMenuActivation"
    />

    <CartMenu
      :cart-menu-active="cartMenuActive"
      @handle-cart-menu-activation="handleCartMenuActivation"
    />
    <div
      id="navbar-top-container"
      class="flex items-center h-20 border-b border-black"
    >
      <div id="navbar-left" class="flex-1 flex justify-center">
        <div id="logo-container" class="max-md:hidden">
          <img src="/src/assets/icons/tempLogo-icon.svg" alt="" />
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
            class="h-6"
          />
        </div>
      </div>
      <div id="navbar-center" class="flex flex-1 justify-center">
        <div id="input-container" class="relative max-md:hidden">
          <input
            type="text"
            class="w-64 h-8 rounded-full pl-10"
            placeholder="Search"
            v-model="searchInput"
            @keyup.enter="handleSearch"
          />
          <img
            src="/src/assets/icons/search-icon.svg"
            alt=""
            class="absolute transition-all z-10 duration-500 pl-2 top-1 h-6"
          />
        </div>
        <div id="logo-container-mobile" class="md:hidden mx-5">
          <img src="/src/assets/icons/tempLogo-icon.svg" alt="" />
        </div>
      </div>
      <div
        id="navbar-right"
        class="flex flex-1 justify-center gap-4 max-sm:gap-5 max-md:gap-9 max-md:justify-end max-md:mr-5"
      >
        <div class="flex">
          <img
            src="/src/assets/icons/login-icon.svg"
            alt="mask icon"
            class="min-w-6"
          />
          <h2 class="pl-1 max-md:hidden">Login</h2>
        </div>
        <div class="flex">
          <img
            src="/src/assets/icons/favorite-icon.svg"
            alt="heart icon"
            class="min-w-6"
          />
          <h2 class="pl-1 max-md:hidden">Favorites</h2>
        </div>
        <div class="flex cursor-pointer" @click="handleCartMenuActivation">
          <img
            src="/src/assets/icons/cart-icon.svg"
            alt="Shopping bag icon"
            class="min-w-6"
          />
          <h2 class="pl-1 max-md:hidden">Cart</h2>
        </div>
      </div>
    </div>
    <div id="navbar-bottom-container" class="h-9 max-md:hidden">
      <ul class="flex gap-5 h-full justify-center items-center">
        <li><router-link to="/search/capes">Capes</router-link></li>
        <li><router-link to="/search/jackets">Jackets</router-link></li>
        <li><router-link to="/search/hoodies">Hoodies</router-link></li>
        <li><router-link to="/search/tshirts">T-Shirts</router-link></li>
        <li><router-link to="/search/pants">Pants</router-link></li>
        <li><router-link to="/search/accessories">Accessories</router-link></li>
      </ul>
    </div>
  </div>
</template>

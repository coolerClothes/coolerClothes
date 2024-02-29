<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import SideMenu from "./SideMenu.vue";
import CartMenu from "./CartMenu.vue";
import { useRouter } from "vue-router";

const sideMenuActive = ref(false);
const cartMenuActive = ref(false);
const searchInput = ref("");
const isScrolled = ref(false);

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

// Handle scroll event
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

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
    ? "/src/assets/small-logo.png" // Use this logo when scrolled
    : "/src/assets/logo.png"; // Use the default logo when not scrolled
});
const logoAltSrc = computed(() => {
  return isScrolled.value
    ? "/src/assets/small-alt-logo.png" // Use this logo when scrolled
    : "/src/assets/alt-logo.png"; // Use the default logo when not scrolled
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
            class="absolute transition-all z-10 duration-500 pl-2 top-2 h-6"
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
            class="h-6"
          />
        </div>
      </div>
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
      <div
        id="navbar-right"
        class="flex flex-1 justify-center gap-4 max-sm:gap-5 max-md:gap-9 max-md:justify-end max-md:mr-5 text-sm"
      >
        <div class="flex pr-1 hover:text-[#ff007a]">
          <img
            src="/src/assets/icons/login-icon.svg"
            alt="mask icon"
            class="min-w-6"
          />
          <h2 class="pl-1 pt-0.5 max-md:hidden">Login</h2>
        </div>
        <div class="flex pr-1 hover:text-[#ff007a]">
          <img
            src="/src/assets/icons/favorite-icon.svg"
            alt="heart icon"
            class="min-w-6"
          />
          <h2 class="pl-1 pt-0.5 max-md:hidden">Favorites</h2>
        </div>
        <div
          class="flex cursor-pointer pr-1 hover:text-[#ff007a]"
          @click="handleCartMenuActivation"
        >
          <img
            src="/src/assets/icons/cart-icon.svg"
            alt="Shopping bag icon"
            class="min-w-6"
          />
          <h2 class="pl-1 pt-0.5 max-md:hidden">Cart</h2>
        </div>
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
  transition:
    height 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
}

.slim-navbar {
  height: 4rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: #1c1c1c; /* Adjust the color as needed */
  border-bottom: 5px solid #0c0c0c;
}

/* #navbar-bottom-container {
  transition: height 0.3s ease-in-out;
} */

.slim-navbar #navbar-bottom-container {
  height: 0;
}
</style>

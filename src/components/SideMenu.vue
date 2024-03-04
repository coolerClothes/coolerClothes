<script setup>
import { ref } from "vue";

const emit = defineEmits(["handle-side-menu-activation"]);
const props = defineProps({
  sideMenuActive: { required: true, type: Boolean },
});

const categoriesExpanded = ref(true);

const handleCategoriesClick = () => {
  categoriesExpanded.value = !categoriesExpanded.value;
};
</script>
<template>
  <div
    id="side-menu-container"
    :class="
      ' fixed flex h-full top-0 w-full z-50 bg-[rgba(0,0,0,.3)] text-[#f5f5f5] transition-all duration-300' +
      (sideMenuActive ? 'opacity-100' : ' opacity-0 pointer-events-none')
    "
  >
    <div
      id="side-menu"
      :class="
        ' h-full w-[70%] max-w-[400px] bg-[#1c1c1c] transition-all duration-300 ' +
        (sideMenuActive ? 'translate-x-0' : ' -translate-x-full')
      "
    >
      <div id="top" class="flex justify-end items-center border-b border-black">
        <img
          src="/src/assets/icons/close-icon.svg"
          alt="X icon"
          class="h-14 py-2 cursor-pointer"
          @click="emit('handle-side-menu-activation')"
        />
      </div>
      <div id="menu" class="ml-3">
        <h2 @click="handleCategoriesClick" class="text-xl mt-5 cursor-pointer">
          Categories
        </h2>
        <ul
          :class="
            'ml-3 transition-all duration-500 origin-top' +
            (categoriesExpanded
              ? 'scale-y-100 opacity-100 origin-top '
              : ' scale-y-0 opacity-0  ')
          "
        >
          <li class="mt-2">
            <router-link
              to="/search/capes"
              @click="emit('handle-side-menu-activation')"
              >Capes</router-link
            >
          </li>
          <li class="mt-2">
            <router-link
              to="/search/jackets"
              @click="emit('handle-side-menu-activation')"
              >Jackets</router-link
            >
          </li>
          <li class="mt-2">
            <router-link
              to="/search/hoodies"
              @click="emit('handle-side-menu-activation')"
              >Hoodies</router-link
            >
          </li>
          <li class="mt-2">
            <router-link
              to="/search/shirts"
              @click="emit('handle-side-menu-activation')"
              >T-Shirts</router-link
            >
          </li>
          <li class="mt-2">
            <router-link
              to="/search/pants"
              @click="emit('handle-side-menu-activation')"
              >Pants</router-link
            >
          </li>
          <li class="mt-2">
            <router-link
              to="/search/accessories"
              @click="emit('handle-side-menu-activation')"
              >Accessories</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div
      id="overlay"
      class="flex-1"
      @click="emit('handle-side-menu-activation')"
    ></div>
  </div>
</template>

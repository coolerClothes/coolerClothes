<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const emit = defineEmits(["handle-search-menu-activation"]);

const prop = defineProps({
  searchMenuActive: { required: true, type: Boolean },
});

const searchInput = ref("");
const router = useRouter();

const handleSearch = () => {
  router.push({ path: "/search/all/" + searchInput.value });
  emit("handle-search-menu-activation");
};
</script>

<template>
  <div
    :class="
      'fixed w-full  z-50 flex justify-center items-center top-0 bg-[#1c1c1c] h-32 transition-all duration-300 ' +
      (searchMenuActive ? 'opacity-100' : 'opacity-0 pointer-events-none')
    "
  >
    <img
      src="/src/assets/icons/close-icon.svg"
      alt="X closing icon"
      class="absolute w-10 top-2 right-2 cursor-pointer"
      @click="emit('handle-search-menu-activation')"
    />
    <div id="input-container" class="relative">
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
  </div>
</template>

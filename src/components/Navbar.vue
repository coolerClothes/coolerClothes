<script setup></script>

<template>
  <div id="navbar-container" class="bg-[#6B7280]">
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
          <img src="/src/assets/icons/hamburger-icon.svg" alt="" class="h-6" />
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
          />
          <img
            src="/src/assets/icons/search-icon.svg"
            alt=""
            class="absolute top-1 left-2 h-6"
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
        <div class="flex">
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
        <li><router-link to="/capes">Capes</router-link></li>
        <li><router-link to="/jackets">Jackets</router-link></li>
        <li><router-link to="/hoodies">Hoodies</router-link></li>
        <li><router-link to="/tshirts">T-Shirts</router-link></li>
        <li><router-link to="/pants">Pants</router-link></li>
        <li><router-link to="/accessories">Accessories</router-link></li>
      </ul>
    </div>
  </div>
</template>

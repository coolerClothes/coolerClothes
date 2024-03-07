<script setup></script>

<template>
  <div
    id="footer-background"
    class="flex flex-col items-center justify-center w-screen bg-[#0c0c0c] text-[#a3a3a3]"
  >
    <div
      id="socials"
      class="py-4 2xl:py-10 space-y-1 2xl:space-y-2 text-center text-sm 2xl:text-base font-extralight font-inter"
    >
      <p class="text-white">Follow our journey!</p>

      <div
        id="icons-container"
        class="flex flex-row items-center space-x-2 2xl:space-x-3"
      >
        <!-- instagram Icon -->
        <a href="https://www.instagram.com/" target="_blank" class="p-1">
          <!--
            Instagram's gradient
            linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);   -->
          <svg
            class="h-8 w-8 hover:h-6 hover:w-6 2xl:h-10 2xl:w-10 hover:2xl:h-8 hover:2xl:w-8 duration-300 ease-in-out hover:stroke-white hover:fill-[#ca0548]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <!-- twitter icon because I couldn't find tiktok's  -->
        <a href="https://twitter.com/" target="_blank" class="p-1">
          <svg
            class="h-8 w-8 hover:h-6 hover:w-6 2xl:h-10 2xl:w-10 hover:2xl:h-8 hover:2xl:w-8 duration-300 ease-in-out hover:stroke-white hover:fill-[#02ffe3]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
            />
          </svg>
        </a>

        <!-- youtube icon -->
        <a
          href="https://www.youtube.com/"
          target="_blank"
          class="pl-1 pt-1 pb-1"
        >
          <svg
            class="h-8 w-8 hover:h-6 hover:w-6 2xl:h-10 2xl:w-10 hover:2xl:h-8 hover:2xl:w-8 duration-300 ease-in-out hover:stroke-white hover:fill-[#de0000]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
            />
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
          </svg>
        </a>
        <!-- facebook icon -->
        <a href="https://facebook.com/" target="_blank" class="pt-1 pb-1 pr-1">
          <svg
            class="h-8 w-8 hover:h-6 hover:w-6 2xl:h-10 2xl:w-10 hover:2xl:h-8 hover:2xl:w-8 duration-300 ease-in-out hover:stroke-white hover:fill-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
            />
          </svg>
        </a>
      </div>
      <!-- icons container -->
    </div>
    <!-- socials -->
    <div
      id="copyright"
      class="flex flex-col items-center w-full py-6 2xl:py-16 space-y-2 lg:space-y-4 bg-[#141414]"
    >
      <p class="text-center px-12 text-xs 2xl:text-sm italic font-inter">
        The content of this site is copyright protected and is the property of
        Team 6, ITHS.
      </p>
      <router-link to="/"
        ><img
          src="/src/assets/logo.png"
          alt="Cooler Clothes logo"
          class="h-[13vh] 2xl:h-[15vh]"
      /></router-link>
    </div>
  </div>
  <!-- footer-background -->
</template>
<style scoped></style>

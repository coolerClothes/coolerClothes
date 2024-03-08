<template>
  <div
    id="bg-img"
    class="flex w-full min-h-fit xl:h-[80vh] p-2 md:p-8 bg-cover"
  >
    <div
      id="component-container"
      class="flex flex-col-reverse xl:flex-row self-center w-full h-fit xl:max-h-[75vh] items-center xl:items-stretch justify-center xl:space-x-3 space-y-3 xl:space-y-0"
    >
      <section
        id="message"
        class="flex flex-col self-center h-fit xl:w-[50%] place-items-center place-content-center space-y-4 px-4 py-6 my-4 md:p-12 md:m-6 text-white text-center"
      >
        <h1
          id="thank-you"
          class="text-3xl font-inter font-extrabold tracking-tight"
        >
          <span class="glowing border-[3.5px] display-block rounded-full px-3"
            >Thank you</span
          >
          <span> for your patronage </span>
        </h1>
        <p class="sm:px-3 sm:w-2/3 xl:w-auto">
          We hope you look flyer than ever in our apparel ;) <br />
          An email is on it's way with the details of your order.
        </p>
        <p class="sm:px-3 sm:w-2/3 xl:w-auto">
          Should you have any
          <span class="font-bold text-[#ff007a]"> questions</span>, please don't
          hesitate to contact us through any of the following means:
        </p>
      </section>

      <!-- order detalis -->
      <section
        id="order-details"
        class="flex flex-col h-auto w-full md:w-2/3 xl:w-1/3 justify-center p-4 space-y-4 bg-[#1c1c1c]"
      >
        <h1
          class="font-antonio font-extrabold uppercase text-3xl text-center tracking-wider"
        >
          Order summary:
        </h1>
        <section
          id="cards-container"
          class="flex flex-col w-full overflow-y-auto px-2 space-y-2"
        >
          <div
            id="cards"
            v-if="Object.keys(cart).length !== 0"
            v-for="productArray in cart"
            class="flex flex-shrink-0 items-center justify-around space-x-2 bg-[#1c1c1c] w-full my-1"
          >
            <router-link :to="'/products/' + productArray[0].id"
              ><img
                :src="productArray[0].imgSrc"
                :alt="productArray[0].alt"
                class="max-w-14"
            /></router-link>
            <!-- image end -->
            <p class="text-xs flex flex-col">
              <router-link :to="'/products/' + productArray[0].id"
                ><span class="text-base font-semibold leading-[14px]">
                  {{ productArray[0].title }}
                </span></router-link
              >
              <span class="text-[#aaaaaa]">{{ productArray[0].brand }}</span>
              <span>{{ productArray[0].category }}</span>
            </p>
            <span class="font-bold text-[#ff007a]">
              {{ productArray[0].chosenSize.toUpperCase() }}
            </span>
            <span class="text-base">x{{ productArray.length }}</span>
            <span class="flex flex-col justify-between">
              {{ productArray[0].price }}:-
            </span>
          </div>
          <!-- individual card -->
        </section>
        <!-- cards container -->
      </section>
      <!-- order details -->
    </div>
    <!-- component container -->
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useCartStore } from "../store";

const emit = defineEmits(["handle-cart-menu-activation"]);

const store = useCartStore();
const cart = ref({});

const sortCart = () => {
  cart.value = {};
  for (const product of store.cart) {
    const key = `${product.title}-${product.chosenSize}`;

    if (cart.value[key]) {
      cart.value[key].push(product);
    } else {
      cart.value[key] = [product];
    }
  }
};

if (store.cart !== null) {
  sortCart();
}

watch(
  () => store.cart,
  () => {
    sortCart();
  },
);
</script>

<style scoped>
#message {
  background: rgba(0, 0, 0, 0.644);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
#bg-img {
  background-image: url("src/assets/joshua-harris-ObIkGbVQY9M-unsplash.jpg");
}
@keyframes glow {
  from {
    border-color: #ff007a;
    background: #ff007b3f;
    -webkit-box-shadow: 0px 0px 41px 0px rgba(255, 0, 123, 0.9);
    -moz-box-shadow: 0px 0px 41px 0px rgba(255, 0, 123, 0.9);
    box-shadow: 0px 0px 41px 0px rgba(255, 0, 123, 0.9);
  }
  to {
    border-color: #fd8ec4;
    background-color: rgba(255, 0, 123, 0.438);
    -webkit-box-shadow: 0px 0px 23px 9px rgba(255, 0, 123, 0.815);
    -moz-box-shadow: 0px 0px 23px 9px rgba(255, 0, 123, 0.9);
    box-shadow: 0px 0px 23px 9px rgba(255, 0, 123, 0.9);
  }
}
.glowing {
  animation-name: glow;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
}
</style>

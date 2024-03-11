<template>
  <div
    id="bg-img"
    class="flex w-full min-h-fit xl:h-[95vh] pt-5 md:p-10 bg-cover"
    title="Abstract vaporwave background"
  >
    <div
      id="component-container"
      class="flex flex-col-reverse xl:flex-row self-center w-full h-fit py-6 xl:max-h-[85vh] items-center xl:items-stretch justify-center xl:space-x-6 2xl:space-x-12 space-y-3 xl:space-y-0"
    >
      <section
        id="message"
        class="flex flex-col self-center place-items-center place-content-center h-fit xl:w-[50%] 2xl:w-[44%] space-y-4 2xl:space-y-8 p-8 md:p-12 2xl:p-14 mt-8 2xl:mt-0 text-white text-center 2xl:text-xl"
      >
        <h1
          id="thank-you"
          class="text-3xl 2xl:text-4xl font-inter font-extrabold tracking-tight"
        >
          <span class="glowing border-[3.5px] display-block rounded-full px-3"
            >Thank you</span
          >
          <span> for your patronage </span>
        </h1>
        <p class="sm:w-2/3 xl:w-auto">
          We hope you look flyer than ever in our apparel ;) <br />
          An email is on it's way with the details of your order.
        </p>
        <p class="sm:w-2/3">
          Should you have any
          <span class="font-bold text-[#ff007a]"> questions</span>, please don't
          hesitate to contact us through any of the following means:
        </p>

        <section
          id="contact"
          class="flex flex-wrap w-full justify-center font-extrabold"
        >
          <div class="flex flex-nowrap m-1 p-1 justify-center text-center">
            <span> (+46) 70 123 4567 </span>
          </div>
          <div class="flex flex-nowrap m-1 p-1 justify-center text-center">
            <span> (+46) 70 123 4567 </span>
          </div>
          <div class="flex flex-nowrap m-1 p-1 justify-center text-center">
            <span> (+46) 70 123 4567 </span>
          </div>
        </section>
        <!-- contact -->
      </section>

      <!-- order detalis -->
      <section
        id="order-details"
        class="flex flex-col h-auto w-full md:w-2/3 xl:w-1/3 justify-center p-4 xl:py-6 space-y-4 bg-[#1c1c1c]"
      >
        <h1
          class="font-antonio font-bold uppercase text-3xl 2xl:text-4xl text-center tracking-wide"
        >
          Order summary:
        </h1>
        <section
          id="cards-container"
          class="flex flex-col w-full overflow-y-auto px-2 space-y-2 xl:space-y-3.5 2xl:space-y-4 my-3 2xl:text-xl"
        >
          <div
            id="cards"
            v-if="Object.keys(cart).length !== 0"
            v-for="productArray in cart"
            class="flex flex-shrink-0 items-center justify-between space-x-2 w-full my-1"
          >
            <router-link :to="'/products/' + productArray[0].id"
              ><img
                :src="productArray[0].imgSrc"
                :alt="productArray[0].alt"
                class="max-w-14 mr-4"
            /></router-link>
            <!-- image end -->
            <p class="text-base 2xl:text-base grow flex flex-col">
              <router-link :to="'/products/' + productArray[0].id"
                ><span
                  class="text-base 2xl:text-lg font-semibold xl:leading-[14px]"
                >
                  {{ productArray[0].title }}
                </span></router-link
              >
              <span class="text-[#aaaaaa]">{{ productArray[0].brand }}</span>
              <span>{{ productArray[0].category }}</span>
            </p>

            <div class="flex space-x-3 justify-self-end">
              <span class="font-bold text-[#ff007a]">
                {{ productArray[0].chosenSize.toUpperCase() }}
              </span>
              <span>x{{ productArray.length }}</span>
              <span> {{ productArray[0].price }}:- </span>
            </div>
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

  border: 1px solid rgba(255, 255, 255, 0.18);
}
#bg-img {
  background-image: url("src/assets/hero-slides/wp3115813.jpg");
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

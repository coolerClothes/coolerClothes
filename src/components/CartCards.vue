<script setup>
import { ref, watch } from "vue";
import { useCartStore } from "../store";

const emit = defineEmits(["handle-cart-menu-activation"]);

const props = defineProps({
  editAllowed: Boolean
})

const store = useCartStore();
const cart = ref({});

const increaseQuantity = (product) => {
  store.addToCart(product);
};

const decreaseQuantity = (product) => {
  store.removeFromCart(product);
};

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
  console.log(cart.value);
}

watch(
  () => store.cart,
  () => {
    sortCart();
    console.log(cart.value);
  },
);
</script>

<template>
  <section id="component-container">
    <div
      id="cartProducts"
      v-if="Object.keys(cart).length !== 0"
      v-for="productArray in cart"
      class="bg-[#141414] mb-1 border-[#1c1c1c] overflow-hidden"
    >
      <section id="individual-card" class="p-2 font-inter">
        <div id="inner-card-flex-container" class="flex">
          <router-link
            :to="'/products/' + productArray[0].id"
            @click="emit('handle-cart-menu-activation')"
            ><img
              :src="productArray[0].imgSrc"
              :alt="productArray[0].alt"
              class="max-w-28"
          /></router-link>

          <section
            id="product-info-size-and-counter"
            class="flex flex-col flex-1 pl-5"
          >
            <router-link
              :to="'/products/' + productArray[0].id"
              @click="emit('handle-cart-menu-activation')"
            >
              <h2 class="font-semibold leading-1">
                {{ productArray[0].title }}
              </h2>
            </router-link>

            <h3 class="text-xs text-[#858585] font-light pt-1">
              {{ productArray[0].brand }}
            </h3>
            <h3 class="text-sm font-light pt-2 mt-2">
              {{ productArray[0].category }}
            </h3>

            <div
              id="size-and-counter"
              class="flex justify-between items-center"
            >
              <h3 class="text-s text-[#ff007a]">
                {{ productArray[0].chosenSize.toUpperCase() }}
              </h3>

              <section
                id="counter"

                class="flex items-center"
              >
                <img
                  src="/src/assets/icons/arrow-icon.svg"
                  alt="arrow right icon"
                  @click="decreaseQuantity(productArray[0])"
                  class="flex rotate-180 w-4 py-2 mr-1 cursor-pointer"
                />
                <h3 class="text-base border border-gray-800 px-2">
                  {{ productArray.length }}
                </h3>
                <img
                  src="/src/assets/icons/arrow-icon.svg"
                  alt="arrow right icon"
                  @click="increaseQuantity(productArray[0])"
                  class="w-4 py-2 ml-1 cursor-pointer"
                />
              </section>
            </div>
            <!-- size and counter -->
          </section>
          <section
            id="price-and-trashcan"
            class="flex flex-col justify-between mx-3"
          >
            <h2>{{ productArray[0].price }}:-</h2>

            <h2 v-if="!editAllowed" class="self-center">
              {{ productArray.length }}
            </h2>
            <!-- what is intended to display in this H2? Can it be removed? (from Amanda)-->

            <img
              v-if="editAllowed"
              src="/src/assets/icons/trash-icon.svg"
              alt="trashcan icon"
              class="h-7 cursor-pointer m-1 transition-transform transform-gpu hover:scale-[1.1]"
              @click="store.removeAllDuplicates(productArray[0])"
            />
          </section>
        </div>
        <!-- end of inner-card-flex-container -->
      </section>
      <!-- end of individual card -->
    </div>
    <!-- end of conditional itteration -->
    <div v-else>
      <h1
        class="text-center p-20 text-lg font-medium font-inter text-[#505050]"
      >
        Nothing to see here :(
      </h1>
    </div>
  </section>
</template>

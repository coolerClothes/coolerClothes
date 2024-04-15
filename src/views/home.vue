<script setup>
import { ref, watch } from "vue";
import Card from "../components/Card.vue";
import { useProductsStore } from "../store";

const store = useProductsStore();
const products = ref([]);

const filterForBestSellers = (productsCatalogue) => {
  if (store.productsCatalogue) {
    const productsArray = Object.values(productsCatalogue);
    const filteredProducts = productsArray.filter(
      (product) => product.bestSeller == true,
    );
    products.value = filteredProducts;
  }
};

watch(
  () => store.productsCatalogue,
  (newProductsCatalogue) => {
    filterForBestSellers(newProductsCatalogue);
  },
);

filterForBestSellers(store.productsCatalogue);
</script>

<template>
  <div
    id="bg-hero"
    class="hero bg-fixed bg-cover bg-[center_top_30%] text-white justify-center items-center h-[55vh] overflow-hidden"
    title="Crowd of manequins wearing COOLer Clothes apparel in a seemingly endless room"
  >
    <div
      id="hero-text-background"
      class="flex flex-col bg-black/55 h-full items-center justify-center text-center space-y-2 tracking-tighter"
    >
      <div
        id="huge-neons"
        class="flex flex-col uppercase text-7xl 2xl:text-[12vh] font-extrabold drop-shadow-[0_4.3px_1.4px_rgba(0,0,0,0.9)] tracking-[-.3rem] font-inter"
      >
        <!-- don't know why the drop shadow isn't working |||| Works for me /emil -->
        <span class="text-[#FF007A]">sale</span>
        <span class="text-[#00E0FF]">sale</span>
        <span class="text-[#FF007A]">sale</span>
      </div>
      <!-- huge neons -->
      <span
        class="text-2xl 2xl:text-[3.8vh] font-semibold uppercase font-antonio drop-shadow-[0_3.4px_1.4px_rgba(0,0,0,0.9)]"
        >Discount up to 66%</span
      >
    </div>
    <!-- hero text background -->
  </div>
  <!-- bg-hero -->

  <div
    class="flex flex-col items-center xl:px-[10%] my-2 lg:my-4 overflow-x-hidden"
  >
    <!--   <section
      id="more-content"
      class="grid grid-cols-4 gap-4 grid-rows-5 w-[60vw] h-[60vw] font-inter"
    >
      <div id="content1" class="bg-cover bg-center col-span-3 row-span-2"></div>
      <div id="content2" class="col-span-1 row-span-2">
        <h2 class="font-extrabold uppercase text-6xl">
          bye<br />
          bye<br />
          <span class="text-5xl font-antonio">winter</span>
        </h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      </div>
      <div id="content3" class="col-span-2 row-span-1">
        <h2 class="font-antonio text-4xl">hello spring</h2>
      </div>
      <div id="content4" class="bg-cover bg-center col-span-2 row-span-3"></div>
      <div id="content5" class="col-span-2 row-span-2">5</div>
    </section> -->
    <!-- more content -->
    <div
      class="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 2xl:gap-[1.7vw] p-4 mb-14"
    >
      <h2 class="text-2xl col-span-full font-antonio pt-4">Most popular</h2>
      <Card
        class="col-span-1"
        v-for="product in products"
        :key="product.id"
        :product="product"
        :cardImgSrc="product.imgSrc"
      />
    </div>
  </div>
</template>

<style scoped>
#bg-hero {
  background-image: url("assets/hero-slides/_bb005c35-e495-4702-ac13-34e16eff49e9.jpeg");
  background-repeat: no-repeat;
}
#content1 {
  background-image: url(assets/joshua-harris-ObIkGbVQY9M-unsplash.jpg);
  background-repeat: no-repeat;
} /*
#content2 {
  background-image: url(src/assets/hero-slides/wp3115813.jpg);
  background-repeat: no-repeat;
}
#content3 {
  background-image: url(src/assets/hero-slides/wp8279929.webp);
  background-repeat: no-repeat;
}
#content5 {
  background-image: url(src/assets/hero-slides/wp1895656.jpg);
  background-repeat: no-repeat;
}*/
#content4 {
  background-image: url(src/assets/hero-slides/wp1895665.jpg);
  background-repeat: no-repeat;
}
</style>

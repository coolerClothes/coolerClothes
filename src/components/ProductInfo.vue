<template>
  <div id="component-container" class="grid grid-cols-10 space-x-4">
    <div
      id="gallery-container"
      class="px-4 py-4 space-y-2 col-span-7 bg-gray-300 flex flex-col rounded h-auto max-h-screen justify-around items-center"
    >
      <!-- <div class="imgContainer ">
      </div> -->
      <img :src="galleryImgSrc" class="max-h-80 overflow-hidden object-cover" />

      <div
        id="gallery-row"
        class="flex justify-around h-fit max-h-1/3 space-x-2"
      >
        <div class="imgContainer overflow-hidden">
          <img :src="galleryImgSrc" class="object-contain" />
        </div>
        <div class="imgContainer overflow-hidden">
          <img :src="galleryImgSrc" class="object-contain" />
        </div>
        <div class="imgContainer overflow-hidden">
          <img :src="galleryImgSrc" class="object-contain" />
        </div>
        <div class="imgContainer overflow-hidden">
          <img :src="galleryImgSrc" class="object-contain" />
        </div>
      </div>
      <!-- gallery row -->
    </div>
    <!-- gallery container -->

    <div
      id="product-info-card"
      class="h-fit col-span-3 p-4 bg-slate-300 space-y-4 rounded"
    >
      <div id="titles-and-stock" class="relative">
        <h3>{{ product.title }}</h3>
        <span class="rounded p-1 bg-slate-100 absolute top-1/4 right-0"
          >in stock</span
        >
        <h4>{{ product.brand }}</h4>
      </div>
      <!-- titles and stock -->

      <div id="price-and-disclamer">
        <h2>{{ product.price }}</h2>
        <span id="small-print">Priser ink. moms. Frakt tillkommer.</span>
      </div>
      <!-- price and disclamer -->
      <div id="description-container">
        <span id="product-description">
          {{ product.description }}
        </span>
      </div>
      <!-- desrciption container -->
      <form>
        <input
          type="text"
          name="Size"
          list="sizeList"
          class="rounded w-full my-1.5 text-center"
        />
        <datalist id="sizeList">
          <option v-for="size in product.sizes" :value="size"></option>
        </datalist>
        <button
          label="Add to cart"
          class="w-full bg-black text-white rounded p-0.5"
        >
          Add to cart
        </button>
      </form>
    </div>
    <!-- product info card -->
  </div>
  <!-- component container -->
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    galleryImgSrc: {
      type: String,
    },
  },
};
</script>

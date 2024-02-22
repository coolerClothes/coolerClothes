<template>
  <div id="component-container" class="grid grid-cols-10 space-x-4">
    <div
      id="gallery-container"
      class="px-4 py-4 space-y-4 col-span-7 bg-gray-300 flex flex-col rounded h-auto justify-around"
    >
      <img
        src="/src/assets/products/accessories/1.jpg"
        class="h-64 object-contain"
      />

      <div id="gallery-row" class="flex justify-around">
        <img
          src="/src/assets/products/accessories/1.jpg"
          class="h-20 object-cover"
        />
        <img
          src="/src/assets/products/accessories/1.jpg"
          class="h-20 object-cover"
        />
        <img
          src="/src/assets/products/accessories/1.jpg"
          class="h-20 object-cover"
        />
        <img
          src="/src/assets/products/accessories/1.jpg"
          class="h-20 object-cover"
        />
      </div>
      <!-- gallery row -->
    </div>
    <!-- gallery container -->

    <div
      id="product-info-card"
      class="col-span-3 p-4 bg-slate-300 space-y-4 rounded"
    >
      <div id="titles-and-stock" class="relative">
        <h3>Product name</h3>
        <span class="rounded p-1 bg-slate-100 absolute top-1/4 right-0"
          >in stock</span
        >
        <h4>Brand</h4>
      </div>
      <!-- titles and stock -->

      <div id="price-and-disclamer">
        <h2>Price</h2>
        <span id="small-print">Priser ink. moms. Frakt tillkommer.</span>
      </div>
      <!-- price and disclamer -->
      <div id="description-container">
        <span id="product-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          obcaecati maiores in perferendis distinctio dolorem ad aut doloribus
          sint cum hic cupiditate dolore, ex voluptate sequi, beatae adipisci
          magni nemo.
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
          <option value="xs"></option>
          <option value="s"></option>
          <option value="m"></option>
          <option value="l"></option>
          <option value="xl"></option>
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
/* export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}; */
</script>

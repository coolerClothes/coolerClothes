<script setup>
    import { ref, watch } from 'vue'
    import Card from '../components/Card.vue'
    import { useProductsStore } from '../store'

    const store = useProductsStore()
    const products = ref(store.productsCatalogue)

    watch(
        () => store.productsCatalogue,
        (newProductsCatalogue) => {
            products.value = newProductsCatalogue
        }
    )
</script>

<template>
    <div
        class="hero bg-cover bg-center text-white flex flex-col justify-center items-center bg-hero h-[56vh]"
    >
        <div>
            <h1 class="text-4xl mb-2">Big Dummy Text</h1>
            <p class="text-lg">Dummy Text</p>
        </div>
    </div>
    <div class="mt-[40px]">
        <h2 class="px-24 ml-4 text-4xl mb-2">Best sellers</h2>
    </div>
    <div class="px-24 my-4 overflow-x-hidden">
        <div class="grid grid-cols-5 gap-4 p-4">
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
    .bg-hero {
        background-image: url('../src/assets/hero.png');
        background-size: 100% auto;
        background-repeat: no-repeat;
    }
</style>

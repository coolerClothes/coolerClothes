<script setup>
    import { ref, watch } from 'vue'
    import Card from '../components/Card.vue'
    import { useProductsStore } from '../store'

    const store = useProductsStore()
    const products = ref([])

    const filterForBestSellers = (productsCatalogue) => {
        if (store.productsCatalogue) {
            const productsArray = Object.values(productsCatalogue)
            const filteredProducts = productsArray.filter(
                (product) => product.bestSeller == true
            )
            products.value = filteredProducts
        }
    }

    watch(
        () => store.productsCatalogue,
        (newProductsCatalogue) => {
            filterForBestSellers(newProductsCatalogue)
        }
    )

    filterForBestSellers(store.productsCatalogue)
</script>

<template>
    <div
        id="bg-hero"
        class="hero bg-cover bg-[center_top_30%] text-white justify-center items-center h-[50vh]"
    >
        <div
            id="hero-text-background"
            class="flex flex-col bg-black/55 h-full items-center justify-center text-center space-y-2 tracking-tighter"
        >
            <div
                id="huge-neons"
                class="flex flex-col uppercase text-8xl font-extrabold drop-shadow-[0_4.3px_1.4px_rgba(0,0,0,0.9)] tracking-[-.25rem] font-inter"
            >
                <!-- don't know why the drop shadow isn't working -->
                <span class="text-[#FF007A]">sale</span>
                <span class="text-[#00E0FF]">sale</span>
                <span class="text-[#FF007A]">sale</span>
            </div>
            <!-- huge neons -->
            <span
                class="text-3xl font-semibold uppercase font-antonio drop-shadow-[0_3.4px_1.4px_rgba(0,0,0,0.9)]"
                >Discount up to 66%</span
            >
        </div>
        <!-- hero text background -->
    </div>
    <!-- bg-hero -->

    <div class="xl:px-24 px-8 my-2 lg:my-4 overflow-x-hidden">
        <div
            class="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4 py-2 md:py-4 lg:py-12"
        >
            <h2 class="text-4xl col-span-full font-antonio pb-5">
                Best sellers
            </h2>
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
        background-image: url('src/assets/hero-slides/_bb005c35-e495-4702-ac13-34e16eff49e9.jpeg');
        background-repeat: no-repeat;
    }
</style>

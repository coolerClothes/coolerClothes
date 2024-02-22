<script>
    import Card from '../components/Card.vue'
    import { useProductsStore } from '../store'

    export default {
        components: {
            Card
        },
        setup() {
            const store = useProductsStore()
            return {
                products: store.productsCatalogue
            }
        }
    }
</script>
<!-- <script> ONLY BEST SELLERS VERSION
    import Card from '../components/Card.vue'
    import { useProductsStore } from '../store'

    export default {
        components: {
            Card
        },
        setup() {
            const store = useProductsStore();
            const bestSellerProducts = store.productsCatalogue.filter(product => product.bestSeller === true);

            return {
                bestSellerProducts,
            };
        },
    };
</script> -->

<template>
    <div
        class="hero bg-cover bg-center text-white h-screen flex flex-col justify-center items-center bg-hero"
    >
        <h1 class="text-4xl mb-2">Big Dummy Text</h1>
        <p class="text-lg">Dummy Text</p>
    </div>

    <div class="grid grid-cols-5 gap-4 p-4">
        <Card
            class="col-span-1"
            v-for="product in products"
            :key="product.id"
            :product="product"
            :cardImgSrc="product.imgSrc"
        />
    </div>
</template>

<style scoped>
    .bg-hero {
        background-image: url('../src/assets/hero.png');
        background-size: 100% auto;
        background-repeat: no-repeat;
    }
</style>

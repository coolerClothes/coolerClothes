<script>
import {useProductsStore} from "../store"
import { ref, watch, computed} from "vue";
import Card from "../components/Card.vue"

export default {
  components: {
    Card,
  },
  setup() {
    const store = useProductsStore();
    const products = ref(store.productsCatalogue);
    const productsArray = ref([]);
    const favoritesArray = JSON.parse(localStorage.getItem("favoritesArray"));
    console.log(favoritesArray)

    const filteredArray = computed(() =>
      productsArray.value.filter(isInLocalStorage)
    );

    function isInLocalStorage(product) {
        if(favoritesArray !== null){
    return favoritesArray.includes(product.title);}
    };

    let hasFavorites = "";
    if(favoritesArray !== null){
        hasFavorites = true
    }
    else{
        hasFavorites = false
    }

    watch(
        () => store.productsCatalogue,
        (newProductsCatalogue) => {
            products.value = newProductsCatalogue;
            if(products.value){
              productsArray.value = Object.values(products.value);
            }
    }, {immediate: true});

    return {
            filteredArray,
            hasFavorites
            }

}
}

</script>

<template>
<div v-if="hasFavorites">
    <p class="text-2xl font-antonio pt-4 pl-4">Favorites</p>
            <div
        class="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 p-4" >
        <Card
        v-for="product in filteredArray"
        class="col-span-1"
        :key="product.id"
        :product="product"
        :cardImgSrc="product.imgSrc"
        />
    </div>
</div>
  <div v-else>
  <p class="text-2xl font-antonio pt-4 pl-4">Favorites</p>
  <p class="text-center" >no favorite products</p>
</div>

</template>

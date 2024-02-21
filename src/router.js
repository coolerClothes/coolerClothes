import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/home.vue'
import Search from './views/search.vue'
import Product from './views/product.vue'
import Filtered_view from './views/filtered_view.vue'


const routes = [
    {
        path: "/", name: "Home", component: Home
    },
    {
        path: "/search", name: "Search", component: Search
    },
    {
        path: "/search/:category", name: "Filter", component: Filtered_view
    },
    {
        path: "/:product", name: "Product", component: Product
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

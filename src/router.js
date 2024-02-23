import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/home.vue'
import Search from './views/search.vue'
import Product from './views/product.vue'

const routes = [
    {
        path: "/", name: "Home", component: Home
    },
    {
        path: "/search/:category/:searchquery?", name: "Search", component: Search,
    },
    {
        path: "/products/:product", name: "Product", component: Product
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

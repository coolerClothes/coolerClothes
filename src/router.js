import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./views/home.vue";
import Search from "./views/search.vue";
import Product from "./views/product.vue";
import Favorites from "./views/favorites.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search/:category/:searchquery?",
    name: "Search",
    component: Search,
  },
  {
    path: "/products/:productID",
    name: "Product",
    component: Product,
  },
  {
    path: "/favorites/favorites",
    name: "Favorites",
    component: Favorites,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

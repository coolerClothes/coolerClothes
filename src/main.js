import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from './home.vue'
import About from './about.vue'


const router = createRouter({
    history: createWebHashHistory,
    routes:[
        {
            path:"/", name: "Home", component: Home
        },
        {
            path:"/about", name: "About", component: About
        },
    ]

})



createApp(App).use(router).mount('#app')

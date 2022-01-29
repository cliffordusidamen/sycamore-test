import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./pages/Shop.vue'),
    },
    {
        path: '/item/:slug',
        name: 'view_item',
        component: () => import('./pages/Shop.vue'),
    },
    {
        path: '/cart',
        name: 'cart.view',
        component: () => import('./pages/Shop.vue'),
    },
    // { path: '/about', component: About },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

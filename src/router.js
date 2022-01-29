import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('./pages/Shop.vue'),
    },
    {
        path: '/item/:slug',
        component: () => import('./pages/Shop.vue'),
    },
    // { path: '/about', component: About },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

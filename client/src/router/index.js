import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {layout: 'main'},
        component: () => import('../views/HomePage.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: {layout: 'empty'},
        component: () => import('../views/LoginPage.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {layout: 'empty'},
        component: () => import('../views/RegisterPage.vue')
    },
    {
        path: '/categories',
        name: 'category',
        meta: {layout: 'main'},
        component: () => import('../views/CategoryPage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
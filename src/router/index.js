import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/home/home.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
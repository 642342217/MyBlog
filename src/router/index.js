import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/home/home.vue';
import ArticleDetail from '../components/Article/ArticleDetail.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/article',
        component: ArticleDetail
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
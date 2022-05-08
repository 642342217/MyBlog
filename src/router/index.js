import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/home/home.vue';
import ArticleDetail from '../components/Article/ArticleDetail.vue';
import CateArticles from '../components/ArticlesOfCate/CateArticles.vue';
import Content from '../components/Article/Content.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/article',
        component: ArticleDetail,
        children: [
            {
                path: 'content',
                component: Content
            }
        ]
    },
    {
        path: '/category',
        component: CateArticles
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        console.log(to.path);
        console.log(from.path);
        if(to.path === '/article/content' || to.path === '/category' || to.path === '/') {
            return { 
                top: 0,
                behavior: "smooth"
            }
        }
    }
});

export default router;
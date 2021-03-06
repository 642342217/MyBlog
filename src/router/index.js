import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/home/home.vue';
import ArticleDetail from '../components/Article/ArticleDetail.vue';
import CateArticles from '../components/ArticlesOfCate/CateArticles.vue';
import Content from '../components/Article/Content.vue';
import TimeLine from '../components/Timeline/TimeLine.vue';
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
    },
    {
        path: '/timeline',
        component: TimeLine
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        if(to.path === '/article/content' || to.path === '/category' || to.path === '/') {
            return { 
                top: 0,
                behavior: "smooth"
            }
        }
    }
});

export default router;
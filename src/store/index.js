import { createStore } from 'vuex';
import api from '../api/index';

export const store = createStore({
    state() {
        return {
            //所有文章
            articles: [],
            //所有目录
            categories: []
        }
    },

    actions: {
        //获取文章
        setArticles({ commit }) {
            api.getAllArticles().then((data) => {
                let res = data.data.data;
                commit('setArticles' ,res);
            })
            .catch((err) => console.log(err));
        },
        //获取文章目录
        setCategories({ commit }) {
            api.getAllCategories().then((data) => {
                let res = data.data.data.slice();
                commit('setCategories' ,res);
            })
            .catch(err => console.log(err));
        }
    },

    mutations: {
        setArticles(state, articles) {
            state.articles = articles.slice();
        },
        setCategories(state, categories) {
            state.categories = categories.slice();
        }
    },

    getters: {
        getAllArticles(state) {
            return state.articles;
        },
        getAllCategories(state) {
            return state.categories;
        }
    }
});
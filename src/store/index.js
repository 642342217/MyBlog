import { createStore } from 'vuex';
import api from '../api/index';

export const store = createStore({
    state() {
        return {
            //所有文章
            articles: [],
            //所有目录
            categories: [],
            //左侧个人中心是否显示
            isShowPersonal: false,
            //白天-黑夜模式切换
            isDay: false,
            //当前页码
            curPage: 1
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
        },
        setIsShowPersonal(state) {
            state.isShowPersonal = state.isShowPersonal ? false : true;
        },
        setIsDay(state) {
            state.isDay = state.isDay ? false : true;
        },
        setCurPage(state, num) {
            state.curPage = num;
        }
    },

    getters: {
        getAllArticles(state) {
            return state.articles;
        },
        getAllCategories(state) {
            return state.categories;
        },
        getIsShowPersonal(state) {
            return state.isShowPersonal;
        },
        getIsDay(state) {
            return state.isDay;
        },
        getCurPage(state) {
            return state.curPage;
        }
    }
});
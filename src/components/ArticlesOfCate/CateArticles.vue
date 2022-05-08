<template>
  <div class="cate-articles">
    <Article
      v-for="article in articles"
      :key="article.title"
      :category="article.category"
      :date="article.date"
      :title="article.title"
    />
  </div>
</template>

<script>
import Article from "../home/Article.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { watch, reactive } from "vue";
export default {
  components: { Article },
  setup() {
    const store = useStore();
    const currentRoute = reactive(useRoute());
    const articles = reactive([]);


    //获取该目录下的所有文章
    function getData() {
      store.getters.getAllArticles.forEach((article) => {
        if (article.category === currentRoute.query.cate) {
          articles.push(article);
        }
      });
    }

    getData();

    watch(currentRoute, () => {
        getData();
    });

    return {
      articles
    }
  },
};
</script>

<style scoped lang="less">
.cate-articles {
    margin: 0 auto;
    margin-top: 20vh;
    width: 60vw;
    max-width: 1088px;
}
@media (max-width: 991px) {
  .cate-articles {
    width: 90vw;
  }
}
</style>
<template>
  <div class="description">MyBlog</div>
  <div class="content">
    <div class="left">
      <Article
        v-for="article in articles"
        :key="article.id"
        :category="article.category"
        :date="article.date"
        :title="article.title"
        @click="() => toDetailArticle(article.title, article.category)"
      />
    </div>
    <div class="right" v-if="!isMobile">
      <MySelf />
    </div>
  </div>
</template>

<script>
import Article from "./Article.vue";
import MySelf from "./MySelf.vue";
import { ref, onBeforeMount, reactive } from "vue";
import { useRouter } from 'vue-router';
import api from "../../api/index";
export default {
  components: {
    Article,
    MySelf,
  },
  setup() {
    let isMobile = ref(false);
    let articles = reactive([]);
    const router = useRouter()

    //跳转至具体文章页面
    function toDetailArticle(title, cate) {
      router.push({ path: '/article', query: {
        title,
        cate
      }});
    }

    onBeforeMount(async () => {
      try {
        let res = await api.getAllArticles();
        if (res.status != 200) {
          throw new Error("获取文章失败！");
        }

        res.data.data.forEach((item) => {
          articles.push(item);
        });
      } catch (err) {
        console.log(err, "获取文章失败！");
      }
    });

    return {
      isMobile,
      articles,
      toDetailArticle
    };
  },
};
</script>

<style scoped lang="less">
.description {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: 700;
}
.content {
  display: flex;
  position: absolute;
  top: 88vh;
  box-sizing: border-box;
  padding: 0 2rem;
  width: 100%;
  height: 200px;
  .left {
    flex: 1;
  }
}
</style>
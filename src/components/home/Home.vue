<template>
  <div class="description">MyBlog</div>
  <div class="content">
    <div class="left">
      <Article v-for="(article, index) in articles" :key="article.id" :category="article.category" :date="article.date"
        :title="article.title" :id="'index' + index"/>
      <MyPage />
    </div>
    <div v-if="!isMobile">
      <MySelf />
    </div>
  </div>
</template>

<script>
import MyPage from '../MyPage.vue';
import Article from "./Article.vue";
import MySelf from "./MySelf.vue";
import { useStore } from "vuex";
import { ref, reactive, watch, toRefs, computed } from "vue";
export default {
  components: {
    Article,
    MySelf,
    MyPage
  },
  setup() {
    let isMobile = ref(true);
    let articles = reactive([]);
    const store = useStore();
    let { getCurPage: curPage } = toRefs(store.getters);

    setIsMoble();

    const temp = computed(() => store.getters.getAllArticles);

    watch([curPage, temp], ([newPage]) => {
      articles.length = 0;
      temp.value.slice((newPage - 1) * 8, (newPage - 1) * 8 + 8).forEach(data => {
        articles.push(data);
      });
    }, { immediate: true, deep: true } );

    function setIsMoble() {
      isMobile.value =
        document.documentElement.clientWidth > 991.98 ? false : true;
    }

    window.addEventListener("resize", setIsMoble);

    return {
      isMobile,
      articles,
      temp
    };
  },
};
</script>

<style scoped lang="less">
.description {
  height: 100vh;
  width: 100vw;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  line-height: 100vh;
}

.content {
  display: flex;
  position: absolute;
  top: 100vh;
  box-sizing: border-box;
  padding: 0 2rem;
  width: 100%;
  height: 200px;

  .left {
    flex: 1;
  }
}

@media (max-width: 991.98px) {
  .description {
    position: absolute;
    left: 50%;
    top: 25vh;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    font-weight: 700;
  }

  .content {
    display: flex;
    position: absolute;
    top: 40vh;
    box-sizing: border-box;
    padding: 0 2rem;
    width: 100%;
    height: 200px;

    .left {
      flex: 1;
    }
  }
}
</style>
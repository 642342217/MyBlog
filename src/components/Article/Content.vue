<template>
  <div :class="{ right: true, day: isDay }">
    <div class="title">{{ article.title }}</div>
    <div class="description">
      <i class="iconfont">&#xe65c;<span> HUIJUN</span></i>
      <i class="iconfont"
        >&#xe8c4;<span> {{ article.date }}</span></i
      >
      <i class="iconfont"
        >&#xe63e;<span> {{ article.category }}</span></i
      >
    </div>
    <div class="content">
      <article v-html="article.content" class="markdown-body"></article>
    </div>
  </div>
  <div class="top" :style="showTopStatus ? '' : 'top: 100vh'" @click="toTop">
    <i class="iconfont">&#xe635;</i>
  </div>
</template>

<script>
import api from "../../api/index";
import MarkdownIt from "markdown-it";
import "../../assets/markdown.css";
import { onBeforeMount, reactive, toRefs, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const article = reactive({});
    const route = useRoute();
    const currentRoute = reactive(useRoute());
    let showTopStatus = ref(false);
    let { getIsDay: isDay } = toRefs(store.getters);

    const md = new MarkdownIt();

    //查询当前文章信息
    function getCurrentArticle() {
      store.getters.getAllArticles.forEach((item) => {
        if (item.title === currentRoute.query.title) {
          article.title = item.title;
          article.category = item.category;
          article.date = item.date;
          article.content = md.render(item.content);
        }
      });
    }

    getCurrentArticle();

    //回到文章顶部
    function toTop() {
      window.scrollTo({
        top: 0,
      });
    }

    //根据滚动距离，展示滚动置顶图标
    let flag = false;
    window.addEventListener("scroll", function () {
      if (flag) return;
      flag = true;
      setTimeout(() => {
        let scrollY =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollY > 1000) {
          showTopStatus.value = true;
        } else {
          showTopStatus.value = false;
        }
        flag = false;
      }, 500);
    });

    // 获取当前文章所在目录下的文章
    let titles = reactive([]);
    const getAllRelArticles = async () => {
      let data = await api.getAllRelArticles(route.query.cate);

      data.data.data.forEach((item) => {
        titles.push(item);
      });
    };

    //检测当前可视窗口的大小
    onBeforeMount(() => {
      getAllRelArticles();
    });

    return {
      article,
      titles,
      route,
      isDay,
      toTop,
      showTopStatus,
    };
  },
};
</script>

<style scoped lang="less">
.right {
  flex: 1;
  margin-top: 4rem;
  margin-left: 16.76rem;
  margin-right: 2.76rem;
  padding: 20px 50px;
  box-sizing: border-box;
  border-color: #eaecef;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  width: 60vw;
  &:hover {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
  }
  .title {
    transition: 0.3s all;
    position: relative;
    font-size: 2rem;
    font-weight: 700;
    line-height: 3rem;
    display: inline-block;
  }
  .description {
    i {
      color: #666;
      margin-right: 16px;
      font-size: 1.5rem;
    }
  }
  .content {
    box-sizing: border-box;
    padding: 1rem 0;
  }
}
.top {
  transition: all 0.5s linear;
  position: fixed;
  z-index: 10000;
  right: 2rem;
  top: 90vh;
  cursor: pointer;
  display: inline-block;
  i {
    font-size: 2.4rem;
    color: #3eaf7c !important;
  }
}

@media (max-width: 991px) {
  div.right {
    flex: 1 1 0%;
    margin: 0 auto;
    width: 100vw;
    padding: 1.1rem 1.1rem;
    box-sizing: border-box;
    border-color: rgb(234, 236, 239);
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 8px 0px;
    &:hover {
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
    }
    .title {
      transition: 0.3s all;
      position: relative;
      font-size: 1.58rem;
      font-weight: 700;
      line-height: 46px;
      display: inline-block;
    }
    .description {
      i {
        color: #666;
        margin-right: 16px;
      }
    }
    .content {
      box-sizing: border-box;
      padding: 1rem 0;
    }
  }
}
.day {
  color: white !important;
  background-color: #000 !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 1px 8px 0 #eaecef !important;
}
</style>
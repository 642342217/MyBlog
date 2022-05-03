<template>
  <div class="article">
    <div class="left" v-if="!isMobile">

    </div>
    <div class="right">
      <div class="title">{{ article.title }}</div>
      <div class="description">
        <i class="iconfont">&#xe65c;<span> HUIJUN</span></i>
        <i class="iconfont">&#xe8c4;<span> {{ article.date }}</span></i>
        <i class="iconfont">&#xe63e;<span> {{ article.category }}</span></i>
      </div>
      <div class="content">
          <article v-html="article.content" class="markdown-body"></article>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/index';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import '../../assets/markdown.css';
import { ref, onBeforeMount, reactive } from "vue";
import { useStore } from 'vuex';
import { useRoute } from 'vue-router'; 
export default {
  setup() {
    let isMobile = ref(false);
    const store = useStore();
    const article = reactive({});
    const route = useRoute();

    function setIsMoble() {
      isMobile.value =
        document.documentElement.clientWidth > 991.98 ? false : true;
    }

    const artitleTitle = route.query.title;
    //引入md对象，将md文档转换为html格式
    //并设置高亮模式
     const md = new MarkdownIt({
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang))
          {
            try
            {
              return '<pre class="hljs"><code>' +
                hljs.highlight(lang, str, true).value +
                '</code></pre>';
            } catch (__) { }
          }
          return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
      });

    //查询当前文章信息
    store.getters.getAllArticles.forEach(item => {
        if(item.title === artitleTitle) {
            article.title = item.title;
            article.category = item.category;
            article.date = item.date;
            article.content = md.render(item.content);
        }
    });

    // 获取当前文章所在目录下的文章
    const getAllRelArticles = async () => {
      let data = await api.getAllRelArticles(route.query.cate);

      console.log(data);
    }



    //检测当前可视窗口的大小
    onBeforeMount(() => {
      setIsMoble();
      window.addEventListener("resize", setIsMoble);
      getAllRelArticles();
    });

    return {
      isMobile,
      article
    };
  },
};
</script>

<style lang="less" scoped>
.article {
  display: flex;
  margin-top: 3.3rem;
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
    max-width: 60vw;
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
  .left {
    overflow: hidden;
    position: fixed;
    width: 14.76rem;
    height: 100px;
    font-size: 15px;
    top: 7.3rem;
    left: 0;
    background-color: red;
  }
  .aside {
      width: 14.76rem;
  }
}
</style>
<template>
  <div :class="{ 'article': true, 'day': isDay }" @click="() => toDetailArticle(title, category)">
    <div class="title">{{ title }}</div>
    <div class="des">
      <i class="iconfont">&#xe65c;<span> HUIJUN</span></i>
      <i class="iconfont">&#xe8c4;<span> {{date}}</span></i>
      <i class="iconfont">&#xe63e;<span> {{category}}</span></i>
    </div>
  </div>
</template>
//分页功能
<script>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  props: ['title', 'date', 'category'],
  setup(props) {
    const { title, date, category } = toRefs(props);
    const router = useRouter();
    const store = useStore();
    let { getIsDay: isDay } = toRefs(store.getters);

    //跳转至具体文章页面
    function toDetailArticle(title, cate) {
      router.push({ path: '/article/content', query: {
        title,
        cate
      }});
    }

    return {
      title,
      date,
      category,
      toDetailArticle,
      isDay
    };
  },
};
</script>

<style scoped lang="less">
.article {
  position: relative;
  width: 100%;
  line-height: 46px;
  font-size: 1.28rem;
  border-color: #eaecef;
  box-sizing: border-box;
  padding: 16px 20px;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
  }
  .title {
    transition: .3s all;
    position: relative;
    font-size: 1.28rem;
    font-weight: 560;
    line-height: 46px;
    display: inline-block;
    &:hover {
      color: #3eaf7c;
    }
  }
  .des {
    i {
      font-size: 1.1rem;
      color: #666;
      margin-right: 16px;
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

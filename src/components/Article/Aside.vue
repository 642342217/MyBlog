<template>
  <div class="aside">
    <h2>{{cate}}</h2>
    <ul @click="(event) => toDetailPage(event)">
      <li v-for="title in titles" :key="title.title" :class="{ 'active': $route.query.title == title.title }" :t="title.title">{{title.title}}</li>
    </ul>
  </div>
</template>

<script>
import { toRefs, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default {
  props: ['cate', 'titles'],
  emits: ['getArticle'],
  setup(props, context) {
    const { cate, titles } = toRefs(props);
    const router = useRouter();
    const currentRoute = reactive(useRoute());

    // 跳转至具体文章
    function toDetailPage(e) {
      router.push({ path: '/article', query: {
        title: e.target.getAttribute('t'),
        cate: cate.value
      }});
    }

    return {
      cate,
      titles,
      toDetailPage
    }
  }
}
</script>

<style scoped lang="less">
    .aside {
        width: 100%;
        box-sizing: border-box;
        padding: 1.2rem 1.2rem;
        background-color: white;
        color: #3eaf7c;
        ul {
          list-style: none;
          li {
            color: black;
            margin-left: -1rem;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
    }

    .active {
      background-color: #3eaf7c !important;
      color: white !important;
    }
</style>
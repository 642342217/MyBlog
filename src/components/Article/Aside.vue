<template>
  <div :class="{ 'aside': true, 'day': isDay }">
    <h2>{{ cate }}</h2>
    <ul @click="(event) => toDetailPage(event)">
      <li
        v-for="title in titles"
        :key="title.title"
        :class="{ 'day': isDay, active: $route.query.title == title.title }"
        :t="title.title"
      >
        {{ title.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
export default {
  props: ["cate", "titles"],
  emits: ["getArticle"],
  setup(props) {
    const { cate, titles } = toRefs(props);
    const router = useRouter();
    const store = useStore();
    let { getIsDay: isDay } = toRefs(store.getters);

    // 跳转至具体文章
    function toDetailPage(e) {
      if(!e.target.getAttribute('t')) return;
      router.push({
        path: "/article/content",
        query: {
          title: e.target.getAttribute("t"),
          cate: cate.value,
        },
      });
    }

    return {
      cate,
      titles,
      toDetailPage,
      isDay
    };
  },
};
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
.day {
  color: white !important;
  background-color: #000 !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 1px 8px 0 #eaecef !important;
}
</style>
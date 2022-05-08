<template>
  <div :class="{ 'article': true, 'day': isDay }">
    <div class="left" v-if="!isMobile">
      <Aside
        :cate="route.query.cate"
        :titles="titles"
      />
    </div>
    <router-view :key="route.query.title"></router-view>
  </div>
</template>

<script>
import api from '../../api/index';
import Content from './Content.vue';
import Aside from "./Aside.vue";
import "../../assets/markdown.css";
import { ref, onBeforeMount, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { useStore } from 'vuex';
export default {
  components: { Aside, Content },
  setup() {
    let isMobile = ref(false);
    const route = useRoute();
    const store = useStore();
    let { getIsDay: isDay } = toRefs(store.getters);

    function setIsMoble() {
      isMobile.value =
        document.documentElement.clientWidth > 991.98 ? false : true;
    }

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
      setIsMoble();
      window.addEventListener("resize", setIsMoble);
      getAllRelArticles();
    });

    return {
      isMobile,
      titles,
      route,
      isDay
    };
  },
};
</script>

<style lang="less" scoped>
.article {
  display: flex;
  margin-top: 3.3rem;
  .left {
    overflow: hidden;
    position: fixed;
    width: 14.76rem;
    font-size: 15px;
    top: 7.3rem;
    left: 0;
  }
  .aside {
    width: 14.76rem;
  }
}
.day {
  color: white !important;
  background-color: #000 !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 1px 8px 0 #eaecef !important;
}
</style>
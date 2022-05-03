<template>
  <div class="root">
    <HeaderNav />
    <router-view></router-view>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import HeaderNav from "./components/HeaderNav.vue";
export default {
  name: "App",
  components: {
    HeaderNav,
  },
  setup() {
    const store = useStore();

    store.dispatch('setArticles');
    store.dispatch('setCategories');
    return {};
  },
};
</script>

<style scoped lang="less">
.root {
  position: relative;
  height: 100vh;
  width: 100%;
  background: url(https://sanyuan0704.top/assets/img/bg.2cfdbb33.svg) center
    center / cover no-repeat;
}
</style>

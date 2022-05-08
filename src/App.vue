<template>
  <div :class="{ 'root': true, 'day': isDay}">
    <HeaderNav />
    <router-view :key="route.query"></router-view>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import HeaderNav from "./components/HeaderNav.vue";
import { toRefs, watch } from 'vue';
export default {
  name: "App",
  components: {
    HeaderNav,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    let { getIsDay: isDay } = toRefs(store.getters);

    watch(isDay, () => {
      if(isDay.value) {
        console.log(isDay.value, '黑夜');
        document.body.style.color = 'white';
        document.body.style.backgroundColor = 'black';
        document.body.style.borderColor = '#0000001a';
        document.body.style.boxShadow = '0 1px 8px 0 rgb(234, 236, 239)';
      } else {
        document.body.style.color = 'black';
        document.body.style.backgroundColor = '#fff';
        document.body.style.borderColor = '#eaecef';
        document.body.style.boxShadow = '0 1px 8px 0 rgba(0, 0, 0, 0.1)';
      }
    });

    store.dispatch('setArticles')
    store.dispatch('setCategories');
    
    return {
      route,
      isDay
    };
  },
};
</script>

<style scoped lang="less">
.root {
  // position: fixed;
  // min-height: 100vh;
  height: max-content;
  width: 100%;
  background: url(https://sanyuan0704.top/assets/img/bg.2cfdbb33.svg) center
    center / cover no-repeat;
}
.day {
  color: white !important;
  background-color: #000 !important;
  border-color: #0000001a !important;
  box-shadow: 0 1px 8px 0 rgb(234, 236, 239) !important;
}
</style>

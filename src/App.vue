<template>
    <div class="root">
      <HeaderNav />
      <router-view></router-view>
    </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';
export default {
  name: 'App',
  components: {
    HeaderNav,
  },
  setup() {
    return {

    }
  }
}
</script>

<style scoped lang="less">
  .root {
    height: 100vh;
    width: 100%;
    background: url(https://sanyuan0704.top/assets/img/bg.2cfdbb33.svg) center center / cover no-repeat;  
  }
</style>

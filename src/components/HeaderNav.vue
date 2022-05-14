<template>
  <div :class="{ 'header-nav': true, 'day': isDay }">
    <div class="showlist-icon iconfont" v-if="showlist" @click="showPersonal">&#xeaf1;</div>
    <div class="title">MyBlog</div>
    <div class="day-night" @click="changeDay">
        <i class="iconfont day" v-if="isDay">&#xe64f;</i>
        <i class="iconfont night" v-else>&#xe76b;</i>
      </div>
    <div class="show-list" v-if="!showlist">
      <div @click="toHome"><i class="iconfont">&#xe751;</i>主页</div>
      <div @mouseenter="showCate" @mouseleave="hidCate" class="cate">
        <i class="iconfont">&#xe66b;</i>目录
        <CateList v-if="isShow" />
      </div>
      <div @click="toTimeLine"><i class="iconfont">&#xe8c4;</i>时间线</div>
      <div><i class="iconfont">&#xe655;</i>关于</div>
    </div>
  </div>
  <Personal v-if="isShowPersonal"/>
</template>

<script>
import CateList from "./showCate/CateList.vue";
import Personal from './home/Mobile/Personal.vue';
import { useStore } from 'vuex';
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  components: { CateList, Personal },
  setup() {
    let showlist = ref(false);
    const router = useRouter();
    const store = useStore();
    let isShow = ref(false);
    let { getIsDay: isDay } = toRefs(store.getters);
    let { getIsShowPersonal: isShowPersonal } = toRefs(store.getters);

    function toHome() {
      router.push({ path: "/" });
    }

    //根据可视窗口大小来展示相应页面
    function setIsMoble() {
      showlist.value =
        document.documentElement.clientWidth > 991.98 ? false : true;
    }
    setIsMoble();

    // 根据可视窗口大小展示Cate组件
    function showCate() {
      isShow.value = true;
    }
    function hidCate() {
      isShow.value = false;
    }

    // 展示左侧的个人信息栏
    function showPersonal() {
      store.commit('setIsShowPersonal');
    }

    //切换白天黑夜模式
    function changeDay() {
      store.commit('setIsDay');
    }

    //跳转至时间线页面
    function toTimeLine() {
      router.push({ path: '/timeline' });
    }


    window.addEventListener('resize', setIsMoble);

    return {
      showlist,
      toHome,
      isShow,
      showCate,
      hidCate,
      showPersonal,
      isShowPersonal,
      isDay,
      changeDay,
      toTimeLine
    };
  },
};
</script>

<style scoped lang="less">
.header-nav {
  display: flex;
  position: fixed;
  z-index: 10000;
  height: 4.3rem;
  top: 0;
  width: 100vw;
  line-height: 4.3rem;
  padding: 0 1.2rem;
  border-color: #eaecef;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  .showlist-icon {
    font-size: 3rem;
    cursor: pointer;
  }
  .title {
    font-size: 1.6rem;
    margin-left: 1rem;
    font-weight: 600;
  }
  .show-list {
    font-size: 1.2rem;
    display: flex;
    position: absolute;
    width: 400px;
    right: 100px;
    justify-content: space-between;
    div {
      cursor: pointer;
      &:hover {
        color: #3eaf7c;
      }
    }
    .cate {
      position: relative;
    }
    i {
      margin: 0 0.3rem;
    }
  }
  .day-night {
    cursor: pointer;
      margin: 0 auto;
      .day {
        font-size: 2rem;
        color: red;
      }
      .night {
        font-size: 2rem;
        color: rgb(76, 125, 145);
      }
    }
}
.day {
  color: white !important;
  background-color: #000 !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 1px 8px 0 #eaecef !important;
}
@media (max-width: 991px) {
  .day-night {
    position: absolute;
    right: 4.5rem;
  }
}
</style>
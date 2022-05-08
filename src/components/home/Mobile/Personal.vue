<template>
  <div class="mask" @click="hidPersonal"></div>
  <div :class="{ 'personal': true, 'day': isDay }">
    <!-- 个人基本信息 -->
    <div class="personal-info">
      <img src="../../../assets/image/avatar.jpg" alt="author-avatar" />
      <h3>HUIJUN</h3>
      <div class="num">
        <div>
          <h3>96</h3>
          <h6>Article</h6>
        </div>
        <div>
          <h3>20</h3>
          <h6>Cate</h6>
        </div>
      </div>
    </div>
    <!-- 导航列表 -->
    <div class="show-list">
      <div @click="toHome"><i class="iconfont">&#xe751;</i>主页</div>
      <div class="cate" @click="showList">
        <i class="iconfont">&#xe66b;</i>目录
      </div>
      <div class="cate-lists" v-if="isShowList">
        <ul class="cate-list">
          <li v-for="cate in cateList" :key="cate.name" @click="() => toDetailCate(cate.name)">
            {{ cate.name }}
          </li>
        </ul>
      </div>
      <div><i class="iconfont">&#xe8c4;</i>时间线</div>
      <div><i class="iconfont">&#xe655;</i>关于</div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    let isShowList = ref(false);
    const store = useStore();
    const router = useRouter();
    let { getIsDay: isDay } = toRefs(store.getters);

    const cateList = reactive(store.getters.getAllCategories);

    // 展示目录列表
    function showList() {
      isShowList.value = isShowList.value ? false : true;
    }

    // 跳转至指定目录下
    function toDetailCate(name) {
      store.commit('setIsShowPersonal');
      router.push({
        path: "/category",
        query: {
          cate: name,
        },
      });
    }

    //跳转至首页
    function toHome() {
      store.commit('setIsShowPersonal');
      router.push({ path: '/' });
    }

    //隐藏个人信息栏
    function hidPersonal() {
      store.commit('setIsShowPersonal');
    }

    return {
      isShowList,
      showList,
      cateList,
      toDetailCate,
      toHome,
      hidPersonal,
      isDay
    };
  },
};
</script>

<style scoped lang="less">
.mask {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 8;
  background-color: rgba(0, 0, 0, 0.65);
}

.personal {
  position: fixed;
  z-index: 1000;
  top: 4.3rem;
  left: 0;
  width: 23rem;
  height: auto;
  overflow-y: scroll;
  border-color: #eaecef;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  padding: 4rem 2rem;

  .personal-info {
    display: block;

    img {
      display: block;
      margin: 4rem auto 1rem;
      height: 8rem;
      width: 8rem;
      border-radius: 50%;
    }

    h3 {
      font-size: 2rem;
      text-align: center;
      margin: 16px 0;
    }

    .num {
      display: flex;
      margin: 0 auto 1rem;
      width: 80%;

      &>div {
        text-align: center;
        flex: 0 0 50%;
      }

      &>div:first-child {
        border-right: solid 1px #000;
      }
    }
  }

  .show-list {
    div {
      font-size: 2.4rem;
      line-height: 5rem;
      margin-left: 2rem;
    }

    i {
      margin-right: 1rem;
    }

    .cate-list {
      list-style: none;

      li {
        line-height: 3rem;
      }
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
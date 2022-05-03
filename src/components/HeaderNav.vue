<template>
  <div class="header-nav">
    <div class="showlist-icon iconfont" v-if="showlist">&#xeaf1;</div>
    <div class="title">MyBlog</div>
    <div class="show-list">
      <div><i class="iconfont">&#xe751;</i>主页</div>
      <div><i class="iconfont">&#xe66b;</i>目录</div>
      <div><i class="iconfont">&#xe8c4;</i>时间线</div>
      <div><i class="iconfont">&#xe655;</i>关于</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let showlist = ref(true);

    return {
      showlist,
    };
  },
};
</script>

<style scoped lang="less">
.header-nav {
  display: flex;
  position: fixed;
  z-index: 10000;
  height: 3.3rem;
  top: 0;
  width: 100vw;
  line-height: 3.3rem;
  overflow: hidden;
  padding: 0 1.2rem;
  border-color: #eaecef;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  .showlist-icon {
    font-size: 2rem;
    cursor: pointer;
  }
  .title {
    font-size: 1.2rem;
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
        color: #111;
        cursor: pointer;
        &:hover {
            color: #3eaf7c;
        }
    }
    i {
        margin: 0 0.3rem;
    }
  }
}
</style>
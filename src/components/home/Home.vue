<template>
  <div class="description">MyBlog</div>
  <div class="content">
    <div class="left">
      <Article />
    </div>
    <div class="right" v-if="!isMobile">
      
    </div>
  </div>
</template>

<script>
import Article from './Article.vue';
import { ref } from 'vue';
export default {
  components: {
    Article
  },
  setup() {
    let isMobile = ref(false);
    return {
      isMobile
    };
  },
};
</script>

<style scoped lang="less">
.description {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: 700;
}
.content {
  display: flex;
  position: absolute;
  top: 88vh;
  box-sizing: border-box;
  padding: 0 1rem;
  width: 100%;
  height: 200px;
  .left {
    flex: 1;
  }
  .right {
    width: 200px;
  }
}
</style>
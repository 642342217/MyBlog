<template>
  <div class="article">
    <div class="title">{{ title }}</div>
    <div class="description">
      <i class="iconfont">&#xe65c;<span> {{title}}</span></i>
      <i class="iconfont">&#xe8c4;<span> {{date}}</span></i>
      <i class="iconfont">&#xe63e;<span> {{category}}</span></i>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue';
export default {
  props: ['title', 'date', 'category'],
  setup(props) {
    const { title, date, category } = toRefs(props);
    console.log(title);
    return {
      title,
      date,
      category
    };
  },
};
</script>

<style scoped lang="less">
.article {
  position: relative;
  width: 100%;
  line-height: 46px;
  font-size: 1.2rem;
  border-color: #eaecef;
  box-sizing: border-box;
  padding: 16px 20px;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
  }
  .title {
    transition: .3s all;
    position: relative;
    font-size: 1.28rem;
    font-weight: 560;
    line-height: 46px;
    display: inline-block;
    &:hover {
      color: #3eaf7c;
    }
  }
  .description {
    i {
      color: #666;
      margin-right: 16px;
    }
  }
}
</style>
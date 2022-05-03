<template>
  <ul class="cate-list">
      <li v-for="cate in cateList" :key="cate.name">{{cate.name}}</li>
  </ul>
</template>

<script>
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();

        const cateList = store.getters.getAllCategories;
        cateList.forEach(item => console.log(item));

        return {
            cateList
        }
    }
}
</script>

<style scoped lang="less">
    .cate-list {
        position: absolute;
        width: 8rem;
        box-sizing: border-box;
        top: 2.3rem;
        left: -1rem;
        font-size: 0.85rem;
        line-height: 0.65rem !important;
        list-style: none;
        border-color: #eaecef;
        background-color: #fff;
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
        &:hover {
            color: black;
        }
        li:hover {
            color: #3eaf7c;
        }
    }
</style>
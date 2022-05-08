<template>
  <div :class="{ 'cate': true, 'day': isDay }" @click="toDetailCate">
    <div class="name">{{name}}</div>
    <div class="number">{{number}}</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { toRefs } from 'vue';
export default {
  props:[
    'name',
    'number'
  ],
  setup(props) {
    const name = props.name;
    const number = props.number;
    const router = useRouter();
    const store = useStore();
    let { getIsDay: isDay } = toRefs(store.getters);

    //导航至该目录下的文章中
    function toDetailCate() {
      router.push({ path: '/category', query: {
        cate: name
      }})
    }

    return {
      name,
      number,
      toDetailCate,
      isDay
    };
  },
};
</script>

<style scoped lang="less">
.cate {
  display: flex;
  line-height: 2.2;
  color: black;
  justify-content: space-between;
  height: 33px;
  margin-bottom: 0.4rem;
  padding: 0.4rem 0.8rem;
  transition: all 0.5s;
  border-radius: 0.25rem;
  border-color: #eaecef;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    transform: scale(1.04);
    color: #3eaf7c;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
  }
}
.day {
  color: white !important;
  background-color: #000 !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 1px 8px 0 #eaecef !important;
}
</style>
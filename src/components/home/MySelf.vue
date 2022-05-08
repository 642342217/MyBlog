<template>
  <div :class="{ 'personal': true, 'day': isDay}">
    <div class="personal-info">
      <img src="src\assets\image\avatar.jpg" alt="author-avatar" />
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
    <h4><i class="iconfont">&#xe66b;</i> Category</h4>
    <Cate
      v-for="item in cates"
      :key="item.name"
      :name="item.name"
      :number="item.number"
    />
  </div>
</template>

<script>
import api from '../../api/index';
import { reactive, onBeforeMount, toRefs } from 'vue';
import { useStore } from 'vuex';
import Cate from "./Cate.vue";
export default {
  components: {
    Cate,
  },
  setup() {
    const cates = reactive([]);
    const store = useStore();
    let { getIsDay: isDay } = toRefs(store.getters);

    // 获取信息
    onBeforeMount(async() => {
      try {
        let res = await api.getAllCategories();
        if (res.status != 200) {
          throw new Error("获取目录失败！");
        }

        res.data.data.forEach((item) => {
          cates.push(item);
        });
      } catch (err) {
        console.log(err, "获取目录失败！");
      }
    });

    return {
      cates,
      isDay
    };
  },
};
</script>

<style scoped lang="less">
.personal {
  display: inline-block;
  position: sticky;
  top: 70px;
  box-sizing: border-box;
  overflow: hidden;
  width: 300px;
  margin-left: 15px;
  padding: 15px 15px;
  border-color: #eaecef;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
  }
  .personal-info {
    display: block;
    img {
      display: block;
      margin: 2rem auto 1rem;
      height: 6rem;
      width: 6rem;
      border-radius: 50%;
    }
    h3 {
      text-align: center;
      margin: 16px 0;
    }
    .num {
      display: flex;
      margin: 0 auto 1rem;
      width: 80%;
      & > div {
        text-align: center;
        flex: 0 0 50%;
      }
      & > div:first-child {
        border-right: solid 1px #000;
      }
    }
  }
  h4 {
    margin: 20px 0;
  }
}
.day {
  color: white !important;
  background-color: #000 !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 1px 8px 0 #eaecef !important;
}
</style>
<template>
  <div :class="{ 'timeline': true, 'day': isDay }">
    <div class="header">文章总览</div>
    <ul class="list time-line">
      <li v-for="listItem in list" :key="listItem.date" class="year">
        {{ listItem.date }}
        <ul class="list">
          <li
            v-for="article in listItem.articlesList"
            :key="article.title"
            class="list-day"
          >
            <div>{{ article.date.slice(5) }}</div>
            <div class="title" @click="() => toDetailArticle(article.title, article.cate)">{{ article.title }}</div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const data = computed(() => {
      return store.getters.getAllArticles;
    });
    let { getIsDay: isDay } = toRefs(store.getters);


    const list = reactive([]);

    // 将数据按年-月-日排序，并且所在年份相同的放进同一个数组
    function selectInfo() {
      //对数据进行分组
      data.value.forEach((dataItem) => {
        let flag = false;
        list.forEach((listItem) => {
          if (listItem.date == dataItem.date.split("-")[0]) {
            listItem.articlesList.push({
              date: dataItem.date,
              cate: dataItem.category,
              title: dataItem.title,
            });
            flag = true;
          }
        });
        if (!flag) {
          list.push({
            date: dataItem.date.split("-")[0],
            articlesList: [],
          });
          list[list.length - 1].articlesList.push({
            date: dataItem.date,
            cate: dataItem.category,
            title: dataItem.title,
          });
        }
      });

      // 使用年份对整体数据进行排序
      list.sort((pre, cur) => {
        let date1 = pre.date.split("-").map((v) => +v)[0];
        let date2 = cur.date.split("-").map((v) => +v)[0];
        return date2 - date1;
      });

      //对每个相同年份下的文章数据进行排序
      list.forEach((listItem) => {
        listItem.articlesList.sort((pre, cur) => {
          //将“2000-1-1”字符串形式转换为数组，并且元素为number类型，然后进行排序比较
          let preDate = pre.date.split("-").map((v) => +v);
          let curDate = cur.date.split("-").map((v) => +v);
          if (preDate[1] > curDate[1]) {
            return -1;
          } else if (preDate[1] < curDate[1]) {
            return 1;
          } else {
            if (preDate[2] > curDate[2]) {
              return -1;
            } else if (preDate[2] < curDate[2]) {
              return 1;
            }
          }
        });
      });
    }

    //跳转至具体文章
    function toDetailArticle(title, cate) {
      router.push({ path: '/article/content', query: {
        title,
        cate
      }});
    }

    selectInfo();

    return {
      list,
      toDetailArticle,
      isDay
    };
  },
};
</script>

<style scoped lang="less">
.timeline {
  position: relative;
  top: 7rem;
  margin: 0 auto;
  width: 70vw;
  box-sizing: border-box;
  padding-left: 2rem;
  padding-top: 1rem;
  border-color: #eaecef;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
  }
}

.header {
  font-size: 1.5rem;
  font-weight: 500;
}

.list {
  margin: 0 0;
  padding: 0 0;
  list-style: none;
  li {
    position: relative;
    margin: 0;
    padding: 0;
  }
}
.time-line {
  margin-top: 2rem;
  padding-left: 2rem;
  border-left: solid 0.4rem #eaecef;
}
.year {
  line-height: 4rem;
  font-size: 1.5rem;
  font-weight: 600;
}
.list-day {
  display: flex;
  font-size: 1rem;
  font-weight: 400;
  line-height: 3rem;
  &:hover {
    color: #3eaf7c;
  }
}
.title {
  cursor: pointer;
  margin-left: 1rem;
}
@media (max-width: 991px) {
    .timeline {
        width: 90vw;
    }
}
</style>
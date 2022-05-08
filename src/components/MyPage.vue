<template>
    <div :class="{ 'page': true, 'day': isDay }">
        <div 
        :class="{ 'page-num': true, 'day': isDay, 'active': curPage === page }" 
        v-for="(page, index) in data" 
        :key="page + index"
            @click="() => toDetailPage(page, index)">{{ page }}</div>
    </div>
</template>

<script>
import { computed, reactive, toRefs, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        let { getCurPage: curPage } = toRefs(store.getters);
        const len = computed(() => Math.ceil(store.getters.getAllArticles.length / 8));
        const data = reactive([]);
        let { getIsDay: isDay } = toRefs(store.getters);

        //滚动到第一个元素的位置
        function toFirstPosition() {
            const item = document.getElementById('index0');
            let positon = item.getBoundingClientRect().top;
            console.log(positon);
            window.scrollBy(0, positon - 100);
        }

        //监听当前页码的变化
        watch([curPage, len], ([newPage]) => {
            if (len.value <= 7) {
                data.length = 0;
                for (let i = 1; i <= len.value; i++) {
                    data.push(i);
                }
                return;
            } else {
                if (newPage >= 4 && newPage <= len.value - 3) {
                    data[1] = '...';
                    data[2] = curPage.value - 1;
                    data[3] = curPage.value;
                    data[4] = curPage.value + 1;
                    data[5] = '...';
                } else if (newPage < 4) {
                    data[1] = 2;
                    data[2] = 3;
                    data[3] = 4;
                    data[4] = '...';
                    data[5] = '...';
                } else {
                    data[1] = '...';
                    data[2] = '...';
                    data[3] = len.value - 3;
                    data[4] = len.value - 2;
                    data[5] = len.value - 1;
                }
                data[0] = 1;
                data[6] = len.value;
            }
        }, { immediate: true });

        //跳转至具体页面
        function toDetailPage(page, index) {
            if(data[index] === '...') {
                return;
            }
            store.commit('setCurPage', page);
            nextTick(toFirstPosition);
        }

        return {
            len,
            data,
            curPage,
            toDetailPage,
            isDay
        }
    }
}
</script>

<style lang="less" scoped>
.page {
    display: flex;
    margin: 0 auto;
    margin-top: 3rem;
    height: 3rem;
    width: 20rem;
    line-height: 3rem;
    text-align: center;

    .page-num {
        cursor: pointer;
        height: 100%;
        width: 2.5rem;
        box-sizing: border-box;
        margin-left: 1rem;
        border-color: #eaecef;
        background-color: #fff;
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
        &:last-child {
            margin-right: 1rem;
        }
    }

    .active {
        background-color: #3eaf7c !important;
        color: white;
    }
}
.day {
  color: white !important;
  background-color: #000 !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 1px 8px 0 #eaecef !important;

}
</style>
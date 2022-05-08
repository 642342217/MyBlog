<template>
    <ul :class="{ 'cate-list': true, 'day': isDay }">
        <li v-for="cate in cateList" :key="cate.name" @click="() => toDetailCate(cate.name)">{{ cate.name }}</li>
    </ul>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, toRefs } from 'vue';
export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        let { getIsDay: isDay } = toRefs(store.getters);

        const cateList = reactive(store.getters.getAllCategories);

        function toDetailCate(name) {
            router.push({
                path: '/category', query: {
                    cate: name
                }
            })
        }

        return {
            cateList,
            toDetailCate,
            isDay
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

.day {
    color: white !important;
    background-color: #000 !important;
    border-color: rgba(0, 0, 0, 0.1) !important;
    box-shadow: 0 1px 8px 0 #eaecef !important;
}
</style>
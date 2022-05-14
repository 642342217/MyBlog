<template>
    <div class="timeline">
        <div class="header">文章总览</div>
        <ul class="list">
            <li v-for="listItem in list" :key="listItem.date">
                {{listItem.date}}
                <ul>
                    <li v-for="article in listItem.articlesList" :key="article.title">{{article.date}}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { watch } from '@vue/runtime-core';
export default {
    setup() {
        const store = useStore();
        const data = computed(() => {
            return store.getters.getAllArticles;
        });

        const list = reactive([]);

        // 将数据按年-月-日排序，并且所在年份相同的放进同一个数组
        function selectInfo() {
            //对数据进行分组
            data.value.forEach((dataItem) => {
                let flag = false;
                list.forEach((listItem) => {
                    if (listItem.date == dataItem.date.split('-')[0]) {
                        listItem.articlesList.push({
                            date: dataItem.date,
                            cate: dataItem.cate,
                            title: dataItem.title,
                        });
                        flag = true;
                    }
                });
                if(!flag) {
                    list.push({
                        date: dataItem.date.split('-')[0],
                        articlesList: []
                    });
                    list[list.length - 1].articlesList.push({
                        date: dataItem.date,
                        cate: dataItem.cate,
                        title: dataItem.title
                    });
                }
            });

            // 使用年份对整体数据进行排序
            list.sort((pre, cur) => {
                let date1 = pre.date.split('-').map(v => +v)[0];
                let date2 = cur.date.split('-').map(v => +v)[0];
                return date2 - date1;
            });

            //对每个相同年份下的文章数据进行排序
            list.forEach(listItem => {
                listItem.articlesList.sort((pre, cur) => {
                    //将“2000-1-1”字符串形式转换为数组，并且元素为number类型
                    let preDate = pre.date.split('-').map(v => +v);
                    let curDate = cur.date.split('-').map(v => +v);
                    if(preDate[1] > curDate[1]) {
                        return -1;
                    } else if(preDate[1] < curDate[1]) {
                        return 1;
                    } else {
                        if(preDate[2] > curDate[2]) {
                            return -1;
                        } else if(preDate[2] < curDate[2]) {
                            return 1
                        }
                    }
                })
            })
        }
        
        selectInfo();

        return {
            list
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
    // background-color: red;
}

.header {
    font-size: 1.5rem;
    font-weight: 400;
}

.list {
    margin: 0 0;
    padding: 0 0;
    list-style: none;
}
</style>
<template>
  <div class="timeline">

  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
    }
}
</script>

<style scoped lang="less">
.timeline {
    margin: 0 auto;
}
</style>
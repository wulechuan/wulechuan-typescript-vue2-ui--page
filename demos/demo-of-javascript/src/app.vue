<template>
    <div id="app" class="page-container">
        <demo-page></demo-page>
    </div>
</template>

<script>
import Vue from 'vue'
import DemoPage from './views/demo-page.vue'
export default {
    components: {
        'demo-page': DemoPage,
    },
}
</script>

<style lang="stylus">
body {
    margin 0
    background-color #999
}
</style>

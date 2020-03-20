<template>
    <div id="app" class="page-container">
        <demo-page></demo-page>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import DemoPage from './views/demo-page.vue'

@Component({
    components: {
        'demo-page': DemoPage,
    },
})
export default class App extends Vue {}
</script>

<style lang="stylus">
body {
    margin 0
    background-color #999
}
</style>

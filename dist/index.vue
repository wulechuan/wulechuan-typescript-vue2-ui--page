<template>
    <div class="page" :class="$pageCSSClassNames">
        <header class="page-header" v-if="$headerFixedAbove">
            <slot name="page-header-content"></slot>
        </header>


        <div class="page-scrollable">
            <header class="page-header" v-if="hasHeader && !$headerFixedAbove">
                <slot name="page-header-content"></slot>
            </header>


            <div class="page-body">
                <div class="before-page-body-content"><slot name="before-page-body-content"></slot></div>
                <main       class="page-body-content"><slot                                ></slot></main>
                <div  class="after-page-body-content"><slot  name="after-page-body-content"></slot></div>
            </div>


            <footer class="page-footer" v-if="hasFooter && !$footerFixedBelow">
                <slot name="page-footer-content"></slot>
            </footer>
        </div>


        <footer class="page-footer" v-if="$footerFixedBelow">
            <slot name="page-footer-content"></slot>
        </footer>
    </div>
</template>





<script source-language-was="ts">
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc)
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return c > 3 && r && Object.defineProperty(target, key, r), r
}
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { checkoutPageContainerElementAncestor, setupPageAncestorElements, restoreAncestorElements, updatePageContainerElementCSSClassNames } from './helpers'
let Page = class Page extends Vue {
    constructor() {
        super(...arguments)
        this.$pageContainerElement = null
    }
    get $headerFixedAbove() {
        return !!(this.hasHeader && this.headerIsFixedAbove)
    }
    get $footerFixedBelow() {
        return !!(this.hasFooter && this.footerIsFixedBelow)
    }
    get $headerCoversBody() {
        return !!(this.hasHeader && this.headerShouldCoverBody)
    }
    get $footerCoversBody() {
        return !!(this.hasFooter && this.footerShouldCoverBody)
    }
    get $heightFitsScreen() {
        const should = !!(this.pageMinHeightShouldFitScreen ||
            this.$headerFixedAbove ||
            this.$footerFixedBelow)
        if (should) {
            checkoutPageContainerElementAncestor(this.$el, this.$pageContainerElement, this.shouldDisablePageContainerAncestorWarning)
        }
        return should
    }
    get $pageCSSClassNames() {
        return {
            'has-page-header': !!this.hasHeader,
            'has-page-footer': !!this.hasFooter,
            'page-header-is-fixed-above': this.$headerFixedAbove,
            'page-footer-is-fixed-below': this.$footerFixedBelow,
            'page-header-should-cover-page-body': this.$headerCoversBody,
            'page-footer-should-cover-page-body': this.$footerCoversBody,
            'page-height-should-fit-screen': this.$heightFitsScreen,
        }
    }
    $onPageHeightModeChanged() {
        updatePageContainerElementCSSClassNames(this.$pageContainerElement, this.$heightFitsScreen)
    }
    mounted() {
        this.$pageContainerElement = this.$el.parentElement
        setupPageAncestorElements(this.$pageContainerElement, this.$heightFitsScreen)
    }
    beforeDestroy() {
        restoreAncestorElements()
    }
}
__decorate([
    Prop(),
], Page.prototype, 'hasHeader', void 0)
__decorate([
    Prop(),
], Page.prototype, 'hasFooter', void 0)
__decorate([
    Prop(),
], Page.prototype, 'headerIsFixedAbove', void 0)
__decorate([
    Prop(),
], Page.prototype, 'footerIsFixedBelow', void 0)
__decorate([
    Prop(),
], Page.prototype, 'headerShouldCoverBody', void 0)
__decorate([
    Prop(),
], Page.prototype, 'footerShouldCoverBody', void 0)
__decorate([
    Prop(),
], Page.prototype, 'pageMinHeightShouldFitScreen', void 0)
__decorate([
    Prop(),
], Page.prototype, 'shouldDisablePageContainerAncestorWarning', void 0)
__decorate([
    Watch('$heightFitsScreen', {}),
], Page.prototype, '$onPageHeightModeChanged', null)
Page = __decorate([
    Component({}),
], Page)
export default Page
</script>





<style source-language-was="stylus">
html.has-page.page-height-should-fit-screen,
html.has-page.page-height-should-fit-screen body,
html.has-page.page-height-should-fit-screen .page-container {
    height: 100%;
}
.page-container {
    box-sizing: border-box;
}
.page {
    --page-has-header: 0;
    --page-has-footer: 0;
    --page-header-decided-height: calc(var(--page-has-header) * var(--page-header-height));
    --page-footer-decided-height: calc(var(--page-has-footer) * var(--page-footer-height));
    position: relative;
    margin: auto;
    box-sizing: border-box;
    overflow: auto;
}
.page .page-header {
    z-index: 30;
}
.page .page-footer {
    z-index: 20;
}
.page .page-body {
    z-index: 10;
}
.page.has-page-header {
    --page-has-header: 1;
}
.page.has-page-footer {
    --page-has-footer: 1;
}
.page .page-scrollable {
    box-sizing: border-box;
    position: relative;
}
.page.page-header-should-cover-page-body,
.page.page-header-should-cover-page-body.page-header-is-fixed-above {
    padding-top: 0;
}
.page.page-header-should-cover-page-body .page-header {
    margin-bottom: calc(-1 * var(--page-header-decided-height));
}
.page.page-header-should-cover-page-body .page-body {
    padding-top: var(--page-header-decided-height);
}
.page.page-header-is-fixed-above {
    padding-top: var(--page-header-decided-height);
}
.page.page-header-is-fixed-above .page-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    margin-bottom: 0;
}
.page.page-footer-should-cover-page-body,
.page.page-footer-should-cover-page-body.page-footer-is-fixed-below {
    padding-bottom: 0;
}
.page.page-footer-should-cover-page-body .page-footer {
    margin-top: calc(-1 * var(--page-footer-decided-height));
}
.page.page-footer-should-cover-page-body .page-body {
    padding-bottom: var(--page-footer-decided-height);
}
.page.page-footer-is-fixed-below {
    padding-bottom: var(--page-footer-decided-height);
}
.page.page-footer-is-fixed-below .page-footer {
    position: absolute;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 0;
}
.page.page-height-should-fit-screen {
    --page-body-min-height-top-shrink-amount: var(--page-header-decided-height);
    --page-body-min-height-bottom-shrink-amount: var(--page-footer-decided-height);
    overflow: hidden;
}
.page.page-height-should-fit-screen,
.page.page-height-should-fit-screen .page-scrollable {
    height: 100%;
}
.page.page-height-should-fit-screen .page-scrollable {
    overflow: auto;
}
.page.page-height-should-fit-screen .page-body {
    min-height: calc(100% - var(--page-body-min-height-top-shrink-amount) - var(--page-body-min-height-bottom-shrink-amount));
}
.page.page-height-should-fit-screen.page-header-is-fixed-above,
.page.page-height-should-fit-screen.page-header-should-cover-page-body {
    --page-body-min-height-top-shrink-amount: 0px;
}
.page.page-height-should-fit-screen.page-footer-is-fixed-below,
.page.page-height-should-fit-screen.page-footer-should-cover-page-body {
    --page-body-min-height-bottom-shrink-amount: 0px;
}
.page-body .before-page-body-content {
    z-index: 5;
}
.page-body .after-page-body-content {
    z-index: 0;
}
.page-body .page-body-content {
    z-index: 10;
}
.page-header,
.page-footer {
    box-sizing: border-box;
    position: relative;
    width: auto;
}
.page-header {
    height: var(--page-header-height);
}
.page-footer {
    height: var(--page-footer-height);
}
.page-body {
    box-sizing: border-box;
    position: relative;
    margin-left: auto;
    margin-right: auto;
}
.before-page-body-content,
.after-page-body-content {
    position: absolute;
    left: 0;
    right: 0;
}
.before-page-body-content {
    top: 0;
    bottom: auto;
}
.after-page-body-content {
    top: auto;
    bottom: 0;
}
.page-body-content {
    box-sizing: content-box;
    position: relative;
}
</style>

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

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { TCSSClassNamesConfig } from './types'

import {
    checkoutPageContainerElementAncestor,
    setupPageAncestorElements,
    restoreAncestorElements,
    updatePageContainerElementCSSClassNames,
} from './helpers'





@Component({})
export default class Page extends Vue {
    @Prop() hasHeader?:                                 boolean;
    @Prop() hasFooter?:                                 boolean;
    @Prop() headerIsFixedAbove?:                        boolean;
    @Prop() footerIsFixedBelow?:                        boolean;
    @Prop() headerShouldCoverBody?:                     boolean;
    @Prop() footerShouldCoverBody?:                     boolean;
    @Prop() pageMinHeightShouldFitScreen?:              boolean;
    @Prop() shouldDisablePageContainerAncestorWarning?: boolean;





    private $pageContainerElement: null | Element = null





    private get $headerFixedAbove(): boolean {
        return !!(this.hasHeader && this.headerIsFixedAbove)
    }

    private get $footerFixedBelow(): boolean {
        return !!(this.hasFooter && this.footerIsFixedBelow)
    }

    private get $headerCoversBody(): boolean {
        return !!(this.hasHeader && this.headerShouldCoverBody)
    }

    private get $footerCoversBody(): boolean {
        return !!(this.hasFooter && this.footerShouldCoverBody)
    }

    private get $heightFitsScreen(): boolean {
        const should = !!(
            this.pageMinHeightShouldFitScreen ||
            this.$headerFixedAbove ||
            this.$footerFixedBelow
        )

        if (should) {
            checkoutPageContainerElementAncestor(
                this.$el,
                this.$pageContainerElement,
                this.shouldDisablePageContainerAncestorWarning
            )
        }

        return should
    }

    private get $pageCSSClassNames(): TCSSClassNamesConfig {
        return {
            'has-page-header':                  !!this.hasHeader,
            'has-page-footer':                  !!this.hasFooter,
            'page-header-is-fixed-above':         this.$headerFixedAbove,
            'page-footer-is-fixed-below':         this.$footerFixedBelow,
            'page-header-should-cover-page-body': this.$headerCoversBody,
            'page-footer-should-cover-page-body': this.$footerCoversBody,
            'page-height-should-fit-screen':      this.$heightFitsScreen,
        }
    }





    @Watch('$heightFitsScreen', {})
    private $onPageHeightModeChanged(): void {
        updatePageContainerElementCSSClassNames(
            this.$pageContainerElement,
            this.$heightFitsScreen
        )
    }





    mounted(): void {
        this.$pageContainerElement = this.$el.parentElement
        setupPageAncestorElements(
            this.$pageContainerElement,
            this.$heightFitsScreen
        )
    }

    beforeDestroy(): void {
        restoreAncestorElements()
    }
}
</script>

<style lang="stylus">
html.has-page.page-height-should-fit-screen {

    &,
    body,
    .page-container {
        height 100%
    }
}





.page-container {
    box-sizing border-box
}





.page {
    --page-has-header 0
    --page-has-footer 0

    --page-header-decided-height calc(var(--page-has-header) * var(--page-header-height))
    --page-footer-decided-height calc(var(--page-has-footer) * var(--page-footer-height))

    position relative
    margin auto
    box-sizing border-box
    overflow auto



    .page-header {
        z-index 30
    }

    .page-footer {
        z-index 20
    }

    .page-body {
        z-index 10
    }



    &.has-page-header {
        --page-has-header 1
    }

    &.has-page-footer {
        --page-has-footer 1
    }





    .page-scrollable {
        box-sizing border-box
        position relative
    }





    &.page-header-should-cover-page-body {

        &,
        &.page-header-is-fixed-above {
            padding-top 0
        }

        .page-header {
            margin-bottom calc(-1 * var(--page-header-decided-height))
        }

        .page-body {
            padding-top             var(--page-header-decided-height)
        }
    }

    &.page-header-is-fixed-above {
        padding-top                 var(--page-header-decided-height)

        .page-header {
            position absolute
            top 0
            left 0
            right 0
            bottom auto
            margin-bottom 0
        }
    }



    &.page-footer-should-cover-page-body {

        &,
        &.page-footer-is-fixed-below {
            padding-bottom 0
        }

        .page-footer {
            margin-top calc(-1 * var(--page-footer-decided-height))
        }

        .page-body {
            padding-bottom       var(--page-footer-decided-height)
        }
    }

    &.page-footer-is-fixed-below {
        padding-bottom           var(--page-footer-decided-height)

        .page-footer {
            position absolute
            top auto
            left 0
            right 0
            bottom 0
            margin-top 0
        }
    }



    &.page-height-should-fit-screen {
        --page-body-min-height-top-shrink-amount    var(--page-header-decided-height)
        --page-body-min-height-bottom-shrink-amount var(--page-footer-decided-height)

        overflow hidden

        &,
        .page-scrollable {
            height 100%
        }

        .page-scrollable {
            overflow auto
        }

        .page-body {
            min-height calc(100% - var(--page-body-min-height-top-shrink-amount) - var(--page-body-min-height-bottom-shrink-amount))
        }

        &.page-header-is-fixed-above,
        &.page-header-should-cover-page-body {
            --page-body-min-height-top-shrink-amount 0px    // 为参与 calc 函数，此处不可以省略 px 单位。
        }

        &.page-footer-is-fixed-below,
        &.page-footer-should-cover-page-body {
            --page-body-min-height-bottom-shrink-amount 0px // 为参与 calc 函数，此处不可以省略 px 单位。
        }
    }
}



.page-body {

    .before-page-body-content {
        z-index 5
    }

    .after-page-body-content {
        z-index 0
    }

    .page-body-content {
        z-index 10
    }
}

.page-header,
.page-footer {
    box-sizing border-box
    position relative
    width auto
}

.page-header {
    height var(--page-header-height)
}

.page-footer {
    height var(--page-footer-height)
}





.page-body {
    box-sizing border-box
    position relative
    margin-left  auto
    margin-right auto
}

.before-page-body-content,
.after-page-body-content {
    position absolute
    left 0
    right 0
}

.before-page-body-content {
    top 0
    bottom auto
}

.after-page-body-content {
    top auto
    bottom 0
}

.page-body-content {
    box-sizing content-box
    position relative
}
</style>

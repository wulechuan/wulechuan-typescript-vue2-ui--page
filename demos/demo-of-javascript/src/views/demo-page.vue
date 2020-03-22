<template>
    <page
        class="my-first-page"
        :has-header="true"
        :has-footer="true"
        :header-is-fixed-above="true"
        :footer-is-fixed-below="false"
        :header-should-cover-body="true"
        :footer-should-cover-body="true"
        :page-min-height-should-fit-screen="false"
    >
        <template #page-header-content>
            <div class="my-page-header-content">
                <h2>此乃页眉之内容</h2>
            </div>
        </template>

        <template #page-footer-content>
            <div class="my-page-footer-content">
                <p>此乃页脚之内容</p>
            </div>
        </template>

        <div class="my-page-content">
            <p>为便于充分展示本组件之多个布局特性，本示例程序<em>有意枉顾美观</em>。见谅。</p>
            <hr>
            <dl>
                <dt>复旦大学中国研究院院长张维为教授在其所著
                    《中国超越：一个文明型国家的光荣与梦想》
                    中写道：</dt>
                <dd>
                    <p>中国人的爱国主义<br>
                        是长江、黄河、珠穆朗玛峰；<br>
                        是《诗经》、《楚辞》、先秦散文；<br>
                        是唐诗、宋词、元曲、明清小说；<br>
                        是屈原、岳飞、文天祥、毛泽东；<br>
                        是普通话、四川话、广东粤语、上海方言；<br>
                        是万里长城、北京故宫、桂林山水、陕西兵马俑；<br>
                        是川菜、粤菜、鲁菜、淮扬菜；<br>
                        是西湖龙井、黄山毛峰、武夷岩茶、洞庭碧螺春；<br>
                        是《梅花三弄》、《高山流水》、《二泉映月》、《春江花月夜》；<br>
                        是四合院、广东骑楼、徽派大院、江南民居；<br>
                        是昆剧、京剧、粤剧、黄梅戏；<br>
                        是南昌起义、平型关大捷、台儿庄血战、抗美援朝；<br>
                        是两弹一星、北斗导航、神舟号飞船、高铁八纵八横；<br>
                        是己所不欲，勿施于人；<br>
                        是四海之内皆兄弟；<br>
                        是胸怀祖国，放眼世界等等等等。</p>
                </dd>
            </dl>
        </div>
    </page>
</template>

<style lang="stylus">
.my-first-page {
    --page-header-height 123px
    --page-footer-height 45px
    --page-header-bg-color-with-backdrop-filter rgba(white, 0.15)

    background-color white

    .page-footer {
        color white
        text-shadow 0 0 3px rgba(black, 0.79)
        background-color rgba(black, 0.75)
    }

    .page-scrollable {
        background-repeat repeat
        background-size cover
        background-position left bottom
        background-image url('../images/china-the-great-wall.jpg')
    }

    .page-body {
        max-width 400px // 故意演示一种可能性而已。
        background-color rgba(gold, 0.3)
    }



    .my-page-header-content,
    .my-page-footer-content {
        height 100%
        display flex
        justify-content center
        align-items center
    }

    .my-page-content {
        height 1900px
        padding 20px
        background-color rgba(white, 0.319)

        dd {
            margin 0
        }
    }
}
</style>

<script>
import Vue from 'vue'
import UIPage from '@wulechuan/vue2-ui--page/dist/index.vue'

export default {
    components: {
        'page': UIPage,
    },
    data: function () {
        return {
        }
    },
}
</script>

# 吴乐川的针对 Vue 2.x 的用户界面组件：可视页，即 Page（支持 TypeScript 语法）

<link rel="stylesheet" href="./node_modules/@wulechuan/css-stylus-markdown-themes/dist/css/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">


## Multilingual Editions of this Article

- [English version of this ReadMe](./ReadMe.en-US.md)




## NPM 页

<dl>
<dt>NPM 包名</dt>
<dd>

[@wulechuan/vue2-ui--page](https://www.npmjs.com/package/@wulechuan/vue2-ui--page)

</dd>
<dt>作者</dt>
<dd><p>南昌吴乐川</p></dd>
</dl>





## 简介

顾名思义，本组件系面向 Vue 2.x 框架制作的一种用户界面（UI）成分（或者说零件）。该零件之功用为轻松构建一个视觉上的所谓“页面”。

本组件认为，一个视觉上的页面由三个重要部分组成：【页眉】（page-header）、【页脚】（page-footer）和【页面主体】（page-body）。本组件同时提供此三个组成部分。并且，【页眉】与【页脚】为可选配件，可通过输入项（即 Vue 组件之所谓 prop）配置二者存在与否。【页面主体】之存在性不可配置，即页面主体恒存在。

本组件可解决一些用程序迎合美术设计思路之痛点。具体而言，常见之页面设计之布局有若干种，每种设计对应的程序实现均有所区别。本工具之设计目的即是**一应俱全**（流行语所谓“提供‘一站式’解决方案”），令采用者单用这一个可配置的“页面”组件，就可灵活应对多种设计要求。本组件所能满足的设计形式不妨列举如下：

- 有否【页眉】。

- 有否【页脚】。

- 【页眉】是否悬挂在页面顶部，不随【页面主体】滚动。

- 【页脚】是否悬挂在页面底部，不随【页面主体】滚动。

- 【页眉】是否总是覆盖【页面主体】。这一设计要求往往为了追求美观，且【页眉】本身会有半透明底色，以使衬于其下的【页面主体】若隐若现。

- 【页脚】是否总是覆盖【页面主体】。这一设计要求往往为了追求美观，且【页脚】本身会有半透明底色，以使衬于其下的【页面主体】若隐若现。

- 是否强制【页面主体】之高度**至少**应充满整个窗口，即 `min-height` 为 `100%`。


又，以上设计要求组合变化，会得到有些复杂的结果。特进一步做如下琐碎之说明：

- 即便【页眉】不悬挂于页面顶部，本组件仍允许将【页眉】配置为“覆盖于【页面主体】之上层”。如是，尽管【页眉】会随【页面主体】而滚动，但【页眉】恒定覆盖【页面主体】之首部。【页眉半透明】，【页面主体】之首部衬于【页眉】下方，若隐若现。

    诚然，如果此时【页面主体】之首部一片空白，则此设计之意义不大，因此，实践中，此种设计往往是在【页面主体】之首部有装饰性的图案。透过半透明的【页眉】，该装饰依稀可见，微妙动人。

- 即便【页脚】不悬挂于页面底部，本组件仍允许将【页脚】配置为“覆盖于【页面主体】之上层”。参见上一条目。

- 为防止覆盖在【页面主体】上层的【页眉】遮挡【页面主体】之正文内容，本组件会自动根据【页眉】之高度，为必要的页面构成 DOM 元素设置准确的 `padding-top`。采用本组件之程序无需担心这些细节。

- 为防止覆盖在【页面主体】上层的【页脚】遮挡【页面主体】之正文内容，本组件会自动根据【页脚】之高度，为必要的页面构成 DOM 元素设置准确的 `padding-bottom`。采用本组件之程序无需担心这些细节。

- 当【页眉】须悬挂于页面顶部时，本组件故意采用 `position: absolute` 而非 `position: fixed`。因此，为确保【页眉】不随【页面主体】滚动，本组件故意要求【页面主体】之外层容器之高度恰好充满整个浏览器窗口，并令【页面主体】按需自动配备滚动条。【页面主体】位于 HTML 层级之较内层，其内容之滚动不至于带动【页眉】，故而达到目的。

- 当【页脚】须悬挂于页眉底部是，本组件故意要求【页眉】之高度恰好充满整个浏览器窗口。此举与上一条目类同。



## 用法

### 基本使用思路说明

鄙人自以为本组件之用法符合直觉。而略显讽刺之处在于，鄙人觉得有必要多费口舌，讲解本品之使用思路。此举看似自相矛盾，实则非也。**符合直觉并非同义于简单。** 欲应对灵活多变之设计要求，本组件之用法亦不得不有繁复、琐碎之处须理解、注意。

目前，本组件之用法思路由 3 部分内容组成：

1.  **核心组件之引用。**

    此部分既包含模板（`<template>`）和逻辑（`<script>`），也包含用于布局的、故而不可或缺的最基础之样式（`<style>`）。**应用好该部分功能，则【页面】大体成形。但某些尺寸尚且未定。**

1.  **所谓“关键但不确定”之样式的运用。**

    这是指一些虽然必不可少，但却**因项目而异**的样式配置。典型的例子是【页眉】之高度、【页脚】之高度。**于此两数值，本组件不便冒然给出所谓默认值，故而有意空缺，留待本组件之外的代码补充给出。** 换而言之，诸君采用本组件时，莫要忘记自行定义这些样式，以获得正确的效果。

    还需指出，于这部分样式之定义、配置，**本组件有推荐做法**。参阅下文《[所谓“关键但不确定”的样式](#%E6%89%80%E8%B0%93%E2%80%9C%E5%85%B3%E9%94%AE%E4%BD%86%E4%B8%8D%E7%A1%AE%E5%AE%9A%E2%80%9D%E7%9A%84%E6%A0%B7%E5%BC%8F)》一节。

1.  **非必须的所谓“额外的样式预设”之运用。**

    这些额外样式视同所谓“预设”，系为达成某些习惯提供方便而已。这些样式亦由本组件附带，可供选用。它们**不**存在于 `.vue` 文件中，而是存在于一些独立的 `.css` 中。这些独立的 `.css` 文件源于一些由本组件提供的 `.styl` 源文件，而这些 `.styl` 文件显然也是独立于 `.vue` 文件的，否则不成其为 `.styl` 文件。



### 开发任务拆解

于开发者而言，使用思路明确之后，还需明白开发的具体任务。众所周知，在基于 Vue 框架的开发过程中，不论你采用 Vue 的【单文件组件】（所谓 Single-filed Component，SFC）与否，开发任务总可以为三个部分：模板部分、脚本逻辑部分和样式部分。下文将分此三个部分，并结合前述使用思路和示例，介绍本组件之用法。


#### 模板（`<template>`）部分

撰写模板的任务，又可进一步细分为三个小任务：

1.  在模板上按需给出 Props。例如 `:has-header="true"`。
1.  将内容插入本组件模板预先设计好的插槽（`slot`）中。
1.  为了令【页眉】悬挂等特定风格的布局正常呈现，须小心配置本组件（即整个视觉页）的【根 `div`】的祖先元素。


##### 模板的 Props

暂略。见下文中的示例。另见下文《[应用编程接口（所谓 API）](#%E5%BA%94%E7%94%A8%E7%BC%96%E7%A8%8B%E6%8E%A5%E5%8F%A3%EF%BC%88%E6%89%80%E8%B0%93-api%EF%BC%89)》一节。


##### 模板插槽

1.  模板包含以下插槽（`slot`）：

    -   默认插槽，被本组件内建的 `div.page-body-content` 所包裹，用于接纳页面主体内容。
    -   名为 `page-header-content` 的插槽，被本组件内建的 `div.page-header` 所包裹。功能不言自明。
    -   名为 `page-footer-content` 的插槽，被本组件内建的 `div.page-footer` 所包裹。功能不言自明。
    -   名为 `before-page-body-content` 的插槽，被本组件内建的 `div.before-page-body-content` 所包裹。功能不言自明。
    -   名为 `after-page-body-content` 的插槽，被本组件内建的 `div.after-page-body-content` 所包裹。功能不言自明。

2.  模板根标签所接纳的属性（attributes），它们对应于组件的输入项（Props）。此处暂略，见下文《[应用编程接口（所谓 API）](#%E5%BA%94%E7%94%A8%E7%BC%96%E7%A8%8B%E6%8E%A5%E5%8F%A3%EF%BC%88%E6%89%80%E8%B0%93-api%EF%BC%89)》一节。

3.  一段较完整的示例代码如下：

    ```html
    <template>
        <page
            class="my-first-page"
            :has-header="true"
            :has-footer="true"
            :header-is-fixed-above="true"
            :footer-is-fixed-below="true"
            :header-should-cover-body="true"
            :footer-should-cover-body="true"
        >
            <template #page-header-content>
                <div class="my-first-page-header-content">
                    <h2>此乃页眉之内容</h2>
                </div>
            </template>

            <template #page-footer-content>
                <div class="my-first-page-footer-content">
                    <p>此乃页脚之内容</p>
                </div>
            </template>

            <div class="my-first-page-body-content">
                <p>为便于充分展示本组件之多个布局特性，本示例程序<em>有意枉顾美观</em>。见谅。</p>
                <hr>
                <dl>
                    <dt>复旦大学中国研究院院长张维为教授在其所著
                        《中国超越：一个文明型国家的光荣与梦想》
                        中写道：</dt>
                    <dd>
                        <p>中国人的爱国主义
                            是长江、黄河、珠穆朗玛峰；
                            是《诗经》、《楚辞》、先秦散文；
                            是唐诗、宋词、元曲、明清小说；
                            是屈原、岳飞、文天祥、毛泽东；
                            是普通话、四川话、广东粤语、上海方言；
                            是万里长城、北京故宫、桂林山水、陕西兵马俑；
                            是川菜、粤菜、鲁菜、淮扬菜；
                            是西湖龙井、黄山毛峰、武夷岩茶、洞庭碧螺春；
                            是《梅花三弄》、《高山流水》、《二泉映月》、《春江花月夜》；
                            是四合院、广东骑楼、徽派大院、江南民居；
                            是昆剧、京剧、粤剧、黄梅戏；
                            是南昌起义、平型关大捷、台儿庄血战、抗美援朝；
                            是两弹一星、北斗导航、神舟号飞船、高铁八纵八横；
                            是己所不欲，勿施于人；
                            是四海之内皆兄弟；
                            是胸怀祖国，放眼世界等等等等。</p>
                    </dd>
                </dl>
            </div>
        </page>
    </template>
    ```

##### 正确配置本组件根元素的祖先元素

为实现诸如【页眉】悬挂于页面顶端的布局设计，本组件的【根 `div` 】须得知 `100%` 之高度具体几何。这显然要求 HTML 层级中自 `<html>` 以来的所有祖先元素均提供准确的 `height` 或 `min-height`。而本组件有意尝试自动配置这类属性，**于是，本组件明确要求，其【根 `div`】的直接父元素须配备 CSS 类名 `.page-container`。**

众所周知，一般的，本组件【根 `div` 】的直接父元素应为 `#app`。而 `#app` 的直接父元素为 `<body>`。针对这种典型配置，本组件确有少量代码直接应对。故诸君唯一要做的是，不厌其烦的为 `#app` 添加一个 CSS 类名——`.page-container`。即有：

```html
<div id="app" class="page-container">
    <!-- 此处省去实际的代码 -->
</div>
```

这样的设计看似繁琐，但私以为是必须的。

当然，类似 Nuxtjs 这样的应用平台，会在 `#app` 之上层额外插入更多的 `div`。此时，这些额外的祖先 `div` 显然超出本组件的掌控范围。换句话说，本组件的关于自动确定祖先元素 `min-height` 之尝试可能恰巧（恰不巧？）失败，无如期效果。**于是失败之情形，本组件无可奈何。** 但本组件会在浏览器控制台（`console`）中打印警告信息，以提示诸君须手工做额外的配置。**而诸君须做的无非是确保 HTML 层级中自 `<html>` 以来的所有祖先元素均提供准确的 `height` 或 `min-height`。** 仅此而已。


---


#### 脚本语言（`<script>`）部分

##### 针对 TypeScript 编程环境的用法示例

> 注意！采用本 Vue 组件之 TypeScript 版本时，`import` 语句的 `from` 须指向 `./source/index.vue`。

```ts
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import UIPage from '@wulechuan/vue2-ui--page/source/index.vue'

@Component({
    components: {
        'page': UIPage,
    },
})
export default class MyFirstPage extends Vue {}
```


##### 针对 JavaScript 编程环境的用法示例

> 注意！采用本 Vue 组件之 JavaScript 版本时，`import` 语句的 `from` 须指向 `./dist/index.vue`。

```js
import Vue from 'vue'
import UIPage from '@wulechuan/vue2-ui--page/dist/index.vue'

export default {
    components: {
        'page': UIPage,
    },
}
```


---


#### 样式（`<style>`）部分

##### 所谓“关键但不确定”的样式

**所谓“关键但不确定”的样式，是指那些运用本组件时必不可少，但本组件却不直接提供，而是要求用户自行确定的样式。** 目前，实则仅涉及 3 个数据：

1.  【页眉】之高度，
2.  【页脚】之高度,
3.  【页面主体】之背景色。

以上数据往往因设计稿而异，故**本组件不便冒然给出所谓默认值**，而是交由采纳本组件之项目自行明确之。

###### 【页眉】与【页脚】之高度

需要格外注意的是，【页眉】之高度和【页脚】之高度是“牵一发而动全身”的。因为本组件在幕后负责自动协调、匹配好多个 HTML 元素的多处尺度。例如，倘若【页眉】覆盖【页面主体】，那么页面主体之最外层元素的 `padding-top` 应与【页眉】之高度吻合。要确保本组件的这些内部设计运转如期，在项目中对【页眉】、【页脚】之高度配置的 CSS 写法也必须遵照如下规则：

-   **避免**直接为 `.page-header` 设置 `height`；
-   **避免**为直接 `.page-footer` 设置 `height`。
-   **应该**在 `.page` 上，设置由本组件设计好两个的 CSS 变量：`--page-header-height` 和 `--page-footer-height`。

> **简而言之，要用 CSS 变量，而不要直接用 `height`。**


以下是错误的做法：

```stylus
// 直接设置 height 是错误的做法！
.page-header {
    height: 123px;
}

// 直接设置 height 是错误的做法！
.page-footer {
    height: 45px;
}
```

以下是正确的做法：

```stylus
// 这是正确的做法。
.my-first-page {
    --page-header-height: 123px;
    --page-footer-height: 45px;
}
```

诸君如果好奇幕后起作用之代码，可参考下方的源代码片段。完整源代码在 `./source/index.vue` 的**样式代码块**中，尊请阅读。

<details>
<summary>展开可查阅源代码片段</summary>

```stylus
.page-header {
    height var(--page-header-height)
}

.page-footer {
    height var(--page-footer-height)
}

.page {
    // 此处省略了很多代码

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

    // 此处省略了很多代码
}
```

</details>


###### 【页面主体】之背景色

页面背景色的配置是自由的，诸君直接给出即可。例如：

```stylus
.my-first-page {
    background-color: white;
}
```

###### 综合示例

综上，一个较完整的正确示例如下：

```stylus
.my-first-page {
    // 以正确之方式配置【页眉】、【页脚】之高度。
    --page-header-height: 123px;
    --page-footer-height: 45px;

    // 自由配置页面之背景色。
    background-color: white;
}
```



##### 锦上添花之样式 1：自由编写

本组件默认不迎合特定的视觉风格或要求，故而默认不包含任何与视觉风格有关的样式规则。诸君可以自由书写锦上添花的样式。

下面是所谓额外样式之示例代码。

```stylus
.my-first-page {

    .page-header {
        color black
    }

    .page-footer {
        color white
        background-color rgba(black, 0.75)
    }

    .my-first-page-header-content,
    .my-first-page-footer-content {
        height 100%
        display flex
        justify-content center
        align-items center
    }
}
```




##### 锦上添花之样式 2：本组件自带的额外样式

为多个项目甚至为同一项目的多个页面反复书写额外样式，未免乏味，甚至令人厌烦。于是，本组件亦附带了两种预设好的 `.css` 文件（共三个），以方便地实现符合本人喜好的样式。诸君若有兴趣，欢迎尝试。

我先逐一介绍这三个 CSS 文件之功用或目的。至于在代码层面如何将这三个 `.css` 文件用于诸君的 Vue 项目中，令其发挥效用，稍后再于《[上述三个额外 CSS 文件的使用方法](#%E4%B8%8A%E8%BF%B0%E4%B8%89%E4%B8%AA%E9%A2%9D%E5%A4%96-css-%E6%96%87%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)》一节统一介绍。



###### 第 1 个自带的额外 CSS 文件之功用

第 1 个自带的额外 CSS 文件是`./dist/default-shadings.css`。


该 CSS 达到的目的（或者说提供的效果）其实很简单，归纳起来有两点：

1.  如果【页眉】被配置为“覆盖于【页面主体】之上层”，则给【页眉】添加流行的“毛玻璃”（一说“亚克力”）视觉效果，如此或许更加美观。【页脚】亦作类同处理。

    > 幕后的具体做法也很简单：如果浏览器支持 `backdrop-filter: blur(1rem)`，则采用之；否则，不采用。

1.  给【页眉】和【页脚】设置背景色。

    > 同样是令【页眉】或【页脚】具有半透明效果，取决于“毛玻璃”视觉效果应用与否，【页眉】或【页脚】的背景色之透明度也大相径庭。具体而言，一旦应用了“毛玻璃”效果，则背景透明度应较高，背景色的 `alpha` 通道取值不应高于 `0.6`，往往越低越好，即越透明越好；反之。遵循此原则，可令【页眉】、【页脚】之半透明效果悦目、舒适。

正因为上述琐碎细节，看似简单的“给【页眉】、【页脚】设置半透明背景色和特效”的任务，本组件用到了多达 6 个 css 变量。它们的定义如下：

```stylus
.page {
    --page-header-backdrop-filter blur(1rem)
    --page-footer-backdrop-filter blur(1rem)

    --page-header-bg-color-with-backdrop-filter    rgba(black, 0)
    --page-header-bg-color-without-backdrop-filter rgba(black, 0)

    --page-footer-bg-color-with-backdrop-filter    rgba(white, 0.79)
    --page-footer-bg-color-without-backdrop-filter rgba(white, 0.79)
}
```

诚然，你可以故意避免采用这 6 个 CSS 变量，改为直接为 `.page-header`、`.page-footer` 设置 `background-color` 和 `backdrop-filter`。而采用上述 6 个 CSS 变量之微弱的好处是，幕后所涉及的 CSS 代码会确保毛玻璃效果仅在有必要时才得到采用，且总是自动据此选用对应的背景色方案。仅此而已。

顺便指出，如果你不喜欢“毛玻璃”效果，或设计师坚持避免采用该类视觉效果，仅需如下代码即可禁用之：

```stylus
.page {
    --page-header-backdrop-filter: none;
    --page-footer-backdrop-filter: none;
}
```


###### 第 2 个自带的额外 CSS 文件之功用

第 2 个自带的额外 CSS 文件是`./dist/default-extra-measurements.css`。

该 CSS 文件达到的目的也很简单：

1.  为 `.page-header` 和 `.page-footer` 分别定高。
2.  为所谓“**页面内容块**”在水平方向配置统一的 `padding`，即 `padding-left` 和 `padding-right`。
3.  为 `.page-body-content` 配置较美观、实用的垂直方向的 `padding`，即其 `padding-top` 和 `padding-bottom`。


其源代码很短，遂全文抄录于此：

<details>
<summary>展开可查阅源代码全文</summary>

```stylus
.page {
    --page-header-height 5rem // 默认值而已
    --page-footer-height 3rem // 默认值而已

    // 所谓 page-contents 包括
    //     .page-header、
    //     .page-footer 和
    //     .page-body-content
    // 三者。
    --page-contents-horizontal-padding 2rem
}



.page-header,
.page-footer,
.page-body-content {
    padding-left  var(--page-contents-horizontal-padding, 1rem)
    padding-right var(--page-contents-horizontal-padding, 1rem)
}



.page-body-content {
    padding-top    1rem
    padding-bottom 5rem // 本人在此鼓吹，饱满的 padding-bottom 可改善阅读体验。
}
```

</details>




###### 第 3 个自带的额外 CSS 文件之功用

第 3 个自带的额外 CSS 文件是`./dist/default-extra-measurements-for-small-screen.css`。

该 CSS 文件借助 `@import` 语句导入了前述 `./dist/default-extra-measurements.css` 之内容。换言之，该 CSS 系在前者基础上做额外增补。故而，如果采用该 CSS，则不必采用 `./dist/default-extra-measurements.css`。**简而言之，二者取其一即可。**

该 CSS 增补之功能有些古怪，或许仅适合鄙人。具体如下：

1.  令页面的父容器，即 `.page-container` 拥有 `padding`。
2.  同时，令页面本身，即 `.page`，拥有最大宽度（`max-width`）。如此，当页面的布局面向较小的浏览器窗口做优化时，一旦令页面在较宽阔的浏览器（例如微软 Windows 平台的浏览器）上呈现时，布局不至于过分丑陋，或完全错乱，而是较好的保持其在窄小浏览器上的布局风貌。
3.  在浏览器尺寸较大而 `.page` 本身较窄小时，给 `.page` 添加了一点微妙的 `box-shadow`，以期更加美观。


###### 上述三个额外 CSS 文件的使用方法

在了解了上述三个 CSS 文件之目的或作用之后，我介绍一下它们在诸君 Vue 项目中的正确用法。

凡 Vue 项目，均配备 `main.js` 或 `main.ts`。诸君之 Vue 项目也不例外。为方便指代，不妨暂称其为“main 文件”。欲采用前述三个 CSS 文件之任一，即应在“main 文件”的首部引入此 CSS 文件。见下例：

```js
import '@wulechuan/vue2-ui--page/dist/default-shadings.css'
import '@wulechuan/vue2-ui--page/dist/default-extra-measurements-for-small-screen.css'

import Vue from 'vue'
import App from './app.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
```

> 须注意，我推荐令导入 css 之 `import` 语句位于“main 文件”之**最顶端**。此举可确保这些 CSS 之代码**早于**各 `.vue` 文件中书写的样式被纳入诸君项目最终编译得到的汇总 `.css` 文件中。


---


### 可运转的完整示例项目

本代码库自带的可运转的示例项目：

-   《[demos/demo-of-typescript](./demos/demo-of-typescript/)》。
-   《[demos/demo-of-javascript](./demos/demo-of-javascript/)》。




---


## 应用编程接口（所谓 API）

### 输入项（即 Vue 组件的 Props）

本人自信以下各 Props 之功用均不言自明。另，目前所有输入项之值类型均恰巧为布尔（boolean），且**所有输入项之默认值均为 `false`。**

#### 小驼峰（camelCase）记法

```ts
@Prop() hasHeader?:                                 boolean;
@Prop() hasFooter?:                                 boolean;
@Prop() headerIsFixedAbove?:                        boolean;
@Prop() footerIsFixedBelow?:                        boolean;
@Prop() headerShouldCoverBody?:                     boolean;
@Prop() footerShouldCoverBody?:                     boolean;
@Prop() pageMinHeightShouldFitScreen?:              boolean;
@Prop() shouldDisablePageContainerAncestorWarning?: boolean;
```

#### 葫芦串（所谓 kebab）记法

```html
<page
    :has-header="true"
    :has-footer="true"
    :header-is-fixed-above="true"
    :footer-is-fixed-below="false"
    :header-should-cover-body="true"
    :footer-should-cover-body="true"
    :page-min-height-should-fit-screen="false"
    :should-disable-page-container-ancestor-warning="false"
></page>
```



### Vue 组件插槽（即 `slot`）

-   默认插槽，被本组件内建的 `div.page-body-content` 所包裹，用于接纳页面主体内容。
-   名为 `page-header-content` 的插槽，被本组件内建的 `div.page-header` 所包裹。功能不言自明。
-   名为 `page-footer-content` 的插槽，被本组件内建的 `div.page-footer` 所包裹。功能不言自明。
-   名为 `before-page-body-content` 的插槽，被本组件内建的 `div.before-page-body-content` 所包裹。功能不言自明。
-   名为 `after-page-body-content` 的插槽，被本组件内建的 `div.after-page-body-content` 所包裹。功能不言自明。


### 必须正确配置的 CSS 类名

**注意！不论本组件【根 `div` 】的直接父元素是否为 `#app`，诸君总是必须为该直接父元素添加一个 CSS 类名——`.page-container`。** 即有：

```html
<div class="page-container">
    <page ...></page>
</div>
```




### 层叠样式表自定义变量

#### 必须正确配置的变量

以下 CSS 变量在 HTML 层级中全部源于 `.page`：

-   `--page-header-height`
-   `--page-footer-height`


#### 于额外 CSS 文件中设计的 CSS 变量

以下 CSS 变量在 HTML 层级中全部源于 `.page`：

-   `--page-header-backdrop-filter`
-   `--page-footer-backdrop-filter`
-   `--page-header-bg-color-with-backdrop-filter`
-   `--page-header-bg-color-without-backdrop-filter`
-   `--page-footer-bg-color-with-backdrop-filter`
-   `--page-footer-bg-color-without-backdrop-filter`
-   `--page-contents-horizontal-padding`



---

## 未来计划

暂无。


---

## 许可证类型

WTFPL

> 注意：
>
> 我未研究过许可证的约束。因此姑且声明为 WTFPL 类型。但实际上该许可证类型可能与我采用的开源模块有冲突。




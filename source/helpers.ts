export function checkoutPageContainerElementAncestor(
    pageRootElement: Element,
    pageContainerElement: Element | null,
    shouldDisableWarning?: boolean
): void {
    if (!pageContainerElement) { return }

    const layoutMightHaveIssue: boolean = pageContainerElement.parentElement !== document.body

    if (layoutMightHaveIssue && !shouldDisableWarning) {
        console.warn(
            '\nThis element below:\n\n', pageContainerElement, '\n\nacts as the ".page-container".',
            '\nBut its direct parentElement is NOT document.body.',
            '\nThus there might be an issue to achieve a layout with',
            '\neither .page-header or .page-footer or both hanging',
            '\nIf the issue does occur, you need to carefully setup',
            '\nthe CSS "display", "position", "height" and "min-height"',
            '\nof all ancestor elements of this element:\n',
            pageRootElement,
            '\n----------\nTo disable this warning,',
            '\nfind this instance of the Page component,',
            '\nand set its Prop of "disable-page-container-ancestor-warning"',
            '\nto', false, '.\n\n'
        )

        console.log('')

        console.warn(
            '\n下述元素：\n\n', pageContainerElement, '\n\n系作“.page-container”之用。',
            '\n然其直接父元素（parentElement）并非 document.body。',
            '\n于斯，构建令“页眉（.page-header）”、“页脚（.page-footer）”悬挂不动',
            '\n的页面布局或不能如期。倘若布局之效果确不如期，则你须找到如下元素：\n',
            pageRootElement,
            '\n并仔细配置其所有祖先元素的这些 CSS 属性：',
            '\n"display"、"position"、"height" 和 "min-height"。',
            '\n\n----------\n欲保持现状并禁止本警告信息之出现，',
            '\n可找到 Page 组件的相关实例，并将其名为',
            '\n“disable-page-container-ancestor-warning” 之 Prop',
            '\n配置为', false, '。\n\n'
        )
    }
}





export function setupPageAncestorElements(
    pageContainerElement: Element | null,
    pageMinHeightShouldFitScreen?: boolean
): void {
    if (!pageContainerElement) {
        console.error('Page has not mounted, thus the "pageContainerElement" is null.')
        return
    }

    const cssClassNameToCheck = 'page-container'

    if (!pageContainerElement.classList.contains(cssClassNameToCheck)) {
        console.error(
            'The direct parentElement of a Page, which is\n',
            pageContainerElement,
            `\nmust have the CSS class name "${cssClassNameToCheck}".`
        )
    }

    document.documentElement.classList.add('has-page')

    updatePageContainerElementCSSClassNames(
        pageContainerElement,
        pageMinHeightShouldFitScreen
    )
}





export function restoreAncestorElements(): void {
    const htmlElementClassList = document.documentElement.classList
    htmlElementClassList.remove('has-page')
    htmlElementClassList.remove('page-height-should-fit-screen')
}





export function updatePageContainerElementCSSClassNames(
    pageContainerElement: Element | null,
    pageMinHeightShouldFitScreen?: boolean
): void {
    if (!pageContainerElement) { return }

    ;[
        document.documentElement,
        pageContainerElement,
    ].forEach(elment => {
        elment.classList.toggle(
            'page-height-should-fit-screen',
            !!pageMinHeightShouldFitScreen
        )
    })
}

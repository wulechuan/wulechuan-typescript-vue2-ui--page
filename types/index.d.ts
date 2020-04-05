/// <reference types="vue" />

declare module '@wulechuan/vue2-ui--page' {
    export type TCSSClassNamesConfig = null | string | Array<string> | {
        [cssClassName: string]: boolean | undefined;
    };

    export default class Page extends Vue {
        public hasHeader?:                                 boolean;
        public hasFooter?:                                 boolean;
        public headerIsFixedAbove?:                        boolean;
        public footerIsFixedBelow?:                        boolean;
        public headerShouldCoverBody?:                     boolean;
        public footerShouldCoverBody?:                     boolean;
        public pageMinHeightShouldFitScreen?:              boolean;
        public shouldDisablePageContainerAncestorWarning?: boolean;

        private $pageContainerElement:                     null | Element;

        private $headerFixedAbove:        () => boolean;
        private $footerFixedBelow:        () => boolean;
        private $headerCoversBody:        () => boolean;
        private $footerCoversBody:        () => boolean;
        private $heightFitsScreen:        () => boolean;
        private $pageCSSClassNames:       () => TCSSClassNamesConfig;
        private $onPageHeightModeChanged: () => void;
    }
}

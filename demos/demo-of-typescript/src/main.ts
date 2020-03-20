import '@wulechuan/vue2-ui--page/dist/default-shadings.css'
import '@wulechuan/vue2-ui--page/dist/default-extra-measurements-for-small-screen.css'

import Vue from 'vue'
import App from './app.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#vue2-app-placeholder')

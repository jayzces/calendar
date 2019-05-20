import Vue from 'vue'
import App from './app.vue'

Vue.config.productionTip = false

new Vue({
    render: function (createElement) {
        return createElement(App);
    }
}).$mount('#app')
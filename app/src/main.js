import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局样式表：
import './assets/css/global.css'

// 在阿里矢量图标库中下载图标：https://www.iconfont.cn/?spm=a313x.7781069.1998910419.d4d0a486a
// 导入图标样式：
import './assets/icons/font_x4mkpstsel/iconfont.css'

// 配置axios：
import axios from 'axios'

// 挂在全局对象：
Vue.prototype.$http = axios
// 设置axios访问的url根路径：
axios.defaults.baseURL = 'http://175.27.228.178:3434/api/private/v1/'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

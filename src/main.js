import Vue from 'vue'
import App from './App.vue'
// 引入路由配置信息
import router from '@/router'
// 引入全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'
// 引入仓库
import store from '@/store/index'

// 引入mock模拟数据
import '@/mock/mockServer'
// 引入swiper的css文件
import 'swiper/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css'
// 引入请求接口函数
import * as API from '@/api'

// 注册全局组件
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)
Vue.component(Button.name, Button)
Vue.prototype.$API = API
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册全局事件总线,请求接口
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  // 注册路由信息
  router,
  // 注册仓库
  store
}).$mount('#app')

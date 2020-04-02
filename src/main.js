// 入口文件
console.log('ok')

// 导入 Vue 包
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)
// 导入 App 组件
import app from './App.vue'

// 2.1 导入 vue-resource 
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)

// 按需导入 mint-ui组件
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 1.3 导入自己的 router.js 路由模块
import router from './router.js'

// 导入 MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router // 1.4 将路由模块挂载到vm实例上

})
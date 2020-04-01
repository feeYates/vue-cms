// 入口文件
console.log('ok')

// 导入 Vue 包
import Vue from 'vue'

// 导入 App 组件
import app from './App.vue'

// 按需导入 mint-ui组件
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)

// 导入 MUI 样式
import './lib/mui/css/mui.min.css'

var vm = new Vue({
  el: '#app',
  data: {},
  methods: {},
  render: c => c(app)
})
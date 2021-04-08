import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// fastClick库 可以减少移动端300ms点击延迟
FastClick.attach(document.body)

// 图片懒加载（用的时候在加载）
//图片需要显示在屏幕上时，再加载图片（有些公司做，有些公司不做）
Vue.use(VueLazyLoad)
//使用懒加载后，设置图片的src都得换成v-lazy
// 修改src  img   :src=""->v-lazy=""

//图片懒加载还可以设置占位符（loading）
// Vue.use(VueLazyLoad,{
//   loading:require('./assets/img/common/placeholder.png')
// })

Vue.config.productionTip = false

Vue.use(toast)

//事件总线
Vue.prototype.$bus = new Vue()


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

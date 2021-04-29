import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/all'
  }, {
    path: '/:filter',
    name: 'Filter',
    component: App
  }]
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h('router-view')
}).$mount('#app')

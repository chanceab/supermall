import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import store from './store'
import toast from 'components/common/toast'

Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);
Vue.use(toast);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

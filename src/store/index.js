import Vue from 'vue';
import Vuex from 'vuex';

// 导入
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

// 安装
Vue.use(Vuex);
const state = {cartList: []}
// 创建 Store 对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

// 挂载在Vue实例上
export default store

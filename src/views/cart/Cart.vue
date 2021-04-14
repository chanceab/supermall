<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <scroll class="content">
      <cart-list/>
    </scroll>
    <cart-button-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import Scroll from 'components/common/scroll/Scroll'
  import CartList from './childComps/CartList'

  import CartButtonBar from "./childComps/CartButtonBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,

      Scroll,
      CartList,

      CartButtonBar,
    },
    computed: {
      // 将Vuex中getters方法直接转换为计算属性
      // ...mapGetters(['cartLength'])  数组语法

      // 如果想自定义名字                 对象语法
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    color: #ffffff;
    background-color: var(--color-tint);
  }

  .content {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>

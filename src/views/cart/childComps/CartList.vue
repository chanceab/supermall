<template>
  <div class="cart_list">
    <div v-for="(item, index) in cartList">
      <cart-list-item :item="item" :key="index"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    components: {
      CartListItem,
    },
    computed: {
      ...mapGetters(['cartList'])
    }
  }
</script>

<style scoped>

</style>

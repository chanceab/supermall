export default {
  // 计算购物车数据长度
  cartLength(state) {
    return state.cartList.length
  },

  // 返回购物车商品列表
  cartList(state) {
    return state.cartList
  },
}

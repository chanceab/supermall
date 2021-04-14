export default {
  // mutations 中每个方法完成的事情尽可能单一
  addCounter(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}

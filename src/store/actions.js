export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 判断商品是否重复
      let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item;
      //     break;
      //   }
      // }
      // 判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct);
        resolve('数量添加成功');
      } else {
        payload.count = 1
        // context.state.cartList.push(payload);
        context.commit('addToCart', payload);
        resolve('添加商品成功');
      }
    })
  }
}

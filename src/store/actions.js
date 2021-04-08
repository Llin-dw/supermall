import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve,reject) => {
      // state.cartList.push(payload)
      //  1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //  2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
      }
      resolve('已添加到购物车')
    })
  },
  deleteAllItem(context) {
    context.state.cartList = [];
  },
  deleteOne(context, productId) {
    context.state.cartList = context.state.cartList
      .filter(item => item.iid != productId)
  }
}

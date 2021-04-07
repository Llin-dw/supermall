import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  //里面有很多方法 里面的每一个方法尽可能完成的事情比较单一一点
  // 尽可能只做一件事情
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}

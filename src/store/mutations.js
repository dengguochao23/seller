import * as types from './mutation-types'
const mutation = {
  [types.SET_SHOPCARTFOODS] (state, list) {
    state.shopCartFoods = list
  }
}

export default mutation

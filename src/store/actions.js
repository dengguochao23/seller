import * as types from './mutation-types'
export const selectFoodsList = function ({ commit, state }, list) {
  commit(types.SET_SHOPCARTFOODS, list)
}

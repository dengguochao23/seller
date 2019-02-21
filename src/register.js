import HeaderDetail from 'components/header-detail/header-detail.vue'
import ShopCartList from 'components/shop-cart-list/shop-cart-list.vue'
import ShopCartSticky from 'components/shop-cart-sticky/shop-cart-sticky.vue'
import Food from 'components/food/food.vue'
import Login from 'components/login/login.vue'
import Order from 'components/order/order.vue'
import Remarks from 'components/remarks/remarks.vue'
import { createAPI } from 'cube-ui'
import Vue from 'vue'

createAPI(Vue, HeaderDetail)
createAPI(Vue, ShopCartList)
createAPI(Vue, ShopCartSticky)
createAPI(Vue, Food)
createAPI(Vue, Login)
createAPI(Vue, Order)
createAPI(Vue, Remarks)

<template>
  <div class="shop-cart-sticky" v-show="visible">
    <shop-cart
      ref="shopCart"
      :selectFoods="selectFoods"
      :deliveryPrice="deliveryPrice"
      :minPrice="minPrice"
      :flod="flod"
      :sticky=true
    >
    </shop-cart>
  </div>
</template>

<script type="text/ecmascript-6">
import ShopCart from 'components/shop-cart/shop-cart'
import popupMixins from 'common/mixins/popup'
export default {
  name: 'shop-cart-sticky',
  mixins: [popupMixins],
  props: {
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    },
    minPrice: {
      type: Number,
      default() {
        return 20
      }
    },
    deliveryPrice: {
      type: Number,
      default() {
        return 20
      }
    },
    flod: {
      type: Boolean,
      default: false
    },
    list: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    drop(el) {
      this.$refs.shopCart.drop(el)
    }
  },
  components: {
    ShopCart
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .shop-cart-sticky
    position: absolute
    left: 0
    bottom: 0
    z-index: 999
    width: 100%
    height: 48px
</style>

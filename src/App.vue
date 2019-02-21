<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tap-wrapper">
      <tab :tabs="tabs" :initialIndex=0></tab>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import VHeader from 'components/v-header/v-header.vue'
import Tab from 'components/tab/tab.vue'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
import qs from 'query-string'
import { getSeller } from 'api'

export default {
  data () {
    return {
      seller: {
        id: qs.parse(location.search).id
      }
    }
  },
  computed: {
    tabs() {
      return [
        {
          label: '商品',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: '评论',
          component: Ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: '商家',
          component: Seller,
          data: {
            seller: this.seller
          }
        }
      ]
    }
  },
  created () {
    this._getSeller()
  },
  methods: {
    _getSeller () {
      getSeller({
        id: this.seller.id
      }).then((seller) => {
        this.seller = seller
      })
    }
  },
  components: {
    Tab,
    VHeader
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .tap-wrapper
    position: fixed
    top: 136px
    left: 0
    right: 0
    bottom: 0
</style>

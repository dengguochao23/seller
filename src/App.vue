<template>
  <div id="app">
    <v-header :seller="seller" @showPie="showPie"></v-header>
    <div class="tap-wrapper">
      <tab :tabs="tabs" :initialIndex=0></tab>
    </div>
    <pie ref="pie" :data="hotGoods"></pie>
  </div>
</template>

<script type="text/ecmascript-6">
import VHeader from 'components/v-header/v-header.vue'
import Tab from 'components/tab/tab.vue'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
import Pie from 'components/pie/pie.vue'
import qs from 'query-string'
import { getSeller, getGoods } from 'api'

export default {
  data () {
    return {
      seller: {
        id: qs.parse(location.search).id
      },
      hotGoods: []
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
    this._getGoods()
  },
  methods: {
    showPie () {
      this.$refs.pie.show()
    },
    _getSeller () {
      getSeller({
        id: this.seller.id
      }).then((seller) => {
        this.seller = seller
      })
    },
    _getGoods () {
      getGoods({
        id: this.seller.id
      }).then((good) => {
        this.hotGoods = this._normalHotGoods(good[0].foods)
        console.log(this.hotGoods)
      })
    },
    _normalHotGoods(goods) {
      let ret = []
      goods.forEach((good) => {
        ret.push({
          value: good.sellCount,
          name: good.name
        })
      })
      return ret.slice(0, 5)
    }
  },
  components: {
    Pie,
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

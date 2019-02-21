<template>
  <div class="order" v-if="visible">
    <div class="order-head">
      <div class="order-back" @click="hide">
        <i class="icon-arrow_lift"></i>
      </div>
      <h1 class="head-title">确认订单</h1>
    </div>
    <div class="scroll">
      <cube-scroll :options="sellerScrollOptions">
        <div class="order-container">
          <div class="top">
            <div class="top-wrapper">
              <p class="top-left">送达时间</p>
              <p class="top-right" @click="selectTime">{{timer}}</p>
            </div>
            <div class="top-wrapper">
              <p class="top-left">支付方式</p>
              <p class="top-right" @click="selectPay">{{pay}}</p>
            </div>
          </div>
          <div class="mid">
            <p class="mid-shop-name border-bottom-1px">东莞市国贸中心</p>
            <div class="shop-cart-list" v-for="(food,index) in shopCartFoods" :key="index">
              <img width="50px" height="50px"
                   :src="food.image"
                   alt="">
              <div class="name">{{food.name}}</div>
              <div class="count">{{food.count}}个</div>
              <div class="amount">￥{{food.count * food.price}}</div>
            </div>
            <div class="freight">
              <p class="icon">商家</p>
              <p class="fee">配送费</p>
              <p class="pay">￥0</p>
            </div>
            <div class="red-envelope">
              <p class="name">红包</p>
              <p class="amount">￥0元</p>
            </div>
            <div class="total-pay">
              <p class="name">优惠说明</p>
              <p class="amount">小计 ￥0元</p>
            </div>
          </div>
          <div class="bottom">
            <div class="table-ware" @click.stop="selectCount">
              <p class="name">餐具份量</p>
              <p class="value">{{count}}</p>
            </div>
            <div class="remarks" @click="selectRemarks">
              <p class="name" v-if="remark.length===0">订单备注</p>
              <p class="value" v-if="remark.length===0" >口味、偏好></p>
              <div class="remark-handle" v-else>
                <p class="text">{{remarkHandle}}</p>
                <p class="icon">></p>
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
    <div class="order-foot">
      <p class="amount">￥{{totalPrice}}</p>
      <div class="btn">去支付</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import PopupMixins from 'common/mixins/popup'
import { mapGetters } from 'vuex'
export default {
  name: 'order',
  mixins: [PopupMixins],
  data() {
    return {
      sellerScrollOptions: {
        directionLockThreshold: 0,
        click: true
      },
      timer: '请选择时间',
      pay: '请选择支付方式',
      count: '未选择>',
      remark: [],
      payArray: [{ text: '在线支付', value: '在线支付' }, { text: '货到付款', value: '货到付款' }, { text: '微信', value: '微信' }, { text: '支付宝', value: '支付宝' }],
      pickerArray: [{ text: '0', value: '0' }, { text: '1', value: '1' }, { text: '2', value: '2' }, { text: '3', value: '3' }, { text: '4', value: '4' }]
    }
  },
  computed: {
    remarkHandle () {
      return this.remark.join('，')
    },
    totalPrice() {
      let total = 0
      this.shopCartFoods.forEach((food) => {
        if (food.count) {
          total += food.count * food.price
        }
      })
      return total
    },
    ...mapGetters([
      'shopCartFoods'
    ])
  },
  methods: {
    selectTime() {
      this._showTimePicker()
    },
    selectPay() {
      this._showPayPicker()
    },
    selectCount() {
      this._showCountPicker()
    },
    selectRemarks() {
      this._showRemarks()
    },
    // createAPI的插件管理
    _showTimePicker() {
      this.$createTimePicker({
        showNow: false,
        minuteStep: 5,
        max: +new Date() + (3 * 24) * 60 * 60 * 1000, // 时间最大范围
        delay: 30, // 30分钟之后
        onSelect: (selectedTime, selectedText) => {
          this.timer = `尽快送达（${selectedText}）`
        }
      }).show()
    },
    _showPayPicker() {
      const column = this.payArray
      this.$createPicker({
        title: '支付方式',
        data: [column],
        onSelect: (selectedVal) => {
          this.pay = selectedVal[0]
        }
      }).show()
    },
    _showCountPicker() {
      const column = this.pickerArray
      this.$createPicker({
        title: '餐具数量',
        data: [column],
        onSelect: (selectedVal) => {
          this.count = selectedVal[0]
        }
      }).show()
    },
    _showRemarks() {
      this.showRemarksComp = this.showRemarksComp || this.$createRemarks({
          $events: {
            submit: (val) => {
              this.remark = []
              val.forEach((v) => {
                this.remark.push(v)
              })
            }
          }
        })
      this.showRemarksComp.show()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin.styl"
  .order
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 100%
    height: 100%
    background: -webkit-linear-gradient($color-blue, $color-white) /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient($color-blue, $color-white) /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient($color-blue, $color-white) /* Firefox 3.6 - 15 */
    background: linear-gradient($color-blue, $color-white) /* 标准的语法 */
    .order-head
      position: relative
      height: 55px
      line-height: 55px
      font-size: $fontsize-large-xx
      color: $color-white
      overflow: hidden
      .order-back
        height: 55px
        display: flex
        padding-left: 10px
        align-items: center
        border-color: red
      .head-title
        position: absolute
        top: 0
        left: 50%
        max-width: 50%
        font-weight: 700
        transform: translateX(-50%)
    .scroll
      position: absolute
      top: 55px
      bottom: 55px
      width: 100%
      .order-container
        display: flex
        background: -webkit-linear-gradient($color-blue, #EEEEEE) /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient($color-blue, #EEEEEE) /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient($color-blue, #EEEEEE) /* Firefox 3.6 - 15 */
        background: linear-gradient($color-blue, #EEEEEE) /* 标准的语法 */
        justify-content: center
        flex-direction: column
        align-items: center
        .top
          width: 95%
          background-color: $color-white
          .top-wrapper
            display: flex
            flex-direction: row
            justify-content: space-between
            padding: 20px 15px 20px 15px
            .top-left, .top-right
              font-size: $fontsize-large
            .top-right
              color: cornflowerblue
        .mid
          width: 95%
          background-color: $color-white
          display: flex
          flex-direction: column
          margin-top: 20px
          .mid-shop-name
            padding: 20px 15px 20px 15px
            font-size: $fontsize-large-xx
            font-weight: 700
          .shop-cart-list
            padding: 20px 15px 20px 15px
            display: flex
            .name
              margin: 0px 15px 0 10px
              flex: 1
            .count
              flex: 1
          .freight
            display: flex
            padding: 20px 15px 20px 15px
            justify-content: space-between
            .icon
              background-color: red
              padding: 2px
              color: $color-white
            .fee
              padding-left: 20px
              flex: 1
          .red-envelope
            display: flex
            padding: 20px 15px 20px 15px
            justify-content: space-between
          .total-pay
            display: flex
            padding: 20px 15px 20px 15px
            justify-content: space-between
        .bottom
          width: 95%
          background-color: $color-white
          display: flex
          flex-direction: column
          margin-top: 20px
          .table-ware
            display: flex
            padding: 20px 15px 20px 15px
            justify-content: space-between
            .value
              color: $color-grey
          .remarks
            display: flex
            padding: 20px 15px 20px 15px
            justify-content: space-between
            .value
              color: $color-grey
            .remark-handle
              width: 100%
              display: flex
              justify-content: space-between
              .text
                flex: 1
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
              .icon
                padding: 0
                font-size: $fontsize-large-xx
    .order-foot
      position: fixed
      bottom: 0
      left: 0
      height: 55px
      display: flex
      width: 100%
      line-height: 55px
      font-size: $fontsize-large-xxx
      color: $color-white
      overflow: hidden
      z-index: 10
      .amount
        background-color: $color-background
        flex: 1
        padding-left: 10px
      .btn
        background-color: $color-green
        flex: 0.4
        text-align: center
</style>

<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num">
            <bubble :num="totalCount"></bubble>
          </div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" @click.stop="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="(ball,index) in balls" :key="index">
        <transition
          @before-enter="beforeDrop"
          @enter="droping"
          @after-enter="afterDrop"
        >
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Bubble from '../bubble/bubble.vue'
import { mapActions } from 'vuex'
import { loadFromLogin } from 'common/js/storage'
const BALL_LEN = 10 // 设置球子的数量
const innerClsHook = 'inner-hook'
function createBalls() {
  let balls = []
  for (let i = 0; i < BALL_LEN; i++) {
    balls.push({
      show: false
    })
  }
  return balls
}

export default {
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
    // 监看shop-cart-list的显示隐藏
    flod: {
      type: Boolean,
      default: false
    },
    // 监看sticky的显示隐藏，而且在sticky组件中这一直为ture
    sticky: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      balls: createBalls(),
      listFlod: this.flod
    }
  },
  created() {
    this.dropBalls = []
  },
  computed: {
    // 数据处理
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.count
      })
      return total
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.minPrice > this.totalPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (this.totalPrice === 0 || this.minPrice > this.totalPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  methods: {
    // 用来存放小球并设置成true,这是设计动画的第一步
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop(el) {
      const ball = this.dropBalls[this.dropBalls.length - 1] // 拿到dropBall最后那个球，就是要动画的那个球
      const rect = ball.el.getBoundingClientRect()
      const x = rect.left - 32 // 32是最下角图片那个图片，距离最左边的距离为32，用来计算出 X轴的长度
      const y = -(window.innerHeight - 22 - rect.top)
      el.style.display = ''
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
      const inner = el.getElementsByClassName(innerClsHook)[0]
      inner.style.transform = inner.webkitTransform = `translate3d(${x}px,0,0)`
    },
    droping(el, done) {
      this._reflow = document.body.offsetHeight // 重新计算浏览器高度
      el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
      const inner = el.getElementsByClassName(innerClsHook)[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
      el.addEventListener('transitionend', done)
    },
    afterDrop(el) {
      const ball = this.dropBalls.shift() // 目的是小球回收,拿到第一个小球
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    // 支付
    pay(e) {
      let foods = this.selectFoods.slice()
      if (this.totalPrice < this.minPrice) {
        return
      }
      if (this.handleLogin()) {
        this._showOrder = this.$createOrder({
          $events: {
            hide: () => {
              this._hideLogin()
            }
          }
        }).show()
      } else {
        this.$createDialog({
          type: 'confirm',
          content: `您需要支付${this.totalPrice}元`,
          onConfirm: () => {
            this._showLoginDialog()
          }
        }).show()
      }
      this.selectFoodsList(foods)
      e.stopPropagation()
    },
    // 处理用户是否已经登录了
    handleLogin() {
      let login = loadFromLogin()
      let loginName = Object.keys(login)
      let newName = loginName.pop()
      if (login[newName]) {
        return true
      } else {
        return false
      }
    },
    // 显示隐藏
    toggleList() {
      if (!this.listFlod) {
        if (!this.totalCount) {
          return
        }
        this.listFlod = true
        this._showShopCartList()
        this._showShopCartSticky()
      } else {
        this.listFlod = false
        this._hideShopCartList()
      }
    },
    _showShopCartList() {
      this.showShopCartListComp = this.showShopCartListComp || this.$createShopCartList({
          $props: {
            selectFoods: 'selectFoods'
          },
          $events: {
            hide: () => {
              this.listFlod = false
            },
            leave: () => {
              this._hideShopCartSticky() // 利用list动画结束来隐藏sticky
            },
            add: (el) => {
              this.showShopCartSticyComp.drop(el)
            }
          }
        })
      this.showShopCartListComp.show()
    },
    _showShopCartSticky() {
      this.showShopCartSticyComp = this.showShopCartSticyComp || this.$createShopCartSticky({
          $props: {
            selectFoods: 'selectFoods',
            minPrice: 'minPrice',
            deliveryPrice: 'deliveryPrice',
            flod: 'listFlod',
            list: this.showShopCartListComp // 把list的实例存入sticky中来让list的父节点隐藏，父节点就是sticky，而list并不是存在于原始shop-cart中。
          }
        })
      this.showShopCartSticyComp.show()
    },
    _showLoginDialog() {
      this.$createDialog({
        type: 'confirm',
        title: '发现你未登陆',
        content: '你现在就能登录了',
        confirmBtn: {
          text: '登录',
          active: true,
          disabled: false
        },
        onConfirm: () => {
          this._showLogin()
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false
        }
      }).show()
    },
    _showLogin() {
      this.showLoginComp = this.showLoginComp || this.$createLogin()
      this.showLoginComp.show()
    },
    _hideShopCartList() {
      const comp = this.sticky ? this.$parent.list : this.showShopCartListComp // sticky的隐藏和list的隐藏
      comp.hide && comp.hide()
    },
    _hideShopCartSticky() {
      this.showShopCartSticyComp.hide()
    },
    _hideLogin() {
      this._showOrder.remove()
    },
    ...mapActions([
      'selectFoodsList'
    ])
  },
  // watch的关键是一开始shop-cart只初始化一次listFold，而每次listFlod的数据并不是传给原shop-cart，所以就要主动去设置listFlod的值。
  watch: {
    flod(newVal) {
      this.listFlod = newVal // 最难是这里的，这个的目的是避免点击toggleList多次生成list.
    },
    totalCount(newVal) {
      if (this.flod && newVal === 0) {
        this._hideShopCartList()
      }
    }
  },
  components: {
    Bubble
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .shopcart
    height: 100%
    .content
      display: flex
      background: $color-background
      font-size: 0
      color: $color-light-grey
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: $color-background
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: $color-dark-grey
            &.highlight
              background: $color-blue
            .icon-shopping_cart
              line-height: 44px
              font-size: $fontsize-large-xxx
              color: $color-light-grey
              &.highlight
                color: $color-white
          .num
            position: absolute
            top: 0
            right: 0
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-weight: 700
          font-size: $fontsize-large
          &.highlight
            color: $color-white
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: $fontsize-small-s
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-weight: 700
          font-size: $fontsize-small
          &.not-enough
            background: $color-dark-grey
          &.enough
            background: $color-green
            color: $color-white
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.6s cubic-bezier(0.275, -0.32, 0.885, 0.175)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: $color-blue
          transition: all 0.6s linear
</style>

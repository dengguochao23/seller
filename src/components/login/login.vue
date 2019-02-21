<template>
  <transition name="login">
    <div class="login" v-if="visible">
      <div class="login-head">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="login-content">
        <div class="login-img">
          <img :src="require('./logo.png')" alt="">
        </div>
        <div class="login-input">
          <cube-input
            class="login-name"
            v-model="nameValue"
            :placeholder="phoneText"
            :type='typeNumber'
            :autofocus="autofocus"
            :eye="eye"
            @blur="onBlur"
          ></cube-input>
          <cube-input
            v-model="passValue"
            class="login-password"
            :placeholder="passwodd"
            :type='typePassword'
            :autofocus="autofocus"
          ></cube-input>
          <p class="input-text">新用户登录即自动注册，并表示已同意《用户服务协议》</p>
          <cube-button type="submit" @click="subLogin">登录</cube-button>
        </div>
      </div>
      <prompt-box ref="prompt" :placeholder="promptText"></prompt-box>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import PromptBox from 'components/prompt-box/prompt-box'
import popupMixins from 'common/mixins/popup'
import { saveToLogin } from 'common/js/storage'
const NAME_MAX_LENGTH = 11
export default {
  name: 'login',
  mixins: [popupMixins],
  data() {
    return {
      nameValue: '',
      passValue: '',
      phoneText: '手机号码',
      passwodd: '密码',
      autofocus: true,
      typeNumber: 'number',
      typePassword: 'password',
      eye: {
        open: true,
        reverse: false
      },
      promptText: '',
      isSuccess: false // 用于验证通过，并成功登陆
    }
  },
  methods: {
    onBlur() {
      this.checkName()
    },
    // 缓存用来记录用户名
    subLogin() {
      this.checkPassWord()
      if (!this.isSuccess) {
        return
      }
      saveToLogin(this.nameValue, this.isSuccess)
      this.isSuccess = !this.isSuccess
      this._showOrder()
    },
    // 验证
    checkName() {
      this.promptText = ''
      let nameLength = this.nameValue.length
      if (nameLength !== NAME_MAX_LENGTH) {
        this.$refs.prompt.show()
        this.promptText = '请输入正确手机号码'
      }
    },
    checkPassWord() {
      const password = /^q1w2e3r4$/
      if (password.test(this.passValue)) {
        this.isSuccess = true
      } else {
        this.$refs.prompt.show()
        this.promptText = '密码不正确'
      }
    },
    // createAPI
    _showOrder() {
      this.showOrderComp = this.showOrderComp || this.$createOrder({
          $events: {
            hide: () => {
              this.showOrderComp.remove()
            }
          }
        })
      this.showOrderComp.show()
      this.hide()
    }
  },
  components: {
    PromptBox
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin.styl"
  .login
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    width: 100%
    background-color: $color-white
    &.login-enter-active, &.login-leave-active
      transition: all 0.3s
    &.login-enter, &.login-leave-to
      transform: translate3d(-100% px, 0, 0)
    .login-head
      position: relative
      height: 35px
      .back
        padding: 10px 10px
    .login-content
      padding: 50px 20px 0 20px
      .login-img
        text-align: center
      .login-input
        margin-top: 20px

  .login-password
    margin: 15px 0 10px 0

  .input-text
    white-space: normal
    line-height: 20px
    margin-bottom: 25px
    font-size: $fontsize-medium

</style>

<template>
  <div class="remark" v-show="visible">
    <div class="remark-head">
      <div class="remark-back">
        <i class="icon-arrow_lift"></i>
      </div>
      <h1 class="head-title">订单备注</h1>
    </div>
    <div class="remark-container">
      <div class="textarea">
        <cube-textarea :autoExpand="true" v-model="textValue" :placeholder="placeholder"></cube-textarea>
      </div>
      <div class="checker">
        <checker :data="checkers" @checked="handleChecker"></checker>
      </div>
    </div>
    <div class="btn">
      <cube-button @click="submit">提交</cube-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Checker from 'components/checker/checker'
import popupMixins from 'common/mixins/popup'
const EVENT_SUBMIT = 'submit'
export default {
  name: 'remarks',
  mixins: [popupMixins],
  data() {
    return {
      checkers: ['不要辣', '不要香菜', '不要洋葱', '多点醋', '多点葱'],
      textValue: '',
      checkValue: [],
      placeholder: '请填写额外对餐厅和骑手小哥备注的信息'
    }
  },
  methods: {
    handleChecker(val) {
      this.checkValue = []
      if (val.length > 0) {
        val.forEach((v) => {
          this.checkValue.push(v)
        })
      }
    },
    submit() {
      if (this.textValue.length > 0) {
        this.checkValue.push(this.textValue)
      }
      this.$emit(EVENT_SUBMIT, this.checkValue)
      this.visible = false
    }
  },
  components: {
    Checker
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .remark
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    height: 100%
    width: 100%
    background-color: #EEEEEE
    .remark-head
      position: relative
      height: 55px
      line-height: 55px
      font-size: $fontsize-large-xx
      background-color: $color-blue
      color: $color-white
      .remark-back
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

    .remark-container
      margin: 10px 0 20px 0
      padding: 15px
      background-color: $color-white
      .textarea
        margin-bottom: 15px
    .btn
      width: 90%
      margin: 0 auto
</style>

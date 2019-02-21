<template>
  <transition name="prompt">
    <div class="box" v-show="visible">
      <p>{{placeholder}}</p>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import popupMixins from 'common/mixins/popup'
export default {
  mixins: [popupMixins],
  props: {
    placeholder: {
      type: String,
      default() {
        return ''
      }
    }
  },
  watch: {
    visible(newVal) {
      clearTimeout(this.timer)
      if (newVal) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, 3000)
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin.styl"
  .box
    padding: 5px 15px 5px 15px
    position: fixed
    left: 50%
    bottom: 80px
    border-radius: 7.5px
    color: $color-white
    transform: translateX(-50%)
    background-color: $color-background-ss
    white-space: nowrap
    &.prompt-enter-active, &.prompt-leave-active
      transition: all 0.8s
    &.prompt-enter, &.prompt-leave-to
      opacity: 0
</style>

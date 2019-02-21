<template>
  <div class="split"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'split'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .split
    width: 100%
    height: 16px
    border-top: 1px solid $color-row-line
    border-bottom: 1px solid $color-row-line
    background: $color-background-ssss
</style>

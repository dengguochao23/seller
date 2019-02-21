<template>
  <div class="checker">
    <div class="checker-item" v-for="(item,index) in data" :key="index" @click="select(item,index)"
         :class="isActive(index)"
    >
      <p class="checker-text">{{item}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const EVENT_CHECKED = 'checked'
export default {
  data() {
    return {
      checkerIndex: [],
      checkerVal: []
    }
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {},
  methods: {
    select(item, index) {
      let current = this.checkerIndex.indexOf(index - 1)
      if (current > -1) {
        this.checkerIndex.splice(current, 1)
        this.checkerVal.splice(current, 1)
      } else {
        this.checkerIndex.push(index - 1)
        this.checkerVal.push(item)
      }
      this.$emit(EVENT_CHECKED, this.checkerVal)
    },
    isActive(index) {
      if (this.checkerIndex.indexOf(index - 1) > -1) {
        return 'active'
      } else {
        return ''
      }
    }
  },
  watch: {}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .checker
    display: flex
    flex-wrap: wrap
    .checker-item
      padding: 10px 8px 10px 8px
      border: 1px solid #EEEEEE
      margin: 0px 8px 8px 0px
      border-radius: 10%
      &.active
        background-color: $color-blue
        color: $color-white
        border-color: $color-blue
      .checker-text
        font-size: 14px
</style>

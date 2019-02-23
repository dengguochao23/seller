<template>
  <cube-popup
    :mask-closable='true'
    @click="hide"
    @mask-click="hide"
    ref="pie"
  >
    <div class="pie">
      <div class="pie-container" ref="echart"></div>
    </div>
  </cube-popup>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      hotName: this._normalHotName(this.data)
    }
  },
  props: {
    data: {
      type: Array
    }
  },
  methods: {
    show() {
      this.$refs.pie.show()
      this._xinit()
    },
    hide() {
      this.$refs.pie.hide()
    },
    _xinit() {
      var echarts = require('echarts')
      require('echarts/lib/chart/pie')
      require('echarts/lib/component/tooltip')
      require('echarts/lib/component/title')
      var myEchart = echarts.init(this.$refs.echart)
      setTimeout(() => {
        myEchart.setOption({
          title: {
            text: '热门食物',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: `售卖份数{c}`
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            padding: [40, 20],
            data: this._normalHotName(this.data)
          },
          series: [{
            name: '销量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            // data: [{ value: 335, name: '直接访问' }, { value: 310, name: '邮件营销' }, { value: 234, name: '联盟广告' }, { value: 135, name: '视频广告' }, { value: 1548, name: '搜索引擎' }],
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        })
      }, 50)
    },
    _normalHotName(hotNames) {
      let ret = []
      hotNames.forEach((name) => {
        ret.push(name.name)
      })
      return ret
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .pie
    position: relative
    width: 100%
    height: 100%
    background-color: white
    .pie-container
      width: 330px
      height: 600px
</style>

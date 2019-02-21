const ALL = 2
export default {
  data() {
    return {
      selectType: ALL,
      onlyContent: false
    }
  },
  computed: {
    computedRatings() {
      let ret = []
      this.ratings.forEach((rating) => {
        if (this.onlyContent || !rating.text) {
          return
        }
        if (this.selectType === ALL || rating.rateType === this.selectType) {
          ret.push(rating)
        }
      })
      return ret
    }
  },
  methods: {
    onSelect(num) {
      this.selectType = num
    },
    onToggle() {
      this.onlyContent = !this.onlyContent
    }
  }
}

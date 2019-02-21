const EVEND_HIDE = 'hide'
const EVEND_SHOW = 'show'

export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
      this.$emit(EVEND_SHOW)
    },
    hide() {
      this.visible = false
      this.$emit(EVEND_HIDE)
    }
  }
}

import Notification from './index.vue'

export default {
  extends: Notification,
  data () {
    return {
      verticalOffset: 50,
      timer: null,
      duration: 3000,
      visible: false
    }
  },
  computed: {
    style () {
      return {
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.createTimer()
  },
  methods: {
    createTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.duration)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    // afterEnter () {
    //   console.log('afterEnter func-notification.vue')
    // },
    beforeDestroy () {
      // TODO 未执行
      console.log('beforeDestroy')
      this.clearTimer()
    },
    mouseenter () {
      this.clearTimer()
    },
    mouseleave () {
      this.createTimer()
    }
  }
}

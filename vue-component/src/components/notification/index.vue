<template>
  <transition
    name="fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div
      class="notification"
      :style="style"
      v-show="visible"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <span>{{content}}</span>
      <a class="btn" @click="handleClose">{{btn}}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: 'close'
    }
  },
  data () {
    return {
      visible: false,
      height: 0
    }
  },
  computed: {
    style () {
      return null
    }
  },
  methods: {
    afterEnter () {
      console.log('afterEnter index.vue')
      this.height = this.$el.offsetHeight
      console.log('height index.vue:', this.height)
    },
    afterLeave () {
      console.log('afterLeave index.vue')
      this.$emit('closed')
    },
    handleClose (e) {
      e.preventDefault()
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.notification {
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px;
  min-width: 280px;
  background-color: #303030;
  color: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, .2), 0px 6px 10px 0px rgba(0, 0, 0, .3);
  transition: all .3s;
}
.notification .content {
  padding: 0;
}
.notification .btn {
  color: #ff4081;
  padding-left: 24px;
  margin-left: auto;
  cursor: pointer;
}
</style>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <Notification content="hello vue" /> -->

    <button @click="notify">notify</button>
    <h1>https://juejin.im/post/5d0e3f8f51882531c71d08c8</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      timer: null,
      duration: 3
    }
  },
  methods: {
    notify () {
      let vm
      if (vm) {
        vm.close()
        return
      }
      vm = this.$notify({
        content: `${this.duration}s close`,
        duration: 5000
      })
      this.countDown()
    },
    countDown () {
      // this.timer = setTimeout(() => {
      //   if (this.duration > 0) {
      //     this.duration--
      //     console.log(this.duration)
      //     this.countDown()
      //   } else {
      //     clearTimeout(this.timer)
      //     this.duration = 5
      //   }
      // }, 1000)

      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setInterval(() => {
        if (this.duration > 0) {
          this.duration -= 1
          console.log(this.duration)
        } else {
          clearTimeout(this.timer)
          this.duration = 3
        }
      }, 1000)
    }
  }
}
</script>

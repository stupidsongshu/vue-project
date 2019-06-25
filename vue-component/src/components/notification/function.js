import Vue from 'vue'
import component from './func-notification'

const NotificationConstructor = Vue.extend(component)

let instances = []
let seed = 0

const removeInstance = (instance) => {
  if (!instance) return
  const index = instances.findIndex(item => item.id === instance.id)
  instances.splice(index, 1)

  const len = instances.length
  // if (len <= 1) return
  for (let i = index; i < len; i++) {
    const ins = instances[i]
    ins.vm.verticalOffset -= (parseFloat(instance.height) + 16)
  }
}

const notify = options => {
  const {
    duration,
    ...rest
  } = options

  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data () {
      return {
        duration: duration === undefined ? 3000 : duration
      }
    }
  })
  // console.log(instance)

  instance.vm = instance.$mount()
  // console.log(instance.vm)
  instance.vm.visible = true
  document.body.appendChild(instance.vm.$el)

  instance.id = `notification_${seed++}`
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += parseFloat(item.vm.$el.offsetHeight) + 16
  })
  verticalOffset += 16
  console.log('height function:', verticalOffset)
  instance.vm.verticalOffset = verticalOffset
  instances.push(instance)
  console.log(instances)

  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    // 移除DOM元素
    document.body.removeChild(instance.vm.$el)
    // 解除事件绑定
    instance.vm.$destroy()
  })

  instance.vm.close = function () {
    this.$emit('close')
  }

  return instance.vm
}

export default notify

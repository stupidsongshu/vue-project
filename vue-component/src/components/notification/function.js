import Vue from 'vue'
import component from './func-notification'

const NotificationConstructor = Vue.extend(component)

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

  instance.vm = instance.$mount()
  instance.vm.visible = true
  document.body.appendChild(instance.vm.$el)

  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  instance.vm.$on('closed', () => {
    // 移除DOM元素
    document.body.removeChild(instance.vm.$el)
    // 解除事件绑定
    instance.vm.$destroy()
  })

  return instance.vm
}

export default notify

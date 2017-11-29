<template>
  <div>
    <div>{{countProp}} {{countAlias}} {{countPlusLocalState}}</div>
    <el-button type="primary" @click="add1">add1</el-button>
    <el-button type="primary" @click="add2">add2</el-button>

    <el-button-group>
      <el-button type="primary" @click="increment1">+5 mutation</el-button>
      <el-button type="primary" @click="increment2">+5 mutation</el-button>
      <el-button type="primary" @click="increment3">+5 action sync</el-button>
      <el-button type="primary" @click="increment4">+10 action async</el-button>
      <el-button type="primary" @click="decrement">-</el-button>

      <el-button type="primary" @click="incrementSync">mapActions sync</el-button>
      <el-button type="primary" @click="incrementAsync">mapActions async</el-button>
    </el-button-group>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        localCount: 1
      }
    },
    // computed: mapState({
    //   countProp: state => state.count,
    //   // 传字符串参数 'count' 等同于 `state => state.count`
    //   countAlias: 'count',
    //   // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    //   countPlusLocalState(state) {
    //     return state.count + this.localCount
    //   }
    // }),
    computed: {
      localComputed() {},
      // mapState 函数返回的是一个对象,可以使用对象展开运算符将此对象混入到外部对象中,与局部计算属性混合使用
      ...mapState({
        countProp: state => state.count,
        // 传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'count',
        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState(state) {
          return state.count + this.localCount
        }
      })
    },
    methods: {
      add1() {
        this.$store.state.count++
      },
      add2() {
        this.$store.commit('incrementTest')
      },
      increment1() {
        // 可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload），在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
        this.$store.commit('incrementTest', {step: 5})
        console.log(this.$store.getters.doneTodos)
      },
      increment2() {
        // 提交 mutation 的另一种方式是直接使用包含 type 属性的对象，当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数
        this.$store.commit({
          type: 'incrementTest',
          step: 5
        })
        console.log(this.$store.getters.doneTodos)
      },
      increment3() {
        // 以载荷形式分发
        this.$store.dispatch('incrementSync', {step: 5})
      },
      increment4() {
        // 以对象形式分发
        this.$store.dispatch({
          type: 'incrementAsync',
          step: 10
        }).then(() => {
          console.log('promise success')
        })
      },
      decrement() {
        this.$store.commit('decrementTest')
      },
      ...mapActions([
        'incrementAsync',
        'incrementSync'
      ])
    }
  }
</script>

<style>

</style>

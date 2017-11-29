<template>
  <div>
    <h4>内置过度动画</h4>
    <el-button @click="show = !show">click me</el-button>
    <div>
      <transition name="el-fade-in-linear">
        <div v-show="show" class="transition-box">.el-fade-in-linear</div>
      </transition>
      <transition name="el-fade-in">
        <div v-show="show" class="transition-box">.el-fade-in</div>
      </transition>

      <transition name="el-zoom-in-center">
        <div v-show="show" class="transition-box">.el-zoom-in-center</div>
      </transition>
      <transition name="el-zoom-in-top">
        <div v-show="show" class="transition-box">.el-zoom-in-top</div>
      </transition>
      <transition name="el-zoom-in-bottom">
        <div v-show="show" class="transition-box">.el-zoom-in-bottom</div>
      </transition>

      <el-collapse-transition>
        <div v-show="show">
          <div class="transition-box">.el-collapse-transition</div>
          <div class="transition-box">.el-collapse-transition</div>
          <div class="transition-box">.el-collapse-transition</div>
        </div>
      </el-collapse-transition>

      <div style="clear: both;"></div>
    </div>


    <h4>layout布局</h4>
    <h5>基础布局</h5>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>

    <h5>分栏间隔</h5>
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>

    <h5>混合布局</h5>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>

    <h5>分栏偏移</h5>
    <el-row :gutter="20">
      <el-col :span="6" :offset="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6" :offset="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>

    <h5>对齐方式</h5>
    <el-row type="flex">
      <el-col :span="6">
        <div class="grid-content bg-purple">1</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">2</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">3</div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>

    <h5>响应式布局xs<768 sm>=768 md>=992 lg>=1200 xl>=1920</h5>
    <el-row>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="hidden-xs-only">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>


    <h5>Button按钮</h5>
    <el-button @click="getAxios">btn</el-button>
    <el-button type="primary" plain @click="postAxios">btn</el-button>
    <el-button type="success" round @click="readjson">btn</el-button>
    <el-button type="info">btn</el-button>
    <el-button type="warning" disabled>btn</el-button>
    <el-button type="danger" autofocus>btn</el-button>
    <el-button type="text">btn</el-button>
    <el-button type="primary" icon="el-icon-edit">btn</el-button>
    <el-button type="primary">btn<i class="el-icon-upload el-icon--right"></i></el-button>

    <el-button-group>
      <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
      <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="grid-content bg-purple-light">{{countComputedFn}}</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <counter-component></counter-component>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-dark">{{mapStateProp}}</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">{{vuexGetter}}</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">{{doneLength}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light">{{doneTodos}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple" @click="todo = getTodoById(1)">todoId:1</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple" @click="todo = getTodoById(2)">todoId:2</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple" @click="todo = getTodoById(3)">todoId:3</div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple-light">{{todo}}</div>
      </el-col>
    </el-row>

    <el-button type="primary" :loading="true" size="mini">加载中</el-button>

    <input type="text" v-model="todoId" @keyup.enter="todo = getTodoByIdTest(todoId)" placeholder="请输入查询todoId(1/2/3)">

    <span>{{doneLengthAlias}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapState, mapGetters, mapMutations} from 'vuex'

  const Counter = {
    template: '<span>{{counter}}</span>',
    computed: {
      counter() {
        return this.$store.state.count
      }
    }
  }

  export default {
    data() {
      return {
        show: true,
        todoId: null,
        todo: null
      }
    },
    methods: {
      getAxios() {
        axios.get('http://api.map.baidu.com/telematics/v3/weather', {
          params: {
            location: '上海',
            output: 'json',
            ak: '5slgyqGDENN7Sy7pw29IUvrZ'
          }
        }).then(res => {
          console.log('success')
          console.log(res)
        }, error => {
          console.log('error')
          console.log(error)
        })
      },
      postAxios() {
        axios.get('http://gc.ditu.aliyun.com/regeocoding', {
          params: {
            l: '39.938133,116.395739',
            type: '001'
          }
        }).then(res => {
          console.log('success')
          console.log(res)
        }, error => {
          console.log('error')
          console.log(error)
        })
      },
      readjson() {
        axios.get('static/b.json').then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error)
        })

//        axios.get('./../assets/a.json').then(res => {
//          console.log(res)
//        }).catch(error => {
//          console.log(error)
//        })
      },
      getTodoByIdTest(id) {
        return this.$store.getters.getTodoById(id)
      },
      ...mapMutations([
        'incrementTest',
        'decrementTest'
      ])
    },
    computed: {
      countComputedFn() {
        return this.$store.state.count
      },
      vuexGetter() {
        return this.$store.getters.doneLength
      },
//      对象展开运算符，将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性
      ...mapState({
        mapStateProp(state) {
          return state.count
        }
      }),
//      mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
      ...mapGetters([
        'doneLength',
        'doneTodos',
        'getTodoById'
      ]),
      ...mapGetters({
        // 如果你想将一个 getter 属性另取一个名字，使用对象形式
        doneLengthAlias: 'doneLength'
      })
    },
    components: {
      'counterComponent': Counter
    }
  }
</script>

<style>
  .transition-box {
    float: left;
    width: 160px;
    height: 50px;
    margin-right: 10px;
    margin-bottom: 10px;
    line-height: 50px;
    border-radius: 4px;
    text-align: center;
    background-color: #409EFF;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
  }

  .bg-purple {
    background-color: #d3dce6;
  }

  .bg-purple-dark {
    background-color: #99a9bf;
  }

  .bg-purple-light {
    background-color: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
  }

  .el-col {

  }

  .el-row {
    margin-bottom: 20px;

  }
</style>

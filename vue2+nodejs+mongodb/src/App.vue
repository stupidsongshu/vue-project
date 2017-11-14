<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view class="main"/>
    <router-view class="left" name="title"></router-view>
    <router-view class="right" name="image"></router-view>

    <div>
      <button @click="getRequest">get请求</button>
      <button @click="postRequest">post请求</button>
      <button @click="jsonpRequest">jsonp请求</button>
      <button @click="httpRequest">http请求</button>
    </div>

    <div>
      {{data}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        data: ''
      }
    },
    methods: {
      getRequest() {
        this.$http.get('http://www.imooc.com/course/AjaxCourseMembers?ids=796', {
          params: {
            id: '123456'
          },
          headers: {
            Authorization: 'Bearer 123'
          }
        }).then(res => {
          this.data = res.data;
        }, error => {
          this.data = error;
        });
      },
      postRequest() {
        this.$http.post('video/videoId=1024',
          {
            userId: 1024,
            name: 'zys'
          },
          {
            headers: {
              access_token: 'hello world'
            }
          }).then(res => {
          this.data = res.data;
        }, error => {
          this.data = error;
        });
      },
      jsonpRequest() {
        this.$http.jsonp('package.json', {
          params: {
            id: 1
          },
          headers: {
            token: '123456'
          }
        }).then(res => {
          this.data = res.data;
        }, error => {
          this.data = error;
        });
      },
      httpRequest() {
        this.$http({
          url: 'package.json',
          params: {
            userId: 1024,
            name: 'zys'
          },
          headers: {
            token: 'This is token'
          },
          timeout: 50,
          before() {
            console.log('before http request send');
          }
        }).then(res => {
          this.data = res.data;
        }, error => {
          this.data = error;
        });
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .left, .right {
    float: left;
    width: 50%;
  }

  .main {
    background-color: #eee;
  }

  .left {
    background-color: #ccc;
  }

  .right {
    background-color: #ddd;
  }
</style>

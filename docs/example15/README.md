
## 非父子组件间的传值

![]()

如上图所示，要想实现非父子组件的传值，除了使用Vuex外，还可以使用事件中间件实现非父子组件间的传值。

### 事件中间件

> 注：又称BUS/总线/发布订阅模式/观察者模式。

```HTML
<div id="app">
  <child content="Li Lei"></child>
  <child content="Han Mei"></child>
</div>
<script>
  Vue.prototype.bus = new Vue()                               // 创建空的Vue实例

  Vue.component('child', {
    data: function() {
      return {
        selfContent: this.content
      }
    },
    props: {
      content: String
    },
    template: '<div @click="handleItemClick">{{selfContent}}</div>',
    methods: {
      handleItemClick: function () {
        this.bus.$emit('change', this.selfContent)      //因为this.bus是一个Vue实例，而Vue实例有个$emit方法
      }
    },
    mounted: function () {
      var self = this               
      this.bus.$on('change', function (msg) {       //因为this.bus是一个Vue实例，而Vue实例有个$on方法
        self.selfContent = msg                          //因为是回调，所以this作用域发生了变化，需绑定下this
      })
    }
  })

  var app = new Vue({
    el: '#app',
  })
</script>
```
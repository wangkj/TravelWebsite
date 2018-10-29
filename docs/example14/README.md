
## 给组件绑定原生事件 

有如下一段代码，想监听子组件child上的click事件：

```HTML
<div id="app">
  <child @click="handleClick"></child>
</div>
<script>
  Vue.component('child', {
    template: '<div>hello world</div>'
  })

  var app = new Vue({
    el: '#app',
    methods: {
      handleClick: function() {
        alert('click')
      }
    }
  })
</script>
```

实际测试效果发现click事件无法生效。这是因为在Vue中，当我们给组件绑定一个事件的时候，实际上这个事件绑定的是自定义事件。也就是说鼠标点击触发的事件，其实并不是绑定的这个click事件。

### 一、复杂版方法

在子组件上实现鼠标点击事件，则可以通过如下方式写代码：

```HTML
<body>
<div id="app">
  <child @click="handleClick"></child>
</div>
<script>
  Vue.component('child', {
    template: '<div @click="handleChildClick">hello world</div>',     // 在子组件添加click事件
    methods: {
      handleChildClick: function () {
        alert('child click')
        this.$emit('click')
      }
    }
  })

  var app = new Vue({
    el: '#app',
    methods: {
      handleClick: function () {
        alert('parent click')
      }
    }
  })
</script>
```

注：在div元素上绑定事件，指的是监听原生的事件。在组件child上绑定事件，则指的是监听自定义的事件，此时可以通过this.$emit触发自定义事件。

### 二、简化版方法

通过添加native可以监听原生。

```HTML
<div id="app">
  <child @click.native="handleClick"></child>
</div>
<script>
  Vue.component('child', {
    template: '<div>hello world</div>'
  })

  var app = new Vue({
    el: '#app',
    methods: {
      handleClick: function () {
        alert('parent click')
      }
    }
  })
</script>
```

## 父子组件间的数据传递 

### 一、父组件通过属性向子组件传递数据

父组件通过属性向子组件传递数据，子组件通过props来接收数据。

```HTML
<div id="app">
  <counter count="0"></counter>
  <counter count="1"></counter>
</div>
<script>
  // 局部组件
  var counter = {
    props: ['count'],
    template: '<div>{{count}}</div>'
  }

  var app = new Vue({
    el: '#app',
    components: {
      counter: counter        // 局部组件需注册
    }
  })
</script>
```

在Vue中有单向数据流的概念，所以子组件要避免直接操作props(如果父组件传递的是对象，子组件修改props会影响其他子组件的显示)。如果要想在子组件中操作props，可以将props赋值给一个对象(但也要注意对象的多层嵌套)，通过操作这个对象来实现改变数据的目的。

```HTML
<div id="app">
  <counter count="0"></counter>
  <counter count="1"></counter>
</div>
<script>
  // 局部组件
  var counter = {
    props: ['count'],
    data: function () {
      return {
        number: this.count
      }
    },
    template: '<div @click="handleClick">{{number}}</div>',
    methods: {
      handleClick: function () {
        this.number++
      }
    }
  }

  var app = new Vue({
    el: '#app',
    components: {
      counter: counter        // 局部组件需注册
    }
  })
</script>
```

**注意：**

在子组件的属性前加上“:”，则表示传递给子组件属性count是表达式，此时数字0、1传递给属性count。

```HTML
<div id="app">
  <counter :count="0"></counter>
  <counter :count="1"></counter>
</div>
```

在子组件的属性前不加上“:”，则表示传递给子组件属性count是字符串，此时字符串0、1传递给属性count。

```HTML
<div id="app">
  <counter count="0"></counter>
  <counter count="1"></counter>
</div>
```

### 二、子组件向父组件传递数据

子组件通过 emit 触发事件，父组件通过 v-on 侦听事件。

```HTML
<div id="app">
  <counter :count="0" @inc="handleIncrease"></counter>
  <counter :count="1" @inc="handleIncrease"></counter>
  <div>{{total}}</div>
</div>
<script>
  // 局部组件
  var counter = {
    props: ['count'],
    data: function () {
      return {
        number: this.count
      }
    },
    template: '<div @click="handleClick">{{number}}</div>',
    methods: {
      handleClick: function () {
        this.number += 2
        this.$emit('inc', 2)
      }
    }
  }

  var app = new Vue({
    el: '#app',
    data: {
      total: 1
    },
    components: {
      counter: counter        // 局部组件需注册
    },
    methods: {
      handleIncrease: function(step) {
        this.total += step 
      }
    }
  })
```


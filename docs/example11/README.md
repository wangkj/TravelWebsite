
## 使用组件的细节点 

### 一、特殊属性is

创建row组件，将其放置在tbody标签里内部，代码如下所示：

```HTML
<div id="app">
  <table>
    <tbody>
      <row></row>
      <row></row>
      <row></row>
    </tbody>
  </table>
</div>
<script>
  Vue.component('row', {
    template: '<tr><td>This is a row</td></tr>'
  })

  var app = new Vue({
    el: '#app'
  })
</script>
```

视图效果：

![](https://raw.githubusercontent.com/Bian2017/TravelWebsite/master/docs/img/tbody.png)

正常情况下，tr标签应该在tbody里面，而现在跑到了tbody外面。这是因为HTML5规范规定table里面要有tbody，而tbody里面必须得放tr。而上述情况在tbody里面放置了子组件row，这个自定义组件 row 会被作为无效的内容提升到外部，并导致最终渲染结果出错。

针对上述问题，可以使用Vue提供的is属性来解决。

```HTML
<div id="app">
  <table>
    <tbody>
      <tr is="row"></tr>
      <tr is="row"></tr>
      <tr is="row"></tr>
    </tbody>
  </table>
</div>
<script>
  Vue.component('row', {
    template: '<tr><td>This is a row</td></tr>'
  })

  var app = new Vue({
    el: '#app'
  })
</script>
```

注意：在使用ul、ol、select标签时也会遇到上述问题。

### 二、子组件的data属性

创建子组件row，代码如下：

```HTML
<div id="app">
  <table>
    <tbody>
      <tr is="row"></tr>
      <tr is="row"></tr>
      <tr is="row"></tr>
    </tbody>
  </table>
</div>
<script>
  Vue.component('row', {
    data: {
      content: 'this is a row'
    },
    template: '<tr><td>{{content}}</td></tr>'
  })

  var app = new Vue({
    el: '#app'
  })
</script>
```

发现视图展示的时候出错：

![](https://raw.githubusercontent.com/Bian2017/TravelWebsite/master/docs/img/error-component.png)

在定义子组件的时候，data必须是一个函数，而不能是一个对象。之所以这么设计，是因为子组件不像根组件那样只会调用一次，它可能会在不同的地方被调用多次，每次调用的时候我希望子组件的数据应该是一份独立的对象拷贝，避免与其他地方调用产生冲突，所以data必须是一个函数。

**修改代码：**

```HTML
<div id="app">
  <table>
    <tbody>
      <tr is="row"></tr>
      <tr is="row"></tr>
      <tr is="row"></tr>
    </tbody>
  </table>
</div>
<script>
  Vue.component('row', {
    data: function () {
      return {
        content: 'this is a row'
      }
    },
    template: '<tr><td>{{content}}</td></tr>'
  })

  var app = new Vue({
    el: '#app'
  })
</script>
```

### 三、特殊属性ref

ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。**如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例**：

```HTML
<!-- `vm.$refs.p` will be the DOM node -->
<p ref="p">hello</p>

<!-- `vm.$refs.child` will be the child component instance -->
<child-component ref="child"></child-component>
```

当 v-for 用于元素或组件的时候，引用信息将是包含 DOM 节点或组件实例的数组。

关于 ref 注册时间的重要说明：因为 ref 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！$refs 也不是响应式的，因此你不应该试图用它在模板中做数据绑定。

举例：创建两个子组件，通过ref实现根组件对子组件数值的累加。

```HTML
<div id="app">
  <counter ref="one" @change="handleChange"></counter>
  <counter ref="two" @change="handleChange"></counter>
  <div>{{total}}</div>
</div>
<script>
  Vue.component('counter', {
    template: '<div @click="handleClick">{{number}}</div>',
    data: function () {
      return {
        number: 0
      }
    },
    methods: {
      handleClick: function () {
        this.number++
        this.$emit('change')
      }
    }
  })

  var app = new Vue({
    el: '#app',
    data: {
      total: 0
    },
    methods: {
      handleChange: function() {
        this.total = this.$refs.one.number + this.$refs.two.number
      }
    }
  })
</script>
```
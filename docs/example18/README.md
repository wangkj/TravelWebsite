

## 动态组件与v-once指令

### 一、动态组件

有的时候，在不同组件之间进行动态切换是非常有用的，通过 Vue 的 <component> 元素加一个特殊的 is 特性可实现这一功能。

```HTML
<div id="app">
  <component :is="type"></component>
  <!-- 
    <child-one v-if="type==='child-one'"></child-one>
    <child-two v-if="type==='child-two'"></child-two>
   -->
  <button @click="handleBtnClick">change</button>
</div>
<script>
  Vue.component('child-one', {
    template: `<div>child-one</div>`
  })

  Vue.component('child-two', {
    template: `<div>child-two</div>`
  })

  var app = new Vue({
    el: '#app',
    data: {
      type: 'child-one'
    },
    methods: {
      handleBtnClick: function () {
        this.type = this.type === 'child-one' ? 'child-two' : 'child-one'
      }
    }
  })
</script>
```

动态组件会根据is数据的变化来加载不同的组件。

### 二、 v-once 指令

v-once只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

```HTML
<div id="app">
  <child-one v-if="type==='child-one'"></child-one>
  <child-two v-if="type==='child-two'"></child-two>
  <button @click="handleBtnClick">change</button>
</div>
<script>
  Vue.component('child-one', {
    template: `<div v-once>child-one</div>`
  })

  Vue.component('child-two', {
    template: `<div v-once>child-two</div>`
  })

  var app = new Vue({
    el: '#app',
    data: {
      type: 'child-one'
    },
    methods: {
      handleBtnClick: function () {
        this.type = this.type === 'child-one' ? 'child-two' : 'child-one'
      }
    }
  })
</script>
```

每次点击按钮change，Vue会频繁地创建或销毁子组件，这种操作是非常耗性能的。通过添加v-once指令，会将组件放置内存中。此时频繁点击按钮change，就不会频繁重新创建或销毁子组件，而是直接从内存中拿到上一次的子组件继续使用。
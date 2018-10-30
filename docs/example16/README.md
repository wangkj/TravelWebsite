
## 插槽

Vue 实现了一套内容分发的 API，这套 API 基于当前的 Web Components 规范草案，将 <slot> 元素作为承载分发内容的出口，示例代码如下：

```HTML
<div id="app">
  <child>
    <p>hello slot</p>
  </child>
</div>
<script>
  Vue.component('child', {
    template: `<div>
      <p>hello child</p>
      <slot>默认值</slot>
      </div>`
  })

  var app = new Vue({
    el: '#app',
  })
</script>
```

还可以定义默认值。

### 具名插槽

在使用插槽时，有时我们会遇到这样一个需求，将不同的插槽内容显示到子组件template不同地方。

```JS
<div class="container">
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>
```

针对这样的情况，<slot> 元素有一个特殊的特性：name，这个特性可以用来定义额外的插槽。在向具名插槽提供内容的时候，我们可以在一个父组件的 <template> 元素上使用 slot 特性。

```HTML
<div id="app">
  <body-content>
    <div class="header" slot="header">header</div>
    <div class="footer" slot="footer">footer</div>
  </body-content>
</div>
<script>
  Vue.component('body-content', {
    template: `<div>
        <slot name="header"></slot>
        <div class="content">content</div>
        <slot name="footer"></slot>
      </div>`
  })

  var app = new Vue({
    el: '#app',
  })
</script>
```

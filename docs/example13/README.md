
## 组件参数校验与非Props特性

### 一、组件参数校验

我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

```HTML
<div id="app">
  <child content="hello world"></child>
</div>
<script>
  Vue.component('child', {
    props: {
      content: [Number, String],      // content属性要么是数字，要么是字符串
      text: {
        type: String,
        required: false,
        default: 'future',             // 默认值
        validator: function (value) {
          return (value.length > 5)
        }
      }
    },
    template: '<div>{{content}}, {{text}}</div>'
  })

  var app = new Vue({
    el: '#app',
  })
</script>
```

### 二、非props特性

一个非 prop 特性是指传向一个组件，但是该组件并没有相应 prop 定义的特性。如下所示，创建child组件，child组件并没有使用content属性。

```HTML
<div id="app">
  <child content="hello world"></child>
</div>
<script>
  Vue.component('child', {
    template: '<div>hello world</div>'
  })

  var app = new Vue({
    el: '#app',
  })
</script>
```

**非props视图如下：**

![](https://raw.githubusercontent.com/Bian2017/TravelWebsite/master/docs/img/non-props.png)

**props视图如下：**

![](https://raw.githubusercontent.com/Bian2017/TravelWebsite/master/docs/img/props-content.png)

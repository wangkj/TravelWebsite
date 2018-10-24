
## 全局组件和局部组件

### 一、全局组件

调用Vue.component()注册组件时，组件的注册是全局的，这意味着该组件可以在任意Vue实例下使用。

```JS
// 创建全局组件的方法
Vue.component("TodoItem", {
  props: ['content'],
  template: `<li>{{content}}</li>`
})
```

### 二、局部组件

如果不需要全局注册，或者是让组件使用在其它组件内，可以用实例对象的components属性实现局部注册。

```JS
// 创建局部组件
var TodoItem = {
  props: ['content'],
  template: "<li>{{content}}</li>"
}

var app = new Vue({
  el: '#app',
  components: {
    TodoItem: TodoItem          // 局部组件需在components属性上进行注册
  },
  ...
})
```

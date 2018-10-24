## 父子组件通信

### 一、父组件传递数据给子组件

父组件可以通过props属性(通过v-bind指令)将数据如何传递给子组件，代码如下。

```HTML
<todo-item :content="item" 
           :index="index" 
           @delete="handleItemDelete">
</todo-item>
```

子组件通过props来接收数据。

```JS
var TodoItem = {
  props: ['content', 'index'],
  ...
}
```

这样就实现了父组件向子组件传递数据.

### 二、子组件与父组件通信

子组件要想改变父组件的数据，可以通过触发自定义事件来通知父组件改变数据。

每个 Vue 实例都实现了事件接口(Events interface)，即：
+ 使用 $on(eventName) 监听事件；
+ 使用 $emit(eventName) 触发事件；

父组件可以在使用子组件的地方直接用 v-on(@为缩写)来监听子组件触发的事件，代码如下所示。

```HTML
<todo-item :content="item" 
           :index="index" 
           @delete="handleItemDelete">
</todo-item>
```

子组件通过$emit触发事件。

```JS
// 创建局部组件
var TodoItem = {
  ...
  methods: {
    handleItemClick: function () {
      this.$emit("delete", this.index)                // 向外触发事件
    }
  }
}

var app = new Vue({
  ...
  methods: {
    handleItemDelete: function (index) {
      this.list.splice(index, 1)
    }
  }
  ...
})
```

详细代码见[example3](https://github.com/Bian2017/TravelWebsite/blob/master/docs/example3/index.html)
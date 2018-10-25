
## 计算属性、方法和侦听器

### 一、计算属性computed

计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。

**HTML代码**

```HTML
<div id="app">
  {{fullName}}
  {{age}}
</div>
```

```JS
var app = new Vue({
  data: {
    firstName: "Li",
    lastName: "Lei",
    age: 28
  },
  ...,
  computed: {
    fullName: function () {
      console.log('计算属性测试：计算一次')
      return this.firstName + " " + this.lastName
    }
  }
})

setInterval(function () { 
  app.age += 1
}, 1000)
```

每当age发生变化，计算属性fullName并不会重新执行。

### 二、方法methods

我们可以使用 methods 来替代 computed，效果上两个都是一样的，但是 computed 是基于它的依赖缓存，只有相关依赖发生改变时才会重新取值。而使用 methods ，在重新渲染的时候，函数总会重新调用执行。

**HTML代码**

```HTML
<div id="app">
  {{fullName()}}
  {{age}}
</div>
```

**JS代码**

```JS
var app = new Vue({
  data: {
    firstName: "Li",
    lastName: "Lei",
    age: 28
  },
  ...,
  methods: {
    fullName: function() {
      console.log('方法测试: 计算了一次')
      return this.firstName + " " + this.lastName
    }
  }
})

setInterval(function () { 
  app.age += 1
}, 1000)
```

每当age发生变化，都会重新执行fullName()。

注意，不应该使用箭头函数来定义 method 函数 (例如 plus: () => this.a++)。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined。

> 为什么React定义属性可以使用箭头函数？这是因为通过class创建对象时，是在对象内部定义属性，此时上下文是对象自身。而通过new Vue创建Vue实例(是实例，不是对象)时，传入的是一个对象参数，对象参数的的上下文此时是全局。

### 三、侦听器watch

watch和computed都具备缓存的机制(怀疑),

侦听器 watch 选项用于响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

**HTML代码**

```HTML
<div id="app">
  {{fullName}}
  {{age}}
</div>
```

**JS代码**

```JS
var app = new Vue({                  
  el: '#app',
  data: {
    firstName: "Li",
    lastName: "Lei",
    fullName: "Li Lei",
    age: 28
  },
  watch: {
    firstName: function() {
      console.log("First：计算了一次")
      this.fullName = this.firstName + " " + this.lastName
    },
    lastName: function() {
      console.log("Last：计算了一次")
      this.fullName = this.firstName + " " + this.lastName
    }
  }
}

setInterval(function () { 
  app.age += 1
}, 1000)
```

每当age发生变化，侦听器watch并不会进行任何回调。watch也是具备缓存机制！！！

> watch与computed区别：watch能监听到任何数值属性的数值更新；computed计算属性是基于它们的依赖进行缓存的。计算属性computed只有在它的相关依赖(this.某data)发生改变时才会重新求值。computed主要用于对同步数据的处理，而watch则主要用于观测某个值的变化去完成一段开销较大的复杂业务逻辑。

详细代码见[example6](https://github.com/Bian2017/TravelWebsite/blob/master/docs/example6/index.html)
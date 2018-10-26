
## Vue的列表渲染

### 一、特殊属性key

当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。这个类似 Vue 1.x 的 track-by="$index" 。

这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有的唯一 id。这个特殊的属性相当于 Vue 1.x 的 track-by ，但它的工作方式类似于一个属性，所以你需要用 v-bind 来绑定动态值 (在这里使用简写)：

```HTML
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

建议尽可能在使用 v-for 时提供 key，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

因为它是 Vue 识别节点的一个通用机制，key 并不与 v-for 特别关联，key 还具有其他用途，我们将在后面的指南中看到其他用途。

### 二、数组更新检测

在 Vue 中，当我们直接通过数组的下标形式来改变数组时，发现页面的视图并不会发生变化，代码如下。

```JS
// 直接修改数组
vm.list[4] = {id: '0004', text: 'Hello world'}
```

#### 2.1 变异方法

通过 Vue 提供的几个数组遍历方法来操作数组，可实现数据发生变化，页面也跟着变化的响应式效果。

+ push()
+ pop()
+ shift()
+ unshift()
+ splice()
+ sort()
+ reverse()

#### 2.2 改变引用地址

除了使用变异方法，还可以返回一个新数组，通过改变引用地址，也可实现数组数据发生变化，页面也跟着变化的响应效果。

像filter()、concat() 和 slice() 等数组函数，它们不会改变原始数组，但总是返回一个新数组。当使用这些非变异方法时，可以用新数组替换旧数组：

```JS
vm.list = vm.list.filter(function (item) {
  return item.text.match(/Foo/)
})
```

你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

### 三、对象更改检测

对象和数组类似，也存在 Vue 不能检测对象属性的添加或删除：

```JS
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

#### 3.1 使用set方法

对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。例如，对于：

```JS
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```

你可以添加一个新的 age 属性到嵌套的 userProfile 对象：

```JS
Vue.set(vm.userProfile, 'age', 27)
```

你还可以使用 vm.$set 实例方法，它只是全局 Vue.set 的别名：

```JS
vm.$set(vm.userProfile, 'age', 27)
```

#### 3.2 改变引用地址

有时你可能需要为已有对象赋予多个新属性，比如使用 Object.assign() 或 _.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：

```JS
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

你应该这样做：

```JS
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

通过返回一个新的引用地址，来实现对象的更改。


### 四、占位符template

可以利用带有 v-for 的 <template> 渲染多个元素。比如：
```JS
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```
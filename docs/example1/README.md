
### MVP设计模式

Presenter(控制层)：可以理解为业务逻辑相关的控制层。

![]()

现使用jQuery展示简单的MVP层，其中Model层非常弱，因为并没有通过AJAX获取数据。

**View(视图层)**

```HTML
<div>
  <input id="input" type="text" />
  <button id="btn">提交</button>
  <ul id="list"></ul>
</div>
```

**Presenter(控制层)**

```JS
function Page() {
}

$.extend(Page.prototype, {
  init: function () {
    this.bindEvents()
  },
  bindEvents: function () {
    var btn = $('#btn')
    btn.on('click', $.proxy(this.handleBtnClick, this))
  },
  handleBtnClick: function () {
    var inputElm = $('#input')
    var inputValue = inputElm.val();
    var ulElem = $('#list');
    ulElem.append('<li>' + inputValue + '</li>');
    inputElm.val('')
  }
})
var page = new Page()
page.init()
```

当视图发生改变，如点击提交，控制器代码会执行。控制器负责所有的业务逻辑，或发生AJAX请求(与Model层交互)，或直接操作DOM。通过操作DOM，可以改变视图层。

在MVP设计模式里，最核心的层是Presenter层，Model层其实非常边缘。大量的代码都写在Presenter，这里面绝大部分代码都是在进行DOM操作。在使用jQuery开发大型项目时，其中百分之七八十代码都在进行DOM操作。

### MVVM设计模式

![]()

如图所示，Model负责存储数据，View负责显示数据，还有个ViewModel层，是Vue内置的。编码的重点一部分在视图层，一部分在模型层。

**Model层**

```JS
var app = new Vue({
  el: '#app',
  data: {
    list: [],
    inputValue: ''
  },
  methods: {
    handleSubmit: function() {
      this.list.push(this.inputValue)
      this.inputValue = ''
    }
  }
})
```

**View层**

```HTML
<div id="app">
  <input type="text" v-model="inputValue"/>
  <button v-on:click="handleSubmit">提交</button>
  <ul>
    <li v-for="item in list">{{item}}</li>
  </ul>
</div>
```

在MVVM的架构下，View层和Model层并没有直接联系，而是通过ViewModel层进行交互。ViewModel层通过双向数据绑定将View层和Model层连接了起来，使得View层和Model层的同步工作完全是自动的。因此开发者只需关注业务逻辑，无需手动操作DOM，复杂的数据状态维护交给MVVM统一来管理。
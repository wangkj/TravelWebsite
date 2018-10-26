
## Vue的条件渲染

### 一、v-if与v-show区别

v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

> 注：若对一个DOM元素频繁进行隐藏或者显示操作，则使用v-show性能更好些。因为v-show不会把一个DOM元素频繁地从页面删除或者添加。而v-if每次进行隐藏或者显示操作，都是删除DOM或者增加DOM，所以它的性能更低些。

### 二、特殊属性key

如下代码，当show值为true时，在用户名的Input输入框中输入一段字符"hello world"。隔一段时间后，将show值设为false，此时邮箱的Input输入框也会显示字符"hello world"。

```HTML
<div id="app">
  <div v-if="show">
    用户名：
    <input />
  </div>
  <div v-else>
    邮箱名：
    <input />
  </div>
</div>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      show: true,
    }
  })

  setInterval(function () {
    app.show = !app.show
  }, 5000)
</script>
```

出现这个问题的原因是Vue在重新渲染页面的时候，会尽量尝试去复用页面上已经存在的DOM。此时可以通过设置key值来避免上述情况的发生。

```HTML
<div v-if="show">
  用户名：
  <input key="username" />
</div>
<div v-else>
  邮箱名：
  <input key="email" />
</div>
```

当给某个元素标签加上key值时，Vue会知道它是页面中唯一的元素，如果两个元素的key值不一样，Vue就不会去尝试去复用内容，从而避免上述情况的发生。

详细代码见[example9](https://github.com/Bian2017/TravelWebsite/blob/master/docs/example9/index.html)。
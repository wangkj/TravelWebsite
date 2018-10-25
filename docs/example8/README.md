
## Vue的样式绑定

操作元素的class列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以我们可以用v-bind处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将v-bind用于class和 style时，Vue.js做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

### 一、绑定HTML Class

#### 1. class与对象绑定

```HTML
<div id="app">
  <div @click="handleDivClick"
       :class="{activated: isActivated}"
  >Hello world</div>
</div>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      isActivated: false
    },
    methods: {
      handleDivClick: function() {
        this.isActivated = !this.isActivated
      }
    }
  })
</script>
```

### 2. class与数组绑定

```HTML
<div id="app">
    <div @click="handleDivClick" 
         :class="[activated]"
    >Hello world</div>
  </div>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        activated: ""
      },
      methods: {
        handleDivClick: function () {
          this.activated = this.activated === "activated" ? "" : "activated"
        }
      }
    })
  </script>
```

注：与数组绑定，数组中可以有多个变量。

### 二、绑定内联样式

内联样式也可以通过两种方式来定义，一种是通过对象来定义，一种是通过数组的形式来定义。

#### 1. 内联样式与对象绑定

```HTML
<div id="app">
  <div :style="styleObj" 
        @click="handleDivClick"
  >Hello world</div>
</div>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      styleObj: {
        color: "black"
      }
    },
    methods: {
      handleDivClick: function () {
        this.styleObj.color = this.styleObj.color === "black" ? "red" : "black"
      }
    }
  })
</script>
```

#### 2. 内联样式与数组绑定

```HTML
<div id="app">
  <div :style="[styleObj, {fontSize: '20px'}]" 
        @click="handleDivClick"
  >Hello world</div>
</div>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      styleObj: {
        color: "black"
      }
    },
    methods: {
      handleDivClick: function () {
        this.styleObj.color = this.styleObj.color === "black" ? "red" : "black"
      }
    }
  })
</script>
```

详细代码见[example8](https://github.com/Bian2017/TravelWebsite/blob/master/docs/example8/index.html)。
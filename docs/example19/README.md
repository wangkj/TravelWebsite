

## Vue中CSS动画原理 

### 当从隐藏状态变为显示状态

代码如下，点击切换按钮，希望实现“Hello World”的渐隐渐现的动画效果，此时可以通过Vue的内置组件transition来实现。

```HTML
<head>
  <style>
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 1s;
    }
  </style>
  <script src="./vue.js"></script>
</head>

<body>
  <div id="app">
    <transition name="fade">
      <div v-if="show">Hello World</div>
    </transition>
    <button @click="handleClick">切换</button>
  </div>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        show: true
      },
      methods: {
        handleClick: function () {
          this.show = !this.show
        }
      }
    })
  </script>
</body>
```

**过渡动画原理**

当一个元素被transition组件包裹时，Vue会自动地分析元素的CSS样式，然后构建一个动画的流程。

![]()

如上图所示，Vue在动画即将被执行的一瞬间，会往内部的div上加上两个class名字，分别是fade-enter和fade-enter-active。当动画第一帧执行结束后，Vue在动画运行到第二帧时，此时会干两件事情：

+ 将之前添加的fade-enter这个class移除；
+ 新增fade-enter-to这个class；

随后动画会继续执行。当动画执行到结束的一瞬间，Vue会将之前添加的fade-enter-active、fade-enter-to等两个class移除。

从上图我们可以得知，fade-enter-active的存在周期从动画还未被执行前就已经存在了，直到动画结束的时候fade-enter-active才被移除。而在fade-enter-active中对opacity进行了transition的监控，如果监控到opacity发生变化时，会让opacity从0慢慢变到对应的值。而fade-enter在动画第一帧的时候是存在的，此时opacity为0。当动画运动到第二帧的时候，fade-enter被移除了，此时opacity发生了变化，自动恢复成原始的1。fade-enter-active此时监听到opacity发生变化，就会让这个变化在1s内完成。

> 注：不写name为fade的话，Vue默认的是v-enter、v-enter-active。


### 当从显示状态变为隐藏状态

![]()

动画原理同上。